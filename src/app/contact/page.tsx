import { PageShell } from "@/components/PageShell";
import { Button } from "@/components/ui/Button";

export default function ContactPage() {
  return (
    <PageShell eyebrow="Contact" title="Start a conversation">
      <div className="grid gap-6 md:grid-cols-2">
        <form
          className="rounded-[var(--radius-lg)] bg-surface p-6 ring-1 ring-border/60"
          action="#"
        >
          <div className="grid gap-4">
            <label className="grid gap-2">
              <span className="text-xs font-medium text-muted">Name</span>
              <input
                name="name"
                className="h-11 rounded-[var(--radius-md)] bg-background px-3 text-sm ring-1 ring-border/70 focus:ring-2 focus:ring-[color:var(--color-ring)]"
                required
              />
            </label>
            <label className="grid gap-2">
              <span className="text-xs font-medium text-muted">Email</span>
              <input
                type="email"
                name="email"
                className="h-11 rounded-[var(--radius-md)] bg-background px-3 text-sm ring-1 ring-border/70 focus:ring-2 focus:ring-[color:var(--color-ring)]"
                required
              />
            </label>
            <label className="grid gap-2">
              <span className="text-xs font-medium text-muted">How can we help?</span>
              <textarea
                name="message"
                rows={5}
                className="rounded-[var(--radius-md)] bg-background p-3 text-sm ring-1 ring-border/70 focus:ring-2 focus:ring-[color:var(--color-ring)]"
                placeholder="Buying, selling, renting, investing, commercial…"
                required
              />
            </label>
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs text-muted">
                We’ll reply quickly and route you to the right specialist.
              </p>
              <Button type="submit" size="lg">
                Send
              </Button>
            </div>
          </div>
        </form>

        <div className="rounded-[var(--radius-lg)] bg-surface p-6 ring-1 ring-border/60">
          <div className="text-sm font-medium">What happens next</div>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li>We confirm your needs (area, timeline, constraints).</li>
            <li>We match you with a specialized advisor.</li>
            <li>We set a plan: search, pricing, or investing model.</li>
          </ul>
          <div className="mt-6 rounded-[var(--radius-md)] bg-surface-2 p-5 ring-1 ring-border/50">
            <div className="text-xs font-medium text-muted">Compliance</div>
            <p className="mt-2 text-sm leading-6 text-muted">
              We follow Fair Housing best practices in all marketing and
              communications, and we’re committed to accessibility.
            </p>
          </div>
        </div>
      </div>
    </PageShell>
  );
}

