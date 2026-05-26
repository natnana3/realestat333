(function () {
  const slug = new URLSearchParams(window.location.search).get("slug");
  const root = document.getElementById("listing-root");
  if (!slug || !root) return;

  const listing = getListingBySlug(slug);
  if (!listing) {
    root.innerHTML = `
      <div class="card card--flat">
        <h1 class="page-title">Listing not found</h1>
        <p class="page-intro">This listing may have been removed or the link is incorrect.</p>
        <p style="margin-top:1rem"><a class="btn btn--primary" href="search.html">Back to search</a></p>
      </div>`;
    return;
  }

  document.title = `${listing.headline || listing.street1} — realestat333`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: listing.headline || formatAddress(listing),
    description: listing.remarks,
    offers: {
      "@type": "Offer",
      price: String(listing.rentPrice ?? listing.listPrice ?? ""),
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    about: {
      "@type": "SingleFamilyResidence",
      address: formatAddress(listing),
      numberOfBedrooms: listing.beds,
      geo:
        listing.lat != null
          ? {
              "@type": "GeoCoordinates",
              latitude: listing.lat,
              longitude: listing.lng,
            }
          : undefined,
    },
    image: listing.photos,
  };

  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(jsonLd);
  document.head.appendChild(script);

  const photos = (listing.photos || [])
    .map(
      (url) =>
        `<img src="${url}" alt="Property photo" loading="lazy" />`
    )
    .join("");

  root.innerHTML = `
    <p class="eyebrow">Listing</p>
    <h1 class="page-title">${listing.headline || "Listing details"}</h1>

    <div class="card card--flat" style="margin-top:2rem">
      <div style="display:flex;flex-wrap:wrap;justify-content:space-between;gap:1rem;align-items:flex-start">
        <div>
          <p class="text-muted" style="margin:0;font-size:0.875rem">${formatAddress(listing)}</p>
          <div class="pills" style="margin-top:0.75rem">
            <span class="pill">${listing.beds ?? "—"} bd</span>
            <span class="pill">${listing.bathsFull ?? "—"} ba</span>
            <span class="pill">${listing.livingAreaSqft ? listing.livingAreaSqft.toLocaleString() + " sq ft" : "Sqft —"}</span>
            <span class="pill">${listing.county}</span>
          </div>
        </div>
        <div style="font-size:1.5rem;font-weight:600">${formatPrice(listing)}</div>
      </div>
    </div>

    <div class="card card--flat" style="margin-top:1.5rem">
      <strong>Photos</strong>
      <div class="gallery">${photos || '<p class="text-muted" style="margin:1rem 0 0;font-size:0.875rem">Photos from IDX feed.</p>'}</div>
    </div>

    <div class="card card--flat" style="margin-top:1.5rem">
      <strong>Description</strong>
      <p class="text-muted" style="margin:0.75rem 0 0;font-size:0.875rem;line-height:1.65">${listing.remarks}</p>
    </div>

    <p style="margin-top:2rem">
      <a class="btn btn--primary" href="contact.html">Schedule a tour</a>
      <a class="btn btn--secondary" href="search.html" style="margin-left:0.5rem">More listings</a>
    </p>
  `;
})();
