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
- T1 (S1, S3, S5): Refine the selected artboard's static structure, compact navigation, responsive hero, real links/assets, and CV action. Route: inline. Commit: spec-prep commit pending (task document only, about 304 lines), then code slice A pending (294 insertions/104 deletions; selected artboard only).
- T2 (S2-S5): Add language switching, section active-state behavior, reduced-motion-aware transitions/entrance, and accessible cord drag, optional Web Audio, and activation event without theme changes. Route: inline. Commit: slice B pending (<400 changed lines; selected artboard plus task-evidence delta).
- T3 (S6): Run available structural, accessibility, syntax, and responsive checks; refresh the selected canvas; report browser/reference limitations and await the user's approval. Route: inline. Commit: none (verification/report only).

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