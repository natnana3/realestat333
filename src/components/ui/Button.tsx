import Link from "next/link";
import type { ComponentProps } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ComponentProps<"button"> & { variant?: ButtonVariant; size?: ButtonSize }) {
  return (
    <button
      {...props}
      className={cx(
        "inline-flex items-center justify-center gap-2 rounded-[var(--radius-md)] px-4 font-medium transition",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-background)]",
        "disabled:opacity-50 disabled:pointer-events-none",
        size === "sm" && "h-9 text-sm",
        size === "md" && "h-11 text-sm",
        size === "lg" && "h-12 text-base px-5",
        variant === "primary" &&
          "bg-brand text-white shadow-sm hover:bg-brand-2",
        variant === "secondary" &&
          "bg-surface text-foreground ring-1 ring-border hover:bg-surface-2",
        variant === "ghost" &&
          "bg-transparent text-foreground hover:bg-surface-2",
        className
      )}
    />
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ComponentProps<typeof Link> & { variant?: ButtonVariant; size?: ButtonSize }) {
  return (
    <Link
      {...props}
      className={cx(
        "inline-flex items-center justify-center gap-2 rounded-[var(--radius-md)] px-4 font-medium transition",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-background)]",
        size === "sm" && "h-9 text-sm",
        size === "md" && "h-11 text-sm",
        size === "lg" && "h-12 text-base px-5",
        variant === "primary" &&
          "bg-brand text-white shadow-sm hover:bg-brand-2",
        variant === "secondary" &&
          "bg-surface text-foreground ring-1 ring-border hover:bg-surface-2",
        variant === "ghost" &&
          "bg-transparent text-foreground hover:bg-surface-2",
        className
      )}
    />
  );
}

