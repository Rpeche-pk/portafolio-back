import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import test from 'node:test';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const html = await readFile(path.join(root, 'index.html'), 'utf8');
const head = html.match(/<head\b[^>]*>([\s\S]*?)<\/head\s*>/i)?.[1];
const png = await readFile(path.join(root, 'assets/img/og/portada-portafolio.png'));

const expectedOpenGraph = {
  'og:type': 'website',
  'og:url': 'https://luispeche.vercel.app/',
  'og:title': 'Luis Peche | Backend & AI Developer',
  'og:description': 'Explore my backend and AI projects built with Java, Spring Boot, Python, and AWS.',
  'og:image': 'https://luispeche.vercel.app/assets/img/og/portada-portafolio.png',
  'og:image:type': 'image/png',
  'og:image:alt': 'Cover image for Luis Peche’s software development portfolio',
  'og:image:width': '1424',
  'og:image:height': '752',
};

function readMetaTags(source) {
  return [...source.matchAll(/<meta\b[^>]*>/gi)].map(([tag]) => {
    const attributes = Object.fromEntries(
      [...tag.matchAll(/([\w:-]+)\s*=\s*(["'])(.*?)\2/g)].map(([, name, , value]) => [name, value]),
    );
    if (attributes.content) attributes.content = attributes.content.replaceAll('&amp;', '&');
    return attributes;
  });
}

test('homepage exposes exactly one complete English Open Graph set in the initial head', () => {
  assert.ok(head, 'index.html must have an initial head');

  const allOpenGraph = readMetaTags(html).filter(({ property }) => property?.startsWith('og:'));
  const headOpenGraph = readMetaTags(head).filter(({ property }) => property?.startsWith('og:'));
  assert.equal(allOpenGraph.length, Object.keys(expectedOpenGraph).length);
  assert.equal(headOpenGraph.length, allOpenGraph.length, 'all Open Graph tags must be in the initial head');

  for (const [property, content] of Object.entries(expectedOpenGraph)) {
    const matches = allOpenGraph.filter((tag) => tag.property === property);
    assert.equal(matches.length, 1, `${property} must appear exactly once`);
    assert.equal(matches[0].content, content, `${property} content must match`);
  }
});

test('the referenced cover is an actual PNG with the declared dimensions', () => {
  assert.deepEqual(png.subarray(0, 8), Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
  assert.equal(png.readUInt32BE(16), 1424);
  assert.equal(png.readUInt32BE(20), 752);
});
