import { PageShell } from "@/components/PageShell";
import { ButtonLink } from "@/components/ui/Button";

export default function SellPage() {
  return (
    <PageShell eyebrow="For sellers" title="A pricing strategy you can defend">
      <div className="grid gap-6 rounded-[var(--radius-lg)] bg-surface p-6 ring-1 ring-border/60 md:grid-cols-2">
        <div>
          <p className="text-sm leading-6 text-muted">
            We’ll implement a seller intake flow, CMA request, timeline, and a
            marketing plan builder that generates a shareable listing packet.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/contact" size="lg">
              Request a consult
            </ButtonLink>
            <ButtonLink href="/services" variant="secondary" size="lg">
              See services
            </ButtonLink>
          </div>
        </div>
        <div className="rounded-[var(--radius-md)] bg-surface-2 p-5 ring-1 ring-border/50">
          <div className="text-sm font-medium">Seller toolkit</div>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li>Home value range (with comps)</li>
            <li>Prep checklist + staging guidance</li>
            <li>Marketing timeline + milestones</li>
            <li>Offer review + negotiation plan</li>
          </ul>
        </div>
      </div>
    </PageShell>
  );
}

