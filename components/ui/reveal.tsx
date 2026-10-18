import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Marks a block for the CSS scroll-driven reveal defined in `globals.css`.
 *
 * Deliberately a Server Component and deliberately not JS-driven: the content
 * ships visible, and only browsers that support scroll-driven animations fade
 * it in. Nothing here can hide the page if JavaScript is slow or missing.
 */
export default function Reveal({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div data-reveal className={cn(className)}>
      {children}
    </div>
  );
}
