import { Reveal } from "../reveal"
import { Container } from "../section"
import { site } from "@/content/site"

/**
 * The closing call to action from the design: an orange line, then the email
 * address at display size.
 *
 * Deliberately a mailto link rather than a form — there is no backend here,
 * and a form that silently does nothing is worse than no form at all.
 */
export function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 border-t border-border py-20 text-center sm:py-28">
      <Container>
        <Reveal>
          <p className="text-base font-medium text-accent">Get in touch with me</p>
          <a
            href={`mailto:${site.email}`}
            data-cursor-label="Email"
            className="mt-6 inline-block break-all font-display text-3xl font-bold tracking-tight text-fg underline decoration-1 underline-offset-8 transition-colors hover:text-accent sm:text-5xl"
          >
            {site.email}
          </a>
          {site.availableForWork ? (
            <p className="mx-auto mt-8 max-w-md text-sm leading-6 text-muted">
              Available for new work. Tell me what you&rsquo;re building and I&rsquo;ll reply
              within a couple of days.
            </p>
          ) : null}
        </Reveal>
      </Container>
    </section>
  )
}
