# Personal Portfolio

The site is published as static HTML. Shared navigation and footer markup lives in `templates/`; the build script combines it with the nine page bodies and copies the required assets and custom-domain file into `dist/`. It accepts both the current inline shell markup and marker-based page sources, allowing the source migration to be delivered separately.

## Build and preview

```sh
node scripts/build-shared-shell.mjs
python -m http.server --directory dist 8000
```

Open `http://localhost:8000`. The build does not require an npm install.

## Update the shared shell

- Edit `templates/shared-navbar.html` or `templates/shared-footer.html` for shared markup.
- Edit `templates/page-shell.json` only when a page's existing active links, Contact destination, or collapse padding needs to change.
- Existing pages may keep their inline shell or use one `<!-- shared-navbar -->` and one `<!-- shared-footer -->` marker; the generator supports both forms.
- Run `node scripts/build-shared-shell.mjs` to regenerate the static site.

The build preserves each page's existing navigation behavior. It does not turn page links into client-side navigation, so full-document navigation remains.
