import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { MARYLAND_COUNTIES, slugifyCounty } from "@/lib/md-counties";

export const metadata = {
  title: "Maryland counties",
  description:
    "Browse neighborhood and county hubs across Maryland. Market snapshots, featured areas, and listings—organized for clarity.",
};

export default function MarylandIndexPage() {
  return (
    <PageShell eyebrow="Maryland" title="All counties in Maryland">
      <div className="rounded-[var(--radius-lg)] bg-surface p-6 ring-1 ring-border/60">
        <p className="max-w-3xl text-sm leading-6 text-muted">
          These county hubs become the spine of your local SEO architecture: each
          county page gets unique editorial content, market stats, and an embedded
          listings module.
        </p>

        <div className="mt-6 grid gap-3 md:grid-cols-2">
          {MARYLAND_COUNTIES.map((name) => {
            const shortName = name.replace(/ County$/i, "");
            const slug = slugifyCounty(shortName);
            return (
              <Link
                key={name}
                href={`/maryland/${slug}`}
                className="group rounded-[var(--radius-md)] bg-background p-4 ring-1 ring-border/60 transition hover:bg-surface-2"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="text-sm font-medium">{name}</div>
                  <div className="text-xs text-muted group-hover:text-foreground">
                    Explore
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </PageShell>
  );
}

