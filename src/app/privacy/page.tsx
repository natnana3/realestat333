import { PageShell } from "@/components/PageShell";

export default function PrivacyPage() {
  return (
    <PageShell eyebrow="Legal" title="Privacy policy (draft)">
      <div className="prose max-w-none rounded-[var(--radius-lg)] bg-surface p-6 text-sm leading-6 text-muted ring-1 ring-border/60">
        <p>
          This draft page will be replaced with your finalized policy. We’ll
          implement cookie consent (if needed), analytics controls, and form data
          retention rules based on your jurisdiction and vendor stack.
        </p>
        <p className="mt-4">
          If you want, I can generate a production-ready policy once you confirm
          which tools you use (analytics, CRM, email/SMS).
        </p>
      </div>
    </PageShell>
  );
}

