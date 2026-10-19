import Monogram from "@/components/ui/monogram";
import { navSections, profile, socials } from "@/content/site";
import { getCopyrightYear } from "@/lib/build-time";
import { getIcon } from "@/lib/icons";

export default async function Footer() {
  const year = await getCopyrightYear();

  return (
    <footer className="border-t border-line">
      <div className="container-page grid gap-x-12 gap-y-10 py-16 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr]">
        <div className="flex flex-col gap-4">
          <a href="#top" className="flex items-center gap-2.5">
            <Monogram
              text={profile.initials}
              className="h-8 w-8 rounded-md text-xs"
            />
            <span className="font-display text-[0.9375rem] font-medium tracking-[-0.01em]">
              {profile.name}
            </span>
          </a>
          <p className="measure-tight text-sm leading-[1.7] text-muted">
            {profile.role} based in {profile.location}.
          </p>
          <a
            href={`mailto:${profile.email}`}
            className="text-sm text-ink underline decoration-line decoration-1 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
          >
            {profile.email}
          </a>
        </div>

        <nav aria-label="Footer" className="flex flex-col gap-3">
          <h2 className="text-xs text-muted">Sections</h2>
          <ul className="flex flex-col gap-2">
            {navSections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="text-sm text-muted transition-colors hover:text-accent"
                >
                  {section.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col gap-3">
          <h2 className="text-xs text-muted">Elsewhere</h2>
          <ul className="flex flex-col gap-2">
            {socials.map((social) => {
              const Icon = getIcon(social.icon);
              const isExternal = /^https?:\/\//.test(social.href);
              return (
                <li key={social.label}>
                  <a
                    href={social.href}
                    {...(isExternal
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : undefined)}
                    className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
                  >
                    <Icon className="h-4 w-4" aria-hidden />
                    {social.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="container-page flex flex-col items-start justify-between gap-3 border-t border-line py-6 text-xs text-muted sm:flex-row sm:items-center">
        <p>
          © {year} {profile.name}
        </p>
        <p></p>
      </div>
    </footer>
  );
}
