# Professional Milestones by organization
Authorized implementation for the existing portfolio; preserve prior worktree changes and keep all preview activity local.
Primary record: the main Experience timeline; retain the separate Education tab and shared shell.

## Specs

### S1 — Organization structure
> 1. ESTRUCTURA POR ORGANIZACIÓN
>
> - Una tarjeta principal por organización.
> - En su encabezado: organización, puesto, periodo general y modalidad cuando esté confirmada.
> - Debajo: resumen breve de la experiencia.
> - Dentro de la misma tarjeta: proyectos o responsabilidades diferenciados, con sus propias fechas, descripción, tecnologías y enlaces.
> - No presentes los proyectos internos como empleos independientes.
> - Conserva las demás experiencias y la pestaña Formación.

### S2 — No Country records
> 2. ACTUALIZAR NO COUNTRY
>
> Los datos proporcionados aquí reemplazan las fechas anteriores de No Country. No debe seguir apareciendo como “Present / Actualidad”.
>
> Organización: No Country.
> Puesto: Desarrollador Backend.
> Periodo: octubre de 2023 – enero de 2024.
> Duración: 4 meses.
>
> Resumen:
> “Participé en equipos multiculturales desarrollando soluciones backend con Java y Spring Boot, colaborando en la resolución de retos técnicos y el cumplimiento de los plazos de entrega”.
>
> Incluye estos proyectos dentro de la experiencia:
>
> TRUCKING
> Periodo: noviembre – diciembre de 2023.
> Modalidad: remoto.
>
> Descripción:
> “Lideré el desarrollo backend de un sistema de gestión de flotas mediante una arquitectura REST en capas, aplicando patrones de diseño y buenas prácticas. También diseñé y desarrollé un chatbot de WhatsApp con Baileys, integrado con la API REST construida en Spring Boot”.
>
> Tecnologías:
> Java 17, Spring Boot, Spring Mail, Spring Security, Spring Data JPA, MapStruct, JWT, Springdoc OpenAPI, Docker, GitHub Actions, Maven, Git, Baileys y MySQL.
>
> Despliegue:
> Servidor físico IBM X3550 M4.
>
> Vídeo:
> https://www.youtube.com/watch?v=UziTMfvcI_I
>
> CASHIER
> Periodo: octubre – noviembre de 2023.
>
> Descripción:
> “Desarrollé funcionalidades backend para una billetera digital mediante una arquitectura REST en capas, aplicando patrones de diseño y buenas prácticas”.
>
> Tecnologías:
> Java 17, Spring Boot, Spring Mail, Spring Data JPA, MapStruct, Spring Security, JWT, Swagger, Docker, Firebase Cloud Storage, Maven, Git, ZXing y PostgreSQL.
>
> Despliegue:
> Servidor físico IBM X3550 M4.
>
> Vídeo:
> https://lnkd.in/eG2f7kgk
>
> Conserva estos enlaces como recursos proporcionados; no inventes sus destinos finales.

### S3 — Presentation
> 3. PRESENTACIÓN
>
> - Mantén un único nodo de la línea temporal para No Country.
> - Presenta Trucking y Cashier como bloques internos con subtítulos y separadores finos.
> - Diferencia claramente el periodo de la organización del periodo de cada proyecto.
> - Usa badges compactos para tecnologías, sin duplicar una lista completa en el encabezado general.
> - Reutiliza las miniaturas y páginas de detalle existentes si están disponibles.
> - Añade “Ver proyecto / View project” y “Ver vídeo / Watch video” únicamente donde haya destinos reales.
> - Elimina textos residuales de LinkedIn como “Vista en miniatura”, “y 4 aptitudes más” o “… más”.
> - No añadas métricas ni resultados no proporcionados.

### S4 — Data, language, and preservation
> 4. DATOS E IDIOMAS
>
> - Adapta la estructura de datos para que cada experiencia admita una colección de proyectos.
> - Centraliza el contenido y conserva el sistema español/inglés.
> - Calcula los conteos de filtros por experiencias principales, sin contar cada proyecto interno como un empleo adicional.
> - Revisa otras experiencias para aplicar la misma agrupación solo cuando la relación con la organización esté confirmada.
> - Conserva la formación y las certificaciones sin cambios de contenido.

### S5 — Responsive validation and delivery
> 5. RESPONSIVE Y VALIDACIÓN
>
> - Mantén legibles las fechas, descripciones y badges en móvil.
> - Permite alturas naturales y evita scroll horizontal.
> - Conserva las entradas suaves de la timeline, sin animar individualmente cada badge.
> - Comprueba con Playwright filtros, idiomas, temas, enlaces y diseño en escritorio y móvil.
> - Verifica que No Country aparezca una sola vez y contenga ambos proyectos.
> - Conserva navbar, footer y scrollspy compartidos.
>
> Entrega una vista previa y un resumen de los registros reorganizados. Implementa en el código actual sin publicar ni desplegar.

## Tasks
- T1 — S1-S2,S4; route: write RED coverage first, then model localized records, wire the single No Country outlet/renderer, and update confirmed No Country dates in the timeline and CV; status: done (5/5 focused tests); commit: none — shared dirty worktree; no commit requested.
- T2 — S1,S3,S5; route: refine responsive styles for nested project blocks and preserve the existing outer-record reveal without animating badges; status: done (desktop/mobile screenshots inspected; 320px overflow and outer-only reveals verified); commit: none — shared dirty worktree; no commit requested.
- T3 — S2-S5; route: run Playwright browser validation, capture the local preview/evidence, and report limitations; status: done (24/24 relevant tests, Playwright matrix, and local build verification); commit: none — shared dirty worktree; no commit requested.

## Log
- L1 — Original request verbatim:

Reorganiza la pestaña Experiencia de “Professional Milestones” en mi portafolio actual para agrupar las labores por organización o empleador.

Carga Impeccable para jerarquía y responsive, Taste para composición y Emil para conservar las animaciones existentes, si están disponibles.

1. ESTRUCTURA POR ORGANIZACIÓN

- Una tarjeta principal por organización.
- En su encabezado: organización, puesto, periodo general y modalidad cuando esté confirmada.
- Debajo: resumen breve de la experiencia.
- Dentro de la misma tarjeta: proyectos o responsabilidades diferenciados, con sus propias fechas, descripción, tecnologías y enlaces.
- No presentes los proyectos internos como empleos independientes.
- Conserva las demás experiencias y la pestaña Formación.

2. ACTUALIZAR NO COUNTRY

Los datos proporcionados aquí reemplazan las fechas anteriores de No Country. No debe seguir apareciendo como “Present / Actualidad”.

Organización: No Country.
Puesto: Desarrollador Backend.
Periodo: octubre de 2023 – enero de 2024.
Duración: 4 meses.

Resumen:
“Participé en equipos multiculturales desarrollando soluciones backend con Java y Spring Boot, colaborando en la resolución de retos técnicos y el cumplimiento de los plazos de entrega”.

Incluye estos proyectos dentro de la experiencia:

TRUCKING
Periodo: noviembre – diciembre de 2023.
Modalidad: remoto.

Descripción:
“Lideré el desarrollo backend de un sistema de gestión de flotas mediante una arquitectura REST en capas, aplicando patrones de diseño y buenas prácticas. También diseñé y desarrollé un chatbot de WhatsApp con Baileys, integrado con la API REST construida en Spring Boot”.

Tecnologías:
Java 17, Spring Boot, Spring Mail, Spring Security, Spring Data JPA, MapStruct, JWT, Springdoc OpenAPI, Docker, GitHub Actions, Maven, Git, Baileys y MySQL.

Despliegue:
Servidor físico IBM X3550 M4.

Vídeo:
https://www.youtube.com/watch?v=UziTMfvcI_I

CASHIER
Periodo: octubre – noviembre de 2023.

Descripción:
“Desarrollé funcionalidades backend para una billetera digital mediante una arquitectura REST en capas, aplicando patrones de diseño y buenas prácticas”.

Tecnologías:
Java 17, Spring Boot, Spring Mail, Spring Data JPA, MapStruct, Spring Security, JWT, Swagger, Docker, Firebase Cloud Storage, Maven, Git, ZXing y PostgreSQL.

Despliegue:
Servidor físico IBM X3550 M4.

Vídeo:
https://lnkd.in/eG2f7kgk

Conserva estos enlaces como recursos proporcionados; no inventes sus destinos finales.

3. PRESENTACIÓN

- Mantén un único nodo de la línea temporal para No Country.
- Presenta Trucking y Cashier como bloques internos con subtítulos y separadores finos.
- Diferencia claramente el periodo de la organización del periodo de cada proyecto.
- Usa badges compactos para tecnologías, sin duplicar una lista completa en el encabezado general.
- Reutiliza las miniaturas y páginas de detalle existentes si están disponibles.
- Añade “Ver proyecto / View project” y “Ver vídeo / Watch video” únicamente donde haya destinos reales.
- Elimina textos residuales de LinkedIn como “Vista en miniatura”, “y 4 aptitudes más” o “… más”.
- No añadas métricas ni resultados no proporcionados.

4. DATOS E IDIOMAS

- Adapta la estructura de datos para que cada experiencia admita una colección de proyectos.
- Centraliza el contenido y conserva el sistema español/inglés.
- Calcula los conteos de filtros por experiencias principales, sin contar cada proyecto interno como un empleo adicional.
- Revisa otras experiencias para aplicar la misma agrupación solo cuando la relación con la organización esté confirmada.
- Conserva la formación y las certificaciones sin cambios de contenido.

5. RESPONSIVE Y VALIDACIÓN

- Mantén legibles las fechas, descripciones y badges en móvil.
- Permite alturas naturales y evita scroll horizontal.
- Conserva las entradas suaves de la timeline, sin animar individualmente cada badge.
- Comprueba con Playwright filtros, idiomas, temas, enlaces y diseño en escritorio y móvil.
- Verifica que No Country aparezca una sola vez y contenga ambos proyectos.
- Conserva navbar, footer y scrollspy compartidos.

Entrega una vista previa y un resumen de los registros reorganizados. Implementa en el código actual sin publicar ni desplegar.

- L2 — Read-only evidence from the configured explorer: the main timeline is static HTML (`index.html:220–366`) with 3 experience and 7 education/certification records; bilingual page messages live in `assets/js/work-gallery.js:16,37`; counts use top-level `[data-about-record]` entries (`:74–79,545–558`); timeline reveals target the outer record (`index.html:221`, `assets/js/work-gallery.js:868–898`). Cashier is explicitly associated with No Country in the current description and its detail banner; Trucking is associated by the user's brief. Existing detail routes are `project-page-2.html` (Cashier) and `project-page-3.html` (Trucking). Hospital Regional de Ica is a confirmed employer; Zephyr Cygnus is a freelance record/project but no separate employer relationship is proven. `cv.html:175` repeats No Country as Present and is a stale duplicate to check for consistency.
- L3 — The worktree is already dirty on `feature/desing-hero`, with prior changes in `index.html`, `assets/js/work-gallery.js`, `assets/css/work-gallery.css`, templates, tests, and unrelated untracked assets/screenshots. Preserve them. Current known unrelated suite limitation: the particle opacity assertion expects 0.5 and observes 0.4; particle behavior is out of scope. Do not publish or deploy.
- L4 — Test-first RED observed before implementation: `node --test tests/work-gallery-experience-data.test.mjs` exited 1 with 5 tests, 0 passing, 5 failing. Failures are expected: experience data module, No Country outlet, and bilingual project labels do not exist yet. Added the focused test file; no application source changed in this step.
- L5 — Added `assets/js/experience-data.js` with localized employer fields, nested Trucking/Cashier facts, exact provided URLs, existing detail routes/thumbnails, and empty project collections for Zephyr and Hospital. The HTML outlet/CV date and post-change test results remain pending.
- L6 — Added `renderExperienceRecords()` and semantic project-section construction in `assets/js/work-gallery.js`; project blocks have no independent reveal hooks and are generated only inside their employer card. The single No Country outlet, English no-script fallback, data-module load order, and bilingual CV date are wired; responsive styles remain pending.
- L7 — T1 verification: `node --check` passed for `work-gallery.js` and `experience-data.js`; both CV translation JSON files parse; focused experience-data tests pass 5/5. The tests assert one No Country timeline record, 10 top-level records, 3 experience filter count, nested Trucking/Cashier facts, exact user-provided video URLs, existing detail routes, bilingual labels, and the updated CV period. T1 is complete; responsive visual styling is the next task.
- L8 — Added responsive styles for organization metadata, separated internal project sections, project thumbnails/details/actions, and compact wrapping technology tags. Mobile switches project layout to one column; scroll-reveal hooks remain only on outer timeline records. Playwright visual/reveal verification remains pending.
- L9 — The prior preview port `8765` had two existing Python servers and returned an empty response. Stopped only this session's duplicate server, left the pre-existing processes untouched, and started the workspace preview on `http://127.0.0.1:8766/` (background job `job-2`). Browser verification is pending.
- L10 — Desktop Playwright at 1280×720: one No Country timeline entry; counts remain 10 total / 3 experience / 7 education; exactly Trucking and Cashier projects; dates, role, summary, 14 technologies per project, existing thumbnails/routes, and exact supplied video URLs are present; no stale No Country `Present`, LinkedIn residue, horizontal overflow, or inner project reveal hooks. Both images loaded after scrolling; desktop project columns measured about 338px / 602px. Screenshot: `screenshots/experience-organizations-desktop.png`. Mobile, locale/theme/filter interactions, and broader browser verification remain pending.
- L11 — Playwright at 320×844: no horizontal overflow; project layout remains single-column with 148px project/image widths, no tag overflow, and 42px action targets. Filter clicks produced Education: 7 visible/No Country hidden; Experience: 3 visible/No Country visible; All: 10 visible. Setting the existing persisted locale to Spanish and reloading rendered `Mi trayectoria`, `Desarrollador Backend`, Spanish employer/project periods, summaries, action labels, and descriptions while preserving project URLs; restored and reloaded English afterward. The rendered index exposes no language-control buttons and the source labels the cord as inactive in this preview, so no theme toggle was attempted. Broader test suite and final diff review remain pending.
- L12 — Focused Node tests pass 11/11; `git diff --check` passes (only line-ending warnings). The shared-shell check initially reported stale `dist/`; verified `dist/` is ignored generated output, rebuilt only that directory (9 pages), and the follow-up check passes with 101 files current. Final diff review remains pending; no deployment or particle changes.
- L13 — Final verification: `node --test tests/work-gallery-content.test.mjs tests/work-gallery-experience-data.test.mjs tests/work-gallery-scroll-reveal.test.mjs` passes 24/24; `node --check` passes for both JS files; both translation JSON files parse; `git diff --check` passes; the generated-site check passes (101 files). Playwright verified 1280×720 and 390×844 screenshots (both inspected), 320×844 with no horizontal overflow, only outer-record reveal hooks, filter counts 7/3/10, Spanish persisted-locale rendering, exact links, and a project-page-3 shared-script smoke check; the browser was returned to the English homepage with Trucking and Cashier present. The current index exposes no language buttons and labels the theme cord inactive, so this pass did not click either control; a prior broad matrix had verified theme toggle/restore. JavaScript-disabled fallback proof remains unavailable because this Playwright context lacks the setter. The known full suite remains 69/70 from the out-of-scope particle test (expected opacity 0.5, actual 0.4); particle code was not changed. Native `gentle_review` assessment was medium/unassessable because untracked files were undeclared; with RDD off it returned self-verification only, so no native review lifecycle was started. Risk: none — the added renderer is guarded by the presence of the homepage timeline; the shared project-detail route smoke check passed. No commit, deployment, or destructive operation.
