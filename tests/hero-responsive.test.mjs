import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const homepage = await readFile(join(root, "index.html"), "utf8");
const styles = await readFile(join(root, "assets/css/work-gallery.css"), "utf8");
const renderer = await readFile(join(root, "assets/js/work-gallery.js"), "utf8");
const hero = homepage.match(/<section class="portfolio-block block-intro hero"[^>]*>([\s\S]*?)<\/section>\s*<div class="cord-slot">/)?.[1];

test("homepage hero preserves the approved content, image, and local actions", () => {
  assert.ok(hero, "homepage Work Gallery hero exists");
  assert.match(hero, /<h1 id="hero-title"[^>]*>Luis Peche Aparcana<\/h1>/);
  assert.match(hero, /Backend &amp; Generative AI Developer/);
  assert.match(hero, /<img class="portrait"[^>]*src="assets\/img\/avatars\/perfil\.jpg"[^>]*alt="Portrait of Luis Peche"/);
  assert.match(hero, /href="assets\/pdf\/luis-peche-cv\.pdf"/);
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

test("credential actions use a slim visual pill while keeping a 44px target", () => {
  assert.ok(/\.certification-link\s*\{[^}]*min-height:\s*44px[^}]*padding:\s*0\s+8px[^}]*border:\s*0[^}]*background:\s*transparent[^}]*font-size:\s*11px[^}]*line-height:\s*1\.2/s.test(styles), "credential link keeps a 44px hit area without drawing the full-height pill on it");
  assert.ok(/\.certification-link::before\s*\{[^}]*position:\s*absolute[^}]*inset:\s*5px\s+0[^}]*border:\s*1px[^}]*content:\s*""/s.test(styles), "visible pill is inset within the accessible target");
  assert.ok(/\.certification-link-arrow\s*\{[^}]*font-size:\s*12px/s.test(styles), "credential-link arrow is scaled with its label");
});

test("certification badges grow together with balanced responsive columns", () => {
  assert.ok(/\.certification-card\s*\{[^}]*grid-template-columns:\s*minmax\(0,\s*1fr\)\s*72px/s.test(styles), "desktop card reserves the larger badge column");
  assert.ok(/\.certification-badge\s*\{[^}]*width:\s*72px[^}]*height:\s*72px/s.test(styles), "desktop badge images use the larger dimensions");
  assert.ok(/@media\s*\(max-width:\s*760px\)[\s\S]*?\.certification-card\s*\{[^}]*grid-template-columns:\s*minmax\(0,\s*1fr\)\s*64px[\s\S]*?\.certification-badge\s*\{[^}]*width:\s*64px[^}]*height:\s*64px/s.test(styles), "mobile card column and badge dimensions stay in sync");
  assert.ok(/badge\.width\s*=\s*72;\s*badge\.height\s*=\s*72;/.test(renderer), "runtime badge dimensions match the desktop design size");
  assert.equal((homepage.match(/class="certification-badge"[^>]*width="72"[^>]*height="72"/g) ?? []).length, 2, "both no-JavaScript badge images match the runtime dimensions");
});

test("hero and credential actions provide scoped hover, active, focus, and reduced-motion states", () => {
  assert.match(styles, /\.hero-actions\s*>\s*\.button\s*\{[^}]*min-height:\s*48px[^}]*transition:[^}]*transform[^}]*background-color/s);
  assert.match(styles, /\.hero-actions\s*>\s*\.button:focus-visible\s*\{[^}]*outline:\s*3px/s);
  assert.match(styles, /\.hero-actions\s*>\s*\.button:active\s*\{/);
  assert.match(styles, /\.hero-actions\s*>\s*\.button:hover:active\s*\{[^}]*transform:\s*translateY\(0\)\s*scale\(\.98\)[^}]*box-shadow:\s*none/s);
  assert.match(styles, /\.hero-actions\s*>\s*\.button:first-child:hover\s+\.button-arrow\s*\{/);
  assert.match(styles, /\.hero-actions\s*>\s*\.button-secondary:hover\s+\.button-arrow\s*\{/);
  assert.match(styles, /\.certification-link\s*\{[^}]*min-height:\s*44px[^}]*max-width:\s*100%[^}]*white-space:\s*normal[^}]*transition:/s);
  assert.match(styles, /\.certification-link:focus-visible\s*\{/);
  assert.match(styles, /\.certification-link:active\s*\{/);
  assert.match(styles, /\.certification-link:hover:active\s*\{[^}]*transform:\s*scale\(\.98\)/);
  assert.match(styles, /\.certification-link:hover:active::before\s*\{[^}]*background-color:[^}]*box-shadow:\s*none/s);
  assert.match(styles, /\.certification-link:hover::before\s*\{[^}]*background-color:[^}]*border-color:[^}]*box-shadow:/s);
  assert.match(styles, /\.certification-link:active::before\s*\{[^}]*background-color:/s);
  assert.match(styles, /\.certification-link:hover\s+\.certification-link-arrow\s*\{/);
  assert.match(styles, /@media\s*\(hover:\s*hover\)\s*and\s*\(pointer:\s*fine\)\s*and\s*\(prefers-reduced-motion:\s*no-preference\)[\s\S]*?\.hero-actions\s*>\s*\.button:hover/s);
  assert.match(styles, /@media\s*\(prefers-reduced-motion:\s*reduce\)[\s\S]*?\.hero-actions\s*>\s*\.button\s*,\s*\.hero-actions\s*>\s*\.button\s+\.button-arrow\s*,\s*\.certification-link\s*,\s*\.certification-link::before\s*,\s*\.certification-link-arrow\s*\{\s*transition:\s*none;/s);
  assert.match(styles, /@media\s*\(prefers-reduced-motion:\s*reduce\)[\s\S]*?\.certification-link[\s\S]*?transition:\s*none/s);
  assert.match(styles, /\.hero-actions\s*>\s*\.button:hover:active,\s*\.certification-link:hover:active\s*\{\s*transform:\s*none;/);
});
