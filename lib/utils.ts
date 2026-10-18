/**
 * Tiny class-name joiner.
 * Keeps the dependency list small instead of pulling in clsx + tailwind-merge.
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/** Formats an ISO-ish date string into a readable label without locale drift. */
export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
