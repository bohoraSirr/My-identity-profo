import type { ReactNode } from "react";

import Reveal from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

type SectionProps = {
  id: string;
  title: string;
  /** Standfirst: one or two sentences that set up the content below. */
  intro?: string;
  children: ReactNode;
  className?: string;
};

/**
 * A section is a rule, a title in the margin, and a column of content.
 *
 * The title sticks alongside the content as you scroll, so the page never needs
 * a separate label above each block. On narrow screens the margin collapses and
 * the title simply sits above the content.
 */
export default function Section({
  id,
  title,
  intro,
  children,
  className,
}: SectionProps) {
  const headingId = `${id}-heading`;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cn("border-t border-line", className)}
    >
      <div className="container-page grid gap-x-12 gap-y-6 py-16 sm:py-20 lg:grid-cols-[minmax(0,11rem)_minmax(0,1fr)] lg:gap-x-16 lg:py-24">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <h2
            id={headingId}
            className="font-display text-2xl leading-[1.2] font-medium tracking-[-0.015em] lg:text-[1.625rem]"
          >
            {title}
          </h2>
        </div>

        <Reveal className="min-w-0">
          {intro ? (
            <p className="measure mb-12 text-[1.0625rem] leading-[1.75] text-muted">
              {intro}
            </p>
          ) : null}

          {children}
        </Reveal>
      </div>
    </section>
  );
}
