import { PageShell } from "@/components/PageShell";
import { ButtonLink } from "@/components/ui/Button";

export default function BuyPage() {
  return (
    <PageShell
      eyebrow="For buyers"
      title="Search homes with speed and clarity"
    >
      <div className="grid gap-6 rounded-[var(--radius-lg)] bg-surface p-6 ring-1 ring-border/60 md:grid-cols-2">
        <div>
          <p className="text-sm leading-6 text-muted">
            This is where we’ll ship advanced search (map + filters), saved
            searches, shortlists, and listing pages with full SEO/schema.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/search" size="lg">
              Open search
            </ButtonLink>
            <ButtonLink href="/contact" variant="secondary" size="lg">
              Get matched to an advisor
            </ButtonLink>
          </div>
        </div>
        <div className="rounded-[var(--radius-md)] bg-surface-2 p-5 ring-1 ring-border/50">
          <div className="text-sm font-medium">Next features</div>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li>Map-first browsing with draw-to-search</li>
            <li>Instant filters + sort + compare</li>
            <li>Saved searches + email alerts</li>
            <li>Schedule tours + share shortlists</li>
          </ul>
        </div>
      </div>
    </PageShell>
  );
}

