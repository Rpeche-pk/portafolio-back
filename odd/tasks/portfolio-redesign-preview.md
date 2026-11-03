# Portfolio redesign preview
Scope: Visual proposal only; leave production pages and deployment configuration untouched.
The feature follows the user's attached reference screenshot and remains separate until approval.

## Specs

S1: “FASE ACTUAL: PROPUESTA VISUAL, SIN MODIFICAR EL SITIO EXISTENTE.”

S2: “Analiza primero mi código local. Si tienes navegador disponible,
inspecciona la referencia. Usa la captura adjunta para identificar
la paleta y el tema que me gustan.”
“https://abdulrehmanwaseem.me/”

S3: “DIRECCIÓN
- Unifica el fondo del navbar y del resto de la página.
  Sustituye la franja azul actual en la propuesta.
- Toma como referencia sus tonos de fondo, texto y bordes.
- Incorpora un Dot Grid Background de puntos pequeños,
  regulares y de bajo contraste.
- Añade líneas divisoras finas y discretas entre secciones,
  alineadas con los límites del contenedor principal.
- Mantén una jerarquía tipográfica clara y espaciados equilibrados.
- Adapta estas ideas a mi identidad Luis Peche y a mi contenido,
  sin copiar logos, textos ni elementos de marca de la referencia.
- En esta propuesta, sustituye visualmente las partículas por
  el patrón de puntos para poder evaluar el resultado.”

S4: “VISTA PREVIA
Crea una página independiente en una carpeta preview-redesign,
sin alterar los archivos actuales ni la configuración de despliegue.

Incluye:
1. Navbar con mi nombre y enlaces actuales.
2. Hero con mi foto, presentación y botón “Know me”.
3. Inicio de Projects con tres cards existentes.
4. Fondo de puntos y líneas divisoras para evaluar el conjunto.

Reutiliza mis imágenes y contenido real.
Usa HTML y CSS, con JavaScript solo si es necesario.
El patrón de puntos debe ser estático y realizado con CSS.
Asegura adaptación a móvil, contraste legible y foco visible.”

S5: “ENTREGA
- Explica brevemente la dirección propuesta.
- Muestra la paleta con sus códigos HEX.
- Abre la vista previa local si tienes navegador y proporciona
  la dirección para verla.
- Si puedes, muestra capturas de escritorio y móvil.”

S6: “- No publiques ni integres el rediseño en la página principal.
  Espera a que elija y apruebe la propuesta.”

## Tasks

- T1 (S2-S3): Sync design-system tokens and board from local design sources. Route: inline. Commit: `100f70c` (190-line source-sync slice; only new `design/system.*` files).
- T2 (S3-S5): Apply a restrained source-token-based direction, create the independent preview, and provide three distinct self-contained canvas artboards (one primary and two alternatives) using existing content/assets. Route: inline. Commit: A `80a906b` (378 inserted lines; preview, primary board, feature doc); B `acf776e` (295 changed lines; manifest, two alternatives, tracking update). No production or deployment changes.
- T3 (S5-S6): Run available structural/style checks, report browser limits and proposal details. Route: inline. Commit: none (verification/report only).
- T4 (linked follow-up specs `odd/tasks/work-gallery-reference-refinement.md`, S1-S10): Refine the selected `03-work-gallery` artboard against the user's new screenshot with evidence-backed profile/credential content; preview only and preserve the About Me destination deferral. Route: inline. Status: done; verified as recorded in the linked follow-up task. Commit: none (approval-gated preview).

## Log

L1:
```text
Perdon este es el prompt Carga redesign-skill de Taste o la skill equivalente disponible.

Quiero explorar una nueva dirección visual para mi portafolio
HTML, CSS y JavaScript, tomando como referencia:
https://abdulrehmanwaseem.me/

FASE ACTUAL: PROPUESTA VISUAL, SIN MODIFICAR EL SITIO EXISTENTE.

Analiza primero mi código local. Si tienes navegador disponible,
inspecciona la referencia. Usa la captura adjunta para identificar
la paleta y el tema que me gustan.

DIRECCIÓN
- Unifica el fondo del navbar y del resto de la página.
  Sustituye la franja azul actual en la propuesta.
- Toma como referencia sus tonos de fondo, texto y bordes.
- Incorpora un Dot Grid Background de puntos pequeños,
  regulares y de bajo contraste.
- Añade líneas divisoras finas y discretas entre secciones,
  alineadas con los límites del contenedor principal.
- Mantén una jerarquía tipográfica clara y espaciados equilibrados.
- Adapta estas ideas a mi identidad Luis Peche y a mi contenido,
  sin copiar logos, textos ni elementos de marca de la referencia.
- En esta propuesta, sustituye visualmente las partículas por
  el patrón de puntos para poder evaluar el resultado.

VISTA PREVIA
Crea una página independiente en una carpeta preview-redesign,
sin alterar los archivos actuales ni la configuración de despliegue.

Incluye:
1. Navbar con mi nombre y enlaces actuales.
2. Hero con mi foto, presentación y botón “Know me”.
3. Inicio de Projects con tres cards existentes.
4. Fondo de puntos y líneas divisoras para evaluar el conjunto.

Reutiliza mis imágenes y contenido real.
Usa HTML y CSS, con JavaScript solo si es necesario.
El patrón de puntos debe ser estático y realizado con CSS.
Asegura adaptación a móvil, contraste legible y foco visible.

ENTREGA
- Explica brevemente la dirección propuesta.
- Muestra la paleta con sus códigos HEX.
- Abre la vista previa local si tienes navegador y proporciona
  la dirección para verla.
- Si puedes, muestra capturas de escritorio y móvil.
- No publiques ni integres el rediseño en la página principal.
  Espera a que elija y apruebe la propuesta.
```

L2: Design system synced from `assets/bootstrap/css/bootstrap.min.css`, `assets/css/bs-theme-overrides.css`, `assets/css/Lato.css`, `assets/css/project-cards.css`, and `assets/css/portfolio-content.css`; source-path/token/self-contained HTML check passed. T1 is held in commit `100f70c`.

L3: Taste direction sheet selected: “The quiet instrument” / “Frost and slate” (`preview-redesign/direction.json`). The generated “Navigation on the midline” and “Two doors on a dark wall” hero blueprints conflict with the requested unified neutral ground, profile photo, intro, and CTA; two hero redraws were recorded, with the sheet returning to the original blueprint. The implementation must prioritize the user's explicit hero/background requirements and use project-owned images; no production files are in scope.

L4: Gentle Design requires a `design.json` manifest for canvas discovery and three structurally distinct artboards for a new brief by default. Plan updated to add two alternatives alongside the primary artboard. Its source-sync rule also requires using only colors/components in `design/system.md`; therefore the generated Frost and slate palette is not applied literally. Artboards will use the source white, ink, blue, border, and subtle-primary tokens instead.

L5: Contrast check found `#0b80cc` on white at 4.22:1. Replaced hover text with source token `#006bc8` (5.33:1) and CTA hover background with `#002B50` (white-text contrast 14.37:1); all local links resolve and structural/token/image checks pass. Gentle Design canvas refreshed with all three artboards.

L6: Reformatted all proposal HTML for reviewability. Made the navbar transparent over the same white page ground so the static dot pattern continues behind it; dividers remain aligned to the shared content container. The actual T2 slice boundaries are A=254 lines and B=287 lines. Canvas refresh and final checks are pending after this style adjustment.

L7: Final post-format structural check passes for the root preview and all three artboards: manifest, required content, three cards, local images/routes, source-token colors, focus styles, mobile rules, reduced motion, and no remote assets/scripts. Contrast: `#006bc8`/white 5.33:1, `#002B50`/white 14.37:1, and `#002B50`/`#CCE1F4` 10.70:1. The first check script used an overly strict media-query whitespace matcher and failed; the corrected assertion passed. Browser rendering/screenshots remain unavailable.

L8: T2 slice A is committed as `80a906b`; slice B remains limited to 287 authored lines. The commit harness reports 1,166 cumulative changed lines in 7 commits since `origin/main`, including earlier unrelated branch work; this feature's commits remain individually bounded and local. The user prohibited publishing/integration, so no push or PR is part of this delivery.

L9: `gentle_review assess` for slice A (`baseRef: 100f70c`, committed-only) returned `risk: medium`, `nativeRisk: unassessable`, and zero changed paths because the workspace contains untracked files requiring an explicit declaration. RDD is off, so no review lifecycle action was taken. The returned plan relies on writer self-verification; structural, local-link, token, and contrast checks passed.

L10: Before slice B, the exact boundary is 287 inserted lines across the manifest and two alternatives, plus an 8-line tracking-document delta (295 changed lines total). This remains below 400 and excludes generated Taste metadata and all prior unrelated branch work.

L11: T2 is complete in commits `80a906b` and `acf776e`; both slices are under 400 lines and contain only proposal/design assets plus task tracking. The final preview remains local and approval-gated; no publish, push, or integration was performed.

L12: Final committed-range inspection shows proposal commits contain only preview/design files and this feature document; no production page or deployment file is part of those commits. The final static structure/contrast check passed before the commits and no HTML/CSS changed afterward. The native assessment was attempted once for slice A and remains unassessable because the workspace has untracked files; it was not retried. The working tree still contains `design/portfolio-redesign/01-dot-grid.html` (a pre-manifest draft), `preview-redesign/direction.json`, `preview-redesign/.taste-history.json`, and this task-log update; none is in the proposal commits. Browser rendering/screenshots are unavailable; the canvas is open at `http://127.0.0.1:56605/WHxmCdNs4A-znsQ1QsYI9KLL2OsP8wJU/d/portfolio-redesign/`.

L13: Follow-up user request (verbatim):
Actualizar únicamente el borrador existente “03-work-gallery” tomando como referencia visual la imagen adjunta, sin modificar ni publicar la página principal. Mantener la paleta acordada, Dot Grid, divisores, identidad Luis Peche, HTML/CSS/JavaScript vanilla y bibliotecas existentes. Cargar Taste, Impeccable y la skill de Emil; traducir las indicaciones Tailwind a CSS sin instalar Tailwind.

El diseño pedido incluye:
- Marco Bento vertical para la fotografía original, bien encuadrada y sin filtros ni deformación, con fondo translúcido, borde y sombra azul sutiles.
- Badges de disponibilidad solo si está confirmada y de microservicios; evitar credenciales o niveles no respaldados.
- Core Stack con Java, Spring Boot, Spring Cloud, REST, Data analysis y AI chatbots, respetando el idioma y con tags responsive.
- Tarjeta de experiencia bancaria bajo los botones, con “+2 años” editable en configuración y texto propuesto por el usuario, sin inventar responsabilidades.
- Credenciales renderizadas desde datos centralizados, extensibles y accesibles. Incluir solo credenciales confirmadas; estados de verificación solo con URL real. Datos de muestra, si se usan, deben identificarse claramente.
- Navbar con monograma LP en contenedor carbón, “LuisPeche_” y guion bajo azul con parpadeo discreto; estático con reduced motion.
- Diseño responsive en una columna móvil, altura flexible, destinos y cordón existentes conservados y sin superposiciones.
- Mostrar vista previa y verificar escritorio, tablet y móvil si hay navegador; indicar datos pendientes, dónde añadir credenciales y tamaños/interacciones verificados. Esperar aprobación antes de integrar en la página principal.

L14: Gentle Design handoff for `design/portfolio-redesign/03-work-gallery.html` is in progress. Implementation stays preview-only and awaits user approval before any production integration.

L15: Follow-up artboard refinement is complete and preview-only. Detailed request, user decision deferral, verification results, browser/tool limitations, and outstanding About Me decision are documented in `odd/tasks/work-gallery-reference-refinement.md`. The canvas was refreshed at `http://127.0.0.1:63115/jCwJf2mBMJ4LVREBkmVlgwd0eT1nLO-r/d/portfolio-redesign/`. The selected artboard remains unintegrated, uncommitted, and unpublished. `odd/tasks/work-gallery-reference-refinement.md` is the detailed follow-up spec and verification record.