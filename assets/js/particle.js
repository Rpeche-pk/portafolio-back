(() => {
  const host = document.getElementById('particles-js');
  if (!host || typeof window.particlesJS !== 'function' || host.dataset?.particleMotion) return;
  // Repeated script evaluation must not recreate the canvas, listeners or loop.
  if (!host.dataset) host.dataset = {};
  host.dataset.particleMotion = 'active';

  window.particlesJS('particles-js', {
    particles: {
      number: { value: 0, density: { enable: false } },
      color: { value: '#0b110d' },
      shape: { type: 'circle' },
      // Restore the original point and link prominence.
      opacity: { value: 0.4, random: false },
      size: { value: 3, random: true },
      line_linked: { enable: true, distance: 150, color: '#000000', opacity: 0.4, width: 1 },
      // The controller owns time; the vendor still owns drawing, links and wrapping.
      move: { enable: false, speed: 0.55, direction: 'none', random: false,
        straight: false, out_mode: 'out', bounce: false, attract: { enable: false } },
    },
    interactivity: {
      detect_on: 'canvas',
      events: { onhover: { enable: false, mode: [] }, onclick: { enable: false, mode: [] }, resize: true },
    },
    retina_detect: true,
  });

  const engine = window.pJSDom[window.pJSDom.length - 1].pJS;
  const canvas = engine.canvas.el;
  canvas.style.pointerEvents = 'none';
  const media = window.matchMedia('(prefers-reduced-motion: reduce)');
  const update = engine.fn.particlesUpdate;
  let frame = null;
  let previous = null;
  let delta = 0;
  let elapsed = 0;

  // One particle per 36,000 CSS px², capped at 32: DPR never increases density.
  // Reuse vendor mutation helpers so particle construction remains vendor-owned.
  engine.fn.vendors.densityAutoParticles = () => {
    const count = Math.min(32, Math.max(0, Math.round(canvas.offsetWidth * canvas.offsetHeight / 30000)));
    const difference = count - engine.particles.array.length;
    engine.particles.move.enable = true; // helpers must not trigger recursive static redraws
    if (difference > 0) engine.fn.modes.pushParticles(difference);
    if (difference < 0) engine.fn.modes.removeParticles(-difference);
    engine.particles.move.enable = false;
    engine.fn.particlesDraw();
  };

  engine.fn.particlesUpdate = () => {
    if (delta > 0) {
      const recovery = 1 - Math.exp(-delta / 0.85); // smooth ~850ms direction changes
      for (const particle of engine.particles.array) {
        const phase = (particle.vx_i + particle.vy_i) * 12;
        const vx = particle.vx_i + 0.16 * Math.sin(elapsed * 0.65 + phase);
        const vy = particle.vy_i + 0.16 * Math.cos(elapsed * 0.5 + phase);
        particle.vx += (vx - particle.vx) * recovery;
        particle.vy += (vy - particle.vy) * recovery;
      }
    }
    // particles.js advances speed/2 per frame; normalize to a 60Hz reference.
    engine.particles.move.speed = 0.55 * engine.canvas.pxratio * delta * 60;
    engine.particles.move.enable = delta > 0;
    update();
    engine.particles.move.enable = false;
  };

  function tick(timestamp) {
    frame = null;
    if (document.hidden || media.matches) return;
    // Discard suspended time; cap stalls at 50ms rather than teleporting particles.
    delta = previous === null ? 0 : Math.min(0.05, Math.max(0, (timestamp - previous) / 1000));
    previous = timestamp;
    elapsed += delta;
    engine.fn.particlesDraw();
    delta = 0;
    frame = window.requestAnimationFrame(tick);
  }

  function syncMotion() {
    if (frame !== null) window.cancelAnimationFrame(frame);
    frame = null;
    previous = null;
    delta = 0;
    if (!document.hidden) {
      engine.fn.particlesDraw(); // reduced motion retains a static, discreet decoration
      if (!media.matches) frame = window.requestAnimationFrame(tick);
    }
  }

  document.addEventListener('visibilitychange', syncMotion);
  if (media.addEventListener) media.addEventListener('change', syncMotion);
  else media.addListener(syncMotion);

  engine.fn.vendors.densityAutoParticles();
  syncMotion();
})();
