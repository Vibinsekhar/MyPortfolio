# Portfolio

A single-page developer portfolio built with Next.js 16 (App Router), React 19
and Tailwind CSS v4. Dark by default, with a light variant behind a toggle.

The visual language follows the **AARONN** style guide for type and shape —
Syne for headlines, Rubik for body copy, pill buttons, hairline rules — painted
in the neon palette carried over from the older portfolio: violet `#8066ff` and
magenta `#cc66ff` on a `#0b0e14` ground, with cyan, pink and green available as
`--neon-*` tokens.

---

## Put your content in

**You should not need to open a component.** Everything the site renders lives
in [`content/site.ts`](content/site.ts) — identity, bio, projects, experience,
skills, testimonials, socials and nav. Search the file for `TODO` and replace
what you find.

| What you want to change | Where |
|---|---|
| Name, initials, role, headline, tagline | `site` |
| Email, phone, address, location | `site` |
| Deployed URL (used for SEO and OG tags) | `site.url` |
| Portrait in the About section | `site.photo` |
| Résumé button | `site.resumeHref` |
| "Open to work" pill | `site.availableForWork` |
| Bio paragraphs | `about` |
| Project cards | `projects` |
| Work history | `experience` |
| Skill groups | `skills` |
| Quotes | `testimonials` |
| Social links | `socials` |
| Header nav | `navLinks` |

**Emptying an array removes the section.** Set `experience = []` and both the
Experience section and its nav link disappear — no other edits needed.

### Images

Put files in [`public/`](public/) and reference them with an absolute path:

- `site.photo = "/me.jpg"` — the About portrait. Omit it and a monogram panel
  is drawn instead.
- `project.image = "/projects/thing.jpg"` — a project card cover. Omit it and
  the card falls back to a generated monogram tile, so a half-filled grid still
  looks deliberate.
- `site.resumeHref = "/resume.pdf"` — drop the PDF in `public/`, or set it to
  `null` to hide the button.

### The favicon and social card

Both are **generated from your content** — there are no image files to keep in
sync. [`app/icon.tsx`](app/icon.tsx) draws `site.initials`, and
[`app/opengraph-image.tsx`](app/opengraph-image.tsx) draws the headline and
tagline at 1200×630. Change the content and they change with it.

---

## Run it

```bash
npm run dev     # http://localhost:3000
npm run build   # production build
npm start       # serve the production build
npm run lint
```

On **this Windows machine** an Application Control policy blocks Next's native
SWC binary, which Turbopack requires, so `dev` and `build` fail with *"Turbopack
is not supported on this platform"*. Use the webpack variants instead — same
output, slower:

```bash
npm run dev:webpack
npm run build:webpack
```

CI and Vercel load the native binary fine and should keep using `dev`/`build`.

---

## Deploy

Any Node host works. On Vercel, import the repository and accept the defaults —
no environment variables, no build configuration.

**Before you deploy, set `site.url`** in `content/site.ts` to the real domain.
It backs `metadataBase`, the canonical link, and the absolute URLs in the
Open Graph and Twitter tags, so social previews break without it.

---

## How it's put together

```
app/
  layout.tsx            fonts, metadata, no-flash theme script, header + footer
  page.tsx              section order — the only thing this file decides
  globals.css           design tokens, both themes, utilities
  icon.tsx              favicon, generated from site.initials
  opengraph-image.tsx   social card, generated from site
components/
  icons.tsx             inline SVGs, no icon dependency
  ui.tsx                pill buttons, wordmark, small-caps label
  section.tsx           Container + Section shells
  site-header.tsx       sticky header, scroll-spy, mobile menu
  site-footer.tsx       wordmark, contact details, socials
  theme-toggle.tsx      flips .dark on <html>, persists to localStorage
  reveal.tsx            IntersectionObserver fade-and-rise
  cursor.tsx            custom ring cursor, fine pointers only
  sections/             hero, about, projects, experience, skills,
                        testimonials, contact
content/
  site.ts               all content
```

### Design tokens

Colours are CSS custom properties in `app/globals.css`, defined once for light
(`:root`) and once for dark (`.dark`), then exposed to Tailwind through
`@theme inline`. So `bg-surface`, `text-muted` and `border-accent` are real
utilities, and re-theming the whole site means editing two blocks of variables.

Typography comes from `next/font/google`: **Syne** on `font-display`, **Rubik**
on `font-sans`.

### Theming without a flash

`app/layout.tsx` ships `class="dark"` in the server HTML and runs a small
inline script in `<head>` that removes it only if the visitor previously chose
light. The script runs during HTML parsing, before first paint, so there is no
flash in either direction.

That same script adds a `js` class to `<html>`. The scroll-reveal CSS is scoped
to `.js`, so with JavaScript disabled nothing is hidden and the whole page
stays readable. It is also wrapped in `prefers-reduced-motion: no-preference`.

### The cursor

[`components/cursor.tsx`](components/cursor.tsx) replaces the pointer with the
ring from the wordmark: a hard accent dot on the true pointer position, and a
hairline ring easing in behind it. Over a link or button the ring opens and
tints; over anything carrying `data-cursor-label` it fills solid accent and
shows that word — the project covers say **View**, the email says **Email**.

Add it to anything with `data-cursor-label="…"`. It renders only for a fine
pointer that hasn't requested reduced motion, so touch devices and
reduced-motion visitors keep the native cursor untouched.

### Why the contact section has no form

There is no backend. A form that silently discards submissions is worse than no
form, so the contact section is a `mailto:` call to action. If you add a form
later, give it somewhere real to post to first.

---

## Notes

- The Turbopack/SWC problem above is an **environment** issue, not a project
  one: an Application Control or antivirus policy is blocking
  `@next/swc-win32-x64-msvc`. Allow that file and the default scripts work.
- `npm audit` reports advisories inherited from the `create-next-app` scaffold.
  `npm audit fix --force` wants to *downgrade* Next.js, so check what it plans
  to do before running it.
