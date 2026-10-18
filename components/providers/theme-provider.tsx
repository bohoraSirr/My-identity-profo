"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";

import {
  DEFAULT_THEME,
  THEME_STORAGE_KEY,
  isThemeId,
  type ThemeId,
} from "@/lib/themes";

type ThemeContextValue = {
  theme: ThemeId;
  setTheme: (theme: ThemeId) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

const TRANSITION_CLASS = "theme-transitioning";
const TRANSITION_MS = 360;
/** Internal event so every subscriber re-reads the DOM attribute. */
const THEME_EVENT = "portfolio:theme";

/**
 * The DOM (`html[data-theme]`) is the single source of truth — the inline
 * script in the layout sets it before first paint, so React only has to follow
 * it. `useSyncExternalStore` reads it without a mount effect and without a
 * hydration mismatch: the server snapshot is the default, then React re-reads
 * the real attribute as soon as it hydrates.
 */
function subscribe(onStoreChange: () => void): () => void {
  window.addEventListener(THEME_EVENT, onStoreChange);
  window.addEventListener("storage", onStoreChange);
  return () => {
    window.removeEventListener(THEME_EVENT, onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

function getSnapshot(): ThemeId {
  const current = document.documentElement.getAttribute("data-theme");
  return isThemeId(current) ? current : DEFAULT_THEME;
}

function getServerSnapshot(): ThemeId {
  return DEFAULT_THEME;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setTheme = useCallback((next: ThemeId) => {
    const root = document.documentElement;
    if (root.getAttribute("data-theme") === next) return;

    // Cross-fade colours instead of snapping between themes.
    root.classList.add(TRANSITION_CLASS);
    window.setTimeout(
      () => root.classList.remove(TRANSITION_CLASS),
      TRANSITION_MS,
    );

    root.setAttribute("data-theme", next);

    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      /* Private mode / storage disabled — the theme simply won't persist. */
    }

    window.dispatchEvent(new Event(THEME_EVENT));
  }, []);

  const value = useMemo(() => ({ theme, setTheme }), [theme, setTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used inside <ThemeProvider>");
  }
  return context;
}
