import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const repositoryRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const pageShell = JSON.parse(await readFile(join(repositoryRoot, "templates/page-shell.json"), "utf8"));
const navbarTemplate = await readFile(join(repositoryRoot, "templates/work-gallery-navbar.html"), "utf8");
const workGalleryScript = await readFile(join(repositoryRoot, "assets/js/work-gallery.js"), "utf8");
const projects = [...workGalleryScript.matchAll(/\{ id: '([^']+)', title: '([^']+)', image: '([^']+)', href: '([^']+)'/g)]
  .map(([, id, title, image, href]) => ({ id, title, image, href }));
const detailRoutes = [
  ["ai-assistant", "project-page-5.html"],
  ["zephyr-cygnus", "project-page.html"],
  ["trucking", "project-page-3.html"],
  ["maipevi-bot", "project-page-4.html"],
  ["cashier", "project-page-2.html"],
  ["devbot-supermarket", "project-page-1.html"],
];
const internalNavigation = {
  home: "index.html#home",
  projects: "index.html#projects",
  skills: "index.html#skills",
  about: "index.html#about",
  contact: "index.html#contact",
};

 test("six project cards resolve to the existing detail routes", () => {
  assert.deepEqual(projects.map(({ id, href }) => [id, href]), detailRoutes);
  for (const [, href] of detailRoutes) {
    assert.ok(existsSync(join(repositoryRoot, href)), `${href} exists`);
  }

  const renderer = workGalleryScript.slice(workGalleryScript.indexOf("function renderProjects"), workGalleryScript.indexOf("function renderProofBadges"));
  assert.match(renderer, /media\.href = project\.href/);
  assert.match(renderer, /titleLink\.href = project\.href/);
  assert.match(renderer, /detailsLink\.href = project\.href/);
  assert.doesNotMatch(renderer, /(?:media|titleLink|detailsLink)\.target\s*=/);
});

test("all six project routes use the Work Gallery shell and real home-section destinations", async () => {
  for (const [, pageName] of detailRoutes) {
    const config = pageShell[pageName];
    const html = await readFile(join(repositoryRoot, pageName), "utf8");

    assert.equal(config.navbarTemplate, "work-gallery-navbar.html", `${pageName} navbar`);
    assert.equal(config.footerTemplate, "work-gallery-footer.html", `${pageName} footer`);
    assert.deepEqual(config.activeLinks, ["nav-project"], `${pageName} active navigation`);
    assert.deepEqual(config.navigation, internalNavigation, `${pageName} navigation destinations`);
    assert.equal(config.contactHref, "index.html#contact", `${pageName} contact destination`);
    assert.match(html, /<!-- shared-navbar -->/);
    assert.match(html, /<!-- shared-footer -->/);
    assert.match(html, /assets\/css\/work-gallery\.css/);
    assert.match(html, /assets\/js\/work-gallery\.js/);
    assert.match(html, /assets\/js\/language\.js/);
    assert.match(html, /data-theme="light"/);
    assert.match(html, /data-bs-theme="light"/);
    assert.match(html, /localStorage\.getItem\(['"]portfolio-theme['"]\)/);
  }
});

test("the shared Work Gallery navbar supports both project localization and current-page semantics", () => {
  assert.match(navbarTemplate, /<nav\b[^>]*id="flags"/);
  assert.equal([...navbarTemplate.matchAll(/data-nav="projects"[^>]*\{\{CURRENT_PROJECTS\}\}/g)].length, 2);
  assert.match(navbarTemplate, /data-language="es"/);
  assert.match(navbarTemplate, /data-language="en"/);
});
