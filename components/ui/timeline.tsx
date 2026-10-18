import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * A chronological record set on a two-column row: the date sits in the margin,
 * the entry fills the rest. No connector line and no icon tiles — the dates
 * already read as a sequence, so drawing it adds nothing.
 */

export function Timeline({ children }: { children: ReactNode }) {
  return <ol className="flex flex-col">{children}</ol>;
}

type TimelineEntryProps = {
  period: string;
  children: ReactNode;
  className?: string;
};

export function TimelineEntry({
  period,
  children,
  className,
}: TimelineEntryProps) {
  return (
    <li
      className={cn(
        "grid gap-x-10 gap-y-3 border-t border-line py-9 first:border-t-0 first:pt-0",
        "sm:grid-cols-[8rem_minmax(0,1fr)]",
        className,
      )}
    >
      <p className="font-display text-[0.9375rem] text-muted">{period}</p>
      <div className="min-w-0">{children}</div>
    </li>
  );
}

/** Hairline dash used as a list marker, in place of a bullet or an icon. */
export function Dash({ children }: { children: ReactNode }) {
  return (
    <li className="flex gap-3">
      <span
        aria-hidden
        className="mt-[0.72em] h-px w-3 shrink-0 bg-line"
      />
      <span>{children}</span>
    </li>
  );
}
