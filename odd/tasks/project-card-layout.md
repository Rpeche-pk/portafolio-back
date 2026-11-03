Feature: Project cards alignment and technology tags.
Branch: `feature/project-card-layout`; generated HTML source is `index.html`; implementation slices: `f5091f2` (504 changed lines) and `3acb7a1` (201 changed lines, final refinement).
Risk: none — scope is one project section with new section-specific selectors; verify after inspecting the diff.

## Specs

### S1 — Card alignment and spacing
> OBJETIVO 1: ALINEACIÓN
> - Consigue que las cards de cada fila tengan la misma altura.
> - Mantén una altura uniforme para sus imágenes, sin deformarlas.
> - Alinea el inicio de los títulos y las descripciones.
> - Coloca el bloque del autor al pie de cada card, alineado con los de las demás cards de la fila.
> - Usa CSS Grid para la distribución y Flexbox en columna dentro de las cards, o una solución equivalente compatible con el código.
> - Evita alturas fijas para los textos: deben mostrarse completos.
> - Conserva títulos, descripciones, imágenes, autores y enlaces. No resumas, recortes ni ocultes contenido.
>
> 2. REDUCIR ESPACIOS VACÍOS
> - Elimina el espacio excesivo entre los tags y el título,
>   y entre el título y la descripción.
> - Como referencia, usa 12–16 px entre tags y título, y 8–12 px
>   entre título y descripción.
> - Revisa márgenes, padding, alturas fijas, min-height y
>   justify-content: space-between que puedan generar esos huecos.
> - Mantén los bloques de tags, título y descripción agrupados
>   hacia la parte superior.
> - Evita reservar grandes alturas vacías para las etiquetas.
>   Si necesitas alinear títulos entre cards de una misma fila,
>   utiliza el espacio que realmente requiera el contenido.
> - Mantén el autor al pie mediante margin-top: auto, con una
>   separación mínima de 20–24 px respecto a la descripción.
> - Conserva la misma altura entre cards de cada fila, permitiendo
>   que crezcan cuando lo necesite el contenido.

### S2 — Technology tags and metadata
> OBJETIVO 2: TECNOLOGÍAS
> - Obtén las tecnologías de los datos o referencias existentes en el proyecto. No inventes tecnologías a partir de la imagen.
> - Si falta información, señala qué proyectos necesitan confirmación.
> - Conserva los textos de todos los tags.
> - Aplica a los tags de tecnologías la misma convención visual del
>   badge azul existente “LRPA”: mismo azul, texto blanco, tipografía,
>   bordes redondeados y padding proporcional.
> - Reutiliza su clase o crea una clase compartida para evitar
>   estilos duplicados.
> - Usa display:flex, flex-wrap:wrap y gap para distribuir las etiquetas.
> - Permite varias líneas cuando sea necesario, sin scroll horizontal.
> - Si las filas de etiquetas ocupan alturas distintas, ajusta su zona para que los títulos sigan alineados en cada fila de cards.
> - “Antes de continuar orderna correctamente project-card-meta y elimina el span de su izquierda.”
> - “Sí, quitar los seis badges.”

### S3 — Responsive and scope
> RESPONSIVE Y VALIDACIÓN
> - Conserva el estilo visual y reutiliza las clases existentes.
> - Limita los cambios a la sección de proyectos.
> - No añadas dependencias.
> - Comprueba que no haya desbordamientos en móvil, tablet y escritorio.
> - Si tienes navegador disponible, verifica la alineación visual y especifica qué pudiste comprobar.
>
> 3. CONSERVAR Y VERIFICAR
> - Conserva títulos, descripciones completas, imágenes, tecnologías,
>   autores y enlaces.
> - Mantén los cambios limitados a las cards.
> - No recortes textos ni uses alturas fijas que oculten contenido.
> - Comprueba escritorio y móvil si tienes navegador disponible.
> - Implementa los cambios en los archivos locales e indica
>   qué reglas estaban provocando los espacios excesivos.

## Tasks
- T1 — S1-S3 — route: inline — status: in_progress — commit: `f5091f2`, `3acb7a1`; provenance-span removal pending — implement sourced tags, align the six project cards responsively, and verify the section.

## Log
- L1 (2026-10-31): Carga la skill de Impeccable disponible y corrige el layout de las cards de proyectos de mi portafolio HTML, CSS y JavaScript.

L2 (2026-10-31): T1 baseline is implemented in commit `f5091f2`. `node --test tests/project-cards.test.mjs` passes (3/3); `node scripts/build-shared-shell.mjs --check` passes. Full suite: 28/32 pass; four unrelated checks fail (localized homepage H1, an existing card test's assistant-page assertion, AI Assistant copy, and overflow in another section). No browser executable was available, so responsive verification is static. `gentle_review assess` could not assess the native diff because pre-existing untracked files require an explicit declaration; its self-verification plan requires no independent verifier. Slice 1 is the single cohesive feature commit (504 authored changed lines); no further implementation slices are planned.

L3 (2026-10-31): Carga la skill de Impeccable disponible y ajusta únicamente
las cards de proyectos, tomando como referencia la captura adjunta.

1. UNIFICAR TAGS
- Aplica a los tags de tecnologías la misma convención visual del
  badge azul existente “LRPA”: mismo azul, texto blanco, tipografía,
  bordes redondeados y padding proporcional.
- Reutiliza su clase o crea una clase compartida para evitar
  estilos duplicados.
- Conserva los textos de todos los tags.
- Coloca las tecnologías junto al badge de procedencia, en un
  contenedor flex con flex-wrap y un gap de aproximadamente 6 px.
- Permite saltos de línea sin desbordamientos ni scroll horizontal.

2. REDUCIR ESPACIOS VACÍOS
- Elimina el espacio excesivo entre los tags y el título,
  y entre el título y la descripción.
- Como referencia, usa 12–16 px entre tags y título, y 8–12 px
  entre título y descripción.
- Revisa márgenes, padding, alturas fijas, min-height y
  justify-content: space-between que puedan generar esos huecos.
- Mantén los bloques de tags, título y descripción agrupados
  hacia la parte superior.
- Evita reservar grandes alturas vacías para las etiquetas.
  Si necesitas alinear títulos entre cards de una misma fila,
  utiliza el espacio que realmente requiera el contenido.
- Mantén el autor al pie mediante margin-top: auto, con una
  separación mínima de 20–24 px respecto a la descripción.
- Conserva la misma altura entre cards de cada fila, permitiendo
  que crezcan cuando lo necesite el contenido.

3. CONSERVAR Y VERIFICAR
- Conserva títulos, descripciones completas, imágenes, tecnologías,
  autores y enlaces.
- Mantén los cambios limitados a las cards.
- No recortes textos ni uses alturas fijas que oculten contenido.
- Comprueba escritorio y móvil si tienes navegador disponible.
- Implementa los cambios en los archivos locales e indica
  qué reglas estaban provocando los espacios excesivos.

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

L4 (2026-10-31): Replaced the technology tags with the same badge bg-primary classes as LRPA. Removed the 7.5rem metadata and 3.5rem title minimum heights, let the technology list wrap beside the origin badge, and removed description flex growth. Applied 14px tags/title spacing, 10px title/description spacing, and 24px author top padding while retaining margin-top: auto and equal grid rows. Card tests pass 5/5 and the build check passes. Full suite 30/34; the same four existing failures remain. No browser executable is available; gentle_review assess cannot inspect the diff because pre-existing untracked files require explicit declaration.

L5 (2026-10-31): The refinement is committed as `3acb7a1` (201 changed lines). The only rules responsible for the oversized card gaps were the `7.5rem` metadata min-height, `3.5rem` title min-height, and flex growth on card descriptions; no `justify-content: space-between` rule existed in the card stylesheet.

L6 (2026-10-31): User request: “Antes de continuar orderna correctamente project-card-meta y elimina el span de su izquierda.” Clarification selected: “Sí, quitar los seis badges.”
