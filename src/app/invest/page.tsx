import { PageShell } from "@/components/PageShell";
import { ButtonLink } from "@/components/ui/Button";

export default function InvestPage() {
  return (
    <PageShell eyebrow="For investors" title="Invest with underwriting discipline">
      <div className="grid gap-6 rounded-[var(--radius-lg)] bg-surface p-6 ring-1 ring-border/60 md:grid-cols-2">
        <div>
          <p className="text-sm leading-6 text-muted">
            We’ll add rental comps, cash-flow scenarios, cap-rate assumptions,
            and investor-ready reporting you can export and share.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/contact" size="lg">
              Discuss criteria
            </ButtonLink>
            <ButtonLink href="/services" variant="secondary" size="lg">
              Investment services
            </ButtonLink>
          </div>
        </div>
        <div className="rounded-[var(--radius-md)] bg-surface-2 p-5 ring-1 ring-border/50">
          <div className="text-sm font-medium">Planned analytics</div>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li>Rent estimate bands + confidence score</li>
            <li>Expense presets by property type</li>
            <li>IRR / CoC return calculators</li>
            <li>Exportable pro-forma</li>
          </ul>
        </div>
      </div>
    </PageShell>
  );
}

