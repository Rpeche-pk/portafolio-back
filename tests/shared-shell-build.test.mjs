import assert from "node:assert/strict";
import { mkdtemp, readFile, readdir, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { buildSite } from "../scripts/build-shared-shell.mjs";

const repositoryRoot = dirname(dirname(fileURLToPath(import.meta.url)));

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
      assert.equal((firstPage.toString("utf8").match(/<nav\b/g) ?? []).length, 1);
      assert.equal((firstPage.toString("utf8").match(/class="page-footer py-3 border-top"/g) ?? []).length, 1);
    }

  } finally {
    await rm(tempRoot, { recursive: true, force: true });
  }
});
