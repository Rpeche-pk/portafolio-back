import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { runInNewContext } from "node:vm";
import test from "node:test";

const repositoryRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const readSource = (path) => readFile(join(repositoryRoot, path), "utf8");
const navbarTemplate = await readSource("templates/shared-navbar.html");
const footerTemplate = await readSource("templates/shared-footer.html");
const navbarStyles = await readSource("assets/css/bs-theme-overrides.css");
const workGalleryNavbar = await readSource("templates/work-gallery-navbar.html");
const workGalleryStyles = await readSource("assets/css/work-gallery.css");
const selectedLogo = await readSource("assets/img/avatars/logo-luis-peche.svg").catch(() => "");
const homepage = await readSource("index.html");
const pageShell = JSON.parse(await readSource("templates/page-shell.json"));
const navbarScript = await readSource("assets/js/shared-navbar.js").catch(() => "");

function createNavbarHarness({ mobile = true, expanded = true, activeIndex = 0, scrollY = 0 } = {}) {
  const handlers = { collapse: {}, document: {}, navbar: {}, scrollSpy: {}, window: {} };
  const linkAttributes = [new Map(), new Map(), new Map()];
  const navbarClasses = new Set();
  let currentActiveIndex = activeIndex;
  let isExpanded = expanded;
  let hideCalls = 0;
  let focusCalls = 0;
  let currentScrollY = scrollY;

  const links = ["profile", "proyectos", "skill"].map((target, index) => ({
    hash: `#${target}`,
    href: `index.html#${target}`,
    classList: {
      contains: (className) => className === "active" && index === currentActiveIndex,
    },
    setAttribute: (name, value) => linkAttributes[index].set(name, value),
    removeAttribute: (name) => linkAttributes[index].delete(name),
  }));

  const togglerAttributes = new Map();
  const toggler = {
    focus: () => { focusCalls += 1; },
    setAttribute: (name, value) => togglerAttributes.set(name, value),
  };
  const collapse = {
    classList: { contains: (className) => className === "show" && isExpanded },
    addEventListener: (name, handler) => { handlers.collapse[name] = handler; },
  };
  const navbar = {
    addEventListener: (name, handler) => { handlers.navbar[name] = handler; },
    classList: {
      contains: (className) => navbarClasses.has(className),
      add: (className) => navbarClasses.add(className),
      remove: (className) => navbarClasses.delete(className),
      toggle: (className, force) => {
        if (force) navbarClasses.add(className);
        else navbarClasses.delete(className);
      },
    },
    querySelector: (selector) => selector === ".navbar-toggler" ? toggler : collapse,
    querySelectorAll: () => links,
  };
  const scrollSpy = {
    addEventListener: (name, handler) => { handlers.scrollSpy[name] = handler; },
  };
  const document = {
    documentElement: scrollSpy,
    readyState: "complete",
    addEventListener: (name, handler) => { handlers.document[name] = handler; },
    querySelector: (selector) => {
      if (selector === ".portfolio-navbar") return navbar;
      if (selector === '[data-bs-spy="scroll"]') return scrollSpy;
      return null;
    },
  };
  const collapseInstance = {
    hide: () => {
      hideCalls += 1;
      isExpanded = false;
      handlers.collapse["hidden.bs.collapse"]?.();
    },
  };
  const window = {
    bootstrap: { Collapse: { getOrCreateInstance: () => collapseInstance } },
    matchMedia: () => ({ matches: mobile }),
    addEventListener: (name, handler) => { handlers.window[name] = handler; },
    get scrollY() { return currentScrollY; },
  };

  runInNewContext(navbarScript, { document, window });

  return {
    dispatchEscape: () => handlers.document.keydown?.({ key: "Escape", preventDefault() {} }),
    dispatchCollapseEvent: (name) => handlers.collapse[name]?.(),
    dispatchLinkClick: (index) => handlers.navbar.click?.({
      target: { closest: () => links[index] },
    }),
    dispatchScrollSpy: (index) => {
      currentActiveIndex = index;
      handlers.scrollSpy["activate.bs.scrollspy"]?.();
    },
    dispatchScroll: (nextScrollY) => {
      currentScrollY = nextScrollY;
      handlers.window.scroll?.();
    },
    focusCalls: () => focusCalls,
    hideCalls: () => hideCalls,
    isCompact: () => navbarClasses.has("is-compact"),
    isMenuOpen: () => navbarClasses.has("is-menu-open"),
    linkAttributes,
    togglerAttributes,
  };
}

test("shared navbar preserves destinations and declares accessible collapse controls", () => {
  assert.match(navbarTemplate, /src="assets\/img\/avatars\/logo-luis-peche\.svg"/);
  assert.match(navbarTemplate, /alt="LP monogram and Luis Peche"/);
  assert.match(selectedLogo, /stroke="#fff"/);
  assert.match(selectedLogo, /fill="#fff"/);
  assert.match(navbarTemplate, /<button[^>]*type="button"/);
  assert.match(navbarTemplate, /aria-controls="navbarNav-2"/);
  assert.match(navbarTemplate, /aria-expanded="false"/);
  assert.match(navbarTemplate, /data-value="nav-toggle"/);
  assert.match(navbarTemplate, /{{CURRENT_HOME}}/);
  assert.match(footerTemplate, /assets\/js\/shared-navbar\.js/);

  const hrefs = [...navbarTemplate.matchAll(/class="nav-link[^\"]*"[^>]*href="([^"]+)"/g)]
    .map((match) => match[1]);
  assert.deepEqual(hrefs, [
    "{{HOME_HREF}}",
    "{{PROJECTS_HREF}}",
    "{{ABOUT_HREF}}",
    "{{SKILLS_HREF}}",
    "{{CONTACT_HREF}}",
  ]);
  assert.match(workGalleryNavbar, /data-nav="home" href="{{HOME_HREF}}"/);
  assert.match(workGalleryNavbar, /data-nav="projects"\{\{CURRENT_PROJECTS\}\} href="{{PROJECTS_HREF}}"/);
  assert.equal(pageShell["index.html"].navbarTemplate, "work-gallery-navbar.html");
  assert.equal(pageShell["index.html"].footerTemplate, "work-gallery-footer.html");
  assert.deepEqual(pageShell["index.html"].activeLinks, ["nav-home"]);
  assert.deepEqual(pageShell["contact.html"].activeLinks, ["nav-contact"]);
  assert.deepEqual(pageShell["project-page-5.html"].activeLinks, ["nav-project"]);
});

test("navbar styles meet contrast, target, spacing, focus, and fixed-anchor requirements", () => {
  assert.match(navbarStyles, /\.portfolio-navbar\.gradient\s*\{[^}]*background-color:\s*transparent[^}]*background-image:\s*none/s);
  assert.match(navbarStyles, /\.portfolio-navbar\.gradient::before\s*\{[^}]*background-color:\s*#006bc8/s);
  assert.match(navbarStyles, /\.portfolio-navbar \.navbar-nav\s*\{[^}]*gap:/s);
  assert.match(navbarStyles, /\.portfolio-navbar \.navbar-nav \.nav-item\s*\{[^}]*padding-right:\s*0/s);
  assert.match(navbarStyles, /\.portfolio-navbar \.navbar-nav \.nav-link\s*\{[^}]*min-height:\s*44px/s);
  assert.match(navbarStyles, /\.portfolio-navbar \.navbar-brand img\s*\{[^}]*width:\s*min\(9\.75rem,\s*16vw\)/s);
  assert.match(navbarStyles, /@media\s*\(max-width:\s*991\.98px\)[\s\S]*?\.portfolio-navbar \.navbar-brand img\s*\{[^}]*width:\s*min\(9\.75rem,\s*46vw\)/s);
  assert.doesNotMatch(navbarStyles, /\.portfolio-navbar \.navbar-toggler\s*\{[^}]*display:\s*inline-flex/s);
  assert.match(navbarStyles, /:focus-visible/);
  assert.match(navbarStyles, /scroll-margin-top:/);
  assert.match(navbarStyles, /max-height:\s*3rem/);
  assert.match(navbarStyles, /@media\s*\(max-width:\s*991\.98px\)[\s\S]*?max-height:\s*2\.5rem/s);
  assert.match(navbarStyles, /\.portfolio-navbar\s*\{[^}]*padding-block:\s*0\.5rem/s);
  assert.match(navbarStyles, /\.portfolio-navbar\.is-compact\s*\{[^}]*padding-block:\s*0\.25rem/s);
  assert.match(navbarStyles, /\.portfolio-navbar\.gradient::before\s*\{[^}]*height:\s*64px/s);
  assert.match(navbarStyles, /@media\s*\(max-width:\s*991\.98px\)[\s\S]*?\.portfolio-navbar\s*\{[^}]*padding-block:\s*0\.375rem/s);
  assert.match(navbarStyles, /@media\s*\(max-width:\s*991\.98px\)[\s\S]*?\.portfolio-navbar\.gradient::before\s*\{[^}]*height:\s*56px/s);
  assert.match(navbarStyles, /@media\s*\(max-width:\s*991\.98px\)[\s\S]*?\.portfolio-navbar \.navbar-brand img\s*\{[^}]*max-height:\s*2\.5rem/s);
  assert.doesNotMatch(navbarStyles, /transition:[^}]*padding-block/s);
  assert.match(navbarStyles, /\.portfolio-navbar\.gradient::before\s*\{[^}]*transform:/s);
  assert.match(navbarStyles, /\.portfolio-navbar\.gradient\.is-compact::before\s*\{[^}]*scaleY\(0\.875\)/s);
  assert.match(navbarStyles, /\.portfolio-navbar\.is-menu-open::before\s*\{[^}]*inset:\s*0/);
  assert.match(navbarStyles, /prefers-reduced-motion:\s*reduce/);
  assert.match(homepage, /<!-- shared-navbar -->/);
  assert.match(workGalleryStyles, /scroll-padding-top:\s*calc\(var\(--nav-height\)\s*\+\s*16px\)/);
  assert.match(workGalleryStyles, /:focus-visible/);
});

test("Work Gallery primary nav links have a visible keyboard focus ring", () => {
  assert.match(workGalleryStyles, /\.site-header\s+\.nav-link:focus-visible\s*\{[^}]*outline:\s*3px solid var\(--secondary\)/s);
});

test("navbar hover interactions are pointer-gated, focus-visible, and reduced-motion aware", () => {
  assert.match(navbarStyles, /@media\s*\(hover:\s*hover\)\s*and\s*\(pointer:\s*fine\)/);
  assert.match(navbarStyles, /\.navbar-email:hover \.icon[^}]*transform:\s*translateY\(-2px\) scale\(1\.05\)/s);
  assert.match(navbarStyles, /\.navbar-email:focus-visible \.icon[^}]*transform:\s*translateY\(-2px\) scale\(1\.05\)/s);
  assert.match(navbarStyles, /\.language-option:hover[^}]*outline-color:/s);
  assert.match(navbarStyles, /\.language-option:hover img[^}]*transform:\s*scale\(1\.06\)/s);
  assert.match(navbarStyles, /\.language-option:focus-visible img[^}]*transform:\s*scale\(1\.06\)/s);
  assert.match(navbarStyles, /\.navbar-nav \.nav-link::after[^}]*opacity:/s);
  assert.match(navbarStyles, /\.navbar-nav \.nav-link\.active::before/s);
  const navigationTargetFocusRule = navbarStyles.match(
    /#proyectos:focus:not\(:focus-visible\),\s*#skill:focus:not\(:focus-visible\)\s*\{([^}]*)\}/s,
  );
  assert.ok(navigationTargetFocusRule, "both in-page targets suppress non-keyboard focus outlines");
  assert.match(navigationTargetFocusRule[1], /outline:\s*none/);
  assert.match(navbarStyles, /\.navbar-brand:hover[^}]*transform:\s*scale\(1\.02\)/s);
  assert.match(navbarStyles, /@media\s*\(prefers-reduced-motion:\s*reduce\)[\s\S]*?\.navbar-nav \.nav-link::after[^}]*transition:\s*opacity/s);
  assert.match(navbarStyles, /\.navbar-email:hover \.icon,[\s\S]*?\.navbar-brand:focus-visible\s*\{[^}]*transform:\s*none/s);
});

test("navbar compacts only after 60px of scroll and restores at the threshold", () => {
  const harness = createNavbarHarness();
  const restoredPageHarness = createNavbarHarness({ scrollY: 80 });

  assert.equal(harness.isCompact(), false);
  assert.equal(restoredPageHarness.isCompact(), true);
  harness.dispatchScroll(60);
  assert.equal(harness.isCompact(), false);
  harness.dispatchScroll(61);
  assert.equal(harness.isCompact(), true);
  harness.dispatchScroll(60);
  assert.equal(harness.isCompact(), false);
});

test("opening the mobile menu restores the full navbar background while scrolled", () => {
  const harness = createNavbarHarness({ scrollY: 80 });

  harness.dispatchCollapseEvent("shown.bs.collapse");

  assert.equal(harness.isCompact(), true);
  assert.equal(harness.isMenuOpen(), true);
});

test("mobile menu closes on Escape and returns focus to its toggler", () => {
  const harness = createNavbarHarness();

  harness.dispatchEscape();

  assert.equal(harness.hideCalls(), 1);
  assert.equal(harness.focusCalls(), 1);
});

test("mobile menu closes after selecting a nav link but stays open on desktop", () => {
  const mobileHarness = createNavbarHarness();
  mobileHarness.dispatchLinkClick(1);
  assert.equal(mobileHarness.hideCalls(), 1);

  const desktopHarness = createNavbarHarness({ mobile: false });
  desktopHarness.dispatchLinkClick(1);
  assert.equal(desktopHarness.hideCalls(), 0);
});

test("ScrollSpy keeps aria-current synchronized with the active in-page section", () => {
  const harness = createNavbarHarness({ expanded: false });

  assert.equal(harness.linkAttributes[0].get("aria-current"), "location");
  harness.dispatchScrollSpy(1);

  assert.equal(harness.linkAttributes[0].has("aria-current"), false);
  assert.equal(harness.linkAttributes[1].get("aria-current"), "location");
});
