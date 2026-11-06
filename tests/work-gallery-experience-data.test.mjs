import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { runInNewContext } from "node:vm";
import test from "node:test";

const homePage = await readFile(new URL("../index.html", import.meta.url), "utf8");
const cvPage = await readFile(new URL("../cv.html", import.meta.url), "utf8");
const workGallery = await readFile(new URL("../assets/js/work-gallery.js", import.meta.url), "utf8");
let experienceData = null;
try {
  const source = await readFile(new URL("../assets/js/experience-data.js", import.meta.url), "utf8");
  const context = { window: {} };
  runInNewContext(source, context);
  experienceData = JSON.parse(JSON.stringify(context.window.portfolioExperienceData));
} catch (error) {
  if (error.code !== "ENOENT") throw error;
}

function experience(id) {
  return experienceData?.experiences?.find((record) => record.id === id);
}

test("experience records keep organization-specific collections under confirmed employers", () => {
  assert.ok(Array.isArray(experienceData?.experiences), "localized experience data module exists");
  if (!experienceData) return;
  assert.deepEqual(experienceData.experiences.map(({ id, projects }) => [id, Array.isArray(projects)]), [
    ["caja-ica", true],
    ["no-country", true],
    ["hospital-regional-de-ica", true]
  ]);
  assert.deepEqual(experience("no-country").projects.map(({ id }) => id), ["trucking", "cashier"]);
  assert.equal(experience("zephyr-cygnus"), undefined);
  assert.match(cvPage, /Freelance Programmer/);
  assert.match(workGallery, /id: 'zephyr-cygnus', title: 'Zephyr Cygnus'.*href: 'project-page\.html'/);
  assert.equal(experience("hospital-regional-de-ica").projects.length, 0);
});

test("No Country has the supplied bilingual employer period, duration, and summary", () => {
  const record = experience("no-country");
  assert.ok(record, "No Country record exists");
  if (!record) return;
  assert.equal(record.role.en, "Backend Developer");
  assert.equal(record.role.es, "Desarrollador Backend");
  assert.equal(record.period.en, "Oct. 2023 — Jan. 2024");
  assert.equal(record.period.es, "octubre de 2023 – enero de 2024");
  assert.deepEqual(record.duration, { en: "4 months", es: "4 meses" });
  assert.equal(record.summary.es, "Participé en equipos multiculturales desarrollando soluciones backend con Java y Spring Boot, colaborando en la resolución de retos técnicos y el cumplimiento de los plazos de entrega.");
});

test("Trucking and Cashier retain their exact project facts, technology lists, and real destinations", () => {
  const record = experience("no-country");
  assert.ok(record, "No Country record exists");
  if (!record) return;
  const [trucking, cashier] = record.projects;
  assert.equal(trucking.period.es, "noviembre – diciembre de 2023");
  assert.equal(trucking.mode.es, "remoto");
  assert.equal(trucking.description.es, "Lideré el desarrollo backend de un sistema de gestión de flotas mediante una arquitectura REST en capas, aplicando patrones de diseño y buenas prácticas. También diseñé y desarrollé un chatbot de WhatsApp con Baileys, integrado con la API REST construida en Spring Boot.");
  assert.deepEqual(trucking.technologies, ["Java 17", "Spring Boot", "Spring Mail", "Spring Security", "Spring Data JPA", "MapStruct", "JWT", "Springdoc OpenAPI", "Docker", "GitHub Actions", "Maven", "Git", "Baileys", "MySQL"]);
  assert.equal(trucking.deployment.es, "Servidor físico IBM X3550 M4");
  assert.equal(trucking.image, "assets/img/tech/trucking.png");
  assert.equal(trucking.projectUrl, "project-page-3.html");
  assert.equal(trucking.videoUrl, "https://www.youtube.com/watch?v=UziTMfvcI_I");

  assert.equal(cashier.period.es, "octubre – noviembre de 2023");
  assert.equal(cashier.description.es, "Desarrollé funcionalidades backend para una billetera digital mediante una arquitectura REST en capas, aplicando patrones de diseño y buenas prácticas.");
  assert.deepEqual(cashier.technologies, ["Java 17", "Spring Boot", "Spring Mail", "Spring Data JPA", "MapStruct", "Spring Security", "JWT", "Swagger", "Docker", "Firebase Cloud Storage", "Maven", "Git", "ZXing", "PostgreSQL"]);
  assert.equal(cashier.deployment.es, "Servidor físico IBM X3550 M4");
  assert.equal(cashier.image, "assets/img/nature/Banner.png");
  assert.equal(cashier.projectUrl, "project-page-2.html");
  assert.equal(cashier.videoUrl, "https://lnkd.in/eG2f7kgk");
});

test("experience card exposes one No Country timeline node with an internal projects outlet", () => {
  assert.equal((homePage.match(/data-about-experience-id="no-country"/g) ?? []).length, 1);
  assert.match(homePage, /data-about-experience-id="no-country"[^>]*data-about-record/);
  assert.match(homePage, /data-about-projects="no-country"/);
  assert.equal((homePage.match(/<li class="about-timeline-item"[^>]*\bdata-about-record\b/g) ?? []).length, 12);
  assert.match(homePage, /data-about-count="experience">3</);
  assert.doesNotMatch(homePage, /Nov\. 2023 — Present/);
  assert.doesNotMatch(cvPage, /Nov\. 2023 - Present/);
});

test("both locales provide truthful project actions and bilingual copy without LinkedIn leftovers", () => {
  assert.ok(experienceData?.labels?.en && experienceData?.labels?.es, "project UI labels are localized");
  if (!experienceData) return;
  assert.equal(experienceData.labels.en.viewProject, "View project");
  assert.equal(experienceData.labels.es.viewProject, "Ver proyecto");
  assert.equal(experienceData.labels.en.watchVideo, "Watch video");
  assert.equal(experienceData.labels.es.watchVideo, "Ver vídeo");
  assert.equal(experience("no-country").projects[0].description.en.length > 0, true);
  assert.equal(experience("no-country").projects[1].description.en.length > 0, true);
  const noCountryMarkup = homePage.slice(homePage.indexOf('data-about-experience-id="no-country"'), homePage.indexOf('data-about-experience-id="no-country"') + 6000);
  assert.doesNotMatch(noCountryMarkup, /Vista en miniatura|y 4 aptitudes más|… más/);
});
