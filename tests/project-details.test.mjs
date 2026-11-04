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
    title: "Dev BOT SUPERMARKET",
    images: ["assets/img/tech/devbot.png"],
    links: ["https://drive.google.com/file/d/1mu4XKJmX1erhrPCWHEUYw6Vbc105cOXz/view?usp=sharing"],
    technologies: ["Python", "Selenium", "Selenium Grid", "Scheduled", "NodeJs", "Docker", "Google Cloud Platform", "Dialogflow", "MongoDb", "Facebook Messenger"],
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
    title: "AI Assistant",
    images: ["assets/img/tech/spring-ai.jpg"],
    links: ["https://docs.spring.io/spring-ai/reference/api/mcp/mcp-overview.html"],
    technologies: ["Spring AI Framework", "Java 17/21", "Spring Boot 3.x", "Spring Security", "MCP (Model Context Protocol)", "Vector Databases (Chroma/Pinecone)", "OpenAI API / Azure OpenAI", "RAG Implementation", "Tool Calling & Function Calling", "Agentic Pattern Implementation", "Multi-modal LLM Integration", "Retrieval Augmented Generation", "Intelligent Workflow Orchestration"],
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

test("the shared Work Gallery navbar supports both project localization and current-page semantics", () => {
  assert.match(navbarTemplate, /<nav\b[^>]*id="flags"/);
  assert.equal([...navbarTemplate.matchAll(/data-nav="projects"[^>]*\{\{CURRENT_PROJECTS\}\}/g)].length, 2);
  assert.match(navbarTemplate, /data-language="es"/);
  assert.match(navbarTemplate, /data-language="en"/);
});
