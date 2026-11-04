# Portfolio Project Detail Pages
Feature: Restyle the six existing detail pages to match the current homepage while preserving their content and behavior.
Source note: The original prompt was compacted; L1 records the recovered handoff summary, not a verbatim transcript.
Risk: item 3 (shared navigation, localization, theme, and static-shell behavior are consumed across pages).

## Specs
S1. The pages must “share the current design of the homepage.”
S2. “Preserve content, URLs, technologies, and dependencies.”
S3. “Reuse shared navbar/footer; maintain languages and themes.”
S4. “Improve accessibility and responsive behavior.”
S5. “Connect the Projects cards correctly.”
S6. “Validate all six pages with Playwright.”
S7. “Include a project/URL/validation table, summary, shared-template location, desktop and mobile screenshots, and pending items or limitations.”
S8. “Do not deploy the site.”

## Tasks
- T1 — S1, S3, S5 — route: inline — status: in_progress — commit: pending — apply the approved shared shell and keep project-card detail destinations aligned with the six existing pages.
- T2 — S1, S2, S4 — route: inline — status: pending — commit: pending — adapt the six page bodies to the homepage visual system while preserving source content, assets, destinations, technologies, and existing functionality.
- T3 — S4, S6-S8 — route: inline — status: pending — commit: pending — validate the six routes in Playwright, verify responsive/accessibility/language/theme behavior, capture desktop/mobile evidence, document the route table and limitations, and do not deploy.

## Log
L1 (recovered from the compaction handoff; original raw prompt unavailable): “Actualizar las seis páginas de detalle del portafolio para que compartan el diseño actual de la página principal, conservar contenido, URLs, tecnologías y dependencias, y conectar correctamente las cards de Projects. Reutilizar navbar/footer compartidos, mantener idiomas y temas, mejorar accesibilidad y responsive, y validar las seis páginas con Playwright. La entrega debe incluir tabla de proyectos, URLs y validación, resumen, ubicación de la plantilla compartida, capturas de escritorio y móvil, y pendientes o limitaciones. No desplegar el sitio.”
L2 (2026-11-03): Confirmed the six project routes and their current project-card mappings. The shared shell generator already supports choosing the Work Gallery navbar/footer per page; the Work Gallery CSS is the live visual source. `design/system.md` is stale relative to `assets/css/work-gallery.css`, so it will not be used without an authorized sync. Existing project pages still depend on legacy localized body content and media/demo links; keep them intact while integrating the shared shell.
L3 (2026-11-03): Added `tests/project-details.test.mjs` and ran `node --test tests/project-details.test.mjs`; RED was observed (1/3 pass, 2 fail) because project pages still select the legacy shared navbar/footer and the Work Gallery navbar lacks the `id="flags"` and `CURRENT_PROJECTS` hooks. The card destination regression test passes, and all six card records map to existing detail-page files.
L4 (2026-11-03): Selected the Work Gallery navbar/footer and explicit homepage-section destinations for all six project routes, retained legacy localized body content and dependencies, added the shared Work Gallery stylesheet/runtime and an early persisted-theme bootstrap, routed legacy language controls through the shared navigation, and guarded the homepage scrollspy when detail pages have no local sections. `node --test tests/project-details.test.mjs` is GREEN (3/3); build/static-shell and cross-page verification remain pending.
L5 (2026-11-03): Rebuilt the static site and confirmed `node scripts/build-shared-shell.mjs --check` reports 92 current files. The combined focused shell/cards/language run passed 14/16; two older shell assertions still assumed project details use the legacy navbar and only one navigation element. Updated the shell tests to classify template selection and assert the new desktop/mobile routes plus preserved legacy pages; rerun is pending.
L6 (2026-11-03): Reran the focused route, card, shared-shell, build, and language tests after updating those expectations; all 16/16 pass. Static output remains current at 92 files. T1 behavior is verified; no page-level Playwright validation has been claimed yet.