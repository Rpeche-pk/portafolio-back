import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const repositoryRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const readSource = (path) => readFile(join(repositoryRoot, path), "utf8");
const navbar = await readSource("templates/work-gallery-navbar.html");
const styles = await readSource("assets/css/work-gallery.css");
const script = await readSource("assets/js/work-gallery.js");
const pageShell = JSON.parse(await readSource("templates/page-shell.json"));

function extractRegion(source, startMarker, endMarker) {
  const start = source.indexOf(startMarker);
  assert.notEqual(start, -1, `missing ${startMarker}`);
  const end = source.indexOf(endMarker, start + startMarker.length);
  assert.notEqual(end, -1, `missing ${endMarker}`);
  return source.slice(start, end + endMarker.length);
}

function expectMatch(source, pattern, message) {
  assert.ok(pattern.test(source), message);
}

test("mobile navigation uses an icon-only button that morphs without changing the header", () => {
  assert.ok(!/<summary|<details/.test(navbar), "mobile menu must use a real button, not a disclosure summary");
  expectMatch(navbar, /<button[^>]*class="menu-toggle"[^>]*aria-controls="mobile-navigation-panel"[^>]*aria-expanded="false"/, "menu button must control the mobile panel and start collapsed");
  expectMatch(navbar, /<span class="menu-icon" aria-hidden="true">/, "menu icon must be decorative");
  assert.equal((navbar.match(/class="menu-icon-line"/g) ?? []).length, 3);
  assert.ok(!/data-i18n="menu"/.test(navbar), "icon-only button must not receive translated text that removes its icon");
  expectMatch(styles, /\.menu-toggle\[aria-expanded="true"\][\s\S]*?\.menu-icon-line/, "expanded state must morph the icon into an X");
  expectMatch(styles, /\.menu-icon-line[^}]*transition:\s*transform[^}]*opacity/, "icon transition must animate only its own transform and opacity");
  const headerRule = styles.match(/\.site-header\s*\{([^}]*)\}/)?.[1] ?? "";
  assert.doesNotMatch(headerRule, /transition\s*:/, "menu animation must not move or resize the header");
});

test("one existing theme button sits immediately before the menu button, outside the panel", () => {
  const controls = extractRegion(navbar, '<div class="mobile-controls">', '</div>');
  const panel = extractRegion(navbar, '<div class="mobile-panel"', '</nav>');
  assert.equal((navbar.match(/data-theme-toggle/g) ?? []).length, 1);
  assert.ok(controls.indexOf("data-theme-toggle") < controls.indexOf('class="menu-toggle"'));
  assert.ok(!/data-theme-toggle/.test(panel), "theme control must not be duplicated in the mobile panel");
  expectMatch(navbar, /data-theme-toggle[^>]*data-i18n-aria-label="themeToggleLabel"/, "moved theme control must retain its localized accessible name");
  expectMatch(script, /localStorage\.setItem\('portfolio-theme'/, "theme control must retain cross-page preference persistence");
});

test("mobile logo and controls align in the existing breakpoint with 44px theme-aware targets", () => {
  expectMatch(styles, /\.nav-inner\s*\{[^}]*align-items:\s*center/s, "navbar items must align vertically");
  expectMatch(styles, /\.mobile-controls\s*\{[^}]*align-items:\s*center/s, "theme and menu controls must align vertically");
  expectMatch(styles, /\.theme-toggle[^}]*min-width:\s*44px/, "theme control must remain a 44px target");
  expectMatch(styles, /\.theme-toggle[^}]*min-height:\s*44px/, "theme control must remain a 44px target");
  expectMatch(styles, /\.menu-toggle[^}]*min-width:\s*44px/, "menu control must be at least 44px wide");
  expectMatch(styles, /\.menu-toggle[^}]*min-height:\s*44px/, "menu control must be at least 44px tall");
  expectMatch(styles, /\.menu-toggle[^}]*color:\s*var\(--secondary\)/, "menu icon must use the active palette token");
  expectMatch(styles, /@media\s*\(max-width:\s*1000px\)[\s\S]*?\.mobile-controls[^}]*display:\s*flex/, "controls must use the existing mobile breakpoint");
  const phoneBreakpoint = styles.match(/@media\s*\(max-width:\s*767px\)\s*\{([\s\S]*?)\n\}/)?.[1] ?? "";
  expectMatch(phoneBreakpoint, /\.nav-inner\s*\{[^}]*padding-inline-end:\s*0/, "when the cord is hidden, mobile controls must align with the container edge");
});

test("the mobile panel retains section, social, and language links with active-section styling", () => {
  const panel = extractRegion(navbar, '<div class="mobile-panel"', '</nav>');
  for (const nav of ["home", "projects", "skills", "about", "contact"]) {
    expectMatch(panel, new RegExp(`data-nav="${nav}"`), `missing ${nav} section link`);
  }
  expectMatch(panel, /href="https:\/\/github\.com\/Rpeche-pk"/, "GitHub link must remain in the mobile panel");
  expectMatch(panel, /href="https:\/\/www\.linkedin\.com\/in\/luis-peche\/"/, "LinkedIn link must remain in the mobile panel");
  expectMatch(panel, /data-language="es"/, "Spanish selector must remain in the mobile panel");
  expectMatch(panel, /data-language="en"/, "English selector must remain in the mobile panel");
  expectMatch(styles, /\.mobile-links \.nav-link\[aria-current="page"\]/, "current page must have a visible mobile indicator");
  expectMatch(script, /\.mobile-links a/, "selecting a section must close the mobile panel");
  expectMatch(script, /setActiveSection\(/, "active section tracking must remain enabled");
});

test("menu state, bilingual accessible names, Escape focus, and reduced motion are explicit", () => {
  expectMatch(navbar, /aria-label="Toggle navigation menu"[^>]*data-i18n-aria-label="menuLabel"/, "menu button must have a localized accessible name");
  expectMatch(script, /menuLabel:\s*'Toggle navigation menu'/, "English menu label must remain available");
  expectMatch(script, /menuLabel:\s*'Alternar menú de navegación'/, "Spanish menu label must remain available");
  expectMatch(script, /menuToggle\.setAttribute\('aria-expanded', String\(isOpen\)\)/, "aria-expanded must follow menu state");
  expectMatch(script, /event\.key !== 'Escape'[\s\S]*?menuToggle\.focus\(\{ preventScroll: true \}\)/, "Escape must close the menu and restore trigger focus");
  expectMatch(script, /menuPanel\.hidden = !isOpen/, "closed menu panel must be hidden");
  expectMatch(styles, /@media\s*\(prefers-reduced-motion:\s*reduce\)[\s\S]*?\.menu-icon-line[^}]*transition:\s*none/s, "reduced motion must disable icon movement");
});

test("the shared mobile navbar remains wired on all six project detail routes", () => {
  const detailRoutes = [
    "project-page.html",
    "project-page-1.html",
    "project-page-2.html",
    "project-page-3.html",
    "project-page-4.html",
    "project-page-5.html",
  ];
  for (const route of detailRoutes) {
    assert.equal(pageShell[route].navbarTemplate, "work-gallery-navbar.html", route);
  }
  expectMatch(styles, /@media\s*\(max-width:\s*1000px\)/, "detail routes must use the existing shared mobile breakpoint");
});
