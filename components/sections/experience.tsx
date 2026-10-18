import Section from "@/components/ui/section";
import { Dash, Timeline, TimelineEntry } from "@/components/ui/timeline";
import { experience } from "@/content/site";

export default function Experience() {
  return (
    <Section
      id="experience"
      title="Experience"
      intro="Where I've worked, what I owned, and what changed as a result."
    >
      <Timeline>
        {experience.map((item) => (
          <TimelineEntry key={`${item.role}-${item.company}`} period={item.period}>
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h3 className="font-display text-xl font-medium tracking-[-0.015em]">
                {item.role}
              </h3>
              <p className="text-sm text-muted">{item.type}</p>
            </div>

            <p className="mt-1.5 text-[0.9375rem]">{item.company}</p>
            <p className="mt-1 text-sm text-muted">{item.location}</p>

            <p className="measure mt-5 text-[0.9375rem] leading-[1.75] text-muted">
              {item.summary}
            </p>

            <ul className="mt-4 flex flex-col gap-2 text-[0.9375rem] leading-[1.75] text-muted">
              {item.highlights.map((highlight) => (
                <Dash key={highlight}>{highlight}</Dash>
              ))}
            </ul>

            <ul className="mt-6 flex flex-wrap gap-1.5">
              {item.tech.map((tech) => (
                <li
                  key={tech}
                  className="rounded-full border border-line bg-surface-2 px-2.5 py-1 font-mono text-[0.6875rem] text-muted"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </TimelineEntry>
        ))}
      </Timeline>
    </Section>
  );
}
