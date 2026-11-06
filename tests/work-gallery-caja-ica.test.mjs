import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { runInNewContext } from "node:vm";
import test from "node:test";

const homePage = await readFile(new URL("../index.html", import.meta.url), "utf8");
const styles = await readFile(new URL("../assets/css/work-gallery.css", import.meta.url), "utf8");
const dataSource = await readFile(new URL("../assets/js/experience-data.js", import.meta.url), "utf8");
const sandbox = { window: {} };
runInNewContext(dataSource, sandbox);
const experienceData = JSON.parse(JSON.stringify(sandbox.window.portfolioExperienceData));
const cajaIca = experienceData.experiences.find(({ id }) => id === "caja-ica");
const timelineStart = homePage.indexOf('id="about-timeline"');
const timelineEnd = homePage.indexOf("</ol>", timelineStart);
const timeline = homePage.slice(timelineStart, timelineEnd);
const outerRecordOpenings = [...timeline.matchAll(/<li class="about-timeline-item"[^>]*\bdata-about-record\b[^>]*>/g)];
const experienceRecordOpenings = outerRecordOpenings.filter(([markup]) => markup.includes('data-about-group="experience"'));
const cajaMarkup = timeline.match(/<li class="about-timeline-item"[^>]*data-about-experience-id="caja-ica"[^>]*>([\s\S]*?)(?=<li class="about-timeline-item"[^>]*data-about-experience-id="no-country")/)?.[0] ?? "";

const expectedSpanishDescriptions = [
  "Reduje el tiempo que Logística dedicaba a buscar manualmente los datos de recibos al integrar OCR en el aplicativo core. Lo desarrollé con Java 25, Spring Boot, Spring AI y Clean Architecture; procesé los recibos de forma asíncrona con Textract y SNS/SQS, y estructuré los datos con Bedrock. Añadí pruebas con Mockito, análisis con SonarQube y revisión con OWASP Dependency-Check.",
  "Habilité para los directivos de Caja Ica un asistente de Microsoft Copilot Studio en Teams, conectado a una base de conocimiento privada en SharePoint, para agilizar la consulta de reglamentos, conferencias y otros documentos institucionales y apoyar decisiones informadas.",
  "Integré el core con Salesforce Marketing Cloud mediante una API REST en Java 25 y Spring Boot que procesa clientes por lotes y transfiere CSV por SFTP. Configuré Data Extensions, Automation Studio y Journey Builder para segmentar comunicaciones por mora, tipo de crédito y de persona, y permitir que Recuperaciones gestione las plantillas.",
  "Propuse y desarrollé una base reutilizable para agentes de IA con Python, FastAPI, uv y arquitectura hexagonal, con análisis de código en SonarQube.",
  "Facilité que los clientes de Caja Ica bloquearan sus tarjetas desde Boty, el canal de WhatsApp. Habilité la opción con un microservicio en Java y Spring Boot y Circuit Breaker para manejar fallas al consultar tarjetas activas.",
  "Facilité el seguimiento del cierre de agencias con un tablero que mostraba qué sedes habían cargado los documentos requeridos y cuáles seguían pendientes. Migré el módulo de ASP.NET Web Forms a Angular y AG Grid, respaldado por una API REST con Java y Spring Boot.",
  "Reduje el tiempo de respuesta de las consultas de datos personales de los aplicativos centrales al optimizar la API REST de integración con RENIEC en Java y Spring Boot.",
  "Simplifiqué el seguimiento de los fondos de áreas administrativas al centralizar en el core el registro que Operaciones Centrales llevaba en Excel. Implementé el control de fondos y arqueos mensuales, preventivos y sorpresivos con C#, WPF, WCF y SQL Server, además de reportes con SQL Server Reporting Services.",
  "Mejoré el mantenimiento de procedimientos almacenados del core al optimizar su lógica y aplicar buenas prácticas de desarrollo en SQL Server.",
  "Automaticé el cobro nocturno de recibos de Contugas y Electrodunas con sus listados de clientes, sentando las bases para incorporarlo a la app móvil. Desarrollé microservicios en capas con Java 11, Spring Boot 2.2.1 y SQL Server, y usé Strategy para elegir la lógica según el servicio y el contrato.",
  "Implementé un proceso nocturno para migrar cuentas de ahorro de personas jurídicas. Adapté Indigo Persona para actualizar los datos de los clientes con C#, WPF y WCF."
];

const expectedEnglishDescriptions = [
  "Reduced the time Logistics spent manually looking up service-receipt data by adding OCR to the core application. Built it with Java 25, Spring Boot, Spring AI, and Clean Architecture; used Amazon Textract with SNS/SQS for asynchronous processing and Bedrock to structure the extracted data. Added Mockito tests, SonarQube analysis, and OWASP Dependency-Check.",
  "Enabled a Microsoft Copilot Studio assistant in Teams for Caja Ica executives, connected to a private SharePoint knowledge base, making institutional regulations, conference materials, and other documents faster to find and supporting informed decisions.",
  "Connected the core to Salesforce Marketing Cloud through a Java 25/Spring Boot REST API that batches customers and transfers CSV files over SFTP. Configured Data Extensions, Automation Studio, and Journey Builder to segment messages by delinquency, credit type, and customer type, so Recoveries could manage templates.",
  "Proposed and built a reusable AI-agent foundation with Python, FastAPI, uv, and hexagonal architecture, with SonarQube code analysis.",
  "Made it easier for Caja Ica customers to block cards through Boty on WhatsApp. Enabled the feature with a Java and Spring Boot microservice and Circuit Breaker to handle failures when checking active cards.",
  "Made agency-closing progress easier to track with a dashboard showing which branches had uploaded required documents and which were still pending. Migrated the ASP.NET Web Forms module to Angular and AG Grid, backed by a Java/Spring Boot REST API.",
  "Reduced the response time of personal-data queries in central applications by optimizing the Java/Spring Boot REST API integrated with RENIEC.",
  "Simplified tracking of administrative-area funds by centralizing in the core the records Operations Central had kept in Excel. Implemented fund controls and monthly, preventive, and surprise counts with C#, WPF, WCF, and SQL Server, plus reports with SQL Server Reporting Services.",
  "Improved maintenance of core stored procedures by optimizing their logic and applying SQL Server development best practices.",
  "Automated overnight billing for Contugas and Electrodunas using their customer lists, laying the groundwork for adding the flow to the Caja Ica mobile app. Built layered microservices with Java 11, Spring Boot 2.2.1, and SQL Server, using Strategy to select logic by service and contract.",
  "I implemented an overnight migration process for legal-entity savings accounts. I adapted Indigo Persona to update customer data with C#, WPF, and WCF."
];

const expectedInitiativeTechnologies = [
  ["receipt-ocr", ["Java 25", "Spring Boot", "Spring AI", "Clean Architecture", "Amazon Textract", "Amazon SNS / SQS", "Amazon Bedrock", "Mockito", "SonarQube", "OWASP Dependency-Check"]],
  ["executive-ai-assistant", ["Microsoft Copilot Studio", "Teams", "SharePoint"]],
  ["salesforce-collections-communications", ["Salesforce Marketing Cloud", "Java 25", "Spring Boot", "REST API", "SFTP", "Data Extensions", "Automation Studio", "Journey Builder"]],
  ["python-ai-agent-archetype", ["Python", "FastAPI", "uv", "Hexagonal architecture", "SonarQube"]],
  ["whatsapp-card-blocking", ["Boty", "WhatsApp", "Java", "Spring Boot", "Circuit Breaker"]],
  ["cash-counting-policies-modernization", ["Angular", "AG Grid", "Java", "Spring Boot", "REST API"]],
  ["reniec-integration", ["Java", "Spring Boot", "REST API", "RENIEC"]],
  ["petty-cash-management", ["C#", "WPF", "WCF", "SQL Server", "SQL Server Reporting Services"]],
  ["sql-server-optimization", ["SQL Server"]],
  ["automatic-service-debits", ["Java 11", "Spring Boot 2.2.1", "SQL Server", "Layered architecture", "Strategy pattern"]],
  ["savings-account-migration", ["C#", "WPF", "WCF", "Indigo Persona"]]
];

function staticInitiativeMarkup(id) {
  const marker = `data-about-initiative="${id}"`;
  const position = cajaMarkup.indexOf(marker);
  if (position < 0) return "";
  const start = cajaMarkup.lastIndexOf('<li class="about-initiative"', position);
  const nextInitiative = cajaMarkup.indexOf('<li class="about-initiative"', position + marker.length);
  const nextRole = cajaMarkup.indexOf('<details class="about-role"', position + marker.length);
  const boundaries = [nextInitiative, nextRole].filter((index) => index >= 0);
  const end = boundaries.length ? Math.min(...boundaries) : cajaMarkup.indexOf("</ul>", position) + 5;
  return cajaMarkup.slice(start, end);
}

function requireCajaIca() {
  assert.ok(cajaIca, "Caja Ica exists in the bilingual experience data");
  return cajaIca;
}

test("Caja Ica is one top-level experience immediately before No Country and counts as one", () => {
  assert.equal((homePage.match(/data-about-experience-id="caja-ica"/g) ?? []).length, 1);
  assert.equal((homePage.match(/data-about-experience-id="no-country"/g) ?? []).length, 1);
  assert.match(experienceRecordOpenings[0]?.[0] ?? "", /data-about-experience-id="caja-ica"/);
  assert.match(experienceRecordOpenings[1]?.[0] ?? "", /data-about-experience-id="no-country"/);
  assert.equal(outerRecordOpenings.length, 12);
  assert.match(homePage, /data-about-count="all">12</);
  assert.match(homePage, /data-about-count="experience">3</);
  assert.match(homePage, /data-about-count="education">9</);
});

test("Caja Ica organization and three role titles and periods are bilingual and ordered", () => {
  const record = requireCajaIca();
  assert.equal(record.organization, "Caja Ica");
  assert.equal(record.organizationPeriod.es, "Abril de 2024 – actualidad");
  assert.equal(record.organizationPeriod.en, "Apr. 2024 – Present");
  assert.deepEqual(record.roles.map(({ id }) => id), [
    "crm-ai-analyst-developer",
    "junior-software-developer",
    "backend-independent-contractor"
  ]);
  assert.deepEqual(record.roles.map(({ title }) => [title.es, title.en]), [
    ["Analista Desarrollador de CRM e IA", "CRM & AI Analyst Developer"],
    ["Desarrollador de Software Junior", "Junior Software Developer"],
    ["Desarrollador Backend | Locación de servicios", "Backend Developer | Independent Contractor"]
  ]);
  assert.deepEqual(record.roles.map(({ period }) => [period.es, period.en]), [
    ["junio de 2026 – actualidad", "Jun. 2026 – Present"],
    ["julio de 2024 – junio de 2026", "Jul. 2024 – Jun. 2026"],
    ["abril de 2024 – julio de 2024", "Apr. 2024 – Jul. 2024"]
  ]);
  assert.equal(record.roles[0].openByDefault, true);
  assert.equal(record.roles[1].openByDefault, false);
  assert.equal(record.roles[2].openByDefault, false);
});

test("the eleven initiatives preserve the Spanish facts and translate every title and description", () => {
  const record = requireCajaIca();
  const initiatives = record.roles.flatMap(({ initiatives: roleInitiatives }) => roleInitiatives);
  assert.deepEqual(record.roles.map(({ initiatives: roleInitiatives }) => roleInitiatives.length), [4, 5, 2]);
  assert.equal(record.roles[0].initiatives[1].id, "executive-ai-assistant");
  assert.equal(record.roles[1].initiatives.some(({ id }) => id === "executive-ai-assistant"), false);
  assert.equal(initiatives.length, 11);
  assert.deepEqual(initiatives.map(({ description }) => description.es), expectedSpanishDescriptions);
  assert.deepEqual(initiatives.map(({ description }) => description.en), expectedEnglishDescriptions);
  assert.deepEqual([...cajaMarkup.matchAll(/data-about-initiative-description>([^<]*)<\/p>/g)].map(([, description]) => description), expectedEnglishDescriptions);
  assert.doesNotMatch(expectedEnglishDescriptions.join(" "), /\b\d+(?:\.\d+)?\s*%/);
  assert.equal(initiatives[10].description.es, "Implementé un proceso nocturno para migrar cuentas de ahorro de personas jurídicas. Adapté Indigo Persona para actualizar los datos de los clientes con C#, WPF y WCF.");
  for (const initiative of initiatives) {
    assert.equal(typeof initiative.title.en, "string");
    assert.ok(initiative.title.en.length > 0, `${initiative.id} has an English title`);
    assert.equal(typeof initiative.description.en, "string");
    assert.ok(initiative.description.en.length > 0, `${initiative.id} has an English description`);
  }
  const archetype = record.roles[0].initiatives[3];
  assert.match(archetype.description.es, /Python, FastAPI, uv y arquitectura hexagonal/);
  assert.doesNotMatch(archetype.description.es, /Qdrant|LiteLLM|Nexus/);
  assert.match(archetype.proposedComponents.es, /Qdrant.*LiteLLM.*Nexus/);
  assert.match(archetype.description.en, /Python, FastAPI, uv/);
  assert.doesNotMatch(archetype.description.en, /Qdrant|LiteLLM|Nexus/);
  assert.match(archetype.proposedComponents.en, /Qdrant.*LiteLLM.*Nexus/);
});

test("static role disclosures keep all titles and dates visible, independently keyboard-operable, and current role open", () => {
  assert.ok(cajaMarkup, "the static Caja Ica card exists before No Country");
  const roleDetails = [...cajaMarkup.matchAll(/<details\b([^>]*)data-about-role="([^"]+)"([^>]*)>([\s\S]*?)<\/details>/g)];
  assert.equal(roleDetails.length, 3);
  assert.deepEqual(roleDetails.map(([, , roleId]) => roleId), [
    "crm-ai-analyst-developer",
    "junior-software-developer",
    "backend-independent-contractor"
  ]);
  assert.match(roleDetails[0]?.[0] ?? "", /\bopen(?:\s|>)/);
  assert.doesNotMatch(roleDetails[1]?.[0] ?? "", /\bopen(?:\s|>)/);
  assert.doesNotMatch(roleDetails[2]?.[0] ?? "", /\bopen(?:\s|>)/);
  for (const [, , roleId, , markup] of roleDetails) {
    const summary = markup.match(/<summary\b[^>]*>[\s\S]*?<\/summary>/)?.[0] ?? "";
    assert.ok(summary, `${roleId} has a native summary control`);
    assert.match(summary, /data-about-role-title/);
    assert.match(summary, /data-about-role-period/);
    assert.match(markup, /data-about-role-initiatives/);
  }
});

test("each Caja Ica initiative owns only its explicitly documented implemented stack", () => {
  const record = requireCajaIca();
  const initiatives = record.roles.flatMap(({ initiatives: roleInitiatives }) => roleInitiatives);
  assert.equal(initiatives.length, 11);
  assert.deepEqual(initiatives.map(({ id, technologies }) => [id, technologies]), expectedInitiativeTechnologies);
  for (const role of record.roles) {
    assert.equal(Object.prototype.hasOwnProperty.call(role, "technologies"), false, `${role.id} has no duplicate role-level technology aggregate`);
  }

  const archetype = initiatives.find(({ id }) => id === "python-ai-agent-archetype");
  assert.ok(archetype, "the Python archetype initiative exists");
  for (const proposed of ["Qdrant", "LiteLLM", "Nexus", "CI/CD"]) assert.equal(archetype.technologies.includes(proposed), false);
  assert.equal(initiatives.find(({ id }) => id === "cash-counting-policies-modernization").technologies.includes("ASP.NET Web Forms"), false);
  assert.equal(initiatives.find(({ id }) => id === "petty-cash-management").technologies.includes("Excel"), false);
  assert.equal((cajaMarkup.match(/data-about-initiative="/g) ?? []).length, 11);
  assert.equal((cajaMarkup.match(/data-scroll-reveal=/g) ?? []).length, 1);
  assert.match(experienceRecordOpenings[0]?.[0] ?? "", /data-scroll-reveal="timeline"/);
});

test("each static Caja Ica initiative renders its own accessible technology list without a role-level duplicate", () => {
  assert.ok(cajaMarkup, "the static Caja Ica card exists before No Country");
  assert.doesNotMatch(cajaMarkup, /data-about-role-technologies/);
  assert.equal((cajaMarkup.match(/data-about-initiative-technologies/g) ?? []).length, 11);
  for (const [id, expected] of expectedInitiativeTechnologies) {
    const markup = staticInitiativeMarkup(id);
    assert.ok(markup, `${id} has a static initiative block`);
    const contentPosition = markup.indexOf("about-initiative-content");
    const technologyPosition = markup.indexOf("data-about-initiative-technologies");
    assert.ok(contentPosition >= 0 && technologyPosition > contentPosition, `${id} keeps project content before badges in source order`);
    const list = markup.match(/<ul class="about-initiative-technologies"[^>]*>([\s\S]*?)<\/ul>/)?.[1] ?? "";
    assert.ok(list, `${id} has a fallback technology list`);
    assert.deepEqual([...list.matchAll(/<li>([^<]*)<\/li>/g)].map(([, technology]) => technology), expected, `${id} fallback badges match its project stack`);
    const initiative = requireCajaIca().roles.flatMap(({ initiatives }) => initiatives).find((item) => item.id === id);
    assert.match(markup, new RegExp(`aria-label="Technologies used in ${initiative.title.en.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"`));
  }
});

test("initiative stacks sit left of their own content on desktop and below it on compact screens", () => {
  const initiativeRule = styles.match(/\.about-initiative\s*\{([^}]*)\}/)?.[1] ?? "";
  assert.match(initiativeRule, /grid-template-columns:\s*minmax\(10rem,\s*0\.42fr\)\s+minmax\(0,\s*1fr\)/);
  assert.match(initiativeRule, /grid-template-areas:\s*"technologies content"/);
  assert.match(styles.match(/\.about-initiative-content\s*\{([^}]*)\}/)?.[1] ?? "", /grid-area:\s*content/);
  assert.match(styles.match(/\.about-initiative-technologies-group\s*\{([^}]*)\}/)?.[1] ?? "", /grid-area:\s*technologies/);

  const compactRule = styles.match(/@media\s*\(max-width:\s*900px\)[\s\S]*?\.about-initiative\s*\{([^}]*)\}/)?.[1] ?? "";
  assert.match(compactRule, /grid-template-columns:\s*minmax\(0,\s*1fr\)/);
  assert.match(compactRule, /grid-template-areas:\s*"content"\s*"technologies"/);
  assert.equal(experienceData.labels.en.initiativeTechnologies, "Technologies used in");
  assert.equal(experienceData.labels.es.initiativeTechnologies, "Tecnologías usadas en");
});
