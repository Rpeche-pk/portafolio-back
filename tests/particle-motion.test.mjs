import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const vendor = fs.readFileSync(new URL('../assets/js/particles.min.js', import.meta.url), 'utf8');
const source = fs.readFileSync(new URL('../assets/js/particle.js', import.meta.url), 'utf8');

function setup({ width = 1200, height = 600, ratio = 1, reduced = false, hidden = false } = {}) {
  const listeners = new Map();
  function target(name) {
    return { addEventListener(type, fn, options) {
      const key = `${name}:${type}`;
      listeners.set(key, [...(listeners.get(key) || []), { fn, options }]);
    } };
  }
  const context = new Proxy({}, { get: (obj, key) => obj[key] ?? (() => {}), set: (obj, key, value) => (obj[key] = value, true) });
  const canvas = { ...target('canvas'), style: {}, offsetWidth: width, offsetHeight: height,
    getContext: () => context, getBoundingClientRect: () => ({ left: 10, top: 20, width, height }) };
  const children = [];
  const hero = { ...target('hero'), style: {}, getElementsByClassName: () => children,
    appendChild: el => (children.push(el), el), getBoundingClientRect: canvas.getBoundingClientRect };
  const media = { ...target('media'), matches: reduced };
  const document = { ...target('document'), hidden, getElementById: () => hero,
    querySelector: () => canvas, createElement: () => canvas };
  let id = 0;
  const frames = new Map();
  const window = { ...target('window'), document, devicePixelRatio: ratio, matchMedia: () => media,
    requestAnimationFrame: fn => (frames.set(++id, fn), id), cancelAnimationFrame: id => frames.delete(id) };
  const sandbox = vm.createContext({ ...window, window, document, console, performance: { now: () => 0 },
    setTimeout: window.requestAnimationFrame, clearTimeout: window.cancelAnimationFrame });
  vm.runInContext(vendor, sandbox);
  // Browsers expose window assignments as globals.
  Object.assign(sandbox, window);
  const run = () => vm.runInContext(source, sandbox);
  run();
  function emit(name, type, event = {}) { for (const { fn } of listeners.get(`${name}:${type}`) || []) fn(event); }
  function frame(time) { const pending = [...frames.values()]; frames.clear(); pending.forEach(fn => fn(time)); }
  return { instance: window.pJSDom[0].pJS, frames, listeners, canvas, hero, media, document, emit, frame, run };
}

test('keeps the original particle prominence while remaining non-interactive', () => {
  const s = setup();
  const p = s.instance;
  assert.equal(s.canvas.style.pointerEvents, 'none');
  assert.equal(p.particles.move.out_mode, 'out');
  assert.equal(p.particles.opacity.value, 0.5);
  assert.equal(p.particles.opacity.random, false);
  assert.equal(p.particles.size.value, 3);
  assert.equal(p.particles.line_linked.distance, 150);
  assert.equal(p.particles.line_linked.opacity, 0.4);
  assert.equal(p.particles.line_linked.width, 1);
  assert.equal(p.interactivity.events.onclick.enable, false);
  assert.equal(s.frames.size, 1);
  const count = [...s.listeners.values()].reduce((n, a) => n + a.length, 0);
  s.run();
  assert.equal(s.frames.size, 1);
  assert.equal([...s.listeners.values()].reduce((n, a) => n + a.length, 0), count);
  assert.equal(s.listeners.has('canvas:click'), false);
});

test('density follows CSS canvas area, not pixel ratio, and resizes conservatively', () => {
  const desktop = setup();
  const mobile = setup({ width: 360, height: 640, ratio: 3 });
  const normal = setup({ width: 360, height: 640 });
  assert.ok(mobile.instance.particles.array.length < desktop.instance.particles.array.length);
  assert.equal(mobile.instance.particles.array.length, normal.instance.particles.array.length);
  assert.ok(desktop.instance.particles.array.length <= 32);
  desktop.canvas.offsetWidth = 360;
  desktop.emit('window', 'resize');
  assert.ok(desktop.instance.particles.array.length < 15);
});

test('hidden tabs and reduced motion stop scheduling and resume without a jump', () => {
  const s = setup();
  s.frame(0); s.frame(16);
  s.document.hidden = true;
  s.emit('document', 'visibilitychange');
  assert.equal(s.frames.size, 0);
  const particle = s.instance.particles.array[0];
  const before = [particle.x, particle.y];
  s.document.hidden = false;
  s.emit('document', 'visibilitychange');
  s.frame(100000);
  assert.deepEqual([particle.x, particle.y], before);
  s.media.matches = true;
  s.emit('media', 'change');
  assert.equal(s.frames.size, 0);
  assert.deepEqual([particle.x, particle.y], before);
  s.media.matches = false;
  s.emit('media', 'change');
  s.emit('document', 'visibilitychange');
  assert.equal(s.frames.size, 1);
  assert.equal(setup({ reduced: true }).frames.size, 0);
  assert.equal(setup({ hidden: true }).frames.size, 0);
});

test('delta-time keeps drift comparable at 30/120Hz and clamps long frames', () => {
  function travel(hz) {
    const s = setup();
    s.instance.particles.array.splice(1);
    const p = s.instance.particles.array[0];
    p.x = 400; p.y = 300; p.vx = p.vx_i = 0.3; p.vy = p.vy_i = 0.2;
    s.frame(0);
    for (let i = 1; i <= hz; i++) s.frame(i * 1000 / hz);
    assert.ok(Number.isFinite(p.x) && Number.isFinite(p.y));
    const before = p.x;
    s.frame(100000);
    assert.ok(Math.abs(p.x - before) < 2);
    return Math.hypot(before - 400, p.y - 300);
  }
  assert.ok(Math.abs(travel(30) - travel(120)) < 1);
});

test('cursor movement has no particle handler and cannot interfere with clicks or scrolling', () => {
  const s = setup();
  for (const type of ['pointermove', 'pointerout', 'click', 'scroll']) {
    assert.equal(s.listeners.has(`window:${type}`), false);
  }
  assert.equal(s.canvas.style.pointerEvents, 'none');
});
