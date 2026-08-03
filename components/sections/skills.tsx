import { Reveal } from "../reveal"
import { Section } from "../section"
import { skills } from "@/content/site"

export function Skills() {
  if (skills.length === 0) return null

  return (
    <Section id="skills" title="What I work with" eyebrow="Tools and technologies">
      <dl className="border-t border-border">
        {skills.map((group, index) => (
          <Reveal key={group.name} delay={index * 60}>
            <div className="grid gap-4 border-b border-border py-7 md:grid-cols-[13rem_1fr] md:gap-10">
              <dt className="text-[11px] font-medium uppercase tracking-[0.18em] text-accent">
                {group.name}
              </dt>
              <dd>
                <ul className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-border bg-surface px-4 py-1.5 text-xs text-fg"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          </Reveal>
        ))}
      </dl>
    </Section>
  )
}
