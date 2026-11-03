import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const homepage = await readFile(join(root, "index.html"), "utf8");
const styles = await readFile(join(root, "assets/css/work-gallery.css"), "utf8");
const hero = homepage.match(/<section class="portfolio-block block-intro hero"[^>]*>([\s\S]*?)<\/section>\s*<div class="cord-slot">/)?.[1];

test("homepage hero preserves the approved content, image, and local actions", () => {
  assert.ok(hero, "homepage Work Gallery hero exists");
  assert.match(hero, /<h1 id="hero-title"[^>]*>Luis Peche<\/h1>/);
  assert.match(hero, /Backend &amp; Generative AI Developer/);
  assert.match(hero, /<img class="portrait"[^>]*src="assets\/img\/avatars\/perfil\.jpg"[^>]*alt="Portrait of Luis Peche"/);
  assert.match(hero, /href="cv\.html"/);
  assert.doesNotMatch(hero, /<br\s*\/?\s*>/i);
  assert.match(homepage, /<link rel="stylesheet" href="assets\/css\/work-gallery\.css">/);
});

test("hero reflows its image and copy at tablet widths without fixed-height clipping", () => {
  assert.match(styles, /\.hero\s*\{[^}]*min-height:\s*calc\(100svh\s*-\s*var\(--nav-height\)\)[^}]*grid-template-columns:\s*minmax\(0,\s*1fr\)/s);
  assert.match(styles, /@media\s*\(max-width:\s*900px\)[\s\S]*?\.hero\s*\{[^}]*grid-template-columns:\s*minmax\(0,\s*1fr\)/s);
  assert.match(styles, /@media\s*\(max-width:\s*900px\)[\s\S]*?\.hero-media\s*\{[^}]*grid-row:\s*1/s);
  assert.match(styles, /@media\s*\(max-width:\s*900px\)[\s\S]*?\.hero-copy\s*\{[^}]*grid-row:\s*2/s);
  assert.doesNotMatch(styles, /\.hero\s*\{[^}]*\bheight:\s*100vh/s);
});

test("hero image and actions remain sized and reduced-motion aware", () => {
  assert.match(styles, /\.profile-photo-clip\s*\{[^}]*aspect-ratio:\s*4\s*\/\s*5[^}]*overflow:\s*hidden/s);
  assert.match(styles, /\.portrait\s*\{[^}]*width:\s*100%[^}]*height:\s*100%[^}]*object-fit:\s*cover/s);
  assert.match(styles, /\.button\s*\{[^}]*min-height:\s*48px/s);
  assert.match(styles, /@media\s*\(prefers-reduced-motion:\s*reduce\)[\s\S]*?\.hero-media[\s\S]*?transition:\s*none/s);
});
