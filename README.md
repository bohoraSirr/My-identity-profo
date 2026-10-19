# Personal Portfolio

A single-page, fully responsive personal portfolio built with **Next.js 16**, **Tailwind CSS v4** and **Motion**. It covers a profile, skills, academic record, experience, tech stack, projects, hobbies and a working contact form — with **four switchable themes**.

---

## Design notes

The page is set like a technical document rather than a deck of cards. A few rules hold it together; if you change things, these are the ones worth keeping.

- **Type carries the identity.** _Fraunces_ for display, _Instrument Sans_ for body, _JetBrains Mono_ only where the content is literally code. Monospace is not a decoration.
- **The title lives in the margin.** Each section is a rule, a sticky section title in a left margin, and a column of content. There are no eyebrow labels above headings and no numbered markers.
- **Hairlines and tone, not shadows and pills.** Surfaces are separated with `border-line` and `bg-surface-2`. The only things that float (the theme menu, back-to-top) get `shadow-overlay`.
- **One moment of motion.** The hero arrives in a staged sequence and each section fades up as it enters. Both are pure CSS (the sections use scroll-driven `animation-timeline: view()`), so nothing is hidden if JavaScript is slow or absent.
- **Colour is one family.** Four themes, same structure: _Daylight_ (cool paper, petrol), _Deepwater_ (graphite, aqua), _Phosphor_ (terminal green, monospace), _Ember_ (warm charcoal, amber).

---

## Features

- **Four themes** you can switch at runtime, remembered in `localStorage`:
  | Theme | Vibe |
  | ----- | ---- |
  | **Daylight** | Cool paper, deep petrol accent |
  | **Deepwater** | Graphite, aqua accent |
  | **Phosphor** | Terminal green, everything in monospace |
  | **Ember** | Warm charcoal, amber accent |
- **Scroll-driven animation** — a staged hero entrance and one fade per section, both pure CSS, plus a scroll-progress hairline and active-section navbar highlighting driven by `motion`.
- **Ambient background** — slowly drifting contour-line layers behind the content, plus a scroll-bound bird that beats its wings with your scrolling speed.
- **Fully responsive** — mobile-first, tested from 320px to widescreen; animated mobile nav drawer.
- **Contact form** wired to [Formspree](https://formspree.io) with validation, loading, success and error states, plus a copy-to-clipboard email button.
- **Accessible** — semantic landmarks, skip link, visible focus rings, labelled controls, `aria-live` form status, and full `prefers-reduced-motion` support.
- **SEO ready** — metadata, Open Graph/Twitter tags, `sitemap.xml` and `robots.txt`.
- **One file for all content** — `content/site.ts`.

---

## Getting started

```bash
npm install
cp .env.example .env.local   # then edit the values
npm run dev                  # http://localhost:3000
```

Other scripts:

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # eslint
```

---

### 1. Content

Everything you see on the page comes from **`content/site.ts`**. Open it and replace the placeholder values:

- `profile` — name, initials, role, tagline, location, focus, email, phone, bio, stats, quick facts
- `socials` — GitHub, LinkedIn, email, website
- `skillAreas` — what you can do, in words (not a tool list)
- `education` — academic records
- `experience` — work history
- `techStack` — the tool inventory, grouped by category
- `projects` — title, summary, description, tags, links
- `hobbies`
- `contact` — blurb, subject options
- `seo` — page title, description and keywords

> Every placeholder is marked in the file. Nothing else needs to change.

---

Rebuild/redeploy.

> Until `NEXT_PUBLIC_FORMSPREE_ID` is set, submitting the form shows a friendly message pointing visitors to your email address instead — so the site is never broken, just not yet connected.

---

## Project structure

```
app/
  layout.tsx        Root layout: fonts, metadata, providers, navbar/footer
  page.tsx          Composes every section in order
  globals.css       Theme tokens, base styles, utilities
  sitemap.ts        /sitemap.xml
  robots.ts         /robots.txt
components/
  layout/           navbar.tsx, footer.tsx
  providers/        theme-provider.tsx, motion-provider.tsx
  sections/         hero, about, skills, education, experience,
                    tech-stack, projects, hobbies, contact, contact-form
  ui/               reveal, section, timeline, project-row, theme-switcher,
                    scroll-progress, back-to-top, monogram, button-link,
                    copy-email, ambient-background, scroll-bird
content/
  site.ts          content lives here
lib/
  themes.ts         Theme catalogue + the pre-paint theme script
  build-time.ts     Cached build timestamp (Cache Components friendly)
  icons.ts          Icon-name → component map
  utils.ts          Small helpers
public/
  resume.pdf        Replace with your résumé
```

## Tech notes

- **Tailwind CSS v4** — configured entirely in `app/globals.css`; there is no `tailwind.config.js`.
- **Cache Components + Partial Prefetching** are enabled in `next.config.ts`. Anything
  non-deterministic (e.g. `new Date()`) must be wrapped in `"use cache"` — see
  `lib/build-time.ts` for the pattern.
- **Animation** uses [`motion`](https://motion.dev) for the interactive pieces (theme menu,
  mobile drawer, project filter, back-to-top, scroll progress). `MotionConfig reducedMotion="user"`
  in `components/providers/motion-provider.tsx` makes every animation respect the OS
  reduce-motion setting.
- **Reveals are CSS, not JavaScript.** The hero entrance is a CSS animation with a
  staggered `animation-delay`; the section fades use scroll-driven
  `animation-timeline: view()`. Framer Motion writes its `initial` state into the
  server-rendered HTML, which leaves the page blank until hydration — a keyframe cannot.
  Browsers without scroll-driven animation support simply see the content.
- **Fonts** are loaded with `next/font/google` in `app/layout.tsx` and exposed as
  `--font-fraunces`, `--font-instrument` and `--font-jetbrains`, which the stacks in
  `app/globals.css` build on.
- Sections stay **Server Components**; only the interactive pieces (`Reveal`, navbar,
  theme switcher, filters, form) ship JavaScript.

---
