# Portfolio SEO
Feature: Improve search indexability and name association for `https://luispeche.vercel.app/` while preserving the existing language and visual behavior.
Risk: item 5 (the shared build output feeds Vercel, GitHub Pages, and Azure deployments).

## Specs
S1. Keep the exact name strings “Luis Peche Aparcana” and “Luis Peche”; use the full name in the homepage title and H1, keep the short name where natural, and size the H1 responsively.
S2. Keep homepage metadata in English; align the description, canonical URL, and Open Graph metadata with `https://luispeche.vercel.app/`. There is one shared-language URL, so do not add `hreflang` without distinct equivalent URLs.
S3. Give each indexable project-detail route its own English title, description, and canonical URL. Preserve page content, localization, and existing interactions.
S4. Add homepage JSON-LD using `ProfilePage` with a `Person` as `mainEntity`, associated with the exact names in S1 and only verified public profile URLs.
S5. Publish a permissive root `robots.txt` and a root `sitemap.xml` through the existing build output; list only canonical routes that respond successfully and are intended for indexing.
S6. Verify the generated output, responsive home H1, metadata uniqueness, language/theme controls, project routes, and the existing Open Graph image. Use Lighthouse as a measurement aid; distinguish local results from public results requiring deployment.
S7. Give the user the exact deployment and Google Search Console steps, including where to place a Google-provided verification tag if required. Do not push, deploy, request indexing, or send a WhatsApp message.

## Tasks
- T1 — S1-S7 — route: inline — status: done — commit: n/a — audit the published/local baseline, indexable routes, build path, and available verification tools.
- T2 — S1, S2, S4 — route: inline — status: done — commit: pending — add RED homepage metadata, localized full-name H1, responsive layout, and structured-data tests; implement the homepage SEO slice.
- T3 — S3 — route: inline — status: in_progress — commit: pending — add per-project metadata regressions and implement unique English titles, descriptions, and canonicals for the six project routes.
- T4 — S5 — route: inline — status: pending — commit: pending — add RED robots/sitemap/build-output tests, then generate and publish both root files through the existing build.
- T5 — S6-S7 — route: inline plus independent verification for item 5 — status: pending — commit: pending — verify the completed feature, record local Lighthouse/browser evidence, and prepare deployment/Search Console instructions.

## Log
L1 (2026-11-06): The original prompt was compacted before this turn and its complete wording is not recoverable. The retained opening is: “Audita e implementa SEO de mi portafolio en `https://luispeche.vercel.app/`. El objetivo es facilitar su indexación en Google y reforzar la asociación del sitio con los nombres **Luis Peche Aparcan...” The available task summary retains the exact target URL and names “Luis Peche Aparcana” and “Luis Peche,” and the SEO, build, deployment, and Search Console requirements captured in S1-S7; no additional product requirements are inferred.
L2 (2026-11-06): Public baseline: homepage and six project-detail routes return 200. The homepage has title `Home - LuisPeche` on the published deployment, no standard description or canonical, and Lighthouse SEO 0.91 (Performance 0.81, LCP 2.2 s, CLS 0). Published `/robots.txt` and `/sitemap.xml` return 404. Project routes have generic titles. The valid share image URL is `/assets/img/og/portada-portafolio.png` (200, `image/png`); the incorrect `/img/og/` path is 404. The local shared-shell builder publishes `dist/`, so root SEO files must be added to its output.
L3 (2026-11-06): Local baseline focused tests: `node --test tests/open-graph-preview.test.mjs tests/hero-responsive.test.mjs tests/project-details.test.mjs tests/shared-shell-build.test.mjs` produced 15/16 passing. The sole pre-existing failure is `tests/hero-responsive.test.mjs` expecting `href="cv.html"`; current homepage correctly links to `assets/pdf/luis-peche-cv.pdf`. Update that stale assertion only while adding the requested SEO regressions; do not change the working CTA.
L4 (2026-11-06): T2 test-first evidence: `tests/seo-home.test.mjs` failed 6/6 before implementation, then the focused homepage/OG/language/navbar/shell suite passed 39/39. `node scripts/build-shared-shell.mjs --check` reports 109 files current and `git diff --check` passes. Playwright on generated output verified the full-name H1 wraps to two lines at 1280, 390, and 320 CSS px; document width equals viewport at each size. The Spanish switch preserves the full name and English title/description; the theme toggle changes to dark. Updated stale CTA assertions to the existing PDF destination without changing the CTA.
