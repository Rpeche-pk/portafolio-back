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

function createHarness({ fetchResponse, savedLanguage = null } = {}) {
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
      querySelectorAll: () => [translatedText],
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
    /<h3[^>]*data-key="proyects"[^>]*data-value="([^"]+)"/,
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

test("homepage portrait has accessible alternative text and GitHub remains in the approved navbar", () => {
  const portrait = homepageHtml.match(/<img class="portrait"[^>]*>/)?.[0];

  assert.ok(portrait);
  assert.match(portrait, /alt="Portrait of Luis Peche"/);
  assert.match(homepageNavbar, /<a class="icon-link" href="https:\/\/github\.com\/Rpeche-pk"[^>]*rel="noopener noreferrer"[^>]*aria-label="GitHub profile \(opens in a new tab\)"/);
});
