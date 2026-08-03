import { Reveal } from "../reveal"
import { Container } from "../section"
import { Button } from "../ui"
import { projects, site } from "@/content/site"

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div aria-hidden className="page-glow pointer-events-none absolute inset-0" />
      <div aria-hidden className="grid-backdrop pointer-events-none absolute inset-0" />

      <Container className="relative py-24 text-center sm:py-36">
        <Reveal>
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted">
            {site.role}
            {site.location ? ` — ${site.location}` : ""}
          </p>
        </Reveal>

        <Reveal delay={80}>
          <h1 className="mx-auto mt-6 max-w-4xl font-display text-4xl font-bold leading-[1.08] tracking-tight text-fg sm:text-6xl lg:text-[4.5rem]">
            {site.headline}
          </h1>
        </Reveal>

        <Reveal delay={160}>
          <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            {site.tagline}
          </p>
        </Reveal>

        <Reveal delay={240}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            {projects.length > 0 ? (
              <Button href="#projects" icon="arrow-right">
                Explore works
              </Button>
            ) : null}
            {site.resumeHref ? (
              <Button href={site.resumeHref} variant="outline">
                Résumé
              </Button>
            ) : null}
          </div>
        </Reveal>

        {site.availableForWork ? (
          <Reveal delay={320}>
            <p className="mt-10 inline-flex items-center gap-2.5 rounded-full border border-border px-4 py-2 text-xs font-medium text-muted">
              <span aria-hidden className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-accent" />
              </span>
              Open to new work
            </p>
          </Reveal>
        ) : null}
      </Container>
    </section>
  )
}
