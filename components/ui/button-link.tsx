import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "text";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-accent text-accent-fg hover:opacity-90",
  outline: "border border-line text-ink hover:border-accent hover:text-accent",
  text: "text-muted underline decoration-line decoration-1 underline-offset-4 hover:text-ink hover:decoration-accent",
};

const SIZING: Record<Variant, string> = {
  primary: "px-4 py-2.5",
  outline: "px-4 py-2.5",
  text: "py-1",
};

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  /** Rendered before the label. Reserved for things that mean something. */
  icon?: ReactNode;
  external?: boolean;
  ariaLabel?: string;
};

/**
 * Anchor styled as a button. Server-safe: CSS transitions only.
 * No trailing arrow — a button that says what it does does not need one.
 */
export default function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
  icon,
  external,
  ariaLabel,
}: ButtonLinkProps) {
  const isExternal = external ?? /^https?:\/\//.test(href);

  return (
    <a
      href={href}
      aria-label={ariaLabel}
      {...(isExternal
        ? { target: "_blank", rel: "noopener noreferrer" }
        : undefined)}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium",
        "transition-colors duration-200 active:translate-y-px",
        SIZING[variant],
        VARIANTS[variant],
        className,
      )}
    >
      {icon}
      {children}
    </a>
  );
}
