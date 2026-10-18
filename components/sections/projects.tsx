"use client";

import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";

import ProjectRow from "@/components/ui/project-row";
import Section from "@/components/ui/section";
import { projects } from "@/content/site";
import { cn } from "@/lib/utils";

const ALL = "All";

export default function Projects() {
  const tags = useMemo(() => {
    const unique = new Set<string>();
    projects.forEach((project) =>
      project.tags.forEach((tag) => unique.add(tag)),
    );
    return [ALL, ...Array.from(unique).sort()];
  }, []);

  const [activeTag, setActiveTag] = useState<string>(ALL);

  const visible = useMemo(
    () =>
      activeTag === ALL
        ? projects
        : projects.filter((project) => project.tags.includes(activeTag)),
    [activeTag],
  );

  return (
    <Section
      id="projects"
      title="Projects"
      intro="Six things I designed and built. Filter by the technology you're interested in."
    >
      <div className="mb-10 flex flex-wrap items-center gap-2">
        {tags.map((tag) => {
          const isActive = tag === activeTag;
          return (
            <button
              key={tag}
              type="button"
              onClick={() => setActiveTag(tag)}
              aria-pressed={isActive}
              className={cn(
                "relative rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors",
                isActive
                  ? "border-accent text-accent"
                  : "border-line text-muted hover:border-ink hover:text-ink",
              )}
            >
              {isActive ? (
                <motion.span
                  layoutId="project-filter-pill"
                  aria-hidden
                  className="absolute inset-0 rounded-full bg-surface-2"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              ) : null}
              <span className="relative">{tag}</span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.ul
          key={activeTag}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="flex flex-col"
        >
          {visible.map((project) => (
            <ProjectRow key={project.title} project={project} />
          ))}
        </motion.ul>
      </AnimatePresence>
    </Section>
  );
}
