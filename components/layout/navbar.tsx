"use client";

import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

import Monogram from "@/components/ui/monogram";
import ThemeSwitcher from "@/components/ui/theme-switcher";
import { navSections, profile } from "@/content/site";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("");

  /* Solidify the header once the page has moved. */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Highlight the section currently crossing the middle of the viewport. */
  useEffect(() => {
    const elements = navSections
      .map((section) => document.getElementById(section.id))
      .filter((element): element is HTMLElement => element !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const mostVisible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (mostVisible) setActiveId(mostVisible.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.2, 0.5, 1] },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  /* Stop the page scrolling behind the mobile menu. */
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  /* The mobile menu is redundant on desktop — close it if the viewport grows. */
  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    const onChange = () => {
      if (query.matches) setOpen(false);
    };
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled || open
          ? "border-b border-line bg-canvas/85 backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <nav
        aria-label="Primary"
        className="container-page flex h-16 items-center justify-between gap-3 sm:h-18"
      >
        {/**
         * No aria-label here: the visible monogram and name already name the
         * link, and an explicit label that does not exactly match the visible
         * text fails axe's label-content-name-mismatch. The name is therefore
         * shown at every width, so the link is never unnamed on mobile.
         */}
        <a href="#top" className="flex shrink-0 items-center gap-2.5">
          <Monogram
            text={profile.initials}
            className="h-8 w-8 rounded-md text-xs"
          />
          <span className="font-display text-[0.9375rem] font-medium tracking-[-0.01em]">
            {profile.name}
          </span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {navSections.map((section) => {
            const isActive = activeId === section.id;
            return (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "relative inline-flex px-3 py-2 text-[13px] font-medium transition-colors xl:text-sm",
                    isActive ? "text-accent" : "text-muted hover:text-ink",
                  )}
                >
                  {isActive ? (
                    <motion.span
                      layoutId="nav-underline"
                      aria-hidden
                      className="absolute inset-x-3 bottom-0.5 h-px bg-accent"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 32,
                      }}
                    />
                  ) : null}
                  {section.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex shrink-0 items-center gap-2">
          <ThemeSwitcher />
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-line text-ink transition-colors hover:border-accent hover:text-accent lg:hidden"
          >
            {open ? (
              <X className="h-5 w-5" aria-hidden />
            ) : (
              <Menu className="h-5 w-5" aria-hidden />
            )}
          </button>
        </div>
      </nav>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            id="mobile-nav"
            key="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-line bg-canvas/95 backdrop-blur-xl lg:hidden"
          >
            <ul className="container-page flex flex-col py-3">
              {navSections.map((section, index) => {
                const isActive = activeId === section.id;
                return (
                  <motion.li
                    key={section.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.03 * index, duration: 0.25 }}
                  >
                    <a
                      href={`#${section.id}`}
                      onClick={() => setOpen(false)}
                      aria-current={isActive ? "true" : undefined}
                      className={cn(
                        "block border-t border-line px-1 py-3.5 text-base font-medium transition-colors",
                        index === 0 && "border-t-0",
                        isActive ? "text-accent" : "text-ink hover:text-accent",
                      )}
                    >
                      {section.label}
                    </a>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
