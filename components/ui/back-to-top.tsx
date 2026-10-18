"use client";

import { ArrowUp } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

/** Floating "back to top" control, appearing after the first viewport. */
export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.button
          type="button"
          // CSS `scroll-behavior` (which already respects reduced motion) does
          // the animating here, so no behaviour option is needed.
          onClick={() => window.scrollTo({ top: 0 })}
          aria-label="Back to top"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.2 }}
          className="shadow-overlay fixed right-5 bottom-5 z-[65] flex h-10 w-10 items-center justify-center rounded-md border border-line bg-surface text-muted transition-colors hover:border-accent hover:text-accent sm:right-8 sm:bottom-8"
        >
          <ArrowUp className="h-4 w-4" aria-hidden />
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
