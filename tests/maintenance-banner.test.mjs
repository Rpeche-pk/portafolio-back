import assert from "node:assert/strict";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { buildSite } from "../scripts/build-shared-shell.mjs";

const repositoryRoot = dirname(dirname(fileURLToPath(import.meta.url)));

async function withOutput(run) {
  const tempRoot = await mkdtemp(join(tmpdir(), "portfolio-maintenance-banner-"));
  try {
    await run(tempRoot);
  } finally {
    await rm(tempRoot, { recursive: true, force: true });
  }
}

test("exact true build flag inserts the translated banner above Home and detail navbars", async () => {
  await withOutput(async (tempRoot) => {
    const output = join(tempRoot, "enabled");
    await buildSite({ output, environment: { MAINTENANCE_BANNER: "true" } });

    const [home, detail, translations, builtIcon, sourceIcon] = await Promise.all([
      readFile(join(output, "index.html"), "utf8"),
      readFile(join(output, "project-page.html"), "utf8"),
      readFile(join(output, "assets/js/work-gallery.js"), "utf8"),
      readFile(join(output, "assets/icon/logbrew.svg")),
      readFile(join(repositoryRoot, "assets/icon/logbrew.svg")),
    ]);

    for (const [pageName, page] of [["Home", home], ["project detail", detail]]) {
      const bannerIndex = page.indexOf('class="maintenance-banner"');
      const navbarIndex = page.indexOf('<header class="site-header">');
      assert.ok(bannerIndex >= 0, `${pageName} must render the enabled banner`);
      assert.ok(navbarIndex > bannerIndex, `${pageName} banner must precede the shared navbar`);
      assert.equal((page.match(/class="maintenance-banner"/g) ?? []).length, 1, `${pageName} must render one banner`);
      assert.ok(/<img class="maintenance-banner-icon" src="assets\/icon\/logbrew\.svg" alt="" width="20" height="20">/.test(page), `${pageName} must use the decorative 20px SVG`);
    }

    assert.ok(/data-nav="projects" href="#projects"/.test(home), "Home Projects link must remain anchored to its section");
    assert.ok(/data-nav="projects" aria-current="location" href="index\.html#projects"/.test(detail), "detail Projects link must retain its Home destination");
    assert.ok(/maintenanceTitle:\s*'Portfolio update'/.test(translations), "English title translation must be present");
    assert.ok(/maintenanceMessage:\s*'I’m updating the portfolio and adding new content\. Thanks for stopping by!'/.test(translations), "English message translation must be exact");
    assert.ok(/maintenanceTitle:\s*'Portafolio en actualización'/.test(translations), "Spanish title translation must be present");
    assert.ok(/maintenanceMessage:\s*'Estoy actualizando el portafolio y agregando contenido\. ¡Gracias por tu visita!'/.test(translations), "Spanish message translation must be exact");
    assert.deepEqual(builtIcon, sourceIcon, "the shared build must copy the existing SVG unchanged");
  });
});

test("false and unset build flags omit the banner markup on Home and detail pages", async () => {
  await withOutput(async (tempRoot) => {
    for (const [name, environment] of [["false", { MAINTENANCE_BANNER: "false" }], ["unset", {}]]) {
      const output = join(tempRoot, name);
      await buildSite({ output, environment });

      for (const pageName of ["index.html", "project-page.html"]) {
        const page = await readFile(join(output, pageName), "utf8");
        assert.doesNotMatch(page, /class="maintenance-banner"/, `${name} must omit the banner from ${pageName}`);
        assert.doesNotMatch(page, /\{\{MAINTENANCE_BANNER\}\}/, `${name} must not leave a template marker in ${pageName}`);
        assert.match(page, /<header class="site-header">/, `${name} must retain the navbar in ${pageName}`);
      }
    }
  });
});
