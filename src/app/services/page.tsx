import { PageShell } from "@/components/PageShell";

const services = [
  {
    title: "Residential buying & selling",
    body: "Search strategy, tours, negotiations, inspections, and closing—handled with discipline and calm.",
  },
  {
    title: "Luxury & off-market",
    body: "Discreet marketing, vetted buyers, curated showings, and premium presentation.",
  },
  {
    title: "Rentals & relocation",
    body: "Neighborhood matching, shortlists, tour routing, and lease review support.",
  },
  {
    title: "Investor services",
    body: "Deal sourcing, underwriting support, rent comps, and vetted partner referrals.",
  },
  {
    title: "Commercial (select markets)",
    body: "Space discovery, comparables, and negotiation support—when aligned with your objectives.",
  },
  {
    title: "New construction",
    body: "Builder relationships, upgrade guidance, timelines, and walkthrough support.",
  },
];

export default function ServicesPage() {
  return (
    <PageShell eyebrow="Capabilities" title="Full-service real estate, end-to-end">
      <div className="grid gap-4 md:grid-cols-2">
        {services.map((s) => (
          <div
            key={s.title}
            className="rounded-[var(--radius-lg)] bg-surface p-6 ring-1 ring-border/60"
          >
            <div className="text-base font-semibold tracking-tight">
              {s.title}
            </div>
            <p className="mt-2 text-sm leading-6 text-muted">{s.body}</p>
          </div>
        ))}
      </div>
    </PageShell>
  );
}

