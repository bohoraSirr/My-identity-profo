import ButtonLink from "@/components/ui/button-link";
import { profile, socials } from "@/content/site";

/**
 * The one orchestrated moment on the page: the masthead arrives in a short
 * staggered sequence and nothing else moves without the reader's input.
 *
 * The stagger is a CSS animation delay (see `[data-hero-step]` in globals.css)
 * so the hero ships as a Server Component: no JavaScript, nothing to hydrate,
 * and the text is on screen even if the bundle never arrives.
 */
const STEPS = {
  availability: "0.05s",
  name: "0.12s",
  role: "0.19s",
  tagline: "0.26s",
  actions: "0.33s",
  facts: "0.40s",
} as const;

export default function Hero() {
  return (
    <section
      id="top"
      aria-label="Introduction"
      className="flex min-h-svh flex-col justify-center pt-28 pb-16 sm:pt-32 sm:pb-20"
    >
      <div className="container-page">
        <p
          data-hero-step
          style={{ animationDelay: STEPS.availability }}
          className="flex items-center gap-2.5 text-sm text-muted"
        >
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
          {profile.availability}
        </p>

        <h1
          data-hero-step
          style={{ animationDelay: STEPS.name }}
          className="font-display mt-8 text-[clamp(2.75rem,9vw,6.5rem)] leading-[0.95] font-medium tracking-[-0.035em]"
        >
          {profile.name}
        </h1>

        <p
          data-hero-step
          style={{ animationDelay: STEPS.role }}
          className="font-display mt-5 text-[clamp(1.25rem,2.6vw,1.75rem)] leading-snug text-muted"
        >
          {profile.role}
        </p>

        <p
          data-hero-step
          style={{ animationDelay: STEPS.tagline }}
          className="measure text-ink/85 mt-8 text-[1.0625rem] leading-[1.75] sm:text-lg"
        >
          {profile.tagline}
        </p>

        <div
          data-hero-step
          style={{ animationDelay: STEPS.actions }}
          className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-3"
        >
          <ButtonLink href="#contact">Email me</ButtonLink>
          <ButtonLink href="#projects" variant="outline">
            See the work
          </ButtonLink>
          {profile.resumeUrl ? (
            <ButtonLink href={profile.resumeUrl} variant="text">
              Résumé (PDF)
            </ButtonLink>
          ) : null}
        </div>

        <div
          data-hero-step
          style={{ animationDelay: STEPS.facts }}
          className="mt-16 grid gap-x-10 gap-y-7 border-t border-line pt-8 sm:grid-cols-3"
        >
          <div>
            <p className="text-xs text-muted">Based in</p>
            <p className="mt-1.5 text-[0.9375rem]">{profile.location}</p>
          </div>

          <div>
            <p className="text-xs text-muted">Focus</p>
            <p className="mt-1.5 text-[0.9375rem]">{profile.focus}</p>
          </div>

          <div>
            <p className="text-xs text-muted">Elsewhere</p>
            <ul className="mt-1.5 flex flex-wrap gap-x-4 gap-y-2">
              {socials.map((social) => {
                const isExternal = /^https?:\/\//.test(social.href);
                return (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      {...(isExternal
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : undefined)}
                      className="text-ink decoration-line hover:text-accent hover:decoration-accent text-[0.9375rem] underline decoration-1 underline-offset-4 transition-colors"
                    >
                      {social.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
