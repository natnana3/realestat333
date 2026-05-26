import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/75 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link
          href="/"
          className="group inline-flex items-baseline gap-2 rounded-[var(--radius-sm)] px-2 py-1 hover:bg-surface-2"
          aria-label="realestat333 home"
        >
          <span className="text-lg font-semibold tracking-tight">
            realestat333
          </span>
          <span className="hidden text-xs text-muted md:inline">
            Real Estate, Elevated
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          <Link
            href="/buy"
            className="rounded-[var(--radius-sm)] px-3 py-2 text-sm text-foreground/90 hover:bg-surface-2"
          >
            Buy
          </Link>
          <Link
            href="/sell"
            className="rounded-[var(--radius-sm)] px-3 py-2 text-sm text-foreground/90 hover:bg-surface-2"
          >
            Sell
          </Link>
          <Link
            href="/rent"
            className="rounded-[var(--radius-sm)] px-3 py-2 text-sm text-foreground/90 hover:bg-surface-2"
          >
            Rent
          </Link>
          <Link
            href="/invest"
            className="rounded-[var(--radius-sm)] px-3 py-2 text-sm text-foreground/90 hover:bg-surface-2"
          >
            Invest
          </Link>
          <Link
            href="/services"
            className="rounded-[var(--radius-sm)] px-3 py-2 text-sm text-foreground/90 hover:bg-surface-2"
          >
            Services
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <ButtonLink variant="secondary" size="sm" href="/contact">
            Talk to an advisor
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}

