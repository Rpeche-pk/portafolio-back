import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");

test("S7: each project route has valid desktop and mobile screenshot evidence", () => {
  const report = readFileSync(resolve(repositoryRoot, "docs/project-detail-validation.md"), "utf8");
  const rows = report.split("\n").filter((line) => line.startsWith("|") && line.includes("Playwright passed"));
  const expectedRoutes = new Set([
    "project-page.html",
    "project-page-1.html",
    "project-page-2.html",
    "project-page-3.html",
    "project-page-4.html",
    "project-page-5.html",
  ]);
  const routes = new Set();

  assert.equal(rows.length, expectedRoutes.size);
  for (const row of rows) {
    const links = [...row.matchAll(/\]\((\.\.\/[^)]+)\)/g)]
      .map((match) => resolve(repositoryRoot, "docs", match[1]));
    assert.equal(links.length, 3, "each row links its route and two screenshots");
    routes.add(links[0].split(/[\\/]/).pop());

    for (const path of links) assert.ok(existsSync(path), `${path} exists`);
    for (const [index, expectedWidth] of [[1, 1440], [2, 390]]) {
      const png = readFileSync(links[index]);
      assert.equal(png.subarray(0, 8).toString("hex"), "89504e470d0a1a0a", `${links[index]} is PNG`);
      assert.equal(png.readUInt32BE(16), expectedWidth, `${links[index]} width`);
      assert.ok(png.readUInt32BE(20) > 0, `${links[index]} height`);
    }
  }

  assert.deepEqual(routes, expectedRoutes);
});

test("S4/S6: retained browser evidence covers every route and viewport", () => {
  const evidence = JSON.parse(readFileSync(resolve(repositoryRoot, "docs/project-detail-playwright-evidence.json"), "utf8"));

  assert.equal(evidence.result, "PASS");
  assert.equal(evidence.routesChecked, 6);
  assert.equal(evidence.viewportCases, 18);
  assert.deepEqual(evidence.browserErrors, []);
  assert.ok(existsSync(resolve(repositoryRoot, evidence.script)), "matrix runner exists");
  assert.deepEqual(evidence.results.map((row) => row.route), [
    "project-page.html",
    ...[1, 2, 3, 4, 5].map((number) => `project-page-${number}.html`),
  ]);

  for (const row of evidence.results) {
    assert.deepEqual(row.viewportChecks.map((viewport) => viewport.width), [320, 390, 1440]);
    for (const viewport of row.viewportChecks) {
      assert.equal(viewport.overflow, false);
      assert.equal(viewport.h1Count, 1);
      assert.equal(viewport.allImagesLoadedAndNamed, true);
      assert.ok(viewport.projectOutboundCount > 0);
    }
    assert.deepEqual(row.keyboardFocus, {
      targetClass: "nav-link",
      focusVisible: true,
      outlineWidth: "3px",
    });
    assert.equal(row.language.spanishAndEnglishSwitch, "pass");
    assert.equal(row.language.persisted, true);
    assert.deepEqual(row.theme, {
      lightToDark: "pass",
      bootstrapSynchronized: true,
      persistedAfterReload: true,
      toggleAriaPressed: "true",
    });
    assert.equal(row.reducedMotionTransitionDuration, "0s");
  }

  assert.equal(evidence.results[0].language.zephyrAltCycle, "es→en→es pass");
});
