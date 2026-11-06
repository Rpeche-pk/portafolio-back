import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const repositoryRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const pageShell = JSON.parse(await readFile(join(repositoryRoot, "templates/page-shell.json"), "utf8"));
const navbarTemplate = await readFile(join(repositoryRoot, "templates/work-gallery-navbar.html"), "utf8");
const workGalleryScript = await readFile(join(repositoryRoot, "assets/js/work-gallery.js"), "utf8");
const projects = [...workGalleryScript.matchAll(/\{ id: '([^']+)', title: '([^']+)', image: '([^']+)', href: '([^']+)'/g)]
  .map(([, id, title, image, href]) => ({ id, title, image, href }));
const detailRoutes = [
  ["ai-assistant", "project-page-5.html"],
  ["zephyr-cygnus", "project-page.html"],
  ["trucking", "project-page-3.html"],
  ["maipevi-bot", "project-page-4.html"],
  ["cashier", "project-page-2.html"],
  ["devbot-supermarket", "project-page-1.html"],
];
const internalNavigation = {
  home: "index.html#home",
  projects: "index.html#projects",
  skills: "index.html#skills",
  about: "index.html#about",
  contact: "index.html#contact",
};
const detailContent = {
  "project-page.html": {
    title: "Zephyr Cygnus WA",
    images: ["assets/img/tech/zephyr.png", "assets/img/mockup/proto.png", "assets/img/mockup/proto5.png", "assets/img/mockup/proto-2.png"],
    links: ["https://youtube.com/shorts/Y6HE0hWtwjQ?feature=share"],
    technologies: ["Java 17", "Spring Boot", "Spring Data JPA", "Spring Security", "Spring Mail", "Docker", "Firestorage", "Lombok", "Maven", "Zxing", "PostgreSQL", "JWT", "Whiskeysockets/Baileys", "NodeJs 18", "WhatsApp Business"],
  },
  "project-page-1.html": {
    title: "Proyecto Tesis Maivibot",
    images: ["assets/img/tech/devbot.png"],
    links: ["https://github.com/Rpeche-pk/maivi-bot-tesis.git", "https://github.com/Rpeche-pk/micro-supermarket.git"],
    technologies: ["BuilderBot", "Node.js", "GPT-4o mini", "WhatsApp", "Telegram", "Instagram", "Java 17", "Spring Boot", "MongoDB Atlas", "Python", "Selenium", "Selenium Grid", "Google Cloud"],
  },
  "project-page-2.html": {
    title: 'digital wallet "cashier"',
    images: ["assets/img/nature/Banner.png"],
    links: ["https://youtu.be/HhMpTuKcwdA?si=xswrr048GnvEkTyE", "https://cashier-app-23.netlify.app/"],
    technologies: ["Java 17", "Spring Boot", "Spring Data JPA", "Spring Security", "Spring Mail", "Docker", "Deploy: IBM X3550 M4", "Lombok", "Maven", "Zxing", "Fl0: PostgreSQL", "JWT", "Firestorage", "Angular", "Deploy: Netlify"],
  },
  "project-page-3.html": {
    title: "Trucking: Gestión Eficiente de Flotas con Interacción en WhatsApp",
    images: ["assets/img/tech/trucking.png"],
    links: ["https://youtu.be/UziTMfvcI_I?si=1UnvCDU5zI0jnLUk", "https://s12-14-t-java-react.vercel.app/"],
    technologies: ["Java 17", "Spring Boot", "Spring Data JPA", "Spring Security", "Spring Mail", "Docker", "Mapstruct", "Lombok", "Maven", "Whiskeysockets/Baileys", "MYSQL", "JWT", "React", "Cloudinary", "Deploy: Vercel"],
  },
  "project-page-4.html": {
    title: "Maipevi Bot",
    images: ["assets/img/tech/maipevi.png"],
    links: ["https://youtube.com/shorts/dmyQ0JASXjg?feature=share", "https://wa.link/7mj2uk"],
    technologies: ["Java 17", "Spring Boot", "Spring Data JPA", "Spring Security", "Whiskeysockets/Baileys", "MYSQL", "NodeJs", "WhatsApp Business"],
  },
  "project-page-5.html": {
    title: "OCR",
    images: ["assets/img/tech/ocr.png"],
    links: [],
    technologies: ["Java 25", "Spring Boot", "Spring AI", "Mockito", "SonarQube", "OWASP Dependency-Check", "AWS Textract", "Amazon SNS", "Amazon SQS", "AWS IAM Roles Anywhere", "Amazon Bedrock"],
  },
};

 test("six project cards resolve to the existing detail routes", () => {
  assert.deepEqual(projects.map(({ id, href }) => [id, href]), detailRoutes);
  for (const [, href] of detailRoutes) {
    assert.ok(existsSync(join(repositoryRoot, href)), `${href} exists`);
  }

  const renderer = workGalleryScript.slice(workGalleryScript.indexOf("function renderProjects"), workGalleryScript.indexOf("function renderProofBadges"));
  assert.match(renderer, /media\.href = project\.href/);
  assert.match(renderer, /titleLink\.href = project\.href/);
  assert.match(renderer, /detailsLink\.href = project\.href/);
  assert.doesNotMatch(renderer, /(?:media|titleLink|detailsLink)\.target\s*=/);
});

test("all six project routes use the Work Gallery shell and real home-section destinations", async () => {
  for (const [, pageName] of detailRoutes) {
    const config = pageShell[pageName];
    const html = await readFile(join(repositoryRoot, pageName), "utf8");

    assert.equal(config.navbarTemplate, "work-gallery-navbar.html", `${pageName} navbar`);
    assert.equal(config.footerTemplate, "work-gallery-footer.html", `${pageName} footer`);
    assert.deepEqual(config.activeLinks, ["nav-project"], `${pageName} active navigation`);
    assert.deepEqual(config.navigation, internalNavigation, `${pageName} navigation destinations`);
    assert.equal(config.contactHref, "index.html#contact", `${pageName} contact destination`);
    assert.match(html, /<!-- shared-navbar -->/);
    assert.match(html, /<!-- shared-footer -->/);
    assert.match(html, /assets\/css\/work-gallery\.css/);
    assert.match(html, /assets\/js\/work-gallery\.js/);
    assert.match(html, /assets\/js\/language\.js/);
    assert.match(html, /data-theme="light"/);
    assert.match(html, /data-bs-theme="light"/);
    assert.match(html, /localStorage\.getItem\(['"]portfolio-theme['"]\)/);
  }
});

test("project detail layouts are accessible while retaining titles, media, links, and technologies", async () => {
  for (const [pageName, expected] of Object.entries(detailContent)) {
    const html = await readFile(join(repositoryRoot, pageName), "utf8");
    const title = html.match(/<h1\b[^>]*id="project-title"[^>]*>([\s\S]*?)<\/h1>/)?.[1]?.trim();
    const images = [...html.matchAll(/<img\b[^>]*\bsrc="([^"]+)"/gi)].map(([, src]) => src);
    const links = [...html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/gi)]
      .map(([, href]) => href)
      .filter((href) => /^https?:\/\//i.test(href));
    const technologies = [...html.matchAll(/<li\b[^>]*>([\s\S]*?)<\/li>/gi)]
      .map(([, item]) => item.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim());

    assert.ok(html.includes('<section class="portfolio-block project project-detail" aria-labelledby="project-title">'), `${pageName} project landmark`);
    assert.equal((html.match(/<h1\b/g) ?? []).length, 1, `${pageName} has one page title`);
    assert.equal(title, expected.title, `${pageName} title`);
    assert.match(html, /class="row project-detail-grid"/, `${pageName} detail layout`);
    assert.match(html, /class="col-12 col-md-6 offset-md-1 info project-detail-copy"/, `${pageName} description panel`);
    assert.match(html, /class="col-12 col-md-3 offset-md-1 meta project-detail-tech"/, `${pageName} technology panel`);
    assert.match(html, /<img class="project-detail-cover"[^>]*\balt=""/, `${pageName} decorative cover has empty alt`);
    assert.deepEqual(images, expected.images, `${pageName} media assets`);
    assert.deepEqual(links, expected.links, `${pageName} outbound URLs`);
    assert.deepEqual(technologies, expected.technologies, `${pageName} technology list`);
  }
});

test("OCR has no invented link or legacy agent copy; MaiviBot repositories open safely", async () => {
  const ocr = await readFile(join(repositoryRoot, "project-page-5.html"), "utf8");
  assert.doesNotMatch(ocr, /\bMCP\b|\bRAG\b|AI Assistant|Multi-LLM|Vector Databases/i);
  assert.doesNotMatch(ocr, /<a\b/);
  const maivi = await readFile(join(repositoryRoot, "project-page-1.html"), "utf8");
  const links = [...maivi.matchAll(/<a\b[^>]*>/g)].map(([tag]) => tag);
  assert.equal(links.length, 2);
  for (const tag of links) {
    assert.match(tag, /target="_blank"/);
    assert.match(tag, /rel="noopener noreferrer"/);
  }
});

test("the shared Work Gallery navbar supports both project localization and current-page semantics", () => {
  assert.match(navbarTemplate, /<nav\b[^>]*id="flags"/);
  assert.equal([...navbarTemplate.matchAll(/data-nav="projects"[^>]*\{\{CURRENT_PROJECTS\}\}/g)].length, 2);
  assert.match(navbarTemplate, /data-language="es"/);
  assert.match(navbarTemplate, /data-language="en"/);
});

test("Zephyr gallery screenshots have descriptive localized alternatives", async () => {
  const html = await readFile(join(repositoryRoot, "project-page.html"), "utf8");
  const images = [...html.matchAll(/<img\b[^>]*class="img-fluid"[^>]*>/gi)].map(([tag]) => tag);
  const expected = [
    {
      src: "assets/img/mockup/proto.png",
      key: "zephyrCatalogChatAlt",
      en: "Zephyr Cygnus catalog screen beside a WhatsApp order conversation on two phones.",
      es: "Pantallas del catálogo de Zephyr Cygnus y de un pedido por WhatsApp en dos teléfonos.",
    },
    {
      src: "assets/img/mockup/proto5.png",
      key: "zephyrPromoChatCatalogAlt",
      en: "Zephyr Cygnus promotional menu and QR screen beside its mobile catalog and WhatsApp order chat.",
      es: "Pantalla promocional de Zephyr Cygnus con menú y código QR junto al catálogo móvil y al chat de pedido por WhatsApp.",
    },
    {
      src: "assets/img/mockup/proto-2.png",
      key: "zephyrMobileCatalogAlt",
      en: "Zephyr Cygnus mobile catalog showing products and a message button.",
      es: "Catálogo móvil de Zephyr Cygnus con productos y un botón para enviar un mensaje.",
    },
  ];

  assert.equal(images.length, expected.length, "gallery image count");
  expected.forEach((item, index) => {
    assert.ok(images[index].includes(`src="${item.src}"`), `gallery image ${index + 1} source`);
    assert.ok(images[index].includes(`alt="${item.en}"`), `gallery image ${index + 1} English fallback`);
    assert.ok(images[index].includes(`data-i18n-alt="${item.key}"`), `gallery image ${index + 1} localization key`);
    assert.equal(workGalleryScript.split(`${item.key}: '${item.en}'`).length - 1, 1, `gallery image ${index + 1} English translation`);
    assert.equal(workGalleryScript.split(`${item.key}: '${item.es}'`).length - 1, 1, `gallery image ${index + 1} Spanish translation`);
  });
});
