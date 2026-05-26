import Link from "next/link";

const year = new Date().getFullYear();

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border/60">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="text-base font-semibold tracking-tight">
            realestat333
          </div>
          <p className="mt-3 max-w-md text-sm leading-6 text-muted">
            A full-service real estate company supporting buyers, sellers,
            renters, and investors. Built for speed, clarity, and confident
            decisions.
          </p>
        </div>

        <div className="text-sm">
          <div className="font-medium">Explore</div>
          <ul className="mt-3 space-y-2 text-muted">
            <li>
              <Link className="hover:text-foreground" href="/buy">
                Buy
              </Link>
            </li>
            <li>
              <Link className="hover:text-foreground" href="/sell">
                Sell
              </Link>
            </li>
            <li>
              <Link className="hover:text-foreground" href="/rent">
                Rent
              </Link>
            </li>
            <li>
              <Link className="hover:text-foreground" href="/invest">
                Invest
              </Link>
            </li>
          </ul>
        </div>

        <div className="text-sm">
          <div className="font-medium">Company</div>
          <ul className="mt-3 space-y-2 text-muted">
            <li>
              <Link className="hover:text-foreground" href="/about">
                About
              </Link>
            </li>
            <li>
              <Link className="hover:text-foreground" href="/agents">
                Agents
              </Link>
            </li>
            <li>
              <Link className="hover:text-foreground" href="/contact">
                Contact
              </Link>
            </li>
            <li>
              <Link className="hover:text-foreground" href="/privacy">
                Privacy
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border/60">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-6 text-xs text-muted md:flex-row md:items-center md:justify-between">
          <div>© {year} realestat333. All rights reserved.</div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span>Equal Housing Opportunity</span>
            <span className="text-muted/60">•</span>
            <span>Accessibility committed</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

