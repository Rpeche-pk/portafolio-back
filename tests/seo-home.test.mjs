import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const home = await readFile(path.join(root, 'index.html'), 'utf8');
const workGallery = await readFile(path.join(root, 'assets/js/work-gallery.js'), 'utf8');
const css = await readFile(path.join(root, 'assets/css/work-gallery.css'), 'utf8');
const navbar = await readFile(path.join(root, 'templates/work-gallery-navbar.html'), 'utf8');
const footer = await readFile(path.join(root, 'templates/work-gallery-footer.html'), 'utf8');
const head = home.match(/<head\b[^>]*>([\s\S]*?)<\/head\s*>/i)?.[1] ?? '';

const expectedTitle = 'Luis Peche Aparcana | Backend & AI Developer';
const expectedDescription = 'Luis Peche Aparcana (Luis Peche) is a backend and generative AI developer building microservices and integrations with Java, Spring Boot, Python, and AWS.';
const canonicalUrl = 'https://luispeche.vercel.app/';

function readMetaTags(source) {
  return [...source.matchAll(/<meta\b[^>]*>/gi)].map(([tag]) => {
    const attributes = Object.fromEntries(
      [...tag.matchAll(/([\w:-]+)\s*=\s*(["'])(.*?)\2/g)].map(([, name, , value]) => [name, value]),
    );
    if (attributes.content) attributes.content = attributes.content.replaceAll('&amp;', '&');
    return attributes;
  });
}

function metaValues(attribute, key) {
  return readMetaTags(head).filter((tag) => tag[attribute] === key).map(({ content }) => content);
}

test('homepage title uses the full professional name', () => {
  const title = head.match(/<title>([\s\S]*?)<\/title>/i)?.[1].replaceAll('&amp;', '&').trim();
  assert.equal(title, expectedTitle);
});

test('homepage has one English description and one canonical URL', () => {
  assert.deepEqual(metaValues('name', 'description'), [expectedDescription]);
  const canonicalTags = [...head.matchAll(/<link\b[^>]*\brel=["']canonical["'][^>]*>/gi)];
  assert.equal(canonicalTags.length, 1);
  assert.match(canonicalTags[0][0], new RegExp(`\\bhref=["']${canonicalUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["']`));
  assert.doesNotMatch(head, /<link\b[^>]*\brel=["']alternate["'][^>]*\bhreflang=/i);
});

test('homepage Open Graph title, description, and URL match canonical metadata', () => {
  assert.deepEqual(metaValues('property', 'og:title'), [expectedTitle]);
  assert.deepEqual(metaValues('property', 'og:description'), [expectedDescription]);
  assert.deepEqual(metaValues('property', 'og:url'), [canonicalUrl]);
  assert.deepEqual(metaValues('property', 'og:image'), [`${canonicalUrl}assets/img/og/portada-portafolio.png`]);
});

test('hero-title uses the short name in both languages and remains responsive', () => {
  const heroName = home.match(/<h1\b[^>]*id=["']hero-title["'][^>]*>([\s\S]*?)<\/h1>/i)?.[1].trim();
  assert.equal(heroName, 'Luis Peche');
  assert.match(workGallery, /en\s*:\s*\{[\s\S]*?heroName:\s*'Luis Peche'/);
  assert.match(workGallery, /es\s*:\s*\{[\s\S]*?heroName:\s*'Luis Peche'/);
  assert.match(css, /\.hero\s+#hero-title\s*\{[^}]*max-width:\s*14ch;[^}]*font-size:\s*clamp\(/);
  assert.match(css, /@media\s*\(max-width:\s*760px\)[\s\S]*?\.hero\s+#hero-title\s*\{[^}]*max-width:\s*12ch;[^}]*font-size:\s*clamp\(/);
});

test('homepage JSON-LD identifies a ProfilePage with a Person main entity', () => {
  const block = head.match(/<script\s+type=["']application\/ld\+json["']\s*>([\s\S]*?)<\/script>/i);
  assert.ok(block, 'homepage must include JSON-LD in the initial head');
  const schema = JSON.parse(block[1]);
  assert.equal(schema['@context'], 'https://schema.org');
  assert.equal(schema['@type'], 'ProfilePage');
  assert.equal(schema.url, canonicalUrl);
  assert.equal(schema.mainEntity['@type'], 'Person');
  assert.equal(schema.mainEntity.name, 'Luis Peche Aparcana');
  assert.equal(schema.mainEntity.alternateName, 'Luis Peche');
  assert.deepEqual(schema.mainEntity.sameAs, [
    'https://github.com/Rpeche-pk',
    'https://www.linkedin.com/in/luis-peche/',
  ]);
});

test('shared Work Gallery branding keeps the natural short name and matching accessible labels', () => {
  for (const template of [navbar, footer]) {
    assert.match(template, /aria-label="LP Luis Peche home" data-i18n-aria-label="brandHome"/);
    assert.match(template, /Luis <span class="brand-name-highlight">Peche<\/span>/);
  }
  assert.match(workGallery, /brandHome:\s*'LP Luis Peche home'/);
  assert.match(workGallery, /brandHome:\s*'LP Luis Peche, ir al inicio'/);
});
