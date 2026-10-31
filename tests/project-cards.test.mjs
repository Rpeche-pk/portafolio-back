import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const homepage = await readFile(join(root, "index.html"), "utf8");
const styles = await readFile(join(root, "assets/css/project-cards.css"), "utf8").catch(() => "");
const projectDetailPages = [
  "project-page-5.html",
  "project-page.html",
  "project-page-3.html",
  "project-page-4.html",
  "project-page-2.html",
  "project-page-1.html",
];
const projectDetails = await Promise.all(projectDetailPages.map((path) => readFile(join(root, path), "utf8")));
const cards = [...homepage.matchAll(/<article class="project-grid-item project-card card">([\s\S]*?)<\/article>/g)]
  .map((match) => match[1]);

const technologySourcePatterns = {
  "Java 17": /Java 17/i,
  "Spring Boot": /Spring Boot/i,
  "PostgreSQL": /PostgreSQL/i,
  "Node.js 18": /NodeJs 18/i,
  "Node.js": /NodeJs/i,
  Baileys: /Baileys/i,
  "WhatsApp Business": /WhatsApp Business/i,
  MySQL: /MYSQL/i,
  React: /React/i,
  Docker: /Docker/i,
  Angular: /Angular/i,
  JWT: /JWT/i,
  Python: /Python/i,
  "Selenium Grid": /Selenium Grid/i,
  "Google Cloud Platform": /Google Cloud Platform/i,
  Dialogflow: /Dialogflow/i,
  MongoDB: /MongoDb/i,
};

const expectedTechnologies = [
  ["Java 17", "Spring Boot"],
  ["Java 17", "Spring Boot", "PostgreSQL", "Node.js 18", "Baileys", "WhatsApp Business"],
  ["Java 17", "Spring Boot", "MySQL", "React", "Baileys", "Docker"],
  ["Java 17", "Spring Boot", "MySQL", "Node.js", "Baileys", "WhatsApp Business"],
  ["Java 17", "Spring Boot", "PostgreSQL", "Angular", "JWT", "Docker"],
  ["Python", "Selenium Grid", "Node.js", "Google Cloud Platform", "Dialogflow", "MongoDB"],
];

test("project section loads its scoped stylesheet and preserves six card contents and destinations", () => {
  assert.match(homepage, /href="assets\/css\/project-cards\.css"/);
  assert.equal(cards.length, 6);
  assert.deepEqual(cards.map((card) => card.match(/<h4 class="card-title">([\s\S]*?)<\/h4>/)?.[1]), [
    "<strong>AI Assistant</strong>",
    "<strong>Zephyr Cygnus</strong>",
    "<strong>Trucking</strong>",
    "<strong>Maipevi Bot</strong>",
    "<strong>Digital Wallet \"Cashier\"</strong>",
    "<strong>DevBot Supermarket</strong>",
  ]);
  assert.deepEqual(cards.map((card) => card.match(/<img[^>]*src="([^"]+)"/)?.[1]), [
    "assets/img/tech/spring-ai.jpg",
    "assets/img/tech/zephyr.png",
    "assets/img/tech/trucking.png",
    "assets/img/tech/maipevi.png",
    "assets/img/nature/Banner.png",
    "assets/img/tech/devbot.png",
  ]);
  assert.deepEqual(cards.map((card) => card.match(/<a href="([^"]+)" class="project-card-image-link"/)?.[1]), [
    "project-page-5.html",
    "project-page.html",
    "project-page-3.html",
    "project-page-4.html",
    "project-page-2.html",
    "project-page-1.html",
  ]);
  assert.deepEqual(cards.map((card) => card.match(/class="card-text" data-key="home" data-value="([^"]+)"/)?.[1]), [
    "home-project-six",
    "home-project-one",
    "home-project-four",
    "home-project-five",
    "home-project-two",
    "home-project-three",
  ]);
  assert.equal(cards.filter((card) => /class="d-flex project-card-author"/.test(card)).length, 6);
  assert.equal(cards.filter((card) => /href="https:\/\/www\.linkedin\.com\/in\/luis-peche\//.test(card)).length, 6);
  assert.equal(cards.filter((card) => /class="badge bg-primary"/.test(card)).length, 6);
});

test("project technology tags are grounded in project detail references", () => {
  assert.equal(cards.filter((card) => /class="project-technology-list"/.test(card)).length, 6);
  for (const [index, technologies] of expectedTechnologies.entries()) {
    for (const technology of technologies) {
      assert.ok(cards[index].includes(`>${technology}</li>`), `card ${index + 1} includes sourced ${technology}`);
      assert.match(
        projectDetails[index],
        technologySourcePatterns[technology],
        `${technology} is present in ${projectDetailPages[index]}`,
      );
    }
  }
  assert.match(cards[0], /Java 17[\s\S]*Spring Boot/);
  assert.match(cards[0], /data-value="home-project-six">Intelligent REST API powered by Spring Boot/);
});

test("project cards align without clipping content or overflowing responsive widths", () => {
  assert.match(styles, /\.project-grid\s*\{[^}]*display:\s*grid[^}]*grid-auto-rows:\s*1fr/s);
  assert.match(styles, /grid-template-columns:\s*repeat\(3,\s*minmax\(0,\s*1fr\)\)/);
  assert.match(styles, /grid-template-columns:\s*repeat\(2,\s*minmax\(0,\s*1fr\)\)/);
  assert.match(styles, /grid-template-columns:\s*minmax\(0,\s*1fr\)/);
  assert.match(styles, /\.project-card\s*\{[^}]*display:\s*flex[^}]*flex-direction:\s*column[^}]*height:\s*100%/s);
  assert.match(styles, /\.project-card-author\s*\{[^}]*margin-top:\s*auto/s);
  assert.match(styles, /\.project-card \.card-title\s*\{[^}]*min-height:\s*3\.5rem/s);
  assert.match(styles, /\.project-card-image\s*\{[^}]*height:\s*200px[^}]*object-fit:\s*contain/s);
  assert.match(styles, /\.project-card-meta\s*\{[^}]*min-height:\s*7\.5rem/s);
  assert.match(styles, /\.project-technology-list\s*\{[^}]*display:\s*flex[^}]*flex-wrap:\s*wrap[^}]*gap:/s);
  assert.match(styles, /\.project-grid-item\s*\{[^}]*min-width:\s*0/s);
  assert.match(styles, /\.project-technology\s*\{[^}]*overflow-wrap:\s*anywhere/s);
  assert.doesNotMatch(styles, /\.project-card-(?:title|description)\s*\{[^}]*height:/s);
  assert.doesNotMatch(styles, /overflow-x:\s*(?:auto|scroll)/);
});
