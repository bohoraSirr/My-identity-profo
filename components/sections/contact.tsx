import ContactForm from "@/components/sections/contact-form";
import ButtonLink from "@/components/ui/button-link";
import CopyEmail from "@/components/ui/copy-email";
import Section from "@/components/ui/section";
import { contact, profile, socials } from "@/content/site";
import { getIcon } from "@/lib/icons";

const CHANNELS = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { label: "Phone", value: profile.phone, href: `tel:${profile.phone.replace(/[^+\d]/g, "")}` },
  { label: "Location", value: profile.location, href: null },
  { label: "Availability", value: profile.availability, href: null },
];

export default function Contact() {
  return (
    <Section id="contact" title="Connect with me" intro={contact.blurb}>
      <div className="grid gap-x-16 gap-y-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <div className="flex flex-col gap-10">
          <dl className="flex flex-col">
            {CHANNELS.map((channel) => (
              <div key={channel.label} className="border-t border-line py-5 first:border-t-0 first:pt-0">
                <dt className="text-xs text-muted">{channel.label}</dt>
                <dd className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-2 text-[0.9375rem]">
                  {channel.href ? (
                    <a
                      href={channel.href}
                      className="break-all text-ink underline decoration-line decoration-1 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
                    >
                      {channel.value}
                    </a>
                  ) : (
                    <span className="text-ink">{channel.value}</span>
                  )}
                  {channel.label === "Email" ? (
                    <CopyEmail email={channel.value} />
                  ) : null}
                </dd>
              </div>
            ))}
          </dl>

          <div className="border-t border-line pt-6">
            <p className="text-xs text-muted">Find me online</p>
            <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
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
                      className="inline-flex items-center gap-2 text-[0.9375rem] text-muted transition-colors hover:text-accent"
                    >
                      <Icon className="h-4 w-4 shrink-0" aria-hidden />
                      {social.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <ButtonLink
            href={`mailto:${profile.email}`}
            variant="outline"
            className="self-start"
          >
            Email me directly
          </ButtonLink>
        </div>

        <ContactForm />
      </div>
    </Section>
  );
}
