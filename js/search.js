(function () {
  const params = new URLSearchParams(window.location.search);
  const q = (params.get("q") || "").trim().toLowerCase();
  const status = params.get("status") || "for-sale";
  const price = params.get("price") || "any";
  const minPrice = parseInt(params.get("minPrice") || "", 10);
  const maxPrice = parseInt(params.get("maxPrice") || "", 10);
  const beds = parseInt(params.get("beds") || "", 10);
  const baths = parseInt(params.get("baths") || "", 10);

  const form = document.getElementById("search-form");
  if (form) {
    form.q.value = params.get("q") || "";
    form.status.value = status;
    if (params.get("minPrice")) form.minPrice.value = params.get("minPrice");
    if (params.get("maxPrice")) form.maxPrice.value = params.get("maxPrice");
    if (params.get("beds")) form.beds.value = params.get("beds");
    if (params.get("baths")) form.baths.value = params.get("baths");
  }

  function priceInBand(listing) {
    const v = listing.rentPrice ?? listing.listPrice;
    if (v == null) return true;
    if (price === "0-300k" && v > 300000) return false;
    if (price === "300k-600k" && (v < 300000 || v > 600000)) return false;
    if (price === "600k-1m" && (v < 600000 || v > 1000000)) return false;
    if (price === "1m+" && v < 1000000) return false;
    if (!Number.isNaN(minPrice) && v < minPrice) return false;
    if (!Number.isNaN(maxPrice) && v > maxPrice) return false;
    return true;
  }

  function matchesStatus(listing) {
    if (status === "for-rent") return listing.status === "for-rent";
    if (status === "pending") return listing.status === "pending";
    if (status === "sold") return listing.status === "sold";
    return listing.status === "for-sale" || listing.status === "pending";
  }

  const results = LISTINGS.filter((l) => {
    if (!matchesStatus(l)) return false;
    if (!priceInBand(l)) return false;
    if (!Number.isNaN(beds) && (l.beds || 0) < beds) return false;
    if (!Number.isNaN(baths) && (l.bathsFull || 0) < baths) return false;
    if (!q) return true;
    const hay = [
      l.city,
      l.county,
      l.postalCode,
      l.street1,
      l.headline,
      l.remarks,
    ]
      .join(" ")
      .toLowerCase();
    return hay.includes(q);
  });

  const countEl = document.getElementById("result-count");
  const listEl = document.getElementById("results");
  if (countEl) countEl.textContent = String(results.length);

  if (!listEl) return;

  if (results.length === 0) {
    listEl.innerHTML = `
      <div class="card card--flat">
        <h2 style="margin:0;font-size:1rem;font-weight:600">No matches</h2>
        <p class="text-muted" style="margin:0.5rem 0 0;font-size:0.875rem;line-height:1.6">
          Try broadening your search or browse by
          <a href="maryland/index.html">Maryland county</a>.
          Connect your MLS/IDX feed to populate live inventory statewide.
        </p>
      </div>`;
    return;
  }

  listEl.innerHTML = results
    .map((l) => {
      const photo = l.photos?.[0];
      return `
        <a class="listing-card" href="listing.html?slug=${encodeURIComponent(l.slug)}">
          <div class="listing-card__media">
            ${photo ? `<img src="${photo}" alt="" loading="lazy" />` : "Photo"}
          </div>
          <div class="listing-card__body">
            <div class="listing-card__top">
              <div class="listing-card__title">${l.headline || l.street1}</div>
              <div class="listing-card__price">${formatPrice(l)}</div>
            </div>
            <p class="text-muted" style="margin:0.5rem 0 0;font-size:0.875rem">${formatAddress(l)}</p>
            <div class="pills">
              <span class="pill">${l.beds ?? "—"} bd</span>
              <span class="pill">${l.bathsFull ?? "—"} ba</span>
              <span class="pill">${l.livingAreaSqft ? l.livingAreaSqft.toLocaleString() + " sqft" : "Sqft —"}</span>
            </div>
          </div>
        </a>`;
    })
    .join("");
})();
