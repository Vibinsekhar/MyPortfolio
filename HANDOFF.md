# Handoff — portfolio build

Context for continuing this build in a new session started from this folder.

## What this project is

A personal portfolio site for a **software developer**. Scaffolded with
`create-next-app`, then customized. The owner will paste their real bio,
projects, and experience — everything currently in `content/site.ts` is
placeholder text marked `TODO`.

Stack as installed:

| | |
|---|---|
| Next.js | 16.2.12 (App Router) |
| React | 19.2.4 |
| Tailwind CSS | v4 (`@tailwindcss/postcss`) |
| TypeScript | v5 |
| Layout | no `src/` dir, import alias `@/*` |

`node_modules` is installed and working. No reinstall needed.

> **Read `AGENTS.md` first.** Next.js 16 has breaking changes vs. older
> training data. The bundled docs at `node_modules/next/dist/docs/` are the
> source of truth. Already verified against them: `layout`/`page` conventions,
> `next/font/google`, Tailwind v4 CSS setup, the `metadata` + `viewport`
> exports, `ImageResponse` from `next/og`, the `icon`/`opengraph-image` file
> conventions, `next/image` with `fill`, and the documented no-flash inline
> script pattern (`02-guides/preventing-flash-before-hydration.md`).

## Design

The owner supplied the **AARONN** portfolio template (Figma community file) as
the target design. The style guide is implemented in `app/globals.css`:

- **Type** — Syne (`font-display`) for headlines, Rubik (`font-sans`) for body.
- **Colour** — dark-first. Near-black surfaces (`#191919` / `#202225`), one
  orange accent (`#f89a4d`), greys from the guide's ramp. A light variant
  exists behind the toggle with a darkened accent for AA contrast.
- **Shapes** — full-round pill buttons, `rounded-2xl` cards, hairline rules
  trailing card titles, soft radial glow at the top of the page.

Deviations from the template, and why:

- **One page, not four.** The template has separate About / Works / Project
  Detail / Contact pages. This build keeps the single-page composition the
  content model was designed for. Adding routes would mean per-project pages
  and a `slug` on `Project`.
- **No contact form.** The template's form posts nowhere. There is no backend
  here, and a form that silently discards submissions is worse than none, so
  contact is a `mailto:` CTA.
- **No stock imagery.** The template leans on 3D renders. Project cards and the
  About portrait fall back to generated monogram tiles until `project.image` /
  `site.photo` are set.

**The Figma file itself was never readable** — the `claude.ai Figma` connector
is unauthorized, and the URL is a login wall. The implementation was matched
from screenshots of the style guide and page mockups. If the connector gets
authorized, re-check spacing and exact hex values against the source.

## Architecture decision

**All content lives in `content/site.ts`** — identity, about, projects,
experience, skills, testimonials, socials, nav. Components read from it and
render nothing when a given array is empty. The owner should never have to edit
a component to change content. Preserve this if you extend the site.

## Done

Everything in the original plan, plus the design system above.

- `content/site.ts` — typed content model. Extended during the design pass with
  `site.headline`, `site.photo`, `site.phone`, `site.address`,
  `Project.image`, the `testimonials` array, and three more social icons.
  `site.shortName` was added later — the header wordmark shows it below the
  `sm` breakpoint (set it to `null` to always show the full name).
- `app/globals.css` — tokens for both themes, `grid-backdrop`, `page-glow`,
  scroll-reveal base styles (scoped to `.js`, see below)
- `app/layout.tsx` — Syne + Rubik, metadata + viewport from `site`, no-flash
  inline script, skip link, header/footer shell
- `app/page.tsx` — section order, nothing else
- `app/icon.tsx`, `app/opengraph-image.tsx` — generated from `site`; both
  verified rendering as PNGs
- `components/` — `icons.tsx`, `ui.tsx` (Button / Label / Wordmark),
  `section.tsx`, `site-header.tsx`, `site-footer.tsx`, `theme-toggle.tsx`,
  `reveal.tsx`, `cursor.tsx`, and `sections/{hero,about,projects,experience,
  skills,testimonials,contact}.tsx`
- `app/favicon.ico` deleted
- `README.md` rewritten

Verified: `npx tsc --noEmit` clean, `npm run lint` clean, production build
prerenders `/`, `/icon`, `/opengraph-image`, `/_not-found` as static.

## Worth knowing

- **Scroll-reveal is gated on `.js`.** The inline script in `app/layout.tsx`
  adds `js` to `<html>`; `globals.css` only hides `[data-reveal]` under `.js`.
  Without that gate the elements stay invisible when JS is off. If you touch
  either file, keep them in step.
- **Dark is the default.** `<html>` ships with `class="dark"` and the inline
  script *removes* it only when `localStorage.theme === "light"`. The toggle
  does not follow the OS — the design is dark, so light is opt-in.
- **`theme-toggle.tsx` uses `useSyncExternalStore`**, not `useEffect` +
  `setState`. The `react-hooks/set-state-in-effect` lint rule rejects the
  latter, and the `<html>` class is the real source of truth anyway.
- **The custom cursor is opt-out by construction.** `cursor.tsx` renders
  nothing unless `(hover: hover) and (pointer: fine)` matches and reduced
  motion is *not* requested, and it adds `cursor-none` to `<html>` itself — so
  the native cursor can never be hidden without a replacement running. To give
  an element the expanded orange cursor with a word in it, put
  `data-cursor-label="View"` on it; anything matching `a, button, …` gets the
  smaller tinted state for free. Positions are written in a rAF loop straight
  to the DOM — if you extend it, keep React out of the per-frame path.
- The header imports `content/site.ts` to drop nav entries for empty sections,
  which pulls the content into the client bundle. Fine at this size; if the
  content grows, compute the links in a server component and pass them down.

## Watch out

- **Turbopack cannot run on this machine.** An Application Control policy
  blocks `@next/swc-win32-x64-msvc`, so `npm run dev` and `npm run build` both
  fail with *"Turbopack is not supported on this platform"*. Use
  `npm run dev:webpack` / `npm run build:webpack` (added to `package.json`).
  CI and Vercel are unaffected and should keep using the default scripts.
- `npm audit` reports 3 high-severity advisories (`next`, `postcss`, `sharp`)
  from the scaffold. Still not triaged. `npm audit fix --force` would downgrade
  Next, so check what it actually wants to do before running it.
- A separate, older portfolio exists at `D:\My_projects\Portfolio\Portfolio`
  (Vite + React + shadcn/ui, own git repo). It is deliberately untouched —
  the owner chose to build this one alongside it, not replace it. Don't
  modify that folder.
- This project has no git repo yet.

## Next steps, if wanted

- Real content in `content/site.ts` (everything is still `TODO`)
- Project cover images and a portrait, then `project.image` / `site.photo`
- The template's inner pages: `/works`, `/works/[slug]`, `/about`, `/contact`
- `app/sitemap.ts` and `app/robots.ts`
