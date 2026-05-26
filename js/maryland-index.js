(function () {
  const grid = document.getElementById("county-grid");
  if (!grid) return;

  grid.innerHTML = MARYLAND_COUNTIES.map((name) => {
    const slug = slugifyCounty(countyShortName(name));
    return `
      <a class="county-link" href="county.html?county=${encodeURIComponent(slug)}">
        <span>${name}</span>
        <span class="text-muted" style="font-size:0.75rem">Explore →</span>
      </a>`;
  }).join("");
})();
