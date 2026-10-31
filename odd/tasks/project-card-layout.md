Feature: Project cards alignment and technology tags.
Branch: `feature/project-card-layout`; generated HTML source is `index.html` and stylesheet will stay limited to the project-card section.
Risk: none — scope is one project section with new section-specific selectors; verify after inspecting the diff.

## Specs

### S1 — Card alignment
> OBJETIVO 1: ALINEACIÓN
> - Consigue que las cards de cada fila tengan la misma altura.
> - Mantén una altura uniforme para sus imágenes, sin deformarlas.
> - Alinea el inicio de los títulos y las descripciones.
> - Coloca el bloque del autor al pie de cada card, alineado con los de las demás cards de la fila.
> - Usa CSS Grid para la distribución y Flexbox en columna dentro de las cards, o una solución equivalente compatible con el código.
> - Evita alturas fijas para los textos: deben mostrarse completos.
> - Conserva títulos, descripciones, imágenes, autores y enlaces. No resumas, recortes ni ocultes contenido.

### S2 — Technologies
> OBJETIVO 2: TECNOLOGÍAS
> En la zona del badge “LRPA” o “No Country”, incorpora una fila de etiquetas pequeñas con las tecnologías utilizadas por proyecto.
> - Conserva el badge de procedencia y coloca las tecnologías a continuación.
> - Obtén las tecnologías de los datos o referencias existentes en el proyecto. No inventes tecnologías a partir de la imagen.
> - Si falta información, señala qué proyectos necesitan confirmación.
> - Usa display:flex, flex-wrap:wrap y gap para distribuir las etiquetas.
> - Permite varias líneas cuando sea necesario, sin scroll horizontal.
> - Mantén cada etiqueta corta y legible, sin deformar la card.
> - Si las filas de etiquetas ocupan alturas distintas, ajusta su zona para que los títulos sigan alineados en cada fila de cards.

### S3 — Responsive and scope
> RESPONSIVE Y VALIDACIÓN
> - Conserva el estilo visual y reutiliza las clases existentes.
> - Limita los cambios a la sección de proyectos.
> - No añadas dependencias.
> - Comprueba que no haya desbordamientos en móvil, tablet y escritorio.
> - Si tienes navegador disponible, verifica la alineación visual y especifica qué pudiste comprobar.

## Tasks
- T1 — S1-S3 — route: inline — commit: pending — implement sourced tags, align the six project cards responsively, and verify the section.

## Log
- L1 (2026-10-31): Carga la skill de Impeccable disponible y corrige el layout de las cards de proyectos de mi portafolio HTML, CSS y JavaScript.

OBJETIVO 1: ALINEACIÓN
- Consigue que las cards de cada fila tengan la misma altura.
- Mantén una altura uniforme para sus imágenes, sin deformarlas.
- Alinea el inicio de los títulos y las descripciones.
- Coloca el bloque del autor al pie de cada card, alineado con los de las demás cards de la fila.
- Usa CSS Grid para la distribución y Flexbox en columna dentro de las cards, o una solución equivalente compatible con el código.
- Evita alturas fijas para los textos: deben mostrarse completos.
- Conserva títulos, descripciones, imágenes, autores y enlaces. No resumas, recortes ni ocultes contenido.

OBJETIVO 2: TECNOLOGÍAS
En la zona del badge “LRPA” o “No Country”, incorpora una fila de etiquetas pequeñas con las tecnologías utilizadas por proyecto.

- Conserva el badge de procedencia y coloca las tecnologías a continuación.
- Obtén las tecnologías de los datos o referencias existentes en el proyecto. No inventes tecnologías a partir de la imagen.
- Si falta información, señala qué proyectos necesitan confirmación.
- Usa display:flex, flex-wrap:wrap y gap para distribuir las etiquetas.
- Permite varias líneas cuando sea necesario, sin scroll horizontal.
- Mantén cada etiqueta corta y legible, sin deformar la card.
- Si las filas de etiquetas ocupan alturas distintas, ajusta su zona para que los títulos sigan alineados en cada fila de cards.

RESPONSIVE Y VALIDACIÓN
- Conserva el estilo visual y reutiliza las clases existentes.
- Limita los cambios a la sección de proyectos.
- No añadas dependencias.
- Comprueba que no haya desbordamientos en móvil, tablet y escritorio.
- Si tienes navegador disponible, verifica la alineación visual y especifica qué pudiste comprobar.