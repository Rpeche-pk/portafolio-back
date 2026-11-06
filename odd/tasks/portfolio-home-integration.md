# Integrate approved Work Gallery into the portfolio home page
Feature: Replace the main portfolio page's presentation with the approved `03-work-gallery` design while preserving the original source as a reviewable reference until validation completes.
Scope: Static HTML portfolio and its pre-publish shared-shell generator; no publishing/deployment and no broad migration of other pages.
Risk: item 3 (existing shared navbar/footer and static shell contracts used by other pages).

## Specs
S1: “Integra el borrador aprobado “03-work-gallery” en la página principal del portafolio, conservando su diseño, contenido, interacciones y comportamiento responsive.”
S2: “Identifica los archivos del borrador y el punto de entrada real de la página principal. Revisa las instrucciones del repositorio y el estado de Git. Conserva los cambios ajenos a esta tarea. Compara ambas versiones para identificar contenido, funcionalidades o metadatos que deban mantenerse. Usa la versión actual aprobada del borrador como referencia visual y funcional; no recuperes diseños anteriores por error. No sobrescribas archivos completos sin revisar sus diferencias. Conserva el borrador como referencia hasta terminar la validación.”
S3: “Integra todos los elementos actuales del borrador: Hero, fotografía y cabecera de terminal. Experiencia y certificaciones con sus enlaces. Los seis proyectos, imágenes, descripciones, badges y acciones. Carrusel de tecnologías, filtros y controles. About Me con experiencia y formación. Contact Me, formulario y canales reales. Navbar y footer aprobados. Cordón de tema, sonido y comportamiento responsive. Fondo Dot Grid, paleta, tipografías, bordes y espaciado. Traducciones español/inglés y temas claro/oscuro. Animaciones y preferencias de movimiento reducido. No rediseñes, simplifiques ni elimines elementos durante la integración. Conserva las secciones retiradas como retiradas.” User correction (verbatim): “En la parte de Courses & certificates te has equivocado ahi van los certificados de aws cloud practitioner y ai practitioner que se encuentran en el maquetado o borrador C:\Users\RÓMULO\Documents\PROYECTOS-2026\WebPersonal\portafolio-back\design\portfolio-redesign\03-work-gallery.html respetalo por favor [Certifications
Amazon Web Services]”
S4: “Convierte el navbar y el footer aprobados en componentes o parciales reutilizables, siguiendo el mecanismo más sencillo compatible con el proyecto. Mantén una única fuente de verdad para estructura, estilos, enlaces y datos compartidos. No dupliques manualmente su HTML en cada página. Si ya existe un sistema de plantillas o componentes, reutilízalo. En un proyecto estático, favorece una solución que genere el HTML antes de publicarlo para que la navegación básica no dependa de una carga JavaScript tardía. No migres a React ni incorpores un framework solo para compartir estos elementos.”
S5: “En la página principal: Los enlaces a secciones deben usar sus anclas reales. Conserva scroll suave, compensación del navbar y scrollspy. Mantén un único enlace activo según la sección visible. En páginas internas: Los enlaces deben llevar a la página principal y su sección correspondiente. No uses anclas locales que apunten a secciones inexistentes. El logo debe regresar al inicio del portafolio. El indicador activo debe representar la página o sección pertinente, sin marcar Home por defecto en todas las páginas. Comprueba rutas desde la raíz y desde páginas en subcarpetas. Adapta las URL al método real de alojamiento; no presupongas que el sitio siempre se publicará en la raíz del dominio.”
S6: “Corrige las rutas de imágenes, SVG, audio, documentos y enlaces al cambiar de ubicación. Conserva nombres de archivos y respeta mayúsculas/minúsculas. Evita referencias a rutas temporales del borrador. No dupliques listeners, inicializaciones, instancias de audio ni bucles de animación. Mantén IDs únicos y estilos con alcance adecuado. Evita que los estilos compartidos alteren accidentalmente las cards o formularios. Conserva las preferencias de idioma y tema entre páginas. Evita destellos incorrectos de tema durante la carga. Mantén los metadatos existentes y actualiza canonical y otros destinos solo con datos reales. No inventes un PDF del CV ni enlaces pendientes. Conserva el comportamiento real del formulario y la preparación de Gmail.”
S7: “Comprueba: 360, 390, 768, 1024, 1280 y 1440 px, además de anchos intermedios. Orientación horizontal y zoom al 200 %. Márgenes compartidos entre navbar, secciones y footer. Menú móvil sin superposición ni pérdida de controles. Cards, badges, carrusel y formulario sin recortes. Footer adaptable sin textos o iconos amontonados. Cordón y anotación según sus distribuciones aprobadas, con ocultación completa en móvil. Ausencia de scroll horizontal en la página, conservando el desplazamiento interno del carrusel. Navegación por teclado, foco visible y contraste. prefers-reduced-motion. Contenido y enlaces básicos disponibles si falla JavaScript.”
S8: “Compara borrador y página principal en condiciones equivalentes: Mismo viewport. Mismo idioma. Mismo tema. Mismo estado de interacción. Verifica: Fidelidad visual de todas las secciones. Navbar, anclas, scrollspy y footer. Enlaces entre páginas. Cambio de idioma y tema. Cordón, arrastre, retorno y sonido. Seis proyectos y sus acciones. Carrusel, filtros, flechas, arrastre y pausas. Filtros de trayectoria. Validación del formulario, contador y apertura de Gmail. Carga de recursos sin errores 404. Ausencia de errores nuevos en consola. Prueba mediante el servidor local del proyecto. No envíes correos ni ejecutes acciones externas durante las pruebas.”
S9: “Incluye: Archivos modificados y resumen de la integración. Ubicación de los componentes compartidos del navbar y footer. Instrucciones breves para reutilizarlos en otra página. Capturas de la página principal en escritorio y móvil. Comprobaciones realizadas y limitaciones pendientes. No elimines el borrador ni publiques el sitio. Deja la versión integrada lista para revisión y solicita mi aprobación únicamente antes del despliegue.”

## Tasks
- T1 (S2-S3, S6): Integrate approved design/content/assets into `index.html`, preserving original-only facts, metadata, and compatibility. Route: inline. Status: certificate content and temporary-link handoff complete; AWS Certified Cloud Practitioner and AWS Certified AI Practitioner remain confirmed with the approved badges. `Cloud.validationUrl` stays `null`; the Cloud card temporarily resolves by credential ID to the AI Practitioner Credly destination and is labeled “View AI credential” / “Ver credencial de IA” rather than pending. The AI credential retains its own validation URL; the bilingual no-JavaScript fallback matches. Focused suite passes 12/12; build/check, syntax, and `git diff --check` pass. Full suite is 43/44 due to unrelated particle-opacity mismatch, recorded under T6. Commit: pending.
- T2 (S4-S5, S6): Reconcile navbar/footer through existing static templates and route configuration; document reuse without mass-editing other pages. Route: inline. Status: done; focused generator/template tests pass, README reuse steps documented. Commit: pending.
- T3 (S3, S6-S7): Verify localized theme, sound, cord, interactions, forms, scrollspy, and robust asset paths. Route: inline. Status: done; 11 focused tests pass, language/theme persistence and controls verified, form errors/counter tested without valid submission, 6 project cards/4 real demos, 23 skills, 10 timeline records, no-JS links, unique IDs, and 18 local image URLs returned 200. Commit: pending.
- T4 (S7-S8): Run static build and Playwright desktop/mobile functional, responsive, accessibility, and console/resource checks; capture screenshots. Route: inline. Status: page-specific checks and artifacts complete. The follow-up CTA/credential matrix passed 20 combinations (320/390/768/1024/1440px × EN/ES × light/dark), without horizontal overflow or link overlap; reduced-motion checks pass with transforms and transitions disabled. Browser console has zero errors; local static resources returned 200 and Pageclip 304; `node scripts/build-shared-shell.mjs --check` is current. Captured/reviewed `screenshots/hero-certification-polish-desktop-final.png`, `screenshots/hero-certification-polish-mobile-390.png`, and `screenshots/hero-certification-polish-mobile-320.png`. Full suite is 43/44; the unrelated particle-motion assertion expects 0.5 but observes 0.4 and remains untouched under the user's scope instruction; see T6. Commit: pending.
- T5 (S9): Document outcomes and limitations; retain draft and do not publish. Route: inline. Status: documentation and reuse instructions complete; no deployment or publication performed. Commit: pending.
- T6 (S8): Resolve the unrelated particle-motion opacity test discrepancy. Route: inline. Status: blocked pending explicit authorization to modify unrelated particle behavior. Commit: pending.
- T7 (S3, S6-S8): Refine hero actions and credential-link interaction states while preserving approved content/destinations; ensure responsive wrapping and reduced-motion behavior. Route: inline. Status: implemented with scoped selectors, link wrapping, and a specificity-safe reduced-motion override; exact RED observed before fix. Focused suite 12/12 and 20-case Playwright matrix pass; full suite remains 43/44 only from T6. No publication/deployment. Commit: pending.

## Log
L1 (verbatim, user request):
```text
Integra el borrador aprobado “03-work-gallery” en la página principal del portafolio, conservando su diseño, contenido, interacciones y comportamiento responsive.

Esta tarea autoriza la integración en el código principal. No publiques ni despliegues el sitio todavía.

SKILLS

Carga las skills instaladas que correspondan:
- Taste: fidelidad visual y coherencia.
- Impeccable: responsive, accesibilidad y revisión final.
- Emil: conservación de animaciones y microinteracciones.

Reutiliza la arquitectura, tecnologías y dependencias existentes.

1. REVISAR ANTES DE INTEGRAR

- Identifica los archivos del borrador y el punto de entrada real de la página principal.
- Revisa las instrucciones del repositorio y el estado de Git.
- Conserva los cambios ajenos a esta tarea.
- Compara ambas versiones para identificar contenido, funcionalidades o metadatos que deban mantenerse.
- Usa la versión actual aprobada del borrador como referencia visual y funcional; no recuperes diseños anteriores por error.
- No sobrescribas archivos completos sin revisar sus diferencias.
- Conserva el borrador como referencia hasta terminar la validación.

2. TRASLADAR EL DISEÑO APROBADO

Integra todos los elementos actuales del borrador:
- Hero, fotografía y cabecera de terminal.
- Experiencia y certificaciones con sus enlaces.
- Los seis proyectos, imágenes, descripciones, badges y acciones.
- Carrusel de tecnologías, filtros y controles.
- About Me con experiencia y formación.
- Contact Me, formulario y canales reales.
- Navbar y footer aprobados.
- Cordón de tema, sonido y comportamiento responsive.
- Fondo Dot Grid, paleta, tipografías, bordes y espaciado.
- Traducciones español/inglés y temas claro/oscuro.
- Animaciones y preferencias de movimiento reducido.

No rediseñes, simplifiques ni elimines elementos durante la integración. Conserva las secciones retiradas como retiradas.

3. NAVBAR Y FOOTER COMO PLANTILLA COMPARTIDA

Convierte el navbar y el footer aprobados en componentes o parciales reutilizables, siguiendo el mecanismo más sencillo compatible con el proyecto.

- Mantén una única fuente de verdad para estructura, estilos, enlaces y datos compartidos.
- No dupliques manualmente su HTML en cada página.
- Si ya existe un sistema de plantillas o componentes, reutilízalo.
- En un proyecto estático, favorece una solución que genere el HTML antes de publicarlo para que la navegación básica no dependa de una carga JavaScript tardía.
- No migres a React ni incorpores un framework solo para compartir estos elementos.

Conserva exactamente:
- Logo y enlace al inicio.
- Distribución y dimensiones aprobadas.
- Navegación y estados activos.
- Controles de idioma y tema.
- Menú móvil.
- Contenido del footer e iconos con sus destinos reales.

Permite configurar por página:
- Página o sección activa.
- Destinos de navegación.
- Etiquetas traducidas.
- Opciones realmente necesarias, sin crear una abstracción excesiva.

Deja documentado cómo utilizar esta plantilla en nuevas páginas. No modifiques masivamente otras páginas en esta tarea.

4. NAVEGACIÓN ENTRE PÁGINAS

Distingue estos dos escenarios:

En la página principal:
- Los enlaces a secciones deben usar sus anclas reales.
- Conserva scroll suave, compensación del navbar y scrollspy.
- Mantén un único enlace activo según la sección visible.

En páginas internas:
- Los enlaces deben llevar a la página principal y su sección correspondiente.
- No uses anclas locales que apunten a secciones inexistentes.
- El logo debe regresar al inicio del portafolio.
- El indicador activo debe representar la página o sección pertinente, sin marcar Home por defecto en todas las páginas.

Comprueba rutas desde la raíz y desde páginas en subcarpetas. Adapta las URL al método real de alojamiento; no presupongas que el sitio siempre se publicará en la raíz del dominio.

5. RECURSOS Y FUNCIONALIDAD

- Corrige las rutas de imágenes, SVG, audio, documentos y enlaces al cambiar de ubicación.
- Conserva nombres de archivos y respeta mayúsculas/minúsculas.
- Evita referencias a rutas temporales del borrador.
- No dupliques listeners, inicializaciones, instancias de audio ni bucles de animación.
- Mantén IDs únicos y estilos con alcance adecuado.
- Evita que los estilos compartidos alteren accidentalmente las cards o formularios.
- Conserva las preferencias de idioma y tema entre páginas.
- Evita destellos incorrectos de tema durante la carga.
- Mantén los metadatos existentes y actualiza canonical y otros destinos solo con datos reales.
- No inventes un PDF del CV ni enlaces pendientes.
- Conserva el comportamiento real del formulario y la preparación de Gmail.

6. RESPONSIVE Y ACCESIBILIDAD

No te limites a copiar los media queries: verifica el resultado después de integrar.

Comprueba:
- 360, 390, 768, 1024, 1280 y 1440 px, además de anchos intermedios.
- Orientación horizontal y zoom al 200 %.
- Márgenes compartidos entre navbar, secciones y footer.
- Menú móvil sin superposición ni pérdida de controles.
- Cards, badges, carrusel y formulario sin recortes.
- Footer adaptable sin textos o iconos amontonados.
- Cordón y anotación según sus distribuciones aprobadas, con ocultación completa en móvil.
- Ausencia de scroll horizontal en la página, conservando el desplazamiento interno del carrusel.
- Navegación por teclado, foco visible y contraste.
- prefers-reduced-motion.
- Contenido y enlaces básicos disponibles si falla JavaScript.

7. VALIDACIÓN CON PLAYWRIGHT

Compara borrador y página principal en condiciones equivalentes:
- Mismo viewport.
- Mismo idioma.
- Mismo tema.
- Mismo estado de interacción.

Verifica:
- Fidelidad visual de todas las secciones.
- Navbar, anclas, scrollspy y footer.
- Enlaces entre páginas.
- Cambio de idioma y tema.
- Cordón, arrastre, retorno y sonido.
- Seis proyectos y sus acciones.
- Carrusel, filtros, flechas, arrastre y pausas.
- Filtros de trayectoria.
- Validación del formulario, contador y apertura de Gmail.
- Carga de recursos sin errores 404.
- Ausencia de errores nuevos en consola.

Prueba mediante el servidor local del proyecto. No envíes correos ni ejecutes acciones externas durante las pruebas.

8. ENTREGA

Completa la integración y las correcciones necesarias antes de entregar.

Incluye:
- Archivos modificados y resumen de la integración.
- Ubicación de los componentes compartidos del navbar y footer.
- Instrucciones breves para reutilizarlos en otra página.
- Capturas de la página principal en escritorio y móvil.
- Comprobaciones realizadas y limitaciones pendientes.

No elimines el borrador ni publiques el sitio. Deja la versión integrada lista para revisión y solicita mi aprobación únicamente antes del despliegue. o lo que creas conveniente de repente me pase con algo en el prompt
```

L2: Implemented static integration using `index.html`, `assets/css/work-gallery.css`, `assets/js/work-gallery.js`, and the pre-existing build-time shell generator. Approved navbar/footer are separate templates selected through `templates/page-shell.json`; legacy internal page bodies remain untouched and their shared links target the new home section IDs. `node --check assets/js/work-gallery.js` and focused navbar/build tests pass (10/10). The embedded draft portrait was SHA-256-verified byte-identical to existing `assets/img/avatars/perfil.jpg` and replaced with that real path. Two card-demo URLs that only pointed back to their own project-detail pages were removed; real details and four distinct demo destinations remain. The draft still contains unsupported AWS certification claims, so the integrated credential cards use only the CV-backed AWS introductory course and Alura specialization with their actual URLs. README reuse instructions are updated. No publishing performed.

L3: Rechecked the generated home against the retained draft at matching 1280×900 English/light state. The integrated page preserves the approved section order/layout, portrait, six project images/cards, skills, timeline, contact and footer. Differences retained intentionally: CV-backed course credentials replace unsupported AWS certification claims; two self-referential Demo actions were removed, retaining six detail links and four distinct real demos. Browser console had no integrated-page errors. The reference source preview's only error was the browser's automatic `/favicon.ico` request (404); the built home has an actual favicon link. Captured desktop comparison screenshots; responsive/accessibility checks and final desktop/mobile deliverables remain pending.

L4: Final validation: static generator output is current (`node scripts/build-shared-shell.mjs --check`), JavaScript syntax checks and `git diff --check` pass, and focused tests pass. Full `node --test` is 40/41; the sole failure is the unrelated `tests/particle-motion.test.mjs` assertion (expected opacity 0.5, actual 0.4), which was not changed to preserve unrelated work. Playwright confirmed the generated home has zero current-page console errors, local assets return successful responses, requested responsive/accessibility/interaction checks passed, and desktop/mobile screenshots are present. README documents shared-shell reuse. No email was sent; no site deployment or publication was performed.

L5: User correction (verbatim): “En la parte de Courses & certificates te has equivocado ahi van los certificados de aws cloud practitioner y ai practitioner que se encuentran en el maquetado o borrador C:\Users\RÓMULO\Documents\PROYECTOS-2026\WebPersonal\portafolio-back\design\portfolio-redesign\03-work-gallery.html respetalo por favor [Certifications
Amazon Web Services]”

L6: Applied the correction from the approved draft: heading `Certifications`, issuer `Amazon Web Services`, AWS Certified Cloud Practitioner and AWS Certified AI Practitioner, both Foundational, with the matching badge assets. Cloud remains without a Credly link and displays the pending label; AI links to the draft's exact Credly URL. Updated EN/ES labels and the no-JavaScript card fallback, including the shared `.certification-list` grid class. Observed RED before source changes; focused suite passes 15/15. Rebuilt `dist/` and verified English/Spanish cards, badges, URL states, zero current-page console errors, and successful certificate asset requests in Playwright; `git diff --check` passes. Full suite is 42/43 due to the unrelated particle-opacity mismatch (0.4 vs expected 0.5); unchanged per the user's instruction to preserve unrelated changes. No publication or deployment.

L7: Follow-up hero/certification refinements supersede L6's temporary pending-label state: `Cloud.validationUrl` remains `null`, while `assets/js/work-gallery.js` resolves Cloud's temporary destination by the AI credential ID; the visible link is “View AI credential” / “Ver credencial de IA” and the no-JavaScript fallback matches. The AI credential's own URL is unchanged. Narrow link wrapping and reduced-motion transition specificity are covered by `tests/hero-responsive.test.mjs`; RED was observed before the fixes, focused suite passes 12/12, generated output is current, and `git diff --check` passes. Playwright passed 20 combinations across five widths, both languages, and both themes; reduced-motion checks passed. Captured/reviewed desktop and 390px/320px mobile screenshots; browser console has zero errors, local static resources returned 200, and Pageclip returned 304. `node --test tests/*.test.mjs` is 43/44 because the unrelated particle test expects opacity 0.5 but observes 0.4; no particle code changed. No publication or deployment.