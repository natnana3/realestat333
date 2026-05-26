import { PageShell } from "@/components/PageShell";

export default function AboutPage() {
  return (
    <PageShell eyebrow="Company" title="About realestat333">
      <div className="grid gap-6 rounded-[var(--radius-lg)] bg-surface p-6 ring-1 ring-border/60 md:grid-cols-2">
        <p className="text-sm leading-6 text-muted">
          realestat333 is an established real estate company built around local
          expertise and modern systems. Our mission is simple: reduce friction,
          increase confidence, and help clients make better decisions faster.
        </p>
        <div className="rounded-[var(--radius-md)] bg-surface-2 p-5 ring-1 ring-border/50">
          <div className="text-sm font-medium">What we prioritize</div>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li>Speed (Core Web Vitals-first)</li>
            <li>Clarity (less noise, better guidance)</li>
            <li>Trust (compliance + transparent processes)</li>
            <li>Local depth (neighborhood-first content)</li>
          </ul>
        </div>
      </div>
    </PageShell>
  );
}

