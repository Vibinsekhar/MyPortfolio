import Image from "next/image"
import { Icon } from "../icons"
import { Reveal } from "../reveal"
import { Container } from "../section"
import { Button } from "../ui"
import { projects, socials, type Project } from "@/content/site"

/** Initials for the fallback tile — "Project One" becomes "PO". */
function monogram(title: string) {
  return title
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase()
}

function MetaRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4 text-xs">
      <dt className="w-14 shrink-0 text-muted">{label}</dt>
      <dd className="flex flex-wrap gap-x-4 gap-y-1 text-fg">{children}</dd>
    </div>
  )
}

function ProjectCard({ project }: { project: Project }) {
  const cover = (
    <div
      className={`relative overflow-hidden rounded-2xl border border-border bg-surface-2 ${
        project.featured ? "aspect-[16/10]" : "aspect-[4/3]"
      }`}
    >
      {project.image ? (
        <Image
          src={project.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      ) : (
        <div className="flex size-full items-center justify-center bg-[radial-gradient(120%_120%_at_20%_0%,var(--color-accent-soft),transparent_65%)]">
          <span
            aria-hidden
            className="font-display text-6xl font-bold tracking-tight text-border-strong"
          >
            {monogram(project.title)}
          </span>
        </div>
      )}
    </div>
  )

  // The cover links to the live site when there is one, else the source.
  const coverHref = project.demo ?? project.repo

  return (
    <article className="group">
      {coverHref ? (
        <a
          href={coverHref}
          target="_blank"
          rel="noreferrer noopener"
          aria-label={`${project.title} — open project`}
          data-cursor-label={project.demo ? "View" : "Code"}
        >
          {cover}
        </a>
      ) : (
        cover
      )}

      <div className="mt-5 flex items-center gap-4">
        <h3 className="font-display text-lg font-bold tracking-tight text-fg">{project.title}</h3>
        <span aria-hidden className="h-px flex-1 bg-border-strong" />
        <span className="text-xs text-muted">{project.year}</span>
      </div>

      <p className="mt-3 text-sm leading-6 text-muted">{project.description}</p>

      <dl className="mt-4 space-y-2">
        <MetaRow label="Stack">
          {project.stack.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </MetaRow>

        {project.demo || project.repo ? (
          <MetaRow label="Links">
            {project.demo ? (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1 transition-colors hover:text-accent"
              >
                Live
                <Icon name="arrow-up-right" width={13} height={13} />
              </a>
            ) : null}
            {project.repo ? (
              <a
                href={project.repo}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1 transition-colors hover:text-accent"
              >
                Source
                <Icon name="arrow-up-right" width={13} height={13} />
              </a>
            ) : null}
          </MetaRow>
        ) : null}
      </dl>
    </article>
  )
}

export function Projects() {
  if (projects.length === 0) return null

  // Featured first, original order preserved within each group.
  const ordered = [...projects].sort(
    (a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)),
  )
  const github = socials.find((social) => social.icon === "github")

  return (
    <section id="projects" className="scroll-mt-24 py-20 sm:py-28">
      <Container>
        <Reveal className="text-center">
          <h2 className="font-display text-4xl font-bold tracking-tight text-fg sm:text-5xl">
            My projects highlight
          </h2>
          {github ? (
            <Button href={github.href} variant="outline" icon="arrow-right" className="mt-8">
              Explore more
            </Button>
          ) : null}
        </Reveal>

        <div className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2">
          {ordered.map((project, index) => (
            <Reveal key={project.title} delay={(index % 2) * 100}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
