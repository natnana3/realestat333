# realestat333

Static HTML website for **realestat333** — full-service real estate across all Maryland counties.

## Stack

- **HTML5** pages
- **CSS** (`css/styles.css`) — bespoke brand (verdigris + copper, no template palette)
- **Vanilla JavaScript** for layout, search, listings, and county hubs

## Run locally

Open `index.html` in a browser, or serve the folder:

```bash
npx --yes serve .
```

Then visit `http://localhost:3000` (or the port shown).

## Pages

| Page | File |
|------|------|
| Home | `index.html` |
| Search | `search.html` |
| Listing detail | `listing.html?slug=...` |
| Maryland counties | `maryland/index.html` |
| County hub | `maryland/county.html?county=montgomery` |
| Buy / Sell / Rent / Invest | `buy.html`, etc. |

## Sample listings & IDX

Demo listings live in `js/listings.js`. For production, replace this file via your MLS/IDX feed (RESO Web API, Bridge, Trestle, etc.) or a small backend that writes JSON on a schedule.

## SEO

- `robots.txt`
- `sitemap.xml` (update `https://realestat333.com` to your live domain)

## License

Proprietary — realestat333.
