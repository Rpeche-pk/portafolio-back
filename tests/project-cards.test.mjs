import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const homepage = await readFile(join(root, "index.html"), "utf8");
const script = await readFile(join(root, "assets/js/work-gallery.js"), "utf8");
const styles = await readFile(join(root, "assets/css/work-gallery.css"), "utf8");
const projectEntries = [...script.matchAll(/\{ id: '([^']+)', title: '([^']+)', image: '([^']+)', href: '([^']+)', demoUrl: (null|'[^']+')/g)]
  .map(([, id, title, image, href, demo]) => ({ id, title, image, href, demoUrl: demo === "null" ? null : demo.slice(1, -1) }));

const expectedProjects = [
  ["ai-assistant", "AI Assistant", "assets/img/tech/spring-ai.jpg", "project-page-5.html", null],
  ["zephyr-cygnus", "Zephyr Cygnus", "assets/img/tech/zephyr.png", "project-page.html", "https://youtube.com/shorts/Y6HE0hWtwjQ?feature=share"],
  ["trucking", "Trucking", "assets/img/tech/trucking.png", "project-page-3.html", "https://youtu.be/UziTMfvcI_I?si=1UnvCDU5zI0jnLUk"],
  ["maipevi-bot", "Maipevi Bot", "assets/img/tech/maipevi.png", "project-page-4.html", "https://youtube.com/shorts/dmyQ0JASXjg?feature=share"],
  ["cashier", 'Digital Wallet "Cashier"', "assets/img/nature/Banner.png", "project-page-2.html", "https://youtu.be/HhMpTuKcwdA?si=xswrr048GnvEkTyE"],
  ["devbot-supermarket", "DevBot Supermarket", "assets/img/tech/devbot.png", "project-page-1.html", null],
];

test("homepage renders six sourced project cards with valid detail/image paths", () => {
  assert.match(homepage, /<div class="project-list" id="project-list"><\/div>/);
  assert.match(homepage, /<noscript[^>]*>[\s\S]*AI Assistant[\s\S]*DevBot Supermarket[\s\S]*<\/noscript>/);
  assert.equal(projectEntries.length, expectedProjects.length);
  assert.deepEqual(projectEntries.map(({ id, title, image, href }) => [id, title, image, href]),
    expectedProjects.map(([id, title, image, href]) => [id, title, image, href]));

  for (const project of projectEntries) {
    assert.ok(existsSync(join(root, project.image)), `${project.title} image exists`);
    assert.ok(existsSync(join(root, project.href)), `${project.title} detail page exists`);
  }
  assert.match(script, /card\.className = 'project-card'/);
  assert.match(script, /detailsLink\.href = project\.href/);
  assert.match(styles, /\.project-card\s*\{/);
});

test("only distinct real demos are rendered as external actions", () => {
  const demos = projectEntries.filter((project) => project.demoUrl);
  assert.deepEqual(projectEntries.map((project) => project.demoUrl), expectedProjects.map((project) => project[4]));
  assert.equal(demos.length, 4);
  assert.equal(new Set(demos.map((project) => project.demoUrl)).size, demos.length);
  for (const project of demos) {
    assert.equal(new URL(project.demoUrl).protocol, "https:");
    assert.notEqual(project.demoUrl, project.href, `${project.title} demo is distinct from its detail page`);
  }
  assert.match(script, /if \(project\.demoUrl\)/);
  assert.match(script, /demoLink\.rel = 'noopener noreferrer'/);
});
