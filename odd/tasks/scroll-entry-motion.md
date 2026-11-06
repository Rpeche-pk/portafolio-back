# Scroll Entrance Motion
Feature: Add purposeful scroll-entry reveals across the current portfolio homepage.
Risk: none (reveal targets exist only on the homepage; all six project-detail routes load the shared script with no reveal targets or root enhancement class and retain visible headings).

## Specs
S1. “Implementa animaciones de entrada al hacer scroll en mi portafolio actual, usando las cinco capturas adjuntas como referencia de su estructura.

Carga las skills instaladas de Emil para movimiento e Impeccable para responsive y accesibilidad. Reutiliza las dependencias existentes.

Analiza primero las animaciones actuales para evitar duplicarlas o sobrescribir interacciones.

CRITERIO GENERAL

- Usa entradas con opacity y translateY de 10–16 px.
- Duración de 350–500 ms.
- Curva suave de salida, como cubic-bezier(0.22, 1, 0.36, 1).
- Ejecuta cada entrada una sola vez por carga de página.
- Activa la entrada cuando el elemento atraviese aproximadamente el 88 % de la altura del viewport.
- Para elementos altos, observa su inicio o un disparador pequeño; no exijas que sea visible un porcentaje elevado de toda la sección.
- Mantén los elementos visibles después de su entrada, incluso al volver a subir.
- Evita retrasos acumulados superiores a unos 250 ms por grupo.”

S2. “HOME

- Conserva el nombre y contenido principal visibles desde el primer render; no retrases su lectura.
- Aplica una entrada breve al bloque introductorio.
- Después, muestra stack y botones como un grupo.
- Experiencia y certificaciones aparecen al entrar en pantalla, sin esperar una secuencia larga del hero.
- Anima la fotografía con su marco y badges como un único bloque.
- No animes cada tecnología, letra o insignia individualmente.
- Conserva independientes el navbar y el cordón.”

S3. “PROJECTS

- Entrada conjunta de etiqueta, título y texto secundario.
- Revela las cards por fila, con unos 70 ms de separación.
- La segunda fila debe activarse cuando llegue al viewport, no al entrar la sección completa.
- En móvil, revela cada card cuando corresponda, sin heredar retrasos de la cuadrícula de escritorio.
- Conserva el overlay de las imágenes y los estados de Details y Demo.
- Separa la animación de entrada del hover mediante contenedores distintos si ambos utilizan transform.”

S4. “SKILLS

- Muestra primero el encabezado.
- Después, filtros y controles.
- Finalmente, revela el contenedor del carrusel como una unidad.
- No apliques entradas verticales a cada tarjeta mientras se desplaza horizontalmente.
- Conserva autoplay, pausas, arrastre, navegación y filtros.
- Al filtrar, utiliza como máximo una transición breve de opacidad; evita reproducir toda la entrada de sección.”

S5. “ABOUT ME

- Entrada del encabezado y del control de filtros.
- Revela cada hito individualmente con un desplazamiento vertical de unos 10 px.
- Destaca su nodo mediante un cambio suave de borde o color al aparecer.
- Mantén estática la línea temporal para que siga siendo coherente al filtrar.
- Al cambiar de filtro, muestra inmediatamente los registros que queden en el viewport; no dejes tarjetas invisibles esperando otro scroll.
- Conserva los registros ya revelados al alternar filtros.”

S6. “CONTACT ME

- Entrada del encabezado.
- Después, formulario y columna derecha con unos 80 ms de diferencia.
- Si las cards derechas quedan fuera de pantalla, actívalas individualmente al entrar.
- En móvil, sigue el orden real: formulario, canales y especialidades.
- No animes campos, ayudas, contador ni badges individualmente.
- Si un campo recibe foco o muestra un error, asegúrate de que su contenedor sea visible inmediatamente.
- Conserva las microinteracciones actuales del botón y los enlaces.”

S7. “ESTABILIDAD Y ACCESIBILIDAD

- Mantén el fondo Dot Grid estático.
- No añadas parallax, scroll bloqueado, rebotes, zoom pronunciado ni desenfoques.
- No ocultes contenido mediante estilos base que puedan dejarlo inaccesible si falla JavaScript.
- Si falla la inicialización, muestra todos los elementos.
- Con prefers-reduced-motion, muestra el contenido directamente.
- En móvil, reduce el desplazamiento a unos 6–8 px.
- Si se navega por anclas o teclado, revela inmediatamente el destino y sus controles.
- No alteres el scrollspy, las dimensiones del layout ni el posicionamiento de elementos fijos.
- Evita observers, listeners o animaciones duplicadas.”

S8. “IMPLEMENTACIÓN

Si GSAP y ScrollTrigger ya están instalados, reutilízalos. Si no, usa IntersectionObserver y CSS para este alcance.

Centraliza duraciones, distancias y escalonado para mantener coherencia y facilitar ajustes.”

S9. “VALIDACIÓN CON PLAYWRIGHT

Comprueba:
- Carga inicial y apertura directa mediante anclas.
- Scroll lento, rápido y de regreso hacia arriba.
- Entrada independiente de ambas filas de Projects.
- Carrusel antes y después de filtrar.
- Timeline con todos sus filtros.
- Formulario mediante teclado y validación.
- Español e inglés, temas claro y oscuro.
- Escritorio y móvil.
- Reduced motion y contenido disponible sin JavaScript.
- Ausencia de saltos de layout, tarjetas invisibles y conflictos con hover.”

S10. “Entrega una vista previa funcional e indica qué verificaste realmente. Las capturas finales deben mostrar el contenido completamente visible.

Implementa sobre la versión actual sin publicar ni desplegar.”

## Tasks
- T1 — S1-S8 — route: inline — commit: none (source files also contain unrelated pre-existing changes; no paths staged) — done; Add immediate reveal behavior for keyboard focus, native invalid fields, anchor destinations, and filtered-in visible timeline records; ignore queued observer entries for hidden records.
- T2 — S9 — route: inline — commit: none (verification only) — blocked; all available Playwright flows pass, but the current context does not expose JavaScript-disabled execution, so the requested no-JS fallback proof is unavailable.
- T3 — S10 — route: inline — commit: none (verification/documentation only) — done; Build and serve the local preview, capture settled screenshots, inspect the available diff, run focused/full checks, and close without publishing or deploying.

## Log
L1 (verbatim):
Implementa animaciones de entrada al hacer scroll en mi portafolio actual, usando las cinco capturas adjuntas como referencia de su estructura.

Carga las skills instaladas de Emil para movimiento e Impeccable para responsive y accesibilidad. Reutiliza las dependencias existentes.

Analiza primero las animaciones actuales para evitar duplicarlas o sobrescribir interacciones.

CRITERIO GENERAL

- Usa entradas con opacity y translateY de 10–16 px.
- Duración de 350–500 ms.
- Curva suave de salida, como cubic-bezier(0.22, 1, 0.36, 1).
- Ejecuta cada entrada una sola vez por carga de página.
- Activa la entrada cuando el elemento atraviese aproximadamente el 88 % de la altura del viewport.
- Para elementos altos, observa su inicio o un disparador pequeño; no exijas que sea visible un porcentaje elevado de toda la sección.
- Mantén los elementos visibles después de su entrada, incluso al volver a subir.
- Evita retrasos acumulados superiores a unos 250 ms por grupo.

HOME

- Conserva el nombre y contenido principal visibles desde el primer render; no retrases su lectura.
- Aplica una entrada breve al bloque introductorio.
- Después, muestra stack y botones como un grupo.
- Experiencia y certificaciones aparecen al entrar en pantalla, sin esperar una secuencia larga del hero.
- Anima la fotografía con su marco y badges como un único bloque.
- No animes cada tecnología, letra o insignia individualmente.
- Conserva independientes el navbar y el cordón.

PROJECTS

- Entrada conjunta de etiqueta, título y texto secundario.
- Revela las cards por fila, con unos 70 ms de separación.
- La segunda fila debe activarse cuando llegue al viewport, no al entrar la sección completa.
- En móvil, revela cada card cuando corresponda, sin heredar retrasos de la cuadrícula de escritorio.
- Conserva el overlay de las imágenes y los estados de Details y Demo.
- Separa la animación de entrada del hover mediante contenedores distintos si ambos utilizan transform.

SKILLS

- Muestra primero el encabezado.
- Después, filtros y controles.
- Finalmente, revela el contenedor del carrusel como una unidad.
- No apliques entradas verticales a cada tarjeta mientras se desplaza horizontalmente.
- Conserva autoplay, pausas, arrastre, navegación y filtros.
- Al filtrar, utiliza como máximo una transición breve de opacidad; evita reproducir toda la entrada de sección.

ABOUT ME

- Entrada del encabezado y del control de filtros.
- Revela cada hito individualmente con un desplazamiento vertical de unos 10 px.
- Destaca su nodo mediante un cambio suave de borde o color al aparecer.
- Mantén estática la línea temporal para que siga siendo coherente al filtrar.
- Al cambiar de filtro, muestra inmediatamente los registros que queden en el viewport; no dejes tarjetas invisibles esperando otro scroll.
- Conserva los registros ya revelados al alternar filtros.

CONTACT ME

- Entrada del encabezado.
- Después, formulario y columna derecha con unos 80 ms de diferencia.
- Si las cards derechas quedan fuera de pantalla, actívalas individualmente al entrar.
- En móvil, sigue el orden real: formulario, canales y especialidades.
- No animes campos, ayudas, contador ni badges individualmente.
- Si un campo recibe foco o muestra un error, asegúrate de que su contenedor sea visible inmediatamente.
- Conserva las microinteracciones actuales del botón y los enlaces.

ESTABILIDAD Y ACCESIBILIDAD

- Mantén el fondo Dot Grid estático.
- No añadas parallax, scroll bloqueado, rebotes, zoom pronunciado ni desenfoques.
- No ocultes contenido mediante estilos base que puedan dejarlo inaccesible si falla JavaScript.
- Si falla la inicialización, muestra todos los elementos.
- Con prefers-reduced-motion, muestra el contenido directamente.
- En móvil, reduce el desplazamiento a unos 6–8 px.
- Si se navega por anclas o teclado, revela inmediatamente el destino y sus controles.
- No alteres el scrollspy, las dimensiones del layout ni el posicionamiento de elementos fijos.
- Evita observers, listeners o animaciones duplicadas.

IMPLEMENTACIÓN

Si GSAP y ScrollTrigger ya están instalados, reutilízalos. Si no, usa IntersectionObserver y CSS para este alcance.

Centraliza duraciones, distancias y escalonado para mantener coherencia y facilitar ajustes.

VALIDACIÓN CON PLAYWRIGHT

Comprueba:
- Carga inicial y apertura directa mediante anclas.
- Scroll lento, rápido y de regreso hacia arriba.
- Entrada independiente de ambas filas de Projects.
- Carrusel antes y después de filtrar.
- Timeline con todos sus filtros.
- Formulario mediante teclado y validación.
- Español e inglés, temas claro y oscuro.
- Escritorio y móvil.
- Reduced motion y contenido disponible sin JavaScript.
- Ausencia de saltos de layout, tarjetas invisibles y conflictos con hover.

Entrega una vista previa funcional e indica qué verificaste realmente. Las capturas finales deben mostrar el contenido completamente visible.

Implementa sobre la versión actual sin publicar ni desplegar.

L2: Source exploration found existing hero load animations in `assets/css/work-gallery.css` (the hero-copy child stagger, photo frame, badges, microservices card, and role pulse), an existing portrait view-timeline parallax, a generic `[data-reveal]` observer with a 92% viewport trigger and global 80 ms index delays in `assets/js/work-gallery.js`, and a second about-record IntersectionObserver with an 8% threshold. The contact section is currently revealed as one tall section; certifications are currently revealed card by card. Projects are rendered dynamically in `renderProjects`; their image overlay and Details/Demo states are separate hover/focus behavior. Skills filtering/drag/autoplay and the shared scrollspy are separate. `assets/js/aos.min.js` is present but the homepage does not load or initialize AOS; no GSAP/ScrollTrigger dependency or source reference was found. Use the existing native IntersectionObserver and scope targets to homepage sections.
L3: The source task sits on `feature/desing-hero` with pre-existing unrelated modifications in the homepage, carousel, shell, and tests. Preserve them; do not reset or overwrite. The orchestrator session-subject tool returned “session messaging is not ready” twice, so no explorer subagent was launched; the required animation/source map was completed inline. Impeccable context confirms a narrow refinement of the incumbent implementation is permitted; no PRODUCT.md or DESIGN.md exists.
L4: Motion thesis: one-time viewport entry is spatial continuity and directs attention through the portfolio's existing section hierarchy. Use transform-equivalent `translate` plus opacity; centralize the 420 ms duration, 12 px desktop/7 px mobile distance, 70 ms project-card step, and 80 ms contact offset. Reuse the current `--ease-out` token; observe at threshold 0 with a -12% bottom root margin. Preserve the static Dot Grid, fixed navbar/cord, existing portrait parallax (add no parallax), scrollspy, project overlays, carousel, filters, and form behavior. Hide targets only after the native observer is fully initialized; if reduced motion, unsupported APIs, or initialization errors occur, keep/show all content.
L5: At the planning checkpoint, no source code or UI had yet been modified; the feature file, Engram mirror, and visible todo projection were reconciled before the first implementation write.
L6: T1 completed test-first: the new structural suite first failed against the incumbent implementation, then passed after the grouped reveal targets and shared observer were added. Removed the previous broad hero child stagger, card-level certification reveal, separate timeline observer, and global index-based delay. Preserved the portrait's existing view-timeline behavior and kept carousel slides out of vertical reveal targets.
L7: After the first full focused run (36/36), syntax check, generated-site build (nine pages), and diff check passed. A live Playwright smoke exposed a temporal-dead-zone error because About filtering called the frame scheduler before its const initialization; changed the scheduler to a hoisted function, reloaded the preview, and verified the reveal root class, initial visibility, and no new console errors.
L8: Desktop Playwright verified: initial hero visibility; first and second project rows reveal independently; entries persist while scrolling back without changing document height (7068 px); project hover overlay; five AI skills remain horizontally filtered with no per-slide reveal; direct About/Contact anchors; timeline filters show 3/7/10 records and immediately reveal records in view; Spanish language state; persisted light/dark surfaces; and zero browser/page errors. The focus-before-submit check failed: the Contact form was marked revealed but still computed mid-fade immediately after focusing its name field (the observed test reported `focusVisible: false`). This violates S6/S7. Reopened T1 to make keyboard focus, native invalid, anchor destinations, and in-viewport records revealed without transition; paused T2 until that fix is verified.
L9: T1 closed after adding `data-scroll-reveal-immediate` styling and immediate reveal handling for focus, invalid fields, anchors, and in-viewport filtered-in records. Filtering now unobserves hidden timeline targets and ignores queued IntersectionObserver entries for targets whose `hidden` state is true. Focused content/reveal tests pass 19/19, JavaScript syntax passes, the 9-page build is current (100 files), and `git diff --check` passes. Playwright verifies focus, Tab, native invalid submit, and direct Contact anchors at opacity 1 with 0s transition; DOM-triggered timeline filter checks confirm hidden records are not newly revealed and visible returned records have opacity 1/0s transition; no browser errors were reported. T2 resumed for the remaining responsive, reduced-motion, no-JavaScript, and screenshot matrix.
L10: T2 evidence: Playwright verified slow and fast scroll plus reverse direction; project rows activate independently and revealed state persists without document-height change. All seven Skills filters return 20/1/5/4/3/2/5 cards; About filters return 10/3/7 records; locale changes to English and restores Spanish; the mobile-menu theme control toggles and restores; direct About/Contact anchors, keyboard focus/Tab, invalid form submission, and reduced-motion all remain visible. Responsive widths 320, 390, 768, 1024, and 1440 have no horizontal overflow. All six project-detail routes load the shared script without reveal targets/root enhancement and retain visible headings. No browser errors. Settled full-page screenshots were captured and visually inspected at `screenshots/scroll-entry-motion-desktop.png` and `screenshots/scroll-entry-motion-mobile.png`. JavaScript-disabled fallback proof is unavailable: `page.context().setJavaScriptEnabled` is not exposed by the current Playwright tool context. This proof remains blocked; do not represent it as verified.
L11: T3 test record: focused content/reveal suite passes 19/19; full `node --test tests/*.test.mjs` is 69/70, with the sole failure in the pre-existing `tests/particle-motion.test.mjs` opacity assertion (actual 0.4, expected 0.5). Particle behavior is outside this feature and was not changed. The shared-shell generator check previously passed with 100 files current; final `git diff --check` and JS syntax pass. `gentle_review` assess returned nativeRisk unassessable because unrelated untracked workspace paths lack a native intended-untracked declaration; RDD is off and the returned plan requires writer self-verification, not an independent verifier. Preview remains local at `http://127.0.0.1:8765/`; no deployment or publication.
L12: T3 closed. Final validation: focused content/reveal tests 19/19; JS syntax check passed; shared-shell output is current at 100 files; `git diff --check` passed; full suite is 69/70 with only the unrelated particle-opacity assertion (0.4 actual vs 0.5 expected). Risk is none for the modified reveal behavior: all reveal targets are homepage-only, and Playwright loaded each of the six project-detail routes with no reveal root/targets and visible H1, with no browser errors. Full-page settled screenshots were captured and inspected for desktop and mobile. No commit was made because the same source files contain unrelated pre-existing uncommitted changes, and staging the whole files would bundle those changes. The feature remains blocked only on unavailable JavaScript-disabled fallback proof; no publish or deployment.