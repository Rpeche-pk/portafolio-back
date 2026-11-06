import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const homepage = await readFile(join(root, "index.html"), "utf8");
const behavior = await readFile(join(root, "assets/js/work-gallery.js"), "utf8");
const footerTemplate = await readFile(join(root, "templates/work-gallery-footer.html"), "utf8");
const shell = JSON.parse(await readFile(join(root, "templates/page-shell.json"), "utf8"));

function extractSectionIds(html) {
  return [...html.matchAll(/<section\b[^>]*\bid="([^"]+)"/g)].map(([, id]) => id);
}

test("homepage retains incumbent title, one labelled H1, and the approved section anchors", () => {
  assert.match(homepage, /<title>Luis Peche Aparcana \| Backend &amp; AI Developer<\/title>/);
  assert.equal((homepage.match(/<h1\b/g) ?? []).length, 1);
  assert.match(homepage, /<h1 id="hero-title" data-i18n="heroName">Luis Peche<\/h1>/);
  assert.deepEqual(extractSectionIds(homepage), ["home", "projects", "skills", "about", "contact"]);
  assert.match(homepage, /href="assets\/css\/work-gallery\.css"/);
  assert.match(homepage, /src="assets\/js\/work-gallery\.js"/);
  assert.equal(shell["index.html"].navbarTemplate, "work-gallery-navbar.html");
  assert.equal(shell["index.html"].footerTemplate, "work-gallery-footer.html");
});

test("home Know Me action links to the About Me section", () => {
  assert.match(homepage, /<a class="button" href="#about"><span data-i18n="knowMe">Know Me<\/span>/);
  assert.match(homepage, /<section\b[^>]*id="about"/);
});

test("project, credential, skill, and journey content remains available without JavaScript", () => {
  const fallbacks = [...homepage.matchAll(/<noscript[^>]*>([\s\S]*?)<\/noscript>/g)].map(([, content]) => content);
  const projectFallback = fallbacks.find((content) => content.includes("Project links remain available")) ?? "";
  const credentialFallback = fallbacks.find((content) => content.includes("AWS Certified Cloud Practitioner")) ?? "";
  assert.equal((projectFallback.match(/<a\b/g) ?? []).length, 6);
  assert.match(projectFallback, /OCR/);
  assert.match(projectFallback, /Proyecto Tesis Maivibot/);
  assert.match(credentialFallback, /AWS Certified Cloud Practitioner/);
  assert.match(credentialFallback, /AWS Certified AI Practitioner/);
  assert.equal((credentialFallback.match(/<li\b/g) ?? []).length, 2);
  assert.equal((credentialFallback.match(/<a\b/g) ?? []).length, 2);
  assert.doesNotMatch(credentialFallback, /Credly URL pending|Falta la URL de Credly/);
  assert.match(credentialFallback, /View AI credential/);
  assert.match(credentialFallback, /View credential/);
  assert.match(credentialFallback, /rel="noopener noreferrer"/);
  assert.match(credentialFallback, /139dafc0-fbbb-4bd1-a3ee-2d9e89107414/);
  assert.equal((homepage.match(/class="skills-slide"/g) ?? []).length, 20);
  assert.equal((homepage.match(/class="about-timeline-item"/g) ?? []).length, 12);
  assert.match(homepage, /The hero includes an introductory AWS course and the Alura Java and Spring Boot specialization\./);
});

test("English and Spanish copy includes the main project, skills, and contact experiences", () => {
  assert.match(behavior, /projectsTitle: 'What I Build'/);
  assert.match(behavior, /projectsTitle: 'Lo que construyo'/);
  assert.match(behavior, /skillsTitle: 'Tools Behind the Work'/);
  assert.match(behavior, /skillsTitle: 'Herramientas detrás del trabajo'/);
  assert.match(behavior, /contactTitle: 'Contact Me'/);
  assert.match(behavior, /certificationsTitle: 'Certifications'/);
  assert.match(behavior, /certificationListLabel: 'AWS certification examples'/);
  assert.match(behavior, /certificationsTitle: 'Certificaciones'/);
  assert.match(behavior, /certificationListLabel: 'Ejemplos de certificaciones AWS'/);
  assert.match(behavior, /contactTitle: 'Contáctame'/);
});

test("contact and CV actions keep real local/document destinations and validation bounds", () => {
  assert.match(homepage, /<form[^>]*action="https:\/\/send\.pageclip\.co\//);
  assert.match(homepage, /id="contact-message"[^>]*maxlength="1500"/);
  assert.match(footerTemplate, /https:\/\/mail\.google\.com\/mail\/u\/0\/\?to=pecheaparcana1998@gmail\.com/);
  assert.match(homepage, /href="assets\/pdf\/luis-peche-cv\.pdf"/);
  assert.match(homepage, /download="luis-peche-cv\.pdf"/);
  assert.doesNotMatch(homepage, /href="cv\.html"/);
});

test("home page source has unique IDs and no project-detail local anchors", () => {
  const ids = [...homepage.matchAll(/\bid="([^"]+)"/g)].map(([, id]) => id);
  assert.equal(new Set(ids).size, ids.length);
  const localAnchors = [...homepage.matchAll(/href="#([^"]+)"/g)].map(([, id]) => id);
  for (const id of localAnchors) assert.ok(ids.includes(id), `#${id} has a matching target`);
});
