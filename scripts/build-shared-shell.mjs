import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { dirname, isAbsolute, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const validNavigationKeys = new Set([
  "nav-home",
  "nav-project",
  "nav-about",
  "nav-skill",
  "nav-contact",
]);
const validRouteKeys = new Set(["home", "projects", "skills", "about", "contact"]);

function resolveTemplatePath(templateName, pageName, fieldName) {
  if (typeof templateName !== "string" || !/^[a-z0-9-]+\.html$/i.test(templateName)) {
    throw new Error(`${fieldName} must be a template filename for ${pageName}.`);
  }

  return join(repositoryRoot, "templates", templateName);
}

function parseArguments(args) {
  const options = {
    check: false,
    help: false,
    output: join(repositoryRoot, "dist"),
  };

  for (let index = 0; index < args.length; index += 1) {
    const argument = args[index];

    if (argument === "--check") {
      options.check = true;
    } else if (argument === "--help") {
      options.help = true;
    } else if (argument === "--output") {
      const output = args[index + 1];
      if (!output || output.startsWith("--")) {
        throw new Error("--output requires a directory path.");
      }

      options.output = isAbsolute(output) ? output : resolve(process.cwd(), output);
      index += 1;
    } else {
      throw new Error(`Unknown option: ${argument}`);
    }
  }

  const resolvedOutput = resolve(options.output);
  const outputRelativeToRoot = relative(repositoryRoot, resolvedOutput);
  const outputIsInsideRepository = outputRelativeToRoot !== ""
    && outputRelativeToRoot !== ".."
    && !outputRelativeToRoot.startsWith(`..${sep}`)
    && !isAbsolute(outputRelativeToRoot);

  if (resolvedOutput === repositoryRoot) {
    throw new Error("The output directory cannot be the repository root.");
  }
  if (outputIsInsideRepository && outputRelativeToRoot !== "dist") {
    throw new Error("Build output inside the repository must use the generated dist/ directory.");
  }

  return options;
}

function countOccurrences(value, token) {
  return value.split(token).length - 1;
}

function renderTemplate(template, variables, description) {
  const rendered = template.replace(/\{\{([A-Z_]+)\}\}/g, (match, key) => {
    if (!Object.prototype.hasOwnProperty.call(variables, key)) {
      throw new Error(`Missing template value ${key} for ${description}.`);
    }

    return variables[key];
  });

  if (/\{\{[^}]+\}\}/.test(rendered)) {
    throw new Error(`Unresolved placeholder in ${description}.`);
  }

  return rendered.trimEnd();
}

function replaceMarker(page, marker, replacement, pageName) {
  const token = `<!-- ${marker} -->`;
  if (countOccurrences(page, token) !== 1) {
    throw new Error(`${pageName} must contain exactly one ${token} marker.`);
  }

  return page.replace(token, replacement);
}

function findElementRange(html, tagName, start) {
  const tagPattern = new RegExp(`<${tagName}\\b[^>]*>|<\\/${tagName}>`, "g");
  tagPattern.lastIndex = start;
  let elementStart = -1;
  let depth = 0;
  let match;

  while ((match = tagPattern.exec(html))) {
    if (match[0].startsWith(`</${tagName}`)) {
      depth -= 1;
      if (depth === 0) return [elementStart, tagPattern.lastIndex];
    } else {
      if (depth === 0) elementStart = match.index;
      depth += 1;
    }
  }

  throw new Error(`Could not find a closing </${tagName}>.`);
}

function replaceShell(page, marker, tagName, opening, replacement, pageName) {
  const token = `<!-- ${marker} -->`;
  const markerCount = countOccurrences(page, token);

  if (markerCount === 1) {
    if (page.includes(opening)) {
      throw new Error(`${pageName} contains both ${token} and inline shell markup.`);
    }
    return page.replace(token, replacement);
  }

  if (markerCount > 1) {
    throw new Error(`${pageName} must contain at most one ${token} marker.`);
  }

  const start = page.indexOf(opening);
  if (start < 0) {
    throw new Error(`${pageName} must contain ${token} or ${opening}.`);
  }

  const [elementStart, elementEnd] = findElementRange(page, tagName, start);
  return `${page.slice(0, elementStart)}${replacement}${page.slice(elementEnd)}`;
}

function replaceFooterShell(page, replacement, pageName) {
  const marker = "<!-- shared-footer -->";
  const markerCount = countOccurrences(page, marker);
  if (markerCount === 1) return page.replace(marker, replacement);
  if (markerCount > 1) throw new Error(`${pageName} must contain at most one ${marker} marker.`);

  if (page.includes('<footer class="site-footer">')) {
    return replaceShell(page, "shared-footer", "footer", '<footer class="site-footer">', replacement, pageName);
  }
  return replaceShell(page, "shared-footer", "footer", '<footer class="page-footer', replacement, pageName);
}

function replaceNavbarShell(page, replacement, pageName) {
  const marker = "<!-- shared-navbar -->";
  const markerCount = countOccurrences(page, marker);
  if (markerCount === 1) return page.replace(marker, replacement);
  if (markerCount > 1) throw new Error(`${pageName} must contain at most one ${marker} marker.`);

  if (page.includes('<header class="site-header">')) {
    return replaceShell(page, "shared-navbar", "header", '<header class="site-header">', replacement, pageName);
  }
  return replaceShell(page, "shared-navbar", "nav", '<nav class="navbar', replacement, pageName);
}

function validatePageConfig(pageName, config) {
  if (!config || typeof config.contactHref !== "string" || !Array.isArray(config.activeLinks)) {
    throw new Error(`Invalid shell configuration for ${pageName}.`);
  }

  const invalidLinks = config.activeLinks.filter((key) => !validNavigationKeys.has(key));
  if (invalidLinks.length > 0) {
    throw new Error(`Unknown active navigation keys for ${pageName}: ${invalidLinks.join(", ")}.`);
  }

  if (typeof config.collapseStyle !== "string") {
    throw new Error(`collapseStyle must be a string for ${pageName}.`);
  }

  if (config.navigation !== undefined) {
    if (!config.navigation || typeof config.navigation !== "object" || Array.isArray(config.navigation)) {
      throw new Error(`navigation must be an object for ${pageName}.`);
    }
    for (const [key, href] of Object.entries(config.navigation)) {
      if (!validRouteKeys.has(key) || typeof href !== "string" || href.trim() === "") {
        throw new Error(`Invalid navigation route ${key} for ${pageName}.`);
      }
    }
  }

  resolveTemplatePath(config.navbarTemplate ?? "shared-navbar.html", pageName, "navbarTemplate");
  resolveTemplatePath(config.footerTemplate ?? "shared-footer.html", pageName, "footerTemplate");
}

function getNavbarVariables(config) {
  const activeClass = (key) => config.activeLinks.includes(key) ? " active" : "";
  const currentPage = (key) => config.activeLinks.includes(key) ? ' aria-current="location"' : "";

  const routes = {
    home: "index.html#home",
    projects: "index.html#projects",
    skills: "index.html#skills",
    about: "index.html#about",
    contact: "index.html#contact",
    ...config.navigation,
  };

  return {
    HOME_HREF: routes.home,
    BRAND_HREF: routes.home,
    PROJECTS_HREF: routes.projects,
    SKILLS_HREF: routes.skills,
    ABOUT_HREF: routes.about,
    ACTIVE_HOME: activeClass("nav-home"),
    CURRENT_HOME: currentPage("nav-home"),
    ACTIVE_PROJECTS: activeClass("nav-project"),
    CURRENT_PROJECTS: currentPage("nav-project"),
    ACTIVE_ABOUT: activeClass("nav-about"),
    CURRENT_ABOUT: currentPage("nav-about"),
    ACTIVE_SKILLS: activeClass("nav-skill"),
    CURRENT_SKILLS: currentPage("nav-skill"),
    ACTIVE_CONTACT: activeClass("nav-contact"),
    CURRENT_CONTACT: currentPage("nav-contact"),
    COLLAPSE_STYLE: config.collapseStyle ? ` style="${config.collapseStyle}"` : "",
    CONTACT_HREF: routes.contact,
  };
}

async function listFiles(directory, root = directory) {
  const files = [];

  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const entryPath = join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...await listFiles(entryPath, root));
    } else if (entry.isFile()) {
      files.push(relative(root, entryPath).split(sep).join("/"));
    }
  }

  return files.sort();
}

async function createSiteFiles(sourcePagesDirectory = repositoryRoot) {
  const configPath = join(repositoryRoot, "templates", "page-shell.json");
  const config = JSON.parse(await readFile(configPath, "utf8"));
  const pages = Object.keys(config).sort();
  const sourcePages = (await readdir(sourcePagesDirectory))
    .filter((name) => name.endsWith(".html"))
    .sort();

  if (JSON.stringify(sourcePages) !== JSON.stringify(pages)) {
    throw new Error("Page shell configuration must list every root HTML page exactly once.");
  }

  const outputFiles = new Map();

  for (const pageName of pages) {
    const pageConfig = config[pageName];
    validatePageConfig(pageName, pageConfig);

    const variables = getNavbarVariables(pageConfig);
    const navbarTemplate = await readFile(resolveTemplatePath(pageConfig.navbarTemplate ?? "shared-navbar.html", pageName, "navbarTemplate"), "utf8");
    const footerTemplate = await readFile(resolveTemplatePath(pageConfig.footerTemplate ?? "shared-footer.html", pageName, "footerTemplate"), "utf8");
    let page = await readFile(join(sourcePagesDirectory, pageName), "utf8");
    page = replaceNavbarShell(
      page,
      renderTemplate(navbarTemplate, variables, `${pageName} navbar`),
      pageName,
    );
    page = replaceFooterShell(
      page,
      renderTemplate(footerTemplate, variables, `${pageName} footer`),
      pageName,
    );
    outputFiles.set(pageName, Buffer.from(page, "utf8"));
  }

  outputFiles.set("CNAME", await readFile(join(repositoryRoot, "CNAME")));
  for (const assetPath of await listFiles(join(repositoryRoot, "assets"))) {
    outputFiles.set(`assets/${assetPath}`, await readFile(join(repositoryRoot, "assets", assetPath)));
  }

  return outputFiles;
}

async function verifyOutput(outputDirectory, expectedFiles) {
  const mismatches = [];

  for (const [relativePath, expected] of expectedFiles) {
    try {
      const actual = await readFile(join(outputDirectory, relativePath));
      if (!actual.equals(expected)) {
        mismatches.push(relativePath);
      }
    } catch {
      mismatches.push(relativePath);
    }
  }

  try {
    const actualFiles = await listFiles(outputDirectory);
    const expectedPaths = [...expectedFiles.keys()].sort();
    for (const unexpectedPath of actualFiles.filter((path) => !expectedFiles.has(path))) {
      mismatches.push(`${unexpectedPath} (unexpected)`);
    }
    for (const missingPath of expectedPaths.filter((path) => !actualFiles.includes(path))) {
      if (!mismatches.includes(missingPath)) mismatches.push(missingPath);
    }
  } catch {
    mismatches.push("output directory is missing");
  }

  if (mismatches.length > 0) {
    throw new Error(`Generated site is stale or incomplete: ${[...new Set(mismatches)].join(", ")}.`);
  }
}

export async function buildSite(options) {
  const outputFiles = await createSiteFiles(options.sourcePagesDirectory ?? repositoryRoot);

  if (options.check) {
    await verifyOutput(options.output, outputFiles);
    console.log(`Static output is current (${outputFiles.size} files).`);
    return;
  }

  await mkdir(options.output, { recursive: true });
  for (const [relativePath, content] of outputFiles) {
    const outputPath = join(options.output, relativePath);
    await mkdir(dirname(outputPath), { recursive: true });
    await writeFile(outputPath, content);
  }

  console.log(`Generated ${Object.keys(JSON.parse(await readFile(join(repositoryRoot, "templates", "page-shell.json"), "utf8"))).length} pages in ${options.output}.`);
}

function printHelp() {
  console.log(`Usage: node scripts/build-shared-shell.mjs [options]

Generate the static site with the shared navbar and footer.

Options:
  --output <dir>  Write the static site to a directory (default: dist)
  --check         Verify that the output directory matches the current sources
  --help          Show this help`);
}

async function main() {
  const options = parseArguments(process.argv.slice(2));
  if (options.help) {
    printHelp();
    return;
  }

  await buildSite(options);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
