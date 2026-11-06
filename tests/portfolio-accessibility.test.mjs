import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const homepage = await readFile(join(root, "index.html"), "utf8");
const renderer = await readFile(join(root, "assets/js/work-gallery.js"), "utf8");

test("Skills carousel preserves native list items and accessible slide labels", () => {
  const slides = [...homepage.matchAll(/<li\b[^>]*class="skills-slide"[^>]*>/gi)].map(([tag]) => tag);
  assert.equal(slides.length, 20);
  for (const [index, slide] of slides.entries()) {
    assert.doesNotMatch(slide, /\brole\s*=\s*["']group["']/i, `slide ${index + 1} must remain a native list item`);
    assert.match(slide, /\baria-roledescription="slide"/, `slide ${index + 1} keeps its slide description`);
    assert.match(slide, /\baria-label="[^"]+"/, `slide ${index + 1} keeps its accessible name`);
  }

  const updater = renderer.slice(renderer.indexOf("function updateSkillsSlideLabels"), renderer.indexOf("function applySkillsFilter"));
  assert.match(updater, /slide\.setAttribute\('aria-roledescription'/);
  assert.match(updater, /slide\.setAttribute\('aria-label'/);
  assert.doesNotMatch(updater, /slide\.setAttribute\('role'/);
});
