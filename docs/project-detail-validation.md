# Project detail pages: validation and evidence

All six portfolio detail routes now use the current Work Gallery shell and responsive project layout. Existing project copy, media, technology lists, dependencies, and outbound destinations were preserved. No deployment was performed.

## Routes and browser evidence

| Project | Route | Validation | Screenshots |
|---|---|---|---|
| Zephyr Cygnus WA | [`project-page.html`](../project-page.html) | Playwright passed | [Desktop](../screenshots/project-detail-zephyr-desktop.png) · [Mobile](../screenshots/project-detail-zephyr-mobile.png) |
| Dev BOT SUPERMARKET | [`project-page-1.html`](../project-page-1.html) | Playwright passed | [Desktop](../screenshots/project-detail-devbot-supermarket-desktop.png) · [Mobile](../screenshots/project-detail-devbot-supermarket-mobile.png) |
| digital wallet “cashier” | [`project-page-2.html`](../project-page-2.html) | Playwright passed | [Desktop](../screenshots/project-detail-cashier-desktop.png) · [Mobile](../screenshots/project-detail-cashier-mobile.png) |
| Trucking | [`project-page-3.html`](../project-page-3.html) | Playwright passed | [Desktop](../screenshots/project-detail-trucking-desktop.png) · [Mobile](../screenshots/project-detail-trucking-mobile.png) |
| Maipevi Bot | [`project-page-4.html`](../project-page-4.html) | Playwright passed | [Desktop](../screenshots/project-detail-maipevi-bot-desktop.png) · [Mobile](../screenshots/project-detail-maipevi-bot-mobile.png) |
| AI Assistant | [`project-page-5.html`](../project-page-5.html) | Playwright passed | [Desktop](../screenshots/project-detail-ai-assistant-desktop.png) · [Mobile](../screenshots/project-detail-ai-assistant-mobile.png) |

The six Projects cards’ media, title, and details actions resolve to their matching detail routes. The screenshot set contains one desktop and one mobile full-page capture per project.

## Shared implementation

- Shell selection and per-route navigation: `templates/page-shell.json`.
- Shared navigation and footer: `templates/work-gallery-navbar.html` and `templates/work-gallery-footer.html`.
- Shared responsive/theme-aware styles and localized behavior: `assets/css/work-gallery.css` and `assets/js/work-gallery.js`.
- Generated shell verification: `node scripts/build-shared-shell.mjs --check`.

## Checks performed

- Playwright on all six routes at 320px, 390px, and 1440px widths: no horizontal overflow; project images load and have alternatives; outbound links retain their expected destinations; no browser-console errors.
- English/Spanish switching and light/dark theme behavior, including persisted theme and synchronized theme attributes.
- Keyboard navigation and visible focus styling; reduced-motion mode reports zero-duration link transitions.
- Focused Node suite: **26/26 passed**. Shared-shell build check: **92 files current**.
- Full Node suite: **50/51 passed**. The remaining failure is `tests/particle-motion.test.mjs`, which expects particle opacity `0.5` but observes `0.4`. Particle behavior is unrelated to this feature and was left unchanged.

## Limits and release status

The particle-opacity test remains the only known failing full-suite check; its behavior was left unchanged as out of scope. The site remains local and unpublished; no deployment or public-host URL is claimed.
