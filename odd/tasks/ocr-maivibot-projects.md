# OCR and MaiviBot Project Pages
Authorized update to two existing project cards and their corresponding detail routes; preserve unrelated working-tree edits and other portfolio sections.
Scope: repurpose `ai-assistant` as OCR on `project-page-5.html` and `devbot-supermarket` as MaiviBot on `project-page-1.html`; keep existing IDs/routes and use only the supplied MaiviBot repository URLs.

## Specs

### S1 — OCR card
> Dentro de la sección proyecto
>
> En el article data-project-id="ai-assistant" cambia la imagen por el proyecto OCR, que se encuentra en C:\Users\RÓMULO\Documents\PROYECTOS-2026\WebPersonal\portafolio-back\assets\img\tech\ocr.png una breve descripción.
>
> Genera el botoón Details, Detalle y que te lleve a la pagina correspondiente como estan estruturados los demas proyectos.

### S2 — OCR implementation details
> Aquí el detalle breve de la implementación:
> Componente OCR: Se desarrollo e implemento un componenten OCR para el área de logística el cual mediante el aplicativo core de indigo administrativo suben los archivos en este caso en primera instancia se trabajo con recibos de luz, agua, internet, etc. Reduciendo el tiempo operativo que se tomaba el área usuario de buscar que dato ingresar en relación con el recibo a analizar para este proyecto se uso java 25, spring boot, spring ai, mediante una arquitectura limpia, test con mockito, sonar qube, owasp y dependency check para las vulnerabilidades, así como aws textract, sns sqs, para el acceso a dichos recursos de aws se uso roles anywhere, y aws amazon bedrock para generar la data mas sanitizada y estructurada.

### S3 — MaiviBot card and detail
> En el article DevBot Supermarket cambiarlo por proyecto de Tesis "MaiviBot"
>
> Genera el botoón Details, Detalle y que te lleve a la pagina correspondiente como estan estruturados los demas proyectos. aqui usa como imagen de implementacion C:\Users\RÓMULO\Documents\PROYECTOS-2026\WebPersonal\portafolio-back\assets\img\tech\arqui-docker-scraper.png
> Ahi coloca el github del bot https://github.com/Rpeche-pk/maivi-bot-tesis.git
> y el github del apirest https://github.com/Rpeche-pk/micro-supermarket.git
>
> Aquí el detalle breve de la implementación:
> Se implemento un chatbot capaz de usar ia generativa y en el backend con python la tecnica de web scraping para obtener los productos en primera instancia categoria abarrotes de los principales supermercados de Ica: Tottus, Plaza vea y metro. Los resultados demostraron que la implementación del chatbot optimizó la búsqueda de productos al reducir el tiempo de consulta y mejorar la precisión de los resultados. Se observó una mejora del 77% en la eficiencia de búsqueda y un 69% de los usuarios reportó una experiencia positiva.
> Dentro de las tecnologias usadas:
> Libreria llamada builder bot el cual es un wrapper con diferentes proveedos: whatsapp, telegram e instagram esto ayudo a la creacion de flujos, en un entorno nodejs para el agente ai se uso GPT4-OMINI, se construyo una apiRest en spring bot con java 17 que servia la data extraida esta consumia una instancia de Mongodbatlas.
> En la tecnica de web scraping se uso python con selenium y selenium grid para la busqueda en paralelo todo montado sobre la infraestructura de google cloud la prueba gratuita.
>
> En el article MaiviBot lo cambie por Proyecto Tesis Maivibot y su imagen asociada por favor revisa que otra cosa deberia cambiar y hazlo

### Implementation boundary
- Preserve the existing project IDs and their corresponding detail routes; update both the generated card and its route using the site's existing bilingual project structure.
- Keep existing button labels for unrelated projects; the two requested cards must show English `Details` and Spanish `Detalle`.
- Do not invent an OCR repository/demo URL. Use only the two MaiviBot repository URLs supplied in S3.
- Do not edit Skills, Professional Milestones, or unrelated project content.

## Tasks
- T1 — S1-S3; route: update both project-card records, their supplied stack badges, the static fallback names, scoped Spanish Details labels, and card regression tests; synchronize the MaiviBot card title to `Proyecto Tesis Maivibot`; status: done (card title/fallback and selected `devbot.png` image align; `node --test tests/project-cards.test.mjs` passes 5/5); commit: pending.
- T2 — S2,S3; route: keep the MaiviBot detail title and cover synchronized with the updated card (`assets/img/tech/devbot.png`), update EN/ES title catalogs, and align route/language/browser tests; status: done (detail title/cover and EN/ES titles match the card; `node --test tests/project-details.test.mjs tests/language.test.mjs` passes 13/13); commit: pending.
- T3 — S1-S3; route: rerun focused tests, generated-site checks and the project-detail Playwright matrix for the revised title/image; capture/inspect evidence and retain the local-preview/no-deployment boundary; status: blocked (all feature-focused checks pass, but the full suite still has two unrelated failures: particle opacity 0.4 vs 0.5 and timeline count 11 vs 10; neither was changed); commit: n/a (verification and tracking only).
- T4 — S1-S3; route: review the current branch/mixed worktree, stage only proven T1/T2 changes, and create reviewable Conventional Commit slices if safe; preserve all unrelated existing edits; status: blocked (safe ownership boundaries and required independent differential proof unavailable; awaiting a clean task-only worktree or exact user-approved staging boundaries); commit: none.

## Log
- L1 — Original request verbatim:

```text
Dentro de la sección proyecto

En el article data-project-id="ai-assistant" cambia la imagen por el proyecto OCR, que se encuentra en C:\Users\RÓMULO\Documents\PROYECTOS-2026\WebPersonal\portafolio-back\assets\img\tech\ocr.png una breve descripción.

Genera el botoón Details, Detalle y que te lleve a la pagina correspondiente como estan estruturados los demas proyectos.

Aquí el detalle breve de la implementación:
Componente OCR: Se desarrollo e implemento un componenten OCR para el área de logística el cual mediante el aplicativo core de indigo administrativo suben los archivos en este caso en primera instancia se trabajo con recibos de luz, agua, internet, etc. Reduciendo el tiempo operativo que se tomaba el área usuario de buscar que dato ingresar en relación con el recibo a analizar para este proyecto se uso java 25, spring boot, spring ai, mediante una arquitectura limpia, test con mockito, sonar qube, owasp y dependency check para las vulnerabilidades, así como aws textract, sns sqs, para el acceso a dichos recursos de aws se uso roles anywhere, y aws amazon bedrock para generar la data mas sanitizada y estructurada.

En el article DevBot Supermarket cambiarlo por proyecto de Tesis "MaiviBot"

Genera el botoón Details, Detalle y que te lleve a la pagina correspondiente como estan estruturados los demas proyectos. aqui usa como imagen de implementacion C:\Users\RÓMULO\Documents\PROYECTOS-2026\WebPersonal\portafolio-back\assets\img\tech\arqui-docker-scraper.png
Ahi coloca el github del bot https://github.com/Rpeche-pk/maivi-bot-tesis.git
y el github del apirest https://github.com/Rpeche-pk/micro-supermarket.git

Aquí el detalle breve de la implementación:
Se implemento un chatbot capaz de usar ia generativa y en el backend con python la tecnica de web scraping para obtener los productos en primera instancia categoria abarrotes de los principales supermercados de Ica: Tottus, Plaza vea y metro. Los resultados demostraron que la implementación del chatbot optimizó la búsqueda de productos al reducir el tiempo de consulta y mejorar la precisión de los resultados. Se observó una mejora del 77% en la eficiencia de búsqueda y un 69% de los usuarios reportó una experiencia positiva.
Dentro de las tecnologias usadas:
Libreria llamada builder bot el cual es un wrapper con diferentes proveedos: whatsapp, telegram e instagram esto ayudo a la creacion de flujos, en un entorno nodejs para el agente ai se uso GPT4-OMINI, se construyo una apiRest en spring bot con java 17 que servia la data extraida esta consumia una instancia de Mongodbatlas.
En la tecnica de web scraping se uso python con selenium y selenium grid para la busqueda en paralelo todo montado sobre la infraestructura de google cloud la prueba gratuita.
```
- L2 — Read-only explorer mapped cards in `assets/js/work-gallery.js`; `ai-assistant` currently routes to `project-page-5.html` and `devbot-supermarket` to `project-page-1.html`. Card Details controls already exist, with English `Details` and global Spanish `Detalles`; preserve those labels for other cards and scope singular `Detalle` to the two requested cards. Detail pages hydrate through the existing `proyects-*` keys in the EN/ES JSON. No OCR repository URL was supplied, so do not invent one; MaiviBot has the two supplied GitHub URLs. The requested OCR asset is JPEG data despite its `.png` suffix; keep the requested path and verify browser decoding. Keep existing IDs/routes and leave Skills/Professional Milestones and unrelated worktree changes untouched.
- L3 — Parent readback of T1 found stale technology tags left on the two repurposed card records (`Java 17` for OCR; legacy Dialogflow/MongoDB tags for DevBot). T1 now covers S2’s OCR stack and S3’s MaiviBot stack; update those card tags from the supplied facts and pin them in the focused card tests. Keep the card copy concise and preserve all sibling cards.
- L4 — T1 verified: both cards keep their existing IDs/routes, use the supplied images, have bilingual summaries and requested technologies, and show `Details`/`Detalle`; the no-JS fallback names match. The other four cards retain their routes, real demos, and Spanish `Detalles`. `node --test tests/project-cards.test.mjs` passes 5/5. T2 is now in progress; route content and browser image decoding remain to verify.
- L5 — Parent readback verified the T2 bilingual route copy, exact supplied MaiviBot URLs, and OCR's lack of invented links; focused detail/language tests pass 13/13. Align the detail-page spelling `GPT4-OMINI` with the card's canonical `GPT-4o mini` label in both locales and pin that consistency before closing T2; T3 still owns browser image decoding and route checks.
- L6 — T2 verified: both existing detail routes now contain the requested bilingual project facts, correct cover images, technology lists, and links; OCR has no invented external URL, and MaiviBot uses only the two supplied GitHub repositories with safe new-tab attributes. The visible model name is canonicalized as `GPT-4o mini` consistently with T1; `node --test tests/project-details.test.mjs tests/language.test.mjs` passes 13/13. Browser image decoding and route checks remain for T3.
- L7 — T3 verified: `node --test tests/project-cards.test.mjs tests/project-details.test.mjs tests/language.test.mjs` passes 18/18; `node --check assets/js/work-gallery.js`, both translation JSON parses, `node scripts/build-shared-shell.mjs --check` (106 files current), and `git diff --check` pass. Playwright passes all 6 detail routes across 320/390/1440px (18 viewport cases), with all images decoded/alt-tagged, no overflow, bilingual switching/persistence, theme sync/persistence, keyboard focus, reduced-motion checks, and zero console/page errors. OCR has the supplied `ocr.png` cover and no invented outbound URL; MaiviBot has the supplied architecture cover and exactly the two safe GitHub links. Captured and inspected `screenshots/project-ocr-detail-desktop.png`, `screenshots/project-ocr-detail-mobile.png`, `screenshots/project-maivibot-detail-desktop.png`, and `screenshots/project-maivibot-detail-mobile.png`. Local preview is `http://127.0.0.1:8766/` (loopback static server serving `dist/`); English/light restored. No deployment. T1/T2 work-unit commits remain pending safe review of the mixed dirty worktree.
- L8 — T4 begins: prior user work leaves many modified and untracked files, several overlapping T1/T2 surfaces. Review branch and diffs before staging; never stage whole files or unrelated files, and stop if individual ownership cannot be separated safely.
- L9 — T4 blocked: branch is `feature/desing-hero`; no files were staged or committed. The mixed worktree has 19 modified tracked files and many untracked files. Whole-file staging is unsafe for `assets/js/work-gallery.js`, `index.html`, and both language catalogs; the requested image assets are untracked. `gentle_review assess` classified item 3/high but could not assess the diff because untracked files require explicit declaration. The independent verifier reviewed S1-S3 structurally but could not provide runtime proof or the required HEAD-versus-worktree differential check; S1-S3 remain independently unverified. No deployment. Await a clean task-only worktree or exact user-approved staging boundaries before T4 can resume.
- L10 — Requirement update, verbatim: `En el article MaiviBot lo cambie por Proyecto Tesis Maivibot y su imagen asociada por favor revisa que otra cosa deberia cambiar y hazlo`. The live card currently selects `Proyecto Tesis MaiviBot` and `assets/img/tech/devbot.png`; use that associated image as the current selection, align the exact requested spelling `Proyecto Tesis Maivibot` and detail-page title/image, EN/ES title catalogs, fallback, focused tests, and Playwright assertion. Reopened T1/T2; T3 verification is pending. T4 remains blocked; no staging or commit.
- L11 — T1 complete: the card and no-script fallback use exact title `Proyecto Tesis Maivibot`, preserve the user-selected `assets/img/tech/devbot.png`, and keep the existing route. `node --test tests/project-cards.test.mjs` passes 5/5. T2 is in progress.
- L12 — T2 complete: the detail H1, cover image, and EN/ES title catalogs now match the card's exact title and selected image; existing ID, route, repositories, and project copy are preserved. Observed RED in focused card/detail/language tests before implementation (3 targeted failures); `node --test tests/project-details.test.mjs tests/language.test.mjs` passes 13/13.
- L13 — T3 evidence: focused card/detail/language tests pass 18/18; JS syntax, EN/ES JSON parsing, generated-site check (107 files), and `git diff --check` pass. Playwright passes 6 routes/18 viewport cases with no overflow or browser errors; title/image, bilingual switching, theme persistence, keyboard focus, and reduced-motion assertions pass. Captured and visually inspected `screenshots/project-maivibot-title-desktop.png` and `screenshots/project-maivibot-title-mobile.png`; both show the exact title and loaded `devbot.png`. Full `node --test` is 88/90: `tests/particle-motion.test.mjs` expects 0.5 but observes 0.4, and `tests/round-one-content.test.mjs` expects 10 timeline items but observes 11; its updated OCR/Maivibot fallback assertions now match. Neither unrelated behavior/assertion was changed. An initial screenshot setup attempt failed from a DOM-context mistake; corrected capture succeeded. No deployment. T3 remains blocked.