Feature: Refine only the selected Work Gallery artboard for local review.
Scope: `design/portfolio-redesign/03-work-gallery.html`; do not change production pages, deployment configuration, other artboards, or the manifest.
The cord dispatches an activation hook only; theme switching remains intentionally unimplemented.

## Specs
S1: “De las tres propuestas, elijo “03-work-gallery” como base.
Quiero refinar ese borrador manteniendo su elegancia, paleta,
tipografía y coherencia visual.

Trabaja exclusivamente sobre la vista previa existente.
Mantén la página principal y la configuración de despliegue
intactas.”

S2: “SKILLS Y TECNOLOGÍAS
Revisa las skills instaladas y carga las apropiadas:
- Taste para la dirección visual y composición.
- Impeccable para layout, responsive y accesibilidad.
- Emil Kowalski para definir y revisar el movimiento.
- La skill de GSAP si necesitas animaciones coordinadas.

Conserva HTML, CSS y JavaScript vanilla. Reutiliza las bibliotecas
existentes. Puedes incorporar bibliotecas JavaScript cuando aporten
una mejora concreta, justificando su uso y evitando dependencias
duplicadas. Usa CSS para las transiciones simples.”

S3: “1. NAVBAR MÁS COMPACTO

- Reduce su altura ajustando padding, logo y alineación.
  Como referencia, explora 56–64 px en escritorio, sin comprometer
  la legibilidad ni las áreas de interacción en móvil.
- Mantén el fondo uniforme con el resto de la página.
- Conserva el logo con las iniciales LP y el nombre “LuisPeche_”.
- Anima únicamente el guion bajo final con un parpadeo pausado,
  similar a un cursor de terminal. Respeta reduced motion.
- Organiza los enlaces en este orden:
  Home → Projects → Skills → About Me.
- Elimina Contact y el icono de correo del navbar.
- Incorpora iconos de GitHub y LinkedIn utilizando mis enlaces
  reales existentes. Si no están disponibles, solicita esos datos
  antes de asignar destinos; no inventes perfiles.
- Conserva las banderas de Perú y Estados Unidos y la funcionalidad
  de cambio de idioma. Añade nombres accesibles a los controles.

INDICADOR DE SECCIÓN ACTIVA
- Al seleccionar un enlace, muestra un subrayado fino con un color
  coherente con la paleta de “03-work-gallery”.
- Desplaza suavemente la página hacia la sección correspondiente,
  compensando la altura del navbar.
- Actualiza también el indicador al desplazarse manualmente.
- Diferencia el estado activo del hover y del foco de teclado.
- Respeta prefers-reduced-motion en el desplazamiento.”

S4: “2. CORDÓN INTERACTIVO EN EL LADO DERECHO

Referencia:
https://abdulrehmanwaseem.me/

Inspecciona, si tienes navegador, el cordón que se utiliza para
cambiar el tema: forma, posición, respuesta al arrastre, retorno
y sonido. No afirmes haberlo reproducido fielmente si no puedes
comprobar su comportamiento.

Implementa en el borrador:
- Un cordón discreto en el extremo derecho, integrado con el diseño.
- Interacción de arrastrar y soltar, con recorrido limitado,
  tensión visual y retorno elástico controlado.
- Un sonido breve al superar el umbral de activación, una sola vez
  por tirón. Debe reproducirse únicamente tras interacción.
- Usa un recurso con licencia adecuada o un sonido generado
  mediante Web Audio; evita extraer audio ajeno sin autorización.
- Añade una alternativa de activación por teclado y una etiqueta
  accesible. Mantén el elemento decorativo fuera del árbol accesible.
- Evita que interfiera con el scroll, los enlaces o el contenido,
  especialmente en pantallas pequeñas.

IMPORTANTE:
Por ahora NO implementes el cambio de tema ni modifiques colores
al tirar del cordón. Prepara únicamente un evento o función de
activación para conectar esa funcionalidad en una siguiente etapa.
El sonido debe ser opcional y su fallo no debe romper la interacción.”

S5: “3. REDISEÑO DEL HERO

Trabaja sobre:
section.portfolio-block.block-intro

Referencia de composición y movimiento:
https://ayooladev.vercel.app/#work

Inspecciona la referencia si es posible y adapta sus principios
a mi contenido y al estilo de “03-work-gallery”.

COMPOSICIÓN
- En escritorio, coloca la información a la izquierda y mi fotografía
  a la derecha, formando una composición equilibrada.
- En móvil, reorganiza el contenido en una columna.
- Da una jerarquía clara a:
  mi nombre, especialidad, presentación breve y stack tecnológico.
- Reutiliza mis datos y tecnologías reales. No inventes experiencia,
  métricas, logros ni competencias.
- Incorpora los botones “Know Me” y “Download CV”.
- “Know Me” debe llevar a About Me.
- “Download CV” debe utilizar el archivo real disponible.
  Si no existe, indícalo en la entrega y no simules una descarga.
- Conserva mi fotografía y añade detalles gráficos discretos
  relacionados con mi perfil, sin saturar la composición.

MOVIMIENTO
- Explora una entrada breve y escalonada para texto, botones y foto.
- Puedes usar un desenfoque ligero de entrada y parallax sutil
  en la fotografía o elementos decorativos.
- Mantén el texto nítido y estable durante la lectura.
- Limita el parallax a dispositivos donde resulte apropiado.
- Evita scroll hijacking, movimientos excesivos y animaciones
  que retrasen el acceso al contenido.
- Con reduced motion, muestra una versión estable y completa.

RESPONSIVE
- Ajusta el hero al espacio visible debajo del navbar mediante
  una altura mínima adaptable, permitiendo que crezca.
- Usa tamaños y espaciados fluidos, evitando recortes y grandes
  zonas vacías.
- Conserva el fondo Dot Grid y las líneas divisoras de la propuesta.
- Evita superposiciones y desbordamientos horizontales.”

S6: “4. VALIDACIÓN Y ENTREGA

Implementa estos cambios ÚNICAMENTE en el borrador “03-work-gallery”.

Comprueba, si tienes navegador:
- Escritorio, tablet y móvil.
- Navegación y subrayado activo.
- Cambio de idioma.
- Cordón con ratón, entrada táctil compatible y teclado.
- Sonido y comportamiento con reduced motion.
- Acceso a About Me y descarga real del CV.

Al terminar:
- Abre o proporciona la dirección local de la vista previa.
- Muestra capturas de escritorio y móvil si puedes generarlas.
- Resume los cambios, las bibliotecas utilizadas y los puntos
  pendientes de información.
- Indica expresamente qué interacciones pudiste verificar.

Muéstrame el borrador actualizado para revisarlo.
Espera mi aprobación antes de integrar los cambios en la página
principal o publicarlos.”

## Tasks
- T1 (S1, S3, S5): Refine the selected artboard's static structure, compact navigation, responsive hero, real links/assets, and CV action. Route: inline. Commits: spec-prep `285d90d` (task document only, 305 lines); code slice A `089e974` (398 changed lines, selected artboard only).
- T2 (S2-S5): Add language switching, section active-state behavior, reduced-motion-aware transitions/entrance, and accessible cord drag, optional Web Audio, and activation event without theme changes. Route: inline. Commit: slice B `5827aca` (373 changed lines; only selected artboard and task document).
- T3 (S6): Run available structural, accessibility, syntax, and responsive checks; refresh the selected canvas; report browser/reference limitations and await the user's approval. Route: inline. Commit: none for source; final tracking close is task-document-only.

## Log
L1 (verbatim, original user request):
De las tres propuestas, elijo “03-work-gallery” como base.
Quiero refinar ese borrador manteniendo su elegancia, paleta,
tipografía y coherencia visual.

Trabaja exclusivamente sobre la vista previa existente.
Mantén la página principal y la configuración de despliegue
intactas.

SKILLS Y TECNOLOGÍAS
Revisa las skills instaladas y carga las apropiadas:
- Taste para la dirección visual y composición.
- Impeccable para layout, responsive y accesibilidad.
- Emil Kowalski para definir y revisar el movimiento.
- La skill de GSAP si necesitas animaciones coordinadas.

Conserva HTML, CSS y JavaScript vanilla. Reutiliza las bibliotecas
existentes. Puedes incorporar bibliotecas JavaScript cuando aporten
una mejora concreta, justificando su uso y evitando dependencias
duplicadas. Usa CSS para las transiciones simples.

1. NAVBAR MÁS COMPACTO

- Reduce su altura ajustando padding, logo y alineación.
  Como referencia, explora 56–64 px en escritorio, sin comprometer
  la legibilidad ni las áreas de interacción en móvil.
- Mantén el fondo uniforme con el resto de la página.
- Conserva el logo con las iniciales LP y el nombre “LuisPeche_”.
- Anima únicamente el guion bajo final con un parpadeo pausado,
  similar a un cursor de terminal. Respeta reduced motion.
- Organiza los enlaces en este orden:
  Home → Projects → Skills → About Me.
- Elimina Contact y el icono de correo del navbar.
- Incorpora iconos de GitHub y LinkedIn utilizando mis enlaces
  reales existentes. Si no están disponibles, solicita esos datos
  antes de asignar destinos; no inventes perfiles.
- Conserva las banderas de Perú y Estados Unidos y la funcionalidad
  de cambio de idioma. Añade nombres accesibles a los controles.

INDICADOR DE SECCIÓN ACTIVA
- Al seleccionar un enlace, muestra un subrayado fino con un color
  coherente con la paleta de “03-work-gallery”.
- Desplaza suavemente la página hacia la sección correspondiente,
  compensando la altura del navbar.
- Actualiza también el indicador al desplazarse manualmente.
- Diferencia el estado activo del hover y del foco de teclado.
- Respeta prefers-reduced-motion en el desplazamiento.

2. CORDÓN INTERACTIVO EN EL LADO DERECHO

Referencia:
https://abdulrehmanwaseem.me/

Inspecciona, si tienes navegador, el cordón que se utiliza para
cambiar el tema: forma, posición, respuesta al arrastre, retorno
y sonido. No afirmes haberlo reproducido fielmente si no puedes
comprobar su comportamiento.

Implementa en el borrador:
- Un cordón discreto en el extremo derecho, integrado con el diseño.
- Interacción de arrastrar y soltar, con recorrido limitado,
  tensión visual y retorno elástico controlado.
- Un sonido breve al superar el umbral de activación, una sola vez
  por tirón. Debe reproducirse únicamente tras interacción.
- Usa un recurso con licencia adecuada o un sonido generado
  mediante Web Audio; evita extraer audio ajeno sin autorización.
- Añade una alternativa de activación por teclado y una etiqueta
  accesible. Mantén el elemento decorativo fuera del árbol accesible.
- Evita que interfiera con el scroll, los enlaces o el contenido,
  especialmente en pantallas pequeñas.

IMPORTANTE:
Por ahora NO implementes el cambio de tema ni modifiques colores
al tirar del cordón. Prepara únicamente un evento o función de
activación para conectar esa funcionalidad en una siguiente etapa.
El sonido debe ser opcional y su fallo no debe romper la interacción.

3. REDISEÑO DEL HERO

Trabaja sobre:
section.portfolio-block.block-intro

Referencia de composición y movimiento:
https://ayooladev.vercel.app/#work

Inspecciona la referencia si es posible y adapta sus principios
a mi contenido y al estilo de “03-work-gallery”.

COMPOSICIÓN
- En escritorio, coloca la información a la izquierda y mi fotografía
  a la derecha, formando una composición equilibrada.
- En móvil, reorganiza el contenido en una columna.
- Da una jerarquía clara a:
  mi nombre, especialidad, presentación breve y stack tecnológico.
- Reutiliza mis datos y tecnologías reales. No inventes experiencia,
  métricas, logros ni competencias.
- Incorpora los botones “Know Me” y “Download CV”.
- “Know Me” debe llevar a About Me.
- “Download CV” debe utilizar el archivo real disponible.
  Si no existe, indícalo en la entrega y no simules una descarga.
- Conserva mi fotografía y añade detalles gráficos discretos
  relacionados con mi perfil, sin saturar la composición.

MOVIMIENTO
- Explora una entrada breve y escalonada para texto, botones y foto.
- Puedes usar un desenfoque ligero de entrada y parallax sutil
  en la fotografía o elementos decorativos.
- Mantén el texto nítido y estable durante la lectura.
- Limita el parallax a dispositivos donde resulte apropiado.
- Evita scroll hijacking, movimientos excesivos y animaciones
  que retrasen el acceso al contenido.
- Con reduced motion, muestra una versión estable y completa.

RESPONSIVE
- Ajusta el hero al espacio visible debajo del navbar mediante
  una altura mínima adaptable, permitiendo que crezca.
- Usa tamaños y espaciados fluidos, evitando recortes y grandes
  zonas vacías.
- Conserva el fondo Dot Grid y las líneas divisoras de la propuesta.
- Evita superposiciones y desbordamientos horizontales.

4. VALIDACIÓN Y ENTREGA

Implementa estos cambios ÚNICAMENTE en el borrador “03-work-gallery”.

Comprueba, si tienes navegador:
- Escritorio, tablet y móvil.
- Navegación y subrayado activo.
- Cambio de idioma.
- Cordón con ratón, entrada táctil compatible y teclado.
- Sonido y comportamiento con reduced motion.
- Acceso a About Me y descarga real del CV.

Al terminar:
- Abre o proporciona la dirección local de la vista previa.
- Muestra capturas de escritorio y móvil si puedes generarlas.
- Resume los cambios, las bibliotecas utilizadas y los puntos
  pendientes de información.
- Indica expresamente qué interacciones pudiste verificar.

Muéstrame el borrador actualizado para revisarlo.
Espera mi aprobación antes de integrar los cambios en la página
principal o publicarlos.

L2: Local evidence: GitHub is `https://github.com/Rpeche-pk`; LinkedIn is `https://www.linkedin.com/in/luis-peche/`. `cv.html` exists and contains the portfolio's profile/experience/education, but no standalone PDF/DOC/DOCX exists; use only that real HTML document and report its format. Node 24.18 is available; no browser executable, Playwright, Puppeteer, jsdom, or happy-dom is available. Neither supplied reference was visually inspected, so do not claim fidelity. Existing `03-work-gallery.html` has the requested CSS Dot Grid and section dividers; Taste lint flags those plus thin card outlines, so retain only explicit user-requested pattern/dividers and remove avoidable outlined boxes.

L3: Delivery plan before next commit: the branch had 1,459 accumulated authored lines in 8 commits, including unrelated earlier work. Keep this feature limited to `design/portfolio-redesign/03-work-gallery.html` plus its ODD task document; make separate A/B work-unit slices each under 400 changed lines, stage only these paths, and do not publish/push or integrate.

L4: T1's baseline structural RED was 1/10; after the static rewrite and local-image inlining, all 11 structural assertions pass. Taste lint reports 5 FAIL/1 WARN: the two CSS radial gradients implement the explicitly requested Dot Grid; the section divider implements the explicitly requested line. The language separator, mobile-menu shadow, and button outline are not required and will be removed; same-line `taste-skill-ignore` comments will remain only on required dot-grid and section-divider rules. The static HTML currently adds 471 lines/ removes 81, so compact rule formatting to bring the code-only slice below 400. The 305-line tracking/spec document will be committed separately; slice A and slice B each remain below 400.

L5: After removing optional separators/shadow/outline and compacting CSS, Taste lint passes with 0 FAIL/0 WARN; the post-compaction structural check passes 11/11; `git diff --check` passes. The target diff is 294 insertions/104 deletions, and the task document was 302 lines before this log entry. No browser visual test is available.

L6: Commit `285d90d` records only the 305-line task/spec document. The commit hook reported 1,764 accumulated authored lines in 9 commits since `origin/main`, including unrelated work; before the next commit, the exact work-unit boundary is only `design/portfolio-redesign/03-work-gallery.html` (398 changed lines: 294 additions, 104 deletions). No other path will be staged.

L7: T1 is complete. Static structure assertions pass 11/11, Taste lint passes 0/0, and `git diff --check` passes. Commit `089e974` contains only `design/portfolio-redesign/03-work-gallery.html` with 294 additions/104 deletions. The earlier spec-prep commit `285d90d` contains only this feature document.

L8: Before the next code commit, the exact work-unit paths are `design/portfolio-redesign/03-work-gallery.html` and `odd/tasks/work-gallery-refinement.md`; the doc path carries only task/evidence updates. Keep their combined authored diff below 400 lines and stage no other path.

L9: T2 baseline RED is observed in an inline Node structural behavior check: 1/6 pass (the existing reduced-motion CSS); language application, scroll-active navigation, bounded pointer activation, keyboard activation, and guarded optional sound are all absent. No files changed during this baseline check.

L10: T2 GREEN evidence: inline JavaScript syntax and 9/9 behavior-structure checks pass; a deterministic DOM stub passes 11 assertions for locale/persistence/ARIA/alt updates, manual scroll-spy, threshold gating and once-per-pull event, return-to-rest, keyboard activation, reduced motion, muted/missing Web Audio, and Escape-menu focus. A separate Web Audio stub confirms one oscillator starts/stops per activation. Static accessibility checks pass 11/11, including all 55 localization keys in both dictionaries; Taste lint passes 0 FAIL/0 WARN; `git diff --check` passes. Current measured source delta is 299 insertions/54 deletions, task-file delta 11/3. Before the next commit, stage only the selected artboard and this task file; recalculate the combined diff and keep it below 400 lines. Browser visual checks remain unavailable.

L11: `gentle_review` assess could not inspect this working diff because other pre-existing untracked workspace files require a native intended-untracked declaration; it returned changedPaths 0 and nativeRisk unassessable. The RDD-off assessment plan requires writer self-verification and no independent verifier absent a named Task Size high-risk item. Do not stage unrelated untracked files.

L12: Final pre-commit recheck passes 9/9 static behavior/layout assertions, 11/11 static accessibility checks, inline script syntax, Taste lint 0/0, and `git diff --check`. The deterministic DOM and Web Audio stubs also passed (11 behavior assertions; audio success and missing-context fallback). Slice B is restricted to the selected artboard and this task document; measured diff before this log is 299/54 plus 15/3 = 371 changed lines, and this log leaves it below 400. No unrelated path is staged.

L13: T2 is complete. Commit `5827aca` changes only the selected artboard and this task document (316 additions/57 deletions, 373 changed lines). It contains bilingual UI and ARIA copy, scroll-spy, mobile menu handling, bounded pointer/keyboard cord activation, optional Web Audio, and the theme-neutral `work-gallery:cord-activated` event. T3 is verification/preview reporting only; before any final documentation commit, the exact boundary is only `odd/tasks/work-gallery-refinement.md`, with no source changes.

L14: T3 final evidence: the selected design canvas was refreshed at `http://127.0.0.1:56605/WHxmCdNs4A-znsQ1QsYI9KLL2OsP8wJU/d/portfolio-redesign/`. Final static checks pass 10/10, inline script syntax passes, Taste lint passes 0 FAIL/0 WARN, and `git diff --check` passes; L10 records 11 DOM-stub behavior assertions and Web Audio success/failure checks. There is no browser, so rendered responsive/contrast/overflow states, real touch/keyboard/audio behavior, screenshots, and both references remain visually unverified. The available CV is `cv.html` (HTML only; no PDF/DOC/DOCX). Refinement commits touched only the selected artboard and its task document, not production/deployment files or other artboards. The final commit boundary is task-document-only.