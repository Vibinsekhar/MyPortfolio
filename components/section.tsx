import type { ReactNode } from "react"
import { Reveal } from "./reveal"

/** The one place the page's horizontal rhythm is defined. */
export function Container({
  children,
  className = "",
}: {
  children: ReactNode
  className?: string
}) {
  return <div className={`mx-auto w-full max-w-6xl px-6 ${className}`}>{children}</div>
}

/**
 * A titled page section. The `id` is what the header nav links to, and what
 * the scroll-spy in site-header.tsx observes.
 */
export function Section({
  id,
  title,
  eyebrow,
  align = "left",
  children,
  className = "",
}: {
  id: string
  title: string
  /** Small line under the heading, as on the design's page headers. */
  eyebrow?: string
  align?: "left" | "center"
  children: ReactNode
  className?: string
}) {
  const centered = align === "center"

  return (
    <section id={id} className={`scroll-mt-24 py-20 sm:py-28 ${className}`}>
      <Container>
        <Reveal className={`mb-12 sm:mb-16 ${centered ? "text-center" : ""}`}>
          <h2 className="font-display text-4xl font-bold tracking-tight text-fg sm:text-5xl">
            {title}
          </h2>
          {eyebrow ? (
            <p className={`mt-3 text-sm font-medium text-muted ${centered ? "" : ""}`}>
              {eyebrow}
            </p>
          ) : null}
        </Reveal>
        {children}
      </Container>
    </section>
  )
}
