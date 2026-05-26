(function () {
  const base = document.documentElement.getAttribute("data-base") || "";

  function href(path) {
    if (!path.startsWith("/")) return base + path;
    return base + path.slice(1);
  }

  const headerHtml = `
    <header class="site-header">
      <div class="container site-header__inner">
        <a class="logo" href="${href("index.html")}" aria-label="realestat333 home">
          <span class="logo__name">realestat<span class="logo__accent">333</span></span>
          <span class="logo__tag">Real Estate, Elevated</span>
        </a>
        <nav class="nav" aria-label="Primary">
          <a href="${href("buy.html")}">Buy</a>
          <a href="${href("sell.html")}">Sell</a>
          <a href="${href("rent.html")}">Rent</a>
          <a href="${href("invest.html")}">Invest</a>
          <a href="${href("services.html")}">Services</a>
        </nav>
        <a class="btn btn--secondary" href="${href("contact.html")}">Talk to an advisor</a>
        <button type="button" class="menu-toggle" aria-expanded="false" aria-controls="mobile-nav" id="menu-toggle">
          <span class="sr-only">Menu</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path d="M4 7h16M4 12h16M4 17h16"/>
          </svg>
        </button>
      </div>
      <nav class="mobile-nav" id="mobile-nav" aria-label="Mobile">
        <a href="${href("buy.html")}">Buy</a>
        <a href="${href("sell.html")}">Sell</a>
        <a href="${href("rent.html")}">Rent</a>
        <a href="${href("invest.html")}">Invest</a>
        <a href="${href("services.html")}">Services</a>
        <a href="${href("contact.html")}">Contact</a>
      </nav>
    </header>
  `;

  const year = new Date().getFullYear();
  const footerHtml = `
    <footer class="site-footer">
      <div class="container site-footer__grid">
        <div>
          <div class="logo__name">realestat333</div>
          <p class="page-intro" style="margin-top:0.75rem">
            A full-service real estate company supporting buyers, sellers, renters, and investors across every Maryland county.
          </p>
        </div>
        <div>
          <strong>Explore</strong>
          <ul>
            <li><a href="${href("buy.html")}">Buy</a></li>
            <li><a href="${href("sell.html")}">Sell</a></li>
            <li><a href="${href("rent.html")}">Rent</a></li>
            <li><a href="${href("invest.html")}">Invest</a></li>
            <li><a href="${href("maryland/index.html")}">Maryland counties</a></li>
          </ul>
        </div>
        <div>
          <strong>Company</strong>
          <ul>
            <li><a href="${href("about.html")}">About</a></li>
            <li><a href="${href("agents.html")}">Agents</a></li>
            <li><a href="${href("contact.html")}">Contact</a></li>
            <li><a href="${href("privacy.html")}">Privacy</a></li>
          </ul>
        </div>
      </div>
      <div class="container site-footer__bottom">
        <span>© ${year} realestat333. All rights reserved.</span>
        <span>Equal Housing Opportunity · Accessibility committed</span>
      </div>
    </footer>
  `;

  const headerSlot = document.getElementById("site-header");
  const footerSlot = document.getElementById("site-footer");
  if (headerSlot) headerSlot.outerHTML = headerHtml;
  if (footerSlot) footerSlot.outerHTML = footerHtml;

  const toggle = document.getElementById("menu-toggle");
  const mobileNav = document.getElementById("mobile-nav");
  if (toggle && mobileNav) {
    toggle.addEventListener("click", () => {
      const open = mobileNav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }
})();
