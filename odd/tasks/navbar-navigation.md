# Navbar navigation correction
Scope: Preview-only; edit only `design/portfolio-redesign/03-work-gallery.html`; do not integrate or publish before approval.
Specification authority: S1 and the user’s destination decision in L2.

## Specs
S1 (verbatim):
> Corrige la navegación del navbar en el borrador “03-work-gallery”.
> 
> PROBLEMA
> 
> Los enlaces Home, Projects, Skills y About Me deben llevar a sus respectivas secciones. El subrayado debe indicar la sección actual tanto al navegar mediante clic como al hacer scroll manual.
> 
> Revisa el código existente e identifica la causa antes de modificarlo. Conserva el diseño del navbar.
> 
> 1. NAVEGACIÓN A LAS SECCIONES
> 
> - Comprueba que cada enlace apunte al ID real y único de su sección.
> - Utiliza enlaces con href a las anclas correspondientes, conservando su funcionamiento nativo.
> - Al pulsar Projects, Skills, About Me o Home, desplaza la página a la sección correcta.
> - Compensa la altura del navbar fijo o sticky mediante scroll-margin-top o scroll-padding-top para que los encabezados no queden ocultos.
> - Respeta prefers-reduced-motion al aplicar scroll suave.
> - En móvil, cierra el menú al seleccionar un destino sin perder la navegación.
> 
> 2. SUBRAYADO DE LA SECCIÓN ACTIVA
> 
> Implementa o corrige el scrollspy:
> 
> - Mantén exactamente un enlace activo.
> - Al llegar a una sección mediante clic, su enlace debe quedar subrayado.
> - Al hacer scroll manual hacia abajo o arriba, actualiza el subrayado según la sección actual.
> - Conserva esa selección mientras el usuario permanezca en la sección.
> - No confundas el estilo hover o focus con el estado activo.
> - Usa una clase de estado y aria-current="location" para identificar el enlace activo.
> 
> Aplica un criterio estable: activa la sección cuyo inicio haya cruzado una línea de referencia situada debajo del navbar y mantenla activa hasta que la siguiente cruce esa línea.
> 
> - Evita depender únicamente del porcentaje visible: las secciones pueden tener alturas distintas.
> - Al inicio de la página, activa Home.
> - Al llegar al final del documento, permite activar la última sección aunque su encabezado no alcance la línea de referencia.
> - Durante el desplazamiento suave, evita parpadeos o cambios rápidos entre enlaces intermedios.
> - Si el usuario interrumpe el desplazamiento, sincroniza el estado con la posición real.
> - No utilices un temporizador fijo como única forma de detectar el final del scroll.
> 
> 3. CARGA, RESPONSIVE E IDIOMAS
> 
> - Calcula correctamente el estado al abrir directamente una URL con ancla, recargar o usar atrás y adelante.
> - Si actualizas el hash durante el scroll manual, evita añadir una entrada al historial por cada sección.
> - Recalcula las medidas necesarias al cambiar el tamaño de pantalla.
> - Mantén IDs estables entre español e inglés.
> - Si el subrayado es un elemento móvil compartido, ajusta su posición y ancho al enlace activo después de cambiar idioma, tamaño o cargar las fuentes.
> - Evita listeners duplicados y trabajo innecesario en cada evento de scroll.
> - Reutiliza la implementación existente cuando sea viable y no añadas una biblioteca para esta función.
> 
> 4. VALIDACIÓN CON PLAYWRIGHT
> 
> Comprueba realmente:
> 
> - Clic en cada enlace desde distintas posiciones de la página.
> - Llegada a la sección correcta con el encabezado visible.
> - Subrayado correcto después de terminar el desplazamiento.
> - Scroll manual completo hacia abajo y hacia arriba.
> - Inicio y final del documento.
> - Clics rápidos entre destinos e interrupción del scroll suave.
> - Apertura directa con ancla, recarga y navegación atrás/adelante.
> - Escritorio y móvil, español e inglés.
> - Navegación por teclado y reduced motion.
> 
> Entrega una explicación breve de la causa y la corrección, junto con las comprobaciones realizadas y capturas de Projects y Skills con su enlace activo.
> 
> Modifica únicamente lo necesario para corregir la navegación y el indicador. Trabaja solo sobre “03-work-gallery” y espera mi aprobación antes de integrarlo en la página principal o publicarlo.

## Tasks
- T1 — S1 — route: inline — commit: withheld (preview-only constraint) — Audit real section targets; add the selected #about section using existing hero summary; correct native anchor hrefs, mobile menu close, sticky offset, and reduced-motion behavior.
- T2 — S1 — route: inline — commit: withheld (preview-only constraint; implementation verified) — Replace the variable-threshold click/scroll state with a stable boundary scrollspy, active class plus aria-current, and correct initial/hash/history/end/resize/interruption behavior.
- T3 — S1 — route: inline — commit: pending — Verify all required navigation paths with Playwright across desktop/mobile, EN/ES, keyboard and reduced motion.
- T4 — S1 — route: inline — commit: withheld (preview-only) — Captured and inspected Projects/Skills screenshots, refreshed the design canvas, ran scoped tests and diff checks; complete.

## Log
L1 (verbatim): Corrige la navegación del navbar en el borrador “03-work-gallery”.

PROBLEMA

Los enlaces Home, Projects, Skills y About Me deben llevar a sus respectivas secciones. El subrayado debe indicar la sección actual tanto al navegar mediante clic como al hacer scroll manual.

Revisa el código existente e identifica la causa antes de modificarlo. Conserva el diseño del navbar.

1. NAVEGACIÓN A LAS SECCIONES

- Comprueba que cada enlace apunte al ID real y único de su sección.
- Utiliza enlaces con href a las anclas correspondientes, conservando su funcionamiento nativo.
- Al pulsar Projects, Skills, About Me o Home, desplaza la página a la sección correcta.
- Compensa la altura del navbar fijo o sticky mediante scroll-margin-top o scroll-padding-top para que los encabezados no queden ocultos.
- Respeta prefers-reduced-motion al aplicar scroll suave.
- En móvil, cierra el menú al seleccionar un destino sin perder la navegación.

2. SUBRAYADO DE LA SECCIÓN ACTIVA

Implementa o corrige el scrollspy:

- Mantén exactamente un enlace activo.
- Al llegar a una sección mediante clic, su enlace debe quedar subrayado.
- Al hacer scroll manual hacia abajo o arriba, actualiza el subrayado según la sección actual.
- Conserva esa selección mientras el usuario permanezca en la sección.
- No confundas el estilo hover o focus con el estado activo.
- Usa una clase de estado y aria-current="location" para identificar el enlace activo.

Aplica un criterio estable: activa la sección cuyo inicio haya cruzado una línea de referencia situada debajo del navbar y mantenla activa hasta que la siguiente cruce esa línea.

- Evita depender únicamente del porcentaje visible: las secciones pueden tener alturas distintas.
- Al inicio de la página, activa Home.
- Al llegar al final del documento, permite activar la última sección aunque su encabezado no alcance la línea de referencia.
- Durante el desplazamiento suave, evita parpadeos o cambios rápidos entre enlaces intermedios.
- Si el usuario interrumpe el desplazamiento, sincroniza el estado con la posición real.
- No utilices un temporizador fijo como única forma de detectar el final del scroll.

3. CARGA, RESPONSIVE E IDIOMAS

- Calcula correctamente el estado al abrir directamente una URL con ancla, recargar o usar atrás y adelante.
- Si actualizas el hash durante el scroll manual, evita añadir una entrada al historial por cada sección.
- Recalcula las medidas necesarias al cambiar el tamaño de pantalla.
- Mantén IDs estables entre español e inglés.
- Si el subrayado es un elemento móvil compartido, ajusta su posición y ancho al enlace activo después de cambiar idioma, tamaño o cargar las fuentes.
- Evita listeners duplicados y trabajo innecesario en cada evento de scroll.
- Reutiliza la implementación existente cuando sea viable y no añadas una biblioteca para esta función.

4. VALIDACIÓN CON PLAYWRIGHT

Comprueba realmente:

- Clic en cada enlace desde distintas posiciones de la página.
- Llegada a la sección correcta con el encabezado visible.
- Subrayado correcto después de terminar el desplazamiento.
- Scroll manual completo hacia abajo y hacia arriba.
- Inicio y final del documento.
- Clics rápidos entre destinos e interrupción del scroll suave.
- Apertura directa con ancla, recarga y navegación atrás/adelante.
- Escritorio y móvil, español e inglés.
- Navegación por teclado y reduced motion.

Entrega una explicación breve de la causa y la corrección, junto con las comprobaciones realizadas y capturas de Projects y Skills con su enlace activo.

Modifica únicamente lo necesario para corregir la navegación y el indicador. Trabaja solo sobre “03-work-gallery” y espera mi aprobación antes de integrarlo en la página principal o publicarlo.
L2: The user selected “Crear una sección #about”; the selected option specified using the existing hero summary and editing only 03-work-gallery. Add a distinct About Me section with that existing bilingual summary; do not invent new biography copy.
L3: Source evidence before edits: the artboard contains real targets #home, #skills (currently a div), and #projects, but no #about; both About Me links point to ../../cv.html, which has no #about target. The existing scrollspy only watches home/skills/projects, uses max(navbar height + 16px, 28vh) as its line, updates aria-current immediately on click, and updates both desktop/mobile duplicate links. CSS already has a 60px sticky header, 76px html scroll padding, smooth scroll with a reduced-motion override, plus scroll margins for hero/skills/projects. Current active styling depends on aria-current, not a state class.
L4: Playwright RED baseline before source edits: each destination has one unique existing ID except #about (0 targets); Skills points to #skills, which is a DIV rather than a section; both About Me variants point to ../../cv.html. No nav link has the requested .is-active class. The existing scrollspy leaves both duplicate Home anchors with aria-current="location" (one hidden), uses only the three existing targets, and has no explicit document-end rule. Existing html scroll padding and Skills scroll margin are both 76px, and reduced-motion already sets scroll behavior to auto. Navigation baseline page emitted only an unrelated missing favicon 404, no script error.
L5: After source edits, reusing the same preview URL produced stale pre-edit HTML; a fresh query URL loaded the current file. Playwright then verified all eight desktop/mobile nav anchors resolve to one unique target, the four targets are single IDs, #skills and #about are SECTION elements, and all targets use 76px scroll margin. Real desktop clicks from changing scroll positions reached Projects, Skills, About, and Home with each target visible below the sticky header and native hashes updated; About remained visible at document end. At 390×844, the mobile menu opened and its Projects link navigated to #projects, closed the menu, set aria-expanded=false, and left the target visible.
L6: T1 complete. Verified the real About section and native hrefs, semantic #skills section, unique targets, 76px sticky offsets, desktop destination clicks, and mobile menu close without losing #projects navigation. Under Playwright reduced-motion emulation, computed scroll-behavior is auto and clicking Projects reaches its target; resetting to no-preference restores smooth. The user's selected About destination uses existing bilingual hero summary only. T2 now starts: replace click-only/variable-line state with stable scrollspy behavior.
L7: A measured native anchor click showed #projects/#skills target tops at ~152px while the sticky header bottom is 60px. The stylesheet currently applies the same 76px offset both on html scroll-padding and each target's scroll-margin, so Chromium adds both. Keep the global 76px html scroll-padding and remove the redundant target scroll-margins; this yields one stable activation line at sticky-header bottom + 16px (76px), keeps native anchors aligned with the scrollspy, and avoids moving the visual layout. Apply the same global padding to all four destinations.
L8: Playwright RED for the active-boundary rule at 1280×800, reduced motion: placed the Skills start at y=120 with the required reference line at y=76. The old 28vh threshold (224px) incorrectly marked Skills active even though its start had not crossed the line; there was no .is-active class, and both duplicate Skills links retained aria-current (one hidden).
L9: GREEN-path Playwright after the first scrollspy implementation: native Projects/Skills anchor landings now align to y≈76.1–76.5, but a strict <=76px section-boundary comparison reverted active state to Skills/Home after scrollend due to subpixel rounding. About correctly activates at document end; Home correctly activates at top; active class and aria-current each have exactly one desktop link. Add a 1px comparison tolerance so native anchor landing and reference-line state agree without changing the line.
L10: Added 1px tolerance for subpixel anchor alignment. Playwright real anchor clicks now finish with Projects/Skills active at y≈76, one .is-active link and one aria-current in the DOM, and transition trails contain only the requested destination (no intermediate flicker). Manual boundary checks at 1280×800 pass: Skills top≈120→Home, Skills top≈76→Skills; Projects top≈120→Skills, Projects top≈76→Projects. Document end→About, top→Home. Manual scroll leaves hash and history.length unchanged.
L11: Playwright direct-hash/reload passed for #skills: initial load and Ctrl+R land at y≈345 with Skills active. A Back test after clicking #projects then #about returned the URL hash to #skills but restored scrollY=0, so the spy correctly selected Home by viewport position while the fragment target was not shown. Reconcile known hash targets on popstate/hashchange: if the current viewport is not at the target's native anchor offset, scroll to that target using behavior:auto (CSS still honors reduced motion), without changing the hash or adding history; keep the target active until scrollend. Ignore click-generated hashchange while a navigation target is already pending.
L12: Implemented popstate/hashchange reconciliation in the artboard: a known fragment target is aligned to the 76px activation line when viewport restoration differs; CSS scroll-behavior remains in control via behavior:auto, no hash/history entry is added, and click-generated hashchange is ignored while the native click's pending target is active. The first follow-up history run did not provide a clean verdict: browser Back landed on an older preview URL instead of the expected adjacent fragment entry, so verify with a fresh controlled history sequence before claiming pass.
L13: Controlled Playwright history sequence passed from fresh `?history-control=1#home`: clicking Projects then About created the native fragment sequence; Back returned to #projects with Projects active at y=810/top≈76.5, then #home with Home active at y=0; Forward returned to #projects then #about with matching active link and aria-current, without new history entries from the reconciliation. The earlier Alt+ArrowRight key did not advance in this browser, so `page.goForward()` was used for actual browser-forward verification. A separate interruption attempt timed out because its wait required scrollY to be below max-scroll while clicking About, which correctly lands at the document end; rerun using Projects/mid-page instead.
L14: Follow-up interruption checks are not a pass. One harness waited for a non-terminal position while navigating About (which correctly lands at max scroll) and timed out. A Projects attempt completed its native jump before sampling, so the later wheel only tested manual scroll consistency. With explicit Playwright `reducedMotion: no-preference`, computed scroll behavior was smooth and a sample during About motion was y=24; a subsequent wheel still ended at document max y=1451 with About active. Determine whether the actual wheel event is received/interruption handling is implemented, then verify interrupted scroll state before closing T2.
L15: Source inspection confirms the scrollspy already listens for wheel, touchstart, pointerdown, and scroll-navigation keys, clearing `pendingNavigationId` before resynchronizing. In Playwright with reduced motion explicitly `no-preference`, an About smooth scroll was sampled at y=508; a trusted wheel event (`deltaY=-220`) was received there, but the browser continued to max-scroll y=1451. The final active link matched About at the document end, but this does not verify interruption because the native smooth motion continued. Decide whether the requested behavior needs an explicit cancellation of the in-flight smooth scroll, then test a mid-page interruption.
L16: A temporary Playwright-only capture listener tested an explicit cancellation technique before source changes: during About smooth navigation, set the scrolling element's inline `scroll-behavior` to `auto`, call `window.scrollTo({top: currentScrollTop, behavior: 'auto'})`, then restore the prior inline value on the next animation frame. A trusted upward wheel arrived at y=507; after the native wheel default and settling, scroll remained y=507 (instead of continuing to About's max y=1451), active state matched Skills, and hash stayed #about. This proves a bounded cancellation approach for the implementation; apply it only when a navigation is pending and retest.
L17: Implemented wheel/touch/pointer/scroll-key cancellation in `interruptPendingNavigation`: while a destination is pending, temporarily set the scrolling element's inline `scroll-behavior` to `auto`, issue an immediate scroll to its current scrollTop with behavior `auto`, restore the previous inline value, clear pending state, then resync from the actual position. Playwright GREEN with no-preference: clicked About from Home, sampled in-flight y=350, delivered a trusted upward wheel at y=508; settled at y=508 rather than max y=1451, hash remained #about, Skills matched the reference-line calculation, and exactly one link carried `.is-active`/`aria-current`. History length changed only for the original anchor click (40→41).
L18: Playwright keyboard interruption and activation passed with reduced motion set to no-preference. During a pending About smooth scroll, trusted ArrowUp stopped motion; y changed from sampled y=349 to settled y=309, URL hash remained #about, history length stayed 43, and Home matched the reference-line calculation with one aria-current. In a separate fresh #home load, focusing Home then pressing Tab moved focus to Projects without changing Home's active/aria state; pressing Enter performed native #projects navigation, landing at y=810 with Projects top≈76.47 and Projects active/aria-current.
L19: Responsive Playwright verification passed at widths 320, 390, 768, 900, 1024, and 1280 in EN and ES: the active link matched the reference-line calculation for the actual layout, exactly one link had .is-active and exactly one had aria-current=location, the active link belonged to the visible desktop/mobile nav group, and no horizontal overflow occurred. At 390px, EN and ES mobile Skills clicks landed at top≈76, activated Skills, and closed the menu; Spanish About closed the menu and activated About at document end. At 1280px, ES Projects and EN Skills clicks activated their destinations. Language changes can reflow the page and move the current fragment section away from the reference line; active state correctly follows the viewport's actual section, and re-clicking the anchor realigns it. T2 implementation is complete; proceed to final Playwright sweep and requested screenshots.
L20: The corrected final-sweep harness got past its outer-context error, then stopped at a hard-coded 76px assertion for direct #skills load. Browser measurement at 1280×800: target top=64.06px, sticky header bottom=60px, scrollspy reference=76px, computed html scroll-padding=76px, target scroll-margin=0px, active Skills. The heading remained below the header, but landed ~12px above the reference line. Cause is not yet established; inspect initial-fragment/layout timing and adjust the test to assert the intended visible/stable offset rather than assume a fixed absolute value before deciding whether source changes are needed.
L21: Direct-fragment timing was instrumented across 60 animation frames. On #skills, the target initially measured y=433 while document.readyState was loading; as layout settled, its document-space position shifted by ~12px while the native CSS-smooth fragment scroll ran. The settled landing was target top≈66px with sticky-header bottom=60px, computed html scroll-padding=76px, and Skills active. The heading remains visible below the header; treat direct-load validation as visible/non-occluded plus correct active state rather than insisting on exact 76px after a load-time layout shift. Settled user clicks continue to align near the 76px reference line. No source change is warranted from this measurement.
L22: Final scoped Playwright sweep passed on the updated artboard. At 1280×800 EN, direct #skills and reload restored Skills with the heading visible below the 60px sticky header (direct landing measured y≈75 on this run; prior instrumented load showed transient layout shift but no occlusion). Desktop clicks to Projects, Skills, About, and Home finished with the matching hash, active class, and exactly one aria-current; Projects/Skills landed near the 76px reference line. Manual wheel scrolling selected Skills mid-page and About at document end, Home returned to top, and hash/history length stayed unchanged. Controlled Back/Forward through #home↔#projects↔#about restored both viewport and active/aria state. Reduced-motion computed behavior was auto and Skills navigation passed. At 390×844 ES, mobile About navigation closed the menu with aria-expanded=false, About active, one aria-current, and no overflow. The responsive EN/ES width matrix is recorded in L19.
L23: Captured and visually inspected `.playwright-mcp/navbar-projects-active-en-light.png` at 1280×800. Direct #projects load showed Projects active in desktop nav, exactly one `aria-current=location`, target top≈76.47 with sticky header bottom=60, English copy, light background, and no overflow; screenshot shows the Projects underline and section content.
L24: Captured and visually inspected `.playwright-mcp/navbar-skills-active-en-light.png` at 1280×800. Direct #skills load showed Skills active in desktop nav with exactly one aria-current=location, target top≈64.06px below the 60px sticky header, English copy, light background, and no overflow; screenshot shows the Skills underline and visible skills content. Both requested active-link screenshots are now captured.
L25: Refreshed the portfolio-redesign canvas at http://127.0.0.1:51260/JrWBkoO2gd7O0WRfEXP2zebUWx6gSSA2/d/portfolio-redesign/. Scoped Node tests passed 13/13 (`tests/shared-navbar.test.mjs`, `tests/project-cards.test.mjs`); `git diff --check -- design/portfolio-redesign/03-work-gallery.html odd/tasks/navbar-navigation.md` passed (only Git's LF→CRLF advisory). Status shows the authorized preview artboard modified plus the two requested screenshot files and this task record; no integration, commit, or publication was performed.
