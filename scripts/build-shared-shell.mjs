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

function parseArguments(args) {
  const options = {
    help: false,
    output: join(repositoryRoot, "dist"),
  };

  for (let index = 0; index < args.length; index += 1) {
    const argument = args[index];

    if (argument === "--help") {
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
}

function getNavbarVariables(config) {
  const activeClass = (key) => config.activeLinks.includes(key) ? " active" : "";

  return {
    ACTIVE_HOME: activeClass("nav-home"),
    ACTIVE_PROJECTS: activeClass("nav-project"),
    ACTIVE_ABOUT: activeClass("nav-about"),
    ACTIVE_SKILLS: activeClass("nav-skill"),
    ACTIVE_CONTACT: activeClass("nav-contact"),
    COLLAPSE_STYLE: config.collapseStyle ? ` style="${config.collapseStyle}"` : "",
    CONTACT_HREF: config.contactHref,
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

  const navbarTemplate = await readFile(join(repositoryRoot, "templates", "shared-navbar.html"), "utf8");
  const footerTemplate = await readFile(join(repositoryRoot, "templates", "shared-footer.html"), "utf8");
  const outputFiles = new Map();

  for (const pageName of pages) {
    const pageConfig = config[pageName];
    validatePageConfig(pageName, pageConfig);

    let page = await readFile(join(sourcePagesDirectory, pageName), "utf8");
    page = replaceShell(
      page,
      "shared-navbar",
      "nav",
      '<nav class="navbar',
      renderTemplate(navbarTemplate, getNavbarVariables(pageConfig), `${pageName} navbar`),
      pageName,
    );
    page = replaceShell(
      page,
      "shared-footer",
      "footer",
      '<footer class="page-footer',
      footerTemplate.trimEnd(),
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

export async function buildSite(options) {
  const outputFiles = await createSiteFiles(options.sourcePagesDirectory ?? repositoryRoot);

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
