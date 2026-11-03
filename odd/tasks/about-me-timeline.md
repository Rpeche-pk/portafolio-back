# About Me timeline redesign
Scope: Preview-only; redesign only `#about` in `design/portfolio-redesign/03-work-gallery.html` using root `cv.html` as the factual source.
Authority: User request in L1; preserve the existing draft, do not modify `cv.html`, integrate, commit, or publish without approval.

## Specs

### S1 (verbatim user request)
> Rediseña únicamente la sección About Me del borrador “03-work-gallery”, inspirándote en la captura adjunta de Google Stitch.
>
> FUENTE DEL CONTENIDO
>
> Lee primero:
> portafolio-back/cv.html
>
> Localiza la ruta real dentro del proyecto. Extrae de ese archivo la experiencia laboral, educación, fechas, instituciones, descripciones y enlaces existentes.
>
> El archivo cv.html es la fuente principal del contenido. La referencia de Stitch sirve para el diseño; no copies sus afirmaciones técnicas, métricas o estados sin verificarlos.
>
> No modifiques cv.html en esta tarea.
>
> SKILLS
>
> Carga las skills disponibles:
> - Taste: composición y jerarquía visual.
> - Impeccable: espaciado, responsive y accesibilidad.
> - Emil: transiciones y entradas discretas.
>
> Si alguna no está instalada, indícalo y continúa con los recursos existentes.
>
> Conserva HTML, CSS y JavaScript vanilla y reutiliza las dependencias actuales.
>
> 1. ENCABEZADO: CONSERVAR LO MARCADO CON CHECK
>
> De la referencia, rescata estos tres elementos:
>
> Etiqueta superior:
> ES: “TRAYECTORIA PROFESIONAL Y ACADÉMICA”.
> EN: “PROFESSIONAL & ACADEMIC JOURNEY”.
>
> Título:
> ES: “Mi trayectoria”.
> EN: “Professional Milestones”.
>
> Subtítulo:
> ES: “Mi experiencia profesional y formación en desarrollo de software, tecnología y soluciones para el sector bancario”.
> EN: “My professional experience and education in software development, technology, and banking solutions”.
>
> Usa una etiqueta pequeña y discreta, un título destacado y un subtítulo de lectura cómoda. Conserva las tipografías y la paleta de mi portafolio.
>
> Las marcas rojas son anotaciones y no deben aparecer en la interfaz.
>
> NO incorporar los elementos tachados:
> - // 01_REC_START.
> - SYS_CLOCK::SYNC_OK.
> - RECORDS_LOADED.
> - Las cuatro tarjetas de métricas.
> - Contadores o indicadores que simulen telemetría.
>
> No añadas el navbar, banner de cierre ni footer propuestos por Stitch. Conserva los existentes.
>
> 2. FILTROS
>
> Debajo del encabezado, añade un control segmentado:
>
> ES:
> - Toda la trayectoria.
> - Experiencia.
> - Formación.
>
> EN:
> - All milestones.
> - Experience.
> - Education.
>
> Incluye certificaciones en Formación únicamente si están presentes en cv.html.
>
> - Calcula los conteos desde los registros reales.
> - Activa “Toda la trayectoria” por defecto.
> - Usa botones con estado seleccionado accesible y foco visible.
> - Al filtrar, conserva el orden cronológico y evita espacios vacíos.
> - Mantén el foco en el filtro seleccionado.
> - Omite “STREAM_MODE: ACTIVE” y los puntos pulsantes decorativos.
>
> 3. LÍNEA DE TIEMPO DE UNA SOLA COLUMNA
>
> Reproduce la estructura general de la referencia:
> - Un eje vertical fino a la izquierda.
> - Marcadores circulares alineados con cada registro.
> - Tarjetas a la derecha del eje.
> - Una sola columna continua; no alternes tarjetas entre izquierda y derecha.
>
> Ordena los registros por fecha de inicio descendente y conserva fielmente las fechas originales. No conviertas una experiencia en “actual” salvo que cv.html lo indique.
>
> Cada tarjeta debe mostrar:
> - Categoría breve: experiencia, educación o certificación.
> - Fecha o rango de fechas.
> - Puesto, programa o título académico.
> - Empresa o institución.
> - Descripción existente.
> - Tecnologías confirmadas, cuando correspondan.
> - Enlace de certificado o documento, solo si existe.
>
> No fuerces exactamente siete registros: muestra todos los pertinentes que existan en la fuente.
>
> 4. ESTILO DE LAS TARJETAS
>
> - Fondo claro sólido o ligeramente translúcido que permita leer sobre el Dot Grid.
> - Borde de 1 px gris azulado.
> - Esquinas redondeadas de aproximadamente 12–16 px.
> - Sombra mínima.
> - Padding de unos 20–24 px en escritorio y menor en móvil.
> - Título e institución con jerarquía clara.
> - Fechas y categorías con tipografía monoespaciada discreta, si ya existe en el proyecto.
> - Tags compactos con fondo azul tenue y distribución en varias líneas.
> - Separador interior fino entre metadatos y contenido cuando mejore la lectura.
> - Equivalente coherente para el tema oscuro.
>
> No uses etiquetas como ACTIVE_DEPLOYMENT, DEGREE_CONFERRED o ADVANCED_TIER por imitación. Utiliza categorías comprensibles y estados confirmados.
>
> No traduzcas un grado académico como “B.S.” ni afirmes titulación si el archivo no lo acredita. Conserva la denominación real.
>
> 5. CONTENIDO E IDIOMAS
>
> - Mantén las responsabilidades y logros respaldados por cv.html.
> - Puedes mejorar redacción y brevedad sin ampliar el alcance de mi experiencia.
> - No añadas métricas, tecnologías, arquitecturas, niveles o resultados que no figuren en la fuente.
> - No conviertas cursos en experiencia laboral.
> - Conserva nombres oficiales de empresas, instituciones y programas.
> - Integra textos y controles en el sistema español/inglés existente.
> - Centraliza los registros siguiendo la estructura actual para evitar duplicar HTML.
>
> Para enlaces:
> - ES: “Ver certificado” o “Ver documento”.
> - EN: “View certificate” o “View document”.
> - Si falta una URL, omite la acción y comunícalo en la entrega.
> - No uses enlaces vacíos ni destinos inventados.
>
> 6. RESPONSIVE Y MOVIMIENTO
>
> - Alinea la sección con las guías laterales del navbar y demás secciones.
> - En móvil, conserva la línea temporal a la izquierda con un margen reducido.
> - Reorganiza fechas y acciones en varias filas cuando no quepan.
> - Evita textos diminutos, tarjetas recortadas y scroll horizontal.
> - Mantén el contenido visible si falla JavaScript.
> - Si añades entrada animada, usa opacity y desplazamiento vertical de unos 8–12 px, una sola vez.
> - Respeta prefers-reduced-motion.
> - No añadas animación continua a los nodos.
>
> 7. INTEGRACIÓN
>
> - Conserva el ID de About Me, sus anclas y el scrollspy del navbar.
> - No reconstruyas una sección independiente “Training and credentials”: la formación debe quedar integrada en About Me.
> - Mantén intactos hero, certificaciones del hero, Projects, Skills, cordón y footer.
> - No añadas fuentes ni bibliotecas nuevas si las existentes resuelven el diseño.
>
> 8. VALIDACIÓN CON PLAYWRIGHT
>
> Comprueba:
> - Correspondencia entre los registros mostrados y cv.html.
> - Fechas, orden cronológico, instituciones y enlaces.
> - Funcionamiento de filtros y conteos.
> - Alineación entre eje, nodos y tarjetas.
> - Español e inglés, temas claro y oscuro.
> - Escritorio, tablet y móvil.
> - Navegación por teclado y foco imagen referencia C:\Users\RMULO~1\AppData\Local\Temp\orca-paste-1793588515929-782ad55e-f12a-4f0e-bf72-8b66d52459c4.png debajo de la seccion skill en la seccion about me

## Tasks
- T1 — S1 — route: inline — commit: withheld (preview-only) — Reconcile the root CV's 3 experience and 7 education/training records, source dates, organizations, descriptions, and existing URLs with the chosen preview; preserve all facts and scope.
- T2 — S1 — route: inline — commit: withheld (preview-only) — status: done — Replace only `#about` with the bilingual heading, source-backed single-column timeline, derived accessible filters, and scoped responsive/dark-mode styling; retain visible content without JavaScript.
- T3 — S1 — route: inline — commit: withheld (preview-only) — status: done — Verify source correspondence, ordering, links, filters, keyboard/focus, i18n, themes, responsive layout, reduced motion, and preserved navigation/neighbor sections in Playwright.
- T4 — S1 — route: inline — commit: withheld (preview-only) — status: done — Inspect final screenshots, refresh the existing design canvas, synchronize this record and its Engram mirror, and report remaining limitations.

## Log
L1 (verbatim):
Rediseña únicamente la sección About Me del borrador “03-work-gallery”, inspirándote en la captura adjunta de Google Stitch.

FUENTE DEL CONTENIDO

Lee primero:
portafolio-back/cv.html

Localiza la ruta real dentro del proyecto. Extrae de ese archivo la experiencia laboral, educación, fechas, instituciones, descripciones y enlaces existentes.

El archivo cv.html es la fuente principal del contenido. La referencia de Stitch sirve para el diseño; no copies sus afirmaciones técnicas, métricas o estados sin verificarlos.

No modifiques cv.html en esta tarea.

SKILLS

Carga las skills disponibles:
- Taste: composición y jerarquía visual.
- Impeccable: espaciado, responsive y accesibilidad.
- Emil: transiciones y entradas discretas.

Si alguna no está instalada, indícalo y continúa con los recursos existentes.

Conserva HTML, CSS y JavaScript vanilla y reutiliza las dependencias actuales.

1. ENCABEZADO: CONSERVAR LO MARCADO CON CHECK

De la referencia, rescata estos tres elementos:

Etiqueta superior:
ES: “TRAYECTORIA PROFESIONAL Y ACADÉMICA”.
EN: “PROFESSIONAL & ACADEMIC JOURNEY”.

Título:
ES: “Mi trayectoria”.
EN: “Professional Milestones”.

Subtítulo:
ES: “Mi experiencia profesional y formación en desarrollo de software, tecnología y soluciones para el sector bancario”.
EN: “My professional experience and education in software development, technology, and banking solutions”.

Usa una etiqueta pequeña y discreta, un título destacado y un subtítulo de lectura cómoda. Conserva las tipografías y la paleta de mi portafolio.

Las marcas rojas son anotaciones y no deben aparecer en la interfaz.

NO incorporar los elementos tachados:
- // 01_REC_START.
- SYS_CLOCK::SYNC_OK.
- RECORDS_LOADED.
- Las cuatro tarjetas de métricas.
- Contadores o indicadores que simulen telemetría.

No añadas el navbar, banner de cierre ni footer propuestos por Stitch. Conserva los existentes.

2. FILTROS

Debajo del encabezado, añade un control segmentado:

ES:
- Toda la trayectoria.
- Experiencia.
- Formación.

EN:
- All milestones.
- Experience.
- Education.

Incluye certificaciones en Formación únicamente si están presentes en cv.html.

- Calcula los conteos desde los registros reales.
- Activa “Toda la trayectoria” por defecto.
- Usa botones con estado seleccionado accesible y foco visible.
- Al filtrar, conserva el orden cronológico y evita espacios vacíos.
- Mantén el foco en el filtro seleccionado.
- Omite “STREAM_MODE: ACTIVE” y los puntos pulsantes decorativos.

3. LÍNEA DE TIEMPO DE UNA SOLA COLUMNA

Reproduce la estructura general de la referencia:
- Un eje vertical fino a la izquierda.
- Marcadores circulares alineados con cada registro.
- Tarjetas a la derecha del eje.
- Una sola columna continua; no alternes tarjetas entre izquierda y derecha.

Ordena los registros por fecha de inicio descendente y conserva fielmente las fechas originales. No conviertas una experiencia en “actual” salvo que cv.html lo indique.

Cada tarjeta debe mostrar:
- Categoría breve: experiencia, educación o certificación.
- Fecha o rango de fechas.
- Puesto, programa o título académico.
- Empresa o institución.
- Descripción existente.
- Tecnologías confirmadas, cuando correspondan.
- Enlace de certificado o documento, solo si existe.

No fuerces exactamente siete registros: muestra todos los pertinentes que existan en la fuente.

4. ESTILO DE LAS TARJETAS

- Fondo claro sólido o ligeramente translúcido que permita leer sobre el Dot Grid.
- Borde de 1 px gris azulado.
- Esquinas redondeadas de aproximadamente 12–16 px.
- Sombra mínima.
- Padding de unos 20–24 px en escritorio y menor en móvil.
- Título e institución con jerarquía clara.
- Fechas y categorías con tipografía monoespaciada discreta, si ya existe en el proyecto.
- Tags compactos con fondo azul tenue y distribución en varias líneas.
- Separador interior fino entre metadatos y contenido cuando mejore la lectura.
- Equivalente coherente para el tema oscuro.

No uses etiquetas como ACTIVE_DEPLOYMENT, DEGREE_CONFERRED o ADVANCED_TIER por imitación. Utiliza categorías comprensibles y estados confirmados.

No traduzcas un grado académico como “B.S.” ni afirmes titulación si el archivo no lo acredita. Conserva la denominación real.

5. CONTENIDO E IDIOMAS

- Mantén las responsabilidades y logros respaldados por cv.html.
- Puedes mejorar redacción y brevedad sin ampliar el alcance de mi experiencia.
- No añadas métricas, tecnologías, arquitecturas, niveles o resultados que no figuren en la fuente.
- No conviertas cursos en experiencia laboral.
- Conserva nombres oficiales de empresas, instituciones y programas.
- Integra textos y controles en el sistema español/inglés existente.
- Centraliza los registros siguiendo la estructura actual para evitar duplicar HTML.

Para enlaces:
- ES: “Ver certificado” o “Ver documento”.
- EN: “View certificate” o “View document”.
- Si falta una URL, omite la acción y comunícalo en la entrega.
- No uses enlaces vacíos ni destinos inventados.

6. RESPONSIVE Y MOVIMIENTO

- Alinea la sección con las guías laterales del navbar y demás secciones.
- En móvil, conserva la línea temporal a la izquierda con un margen reducido.
- Reorganiza fechas y acciones en varias filas cuando no quepan.
- Evita textos diminutos, tarjetas recortadas y scroll horizontal.
- Mantén el contenido visible si falla JavaScript.
- Si añades entrada animada, usa opacity y desplazamiento vertical de unos 8–12 px, una sola vez.
- Respeta prefers-reduced-motion.
- No añadas animación continua a los nodos.

7. INTEGRACIÓN

- Conserva el ID de About Me, sus anclas y el scrollspy del navbar.
- No reconstruyas una sección independiente “Training and credentials”: la formación debe quedar integrada en About Me.
- Mantén intactos hero, certificaciones del hero, Projects, Skills, cordón y footer.
- No añadas fuentes ni bibliotecas nuevas si las existentes resuelven el diseño.

8. VALIDACIÓN CON PLAYWRIGHT

Comprueba:
- Correspondencia entre los registros mostrados y cv.html.
- Fechas, orden cronológico, instituciones y enlaces.
- Funcionamiento de filtros y conteos.
- Alineación entre eje, nodos y tarjetas.
- Español e inglés, temas claro y oscuro.
- Escritorio, tablet y móvil.
- Navegación por teclado y foco imagen referencia C:\Users\RMULO~1\AppData\Local\Temp\orca-paste-1793588515929-782ad55e-f12a-4f0e-bf72-8b66d52459c4.png debajo de la seccion skill en la seccion about me

L2 — Source audit: the real file is root `cv.html`. It has 3 work records and 7 education/training records. All 7 education/training records have a real certificate/document URL; the 3 work records have existing links (No Country, the Zephyr YouTube short, and Hospital Regional de Ica). Preserve the two `Present` employment ranges exactly in meaning. Start-date order across all ten: No Country (Nov 2023), Bootcamp Data Analytics (Sep 2023), Zephyr Cygnus (Aug 2023), Alura specialization (May 2023), Universidad Ibague Java/Spring course (Apr 2023), Cjava Java Developer (Feb 2022), Cjava Java Programmer (Oct 2021), DMC Perú AWS (Mar 2021), Hospital Regional de Ica (May 2019), Systems Engineering (Dec 2016). The source supports Cashier layered REST backend/design-pattern work; Zephyr fast-food sales chatbot; and Hospital MSSQL Server, Power BI, GALENHOS, and Java desktop work. Other technology tags must be limited to technologies named by each CV description. `cv.html` remains untouched.

L3 — Baseline: captured and inspected `.playwright-mcp/about-me-before-desktop.png`, `about-me-before-tablet.png`, and `about-me-before-mobile.png`. Existing `#about` contained only the old heading and repeated hero summary, with no records or filters; viewport widths 1440, 768, and 390 had no horizontal overflow. The scoped Playwright RED reported all six new-header/filter/timeline acceptance checks missing. The page had one unrelated `/favicon.ico` 404. Skills Taste, Impeccable, and Emil are installed and read. Impeccable's context launcher did not provide context; project `PRODUCT.md`/`DESIGN.md` files are absent, and current `design/system.md` plus `gentle_design list` provide the existing palette/type and current canvas context.

L4 — T1 complete; T2 implementation complete; T3 in progress. The feature record, Engram mirror, and visible todo projection were synchronized before any source edit. Scope remains only `#about` in the selected draft; no integration, commit, or publication.

L5 — Implemented the static EN/ES timeline and progressive controls in the chosen draft only. The 10 records remain source-backed (3 experience, 7 education/training), controls derive 10/3/7 counts, and all existing work/certificate/document links are retained. Validation so far: source link sets exactly match `cv.html`; dates are sorted by start month; Playwright accepted the required EN headings, ES headings/labels, no-JS visibility, focus-visible keyboard selection, education filtering (7), EN/ES details, reduced-motion behavior, and no-overflow/aligned one-column layout at 320/390/768/1280/1920. Light/dark token rendering was compared directly and differs as expected. Captured/inspected desktop EN light, tablet ES dark, and mobile ES dark section screenshots. A separate theme-toggle click attempt timed out at a hidden desktop control; do not retry that control check. T3 remains open for the final navigation check; T4 remains pending. `cv.html` and all neighboring sections are unchanged.

L6 — T3 complete. Playwright confirmed exact source work/document link sets, 3/7 source counts, all 10 records and descending start-date order; required English and Spanish headings/filter labels; all records visible without JavaScript; experience and education filters update visible records/counts, preserve chronology and focus, and announce localized status; focus-visible outline is 3px; axis/node/card alignment and single-column layout; no horizontal overflow at 320, 390, 768, 1280, and 1920; reduced-motion suppresses entry/transition animation; the optional 240ms, 10px entry is one-shot; and desktop Projects/Skills/About navigation and scrollspy remain correct. Light/dark appearance was checked through the root theme state and captured screenshots. The attempted desktop theme-toggle click timed out because the locator selected a hidden control; that control interaction remains unverified and was not retried. `gentle_review assess` was unassessable because unrelated untracked files exist; RDD is off, its plan retained writer self-verification and no independent verifier. Risk: none (no shared parser/helper or public contract changed). T4 is complete; final screenshots were inspected and the existing canvas refreshed.

L7 — T4 complete. Inspected `.playwright-mcp/about-me-final-desktop-en-light.png`, `.playwright-mcp/about-me-final-tablet-es-dark.png`, and `.playwright-mcp/about-me-final-mobile-es-dark.png`; refreshed the Gentle Design canvas at `http://127.0.0.1:51260/JrWBkoO2gd7O0WRfEXP2zebUWx6gSSA2/d/portfolio-redesign/`. The preview remains only in `design/portfolio-redesign/03-work-gallery.html`; `cv.html` is untouched. No integration, commit, or publication.
