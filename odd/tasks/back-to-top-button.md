# Back-to-Top Button
Authorized implementation for the existing portfolio; preserve the incumbent visual system and do not publish or deploy.
Scope: homepage plus six project-detail routes using the Work Gallery shell; leave `cv.html` and `contact.html` unchanged.

## Specs

### S1 — Behavior
> 1. COMPORTAMIENTO
>
> - Revisa primero si ya existe una función equivalente para evitar duplicados.
> - Oculta el botón mientras el hero/Home esté visible.
> - Muéstralo cuando el usuario haya pasado el hero, manteniéndolo disponible en las secciones intermedias y al final.
> - Utiliza IntersectionObserver para detectar ese cambio.
> - Al pulsarlo, desplaza la página al inicio real de Home con movimiento suave.
> - Conserva la sincronización del scrollspy: Home debe quedar activo al llegar.
> - No modifiques innecesariamente el historial ni el hash.
> - Con prefers-reduced-motion, realiza el desplazamiento de forma inmediata.

### S2 — Design and motion
> 2. DISEÑO
>
> - Usa un botón compacto de aproximadamente 44–48 px, con esquinas redondeadas coherentes con el proyecto.
> - Incorpora un SVG arrow-up centrado de unos 20–24 px.
> - Busca primero el recurso local existente. Si falta, crea un SVG inline sencillo con currentColor, sin instalar una biblioteca.
> - Utiliza el azul principal, contraste suficiente, borde fino y sombra discreta.
> - Adapta el diseño a los temas claro y oscuro.
>
> Movimiento:
> - Entrada y salida mediante opacity y desplazamiento vertical de unos 6 px, durante 150–200 ms.
> - Hover con elevación de 2 px.
> - Respuesta breve al presionar.
> - Sin rebotes ni animaciones continuas.
> - Elimina los desplazamientos y escalas con reduced motion.

### S3 — Responsive positioning
> 3. POSICIONAMIENTO RESPONSIVE
>
> - Colócalo fijo en la esquina inferior derecha con separación aproximada de 20–24 px.
> - En móvil, utiliza unos 16 px y respeta safe-area-inset-bottom y safe-area-inset-right.
> - Evita que cubra campos, botones, enlaces del footer u otros controles flotantes.
> - Reserva espacio inferior donde sea necesario para que el contenido siga siendo accesible.
> - Mantén una capa suficiente para interactuar sin quedar por encima de menús o diálogos.
> - No generes scroll horizontal.

### S4 — Accessibility
> 4. ACCESIBILIDAD
>
> - Usa button con type="button".
> - Nombre accesible:
>   ES: “Volver al inicio”.
>   EN: “Back to top”.
> - Marca el SVG como decorativo.
> - Añade foco visible y activación con Enter y Espacio.
> - Cuando esté oculto, no debe recibir foco ni interceptar clics.
> - Si se activa por teclado, lleva el foco al encabezado de Home sin provocar un segundo salto de scroll.
> - Evita ocultar un elemento que conserva el foco sin gestionarlo.

### S5 — Reuse
> 5. REUTILIZACIÓN
>
> - Integra el componente en la estructura compartida del portafolio para reutilizarlo en páginas largas.
> - En la página principal debe regresar a Home.
> - En páginas internas debe regresar al inicio de esa página; el logo y la navegación seguirán llevando al Home del portafolio.
> - Permite configurar el destino sin duplicar lógica.
> - Evita listeners e inicializaciones repetidas.

### S6 — Validation and delivery
> 6. VALIDACIÓN CON PLAYWRIGHT
>
> Comprueba:
> - Oculto en Home y visible al pasar el hero.
> - Funcionamiento desde Projects, Skills, About Me, Contact y footer.
> - Regreso al inicio y actualización del navbar.
> - Clic, teclado y gestión del foco.
> - Escritorio, tablet y móvil.
> - Ambos idiomas, temas y reduced motion.
> - Ausencia de superposición con el formulario, footer y menú móvil.
>
> Entrega una vista previa funcional y capturas del botón en una sección intermedia y al final. Indica qué verificaste realmente.
>
> Implementa el cambio en el código actual sin publicar ni desplegar el sitio.

## Tasks
- T1 — S1,S4,S5; route: add RED coverage for shared control markup, route-aware destination/visibility, keyboard focus, and hidden-state semantics; commit: pending.
- T2 — S1,S4,S5; route: integrate one configurable, localized back-to-top control into the Work Gallery shared shell for Home and six project-detail pages; commit: pending.
- T3 — S1-S4; route: implement observer-driven visibility, reduced-motion scrolling, focus transfer, scrollspy synchronization, responsive placement, and overlap safeguards; commit: pending.
- T4 — S2-S6; route: verify all seven routes in Playwright, capture intermediate/end screenshots, run focused and build checks, and report unavailable proof; commit: pending.

## Log
- L1 — Original request verbatim:

```text
Implementa un botón flotante “Volver al inicio / Back to top” en la versión actual de mi portafolio.

Carga Impeccable para posicionamiento responsive y accesibilidad y la skill de Emil disponible para movimiento. Reutiliza las tecnologías y dependencias existentes.

1. COMPORTAMIENTO

- Revisa primero si ya existe una función equivalente para evitar duplicados.
- Oculta el botón mientras el hero/Home esté visible.
- Muéstralo cuando el usuario haya pasado el hero, manteniéndolo disponible en las secciones intermedias y al final.
- Utiliza IntersectionObserver para detectar ese cambio.
- Al pulsarlo, desplaza la página al inicio real de Home con movimiento suave.
- Conserva la sincronización del scrollspy: Home debe quedar activo al llegar.
- No modifiques innecesariamente el historial ni el hash.
- Con prefers-reduced-motion, realiza el desplazamiento de forma inmediata.

2. DISEÑO

- Usa un botón compacto de aproximadamente 44–48 px, con esquinas redondeadas coherentes con el proyecto.
- Incorpora un SVG arrow-up centrado de unos 20–24 px.
- Busca primero el recurso local existente. Si falta, crea un SVG inline sencillo con currentColor, sin instalar una biblioteca.
- Utiliza el azul principal, contraste suficiente, borde fino y sombra discreta.
- Adapta el diseño a los temas claro y oscuro.

Movimiento:
- Entrada y salida mediante opacity y desplazamiento vertical de unos 6 px, durante 150–200 ms.
- Hover con elevación de 2 px.
- Respuesta breve al presionar.
- Sin rebotes ni animaciones continuas.
- Elimina los desplazamientos y escalas con reduced motion.

3. POSICIONAMIENTO RESPONSIVE

- Colócalo fijo en la esquina inferior derecha con separación aproximada de 20–24 px.
- En móvil, utiliza unos 16 px y respeta safe-area-inset-bottom y safe-area-inset-right.
- Evita que cubra campos, botones, enlaces del footer u otros controles flotantes.
- Reserva espacio inferior donde sea necesario para que el contenido siga siendo accesible.
- Mantén una capa suficiente para interactuar sin quedar por encima de menús o diálogos.
- No generes scroll horizontal.

4. ACCESIBILIDAD

- Usa button con type="button".
- Nombre accesible:
  ES: “Volver al inicio”.
  EN: “Back to top”.
- Marca el SVG como decorativo.
- Añade foco visible y activación con Enter y Espacio.
- Cuando esté oculto, no debe recibir foco ni interceptar clics.
- Si se activa por teclado, lleva el foco al encabezado de Home sin provocar un segundo salto de scroll.
- Evita ocultar un elemento que conserva el foco sin gestionarlo.

5. REUTILIZACIÓN

- Integra el componente en la estructura compartida del portafolio para reutilizarlo en páginas largas.
- En la página principal debe regresar a Home.
- En páginas internas debe regresar al inicio de esa página; el logo y la navegación seguirán llevando al Home del portafolio.
- Permite configurar el destino sin duplicar lógica.
- Evita listeners e inicializaciones repetidas.

6. VALIDACIÓN CON PLAYWRIGHT

Comprueba:
- Oculto en Home y visible al pasar el hero.
- Funcionamiento desde Projects, Skills, About Me, Contact y footer.
- Regreso al inicio y actualización del navbar.
- Clic, teclado y gestión del foco.
- Escritorio, tablet y móvil.
- Ambos idiomas, temas y reduced motion.
- Ausencia de superposición con el formulario, footer y menú móvil.

Entrega una vista previa funcional y capturas del botón en una sección intermedia y al final. Indica qué verificaste realmente.

Implementa el cambio en el código actual sin publicar ni desplegar el sitio.
```
- L2 — User selected the exact scope option “Home + seis páginas de proyecto”; its description was “Reutiliza el shell compartido; deja CV y Contacto sin cambios.”
- L3 — Read-only explorer found no floating back-to-top equivalent. Existing home/navbar/footer links are not a duplicate. Work Gallery shell/config covers `index.html` and six project details; `cv.html` and `contact.html` use separate templates and are out of scope by L2. Existing arrow asset `assets/icon/arrow-up-right.svg` points diagonally, so it is not the requested arrow-up. Main scrollspy and reveal behavior live in `assets/js/work-gallery.js`; shell source is `templates/work-gallery-navbar.html` and `templates/work-gallery-footer.html`.
- L4 — `impeccable context --target index.html` reports an incumbent visual implementation and no PRODUCT.md/DESIGN.md. This is an extension/refinement; preserve existing code/assets/tokens and continue without blocking on product-document creation.
- L5 — T1 completed RED-first: `tests/work-gallery-back-to-top.test.mjs` was added and `node --test tests/work-gallery-back-to-top.test.mjs` exited 1 with the four expected missing-component contract failures before implementation.
- L6 — T2 completed: the localized button and decorative SVG are in the shared footer replacement boundary, so rebuilds stay deterministic. The first placement outside the footer caused a rebuild-duplication failure; moving it inside corrected the issue. Shared-shell/project-route tests pass 7/7, and the T2 component/scope checks pass 2/2.
- L7 — T3 implementation complete: added observer-driven Home/internal-page visibility, configurable page-top scrolling, keyboard focus with `preventScroll`, focus-safe inert state, scrollspy synchronization, reduced-motion behavior, responsive 48px styling, safe-area offsets, footer space, and suppression for overlapping form/footer/menu controls. Added `viewport-fit=cover` to the six in-scope detail pages. Verified focused tests 17/17, JS syntax, deterministic 9-page build (101 files), and diff check. Playwright remains T4.
- L8 — T4 verification complete on local preview `http://127.0.0.1:8777/`: Home hides in hero and is available through Projects, Skills, About, Contact, and footer; click returns to top, activates Home scrollspy, and preserves hash/history. Enter/Space transfer focus to Home heading; an internal route keyboard return focuses its own h1. Reduced-motion is immediate. EN/ES names and light/dark colors verified/restored; mobile menu and form focus suppress the button; footer does not overlap links. All six detail routes show and return to their own top. Home viewports 1280x720, 768x1024, 390x844, and 320x800 had no horizontal overflow; 48px control and 24px/16px gaps confirmed. Browser console: 0 errors/warnings. Captures: `screenshots/back-to-top-intermediate-desktop.png` and `screenshots/back-to-top-end-desktop.png`, both visually inspected. Final focused tests pass 17/17; JS syntax, generated-site check (101 files), and `git diff --check` pass. No-JavaScript mode was not exercised because the available Playwright context lacks a JavaScript-disable control. Full repository suite was not rerun; its known unrelated particle-opacity mismatch remains 0.4 observed vs 0.5 expected. No deployment. Commit evidence remains pending.
