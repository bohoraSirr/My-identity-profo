# Personal Portfolio

A single-page, fully responsive personal portfolio built with **Next.js 16**, **Tailwind CSS v4** and **Motion**. It covers a profile, skills, academic record, experience, tech stack, projects, hobbies and a working contact form — with **four switchable themes**.

---

## Design notes

The page is set like a technical document rather than a deck of cards. A few rules hold it together; if you change things, these are the ones worth keeping.

- **Type carries the identity.** *Fraunces* for display, *Instrument Sans* for body, *JetBrains Mono* only where the content is literally code. Monospace is not a decoration.
- **The title lives in the margin.** Each section is a rule, a sticky section title in a left margin, and a column of content. There are no eyebrow labels above headings and no numbered markers.
- **Hairlines and tone, not shadows and pills.** Surfaces are separated with `border-line` and `bg-surface-2`. The only things that float (the theme menu, back-to-top) get `shadow-overlay`.
- **One moment of motion.** The hero arrives in a staged sequence and each section fades up as it enters. Both are pure CSS (the sections use scroll-driven `animation-timeline: view()`), so nothing is hidden if JavaScript is slow or absent.
- **The background is a survey, not a blur.** Three layers of contour lines drift at different speeds behind the page, drawn to match the document motif. Pure CSS, seamless, and it stops for reduced motion.
- **A bird keeps you company.** A side-profile bird rides the left gutter beside the section titles, descending as you scroll. It beats its wings in proportion to how fast you scroll and settles back to a glide when you stop.
- **Colour is one family.** Four themes, same structure: *Daylight* (cool paper, petrol), *Deepwater* (graphite, aqua), *Phosphor* (terminal green, monospace), *Ember* (warm charcoal, amber).

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

## Make it yours

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

### 2. Images

- **Your photo** — drop it in `public/images/` (e.g. `public/images/avatar.jpg`) and set
  `profile.avatar = "/images/avatar.jpg"`. Until then a solid accent monogram is shown.
- **Social preview** — add `app/opengraph-image.jpg` (1200×630) so links look good when shared.

### 3. Résumé

`public/resume.pdf` currently contains a **placeholder PDF**. Replace it with your real résumé, or set `profile.resumeUrl = null` in `content/site.ts` to hide the link.

---

## Contact form (`NEXT_PUBLIC_FORMSPREE_ID`)

The form posts to Formspree, which forwards messages to your inbox — no backend needed.

1. Create a free account at <https://formspree.io>.
2. Create a new form and copy its **form ID** (the part after `https://formspree.io/f/`).
3. Put it in `.env.local`:

   ```bash
   NEXT_PUBLIC_SITE_URL=https://your-domain.com
   NEXT_PUBLIC_FORMSPREE_ID=yourFormId
   ```

4. Rebuild/redeploy.

> Until `NEXT_PUBLIC_FORMSPREE_ID` is set, submitting the form shows a friendly message pointing visitors to your email address instead — so the site is never broken, just not yet connected.

---

## Deploying to Vercel

1. Push this repository to GitHub.
2. Import it at <https://vercel.com/new> — Vercel detects Next.js automatically.
3. Add the environment variables `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_FORMSPREE_ID`
   (Project → Settings → Environment Variables).
4. Deploy, then attach your custom domain under Project → Settings → Domains.

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
  site.ts           👈 ALL of your content lives here
lib/
  themes.ts         Theme catalogue + the pre-paint theme script
  build-time.ts     Cached build timestamp (Cache Components friendly)
  icons.ts          Icon-name → component map
  utils.ts          Small helpers
public/
  resume.pdf        Replace with your résumé
```

---

## Theming

Themes are plain CSS custom properties. Each theme sets the same token set on
`html[data-theme="…"]`, and Tailwind maps them through `@theme inline` in
`app/globals.css`, so components only ever use semantic classes such as
`bg-canvas`, `bg-surface`, `text-ink`, `text-muted`, `border-line` or `bg-accent`.

To add a theme:

1. Add an entry to `THEMES` in `lib/themes.ts` (id, label, description).
2. Add `[data-theme="your-id"]` to the token list in `app/globals.css`.
3. Add the id to the `valid` list inside `themeInitScript`.
4. Add an icon in the `ICONS` map in `components/ui/theme-switcher.tsx`.

> Keep contrast in mind: body text should stay at or above 4.5:1 against
> `--canvas` and `--surface`. The four shipped themes all clear it.

---

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

## Suggested next steps

- Add your real photo, résumé and project screenshots.
- Add `app/opengraph-image.jpg` for link previews.
- Consider a blog with MDX if you want to write about what you build.
