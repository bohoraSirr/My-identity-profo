"use client";

import {
  Check,
  ChevronDown,
  Flame,
  Moon,
  Sun,
  Terminal,
  type LucideIcon,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { useTheme } from "@/components/providers/theme-provider";
import { THEMES, type ThemeId } from "@/lib/themes";
import { cn } from "@/lib/utils";

const ICONS: Record<ThemeId, LucideIcon> = {
  light: Sun,
  dark: Moon,
  coder: Terminal,
  ember: Flame,
};

type ThemeSwitcherProps = {
  className?: string;
  /** Renders the theme name next to the icon on wider screens. */
  showLabel?: boolean;
};

export default function ThemeSwitcher({
  className,
  showLabel = true,
}: ThemeSwitcherProps) {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const active = THEMES.find((item) => item.id === theme) ?? THEMES[0];
  const ActiveIcon = ICONS[active.id];

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Theme: ${active.label}. Change theme`}
        className="inline-flex items-center gap-2 rounded-md border border-line px-3 py-2 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent"
      >
        <ActiveIcon className="h-4 w-4" aria-hidden />
        {showLabel ? (
          <span className="hidden sm:inline">{active.label}</span>
        ) : null}
        <ChevronDown
          aria-hidden
          className={cn(
            "h-3.5 w-3.5 transition-transform duration-200",
            open && "rotate-180",
          )}
        />
      </button>

      <AnimatePresence>
        {open ? (
          <motion.ul
            role="listbox"
            aria-label="Choose a theme"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            className="shadow-overlay absolute right-0 z-50 mt-2 w-60 origin-top-right overflow-hidden rounded-lg border border-line bg-surface p-1"
          >
            {THEMES.map((item) => {
              const Icon = ICONS[item.id];
              const isActive = item.id === theme;

              return (
                <li key={item.id}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={isActive}
                    onClick={() => {
                      setTheme(item.id);
                      setOpen(false);
                    }}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm transition-colors",
                      isActive ? "bg-surface-2" : "hover:bg-surface-2",
                    )}
                  >
                    <Icon
                      aria-hidden
                      className={cn(
                        "h-4 w-4 shrink-0",
                        isActive ? "text-accent" : "text-muted",
                      )}
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block font-medium">{item.label}</span>
                      <span className="block truncate text-xs text-muted">
                        {item.description}
                      </span>
                    </span>
                    {isActive ? (
                      <Check
                        className="h-4 w-4 shrink-0 text-accent"
                        aria-hidden
                      />
                    ) : null}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
