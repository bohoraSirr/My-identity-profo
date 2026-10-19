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
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.biwashbohora.com",
  /** Formspree form ID. Empty until you create a form — see README. */
  formspreeId: process.env.NEXT_PUBLIC_FORMSPREE_ID ?? "",
};

export const seo = {
  title: "Biwash Bohora — Full-Stack Developer",
  description:
    "Portfolio of Biwash Bohora, a full-stack developer building fast, accessible web products. Explore my skills, academic record, experience, tech stack, projects and hobbies.",
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
  name: "Biwash Bohora",
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
  location: "Kathmandu, Nepal",
  focus: "Web apps & interfaces",
  email: "connectwithbiwash@gmail.com",
  phone: "+977 9848131750",
  availability: "Open to internships, freelance and full-time roles",
  resumeUrl: "/resume.pdf" as string | null,
  bio: [
    "Hi, I'm Biwash. I like problems that sit between design and engineering, and I care as much about the details of a hover state as about the shape of a database schema.",
    "I started with plain HTML and CSS, got hooked on making interfaces feel responsive, and never stopped. These days that means TypeScript across a React and Next.js front end, with a Node and Postgres back end behind it.",
    "Outside of code you'll find me on a trail, behind a camera, or halfway through a book I swore I'd finish this month.",
  ],
  /** Quick facts shown beside the bio. */
  facts: [
    { label: "Based in", value: "Kathmandu, Nepal" },
    { label: "Focus", value: "Web apps & interfaces" },
    { label: "Currently", value: "Open to new opportunities" },
  ],
  /** Three is the right number here — a fourth throws off the column rhythm. */
  stats: [
    { label: "Years building", value: "2+" },
    { label: "Projects shipped", value: "3+" },
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
  { label: "GitHub", href: "https://github.com/bohoraSirr", icon: "code" },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/biwash-bohora",
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
    degree: "B.Sc. Computer Science and Information Technology (CSIT)",
    institution: "Amrit Campus, Tribhuvan University",
    period: "2024 — 2028",
    location: "Kathmandu, Nepal",
    grade: "GPA 3.63 / 4.0",
    details: [
      "Coursework in algorithms, databases, distributed systems and Artificial Inteligence.",
      "Participated in various sports and competition.",
    ],
  },
  {
    degree: "Higher Secondary Education, Science",
    institution: "Eager Bridge Secondary School",
    period: "2022 — 2024",
    location: "Surkhet, Nepal",
    grade: "3.59",
    details: [
      "Mathematics, Physics and Computer Science major.",
      "Developed a Li-fi Model & displayed in Annual Science Exhibition.",
    ],
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
    role: "Executive Member",
    company: "CSIT Association of Nepal",
    period: "April, 2026 — Present",
    location: "Hybrid",
    type: "Part-time",
    summary:
      "Organiziting, planning and managing the tech related workshops, conference and events to help students learn from the industry experts",
    highlights: [
      "Shipped a redesigned csitan website with new features like certificates, mocktest and academic journey.",
      "Introduced new internal mailing system to send mails to General Members efficiently.",
    ],
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind CSS"],
  },
  {
    role: "Freelance Web Developer",
    company: "Self-employed",
    period: "2024 — 2026",
    location: "Remote",
    type: "Freelance",
    summary:
      "Designed and delivered marketing sites and dashboards for clients.",
    highlights: [
      "Delivered 4 projects with an average Lighthouse score above 95.",
      "Handled everything end to end: scoping, design, build, deploy.",
    ],
    tech: ["Tailwind CSS", "Vercel", "Framer Motion", "React"],
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
