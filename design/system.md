# Portfolio design system — source sync

This board records values found in the current project sources. It is a reference for the proposal, not a production stylesheet. No project source files were changed to create this snapshot.

## Sources read

- `assets/bootstrap/css/bootstrap.min.css` — Bootstrap 5 theme tokens, font, grid gutter, border radii, shadows, and card defaults.
- `assets/css/bs-theme-overrides.css` — portfolio color overrides, navbar, focus, and hero rules.
- `assets/css/Lato.css` — local Lato font faces and available weights.
- `assets/css/project-cards.css` — project grid, card image, and responsive layout rules.
- `assets/css/portfolio-content.css` — heading, paragraph, button, spacing, and focus rules.

## Colors

| Token / role | Value | Use in source | Source |
| --- | --- | --- | --- |
| `--bs-primary` | `#006bc8` | Primary buttons and links | `assets/css/bs-theme-overrides.css` |
| `--bs-primary-text-emphasis` | `#002B50` | Strong text and focus accent | `assets/css/bs-theme-overrides.css` |
| `--bs-primary-bg-subtle` | `#CCE1F4` | Subtle primary field | `assets/css/bs-theme-overrides.css` |
| `--bs-primary-border-subtle` | `#99C4E9` | Subtle primary border | `assets/css/bs-theme-overrides.css` |
| `--bs-link-hover-color` | `#0b80cc` | Link hover | `assets/css/bs-theme-overrides.css` |
| `--bs-body-color` | `#212529` | Main body text | `assets/bootstrap/css/bootstrap.min.css` |
| `--bs-body-bg` | `#fff` | Page background | `assets/bootstrap/css/bootstrap.min.css` |
| `--bs-border-color` | `#dee2e6` | Default border | `assets/bootstrap/css/bootstrap.min.css` |
| `--bs-border-color-translucent` | `rgba(0, 0, 0, 0.175)` | Translucent borders | `assets/bootstrap/css/bootstrap.min.css` |

Bootstrap's default primary (`#0ea0ff`) is overridden by the portfolio primary (`#006bc8`) for the current page.

## Typography

- `--bs-font-sans-serif`: `"Lato", sans-serif` — `assets/bootstrap/css/bootstrap.min.css`.
- `--bs-body-font-family`: `var(--bs-font-sans-serif)` — `assets/bootstrap/css/bootstrap.min.css`.
- Local Lato faces are declared at weights `300`, `400`, and `700` — `assets/css/Lato.css`.
- Hero heading: `clamp(2rem, 5vw, 3.5rem)`, weight `700`, line-height `1.08`, max-width `18ch` — `assets/css/portfolio-content.css`.
- Body copy: `clamp(1rem, 1.5vw, 1.125rem)`, line-height `1.6` — `assets/css/portfolio-content.css`.

## Spacing

- Bootstrap container gutter: `--bs-gutter-x: 1.5rem`, `--bs-gutter-y: 0` — `assets/bootstrap/css/bootstrap.min.css`.
- Navbar block padding: `0.5rem`; compact navbar `0.25rem`; mobile navbar `0.375rem` — `assets/css/bs-theme-overrides.css`.
- Navbar link gap: `clamp(0.25rem, 0.8vw, 0.75rem)` — `assets/css/bs-theme-overrides.css`.
- Project-grid gap: `1.5rem` desktop and `1rem` mobile — `assets/css/project-cards.css`.
- Hero content gap: `clamp(1.25rem, 3vh, 2rem)` — `assets/css/bs-theme-overrides.css`.
- Button minimum target: `44px` — `assets/css/bs-theme-overrides.css` and `assets/css/portfolio-content.css`.

## Radius

- Bootstrap radius tokens: `0.25rem`, `0.375rem`, `0.5rem`, `1rem`, `2rem`, and `50rem` (pill) — `assets/bootstrap/css/bootstrap.min.css`.
- Existing intro buttons use `999px` — `assets/css/portfolio-content.css`.
- Existing language controls use `4px` — `assets/css/bs-theme-overrides.css`.

## Shadows

- Bootstrap shadow tokens: `0 0.5rem 1rem rgba(0, 0, 0, 0.15)`, `0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)`, and `0 1rem 3rem rgba(0, 0, 0, 0.175)` — `assets/bootstrap/css/bootstrap.min.css`.
- Bootstrap card shadow token is empty; navbar focus rules set `box-shadow: none` — `assets/bootstrap/css/bootstrap.min.css`, `assets/css/bs-theme-overrides.css`.

## Component rules

- Navbar: fixed at the top, portfolio blue background layer, white links, 44px minimum link height — `assets/css/bs-theme-overrides.css`.
- Primary button: Bootstrap primary color; intro buttons use a pill radius and 44px minimum height — `assets/css/bs-theme-overrides.css`, `assets/css/portfolio-content.css`.
- Project cards: three columns on wide screens, two at tablet widths, one on phones; image region is 200px high — `assets/css/project-cards.css`.
- Focus: visible 3px outlines on keyboard-focused navigation and actions — `assets/css/bs-theme-overrides.css`, `assets/css/portfolio-content.css`.

The requested redesign may intentionally propose a neutral page ground and restrained separators instead of the existing blue navbar layer. Those proposal values will be identified separately and will not be presented as current project tokens.
