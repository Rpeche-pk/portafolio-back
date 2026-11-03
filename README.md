# Personal Portfolio

The portfolio is static HTML. `scripts/build-shared-shell.mjs` generates the root pages and shared navigation/footer into `dist/` before they are served. The approved home-page layout lives in `index.html`; its reusable shell is in `templates/work-gallery-navbar.html` and `templates/work-gallery-footer.html`. No framework or install step is required.

## Build and preview

```sh
node scripts/build-shared-shell.mjs
python -m http.server --directory dist 8000
```

Open `http://localhost:8000`. Run `node scripts/build-shared-shell.mjs --check` to verify generated output without rewriting it. Preview `dist/`, not source HTML: the static generator inserts the shared shell before the page is served.

## Reuse the approved shell

1. Add exactly one `<!-- shared-navbar -->` and one `<!-- shared-footer -->` marker to a page source.
2. Add that root page to `templates/page-shell.json` and set `navbarTemplate` to `work-gallery-navbar.html` and `footerTemplate` to `work-gallery-footer.html`.
3. Set its `navigation` destinations and `activeLinks`. A home page uses local section hashes (for example `#projects`); a root-level internal page uses `index.html#projects`. A future page in a subfolder can override that destination with a relative path such as `../index.html#projects`.
4. Run the build and inspect the generated HTML. The generator renders navigation and footer at build time, so basic links do not wait for JavaScript.

The same `navigation` values are used in the shared footer. The approved shell supports the home sections `home`, `projects`, `skills`, `about`, and `contact`. The existing `shared-navbar.html` and `shared-footer.html` remain the legacy Bootstrap shell for other pages; no page body needs duplicated navbar/footer markup.

## Source files

- `assets/css/work-gallery.css` and `assets/js/work-gallery.js`: approved home-page styles and interactions.
- `templates/work-gallery-navbar.html` and `templates/work-gallery-footer.html`: approved reusable shell.
- `templates/shared-navbar.html` and `templates/shared-footer.html`: existing shell used by internal pages.
- `templates/page-shell.json`: per-page shell choice, destinations, active navigation, and legacy collapse settings.
- `design/portfolio-redesign/03-work-gallery.html`: retained approved design reference.

The existing Vercel configuration builds `dist/` for deployment. This integration has not been published or deployed.
