import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import { buildSite } from '../scripts/build-shared-shell.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sitemapUrl = 'https://luispeche.vercel.app/sitemap.xml';
const canonicalUrls = [
  'https://luispeche.vercel.app/',
  'https://luispeche.vercel.app/project-page.html',
  'https://luispeche.vercel.app/project-page-1.html',
  'https://luispeche.vercel.app/project-page-2.html',
  'https://luispeche.vercel.app/project-page-3.html',
  'https://luispeche.vercel.app/project-page-4.html',
  'https://luispeche.vercel.app/project-page-5.html',
];

test('robots.txt allows crawling and advertises the canonical sitemap', async () => {
  const robots = await readFile(path.join(root, 'robots.txt'), 'utf8');
  assert.match(robots, /^User-agent:\s*\*\s*$/m);
  assert.match(robots, /^Allow:\s*\/\s*$/m);
  const sitemapDirectives = [...robots.matchAll(/^Sitemap:\s*(\S+)\s*$/gim)].map(([, url]) => url);
  assert.deepEqual(sitemapDirectives, [sitemapUrl]);
  assert.doesNotMatch(robots, /^Disallow:\s*\//im);
});

test('sitemap.xml contains exactly the successful canonical homepage and project routes', async () => {
  const sitemap = await readFile(path.join(root, 'sitemap.xml'), 'utf8');
  assert.match(sitemap, /^<\?xml version="1\.0" encoding="UTF-8"\?>/);
  assert.match(sitemap, /<urlset\s+xmlns="http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9">/);
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(([, url]) => url.trim());
  assert.deepEqual(urls, canonicalUrls);
  assert.equal([...sitemap.matchAll(/<url>/g)].length, canonicalUrls.length);
  assert.equal(new Set(urls).size, canonicalUrls.length);
});

test('shared-shell build publishes robots.txt and sitemap.xml at the output root', async () => {
  const output = await mkdtemp(path.join(tmpdir(), 'portfolio-seo-output-'));
  try {
    await buildSite({ output });
    assert.equal(
      await readFile(path.join(output, 'robots.txt'), 'utf8'),
      await readFile(path.join(root, 'robots.txt'), 'utf8'),
    );
    assert.equal(
      await readFile(path.join(output, 'sitemap.xml'), 'utf8'),
      await readFile(path.join(root, 'sitemap.xml'), 'utf8'),
    );
  } finally {
    await rm(output, { recursive: true, force: true });
  }
});
