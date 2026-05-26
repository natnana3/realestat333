import { PageShell } from "@/components/PageShell";
import { ButtonLink } from "@/components/ui/Button";

export default function AgentsPage() {
  return (
    <PageShell eyebrow="Team" title="Meet the agents">
      <div className="rounded-[var(--radius-lg)] bg-surface p-6 ring-1 ring-border/60">
        <p className="max-w-2xl text-sm leading-6 text-muted">
          Next we’ll add agent profiles with credentials, service areas, reviews
          (with valid schema), and routing so inquiries land with the right
          specialist immediately.
        </p>
        <div className="mt-5">
          <ButtonLink href="/contact" size="lg">
            Talk to the team
          </ButtonLink>
        </div>
      </div>
    </PageShell>
  );
}

