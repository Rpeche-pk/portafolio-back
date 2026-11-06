# Portfolio share preview metadata
Scope: Add English Open Graph metadata, publish the correct cover asset, and verify Vercel/WhatsApp preview.
Risk: item 5 (production deployment); preserve unrelated files and original image bytes.

## Specs

### S1 — Open Graph metadata
> Agrega o actualiza estas etiquetas Open Graph en el `<head>` del HTML inicial para que estén disponibles sin ejecutar JavaScript:
>
> - `og:type` → `website`
> - `og:url` → `https://luispeche.vercel.app/`
> - `og:title` → `Luis Peche | Backend & AI Developer`
> - `og:description` → `Explore my backend and AI projects built with Java, Spring Boot, Python, and AWS.`
> - `og:image` → URL pública absoluta de `portada-portafolio.png`
> - `og:image:type` → `image/png`
> - `og:image:alt` → `Cover image for Luis Peche’s software development portfolio`
> - `og:image:width` y `og:image:height` → dimensiones reales del PNG

### S2 — Image path and public route
> Usa la imagen existente en `img/og/portada-portafolio.png`. Comprueba su ruta pública en Vercel y usa la URL absoluta en `og:image`. Si el despliegue conserva la ruta, será `https://luispeche.vercel.app/img/og/portada-portafolio.png`.

### S3 — One Open Graph set
> Deja un solo conjunto de etiquetas Open Graph en la página principal.

### S4 — Public verification
> Verifica que aparezcan en el HTML servido y que la imagen responda con `200 OK` y `Content-Type: image/png` sin autenticación. Indica qué archivo modifiqué y cuál es la URL final de la portada.

### S5 — WhatsApp preview
> Después del despliegue, pega el enlace en WhatsApp para comprobar la vista previa. Si aparece una tarjeta anterior, prueba la URL con `?v=2` para comprobar si se trata de caché.

### S6 — Local branch integration and cleanup
> toma los cambios mandalo a main y avisame para hacer push y luego borra las ramas diferentes a main

## Tasks
- T1 — S2: Verify image bytes/dimensions and Vercel route; route: inline read-only discovery; commit: none.
- T2 — S1-S3: Add RED metadata regression, valid PNG asset, and one initial-HTML Open Graph set; route: inline test-first; commit: `e8f0624`.
- T3 — S4: Deploy and verify anonymous HTML/image responses; route: user-owned push to `main`, then parent public verification; no agent push; commit: T2 commit.
- T4 — S5: Check WhatsApp preview and cache-bust only if needed; route: parent after deployment; commit: none.
- T5 — S6: Commit the current task-log update on the feature branch and fast-forward local `main`; route: parent inline; commit: pending.
- T6 — S6: Delete merged local branches other than `main` with safe Git deletion; leave remote refs untouched; route: parent inline; commit: none.

## Log

### L1 — Original request
Configura la vista previa de `https://luispeche.vercel.app/` para que al compartirla por WhatsApp aparezcan la portada, el título y la descripción en inglés.

Usa la imagen existente en `img/og/portada-portafolio.png`. Comprueba su ruta pública en Vercel y usa la URL absoluta en `og:image`. Si el despliegue conserva la ruta, será `https://luispeche.vercel.app/img/og/portada-portafolio.png`.

Agrega o actualiza estas etiquetas Open Graph en el `<head>` del HTML inicial para que estén disponibles sin ejecutar JavaScript:

- `og:type` → `website`
- `og:url` → `https://luispeche.vercel.app/`
- `og:title` → `Luis Peche | Backend & AI Developer`
- `og:description` → `Explore my backend and AI projects built with Java, Spring Boot, Python, and AWS.`
- `og:image` → URL pública absoluta de `portada-portafolio.png`
- `og:image:type` → `image/png`
- `og:image:alt` → `Cover image for Luis Peche’s software development portfolio`
- `og:image:width` y `og:image:height` → dimensiones reales del PNG

Deja un solo conjunto de etiquetas Open Graph en la página principal. Verifica que aparezcan en el HTML servido y que la imagen responda con `200 OK` y `Content-Type: image/png` sin autenticación. Indica qué archivo modifiqué y cuál es la URL final de la portada.

Después del despliegue, pega el enlace en WhatsApp para comprobar la vista previa. Si aparece una tarjeta anterior, prueba la URL con `?v=2` para comprobar si se trata de caché.

### L2 — Exploration evidence
The local asset `assets/img/og/portada-portafolio.png` is JPEG data (JFIF), 1424×752 px, despite its `.png` suffix. Preserve its original bytes while creating a true PNG so the requested metadata and response MIME agree. The Vercel build preserves the `assets/` prefix (`scripts/build-shared-shell.mjs:227-239,278-279,326-330`; `vercel.json:3-4`), so the expected deployed URL is `https://luispeche.vercel.app/assets/img/og/portada-portafolio.png`, not the conditional `/img/og/` example. Anonymous fetches of both routes on the current deployment returned Vercel 404 pages; the image is not yet published.

### L3 — T2 implementation and local verification
Observed RED before implementation (2 failing tests: no Open Graph set; `.png` file had JPEG signature). Preserved original JPEG bytes at `odd/portfolio-share-preview/portada-portafolio-original.jpg`, converted `assets/img/og/portada-portafolio.png` to a real PNG (1424×752), added the nine requested tags to the initial `index.html` head, and added `tests/open-graph-preview.test.mjs`. GREEN: 2/2 tests pass; `node scripts/build-shared-shell.mjs` generated 9 pages; `node scripts/build-shared-shell.mjs --check` reports 109 files current; `git diff --check` passes; both source and `dist` cover files identify as PNG. Native assess reports unassessable due to untracked paths and requires the independent verifier in the risk-gated plan. Commit pending.

### L4 — Independent verification
`gentle-ai-verify` read the feature document through `## Log` and independently returned S1-S3 met: nine tags exactly once in both source and generated initial heads, correct `/assets/img/og/` URL, true source/generated PNGs with 1424×752 IHDR, source/output assets byte-identical, and unique Open Graph set. `node --test tests/open-graph-preview.test.mjs` passed 2/2; `node scripts/build-shared-shell.mjs --check` reports 109 files current. S4-S5 remain pending Vercel deployment/WhatsApp. No repo edits or Git state changes by verifier.

### L5 — Work-unit commit
T2 implementation, regression test, valid PNG, preserved JPEG source, and feature document were committed on `feature/portfolio-share-preview` as `e8f0624` (`feat(meta): add WhatsApp share preview metadata`). The evidence-doc commit is `d7a95d6`; both commits were fast-forwarded into local `main`, which is currently clean at `d7a95d6`.

### L6 — Deployment routing blocker
The repository has no Vercel CLI installed and no `.vercel/project.json`. `origin/main` remains at `60daa80`; pushing local `main` would trigger Vercel and the configured GitHub Pages and Azure Static Web Apps workflows (`.github/workflows/static.yml`, `.github/workflows/azure-static-web-apps-purple-sky-0f8cc0610.yml`). The requested target is Vercel only, the user selected Vercel-only CLI/project setup; no Git push is authorized.

### L7 — Vercel-only deployment decision
The user chose “Configurar despliegue solo en Vercel”. Use a Vercel-specific deployment path only; do not push `main` and do not trigger GitHub Pages or Azure.

### L8 — Authentication blocker
Vercel CLI 65.12.1 was bootstrapped into `.git/og-preview-npm-cache`. No `VERCEL_TOKEN`, `VERCEL_ORG_ID`, or `VERCEL_PROJECT_ID` environment values are configured. `npx --yes vercel --global-config .git/og-preview-cli-config whoami` returned `Logged out` (exit 1), without using the user's global profile. Deployment is waiting for the user to complete CLI login with `npx --yes vercel --global-config .git/og-preview-cli-config login` from the repository root. No push or deployment occurred.

### L9 — Local main and branch cleanup request
> toma los cambios mandalo a main y avisame para hacer push y luego borra las ramas diferentes a main

The user now wants the local changes on `main`, a notification to perform the push themselves, and removal of local branches other than `main`. This supersedes the Vercel CLI login route; do not push. Current branch is `main` at `d7a95d6`; only `odd/tasks/portfolio-share-preview.md` is modified. `feature/portfolio-share-preview` and `feature/desing-hero` are fully merged into `main`; no unmerged local branches were found. Remote branches will not be deleted. A push to `main` triggers Vercel, GitHub Pages, and Azure Static Web Apps workflows.