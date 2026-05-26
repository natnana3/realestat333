import { notFound } from "next/navigation";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { MARYLAND_COUNTIES, slugifyCounty } from "@/lib/md-counties";

type Params = { county: string };

export async function generateStaticParams(): Promise<Params[]> {
  return MARYLAND_COUNTIES.map((name) => {
    const shortName = name.replace(/ County$/i, "");
    return { county: slugifyCounty(shortName) };
  });
}

export default function CountyPage({ params }: { params: Params }) {
  const match = MARYLAND_COUNTIES.find((name) => {
    const shortName = name.replace(/ County$/i, "");
    return slugifyCounty(shortName) === params.county;
  });

  if (!match) notFound();

  const countyName = match;
  const shortName = countyName.replace(/ County$/i, "");

  return (
    <PageShell eyebrow="Maryland" title={`${countyName}`}>
      <div className="grid gap-6">
        <div className="rounded-[var(--radius-lg)] bg-surface p-6 ring-1 ring-border/60">
          <p className="max-w-3xl text-sm leading-6 text-muted">
            Next we’ll enrich this page with: unique editorial content for{" "}
            <span className="font-medium text-foreground">{shortName}</span>,
            market stats, top neighborhoods, schools/amenities modules, and a
            county-scoped listings feed.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href={`/search?q=${encodeURIComponent(shortName)}&status=for-sale`}
              className="rounded-[var(--radius-md)] bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-2"
            >
              Browse homes for sale
            </Link>
            <Link
              href={`/search?q=${encodeURIComponent(shortName)}&status=for-rent`}
              className="rounded-[var(--radius-md)] bg-background px-4 py-2 text-sm font-medium ring-1 ring-border/60 hover:bg-surface-2"
            >
              Browse rentals
            </Link>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              k: "County hub SEO",
              v: "Editorial + listings module",
            },
            {
              k: "Market stats",
              v: "Price trends, DOM, inventory",
            },
            {
              k: "Lead routing",
              v: "County specialist assignment",
            },
          ].map((card) => (
            <div
              key={card.k}
              className="rounded-[var(--radius-lg)] bg-surface p-6 ring-1 ring-border/60"
            >
              <div className="text-xs font-medium text-muted">{card.k}</div>
              <div className="mt-2 text-base font-semibold tracking-tight">
                {card.v}
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  );
}

