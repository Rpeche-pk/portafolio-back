import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdtemp, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const repositoryRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const builderPath = join(repositoryRoot, "scripts", "build-shared-shell.mjs");
const pageConfig = JSON.parse(
  await readFile(join(repositoryRoot, "templates", "page-shell.json"), "utf8"),
);
const legacyShellPages = new Set();

function runBuilder(outputDirectory, ...args) {
  return execFileSync(process.execPath, [builderPath, "--output", outputDirectory, ...args], {
    cwd: repositoryRoot,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });
}

function replaceShellWithMarkers(html) {
  const navStart = html.indexOf("<nav");
  const navEnd = html.indexOf("</nav>", navStart) + "</nav>".length;
  let output = `${html.slice(0, navStart)}<!-- shared-navbar -->${html.slice(navEnd)}`;
  const footerStart = output.indexOf('<footer class="page-footer');
  const footerEnd = output.lastIndexOf("</footer>") + "</footer>".length;

  return `${output.slice(0, footerStart)}<!-- shared-footer -->${output.slice(footerEnd)}`;
}

function activeNavigationItems(nav) {
  return [...nav.matchAll(/<a class="nav-link active"[^>]*data-value="([^"]+)"/g)]
    .map(([, key]) => key)
    .sort();
}

function replaceWorkGalleryShellWithMarkers(html) {
  if (html.includes("<!-- shared-navbar -->")) return html;
  const headerStart = html.indexOf('<header class="site-header">');
  const headerEnd = html.indexOf("</header>", headerStart) + "</header>".length;
  if (headerStart < 0 || headerEnd < "</header>".length) return html;
  let output = `${html.slice(0, headerStart)}<!-- shared-navbar -->${html.slice(headerEnd)}`;
  const footerStart = output.indexOf('<footer class="site-footer"');
  const footerEnd = output.indexOf("</footer>", footerStart) + "</footer>".length;
  if (footerStart < 0 || footerEnd < "</footer>".length) return output;
  return `${output.slice(0, footerStart)}<!-- shared-footer -->${output.slice(footerEnd)}`;
}

test("source pages use shell markers and keep generated output behavior", async () => {
  const sourcePages = (await readdir(repositoryRoot)).filter((name) => name.endsWith(".html")).sort();
  assert.deepEqual(sourcePages, Object.keys(pageConfig).sort());
  const outputDirectory = await mkdtemp(join(tmpdir(), "portfolio-shell-source-"));

  try {
    runBuilder(outputDirectory);
    assert.equal(await readFile(join(outputDirectory, "CNAME"), "utf8"), await readFile(join(repositoryRoot, "CNAME"), "utf8"));

    for (const pageName of sourcePages) {
      const source = await readFile(join(repositoryRoot, pageName), "utf8");
      const output = await readFile(join(outputDirectory, pageName), "utf8");
      const config = pageConfig[pageName];
      const usesWorkGalleryShell = config.navbarTemplate === "work-gallery-navbar.html";
      const nav = output.match(/<nav\b[\s\S]*?<\/nav>/)?.[0] ?? "";
      const contactLink = nav.match(/<a\b[^>]*data-value="nav-contact"[^>]*>/)?.[0] ?? "";

      if (legacyShellPages.has(pageName)) {
        assert.equal((source.match(/<nav class="navbar/g) ?? []).length, 1, `${pageName} legacy navbar`);
        assert.equal((source.match(/<footer class="page-footer/g) ?? []).length, 1, `${pageName} legacy footer`);
      } else {
        assert.equal((source.match(/<!-- shared-navbar -->/g) ?? []).length, 1, `${pageName} navbar marker`);
        assert.equal((source.match(/<!-- shared-footer -->/g) ?? []).length, 1, `${pageName} footer marker`);
        assert.doesNotMatch(source, /<nav class="navbar|<footer class="page-footer/);
      }
      if (usesWorkGalleryShell) {
        assert.equal((output.match(/<nav\b/g) ?? []).length, 2, `${pageName} primary and footer navigation`);
        assert.equal((output.match(/class="site-footer"/g) ?? []).length, 1, `${pageName} approved footer`);
        assert.doesNotMatch(output, /class="page-footer py-3 border-top"/);
        for (const [key, href] of Object.entries(config.navigation)) {
          assert.ok(output.includes(`data-nav="${key}" href="${href}"`), `${pageName} ${key} route`);
        }
        assert.match(output, /class="brand" href="#home"/);
      } else {
        assert.equal((output.match(/<nav\b/g) ?? []).length, 1);
        assert.equal((output.match(/class="page-footer py-3 border-top"/g) ?? []).length, 1);
        assert.deepEqual(activeNavigationItems(nav), [...config.activeLinks].sort(), `${pageName} active items`);
        assert.equal(contactLink.match(/href="([^"]+)"/)?.[1], config.contactHref, `${pageName} Contact link`);
      }
      const normalizeShell = usesWorkGalleryShell ? replaceWorkGalleryShellWithMarkers : replaceShellWithMarkers;
      assert.equal(
        normalizeShell(output).replace(/\r\n/g, "\n"),
        (legacyShellPages.has(pageName) ? normalizeShell(source) : source).replace(/\r\n/g, "\n"),
        `${pageName} non-shell content and scripts remain unchanged`,
      );

      for (const [, assetPath] of output.matchAll(/(?:src|href)="(assets\/[^"?#]+)"/g)) {
        assert.ok(existsSync(join(outputDirectory, assetPath)), `${pageName} asset ${assetPath}`);
      }

    }
  } finally {
    await rm(outputDirectory, { recursive: true, force: true });
  }
});

test("Vercel runs the build script and publishes its static output directory", async () => {
  const vercelConfig = JSON.parse(await readFile(join(repositoryRoot, "vercel.json"), "utf8"));

  assert.equal(vercelConfig.buildCommand, "node scripts/build-shared-shell.mjs");
  assert.equal(vercelConfig.outputDirectory, "dist");
});

test("check mode detects drift without rewriting stale generated files", async () => {
  const outputDirectory = await mkdtemp(join(tmpdir(), "portfolio-shell-check-"));

  try {
    runBuilder(outputDirectory);
    assert.doesNotThrow(() => runBuilder(outputDirectory, "--check"));
    const indexPath = join(outputDirectory, "index.html");
    await writeFile(indexPath, "stale generated page");

    assert.throws(
      () => runBuilder(outputDirectory, "--check"),
      (error) => error.status === 1 && String(error.stderr).includes("index.html"),
    );
    assert.equal(await readFile(indexPath, "utf8"), "stale generated page");
  } finally {
    await rm(outputDirectory, { recursive: true, force: true });
  }
});
