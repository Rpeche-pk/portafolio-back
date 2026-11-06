import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const home = await readFile(new URL("../index.html", import.meta.url), "utf8");
const behavior = await readFile(new URL("../assets/js/work-gallery.js", import.meta.url), "utf8");
const styles = await readFile(new URL("../assets/css/work-gallery.css", import.meta.url), "utf8");
const skillsTrack = home.match(/<ul class="skills-track"[^>]*>[\s\S]*?<\/ul>/)?.[0] ?? "";

function assertMatches(source, pattern, message) {
  assert.ok(pattern.test(source), message);
}

function assertNotMatches(source, pattern, message) {
  assert.ok(!pattern.test(source), message);
}

function revealTarget(name) {
  return new RegExp(`data-scroll-reveal="${name}"`);
}

test("homepage sections expose grouped reveal targets without animating skill cards individually", () => {
  for (const target of [
    "hero-intro", "hero-support", "hero-photo", "experience", "certifications",
    "projects-heading", "skills-heading", "skills-toolbar", "skills-track-shell",
    "about-heading", "about-filters", "timeline", "contact-heading", "contact-form", "contact-card"
  ]) {
    assertMatches(home, revealTarget(target), `${target} is a semantic reveal group`);
  }
  assertMatches(behavior, /card\.dataset\.scrollReveal\s*=\s*['"]project['"]/, "project cards are revealed after dynamic rendering");
  assert.equal((home.match(/data-scroll-reveal="timeline"/g) ?? []).length, 12);
  assert.equal((home.match(/class="contact-card[^\"]*"[^>]*data-scroll-reveal="contact-card"/g) ?? []).length, 2);
  assertNotMatches(skillsTrack, /class="skills-slide"[^>]*data-scroll-reveal=/, "horizontal skill cards do not receive vertical reveal motion");
});

test("reveal enhancement keeps base content visible and centralizes restrained responsive motion", () => {
  assertMatches(styles, /--reveal-duration:\s*420ms/, "reveal duration is centralized");
  assertMatches(styles, /--reveal-distance:\s*12px/, "desktop reveal distance is restrained");
  assertMatches(styles, /--reveal-mobile-distance:\s*7px/, "mobile reveal distance is reduced");
  assertMatches(styles, /--reveal-stagger:\s*70ms/, "project row stagger is centralized");
  assertMatches(styles, /--reveal-secondary-delay:\s*80ms/, "contact column offset is centralized");
  assertMatches(styles, /:root\.has-scroll-reveals\s+\[data-scroll-reveal\]:not\(\[data-scroll-revealed\]\)\s*\{[^}]*opacity:\s*0/, "only the active enhancement hides unrevealed targets");
  assertNotMatches(styles, /^\s*\[data-scroll-reveal[^\]]*\][^{]*\{[^}]*opacity:\s*0/m, "the no-JavaScript base state is not hidden");
  assertMatches(styles, /@media\s*\(max-width:\s*760px\)[\s\S]*?--reveal-distance:\s*var\(--reveal-mobile-distance\)/, "mobile motion uses the smaller distance");
  assertMatches(styles, /@media\s*\(prefers-reduced-motion:\s*reduce\)[\s\S]*?\[data-scroll-reveal\][\s\S]*?opacity:\s*1[\s\S]*?translate:\s*none/, "reduced motion makes all reveal content visible");
});

test("project-card stagger is bounded by row and reset on mobile while preserving hover states", () => {
  assertMatches(styles, /\.project-list\s+\.project-card:nth-child\(3n\s*\+\s*2\)[^{]*\{[^}]*--reveal-delay:\s*var\(--reveal-stagger\)/, "desktop row columns stagger progressively");
  assertMatches(styles, /\.project-list\s+\.project-card:nth-child\(3n\s*\+\s*3\)[^{]*\{[^}]*--reveal-delay:\s*calc\(var\(--reveal-stagger\)\s*\*\s*2\)/, "third desktop card stays within bounded row delay");
  assertMatches(styles, /\.project-media:hover\s+\.project-media-overlay,\s*\.project-media:focus-visible\s+\.project-media-overlay\s*\{\s*opacity:\s*1;/, "existing project overlay interaction remains available");
  assertMatches(styles, /@media\s*\(max-width:\s*760px\)[\s\S]*?\.project-list\s+\.project-card[^{]*\{[^}]*--reveal-delay:\s*0ms/, "mobile cards do not inherit desktop row stagger");
});

test("scroll reveal remains separate from the carousel track, timeline line, and fixed controls", () => {
  assertMatches(styles, /\.about-timeline::before\s*\{[^}]*position:\s*absolute/, "timeline line remains static");
  assertNotMatches(styles, /\.about-timeline::before[^}]*animation:/, "timeline line has no entrance animation");
  assertMatches(styles, /\.skills-track\s*\{[^}]*overflow-x:\s*auto/, "carousel remains horizontally scrollable");
  assertMatches(behavior, /skillsTrack\.addEventListener\('pointerdown'/, "carousel pointer dragging remains wired");
  assertMatches(behavior, /skillsSection\.addEventListener\('pointerenter'/, "carousel hover pause remains wired");
  assertMatches(home, /class="cord-slot"/, "fixed cord remains outside reveal targets");
});

test("focus, invalid form fields, anchor destinations, and filtered-in records bypass reveal transitions", () => {
  assertMatches(behavior, /document\.addEventListener\('focusin',[\s\S]*?markScrollTargetRevealed\(target,\s*true\)/, "keyboard focus reveals its container immediately");
  assertMatches(behavior, /document\.addEventListener\('invalid',[\s\S]*?markScrollTargetRevealed\(target,\s*true\)/, "native invalid fields reveal their container immediately");
  assertMatches(behavior, /function revealAnchorDestination\([\s\S]*?targets\.forEach\(\(target\)\s*=>\s*markScrollTargetRevealed\(target,\s*true\)\)/, "anchor destinations bypass entrance delays");
  assertMatches(behavior, /function revealVisibleTimelineRecords\([\s\S]*?markScrollTargetRevealed\(record,\s*true\)/, "filtered-in timeline records in view bypass entrance delays");
  assertMatches(styles, /:root\.has-scroll-reveals\s+\[data-scroll-reveal\]\[data-scroll-reveal-immediate\]\s*\{[^}]*opacity:\s*1;[^}]*translate:\s*none;[^}]*transition:\s*none;/, "immediate reveal has no opacity or translate transition");
});

test("timeline filtering unobserves hidden records and synchronously reveals visible returns", () => {
  assertMatches(behavior, /function applyAboutFilter\(filterId, keepFocus = false\)\s*\{[\s\S]*?record\.hidden = currentAboutFilter !== 'all' && record\.dataset\.aboutGroup !== currentAboutFilter;\s*if \(record\.hidden\) scrollRevealObserver\?\.unobserve\(record\)/, "hidden timeline records leave the shared observer");
  assertMatches(behavior, /entry\.isIntersecting\s*&&\s*!entry\.target\.hidden/, "queued observer entries cannot reveal a record after it becomes hidden");
  assertNotMatches(behavior, /function revealVisibleTimelineRecords\(\)\s*\{\s*scheduleScrollRevealFrame\(/, "filter-return visibility does not wait for an animation frame");
  assertMatches(behavior, /function revealVisibleTimelineRecords\(\)[\s\S]*?markScrollTargetRevealed\(record,\s*true\)/, "visible filtered-in records reveal immediately");
  assertMatches(behavior, /function applyAboutFilter\(filterId, keepFocus = false\)[\s\S]*?observeScrollRevealTargets\(aboutRecords\.filter\(\(record\) => !record\.hidden\)\)/, "unrevealed visible-filter records resume viewport observation");
});
