import assert from "node:assert/strict";
import { mkdtemp, readFile, readdir, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { buildSite } from "../scripts/build-shared-shell.mjs";

const repositoryRoot = dirname(dirname(fileURLToPath(import.meta.url)));

test("approved Work Gallery shell is generated for home while internal pages retain static shell routes", async () => {
  const tempRoot = await mkdtemp(join(tmpdir(), "portfolio-gallery-shell-"));
  const output = join(tempRoot, "output");

  try {
    await buildSite({ output });
    const home = await readFile(join(output, "index.html"), "utf8");
    const internal = await readFile(join(output, "cv.html"), "utf8");

    assert.match(home, /data-nav="home" href="#home"/);
    assert.match(home, /data-nav="projects" href="#projects"/);
    assert.match(home, /class="site-footer"/);
    assert.match(home, /class="brand" href="#home"/);
    assert.match(home, /href="#projects"/);
    assert.match(home, /assets\/css\/work-gallery\.css/);
    assert.doesNotMatch(home, /(?:src|href)="\.\.\/\.\.\/assets\//);
    assert.doesNotMatch(home, /<!-- shared-(?:navbar|footer) -->/);
    assert.match(internal, /class="navbar navbar-expand-lg/);
    assert.match(internal, /href="index\.html#home"/);
    assert.match(internal, /href="index\.html#projects"/);
    assert.match(internal, /class="nav-link active" aria-current="location" href="index\.html#about"/);
    assert.doesNotMatch(internal, /aria-current="page"/);

    const nestedPageRoute = new URL("../index.html#projects", "https://portfolio.example/work/detail.html");
    assert.equal(nestedPageRoute.href, "https://portfolio.example/index.html#projects");
  } finally {
    await rm(tempRoot, { recursive: true, force: true });
  }
});

test("shared-shell build is deterministic for both inline and marker-based page sources", async () => {
  const tempRoot = await mkdtemp(join(tmpdir(), "portfolio-shell-slices-"));
  const firstOutput = join(tempRoot, "first-output");
  const secondOutput = join(tempRoot, "second-output");

  try {
    await buildSite({ output: firstOutput });
    await buildSite({ output: secondOutput, sourcePagesDirectory: firstOutput });

    const sourcePages = (await readdir(repositoryRoot)).filter((name) => name.endsWith(".html")).sort();
    const generatedPages = (await readdir(firstOutput)).filter((name) => name.endsWith(".html")).sort();
    assert.deepEqual(generatedPages, sourcePages);
    assert.equal(await readFile(join(firstOutput, "CNAME"), "utf8"), await readFile(join(repositoryRoot, "CNAME"), "utf8"));

    for (const pageName of sourcePages) {
      const firstPage = await readFile(join(firstOutput, pageName));
      const secondPage = await readFile(join(secondOutput, pageName));
      assert.deepEqual(secondPage, firstPage, `${pageName} is stable when rebuilding generated HTML`);
      const generatedPage = firstPage.toString("utf8");
      if (pageName === "index.html") {
        assert.equal((generatedPage.match(/<nav\b/g) ?? []).length, 2);
        assert.equal((generatedPage.match(/class="site-footer"/g) ?? []).length, 1);
      } else {
        assert.equal((generatedPage.match(/<nav\b/g) ?? []).length, 1);
        assert.equal((generatedPage.match(/class="page-footer py-3 border-top"/g) ?? []).length, 1);
      }
    }

  } finally {
    await rm(tempRoot, { recursive: true, force: true });
  }
});
