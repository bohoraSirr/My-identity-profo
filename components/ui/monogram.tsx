import { cn } from "@/lib/utils";

type MonogramProps = {
  text: string;
  className?: string;
};

/**
 * Solid accent tile with the initials set in the display serif. Used as the
 * avatar fallback so the page reads as finished before a real photo exists.
 */
export default function Monogram({ text, className }: MonogramProps) {
  return (
    <span
      aria-hidden
      className={cn(
        "font-display inline-flex items-center justify-center bg-accent leading-none font-medium tracking-[-0.02em] text-accent-fg select-none",
        className,
      )}
    >
      {text}
    </span>
  );
}
