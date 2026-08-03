import type { ReactNode } from "react"
import { Icon, type IconName } from "./icons"
import { site } from "@/content/site"

/* ----------------------------------------------------------------------------
 * Small shared primitives: the pill buttons and the wordmark from the style
 * guide. Everything else is composed from Tailwind classes at the call site.
 * -------------------------------------------------------------------------- */

const buttonBase =
  "group inline-flex items-center justify-center gap-2.5 rounded-full font-medium " +
  "transition-colors duration-200 whitespace-nowrap"

const buttonVariants = {
  /** Filled orange — the primary call to action. */
  primary: "bg-accent text-accent-contrast hover:bg-accent-hover",
  /** Orange hairline, transparent fill. */
  outline: "border border-accent/70 text-fg hover:border-accent hover:text-accent",
  /** Neutral hairline, used in the header. */
  subtle: "border border-border-strong text-fg hover:border-accent hover:text-accent",
} as const

const buttonSizes = {
  sm: "px-5 py-2.5 text-[11px] uppercase tracking-[0.18em]",
  md: "px-7 py-3.5 text-xs uppercase tracking-[0.18em]",
  lg: "px-8 py-4 text-sm",
} as const

export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  icon,
  className = "",
}: {
  href: string
  children: ReactNode
  variant?: keyof typeof buttonVariants
  size?: keyof typeof buttonSizes
  /** Trailing icon. The arrow nudges right on hover. */
  icon?: IconName
  className?: string
}) {
  const isExternal = /^https?:/.test(href)

  return (
    <a
      href={href}
      {...(isExternal ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      className={`${buttonBase} ${buttonVariants[variant]} ${buttonSizes[size]} ${className}`}
    >
      {children}
      {icon ? (
        <Icon
          name={icon}
          width={16}
          height={16}
          className="transition-transform duration-200 group-hover:translate-x-1"
        />
      ) : null}
    </a>
  )
}

/** Small uppercase label — the section eyebrows and card meta keys. */
export function Label({
  children,
  className = "",
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <span className={`text-[11px] uppercase tracking-[0.22em] text-muted ${className}`}>
      {children}
    </span>
  )
}

const wordmarkSizes = {
  /** Header — stays on one line next to the nav on a narrow phone. */
  sm: "text-sm tracking-[0.1em] sm:text-base sm:tracking-[0.14em]",
  lg: "text-xl tracking-[0.12em] sm:text-2xl sm:tracking-[0.14em]",
} as const

/**
 * The wordmark: the name in Syne, with a ring drawn around its first "O" the
 * way the style guide's logo does. Names without an "O" get the ring appended,
 * so this never breaks on a different name.
 */
export function Wordmark({
  size = "sm",
  className = "",
}: {
  size?: keyof typeof wordmarkSizes
  className?: string
}) {
  const name = site.name.toUpperCase()
  const ringIndex = name.indexOf("O")

  const ring = (
    <span
      aria-hidden
      className="pointer-events-none absolute left-1/2 top-1/2 size-[1.35em] -translate-x-1/2 -translate-y-1/2 rounded-full border border-border-strong"
    />
  )

  return (
    <span
      className={`whitespace-nowrap font-display font-bold text-fg ${wordmarkSizes[size]} ${className}`}
    >
      {ringIndex === -1 ? (
        <>
          {name}
          <span className="relative ml-2 inline-block size-[0.5em] align-middle">{ring}</span>
        </>
      ) : (
        <>
          {name.slice(0, ringIndex)}
          <span className="relative inline-block">
            {name[ringIndex]}
            {ring}
          </span>
          {name.slice(ringIndex + 1)}
        </>
      )}
    </span>
  )
}
