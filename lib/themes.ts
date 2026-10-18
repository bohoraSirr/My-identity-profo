/**
 * Theme catalogue shared by the provider, the switcher and the inline script.
 *
 * The four are one family, not four skins: the same typography and structure,
 * with the ground and the accent moved. Light and Deepwater are cool; Phosphor
 * and Ember are dark and warm.
 */

export const THEMES = [
  {
    id: "light",
    label: "Daylight",
    description: "Cool paper, deep petrol",
  },
  {
    id: "dark",
    label: "Deepwater",
    description: "Graphite, aqua accent",
  },
  {
    id: "coder",
    label: "Phosphor",
    description: "Terminal green, monospace",
  },
  {
    id: "ember",
    label: "Ember",
    description: "Warm charcoal, amber",
  },
] as const;

export type ThemeId = (typeof THEMES)[number]["id"];

export const THEME_STORAGE_KEY = "portfolio-theme";
export const DEFAULT_THEME: ThemeId = "dark";

export function isThemeId(value: unknown): value is ThemeId {
  return (
    typeof value === "string" && THEMES.some((theme) => theme.id === value)
  );
}

/**
 * Runs before first paint so the correct theme is applied without a flash of
 * the default colours. Kept as a string because it must execute synchronously
 * inside the document, ahead of hydration.
 */
export const themeInitScript = `
(function () {
  try {
    var key = "${THEME_STORAGE_KEY}";
    var stored = localStorage.getItem(key);
    var valid = ["light", "dark", "coder", "ember"];
    var theme = valid.indexOf(stored) !== -1 ? stored : null;
    if (!theme) {
      theme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    document.documentElement.setAttribute("data-theme", theme);
  } catch (error) {
    document.documentElement.setAttribute("data-theme", "${DEFAULT_THEME}");
  }
})();
`.trim();
