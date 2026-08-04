"use client"

import { useEffect, useRef, type ElementType, type ReactNode } from "react"

/* ----------------------------------------------------------------------------
 * Fade-and-rise on scroll.
 *
 * The element renders with `data-reveal` already in the HTML; app/globals.css
 * only hides it when <html> carries the `js` class, which the inline script in
 * app/layout.tsx adds. Without JavaScript the class is never added, so the
 * content stays visible instead of being permanently transparent.
 *
 * The CSS also sits behind `prefers-reduced-motion: no-preference`, so this is
 * inert for anyone who asked for less motion.
 * -------------------------------------------------------------------------- */

type Props = {
  children: ReactNode
  /** Element to render. Defaults to a div. */
  as?: ElementType
  /** Stagger, in milliseconds, for items revealed as a group. */
  delay?: number
  /**
   * Where the element travels in from. The starting offsets live in
   * globals.css; "up" is the default and needs no attribute.
   */
  from?: "up" | "left" | "right" | "scale" | "fade"
  className?: string
}

export function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  from = "up",
  className,
}: Props) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const show = () => {
      element.dataset.reveal = "shown"
    }

    if (!("IntersectionObserver" in window)) {
      show()
      return
    }

    // Already on screen at mount (above the fold) — reveal without waiting.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          show()
          observer.disconnect()
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -8% 0px" },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      data-reveal=""
      data-reveal-from={from === "up" ? undefined : from}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={className}
    >
      {children}
    </Tag>
  )
}
