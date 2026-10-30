Objective: Centralize the navbar and footer in build-time templates while keeping the site as complete static HTML.
Branch: `feature/shared-navigation-shell` | Delivery strategy: `ask-on-risk` | Chain strategy: `stacked-to-main`.
Verification runner: `node --test tests/*.test.mjs`; `node scripts/build-shared-shell.mjs --check`.

## Specs

### S1 — Common navbar and footer

User request: “Antes de pasar con los colores, animacion, etc, se puede tener una plantilla comun del navbar y footer, por que veo que cada navbar se repite y hace que se vea cuando hago click en cada item un parpadeo sera por el tama{o que maneja cada pagina...?”

Acceptance: navbar and footer markup have a single build-time source; each published page still contains complete static HTML at its existing root URL.

### S2 — Preserve existing page behavior

Assumption: the refactor preserves current per-page destinations, active classes, collapse-wrapper styles, language-switch markup, page body, assets, and script order. It does not normalize unrelated differences or redesign the shell.

Acceptance: generated nav/footer preserve those page-specific details byte-for-byte where practical; existing language and contact-form tests remain green.

### S3 — Deploy the generated static site through Vercel

User correction: “El detalle es que ese workflow no se usa uso vercel para paginas estaticas nada mas, te lo consulto antes de que continues.”

Acceptance: add a root `vercel.json` that configures Vercel to run `node scripts/build-shared-shell.mjs` and publish `dist/`; leave the unused GitHub Actions deploy workflows unchanged. Generated `dist/` must contain complete HTML pages, assets, and `CNAME` at the deployed site root with existing URL paths intact. This centralizes source markup; it does not claim to eliminate full-document navigation or prove the reported flicker cause.

## Tasks

- T1 — S1-S2 — route: inline — completed — commit `346d823`: add shared templates, page configuration, deterministic static generator, build guide, and tests while leaving source pages and live deployment unchanged.
- T2 — S1-S3 — route: inline — completed — commit `e546f10`: replace source shells with markers on eight pages while the builder normalizes `project-page-5.html`, add Vercel build/output configuration and drift checking, and verify deployment output.
- T3 — S1-S2 — route: inline — completed — commit `b992979`: replace the final legacy shell in `project-page-5.html` with markers and verify output remains unchanged.

## Log

- L1 (2026-10-30): “Antes de pasar con los colores, animacion, etc, se puede tener una plantilla comun del navbar y footer, por que veo que cada navbar se repite y hace que se vea cuando hago click en cada item un parpadeo sera por el tama{o que maneja cada pagina...?”
- L2 (2026-10-30): “Si por favor”
- L3 (2026-10-30): Mapping confirmed nine static pages, direct-root deployment, and page-specific nav variants. Decision: use a dependency-free build-time generator and preserve variants; do not use runtime JS includes or alter visual behavior.
- L4 (2026-10-30): Existing worktree contains unrelated/uncommitted edits, including `.gitignore`, contact/language changes, tests, `.agents/`, and `skills-lock.json`; preserve all and exclude unrelated files from the feature commit.
- L5 (2026-10-30): Implementation will generate into `dist/` and configure both deploy workflows to publish that directory. Azure's official build configuration supports prebuilt output via `app_location: dist`, empty `output_location`, and `skip_app_build: true`; `CNAME` and assets must be copied into `dist/`.
- L6 (2026-10-30): Forecast approximately 600 authored changed lines across the feature, excluding generated `dist/`. User selected `stacked-to-main`; each slice must remain under the 400-line review budget or be re-sliced once. Both tasks use the inline parent route because each slice is cohesive and no parallel writer trigger applies.
- L7 (2026-10-30): The initial integrated candidate passed 15/15 tests, build/`--check` for 75 files, `node --check`, and independent scratch verification. Subsequent T1 work added support for both full-shell and marker-based source pages; re-verification of the final candidate is pending. Visual browser flicker remains unverified.
- L8 (2026-10-30): User selected `stacked-to-main`. T1 is the deploy-neutral generator/templates slice and preserves the existing deployment. T2 removes duplicated source shell and updates both workflows to publish `dist/`, based on T1.
- L9 (2026-10-30): T1 committed as `346d823` (`feat(site): add shared shell build`) after `node --test tests/shared-shell-build.test.mjs` passed and a generated site build succeeded. T2 is being developed on child branch `feature/shared-navigation-shell-deploy`.
- L10 (2026-10-30): User clarified that GitHub is only the source repository and Vercel deploys the static site; the existing GitHub Actions deploy workflows are unused. Reverted our uncommitted edits to those workflows and paused T2 before adding Vercel configuration, pending confirmation of the proposed `vercel.json` build/output settings.
- L11 (2026-10-30): User confirmed adding the Vercel configuration. Use `buildCommand: node scripts/build-shared-shell.mjs` and `outputDirectory: dist`; do not modify the unused GitHub Actions deploy workflows.
- L12 (2026-10-30): T2's estimated diff exceeded the 400-line stacked-PR limit. One slicing pass leaves the final source-only cleanup for `project-page-5.html` in T3; T2 still builds all nine published pages from the shared templates and remains deployable.
- L13 (2026-10-30): T2 is staged at 395 additions/deletions before the commit; the one remaining inline source shell is isolated for T3 so each stacked slice stays below 400 lines.
- L14 (2026-10-30): Final T2 checks: `node --test tests/*.test.mjs` passed 15/15; build and `--check` passed (75 output files); independent scratch verification met S1-S3 with no blockers; `git diff --cached --check` clean. No browser flicker test or live Vercel deployment was performed.
- L15 (2026-10-30): T2 committed as `e546f10` (`feat(vercel): deploy shared-shell site`); GitHub Actions deploy workflows are unchanged. T3 will remove the remaining source-only legacy shell from project page five without changing generated output.
- L16 (2026-10-30): Started T3 on child branch `feature/shared-navigation-shell-source-cleanup`; pre-existing contact/language worktree edits remain unstaged and preserved.
- L17 (2026-10-30): T3 committed as `b992979` (`refactor(site): remove final inline shell`). Final validation: `node --test tests/*.test.mjs` passed 15/15 and `node scripts/build-shared-shell.mjs --check` passed for 75 files. No live Vercel deploy or browser flicker check was performed.
