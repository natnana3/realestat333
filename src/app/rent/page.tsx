import { PageShell } from "@/components/PageShell";
import { ButtonLink } from "@/components/ui/Button";

export default function RentPage() {
  return (
    <PageShell eyebrow="For renters" title="Find a rental without the chaos">
      <div className="rounded-[var(--radius-lg)] bg-surface p-6 ring-1 ring-border/60">
        <p className="max-w-2xl text-sm leading-6 text-muted">
          Coming next: rental search, application-ready checklists, tour
          requests, and agent-assisted negotiation.
        </p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/search?status=for-rent" size="lg">
            Browse rentals
          </ButtonLink>
          <ButtonLink href="/contact" variant="secondary" size="lg">
            Talk to an advisor
          </ButtonLink>
        </div>
      </div>
    </PageShell>
  );
}

