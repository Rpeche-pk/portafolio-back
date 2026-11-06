import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { runInNewContext } from "node:vm";
import test from "node:test";

const repositoryRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const languageScript = await readFile(join(repositoryRoot, "assets", "js", "language.js"), "utf8");
const homepageHtml = await readFile(join(repositoryRoot, "index.html"), "utf8");
const homepageNavbar = await readFile(join(repositoryRoot, "templates/work-gallery-navbar.html"), "utf8");
const fifthProjectHtml = await readFile(join(repositoryRoot, "project-page-5.html"), "utf8");
const spanishCatalog = JSON.parse(
  await readFile(join(repositoryRoot, "assets", "js", "languages", "es.json"), "utf8"),
);
const englishCatalog = JSON.parse(
  await readFile(join(repositoryRoot, "assets", "js", "languages", "en.json"), "utf8"),
);

function createHarness({ fetchResponse, savedLanguage = null, elements } = {}) {
  const storage = new Map(savedLanguage ? [["language", savedLanguage]] : []);
  const translatedText = {
    dataset: { key: "navbar", value: "nav-home" },
    innerHTML: "Home",
  };
  const languageOption = { dataset: { language: "es" } };
  let clickHandler;
  let loadHandler;
  let requestedUrl;

  const flags = {
    addEventListener: (eventName, handler) => {
      if (eventName === "click") clickHandler = handler;
    },
    contains: (element) => element === languageOption,
  };

  runInNewContext(languageScript, {
    URL,
    console: { error() {}, log() {} },
    document: {
      currentScript: { src: "https://portfolio.test/subpath/assets/js/language.js" },
      getElementById: (id) => id === "flags" ? flags : null,
      querySelectorAll: () => elements ?? [translatedText],
    },
    fetch: async (url) => {
      requestedUrl = String(url);
      return fetchResponse;
    },
    localStorage: {
      getItem: (key) => storage.get(key) ?? null,
      setItem: (key, value) => storage.set(key, value),
      removeItem: (key) => storage.delete(key),
    },
    Swal: {
      mixin: () => ({ fire() {} }),
      stopTimer() {},
      resumeTimer() {},
    },
    window: {
      addEventListener: (eventName, handler) => {
        if (eventName === "load") loadHandler = handler;
      },
      alerta() {},
    },
    alerta() {},
  });

  return {
    click: (target) => clickHandler({ target }),
    load: () => loadHandler(),
    languageOption,
    requestedUrl: () => requestedUrl,
    storage,
    translatedText,
  };
}

test("clicking a nested flag image loads the matching translation from the script-relative path", async () => {
  const harness = createHarness({
    fetchResponse: { ok: true, json: async () => ({ navbar: { "nav-home": "Inicio" } }) },
  });
  const image = {
    closest: (selector) => selector === "[data-language]" ? harness.languageOption : null,
  };

  await harness.click(image);

  assert.equal(
    harness.requestedUrl(),
    "https://portfolio.test/subpath/assets/js/languages/es.json",
  );
  assert.equal(harness.translatedText.innerHTML, "Inicio");
  assert.equal(harness.storage.get("language"), "es");
});

test("clicks outside a language option do nothing", async () => {
  const harness = createHarness({
    fetchResponse: { ok: true, json: async () => ({ navbar: { "nav-home": "Inicio" } }) },
  });

  await harness.click({ closest: () => null });

  assert.equal(harness.requestedUrl(), undefined);
  assert.equal(harness.translatedText.innerHTML, "Home");
  assert.equal(harness.storage.has("language"), false);
});

test("failed language requests do not persist the requested language or replace page text", async () => {
  const harness = createHarness({
    fetchResponse: { ok: false, status: 503, statusText: "Unavailable" },
  });
  const target = {
    closest: (selector) => selector === "[data-language]" ? harness.languageOption : null,
  };

  await harness.click(target);

  assert.equal(
    harness.requestedUrl(),
    "https://portfolio.test/subpath/assets/js/languages/es.json",
  );
  assert.equal(harness.storage.has("language"), false);
  assert.equal(harness.translatedText.innerHTML, "Home");
});

test("unsupported saved languages fall back to English", async () => {
  const harness = createHarness({
    savedLanguage: "fr",
    fetchResponse: { ok: true, json: async () => ({ navbar: { "nav-home": "Home" } }) },
  });

  await harness.load();

  assert.equal(
    harness.requestedUrl(),
    "https://portfolio.test/subpath/assets/js/languages/en.json",
  );
});

test("project five uses its own equivalent description label key", () => {
  const descriptionHeading = fifthProjectHtml.match(
    /<h2[^>]*data-key="proyects"[^>]*data-value="([^"]+)"/,
  );

  assert.ok(descriptionHeading);
  assert.equal(descriptionHeading[1], "proyects-five-description");
  assert.equal(
    spanishCatalog.proyects[descriptionHeading[1]],
    spanishCatalog.proyects["proyects-four-description"],
  );
  assert.equal(
    englishCatalog.proyects[descriptionHeading[1]],
    englishCatalog.proyects["proyects-four-description"],
  );
});

test("OCR and MaiviBot detail content switches through both public language controls", async () => {
  for (const [route, prefix, title, facts] of [
    ["project-page-5.html", "five", "OCR", ["Java 25", "Spring Boot", "Spring AI", "Mockito", "SonarQube", "OWASP Dependency-Check", "AWS Textract", "Amazon SNS", "Amazon SQS", "AWS IAM Roles Anywhere", "Amazon Bedrock", "Indigo"]],
    ["project-page-1.html", "one", "Proyecto Tesis Maivibot", ["77%", "69%", "Tottus", "Plaza Vea", "Metro", "Ica", "BuilderBot", "Node.js", "GPT-4o mini", "WhatsApp", "Telegram", "Instagram", "Java 17", "Spring Boot", "MongoDB Atlas", "Python", "Selenium Grid", "Google Cloud"]],
  ]) {
    const html = await readFile(join(repositoryRoot, route), "utf8");
    const elements = [...html.matchAll(/data-key="([^"]+)" data-value="([^"]+)"[^>]*>([\s\S]*?)<\/(?:h1|h2|p|span|a)>/g)]
      .map(([, key, value, innerHTML]) => ({ dataset: { key, value }, innerHTML }));
    assert.ok(elements.some((element) => element.dataset.value === `proyects-${prefix}-title`), `${route} localizable title`);
    const fallback = elements.map((element) => element.innerHTML).join(" ");
    for (const fact of facts) assert.ok(fallback.includes(fact), `${route} fallback includes ${fact}`);
    const harness = createHarness({
      elements,
      fetchResponse: { ok: true, json: async () => harness.languageOption.dataset.language === "es" ? spanishCatalog : englishCatalog },
    });
    for (const language of ["en", "es", "en"]) {
      harness.languageOption.dataset.language = language;
      await harness.click({ closest: () => harness.languageOption });
      assert.equal(harness.storage.get("language"), language);
      assert.equal(elements.find((element) => element.dataset.value === `proyects-${prefix}-title`).innerHTML, title);
      const copy = elements.map((element) => element.innerHTML).join(" ");
      for (const fact of facts) assert.ok(copy.includes(fact), `${route} ${language} includes ${fact}`);
      if (prefix === "five") assert.doesNotMatch(copy, /MCP|RAG|AI Assistant|Multi-LLM/i);
      if (prefix === "one") {
        assert.match(copy, language === "en" ? /77% improvement in search efficiency/ : /mejora del 77% en la eficiencia de búsqueda/);
        assert.match(copy, language === "en" ? /69% of users reported a positive experience/ : /69% de los usuarios reportó una experiencia positiva/);
      }
    }
  }
});

test("homepage portrait has accessible alternative text and GitHub remains in the approved navbar", () => {
  const portrait = homepageHtml.match(/<img class="portrait"[^>]*>/)?.[0];

  assert.ok(portrait);
  assert.match(portrait, /alt="Portrait of Luis Peche"/);
  assert.match(homepageNavbar, /<a class="icon-link" href="https:\/\/github\.com\/Rpeche-pk"[^>]*rel="noopener noreferrer"[^>]*aria-label="GitHub profile \(opens in a new tab\)"/);
});
