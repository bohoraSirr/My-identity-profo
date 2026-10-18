/**
 * ============================================================================
 *  SITE CONTENT — the single place you edit to make this portfolio yours.
 * ============================================================================
 *
 *  Everything below is PLACEHOLDER content. Replace it with your real details.
 *  You should not need to touch any component to update your portfolio.
 *
 *  Two values are configured through environment variables instead of here:
 *    NEXT_PUBLIC_SITE_URL      e.g. https://janedoe.dev
 *    NEXT_PUBLIC_FORMSPREE_ID  e.g. xbjkqwer   (see README → Contact form)
 */

/* -------------------------------------------------------------------------- */
/*  Site + SEO                                                                */
/* -------------------------------------------------------------------------- */

export const site = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://your-domain.com",
  /** Formspree form ID. Empty until you create a form — see README. */
  formspreeId: process.env.NEXT_PUBLIC_FORMSPREE_ID ?? "",
};

export const seo = {
  title: "Alex Carter — Full-Stack Developer",
  description:
    "Portfolio of Alex Carter, a full-stack developer building fast, accessible web products. Explore my skills, academic record, experience, tech stack, projects and hobbies.",
  keywords: [
    "full-stack developer",
    "software engineer portfolio",
    "web developer",
    "React",
    "Next.js",
    "TypeScript",
    "product engineer",
  ],
};

/* -------------------------------------------------------------------------- */
/*  Profile                                                                   */
/* -------------------------------------------------------------------------- */

export const profile = {
  name: "Alex Carter",
  /** Shown as a monogram when no avatar image is set. */
  initials: "AC",
  /** Set to "/images/avatar.jpg" after dropping your photo into public/images. */
  avatar: null as string | null,
  /** The one line under your name in the hero. Keep it short. */
  role: "Full-stack developer",
  /**
   * The hero standfirst. This is the most-read sentence on the page — make it
   * concrete. Name the stack and one thing you actually care about.
   */
  tagline:
    "I work across TypeScript, React and Postgres, and I care about the parts of a product most people never notice: focus order, empty states, and how it feels on a slow connection.",
  location: "Your City, Country",
  focus: "Web apps & interfaces",
  email: "hello@example.com",
  phone: "+1 (555) 000-0000",
  availability: "Open to internships, freelance and full-time roles",
  /** Drop your real PDF at public/resume.pdf, or set to null to hide the link. */
  resumeUrl: "/resume.pdf" as string | null,
  bio: [
    "Hi, I'm Alex. I like problems that sit between design and engineering, and I care as much about the details of a hover state as about the shape of a database schema.",
    "I started with plain HTML and CSS, got hooked on making interfaces feel responsive, and never stopped. These days that means TypeScript across a React and Next.js front end, with a Node and Postgres back end behind it.",
    "Outside of code you'll find me on a trail, behind a camera, or halfway through a book I swore I'd finish this month.",
  ],
  /** Quick facts shown beside the bio. */
  facts: [
    { label: "Based in", value: "Your City, Country" },
    { label: "Focus", value: "Web apps & interfaces" },
    { label: "Currently", value: "Open to new opportunities" },
  ],
  /** Three is the right number here — a fourth throws off the column rhythm. */
  stats: [
    { label: "Years building", value: "3+" },
    { label: "Projects shipped", value: "20+" },
    { label: "Certifications", value: "5" },
  ],
};

/* -------------------------------------------------------------------------- */
/*  Social links                                                              */
/* -------------------------------------------------------------------------- */

export type Social = {
  label: string;
  href: string;
  /** Key into the icon map in lib/icons.ts. */
  icon: string;
};

export const socials: Social[] = [
  { label: "GitHub", href: "https://github.com/your-username", icon: "code" },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/your-username",
    icon: "briefcase",
  },
  { label: "Email", href: `mailto:${profile.email}`, icon: "mail" },
  { label: "Website", href: site.url, icon: "globe" },
];

/* -------------------------------------------------------------------------- */
/*  Sections — also drives the navbar                                         */
/* -------------------------------------------------------------------------- */

export const navSections = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "hobbies", label: "Hobbies" },
  { id: "contact", label: "Contact" },
];

/* -------------------------------------------------------------------------- */
/*  Skills — what you can do, in words.                                       */
/* -------------------------------------------------------------------------- */
/*  Deliberately not a list of tools: the Tech stack section below owns that.
 *  These are capabilities, so the two sections don't repeat each other.       */

export type SkillArea = {
  title: string;
  description: string;
};

export const skillAreas: SkillArea[] = [
  {
    title: "Interface engineering",
    description:
      "Building accessible, responsive interfaces from a design file or a rough sketch, including the states nobody designs: loading, empty and error.",
  },
  {
    title: "API and data design",
    description:
      "Modelling data and shaping endpoints so the front end stays simple. Schema first, then the query, then the request.",
  },
  {
    title: "Performance",
    description:
      "Measuring before optimising. Bundle size, render cost and Core Web Vitals on real devices, not on a fast laptop.",
  },
  {
    title: "Accessibility",
    description:
      "Keyboard-first and tested with a screen reader. WCAG AA as the floor rather than the ambition.",
  },
  {
    title: "Design systems",
    description:
      "Tokens, primitives and documentation that keep a growing interface coherent as more people work on it.",
  },
  {
    title: "Testing and delivery",
    description:
      "Unit, integration and end-to-end coverage wired into CI, so that shipping stays uneventful.",
  },
];

/* -------------------------------------------------------------------------- */
/*  Academic records                                                          */
/* -------------------------------------------------------------------------- */

export type EducationItem = {
  degree: string;
  institution: string;
  period: string;
  location: string;
  grade: string;
  details: string[];
};

export const education: EducationItem[] = [
  {
    degree: "B.Sc. Computer Science",
    institution: "Your University",
    period: "2021 — 2025",
    location: "Your City, Country",
    grade: "GPA 3.8 / 4.0",
    details: [
      "Coursework in algorithms, databases, distributed systems and human-computer interaction.",
      "Final year capstone: a real-time collaboration tool used by 200+ students.",
      "Dean's List for four consecutive semesters.",
    ],
  },
  {
    degree: "Higher Secondary Certificate, Science",
    institution: "Your College",
    period: "2019 — 2021",
    location: "Your City, Country",
    grade: "94%",
    details: [
      "Mathematics, Physics and Computer Science major.",
      "Led the school coding club and ran an intro-to-Python workshop.",
    ],
  },
  {
    degree: "Secondary School Certificate",
    institution: "Your School",
    period: "2017 — 2019",
    location: "Your City, Country",
    grade: "92%",
    details: ["First exposure to programming, robotics and web design."],
  },
];

/* -------------------------------------------------------------------------- */
/*  Experience                                                                */
/* -------------------------------------------------------------------------- */

export type ExperienceItem = {
  role: string;
  company: string;
  period: string;
  location: string;
  type: "Full-time" | "Part-time" | "Internship" | "Freelance" | "Contract";
  summary: string;
  highlights: string[];
  tech: string[];
};

export const experience: ExperienceItem[] = [
  {
    role: "Software Engineer",
    company: "Company Name",
    period: "2025 — Present",
    location: "Remote",
    type: "Full-time",
    summary:
      "Building customer-facing web features on a Next.js and Postgres stack.",
    highlights: [
      "Shipped a redesigned onboarding flow that lifted activation by 18%.",
      "Cut the initial page bundle by 34% by moving rendering to the server.",
      "Introduced Playwright smoke tests that now gate every deploy.",
    ],
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind CSS"],
  },
  {
    role: "Frontend Developer Intern",
    company: "Another Company",
    period: "2024 — 2025",
    location: "Hybrid",
    type: "Internship",
    summary:
      "Owned the component library and helped move the team onto design tokens.",
    highlights: [
      "Built 40+ accessible components with documentation and tests.",
      "Reduced visual regressions by adopting Chromatic on pull requests.",
    ],
    tech: ["React", "Storybook", "Vitest", "Figma"],
  },
  {
    role: "Freelance Web Developer",
    company: "Self-employed",
    period: "2023 — 2024",
    location: "Remote",
    type: "Freelance",
    summary: "Designed and delivered marketing sites and dashboards for clients.",
    highlights: [
      "Delivered 8 projects with an average Lighthouse score above 95.",
      "Handled everything end to end: scoping, design, build, deploy.",
    ],
    tech: ["Astro", "Tailwind CSS", "Vercel", "Sanity"],
  },
];

/* -------------------------------------------------------------------------- */
/*  Tech stack — the inventory.                                               */
/* -------------------------------------------------------------------------- */

export type Tech = {
  name: string;
  /** Rows are built from this, in the order the categories first appear. */
  category: string;
};

export const techStack: Tech[] = [
  { name: "TypeScript", category: "Language" },
  { name: "JavaScript", category: "Language" },
  { name: "Python", category: "Language" },
  { name: "SQL", category: "Language" },
  { name: "React", category: "Frontend" },
  { name: "Next.js", category: "Frontend" },
  { name: "Tailwind CSS", category: "Frontend" },
  { name: "Framer Motion", category: "Frontend" },
  { name: "Node.js", category: "Backend" },
  { name: "Express", category: "Backend" },
  { name: "GraphQL", category: "Backend" },
  { name: "PostgreSQL", category: "Database" },
  { name: "MongoDB", category: "Database" },
  { name: "Prisma", category: "Database" },
  { name: "Git", category: "DevOps" },
  { name: "Docker", category: "DevOps" },
  { name: "Vercel", category: "DevOps" },
  { name: "AWS", category: "Cloud" },
];

/* -------------------------------------------------------------------------- */
/*  Projects                                                                  */
/* -------------------------------------------------------------------------- */

export type Project = {
  title: string;
  summary: string;
  description: string;
  tags: string[];
  /** Featured projects are marked and sorted first. */
  featured: boolean;
  liveUrl: string | null;
  repoUrl: string | null;
};

export const projects: Project[] = [
  {
    title: "Project Atlas",
    summary: "Real-time collaboration workspace",
    description:
      "Multi-user notes with live cursors, offline support and conflict-free syncing over WebSockets. Handles 200 concurrent sessions on a single node.",
    tags: ["React", "Node.js", "WebSockets", "PostgreSQL"],
    featured: true,
    liveUrl: "https://example.com",
    repoUrl: "https://github.com/your-username/atlas",
  },
  {
    title: "Portfolio Website",
    summary: "The site you're looking at",
    description:
      "A single-page portfolio with four switchable themes, scroll-driven animation, and layouts that hold up from 320px upward.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    featured: true,
    liveUrl: null,
    repoUrl: "https://github.com/your-username/portfolio",
  },
  {
    title: "Shelf",
    summary: "Personal reading tracker",
    description:
      "Track books, set yearly goals and visualise reading streaks. Includes an import flow for Goodreads exports.",
    tags: ["Next.js", "Prisma", "PostgreSQL"],
    featured: false,
    liveUrl: "https://example.com",
    repoUrl: "https://github.com/your-username/shelf",
  },
  {
    title: "Trailfinder",
    summary: "Hiking route finder",
    description:
      "Search nearby trails, view elevation profiles and download offline maps. Built as a progressive web app with an installable shell.",
    tags: ["React", "PWA", "Mapbox"],
    featured: false,
    liveUrl: "https://example.com",
    repoUrl: null,
  },
  {
    title: "Pixeldrop",
    summary: "Image optimisation CLI",
    description:
      "A zero-config CLI that batch-compresses images into AVIF and WebP, with a dry-run report of exactly how many kilobytes you saved.",
    tags: ["Node.js", "CLI", "Sharp"],
    featured: false,
    liveUrl: null,
    repoUrl: "https://github.com/your-username/pixeldrop",
  },
  {
    title: "Campus Compass",
    summary: "Course planning assistant",
    description:
      "Helps students plan semesters by modelling prerequisites as a graph and flagging conflicts before registration opens.",
    tags: ["Python", "Flask", "SQLite"],
    featured: false,
    liveUrl: null,
    repoUrl: "https://github.com/your-username/campus-compass",
  },
];

/* -------------------------------------------------------------------------- */
/*  Hobbies & interests                                                       */
/* -------------------------------------------------------------------------- */

export type Hobby = {
  title: string;
  description: string;
};

export const hobbies: Hobby[] = [
  {
    title: "Photography",
    description:
      "Mostly golden-hour landscapes and the occasional street scene. I shoot film when I'm feeling patient.",
  },
  {
    title: "Hiking",
    description:
      "Weekend trails, long ridgelines and a slowly growing list of summits.",
  },
  {
    title: "Reading",
    description:
      "Science fiction, systems design and the occasional philosophy detour.",
  },
  {
    title: "Music",
    description:
      "Lo-fi while coding, jazz while cooking, and a guitar I keep meaning to practise.",
  },
  {
    title: "Gaming",
    description:
      "Puzzle games, roguelikes and anything with a satisfying movement system.",
  },
  {
    title: "Cooking",
    description:
      "Trying to perfect one dish at a time. Current project: hand-pulled noodles.",
  },
  {
    title: "Fitness",
    description:
      "Lifting four days a week. It keeps the long debugging sessions bearable.",
  },
  {
    title: "Travel",
    description:
      "New cities, new food, and a notebook full of things I want to build.",
  },
];

/* -------------------------------------------------------------------------- */
/*  Contact                                                                   */
/* -------------------------------------------------------------------------- */

export const contact = {
  blurb:
    "I'm open to internships, freelance work and full-time roles. If you have a project in mind, a question, or you just want to say hello, my inbox is open.",
  /** Shown in the form's subject dropdown. */
  subjects: [
    "Job opportunity",
    "Freelance project",
    "Collaboration",
    "Just saying hi",
    "Other",
  ],
};
