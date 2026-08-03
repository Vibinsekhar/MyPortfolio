import { Icon } from "../icons"
import { Reveal } from "../reveal"
import { Container } from "../section"
import { testimonials } from "@/content/site"

export function Testimonials() {
  if (testimonials.length === 0) return null

  return (
    <section id="testimonials" className="scroll-mt-24 py-20 sm:py-28">
      <Container>
        <Reveal className="flex items-start justify-between gap-8">
          <h2 className="font-display text-4xl font-bold tracking-tight text-fg sm:text-5xl">
            {testimonials.length > 1 ? "Testimonials" : "Testimonial"}
          </h2>
          <Icon
            name="quote"
            aria-hidden
            className="shrink-0 text-accent"
            width={72}
            height={72}
          />
        </Reveal>

        <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-16">
          {testimonials.map((testimonial, index) => (
            <Reveal key={testimonial.author} delay={index * 80}>
              <figure>
                <blockquote className="text-sm leading-7 text-muted">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 text-sm font-medium text-fg">
                  &mdash;&nbsp;{testimonial.author}
                  {testimonial.role ? (
                    <span className="font-normal text-muted">, {testimonial.role}</span>
                  ) : null}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
