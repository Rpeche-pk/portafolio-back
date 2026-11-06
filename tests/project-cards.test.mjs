import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { runInNewContext } from "node:vm";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const homepage = await readFile(join(root, "index.html"), "utf8");
const script = await readFile(join(root, "assets/js/work-gallery.js"), "utf8");
const styles = await readFile(join(root, "assets/css/work-gallery.css"), "utf8");
const projectEntries = [...script.matchAll(/\{ id: '([^']+)', title: '([^']+)', image: '([^']+)', href: '([^']+)', demoUrl: (null|'[^']+')/g)]
  .map(([, id, title, image, href, demo]) => ({ id, title, image, href, demoUrl: demo === "null" ? null : demo.slice(1, -1) }));

const expectedProjects = [
  ["ai-assistant", "OCR", "assets/img/tech/ocr.png", "project-page-5.html", null],
  ["zephyr-cygnus", "Zephyr Cygnus", "assets/img/tech/zephyr.png", "project-page.html", "https://youtube.com/shorts/Y6HE0hWtwjQ?feature=share"],
  ["trucking", "Trucking", "assets/img/tech/trucking.png", "project-page-3.html", "https://youtu.be/UziTMfvcI_I?si=1UnvCDU5zI0jnLUk"],
  ["maipevi-bot", "Maipevi Bot", "assets/img/tech/maipevi.png", "project-page-4.html", "https://youtube.com/shorts/dmyQ0JASXjg?feature=share"],
  ["cashier", 'Digital Wallet "Cashier"', "assets/img/nature/Banner.png", "project-page-2.html", "https://youtu.be/HhMpTuKcwdA?si=xswrr048GnvEkTyE"],
  ["devbot-supermarket", "Proyecto Tesis Maivibot", "assets/img/tech/devbot.png", "project-page-1.html", null],
];

test("homepage renders six sourced project cards with valid detail/image paths", () => {
  assert.match(homepage, /<div class="project-list" id="project-list"><\/div>/);
  assert.match(homepage, /<noscript[^>]*>[\s\S]*href="project-page-5.html">OCR<\/a>[\s\S]*href="project-page-1.html">Proyecto Tesis Maivibot<\/a>[\s\S]*<\/noscript>/);
  assert.equal(projectEntries.length, expectedProjects.length);
  assert.deepEqual(projectEntries.map(({ id, title, image, href }) => [id, title, image, href]),
    expectedProjects.map(([id, title, image, href]) => [id, title, image, href]));

  for (const project of projectEntries) {
    assert.ok(existsSync(join(root, project.image)), `${project.title} image exists`);
    assert.ok(existsSync(join(root, project.href)), `${project.title} detail page exists`);
  }
  assert.match(script, /card\.className = 'project-card'/);
  assert.match(script, /detailsLink\.href = project\.href/);
  assert.match(styles, /\.project-card\s*\{/);
});

// Run the production entry point with only its project outlet and language controls.
function renderGallery() {
  class Node {
    children = [];
    dataset = {};
    attributes = {};
    listeners = {};
    classList = { add() {}, remove() {}, toggle() {} };
    constructor(tagName = "div") { this.tagName = tagName; }
    append(...nodes) { this.children.push(...nodes); }
    appendChild(node) { this.append(node); }
    replaceChildren(...nodes) { this.children = nodes; }
    setAttribute(name, value) { this.attributes[name] = value; }
    querySelectorAll() { return []; }
    addEventListener(name, callback) { this.listeners[name] = callback; }
  }
  const outlet = new Node();
  const languageButtons = ["en", "es"].map((language) => {
    const button = new Node("button");
    button.dataset.language = language;
    return button;
  });
  const document = {
    documentElement: new Node("html"),
    getElementById: (id) => id === "project-list" ? outlet : null,
    querySelector: () => null,
    querySelectorAll: (selector) => selector === "[data-language]" ? languageButtons : [],
    createElement: (tag) => new Node(tag),
    createElementNS: (_, tag) => new Node(tag),
    addEventListener() {},
  };
  const window = {
    localStorage: { getItem: () => null, setItem() {} },
    requestAnimationFrame: () => 1, cancelAnimationFrame() {},
    setTimeout: () => 1, clearTimeout() {}, addEventListener() {},
    location: { hash: "" },
    getComputedStyle: () => ({ getPropertyValue: () => "" }),
  };
  runInNewContext(script, { document, window });
  return {
    cards: () => outlet.children,
    language: (language) => languageButtons.find((button) => button.dataset.language === language).listeners.click(),
  };
}

function descendants(node) {
  return node.children.flatMap((child) => [child, ...descendants(child)]);
}

const requestedCards = [
  {
    id: "ai-assistant", title: "OCR", image: "assets/img/tech/ocr.png", href: "project-page-5.html",
    technologies: ["Java 25", "Spring Boot", "Spring AI", "AWS Textract", "AWS Bedrock"],
    description: {
      en: "OCR component for Logistics that extracts and structures utility receipt data with AWS Textract and Amazon Bedrock, reducing manual lookup in the core application.",
      es: "Componente OCR para Logística que extrae y estructura datos de recibos de servicios con AWS Textract y Amazon Bedrock, reduciendo la búsqueda manual en el aplicativo core.",
    },
  },
  {
    id: "devbot-supermarket", title: "Proyecto Tesis Maivibot", image: "assets/img/tech/devbot.png", href: "project-page-1.html",
    technologies: ["Builder Bot", "Node.js", "GPT-4o mini", "Java 17", "Spring Boot", "MongoDB Atlas", "Python", "Selenium Grid", "Google Cloud"],
    description: {
      en: "Thesis chatbot combining generative AI and Python web scraping to find grocery products at Tottus, Plaza Vea, and Metro in Ica, improving search efficiency by 77%.",
      es: "Chatbot de tesis que combina IA generativa y web scraping con Python para buscar abarrotes de Tottus, Plaza Vea y Metro en Ica, mejorando la eficiencia de búsqueda en un 77%.",
    },
  },
];

for (const expected of requestedCards) {
  test(`${expected.title} renders bilingual copy, supplied image and scoped detail actions without changing its route`, () => {
    const gallery = renderGallery();
    for (const language of ["en", "es", "en"]) {
      gallery.language(language);
      const card = gallery.cards().find((node) => node.dataset.projectId === expected.id);
      const nodes = descendants(card);
      assert.equal(nodes.find((node) => node.tagName === "h3").children[0].textContent, expected.title);
      assert.equal(nodes.find((node) => node.tagName === "p").textContent, expected.description[language]);
      assert.equal(nodes.find((node) => node.tagName === "img").src, expected.image);
      const technologies = nodes.find((node) => node.className === "tech-list");
      assert.deepEqual(technologies.children.map((node) => node.textContent), expected.technologies);
      assert.equal(technologies.attributes["aria-label"], language === "es" ? "Tecnologías" : "Technologies");
      const links = nodes.filter((node) => node.tagName === "a");
      assert.equal(links.length, 3, "media, title and details only; no invented demo/repository");
      for (const link of links) assert.equal(link.href, expected.href);
      const label = language === "es" ? "Detalle" : "Details";
      assert.equal(nodes.find((node) => node.className === "project-view-action").children[1].textContent, label);
      assert.equal(nodes.find((node) => node.dataset.projectAction === "details").children[0].textContent, label);
      const prefix = language === "es" ? "Ver detalles de" : "View details for";
      assert.equal(links[0].attributes["aria-label"], `${prefix} ${expected.title}`);
      const footerPrefix = language === "es" ? "Ver detalles de" : "Open details for";
      assert.equal(links[2].attributes["aria-label"], `${footerPrefix} ${expected.title}`);
    }
  });
}

test("unrelated cards retain plural Spanish detail labels and their existing actions", () => {
  const gallery = renderGallery();
  gallery.language("es");
  for (const expected of expectedProjects.filter(([id]) => !requestedCards.some((card) => card.id === id))) {
    const card = gallery.cards().find((node) => node.dataset.projectId === expected[0]);
    const nodes = descendants(card);
    assert.equal(nodes.find((node) => node.className === "project-view-action").children[1].textContent, "Detalles");
    const details = nodes.find((node) => node.dataset.projectAction === "details");
    assert.equal(details.children[0].textContent, "Detalles");
    assert.equal(details.href, expected[3]);
    assert.equal(nodes.find((node) => node.dataset.projectAction === "demo").href, expected[4]);
  }
});

test("only distinct real demos are rendered as external actions", () => {
  const demos = projectEntries.filter((project) => project.demoUrl);
  assert.deepEqual(projectEntries.map((project) => project.demoUrl), expectedProjects.map((project) => project[4]));
  assert.equal(demos.length, 4);
  assert.equal(new Set(demos.map((project) => project.demoUrl)).size, demos.length);
  for (const project of demos) {
    assert.equal(new URL(project.demoUrl).protocol, "https:");
    assert.notEqual(project.demoUrl, project.href, `${project.title} demo is distinct from its detail page`);
  }
  assert.match(script, /if \(project\.demoUrl\)/);
  assert.match(script, /demoLink\.rel = 'noopener noreferrer'/);
});
