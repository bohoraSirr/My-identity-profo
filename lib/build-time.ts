import { cacheLife } from "next/cache";

/**
 * Cache Components rejects `new Date()` during prerendering because it differs
 * between renders. Wrapping it in `use cache` gives it an explicit lifetime, so
 * the value is computed once per deployment and reused for every visitor.
 */

export async function getBuildTime(): Promise<Date> {
  "use cache";
  cacheLife("max");
  return new Date();
}

export async function getCopyrightYear(): Promise<number> {
  "use cache";
  cacheLife("max");
  return new Date().getFullYear();
}
