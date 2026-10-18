import { cn } from "@/lib/utils";
import type { Project } from "@/content/site";

/**
 * A project as a full-width row rather than a card: title in the display serif
 * on one side, the substance on the other, a rule between entries. Reads like a
 * record of work instead of a grid of identical tiles.
 */
export default function ProjectRow({
  project,
  className,
}: {
  project: Project;
  className?: string;
}) {
  return (
    <li
      className={cn(
        "grid gap-x-12 gap-y-5 border-t border-line py-9 first:border-t-0 first:pt-0",
        "lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]",
        className,
      )}
    >
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="font-display text-xl font-medium tracking-[-0.015em]">
            {project.title}
          </h3>
          {project.featured ? (
            <span className="text-xs text-accent">Featured</span>
          ) : null}
        </div>

        <p className="text-sm text-muted">{project.summary}</p>

        <ul className="mt-1 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-line bg-surface-2 px-2.5 py-1 font-mono text-[0.6875rem] text-muted"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-5">
        <p className="measure text-[0.9375rem] leading-[1.75] text-muted">
          {project.description}
        </p>

        {project.liveUrl || project.repoUrl ? (
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open the live demo of ${project.title}`}
                className="text-sm font-medium text-ink underline decoration-line decoration-1 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
              >
                Live demo
              </a>
            ) : null}

            {project.repoUrl ? (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open the source code of ${project.title}`}
                className="text-sm font-medium text-muted underline decoration-line decoration-1 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
              >
                Source
              </a>
            ) : null}
          </div>
        ) : null}
      </div>
    </li>
  );
}
