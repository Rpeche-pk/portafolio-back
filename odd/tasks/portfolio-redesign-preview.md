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
- T2 (S3-S5): Apply a restrained source-token-based direction, create the independent preview, and provide three distinct self-contained canvas artboards (one primary and two alternatives) using existing content/assets. Route: inline. Commit: pending in two local slices, each under ~400 authored lines: A `preview-redesign/index.html` + `design/portfolio-redesign/01-quiet-ledger.html` + this feature document (378 inserted lines); B `design/portfolio-redesign/design.json` + `02-portrait-editorial.html` + `03-work-gallery.html` (287 lines). No production or deployment changes.
- T3 (S5-S6): Run available structural/style checks, report browser limits and proposal details. Route: inline. Commit: pending.

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