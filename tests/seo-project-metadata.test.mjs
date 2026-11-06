import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const baseUrl = 'https://luispeche.vercel.app/';
const projects = [
  {
    route: 'project-page.html',
    title: 'Zephyr Cygnus WA | Luis Peche Aparcana',
    description: 'Zephyr Cygnus WA is a Java and Spring Boot WhatsApp chatbot project created to manage food-ordering conversations for a restobar in Ica.',
  },
  {
    route: 'project-page-1.html',
    title: 'MaiviBot Thesis Project | Luis Peche Aparcana',
    description: 'MaiviBot is a thesis project that combines a generative AI chatbot, Python web scraping, and a Spring Boot API to search supermarket products in Ica.',
  },
  {
    route: 'project-page-2.html',
    title: 'Cashier Digital Wallet | Luis Peche Aparcana',
    description: 'Cashier is a digital wallet project for payments and transfers, with security controls and loyalty rewards, built with Java and Spring Boot.',
  },
  {
    route: 'project-page-3.html',
    title: 'Trucking Fleet Management | Luis Peche Aparcana',
    description: 'Trucking is a fleet-management web app that tracks vehicle location, status, usage, and maintenance, with WhatsApp chatbot interaction.',
  },
  {
    route: 'project-page-4.html',
    title: 'Maipevi Bot for Fleet Management | Luis Peche Aparcana',
    description: 'Maipevi Bot is a WhatsApp chatbot for fleet management, providing vehicle location, status, maintenance records, reports, and notifications.',
  },
  {
    route: 'project-page-5.html',
    title: 'OCR Logistics Component | Luis Peche Aparcana',
    description: 'An OCR logistics component integrated with Indigo Administrativo to process utility bills, using AWS Textract, SNS, SQS, and Bedrock.',
  },
];

function attributes(tag) {
  return Object.fromEntries(
    [...tag.matchAll(/([\w:-]+)\s*=\s*(["'])(.*?)\2/g)].map(([, name, , value]) => [name, value.replaceAll('&amp;', '&')]),
  );
}

for (const project of projects) {
  test(`${project.route} has unique English title, description, and self-canonical`, async () => {
    const html = await readFile(path.join(root, project.route), 'utf8');
    const head = html.match(/<head\b[^>]*>([\s\S]*?)<\/head\s*>/i)?.[1] ?? '';
    const titles = [...head.matchAll(/<title>([\s\S]*?)<\/title>/gi)].map(([, title]) => title.trim());
    const descriptions = [...head.matchAll(/<meta\b[^>]*>/gi)]
      .map(([tag]) => attributes(tag))
      .filter((tag) => tag.name === 'description')
      .map((tag) => tag.content);
    const canonicals = [...head.matchAll(/<link\b[^>]*>/gi)]
      .map(([tag]) => attributes(tag))
      .filter((tag) => tag.rel === 'canonical')
      .map((tag) => tag.href);

    assert.deepEqual(titles, [project.title]);
    assert.deepEqual(descriptions, [project.description]);
    assert.deepEqual(canonicals, [`${baseUrl}${project.route}`]);
  });
}

test('project SEO titles, descriptions, and canonicals do not duplicate each other', async () => {
  const titles = [];
  const descriptions = [];
  const canonicals = [];
  for (const project of projects) {
    const html = await readFile(path.join(root, project.route), 'utf8');
    const head = html.match(/<head\b[^>]*>([\s\S]*?)<\/head\s*>/i)?.[1] ?? '';
    titles.push(...[...head.matchAll(/<title>([\s\S]*?)<\/title>/gi)].map(([, title]) => title.trim()));
    descriptions.push(...[...head.matchAll(/<meta\b[^>]*>/gi)]
      .map(([tag]) => attributes(tag))
      .filter((tag) => tag.name === 'description')
      .map((tag) => tag.content));
    canonicals.push(...[...head.matchAll(/<link\b[^>]*>/gi)]
      .map(([tag]) => attributes(tag))
      .filter((tag) => tag.rel === 'canonical')
      .map((tag) => tag.href));
  }
  assert.equal(new Set(titles).size, projects.length);
  assert.equal(new Set(descriptions).size, projects.length);
  assert.equal(new Set(canonicals).size, projects.length);
});
