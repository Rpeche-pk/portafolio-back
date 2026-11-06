import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const homePage = await readFile(new URL("../index.html", import.meta.url), "utf8");
const behavior = await readFile(new URL("../assets/js/work-gallery.js", import.meta.url), "utf8");
const awsSkill = homePage.match(/<li class="skills-slide" data-skill-id="aws"[\s\S]*?<\/li>/)?.[0];
const certificationSection = homePage.match(/<section class="certifications"[\s\S]*?<\/section>/)?.[0];
const certificationFallback = certificationSection?.match(/<noscript[^>]*>([\s\S]*?)<\/noscript>/)?.[1] ?? "";
const workGalleryStyles = await readFile(new URL("../assets/css/work-gallery.css", import.meta.url), "utf8");
const skillsTrack = homePage.match(/<ul\b[^>]*id="skills-track"[^>]*>([\s\S]*?)<\/ul>/)?.[1] ?? "";
const skillsHelpText = homePage.match(/<p class="skills-help" id="skills-help"[^>]*>([\s\S]*?)<\/p>/)?.[1] ?? "";
const skillCards = [...skillsTrack.matchAll(/<li class="skills-slide"[^>]*data-skill-id="([^"]+)"[^>]*>([\s\S]*?)<\/li>/g)];

function skillCard(id) {
  return skillCards.find(([, skillId]) => skillId === id)?.[0] ?? null;
}

function skillCategory(id) {
  return skillCard(id)?.match(/\bdata-skill-category="([^"]+)"/)?.[1] ?? null;
}

function skillImageAttributes(id) {
  return [...(skillCard(id)?.matchAll(/<img\b([^>]*)>/g) ?? [])].map(([, attributes]) => attributes);
}

function skillImageSources(id) {
  return skillImageAttributes(id).map((attributes) => attributes.match(/\bsrc="([^"]+)"/)?.[1]).filter(Boolean);
}

test("AWS skill copy describes the linked course credentials without overstating certification", () => {
  assert.ok(awsSkill, "AWS skill card exists in the static source");
  assert.doesNotMatch(awsSkill, /two AWS certifications/i);
  assert.match(awsSkill, /The hero includes an introductory AWS course and the Alura Java and Spring Boot specialization\./);
  assert.match(awsSkill, /El hero incluye un curso introductorio de AWS y la especialización de Java y Spring Boot de Alura\./);
});

test("certification cards retain both approved AWS credentials and their exact validation states", () => {
  assert.ok(certificationSection, "certification section exists");
  assert.match(certificationSection, /<h2 id="certifications-title"[^>]*>Certifications<\/h2>/);
  assert.match(certificationSection, /<p class="certification-issuer" id="certification-issuer">Amazon Web Services<\/p>/);
  assert.match(certificationSection, /<noscript[^>]*><ul class="certification-list" aria-label="AWS certification examples">/);
  assert.match(certificationFallback, /AWS Certified Cloud Practitioner/);
  assert.match(certificationFallback, /AWS Certified AI Practitioner/);
  assert.equal((certificationFallback.match(/<li\b/g) ?? []).length, 2);
  assert.equal((certificationFallback.match(/<a\b/g) ?? []).length, 2);
  assert.match(certificationFallback, /Foundational/);
  assert.doesNotMatch(certificationFallback, /Credly URL pending|Falta la URL de Credly/);
  const cloudLink = certificationFallback.match(/<h3>AWS Certified Cloud Practitioner<\/h3>[\s\S]*?<a\b[\s\S]*?<\/a>/)?.[0] ?? "";
  assert.match(cloudLink, /href="https:\/\/www\.credly\.com\/badges\/139dafc0-fbbb-4bd1-a3ee-2d9e89107414\/public_url"/);
  assert.match(cloudLink, /target="_blank"/);
  assert.match(cloudLink, /rel="noopener noreferrer"/);
  assert.match(cloudLink, /aria-label="View AI credential for AWS Certified Cloud Practitioner \(opens in a new tab\)"/);
  assert.match(cloudLink, /View AI credential/);
  const aiLink = certificationFallback.match(/<h3>AWS Certified AI Practitioner<\/h3>[\s\S]*?<a\b[\s\S]*?<\/a>/)?.[0] ?? "";
  assert.match(aiLink, /View credential/);
  assert.match(aiLink, /rel="noopener noreferrer"/);
  assert.match(certificationFallback, /src="assets\/icon\/cloud-practitioner\.png"/);
  assert.match(certificationFallback, /src="assets\/icon\/ai-practitioner\.png"/);
});

test("Cloud keeps its own URL unset and temporarily references the AI credential", () => {
  const records = behavior.match(/certifications:\s*\[([\s\S]*?)\n\s*\],/)?.[1] ?? "";
  assert.match(records, /id: 'aws-cloud-practitioner', name: 'AWS Certified Cloud Practitioner', issuer: 'Amazon Web Services', level: 'Foundational', badgePath: 'assets\/icon\/cloud-practitioner\.png', validationUrl: null, temporaryValidationId: 'aws-ai-practitioner'/);
  assert.match(records, /id: 'aws-ai-practitioner', name: 'AWS Certified AI Practitioner', issuer: 'Amazon Web Services', level: 'Foundational', badgePath: 'assets\/icon\/ai-practitioner\.png', validationUrl: 'https:\/\/www\.credly\.com\/badges\/139dafc0-fbbb-4bd1-a3ee-2d9e89107414\/public_url'/);
  assert.match(behavior, /certificationAiViewLabel: 'View AI credential'/);
  assert.match(behavior, /certificationAiViewLabel: 'Ver credencial de IA'/);
  assert.match(behavior, /portfolioConfig\.certifications\.find\(\(candidate\) => candidate\.id === item\.temporaryValidationId\)/);
  assert.doesNotMatch(behavior, /certificationPendingLabel|Credly URL pending|Falta la URL de Credly/);
});

test("the skills carousel removes requested cards and preserves the remaining card order", () => {
  const ids = skillCards.map(([, id]) => id);
  assert.equal(skillCards.length, 20);
  for (const id of ["whatsapp-business", "dialogflow", "google-cloud-platform", "react", "mysql", "mcp"]) {
    assert.equal(skillCard(id), null, `${id} skill card is removed`);
  }
  assert.deepEqual(ids, [
    "java", "python", "spring-boot", "spring-ai", "spring-data-jpa", "spring-security", "nodejs",
    "aws-bedrock", "angular", "langchain", "sql-server", "postgresql", "langgraph", "mongodb",
    "jwt", "docker", "maven", "selenium-grid", "aws", "salesforce-marketing-cloud"
  ]);
  assert.deepEqual(skillCards.map(([markup]) => markup.match(/\baria-label="([^"]+)"/)?.[1]), [
    "Java, 1 of 20", "Python, 2 of 20", "Spring Boot, 3 of 20", "Spring AI, 4 of 20",
    "Spring Data JPA, 5 of 20", "Spring Security, 6 of 20", "Node.js, 7 of 20", "AWS Bedrock, 8 of 20",
    "Angular, 9 of 20", "LangChain, 10 of 20", "SQL Server, 11 of 20", "PostgreSQL, 12 of 20",
    "LangGraph, 13 of 20", "MongoDB, 14 of 20", "JWT, 15 of 20", "Docker, 16 of 20",
    "Maven, 17 of 20", "Selenium Grid, 18 of 20", "AWS, 19 of 20", "Salesforce Marketing Cloud, 20 of 20"
  ]);
  assert.doesNotMatch(skillsTrack, /WhatsApp Business|Dialogflow|Google Cloud Platform/);
});

test("the AI filter groups Python, Spring AI, Bedrock, LangChain, and LangGraph in both locales", () => {
  for (const id of ["python", "spring-ai", "aws-bedrock", "langchain", "langgraph"]) {
    assert.equal(skillCategory(id), "ai", `${id} belongs to the AI category`);
  }
  assert.match(behavior, /\{ id: 'ai', labelKey: 'skillsCategoryAi' \}/);
  assert.match(behavior, /skillsCategoryAi: 'AI'/);
  assert.match(behavior, /skillsCategoryAi: 'IA'/);
  for (const id of ["aws-bedrock", "langchain", "langgraph"]) {
    assert.match(skillCard(id), /data-en="[^"]+"/);
    assert.match(skillCard(id), /data-es="[^"]+"/);
  }
});

test("Spring AI, Spring Data JPA, and Spring Security use the shared Spring SVG", () => {
  for (const id of ["spring-ai", "spring-data-jpa", "spring-security"]) {
    assert.ok(skillImageSources(id).includes("assets/img/svg/spring-boot.svg"), `${id} uses the Spring logo`);
  }
  assert.equal(skillCategory("spring-ai"), "ai");
});

test("Angular uses the requested SVG in the frameworks category", () => {
  assert.equal(skillCategory("angular"), "frameworks");
  assert.deepEqual(skillImageSources("angular"), ["assets/img/svg/angular.svg"]);
});

test("MongoDB and AWS use the requested light and dark SVG variants", () => {
  assert.deepEqual(skillImageSources("mongodb"), ["assets/img/svg/MongoDB_light.svg", "assets/img/svg/MongoDB_dark.svg"]);
  assert.deepEqual(skillImageSources("aws"), ["assets/img/svg/Amazon Web Services_light.svg", "assets/img/svg/Amazon Web Services_dark.svg"]);
  for (const id of ["mongodb", "aws"]) {
    for (const attributes of skillImageAttributes(id)) {
      assert.match(attributes, /\bwidth="44"/);
      assert.match(attributes, /\bheight="44"/);
    }
  }
  assert.match(workGalleryStyles, /\.skills-icon-dark\s*\{\s*display:\s*none;/);
  assert.match(workGalleryStyles, /:root\[data-theme="dark"\]\s+\.skills-card-icon \.skills-icon-light\s*\{\s*display:\s*none;/);
  assert.match(workGalleryStyles, /:root\[data-theme="dark"\]\s+\.skills-card-icon \.skills-icon-dark\s*\{\s*display:\s*block;/);
});

test("Bedrock and LangChain/LangGraph use their requested SVGs", () => {
  assert.deepEqual(skillImageSources("aws-bedrock"), ["assets/img/svg/aws-amazon-bedrock.svg"]);
  assert.deepEqual(skillImageSources("langchain"), ["assets/img/svg/langgraph-langchain.svg"]);
  assert.deepEqual(skillImageSources("langgraph"), ["assets/img/svg/langgraph-langchain.svg"]);
});

test("Salesforce Marketing Cloud uses the Salesforce SVG", () => {
  assert.deepEqual(skillImageSources("salesforce-marketing-cloud"), ["assets/img/svg/salesforce.svg"]);
});

test("carousel help explains mouse dragging in English and Spanish", () => {
  assert.match(skillsHelpText, /drag with the mouse/);
  assert.match(behavior, /skillsHelp: 'Use the arrow controls, keyboard, swipe, or drag with the mouse to browse\.'/);
  assert.match(behavior, /skillsHelp: 'Usá los controles de flecha, el teclado, deslizá o arrastrá con el mouse para recorrer\.'/);
});

test("Python artwork scales up to compensate for transparent SVG margins", () => {
  assert.match(workGalleryStyles, /\.skills-card-icon img\[src\$="\/python\.svg"\]\s*\{\s*transform:\s*scale\(1\.5\);/);
});

test("LangChain and LangGraph icons gain contrast on dark cards", () => {
  assert.match(workGalleryStyles, /:root\[data-theme="dark"\]\s+\.skills-card-icon img\[src\$="\/langgraph-langchain\.svg"\]\s*\{\s*filter:\s*brightness\(0\)\s+invert\(1\);/);
});

test("milestone project actions use subtle pointer and press motion with reduced-motion support", () => {
  assert.match(workGalleryStyles, /\.about-project-action\s*\{[^}]*transition:\s*transform 160ms var\(--ease-out\)/);
  assert.match(workGalleryStyles, /\.about-project-action:active\s*\{\s*transform:\s*scale\((?:0)?\.97\);\s*\}/);
  assert.match(workGalleryStyles, /@media\s*\(hover:\s*hover\)\s*and\s*\(pointer:\s*fine\)\s*and\s*\(prefers-reduced-motion:\s*no-preference\)\s*\{[\s\S]*?\.about-project-action:hover\s*\{\s*transform:\s*translateY\(-2px\);\s*\}/);
  assert.match(workGalleryStyles, /@media\s*\(prefers-reduced-motion:\s*reduce\)[\s\S]*?\.about-project-action\s*\{\s*transition-duration:\s*100ms;\s*\}[\s\S]*?\.about-project-action:active\s*\{\s*transform:\s*scale\((?:0)?\.99\);\s*\}/);
});
