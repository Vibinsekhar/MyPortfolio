/* ============================================================================
 * ALL SITE CONTENT LIVES HERE.
 *
 * Everything marked TODO is placeholder text — replace it and the whole site
 * updates. You should not need to touch any component to put your own content
 * in. Delete any section's array entirely and that section stops rendering.
 * ==========================================================================*/

export type Social = {
  label: string
  href: string
  /** Must match a key in components/icons.tsx */
  icon:
    | "github"
    | "linkedin"
    | "x"
    | "mail"
    | "globe"
    | "instagram"
    | "facebook"
    | "dribbble"
}

export type Project = {
  title: string
  /** One or two sentences. What it does, and why it was interesting to build. */
  description: string
  /** Shown as small pills on the card. Keep to ~5. */
  stack: string[]
  /** Live deployment. Omit if there isn't one. */
  demo?: string
  /** Source code. Omit if private. */
  repo?: string
  year: string
  /** Featured projects render first, in a wider card. */
  featured?: boolean
  /**
   * Cover image for the card — put the file in /public and use an absolute
   * path like "/projects/thing.jpg". Leave it out and the card falls back to
   * a generated monogram tile, so the grid still looks deliberate.
   */
  image?: string
}

export type Job = {
  role: string
  company: string
  /** e.g. "2024 — Present" */
  period: string
  location?: string
  /** Bullet points. Lead with impact, not responsibilities. */
  highlights: string[]
  stack?: string[]
}

export type SkillGroup = {
  name: string
  items: string[]
}

export type Testimonial = {
  /** The quote itself, without surrounding quotation marks. */
  quote: string
  author: string
  /** e.g. "CTO, Acme". Optional. */
  role?: string
}

// ---------------------------------------------------------------------------
// Identity — used in the header, hero, page title, OG image, and footer.
// ---------------------------------------------------------------------------
export const site = {
  name: "Vibin Sekhar J V",
  /** Two or three initials. Used for the favicon and the header mark. */
  initials: "VS",
  role: "Full-Stack Developer", // TODO
  /**
   * The huge statement at the top of the page. Two short lines read best —
   * write it as a claim about the work, not a job title.
   */
  headline: "Software that ships fast and keeps working", // TODO
  /** One line under the headline. Keep it under ~120 characters. */
  tagline: "I build fast, accessible web applications from database to interface.", // TODO
  location: "Nagercoil, India",
  email: "vibinsekhar2002@gmail.com",
  /** Shown in the footer. Set either to null to leave it out. */
  phone: "+91 75581 53526" as string | null,
  address: "Nagercoil, Tamil Nadu, India" as string | null,
  /** Absolute URL of the deployed site. Used for SEO metadata and OG tags. */
  url: "https://example.com", // TODO
  /** Set to false to hide the "open to work" pill in the hero. */
  availableForWork: true,
  /**
   * Portrait for the About section. Put the file in /public and point at it,
   * e.g. "/me.jpg". Leave it null and a monogram panel is drawn instead.
   */
  photo: null as string | null,
  /** Put a PDF in /public and point at it, or set to null to hide the button. */
  resumeHref: "/resume.pdf" as string | null,
}

// ---------------------------------------------------------------------------
// About — one short paragraph per entry. First person, no fluff.
// ---------------------------------------------------------------------------
export const about: string[] = [
  // TODO
  "I'm a developer focused on building products that are quick to load, simple to use, and maintainable a year after launch. Most of my work sits across the full stack — designing the data model, building the API, and shipping the interface on top of it.",
  "I care a lot about the boring parts: type safety, sensible error states, accessibility, and tests that catch real regressions. I'd rather ship something small that works properly than something large that mostly does.",
]

// ---------------------------------------------------------------------------
// Projects
// ---------------------------------------------------------------------------
export const projects: Project[] = [
  // TODO — replace all of these
  {
    title: "Project One",
    description:
      "A short description of what this project does and the problem it solves. Mention the hard part — the thing that made it worth building.",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind"],
    demo: "https://example.com",
    repo: "https://github.com/yourusername/project-one",
    year: "2026",
    featured: true,
  },
  {
    title: "Project Two",
    description:
      "Another project. Focus on outcome and scale where you can — 'handles 2k requests/min' says more than 'built with Redis'.",
    stack: ["React", "Node.js", "Redis", "Docker"],
    demo: "https://example.com",
    repo: "https://github.com/yourusername/project-two",
    year: "2025",
    featured: true,
  },
  {
    title: "Project Three",
    description:
      "A smaller tool or library. Good place for CLI tools, open-source contributions, or experiments you learned something from.",
    stack: ["Python", "FastAPI", "SQLite"],
    repo: "https://github.com/yourusername/project-three",
    year: "2025",
  },
  {
    title: "Project Four",
    description:
      "Delete any entries you don't need — the grid adapts to however many projects you list.",
    stack: ["Vue", "Supabase"],
    demo: "https://example.com",
    year: "2024",
  },
]

// ---------------------------------------------------------------------------
// Experience — most recent first. Set to [] to hide the section.
// ---------------------------------------------------------------------------
export const experience: Job[] = [
  // TODO
  {
    role: "Senior Software Engineer",
    company: "Company Name",
    period: "2024 — Present",
    location: "Remote",
    highlights: [
      "Led the rebuild of the customer dashboard, cutting median load time from 4.2s to 900ms.",
      "Designed and shipped a public REST API now used by 40+ integration partners.",
      "Mentored three junior engineers through onboarding and their first production releases.",
    ],
    stack: ["TypeScript", "React", "Node.js", "PostgreSQL", "AWS"],
  },
  {
    role: "Software Engineer",
    company: "Previous Company",
    period: "2022 — 2024",
    location: "City, Country",
    highlights: [
      "Built the billing service handling recurring payments for 15k active subscriptions.",
      "Introduced end-to-end tests that reduced production regressions by roughly half.",
    ],
    stack: ["Python", "Django", "Stripe", "Docker"],
  },
]

// ---------------------------------------------------------------------------
// Skills — grouped. Set to [] to hide the section.
// ---------------------------------------------------------------------------
export const skills: SkillGroup[] = [
  // TODO — the four groups below are still placeholder. Prune them to what you
  // actually use; the group order here is the order they render.
  { name: "Languages", items: ["TypeScript", "JavaScript", "Python", "SQL", "Go"] },
  { name: "Frontend", items: ["React", "Next.js", "Tailwind CSS", "Vue"] },
  { name: "Backend", items: ["Node.js", "FastAPI", "PostgreSQL", "Redis", "GraphQL"] },
  { name: "CMS & Builders", items: ["WordPress", "Bricks Builder", "WooCommerce", "Framer"] },
  { name: "Tooling", items: ["Docker", "AWS", "CI/CD", "Vitest", "Playwright"] },
]

// ---------------------------------------------------------------------------
// Testimonials — one is plenty. Set to [] to hide the section.
// ---------------------------------------------------------------------------
export const testimonials: Testimonial[] = [
  // TODO
  {
    quote:
      "We needed the dashboard rebuilt without pausing the roadmap, and that's exactly what we got — shipped incrementally, no regressions, and it's measurably faster than what it replaced. Clear communication throughout, and the handover documentation was better than what our own team writes.",
    author: "Martin Lee",
    role: "Head of Product, Acme",
  },
]

// ---------------------------------------------------------------------------
// Socials — order here is the order they render. Remove any you don't use.
// ---------------------------------------------------------------------------
export const socials: Social[] = [
  // TODO
  { label: "GitHub", href: "https://github.com/yourusername", icon: "github" },
  { label: "LinkedIn", href: "https://linkedin.com/in/yourusername", icon: "linkedin" },
  { label: "X", href: "https://x.com/yourusername", icon: "x" },
  { label: "Email", href: `mailto:${site.email}`, icon: "mail" },
]

// ---------------------------------------------------------------------------
// Nav — entries are dropped automatically if their section has no content.
// ---------------------------------------------------------------------------
export const navLinks = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
] as const
