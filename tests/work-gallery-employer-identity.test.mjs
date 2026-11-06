import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const homePage = await readFile(new URL("../index.html", import.meta.url), "utf8");
const cvPage = await readFile(new URL("../cv.html", import.meta.url), "utf8");
const workGallery = await readFile(new URL("../assets/js/work-gallery.js", import.meta.url), "utf8");
const experienceData = await readFile(new URL("../assets/js/experience-data.js", import.meta.url), "utf8");
const styles = await readFile(new URL("../assets/css/work-gallery.css", import.meta.url), "utf8");

function employerHeader(id) {
  const idIndex = homePage.indexOf(`data-about-experience-id="${id}"`);
  if (idIndex < 0) return "";
  const headerStart = homePage.indexOf('<header class="about-card-header">', idIndex);
  const headerEnd = homePage.indexOf("</header>", idIndex);
  return headerStart >= 0 && headerEnd >= 0 ? homePage.slice(headerStart, headerEnd + 9) : "";
}

test("Caja Ica, No Country, and Hospital headers show their supplied employer marks", () => {
  const expected = [
    ["caja-ica", "assets/icon/caja-ica.png"],
    ["no-country", "assets/icon/no-country.jpg"],
    ["hospital-regional-de-ica", "assets/icon/hrica.png"]
  ];
  for (const [id, src] of expected) {
    const header = employerHeader(id);
    assert.ok(header, `${id} experience header exists`);
    assert.match(header, new RegExp(`<img[^>]*src="${src.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\\\$&")}"`));
    assert.match(header, /width="52" height="52"/);
    assert.match(header, /alt=""/);
    assert.match(header, /class="about-employer-mark"/);
  }
  assert.match(styles, /\.about-employer-heading\s*\{[^}]*display:\s*flex/);
  assert.match(styles, /\.about-employer-mark\s*\{[^}]*object-fit:\s*contain/);
  assert.match(styles, /@media\s*\(max-width:\s*480px\)[\s\S]*?\.about-employer-mark\s*\{[^}]*width:\s*44px/);
});

test("Caja Ica heading links safely to its official website", () => {
  const header = employerHeader("caja-ica");
  assert.match(header, /<h3[^>]*id="about-record-caja-ica"[^>]*>[\s\S]*?<a[^>]*href="https:\/\/cajaica\.pe\/"[^>]*target="_blank"[^>]*rel="noopener noreferrer"[^>]*>Caja Ica/);
  assert.match(header, /class="sr-only" data-i18n="projectExternalNewTab"/);
});

test("Freelance Programmer is removed only from the Experience timeline", () => {
  assert.equal((homePage.match(/data-about-experience-id="zephyr-cygnus"/g) ?? []).length, 0);
  assert.doesNotMatch(homePage, /data-i18n="aboutTitleZephyr"|Freelance Programmer/);
  assert.doesNotMatch(experienceData, /id: 'zephyr-cygnus'/);
  assert.match(workGallery, /\{ id: 'zephyr-cygnus', title: 'Zephyr Cygnus', image: 'assets\/img\/tech\/zephyr\.png', href: 'project-page\.html'/);
  assert.match(cvPage, /Freelance Programmer/);
});

test("timeline counts reflect two added education records and one removed experience record", () => {
  assert.equal((homePage.match(/class="about-timeline-item"/g) ?? []).length, 12);
  assert.match(homePage, /data-about-count="all">12</);
  assert.match(homePage, /data-about-count="experience">3</);
  assert.match(homePage, /data-about-count="education">9</);
});
