import Section from "@/components/ui/section";
import { skillAreas } from "@/content/site";

export default function Skills() {
  return (
    <Section
      id="skills"
      title="Skills"
      intro="What I can actually do, in words. The tools I do it with are listed under Tech stack, so the two sections don't repeat each other."
    >
      <ul className="grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {skillAreas.map((area) => (
          <li
            key={area.title}
            className="flex flex-col gap-2.5 border-t border-line pt-5"
          >
            <h3 className="font-display text-lg font-medium tracking-[-0.01em]">
              {area.title}
            </h3>
            <p className="text-sm leading-[1.7] text-muted">
              {area.description}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
