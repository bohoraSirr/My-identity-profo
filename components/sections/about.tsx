import Image from "next/image";

import Section from "@/components/ui/section";
import { profile } from "@/content/site";

export default function About() {
  return (
    <Section
      id="about"
      title="About"
      intro="A short version of the longer story: where I am, what I care about, and the numbers behind it."
    >
      <div className="grid gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
        <div className="measure flex flex-col gap-5 text-[1.0625rem] leading-[1.8] text-muted">
          {profile.bio.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <div className="flex flex-col gap-8 lg:border-l lg:border-line lg:pl-10">
          {/* Only rendered once there is a real photo — no placeholder portrait. */}
          {profile.avatar ? (
            <Image
              src={profile.avatar}
              alt={`Portrait of ${profile.name}`}
              width={512}
              height={512}
              sizes="(min-width: 1024px) 300px, 60vw"
              className="w-full max-w-[15rem] rounded-md border border-line object-cover"
            />
          ) : null}

          <dl className="flex flex-col">
            {profile.facts.map((fact, index) => (
              <div
                key={fact.label}
                className={
                  index === 0
                    ? ""
                    : "mt-6 border-t border-line pt-6"
                }
              >
                <dt className="text-xs text-muted">{fact.label}</dt>
                <dd className="mt-1.5 text-[0.9375rem]">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <dl className="mt-16 grid grid-cols-3 gap-x-8 gap-y-8 border-t border-line pt-8">
        {profile.stats.map((stat) => (
          <div key={stat.label}>
            <dd className="font-display text-3xl font-medium tracking-[-0.02em] sm:text-4xl">
              {stat.value}
            </dd>
            <dt className="mt-2 text-xs text-muted">{stat.label}</dt>
          </div>
        ))}
      </dl>
    </Section>
  );
}
