import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const homePage = await readFile(new URL("../index.html", import.meta.url), "utf8");
const behavior = await readFile(new URL("../assets/js/work-gallery.js", import.meta.url), "utf8");
const awsSkill = homePage.match(/<li class="skills-slide" data-skill-id="aws"[\s\S]*?<\/li>/)?.[0];
const certificationSection = homePage.match(/<section class="certifications"[\s\S]*?<\/section>/)?.[0];
const certificationFallback = certificationSection?.match(/<noscript[^>]*>([\s\S]*?)<\/noscript>/)?.[1] ?? "";

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
  assert.equal((certificationFallback.match(/<a\b/g) ?? []).length, 1);
  assert.match(certificationFallback, /Foundational/);
  assert.match(certificationFallback, /Credly URL pending/);
  assert.match(certificationFallback, /href="https:\/\/www\.credly\.com\/badges\/139dafc0-fbbb-4bd1-a3ee-2d9e89107414\/public_url"/);
  assert.match(certificationFallback, /src="assets\/icon\/cloud-practitioner\.png"/);
  assert.match(certificationFallback, /src="assets\/icon\/ai-practitioner\.png"/);
});

test("runtime certificate records match the approved draft without inventing the pending Cloud URL", () => {
  const records = behavior.match(/certifications:\s*\[([\s\S]*?)\n\s*\],/)?.[1] ?? "";
  assert.match(records, /id: 'aws-cloud-practitioner', name: 'AWS Certified Cloud Practitioner', issuer: 'Amazon Web Services', level: 'Foundational', badgePath: 'assets\/icon\/cloud-practitioner\.png', validationUrl: null/);
  assert.match(records, /id: 'aws-ai-practitioner', name: 'AWS Certified AI Practitioner', issuer: 'Amazon Web Services', level: 'Foundational', badgePath: 'assets\/icon\/ai-practitioner\.png', validationUrl: 'https:\/\/www\.credly\.com\/badges\/139dafc0-fbbb-4bd1-a3ee-2d9e89107414\/public_url'/);
});
