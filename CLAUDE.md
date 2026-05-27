# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Running locally

```bash
npx --yes serve .
# visit http://localhost:3000
```

No build step. Open any `.html` file directly in a browser or use the `serve` command above.

## Architecture

**Pure static site** — HTML5 + one CSS file + vanilla JS. No framework, no bundler, no compilation.

### Shared layout injection

Every page contains two empty `<div>` slots:

```html
<div id="site-header"></div>
...
<div id="site-footer"></div>
<script src="js/layout.js"></script>
```

`js/layout.js` replaces these with the full `<header>` and `<footer>` HTML at runtime. All navigation lives here. For pages inside a subdirectory (e.g. `maryland/`), add `data-base="../"` to the `<html>` tag so `layout.js` resolves relative links correctly.

### Global data scripts

Two files declare globals that page-specific scripts depend on:

| File | Global | Used by |
|------|--------|---------|
| `js/listings.js` | `LISTINGS`, `getListingBySlug()`, `formatPrice()`, `formatAddress()` | `search.js`, `listing-page.js`, `county-page.js` |
| `js/counties.js` | `MARYLAND_COUNTIES`, `slugifyCounty()`, `countyShortName()`, `findCountyBySlug()` | `maryland-index.js`, `county-page.js` |

**Script load order matters.** Always load data globals before page-specific scripts:

```html
<script src="../js/counties.js"></script>
<script src="../js/listings.js"></script>
<script src="../js/county-page.js"></script>
<script src="../js/layout.js"></script>
```

### URL-parameterised pages

Two pages are reused for many records via query params:

- `listing.html?slug=<listing-slug>` — rendered by `js/listing-page.js`
- `maryland/county.html?county=<county-slug>` — rendered by `js/county-page.js`

County slugs are derived by `slugifyCounty(countyShortName(fullName))` (strips " County", lowercases, hyphenates).

### Listings data

`js/listings.js` holds sample data. In production, replace this file with output from an MLS/IDX feed (RESO Web API, Bridge, Trestle, etc.) that emits the same object shape. Each listing needs at minimum: `slug`, `status`, `transaction`, `street1`, `city`, `stateCode`, `postalCode`, `county`, `beds`, `bathsFull`, `listPrice` or `rentPrice`, `photos[]`, `lat`, `lng`.

### CSS design system

All theming lives in CSS custom properties at the top of `css/styles.css`:

- **Green** (`--brand`, `--brand-2`): primary buttons and CTAs
- **Gold** (`--yellow`, `--yellow-2`, `--yellow-soft`): secondary accents, badges
- **Sky blue** (`--sky`, `--sky-2`, `--sky-3`, `--sky-soft`, `--sky-soft-2`): cards, section backgrounds, header accent line
- **Dark mode** is automatic via `@media (prefers-color-scheme: dark)` — all variables have dark-mode overrides

Key component classes: `.card`, `.card--flat`, `.card--muted`, `.card--sky`, `.card--highlight`, `.btn--primary`, `.btn--secondary`, `.listing-card`, `.property-card`, `.img-banner`, `.bg-sky-section`, `.grid-2`, `.grid-3`, `.pill`, `.county-link`.

### SEO

- `robots.txt` and `sitemap.xml` are in the root — update the domain in `sitemap.xml` before going live
- `index.html` has an inline JSON-LD `RealEstateAgent` schema; `listing-page.js` injects `RealEstateListing` schema dynamically per listing
