# Skills Carousel Refresh
Feature: Update the homepage skills carousel icons, categories, and mouse interaction.
Risk: none (scoped to the homepage skills carousel; no public contract change).

## Specs
S1. “Dentro del ul con id skills-track usa los iconos que se encuentran en C:\Users\RÓMULO\Documents\PROYECTOS-2026\WebPersonal\portafolio-back\assets\img\svg como son svg dale el tamaño indicado para el carrosul, asi mismo que si el cursor se posa encima de dicho ul con id skills-track se pare y que el usuario pueda moverlo con el mouse.”
S2. “Spring ai que use el mismo icono de Spring”
S3. “Que en la agrupación de Data quite MySql y que a mongo Db le agregue el icono MongoDB_light.svg y MongoDB_dark.svg en modo oscuro.”
S4. “que para el Spring data Jpa igual use el icono de spring.”
S5. “En la seccion Frameeork y api quite lo que es react.”
S6. “Que en angular coloque el icono angular.svg”
S7. “En la seccion Cloud , Aws coloque el icono Amazon Web Services_light.svg y en modo oscuro Amazon Web Services_dark.svg”
S8. “Cree un apartado de IA y coloque python, spring ai lo mueva de Framework y apis a la seccion Ai, agregar aws bedrock (aws-amazon-bedrock.svg), langchain y langgraph (colocar el icono langgraph-langchain.svg)”
S9. “En el componente Salesforce colocarle el icono salesforce.svg”
S10. “En spring security colocar el icono spring.”
S11. “Quitar el componente MCP”
S12. “Dentro de la sección **“Tools Behind the Work”**, quitar **WhatsApp Business**, **Dialogflow** y **Google Cloud**.”

## Tasks
- T1 — S2-S12 — route: inline — status: done — commit: pending — update skill categories, entries, bilingual labels, and requested SVG assignments; remove WhatsApp Business, Dialogflow, and Google Cloud Platform, reducing the carousel from 23 to 20 cards while preserving the remaining cards’ relative order; add and pass focused icon-scale/contrast/removal regressions.
- T2 — S1 — route: inline — status: done — commit: not applicable (existing behavior verified) — confirm hover pause and mouse drag; preserve the existing section-level pause, pointer-capture drag, keyboard controls, reduced-motion behavior, and touch scrolling.
- T3 — S1-S11 — route: inline — status: blocked — commit: pending — all carousel-focused checks and theme/viewport verification passed, but the repository-wide suite remains 63/64 because of the unrelated particle-opacity assertion (actual 0.4, expected 0.5); resolving it would violate the user's instruction not to change particle behavior.

## Log
L1 (2026-11-04): “Dentro del ul con id skills-track usa los iconos que se encuentran en C:\Users\RÓMULO\Documents\PROYECTOS-2026\WebPersonal\portafolio-back\assets\img\svg como son svg dale el tamaño indicado para el carrosul, asi mismo que si el cursor se posa encima de dicho ul con id skills-track se pare y que el usuario pueda moverlo con el mouse.

Ademas para el elemento de 
Spring ai que use el mismo icono de Spring
Que en la agrupación de Data quite MySql y que a mongo Db le agregue el icono MongoDB_light.svg y MongoDB_dark.svg en modo oscuro.
que para el Spring data Jpa igual use el icono de spring.
En la seccion Frameeork y api quite lo que es react.
Que en angular coloque el icono angular.svg
En la seccion Cloud , Aws coloque el icono Amazon Web Services_light.svg y en modo oscuro Amazon Web Services_dark.svg
Cree un apartado de IA y coloque python, spring ai lo mueva de Framework y apis a la seccion Ai, agregar aws bedrock (aws-amazon-bedrock.svg), langchain y langgraph (colocar el icono langgraph-langchain.svg)
En el componente Salesforce colocarle el icono salesforce.svg
En spring security colocar el icono spring.
Quitar el componente MCP”
L2 (2026-11-04): Exploration found the carousel’s 23 cards are static in `index.html:149-220`; category filters, English/Spanish labels, and autoplay are handled by `assets/js/work-gallery.js`. Existing pointer capture and mouse-drag scrolling are already implemented on the track. Icon containers are 44×44 in `assets/css/work-gallery.css`; use those existing dimensions. `spring-boot.svg` is the available Spring logo; no `spring.svg` exists. Light/dark variants for MongoDB and AWS are present in `assets/img/svg/`.
L3 (2026-11-04): Source review confirmed that hovering over the track bubbles to the existing skills-section pointerenter/leave pause listeners, and `#skills-track` already implements pointer capture and mouse drag. Preserve these working behaviors; validate them in the browser rather than narrowing pause scope or rewriting the drag logic.
L4 (2026-11-04): In an isolated Playwright context at `http://127.0.0.1:8765/` (1440×900, reduced motion off), autoplay advanced 21 CSS px in 900 ms, stayed still over `#skills-track` for 500 ms (0 px delta), and a 140 px mouse drag moved `scrollLeft` to 140. Existing behavior satisfies S1; no interaction-code change is needed.
L5 (2026-11-04): Reconciled task boundaries so the requested card/category/icon tests are added RED before the corresponding implementation in T1; T3 is reserved for final suite and desktop/mobile, light/dark verification.
L6 (2026-11-04): Preserve the existing 23-card count and static slide ordinals by replacing React with AWS Bedrock, MCP with LangChain, and MySQL with LangGraph in place; leave all other card positions unchanged.
L7 (2026-11-04): Added eight focused carousel tests before implementation. RED observed: 3 existing tests passed and all 8 new tests failed on the requested removals, AI category, SVG assignments/theme variants, and mouse-drag help; command exited 1 as expected.
L8 (2026-11-04): Implemented the requested card/category/icon updates and mouse-drag help. Focused Node verification passed: `node --test tests/work-gallery-content.test.mjs tests/round-one-content.test.mjs` — 16/16 tests, exit 0.
L9 (2026-11-04): An isolated Playwright screenshot of the AI-filtered dark carousel showed the LangChain/LangGraph SVG was nearly invisible against the dark card, while Python looked undersized due to transparent SVG margins. Reopened only T1 to add focused contrast/scale coverage and scoped styling before final visual verification.
L10 (2026-11-04): Added focused Python-scale and dark LangChain/LangGraph contrast regressions, observed RED for both, applied the scoped CSS rules, and observed GREEN: `node --test tests/work-gallery-content.test.mjs tests/round-one-content.test.mjs` passed 18/18; `node scripts/build-shared-shell.mjs --check` reports 100 files current; `git diff --check` passed with line-ending warnings only. The first post-fix Playwright setup attempt did not execute because the harness code referenced browser-global `location`; the script was corrected before final validation.
L11 (2026-11-04): Post-fix Playwright passed at 1440×900 and 390×844 in light and dark themes, plus 320×844 dark. No page overflow; the track remains horizontally scrollable; all five AI cards and their icons loaded; Python uses the 1.5 scale; both LangChain/LangGraph images receive `brightness(0) invert(1)` in dark theme and no filter in light. Desktop/mobile screenshots were visually inspected, including the LangGraph card at the track end.
L12 (2026-11-04): Final repository-wide check `node --test tests/*.test.mjs` completed 63/64; sole failure remains `tests/particle-motion.test.mjs` opacity mismatch (actual 0.4, expected 0.5). The user has explicitly instructed not to change particle behavior. All carousel-specific checks pass, but T3 remains blocked because the full suite fails and changing the unrelated behavior is unauthorized.
L13 (2026-11-04): Read-only `gentle_review assess` returned `nativeRisk: unassessable` because untracked files require an explicit declaration, with `changedPaths: 0`; RDD is off and no high-risk item was escalated, so no independent verifier ran. No paths were enumerated or modified for review.
L14 (2026-11-04): User requested: “Dentro de la sección **“Tools Behind the Work”**, quitar **WhatsApp Business**, **Dialogflow** y **Google Cloud**.” The existing “Google Cloud Platform” slide is the Google Cloud card being removed. This supersedes the earlier 23-card count only for the named removals; preserve the relative order of every remaining card.
L15 (2026-11-04): Added a focused regression and observed RED (23 slides instead of 20), removed the three requested slides, updated the static slide ordinals for no-JavaScript accessibility, and observed GREEN: focused carousel/content tests passed 18/18. Full suite remains 63/64 with only the previously blocked particle-opacity mismatch (actual 0.4, expected 0.5); no particle behavior changed. Static build generated 9 pages and `--check` reports 100 files current; `git diff --check` passed with line-ending warnings. Playwright was unavailable because navigation to the existing preview at `http://127.0.0.1:8765/` returned `ERR_CONNECTION_REFUSED`; no browser retry or deployment was performed.
