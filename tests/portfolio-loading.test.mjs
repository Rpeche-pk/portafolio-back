import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const pages = ["project-page.html", ...Array.from({ length: 5 }, (_, index) => `project-page-${index + 1}.html`)];
const detailHtml = new Map(await Promise.all(pages.map(async (page) => [page, await readFile(join(root, page), "utf8")])));
const homeHtml = await readFile(join(root, "index.html"), "utf8");
const styles = await readFile(join(root, "assets/css/work-gallery.css"), "utf8");
const renderer = await readFile(join(root, "assets/js/work-gallery.js"), "utf8");

test("below-fold project imagery stays lazy, decoded asynchronously, low priority, and size-reserved", () => {
  const projectRenderer = renderer.slice(renderer.indexOf("function renderProjects"), renderer.indexOf("function renderProofBadges"));
  const timelineRenderer = renderer.slice(renderer.indexOf("function createExperienceProjectElement"), renderer.indexOf("function renderExperienceRoles"));

  for (const builder of [projectRenderer, timelineRenderer]) {
    assert.match(builder, /image\.loading\s*=\s*'lazy'/);
    assert.match(builder, /image\.decoding\s*=\s*'async'/);
    assert.match(builder, /image\.fetchPriority\s*=\s*'low'/);
  }
  assert.match(styles, /\.project-media\s*\{[^}]*aspect-ratio:\s*16\s*\/\s*9/s);
  assert.match(styles, /\.about-project-media img\s*\{[^}]*aspect-ratio:\s*16\s*\/\s*10/s);
  assert.match(styles, /@media\s*\(max-width:\s*760px\)[\s\S]*?\.about-project-media img\s*\{[^}]*aspect-ratio:\s*16\s*\/\s*9/s);
});

test("all project-detail LCP covers receive high fetch priority while retaining reserved space", () => {
  for (const [page, html] of detailHtml) {
    const cover = html.match(/<img\b[^>]*class="project-detail-cover"[^>]*>/)?.[0];
    assert.ok(cover, `${page} has a cover image`);
    assert.match(cover, /\bfetchpriority="high"/, `${page} cover is high priority`);
  }
  assert.match(styles, /\.project-page \.project-detail-cover\s*\{[^}]*aspect-ratio:\s*16\s*\/\s*9/s);
});

test("below-fold Zephyr gallery images remain dimensioned and load lazily", () => {
  const images = [...(detailHtml.get("project-page.html").matchAll(/<img\b[^>]*class="img-fluid"[^>]*>/gi))].map(([tag]) => tag);
  assert.equal(images.length, 3);
  for (const [index, image] of images.entries()) {
    assert.match(image, /\bwidth="\d+"/i, `gallery image ${index + 1} has intrinsic width`);
    assert.match(image, /\bheight="\d+"/i, `gallery image ${index + 1} has intrinsic height`);
    assert.match(image, /\bloading="lazy"/i, `gallery image ${index + 1} is lazy-loaded`);
    assert.match(image, /\bdecoding="async"/i, `gallery image ${index + 1} decodes asynchronously`);
  }
});

test("detail pages omit confirmed-unused legacy resources and retain shared behavior dependencies", () => {
  const unusedResources = [
    /assets\/css\/(?:Lato\.css|animate\.min\.css|Articles-Cards-images\.css|pikaday\.min\.css)/,
    /assets\/fonts\/ionicons\.min\.css/,
    /assets\/bootstrap\/js\/bootstrap\.min\.js/,
    /assets\/js\/(?:bs-init|contact-me|pikaday|theme)\.js/,
  ];
  for (const [page, html] of detailHtml) {
    for (const resource of unusedResources) assert.doesNotMatch(html, resource, `${page} omits ${resource}`);
    assert.match(html, /assets\/bootstrap\/css\/bootstrap\.min\.css/, `${page} retains Bootstrap utilities`);
    assert.match(html, /assets\/css\/work-gallery\.css/, `${page} retains shared styles`);
    assert.match(html, /assets\/js\/work-gallery\.js/, `${page} retains shared interactions`);
    assert.match(html, /assets\/js\/language\.js/, `${page} retains localization`);
    assert.match(html, /sweetalert2@11/, `${page} retains the language toast dependency`);
    assert.match(html, /assets\/js\/particles\.min\.js/, `${page} leaves the particle library untouched`);
  }
  assert.match(homeHtml, /<img class="portrait"[^>]*\bwidth="720"[^>]*\bheight="720"[^>]*\bfetchpriority="high"/);
});
