import { Container } from "./section"
import { Icon } from "./icons"
import { Wordmark } from "./ui"
import { site, socials } from "@/content/site"

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-surface">
      <Container className="py-14">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <Wordmark size="lg" />

          <div className="grid gap-10 sm:grid-cols-2 sm:gap-16">
            <div className="space-y-1.5 text-sm font-medium text-fg">
              {site.address ? <p>{site.address}</p> : null}
              <p>
                <a href={`mailto:${site.email}`} className="transition-colors hover:text-accent">
                  {site.email}
                </a>
              </p>
            </div>

            <div className="space-y-4">
              {site.phone ? (
                <p className="text-sm font-medium text-fg">
                  <a
                    href={`tel:${site.phone.replace(/[^+\d]/g, "")}`}
                    className="transition-colors hover:text-accent"
                  >
                    {site.phone}
                  </a>
                </p>
              ) : null}

              {socials.length > 0 ? (
                <ul className="flex items-center gap-4">
                  {socials.map((social) => (
                    <li key={social.href}>
                      <a
                        href={social.href}
                        target={social.href.startsWith("http") ? "_blank" : undefined}
                        rel={social.href.startsWith("http") ? "noreferrer noopener" : undefined}
                        aria-label={social.label}
                        className="inline-flex text-muted transition-colors hover:text-accent"
                      >
                        <Icon name={social.icon} width={18} height={18} />
                      </a>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>
        </div>

        <hr className="my-10 border-border" />

        <p className="text-center text-sm text-muted">
          © {year}. {site.name}. All rights reserved.
        </p>
      </Container>
    </footer>
  )
}
