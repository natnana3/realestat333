(function () {
  const slug = new URLSearchParams(window.location.search).get("county");
  const root = document.getElementById("county-root");
  if (!root) return;

  const fullName = slug ? findCountyBySlug(slug) : null;
  if (!fullName) {
    root.innerHTML = `
      <div class="card card--flat">
        <h1 class="page-title">County not found</h1>
        <p class="page-intro"><a href="index.html">Browse all Maryland counties</a>.</p>
      </div>`;
    return;
  }

  const short = countyShortName(fullName);
  document.title = `${fullName} — realestat333`;

  root.innerHTML = `
    <p class="eyebrow">Maryland</p>
    <h1 class="page-title">${fullName}</h1>
    <div class="card card--flat" style="margin-top:2rem">
      <p class="page-intro">
        Neighborhood guides, market stats, and live listings for
        <strong>${short}</strong> — curated by realestat333 advisors who know the county.
      </p>
      <p style="margin-top:1.25rem;display:flex;flex-wrap:wrap;gap:0.75rem">
        <a class="btn btn--primary" href="../search.html?q=${encodeURIComponent(short)}&status=for-sale">Homes for sale</a>
        <a class="btn btn--secondary" href="../search.html?q=${encodeURIComponent(short)}&status=for-rent">Rentals</a>
      </p>
    </div>
    <div class="grid-3" style="margin-top:1.5rem" id="county-listings"></div>
  `;

  const local = LISTINGS.filter((l) =>
    l.county.toLowerCase().includes(short.toLowerCase())
  );
  const el = document.getElementById("county-listings");
  if (!el) return;

  if (local.length === 0) {
    el.innerHTML = `<div class="card card--flat" style="grid-column:1/-1">
      <p class="text-muted" style="margin:0;font-size:0.875rem">Sample listings for this county will appear when IDX is connected. <a href="../search.html">Search statewide</a>.</p>
    </div>`;
    return;
  }

  el.innerHTML = local
    .map(
      (l) => `
      <a class="card card--flat" href="../listing.html?slug=${encodeURIComponent(l.slug)}" style="display:block">
        <div style="font-weight:600">${l.headline}</div>
        <div class="text-muted" style="font-size:0.875rem;margin-top:0.25rem">${formatPrice(l)}</div>
      </a>`
    )
    .join("");
})();
