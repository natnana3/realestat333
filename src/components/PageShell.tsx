import type { ReactNode } from "react";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export function PageShell({
  title,
  eyebrow,
  children,
}: {
  title: string;
  eyebrow?: string;
  children?: ReactNode;
}) {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-12 md:py-16">
        {eyebrow ? (
          <div className="text-xs font-medium text-muted">{eyebrow}</div>
        ) : null}
        <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
          {title}
        </h1>
        <div className="mt-8">{children}</div>
      </main>
      <SiteFooter />
    </div>
  );
}

