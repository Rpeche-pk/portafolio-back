import assert from "node:assert/strict";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { buildSite } from "../scripts/build-shared-shell.mjs";

const repositoryRoot = new URL("../", import.meta.url);
const footerTemplate = await readFile(new URL("../templates/work-gallery-footer.html", import.meta.url), "utf8");
const behavior = await readFile(new URL("../assets/js/work-gallery.js", import.meta.url), "utf8");
const styles = await readFile(new URL("../assets/css/work-gallery.css", import.meta.url), "utf8");
const pageShell = JSON.parse(await readFile(new URL("../templates/page-shell.json", import.meta.url), "utf8"));
const workGalleryPages = Object.entries(pageShell)
  .filter(([, config]) => config.footerTemplate === "work-gallery-footer.html")
  .map(([page]) => page)
  .sort();
const expectedWorkGalleryPages = [
  "index.html",
  "project-page.html",
  "project-page-1.html",
  "project-page-2.html",
  "project-page-3.html",
  "project-page-4.html",
  "project-page-5.html",
].sort();

function getBackToTopButton(markup) {
  return markup.match(/<button\b(?=[^>]*\bdata-back-to-top(?:\s|=|>))[^>]*>[\s\S]*?<\/button>/)?.[0] ?? "";
}

function assertHasPattern(source, pattern, message) {
  assert.ok(pattern.test(source), message);
}

test("one localized, inert shared button with a decorative arrow is generated only on scoped pages", async () => {
  assert.deepEqual(workGalleryPages, expectedWorkGalleryPages, "the selected scope is Home and the six project routes");
  const button = getBackToTopButton(footerTemplate);
  assert.ok(button, "the shared footer template renders the control");
  assert.match(button, /type="button"/);
  assert.match(button, /data-i18n-aria-label="backToTop"/);
  assert.match(button, /aria-label="Back to top"/);
  assert.match(button, /aria-hidden="true"/);
  assert.match(button, /\binert(?:\s|>)/);
  assert.match(button, /tabindex="-1"/);
  const svg = button.match(/<svg\b[^>]*>[\s\S]*?<\/svg>/)?.[0] ?? "";
  assert.ok(svg, "the control has an inline icon");
  assert.match(svg, /viewBox="0 0 24 24"/);
  assert.match(svg, /aria-hidden="true"/);
  assert.match(svg, /focusable="false"/);
  assert.match(svg, /stroke="currentColor"/);
  assert.match(svg, /M12 19V5m-7 7 7-7 7 7/);

  const tempRoot = await mkdtemp(join(tmpdir(), "portfolio-back-to-top-"));
  try {
    await buildSite({ output: tempRoot });
    for (const pageName of expectedWorkGalleryPages) {
      const page = await readFile(join(tempRoot, pageName), "utf8");
      assert.ok(getBackToTopButton(page), `${pageName} contains the shared control`);
      assertHasPattern(page, /<meta\s+name="viewport"\s+content="[^"]*viewport-fit=cover/, `${pageName} exposes safe-area insets`);
      assert.equal((page.match(/<button\b(?=[^>]*\bdata-back-to-top(?:\s|=|>))/g) ?? []).length, 1, `${pageName} has exactly one instance`);
    }
    for (const pageName of ["cv.html", "contact.html"]) {
      const page = await readFile(join(tempRoot, pageName), "utf8");
      assert.equal(getBackToTopButton(page), "", `${pageName} remains outside the approved scope`);
    }
  } finally {
    await rm(tempRoot, { recursive: true, force: true });
  }
});

test("shared runtime observes the page start, prevents hidden focus, and supports route-configured top scrolling", () => {
  assertHasPattern(behavior, /function initializeBackToTop\s*\(/, "the shared runtime has a single initializer");
  assertHasPattern(behavior, /dataset\.backToTopInitialized/, "initialization is guarded against duplicate setup");
  assertHasPattern(behavior, /new IntersectionObserver/, "visibility is observer-driven");
  assertHasPattern(behavior, /dataset\.backToTopTarget/, "each page can configure its scroll destination");
  assertHasPattern(behavior, /\.inert\s*=\s*!visible/, "hidden control is removed from interaction");
  assertHasPattern(behavior, /aria-hidden/, "hidden control is removed from the accessibility tree");
  assertHasPattern(behavior, /document\.activeElement\s*===\s*backToTopButton/, "focused control is detected before hiding");
  assertHasPattern(behavior, /backToTopButton\.blur\(\)/, "focused control is blurred before it is hidden");
  assertHasPattern(behavior, /window\.scrollTo\(\{\s*top:\s*destinationTop/, "activation scrolls to the configured page start");
  assertHasPattern(behavior, /prefers-reduced-motion:\s*reduce/, "reduced motion is checked in the runtime");
  assertHasPattern(behavior, /focus\(\{\s*preventScroll:\s*true\s*\}\)/, "keyboard focus does not cause a second scroll");
  assertHasPattern(behavior, /scheduleActiveSection\(\)/, "the existing scrollspy is synchronized after activation");
});

test("back-to-top presentation uses theme tokens, safe-area offsets, restrained motion, and a reduced-motion alternative", () => {
  assertHasPattern(styles, /\[data-back-to-top\][^{]*\{[^}]*position:\s*fixed/, "the control is fixed in the viewport");
  assertHasPattern(styles, /--accent/, "the primary accent token is used");
  assertHasPattern(styles, /--paper/, "the foreground/background token is used");
  assertHasPattern(styles, /--line/, "the border token is used");
  assertHasPattern(styles, /env\(safe-area-inset-right/, "the right safe area is respected");
  assertHasPattern(styles, /env\(safe-area-inset-bottom/, "the bottom safe area is respected");
  assertHasPattern(styles, /opacity:\s*0/, "the entrance and exit include opacity");
  assertHasPattern(styles, /translate:\s*0\s+6px/, "the hidden state uses the requested restrained offset");
  assertHasPattern(styles, /transition:[^;]*(?:150|160|180|200)ms/, "transitions stay within the requested duration");
  assertHasPattern(styles, /@media\s*\(hover:\s*hover\)[\s\S]*?\[data-back-to-top\]:hover/, "hover lift is limited to hover-capable devices");
  assertHasPattern(styles, /\[data-back-to-top\]:active[^}]*scale:\s*\.97/, "press feedback is brief and restrained");
  assertHasPattern(styles, /@media\s*\(prefers-reduced-motion:\s*reduce\)[\s\S]*?\[data-back-to-top\][\s\S]*?translate:\s*none[\s\S]*?scale:\s*none/, "reduced motion removes displacement and scale");
  assertHasPattern(styles, /:focus-visible[^}]*outline:/, "keyboard focus remains visibly indicated");
});

test("both accessible names are localized without changing the shared home navigation", () => {
  assertHasPattern(behavior, /backToTop:\s*'Back to top'/, "the English accessible name is available");
  assertHasPattern(behavior, /backToTop:\s*'Volver al inicio'/, "the Spanish accessible name is available");
  assertHasPattern(footerTemplate, /class="brand" href="\{\{HOME_HREF\}\}"/, "the logo still targets portfolio Home");
  assertHasPattern(footerTemplate, /data-nav="projects" href="\{\{PROJECTS_HREF\}\}"/, "the project navigation keeps its shared destination");
});
