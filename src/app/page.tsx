import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { QuickSearch } from "@/components/QuickSearch";
import { ButtonLink } from "@/components/ui/Button";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />

      <main className="flex-1">
        <section className="bg-quiet-grid">
          <div className="mx-auto max-w-6xl px-5 pb-16 pt-14 md:pb-24 md:pt-20">
            <div className="grid gap-10 md:grid-cols-12 md:items-center">
              <div className="md:col-span-7">
                <p className="inline-flex items-center gap-2 rounded-full bg-surface px-3 py-1 text-xs font-medium ring-1 ring-border/60">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  Established, full-service real estate
                </p>
                <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
                  Real estate decisions,
                  <span className="text-brand"> made confidently</span>.
                </h1>
                <p className="mt-5 max-w-xl text-pretty text-base leading-7 text-muted md:text-lg">
                  realestat333 supports buyers, sellers, renters, and investors
                  with a modern search experience, human-first guidance, and
                  neighborhood-level insight.
                </p>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <ButtonLink href="/buy" size="lg">
                    Explore homes for sale
                  </ButtonLink>
                  <ButtonLink href="/sell" variant="secondary" size="lg">
                    Get a pricing strategy
                  </ButtonLink>
                </div>

                <QuickSearch />
              </div>

              <div className="md:col-span-5">
                <div className="relative overflow-hidden rounded-[var(--radius-lg)] bg-surface shadow-[var(--shadow-premium)] ring-1 ring-border/60">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_15%,color-mix(in_oklab,var(--color-brand)_22%,transparent),transparent_52%),radial-gradient(circle_at_85%_55%,color-mix(in_oklab,var(--color-accent)_26%,transparent),transparent_55%)]" />
                  <div className="relative p-6 md:p-7">
                    <div className="text-sm font-medium">Market snapshot</div>
                    <p className="mt-2 text-sm leading-6 text-muted">
                      Track price trends, days-on-market, and neighborhood demand
                      — then share a short list with your advisor in one click.
                    </p>

                    <div className="mt-6 grid grid-cols-2 gap-3">
                      <div className="rounded-[var(--radius-md)] bg-surface-2 p-4 ring-1 ring-border/50">
                        <div className="text-xs text-muted">Saved searches</div>
                        <div className="mt-1 text-2xl font-semibold">Instant</div>
                        <div className="mt-1 text-xs text-muted">
                          Email alerts that matter
                        </div>
                      </div>
                      <div className="rounded-[var(--radius-md)] bg-surface-2 p-4 ring-1 ring-border/50">
                        <div className="text-xs text-muted">Lead response</div>
                        <div className="mt-1 text-2xl font-semibold">&lt; 5m</div>
                        <div className="mt-1 text-xs text-muted">
                          Smart routing + SMS
                        </div>
                      </div>
                      <div className="rounded-[var(--radius-md)] bg-surface-2 p-4 ring-1 ring-border/50">
                        <div className="text-xs text-muted">Tours</div>
                        <div className="mt-1 text-2xl font-semibold">Simple</div>
                        <div className="mt-1 text-xs text-muted">
                          Book in a few clicks
                        </div>
                      </div>
                      <div className="rounded-[var(--radius-md)] bg-surface-2 p-4 ring-1 ring-border/50">
                        <div className="text-xs text-muted">Offers</div>
                        <div className="mt-1 text-2xl font-semibold">
                          Clarity
                        </div>
                        <div className="mt-1 text-xs text-muted">
                          Data-backed strategy
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex items-center justify-between rounded-[var(--radius-md)] bg-background px-4 py-3 ring-1 ring-border/60">
                      <div className="text-xs text-muted">
                        Next: build your neighborhood hub pages
                      </div>
                      <span className="text-xs font-medium text-accent">
                        Coming online
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-16 md:py-20">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Buyer experience that’s actually fast",
                body: "Map search, filters that feel instant, save-and-share shortlists, and alerts designed to reduce noise — not add it.",
              },
              {
                title: "Seller strategy with proof",
                body: "Pricing ranges, comps, staging guidance, and a timeline that keeps you ahead of inspections, appraisal, and closing.",
              },
              {
                title: "Investing support end-to-end",
                body: "Rental analysis, cash-flow assumptions, area demand, and partner referrals for lending, insurance, and property management.",
              },
            ].map((c) => (
              <div
                key={c.title}
                className="rounded-[var(--radius-lg)] bg-surface p-6 shadow-sm ring-1 ring-border/60"
              >
                <div className="text-base font-semibold tracking-tight">
                  {c.title}
                </div>
                <p className="mt-2 text-sm leading-6 text-muted">{c.body}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
