# Caja Ica Professional Milestones
Authorized implementation in the existing Professional Milestones section; preserve prior working-tree changes and keep preview local.
Scope: add one Caja Ica organization card immediately above No Country; keep Education and all other sections unchanged; do not deploy.

## Specs

### S1 — Organization placement and structure
> Agrega **Caja Ica** como primera experiencia, inmediatamente encima de **No Country**, siguiendo el estandar del portafolio
>
> - Usa un solo nodo y una sola tarjeta principal para la organización.
> - Encabezado: **Caja Ica** y **Abril de 2024 – actualidad**. En inglés, **Apr. 2024 – Present**.
> - Dentro de la tarjeta, muestra los tres cargos en el orden indicado abajo. Cada cargo debe tener su propio título, periodo e iniciativas.
> - Deja el cargo actual abierto por defecto y permite desplegar los anteriores de forma independiente mediante controles accesibles con teclado. Muestra siempre el título y las fechas de los tres cargos.
> - Presenta las iniciativas con subtítulos y descripciones breves. Usa badges por cargo para destacar las tecnologías principales y evita repetir toda la lista debajo de cada iniciativa.

### S2 — Current and junior role facts
> **Analista Desarrollador de CRM e IA**  
> Junio de 2026 – actualidad  
> EN: **CRM & AI Analyst Developer**
>
> - **Procesamiento de recibos con OCR.** Reduje la búsqueda manual de datos en recibos de servicios al integrar OCR en el aplicativo core para el área de Logística. Desarrollé la solución con Java 25, Spring Boot, Spring AI y Clean Architecture. Utilicé Amazon Textract, SNS y SQS para el procesamiento asíncrono y Amazon Bedrock para normalizar los datos extraídos. Incorporé pruebas con Mockito, análisis con SonarQube y revisión de dependencias con OWASP Dependency-Check.
> - **Comunicaciones de cobranza con Salesforce Marketing Cloud.** Integré el core con Marketing Cloud para gestionar comunicaciones por SMS, correo y WhatsApp. Desarrollé una API REST con Java 25 y Spring Boot para procesar clientes por lotes, generar CSV y transferirlos por SFTP. Configuré Data Extensions, Automation Studio y Journey Builder para segmentar los envíos por mora, tipo de crédito y tipo de persona, y permitir que Recuperaciones administrara las plantillas.
> - **Arquetipo Python para agentes de IA.** Propuse y desarrollé una base reutilizable con Python, FastAPI, uv y arquitectura hexagonal, con análisis de código en SonarQube. La propuesta incluyó Qdrant para búsqueda vectorial, LiteLLM para acceso a modelos y un flujo de CI/CD para publicar y distribuir el arquetipo mediante Nexus. Distingue el arquetipo desarrollado de los componentes propuestos.
>
> **Desarrollador de Software Junior**  
> Julio de 2024 – junio de 2026  
> EN: **Junior Software Developer**
>
> - **Bloqueo de tarjetas por WhatsApp.** Habilité el bloqueo de tarjetas desde Boty mediante un microservicio en Java y Spring Boot. Apliqué Circuit Breaker para manejar fallas en la consulta de tarjetas activas.
> - **Modernización del módulo de arqueos y pólizas.** Migré el módulo de ASP.NET Web Forms a Angular con AG Grid y expuse la lógica de negocio mediante una API REST con Java y Spring Boot. El tablero permitió seguir la carga de documentos para el cierre de agencias.
> - **Integración con RENIEC.** Reduje el tiempo de respuesta de las consultas de datos personales de los aplicativos centrales al optimizar la API REST de integración con RENIEC, desarrollada con Java y Spring Boot.
> - **Asistente de IA para directivos.** Implementé un asistente con Microsoft Copilot Studio en Teams, conectado a una base de conocimiento privada en SharePoint, para facilitar la consulta de reglamentos, conferencias y otros documentos institucionales.
> - **Gestión de caja chica.** Centralicé en el core el registro de fondos que Operaciones Centrales llevaba en Excel. Implementé el control de fondos y los arqueos mensuales, preventivos y sorpresivos con C#, WPF, WCF y SQL Server, además de reportes con SQL Server Reporting Services.
> - **Optimización de SQL Server.** Optimicé procedimientos almacenados del core y apliqué buenas prácticas para facilitar su mantenimiento.

### S3 — Backend role facts
> **Desarrollador Backend | Locación de servicios**  
> Abril de 2024 – julio de 2024  
> EN: **Backend Developer | Independent Contractor**
>
> - **Débito automático de servicios.** Automaticé el procesamiento nocturno de débitos para Contugas y Electrodunas a partir de sus listados de clientes. Desarrollé microservicios con Java 11, Spring Boot y SQL Server, y apliqué el patrón Strategy para seleccionar la lógica según el servicio.
> - **Migración de cuentas de ahorro.** Implementé un proceso nocturno para migrar cuentas de ahorro de personas jurídicas. Adapté Indigo Persona para actualizar los datos de los clientes con C#, WPF y WCF.

### S4 — Data, localization, counts, and preserved records
> - Usa la estructura de datos y el sistema de idiomas existentes. Traduce al inglés los cargos y las descripciones, manteniendo los nombres oficiales de productos y entidades.
> - Muestra Caja Ica tanto en **All milestones / Todos los hitos** como en **Experience / Experiencia**. Recalcula los conteos contando la organización como una sola experiencia. Si ya existe un registro de Caja Ica, intégralo en la nueva tarjeta.
> - Conserva No Country inmediatamente debajo, con Trucking y Cashier dentro de su tarjeta. Mantén Formación como categoría independiente.

### S5 — Responsive, motion, and verification
> - Aplica el estilo actual de bordes, separadores y badges. Usa una entrada suave para la tarjeta completa y respeta `prefers-reduced-motion`.
> - Comprueba con Playwright el orden, los conteos, las 11 iniciativas, los controles desplegables, ambos idiomas y el diseño en escritorio y móvil.
> - Entrega una vista previa local. Aplica el cambio únicamente a Professional Milestones y deja el despliegue fuera del alcance de esta tarea.

## Tasks
- T1 — S1-S5; route: add RED coverage for Caja Ica’s single node/order, bilingual organization and role facts, 11 initiatives, filter counts, independent disclosures, and No Country preservation; status: done (RED observed: 16 tests, 8 expected failures and 8 passes); commit: pending.
- T2 — S1-S4; route: add Caja Ica to the existing bilingual experience data and render accessible, independently expandable roles and initiatives; status: done (16/16 focused tests; JS syntax passes); commit: pending.
- T3 — S1,S4,S5; route: style the organization/role/initiative hierarchy responsively and reuse the existing outer timeline entrance and reduced-motion behavior; status: done (desktop/mobile/320px render reviewed; light/dark contrast, focus ring, and reduced-motion behavior verified); commit: pending.
- T4 — S1-S5; route: run focused/build checks and Playwright for counts, order, disclosures, locales, and desktop/mobile; provide a local preview and record the delivery boundary; status: done (generated dist counts 11/4/7; All/Experience/Education filters 11/4/7; Caja precedes No Country; 11 initiatives have bilingual titles/descriptions; proposed components remain separate; Enter/Space disclosures are independent; no overflow at 320/390/1280; console has 0 errors/warnings; desktop/mobile preview screenshots captured and inspected; 16/16 focused tests, syntax, translation JSON, 101-file build, and diff checks pass; local preview only; JavaScript-disabled proof unavailable in this context); commit: pending.

## Log
- L1 — Original request verbatim:

```text
Actualiza la sección **Professional Milestones** de mi portafolio. Agrega **Caja Ica** como primera experiencia, inmediatamente encima de **No Country**, siguiendo el estandar del portafolio

Usa Impeccable para jerarquía, responsive y accesibilidad, y Emil para la animación de entrada si esas skills están disponibles. Reutiliza el diseño y los componentes de la línea de tiempo actual.

**Estructura de Caja Ica**

- Usa un solo nodo y una sola tarjeta principal para la organización.
- Encabezado: **Caja Ica** y **Abril de 2024 – actualidad**. En inglés, **Apr. 2024 – Present**.
- Dentro de la tarjeta, muestra los tres cargos en el orden indicado abajo. Cada cargo debe tener su propio título, periodo e iniciativas.
- Deja el cargo actual abierto por defecto y permite desplegar los anteriores de forma independiente mediante controles accesibles con teclado. Muestra siempre el título y las fechas de los tres cargos.
- Presenta las iniciativas con subtítulos y descripciones breves. Usa badges por cargo para destacar las tecnologías principales y evita repetir toda la lista debajo de cada iniciativa.

**Analista Desarrollador de CRM e IA**  
Junio de 2026 – actualidad  
EN: **CRM & AI Analyst Developer**

- **Procesamiento de recibos con OCR.** Reduje la búsqueda manual de datos en recibos de servicios al integrar OCR en el aplicativo core para el área de Logística. Desarrollé la solución con Java 25, Spring Boot, Spring AI y Clean Architecture. Utilicé Amazon Textract, SNS y SQS para el procesamiento asíncrono y Amazon Bedrock para normalizar los datos extraídos. Incorporé pruebas con Mockito, análisis con SonarQube y revisión de dependencias con OWASP Dependency-Check.
- **Comunicaciones de cobranza con Salesforce Marketing Cloud.** Integré el core con Marketing Cloud para gestionar comunicaciones por SMS, correo y WhatsApp. Desarrollé una API REST con Java 25 y Spring Boot para procesar clientes por lotes, generar CSV y transferirlos por SFTP. Configuré Data Extensions, Automation Studio y Journey Builder para segmentar los envíos por mora, tipo de crédito y tipo de persona, y permitir que Recuperaciones administrara las plantillas.
- **Arquetipo Python para agentes de IA.** Propuse y desarrollé una base reutilizable con Python, FastAPI, uv y arquitectura hexagonal, con análisis de código en SonarQube. La propuesta incluyó Qdrant para búsqueda vectorial, LiteLLM para acceso a modelos y un flujo de CI/CD para publicar y distribuir el arquetipo mediante Nexus. Distingue el arquetipo desarrollado de los componentes propuestos.

**Desarrollador de Software Junior**  
Julio de 2024 – junio de 2026  
EN: **Junior Software Developer**

- **Bloqueo de tarjetas por WhatsApp.** Habilité el bloqueo de tarjetas desde Boty mediante un microservicio en Java y Spring Boot. Apliqué Circuit Breaker para manejar fallas en la consulta de tarjetas activas.
- **Modernización del módulo de arqueos y pólizas.** Migré el módulo de ASP.NET Web Forms a Angular con AG Grid y expuse la lógica de negocio mediante una API REST con Java y Spring Boot. El tablero permitió seguir la carga de documentos para el cierre de agencias.
- **Integración con RENIEC.** Reduje el tiempo de respuesta de las consultas de datos personales de los aplicativos centrales al optimizar la API REST de integración con RENIEC, desarrollada con Java y Spring Boot.
- **Asistente de IA para directivos.** Implementé un asistente con Microsoft Copilot Studio en Teams, conectado a una base de conocimiento privada en SharePoint, para facilitar la consulta de reglamentos, conferencias y otros documentos institucionales.
- **Gestión de caja chica.** Centralicé en el core el registro de fondos que Operaciones Centrales llevaba en Excel. Implementé el control de fondos y los arqueos mensuales, preventivos y sorpresivos con C#, WPF, WCF y SQL Server, además de reportes con SQL Server Reporting Services.
- **Optimización de SQL Server.** Optimicé procedimientos almacenados del core y apliqué buenas prácticas para facilitar su mantenimiento.

**Desarrollador Backend | Locación de servicios**  
Abril de 2024 – julio de 2024  
EN: **Backend Developer | Independent Contractor**

- **Débito automático de servicios.** Automaticé el procesamiento nocturno de débitos para Contugas y Electrodunas a partir de sus listados de clientes. Desarrollé microservicios con Java 11, Spring Boot y SQL Server, y apliqué el patrón Strategy para seleccionar la lógica según el servicio.
- **Migración de cuentas de ahorro.** Implementé un proceso nocturno para migrar cuentas de ahorro de personas jurídicas. Adapté Indigo Persona para actualizar los datos de los clientes con C#, WPF y WCF.

**Integración y validación**

- Usa la estructura de datos y el sistema de idiomas existentes. Traduce al inglés los cargos y las descripciones, manteniendo los nombres oficiales de productos y entidades.
- Muestra Caja Ica tanto en **All milestones / Todos los hitos** como en **Experience / Experiencia**. Recalcula los conteos contando la organización como una sola experiencia. Si ya existe un registro de Caja Ica, intégralo en la nueva tarjeta.
- Conserva No Country inmediatamente debajo, con Trucking y Cashier dentro de su tarjeta. Mantén Formación como categoría independiente.
- Aplica el estilo actual de bordes, separadores y badges. Usa una entrada suave para la tarjeta completa y respeta `prefers-reduced-motion`.
- Comprueba con Playwright el orden, los conteos, las 11 iniciativas, los controles desplegables, ambos idiomas y el diseño en escritorio y móvil.
- Entrega una vista previa local. Aplica el cambio únicamente a Professional Milestones y deja el despliegue fuera del alcance de esta tarea. no te olvides en su ingles por favor
```
- L2 — Read-only explorer mapped `assets/js/experience-data.js` as the existing bilingual experience source, `index.html` as the static top-level timeline and No Country outlet, and `assets/js/work-gallery.js` as the page-local hydration/filter renderer. Caja Ica is not present in the data. Current counts are 10 total / 3 experience / 7 education, derived from top-level records; adding Caja Ica should yield 11 / 4 / 7. Existing reveal motion targets outer timeline nodes, and the current responsive styles already include tag wrapping and reduced-motion behavior. The previous No Country feature task (`odd/tasks/professional-milestones-organizations.md`) is complete and must remain intact.
- L3 — The worktree is extensively dirty, including overlapping changes in `index.html`, `assets/js/work-gallery.js`, `assets/css/work-gallery.css`, the untracked `assets/js/experience-data.js`, and tests. Preserve all pre-existing content and avoid staging unrelated work. The previous milestone task records no commit for its shared dirty worktree; the latest branch commit guard requires a delivery-strategy review before any further commit. No source implementation has been changed for this request yet.
- L4 — Implementation direction: keep the full English Caja Ica markup in one static organization node for progressive no-JavaScript content, then hydrate its dates, role titles, initiative copy, proposed-component distinction, and role badges from the bilingual experience data. Use three independent native `<details>/<summary>` disclosures; only the current role has `open`, and every summary carries its role title and dates. Reuse exactly one outer `data-scroll-reveal="timeline"` hook and existing reduced-motion behavior; do not animate each role, initiative, or badge. Leave No Country’s project renderer and Education markup unchanged.
- L5 — T1 RED observed before application changes: `node --test tests/work-gallery-caja-ica.test.mjs tests/work-gallery-experience-data.test.mjs tests/work-gallery-scroll-reveal.test.mjs` exited 1 with 16 tests, 8 failures and 8 passes. The expected failures are missing Caja Ica data/markup, roles/initiatives/disclosures, plus updated top-level count expectations; the existing No Country content and other unaffected reveal checks pass. No application source was changed during T1.
- L6 — T2 complete: added bilingual Caja Ica organization/role dates, 3 roles and 11 initiatives to `assets/js/experience-data.js`, with one role-level technology badge collection per role and proposed AI-agent components separated from the developed archetype. Added one static organization node before No Country; the three native disclosures keep all title/date summaries visible, with only the current role open by default. Added localized DOM hydration while preserving disclosure state and leaving No Country's project renderer branch unchanged. Focused tests pass 16/16; `node --check` passes for both experience scripts. Browser interaction proof remains in T4.
- L7 — T3 complete: added restrained role summaries, separators, role-level wrapping badges, initiative headings/descriptions, a visible 3px `:focus-visible` ring, and reduced-motion suppression for the disclosure chevron. Playwright inspected Caja Ica at 1280px, 390px, and 320px; 320px document width remains 320px without horizontal overflow. Light-theme contrast: body 15.43:1, headings/labels 14.37:1, badges 11.31:1. Dark-theme contrast: body 15.19:1, headings/labels 13:1, badges 10.95:1. Reduced-motion render revealed the one outer `timeline` target with opacity 1 and chevron transition 0s; no nested reveal targets. Inspected `screenshots/experience-caja-ica-desktop-settled.png` and `screenshots/experience-caja-ica-mobile.png`. Focused tests pass 16/16, JS syntax and `git diff --check` pass, generated site check passes (101 files). T4 interactive matrix remains.
- L8 — T4 complete: generated shared-shell preview is available at `http://127.0.0.1:8766/dist/`; the earlier `:8765` server is stale. Playwright confirms 11 total milestones / 4 experiences / 7 education records; Caja Ica is immediately before No Country; All, Experience, and Education filters show 11, 4, and 7 respectively. All three roles and 11 initiative titles/descriptions are localized in English and Spanish; proposed Qdrant/LiteLLM/Nexus components are distinguished from the developed archetype. No Country’s Trucking and Cashier content remains present. Enter/Space disclosures operate independently and preserve state across locale changes. Generated-preview layout at 320×800, 390×844, and 1280×900 has document width equal to the viewport and the Caja card/initiative content within bounds. Browser console reports zero errors and warnings. Captured and inspected `screenshots/experience-caja-ica-preview-desktop.png` and `screenshots/experience-caja-ica-preview-mobile.png`; restored English/light theme. Final focused tests pass 16/16; JS syntax, translation JSON, 101-file shared-shell build check, and `git diff --check` pass. The current Playwright context cannot prove JavaScript-disabled behavior. No files were staged or committed; the worktree contains unrelated in-progress changes, which were preserved. No deployment.
- L9 — Read-only `gentle_review` ASSESS reported risk `medium`, `nativeRisk: unassessable`, and zero changed paths because the mixed worktree contains untracked files requiring explicit declaration. With RDD off and no high-risk item escalated, its plan calls for writer self-verification and no independent verifier; the focused tests, syntax, build, and diff checks above were run. No review lifecycle operation was started.
