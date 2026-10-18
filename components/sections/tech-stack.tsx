import Section from "@/components/ui/section";
import { techStack } from "@/content/site";

/**
 * Grouped by category in the order the categories first appear in content.
 * A plain inventory, set in the mono face because these names are code.
 */
function groupByCategory(): Array<{ category: string; names: string[] }> {
  const groups = new Map<string, string[]>();

  for (const tech of techStack) {
    const names = groups.get(tech.category);
    if (names) names.push(tech.name);
    else groups.set(tech.category, [tech.name]);
  }

  return Array.from(groups, ([category, names]) => ({ category, names }));
}

export default function TechStack() {
  const groups = groupByCategory();

  return (
    <Section
      id="tech"
      title="Tech stack"
      intro="The tools I reach for by default. If it's on this list, I've shipped something real with it."
    >
      <div className="flex flex-col">
        {groups.map((group) => (
          <div
            key={group.category}
            className="grid gap-x-10 gap-y-3 border-t border-line py-6 first:border-t-0 first:pt-0 sm:grid-cols-[8rem_minmax(0,1fr)]"
          >
            <h3 className="text-sm text-muted">{group.category}</h3>

            <ul className="flex flex-wrap gap-1.5">
              {group.names.map((name) => (
                <li
                  key={name}
                  className="rounded-full border border-line bg-surface-2 px-2.5 py-1 font-mono text-[0.6875rem] text-ink"
                >
                  {name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
