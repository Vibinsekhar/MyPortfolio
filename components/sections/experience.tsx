import { Reveal } from "../reveal"
import { Section } from "../section"
import { experience } from "@/content/site"

export function Experience() {
  if (experience.length === 0) return null

  return (
    <Section id="experience" title="Where I've worked" eyebrow="Roles, most recent first">
      <ol className="border-t border-border">
        {experience.map((job, index) => (
          <Reveal key={`${job.company}-${job.period}`} as="li" delay={index * 60}>
            <div className="grid gap-6 border-b border-border py-9 md:grid-cols-[13rem_1fr] md:gap-10">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-accent">
                  {job.period}
                </p>
                {job.location ? <p className="mt-2 text-xs text-muted">{job.location}</p> : null}
              </div>

              <div>
                <h3 className="font-display text-xl font-bold tracking-tight text-fg">
                  {job.role}
                </h3>
                <p className="mt-1 text-sm text-muted">{job.company}</p>

                <ul className="mt-5 space-y-2.5">
                  {job.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-3 text-sm leading-6 text-muted">
                      <span aria-hidden className="mt-2.5 size-1 shrink-0 rounded-full bg-accent" />
                      {highlight}
                    </li>
                  ))}
                </ul>

                {job.stack && job.stack.length > 0 ? (
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {job.stack.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-border px-3 py-1 text-xs text-muted"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  )
}
