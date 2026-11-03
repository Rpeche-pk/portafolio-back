# Work Gallery reference-led hero refinement
Feature: Refine only the existing Work Gallery artboard for visual review; keep all changes preview-only.
Scope: `design/portfolio-redesign/03-work-gallery.html` plus this task record and its parent design-feature log; no production/deployment changes, no integration or publishing.
Dependencies: User provided screenshot and existing CV/photo; add no unverified claims or sample credentials.

## Specs
S1: “Actualizar únicamente el borrador existente “03-work-gallery” tomando como referencia visual la imagen adjunta, sin modificar ni publicar la página principal. Mantener la paleta acordada, Dot Grid, divisores, identidad Luis Peche, HTML/CSS/JavaScript vanilla y bibliotecas existentes. Cargar Taste, Impeccable y la skill de Emil; traducir las indicaciones Tailwind a CSS sin instalar Tailwind.”
S2: “Marco Bento vertical para la fotografía original, bien encuadrada y sin filtros ni deformación, con fondo translúcido, borde y sombra azul sutiles.”
S3: “Badges de disponibilidad solo si está confirmada y de microservicios; evitar credenciales o niveles no respaldados.”
S4: “Core Stack con Java, Spring Boot, Spring Cloud, REST, Data analysis y AI chatbots, respetando el idioma y con tags responsive.”
S5: “Tarjeta de experiencia bancaria bajo los botones, con “+2 años” editable en configuración y texto propuesto por el usuario, sin inventar responsabilidades.”
S6: “Credenciales renderizadas desde datos centralizados, extensibles y accesibles. Incluir solo credenciales confirmadas; estados de verificación solo con URL real. Datos de muestra, si se usan, deben identificarse claramente.”
S7: “Navbar con monograma LP en contenedor carbón, “LuisPeche_” y guion bajo azul con parpadeo discreto; estático con reduced motion.”
S8: “Diseño responsive en una columna móvil, altura flexible, destinos y cordón existentes conservados y sin superposiciones.”
S9: “Mostrar vista previa y verificar escritorio, tablet y móvil si hay navegador; indicar datos pendientes, dónde añadir credenciales y tamaños/interacciones verificados. Esperar aprobación antes de integrar en la página principal.”
S10: “ya lo veremos despues” (user deferred the unresolved About Me destination decision; do not invent/create a destination in this task).

## Tasks
- T1 (S2-S7): Implement evidence-backed portfolio hero, banking experience tile, responsive technology tags, credential data/rendering, portrait frame, and brand mark in the selected artboard. Route: inline. Status: done; structural assertions 12/12 and deterministic DOM checks 7/7 pass. Commit: none (preview-only; preserve approval gate).
- T2 (S3, S8-S9): Add only substantiated responsive status tags, then run available structural/accessibility/geometry/syntax/style checks and refresh the canvas; report unavailable browser proof. Route: inline. Status: done; see L5. Commit: none.
- T3 (S10): Preserve the existing Know Me destination pending the user's later About Me decision; report this item as deferred, not completed. Route: parent clarification already received. Status: blocked, waiting for the user to decide the About Me destination. Commit: none.

## Log
L1 (verbatim, user request):
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

L2: “ya lo veremos despues” was the user's response when asked whether the absent About Me destination should become a new draft section or point to `cv.html`; defer that routing decision and do not fabricate a destination.
L3: The supplied mock image visually contains example AWS certification badges and a banking experience card, but existing `cv.html` lists AWS introductory coursework, not AWS Certified Practitioner or AWS Certified AI Practitioner. Include only actual course records and their real credential URLs. The CV confirms Cashier digital-wallet backend work, not a named bank employer or “banking sector”; the banking-domain phrase/+2 years is directly supplied in the user's requested screenshot text and may be presented as their provided claim without adding responsibilities. Availability has no confirming source and must be omitted.
L4: Existing canvas handoff for `design/portfolio-redesign/03-work-gallery.html` is in progress. Parent tracking file: `odd/tasks/portfolio-redesign-preview.md`; update its task list/log as required by the Gentle Design handoff.
L5: Implemented only the selected preview artboard. Evidence: 12/12 structural assertions; 7/7 deterministic DOM assertions for bilingual credential rendering, accessible live external links, AWS course wording, hidden unconfirmed badges, and config-driven experience years; inline-script syntax passes; modeled width/cord geometry checks pass at 1440, 1200, 980, 820, 768, 760, 390, and 320px; contrast is 12.56:1 for credential links on their card surface and white text on the banking tile; Taste lint 0 FAIL/0 WARN; Impeccable source layout detection returns `[]`; `git diff --check` passes. Canvas refreshed at `http://127.0.0.1:63115/jCwJf2mBMJ4LVREBkmVlgwd0eT1nLO-r/d/portfolio-redesign/`. Browser rendering, actual viewport overflow/overlap, screenshots, real-device/touch, and reference-site inspection were unavailable. The local CV supports seven actual credential/course records and their URLs; it does not support AWS certification titles or a verified availability status, so those badges are omitted. The user-provided banking claim and “+2 years” are displayed, with the numeric value editable in `portfolioConfig`; CV does not independently confirm the banking-sector claim, so the user should confirm it before later integration. `gentle_review assess` was attempted once but native assessment is unassessable due to unrelated pre-existing untracked files; RDD is off, and its plan calls for writer self-verification with no independent verifier absent high-risk escalation. No production files changed; nothing committed or published.
