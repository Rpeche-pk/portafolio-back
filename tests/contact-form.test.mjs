import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { runInNewContext } from "node:vm";
import test from "node:test";

const repositoryRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const html = await readFile(join(repositoryRoot, "contact.html"), "utf8");
const contactFormScript = await readFile(
  join(repositoryRoot, "assets", "js", "contact-form.js"),
).catch(() => "");
const spanish = JSON.parse(
  await readFile(join(repositoryRoot, "assets", "js", "languages", "es.json"), "utf8"),
);
const english = JSON.parse(
  await readFile(join(repositoryRoot, "assets", "js", "languages", "en.json"), "utf8"),
);

function getTags(tagName) {
  const tagPattern = new RegExp(`<${tagName}([^>]*)>`, "g");

  return [...html.matchAll(tagPattern)].map((match) => {
    const attributes = {};
    const attributePattern = /([a-zA-Z-]+)(?:="([^"]*)")?/g;

    for (const attribute of match[1].matchAll(attributePattern)) {
      attributes[attribute[1]] = attribute[2] ?? "";
    }

    return attributes;
  });
}

test("contact form keeps its Pageclip submission contract", () => {
  const [form] = getTags("form");
  const submitButtons = getTags("button").filter((button) =>
    button.class?.includes("pageclip-form__submit"),
  );

  assert.ok(form);
  assert.ok(form.class.includes("contact-form"));
  assert.equal(
    form.action,
    "https://send.pageclip.co/YU1nFAImNcbUjF7E3Mql1lMy0hhVcIjy",
  );
  assert.equal(form.method, "post");
  assert.equal(submitButtons.length, 1);
  assert.equal(submitButtons[0].type, "submit");
  assert.match(html, /<script[^>]+src="https:\/\/s\.pageclip\.co\/v1\/pageclip\.js"/);
  assert.match(html, /assets\/js\/contact-form\.js/);
});

test("contact fields are required, correctly typed, and associated with labels", () => {
  const controls = [...getTags("input"), ...getTags("textarea")];
  const controlsById = Object.fromEntries(
    controls.filter((control) => control.id).map((control) => [control.id, control]),
  );
  const labelTargets = getTags("label").map((label) => label.for);
  const controlIds = new Set(controls.map((control) => control.id));

  assert.deepEqual(Object.keys(controlsById).sort(), ["body", "email", "name"]);
  assert.equal(controlsById.name.name, "name");
  assert.equal(controlsById.name.type, "text");
  assert.equal(controlsById.name.autocomplete, "name");
  assert.ok("required" in controlsById.name);
  assert.equal(controlsById.email.name, "email");
  assert.equal(controlsById.email.type, "email");
  assert.equal(controlsById.email.autocomplete, "email");
  assert.ok("required" in controlsById.email);
  assert.equal(controlsById.body.name, "body");
  assert.ok("required" in controlsById.body);
  assert.equal((html.match(/\brequired\b/g) ?? []).length, 3);
  assert.ok(["name", "email", "body"].every((id) => labelTargets.includes(id)));
  assert.ok(labelTargets.every((id) => id && controlIds.has(id)));
});

test("contact form uses valid textarea markup and no fake success handler", () => {
  assert.match(html, /<textarea[^>]*><\/textarea>/);
  assert.doesNotMatch(html, /<textarea[^>]*\/>/);
  assert.doesNotMatch(html, /onclick\s*=\s*["'][^"']*sendEmail/);
  assert.doesNotMatch(html, /assets\/js\/contact-me\.js/);
  assert.doesNotMatch(html, /\boninvalid\s*=/);
  assert.doesNotMatch(html, /\boninput\s*=/);
});

test("contact form exposes translated, accessible failure messages", () => {
  const errorMessage = getTags("p").find((paragraph) => paragraph.id === "contact-error");
  const unavailableMessage = getTags("p").find((paragraph) => paragraph.id === "contact-unavailable");

  assert.ok(errorMessage);
  assert.equal(errorMessage.role, "alert");
  assert.ok("hidden" in errorMessage);
  assert.equal(errorMessage["data-key"], "contact");
  assert.equal(errorMessage["data-value"], "contact-error");
  assert.ok(unavailableMessage);
  assert.equal(unavailableMessage.role, "alert");
  assert.equal(unavailableMessage["data-value"], "contact-unavailable");
  assert.ok("hidden" in unavailableMessage);
  assert.ok(spanish.contact["contact-error"]);
  assert.ok(english.contact["contact-error"]);
  assert.ok(spanish.contact["contact-unavailable"]);
  assert.ok(english.contact["contact-unavailable"]);
});

test("Pageclip errors are shown and success clears the failure message", () => {
  const form = {};
  const errorMessage = { hidden: true };
  const unavailableMessage = { hidden: true };
  let formOptions;

  runInNewContext(contactFormScript, {
    document: {
      querySelector: (selector) => selector === ".contact-form" ? form : null,
      getElementById: (id) => ({
        "contact-error": errorMessage,
        "contact-unavailable": unavailableMessage,
      })[id] ?? null,
    },
    window: {
      Pageclip: {
        form: (actualForm, options) => {
          assert.equal(actualForm, form);
          formOptions = options;
        },
      },
    },
  });

  assert.ok(formOptions);
  assert.equal(formOptions.onResponse(new Error("offline")), false);
  assert.equal(errorMessage.hidden, false);
  assert.equal(formOptions.onResponse(null, { data: "ok" }), true);
  assert.equal(errorMessage.hidden, true);
  assert.equal(unavailableMessage.hidden, true);
});

test("missing Pageclip script shows the fallback message without blocking native submission", () => {
  const form = {};
  const errorMessage = { hidden: true };
  const unavailableMessage = { hidden: true };

  runInNewContext(contactFormScript, {
    document: {
      querySelector: () => form,
      getElementById: (id) => ({
        "contact-error": errorMessage,
        "contact-unavailable": unavailableMessage,
      })[id] ?? null,
    },
    window: {},
  });

  assert.equal(errorMessage.hidden, true);
  assert.equal(unavailableMessage.hidden, false);
});
