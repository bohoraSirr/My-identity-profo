import Section from "@/components/ui/section";
import { hobbies } from "@/content/site";

export default function Hobbies() {
  return (
    <Section
      id="hobbies"
      title="Hobbies"
      intro="What I do when I'm not at a keyboard. It shows up in the work more than you'd think."
    >
      <ul className="grid gap-x-12 sm:grid-cols-2">
        {hobbies.map((hobby) => (
          <li key={hobby.title} className="border-t border-line py-6">
            <h3 className="font-display text-lg font-medium tracking-[-0.01em]">
              {hobby.title}
            </h3>
            <p className="measure-tight mt-1.5 text-[0.9375rem] leading-[1.7] text-muted">
              {hobby.description}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
