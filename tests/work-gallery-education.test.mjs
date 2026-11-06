import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const homePage = await readFile(new URL("../index.html", import.meta.url), "utf8");
const behavior = await readFile(new URL("../assets/js/work-gallery.js", import.meta.url), "utf8");
const architecturePdf = await readFile(new URL("../assets/pdf/certificado-galaxy-architecture.pdf", import.meta.url));

function timelineRecord(id) {
  const titleIndex = homePage.indexOf(`id="${id}"`);
  if (titleIndex < 0) return "";
  const recordStart = homePage.lastIndexOf('<li class="about-timeline-item"', titleIndex);
  const recordEnd = homePage.indexOf("</li>", titleIndex);
  return recordStart >= 0 && recordEnd >= 0 ? homePage.slice(recordStart, recordEnd + 5) : "";
}

test("Software Architecture in Java is a dated Education record with a downloadable local certificate", () => {
  const record = timelineRecord("about-record-java-architecture");
  assert.ok(record, "the Software Architecture certificate is present in the static timeline");
  assert.match(record, /data-about-group="education"/);
  assert.match(record, /data-about-start="2025-08-16"/);
  assert.match(record, /datetime="2025-08-16" data-i18n="aboutDateJavaArchitecture"/);
  assert.match(record, /data-i18n="aboutTitleJavaArchitecture">Software Architecture in Java<\/h3>/);
  assert.match(record, /href="assets\/pdf\/certificado-galaxy-architecture\.pdf"[^>]*download/);
  assert.ok(architecturePdf.subarray(0, 5).equals(Buffer.from("%PDF-")), "the linked certificate is a PDF");
  assert.ok(homePage.indexOf('id="about-record-java-architecture"') < homePage.indexOf('id="about-record-data-analytics"'), "the 2025 certificate precedes 2023 Education records");
  assert.match(behavior, /aboutDateJavaArchitecture: 'Aug\. 16, 2025 — Jan\. 10, 2026'/);
  assert.match(behavior, /aboutDateJavaArchitecture: '16 ago\. 2025 — 10 ene\. 2026'/);
  assert.match(behavior, /aboutDescriptionJavaArchitecture: '[^']*Layered, Hexagonal, and Clean Architecture[^']*Java and Spring[^']*maintainable, scalable, and decoupled systems/);
  assert.match(behavior, /aboutDescriptionJavaArchitecture: '[^']*arquitecturas en capas, hexagonal y limpia[^']*Java y Spring[^']*mantenibles, escalables y desacoplados/);
});

test("AWS Certified AI Practitioner Education record shows its three-year validity and supplied Credly link", () => {
  const record = timelineRecord("about-record-ai-practitioner");
  assert.ok(record, "the AI Practitioner certificate is present in the static timeline");
  assert.match(record, /data-about-group="education"/);
  assert.match(record, /data-about-start="2026-09-24"/);
  assert.match(record, /datetime="2026-09-24" data-i18n="aboutDateAiPractitioner"/);
  assert.match(record, /data-i18n="aboutTitleAiPractitioner">AWS Certified AI Practitioner<\/h3>/);
  assert.match(record, /Sep\. 24, 2026[^<]*Sep\. 24, 2029|24 sep\. 2026[^<]*24 sep\. 2029/);
  assert.match(record, /href="https:\/\/www\.credly\.com\/badges\/139dafc0-fbbb-4bd1-a3ee-2d9e89107414\/public_url"/);
  assert.match(record, /target="_blank" rel="noopener noreferrer"/);
  assert.match(record, /data-i18n="projectExternalNewTab"/);
  assert.match(behavior, /aboutDateAiPractitioner: 'Sep\. 24, 2026 — Sep\. 24, 2029'/);
  assert.match(behavior, /aboutDateAiPractitioner: '24 sep\. 2026 — 24 sep\. 2029'/);
  assert.match(behavior, /aboutDescriptionAiPractitioner: '[^']*foundational AWS AI credential[^']*valid for three years/);
  assert.match(behavior, /aboutDescriptionAiPractitioner: '[^']*credencial fundamental de AWS en IA[^']*vigente por tres años/);
  assert.ok(homePage.indexOf('id="about-record-ai-practitioner"') < homePage.indexOf('id="about-record-java-architecture"'), "the 2026 certificate precedes the 2025 certificate");
});

test("Education records are reflected in the static filter counts", () => {
  assert.match(homePage, /data-about-count="all">12</);
  assert.match(homePage, /data-about-count="experience">3</);
  assert.match(homePage, /data-about-count="education">9</);
});
