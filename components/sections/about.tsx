import Image from "next/image"
import { Reveal } from "../reveal"
import { Container } from "../section"
import { Button } from "../ui"
import { about, site } from "@/content/site"

/**
 * Two columns: the bio on the left, a portrait on the right framed by the two
 * accent outline offsets from the design. With no `site.photo` set, the frame
 * holds a monogram instead of an empty box.
 */
export function About() {
  if (about.length === 0) return null

  return (
    <section id="about" className="scroll-mt-24 py-20 sm:py-28">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-fg sm:text-4xl">
              Let&rsquo;s get to know me a little closer
            </h2>

            <div className="mt-6 space-y-4">
              {about.map((paragraph) => (
                <p key={paragraph} className="text-sm leading-7 text-muted sm:text-base">
                  {paragraph}
                </p>
              ))}
            </div>

            <Button href="#contact" size="lg" className="mt-8">
              Work with me
            </Button>
          </Reveal>

          <Reveal delay={120} className="relative">
            {/* The two accent outlines the design hangs off the frame. */}
            <span
              aria-hidden
              className="absolute -left-3 top-16 h-24 w-8 rounded-full border border-accent sm:-left-5"
            />
            <span
              aria-hidden
              className="absolute -right-3 -top-4 h-8 w-24 rounded-full border border-accent sm:-right-5"
            />

            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border bg-surface-2 sm:aspect-square">
              {site.photo ? (
                <Image
                  src={site.photo}
                  alt={`${site.name}, ${site.role}`}
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover grayscale"
                  priority={false}
                />
              ) : (
                <div className="flex size-full items-center justify-center">
                  <span
                    aria-hidden
                    className="font-display text-7xl font-bold tracking-tight text-border-strong sm:text-8xl"
                  >
                    {site.initials}
                  </span>
                  <span className="sr-only">{site.name}</span>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
