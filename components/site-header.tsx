"use client"

import { useEffect, useState } from "react"
import { Icon } from "./icons"
import { ThemeToggle } from "./theme-toggle"
import { Button, Wordmark } from "./ui"
import { about, experience, navLinks, projects, skills, testimonials } from "@/content/site"

/* ----------------------------------------------------------------------------
 * Sticky header: transparent over the hero, blurred once you scroll.
 *
 * Nav entries whose section has no content are dropped here, so emptying an
 * array in content/site.ts removes both the section and its link.
 * -------------------------------------------------------------------------- */

/** Whether each nav id has anything to link to. */
const hasContent: Record<string, boolean> = {
  about: about.length > 0,
  projects: projects.length > 0,
  experience: experience.length > 0,
  skills: skills.length > 0,
  testimonials: testimonials.length > 0,
  contact: true,
}

export function SiteHeader() {
  const links = navLinks.filter((link) => hasContent[link.id] !== false)
  const navItems = links.filter((link) => link.id !== "contact")
  const contact = links.find((link) => link.id === "contact")

  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Scroll-spy: whichever section owns the middle band of the viewport wins.
  useEffect(() => {
    const sections = links
      .map((link) => document.getElementById(link.id))
      .filter((element): element is HTMLElement => element !== null)

    if (sections.length === 0 || !("IntersectionObserver" in window)) return

    const visible = new Set<string>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id)
          else visible.delete(entry.target.id)
        }
        // Keep document order rather than intersection order.
        const current = sections.find((section) => visible.has(section.id))
        setActive(current ? current.id : null)
      },
      { rootMargin: "-45% 0px -45% 0px" },
    )

    for (const section of sections) observer.observe(section)
    return () => observer.disconnect()
  }, [links])

  // While the menu is open: Escape closes it, the page behind it stops
  // scrolling, and growing past `md` closes it too — the panel is `md:hidden`,
  // so without that a rotate to landscape would hide the menu and leave the
  // scroll lock behind with no way to release it.
  useEffect(() => {
    if (!menuOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false)
    }
    const desktop = window.matchMedia("(min-width: 768px)")
    const onBreakpoint = () => {
      if (desktop.matches) setMenuOpen(false)
    }
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", onKeyDown)
    desktop.addEventListener("change", onBreakpoint)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", onKeyDown)
      desktop.removeEventListener("change", onBreakpoint)
    }
  }, [menuOpen])

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled || menuOpen
          ? "border-b border-border bg-bg/85 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-3 px-6 sm:h-20 sm:gap-6">
        <a href="#top" className="shrink-0" aria-label="Back to top">
          <Wordmark />
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-9 md:flex">
          {navItems.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              aria-current={active === link.id ? "true" : undefined}
              className={`text-[11px] font-medium uppercase tracking-[0.18em] transition-colors ${
                active === link.id ? "text-accent" : "text-muted hover:text-fg"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <ThemeToggle />
          {contact ? (
            /* Hidden until the desktop nav appears — on a phone Contact is a
               row in the menu, so the bar keeps only the two round buttons. */
            <Button href="#contact" variant="subtle" size="sm" className="hidden md:inline-flex">
              {contact.label}
            </Button>
          ) : null}
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="inline-flex size-10 items-center justify-center rounded-full border border-border text-fg transition-colors hover:border-accent hover:text-accent md:hidden"
          >
            <Icon name={menuOpen ? "close" : "menu"} width={18} height={18} />
          </button>
        </div>
      </div>

      {menuOpen ? (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          /* The panel sits in the flow under a 4rem header, and the body is
             scroll-locked while it is open — so it has to scroll itself, or a
             long nav on a short (landscape) viewport would be unreachable. */
          className="max-h-[calc(100svh-4rem)] overflow-y-auto overscroll-contain border-t border-border bg-bg sm:max-h-[calc(100svh-5rem)] md:hidden"
        >
          <ul className="mx-auto flex w-full max-w-6xl flex-col px-6 py-2">
            {links.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={() => setMenuOpen(false)}
                  aria-current={active === link.id ? "true" : undefined}
                  className={`block border-b border-border py-4 text-sm font-medium uppercase tracking-[0.18em] last:border-0 ${
                    active === link.id ? "text-accent" : "text-fg"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  )
}
