import Section from "@/components/ui/section";
import { Dash, Timeline, TimelineEntry } from "@/components/ui/timeline";
import { education } from "@/content/site";

export default function Education() {
  return (
    <Section
      id="education"
      title="Academic record"
      intro="Formal study, and the coursework that shaped how I approach a problem."
    >
      <Timeline>
        {education.map((item) => (
          <TimelineEntry key={`${item.degree}-${item.period}`} period={item.period}>
            <h3 className="font-display text-xl font-medium tracking-[-0.015em]">
              {item.degree}
            </h3>
            <p className="mt-1.5 text-[0.9375rem]">{item.institution}</p>
            <p className="mt-1 flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted">
              <span>{item.location}</span>
              <span>{item.grade}</span>
            </p>

            <ul className="mt-5 flex flex-col gap-2 text-[0.9375rem] leading-[1.75] text-muted">
              {item.details.map((detail) => (
                <Dash key={detail}>{detail}</Dash>
              ))}
            </ul>
          </TimelineEntry>
        ))}
      </Timeline>
    </Section>
  );
}
