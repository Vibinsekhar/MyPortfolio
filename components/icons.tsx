import type { SVGProps } from "react"

/* ----------------------------------------------------------------------------
 * Inline SVGs. No icon package — these are the only ten the site needs.
 *
 * Brand marks (github, linkedin, x) are filled 24x24 paths.
 * UI icons are 1.5px-stroke line icons that inherit currentColor.
 * -------------------------------------------------------------------------- */

export type IconName =
  | "github"
  | "linkedin"
  | "x"
  | "instagram"
  | "facebook"
  | "dribbble"
  | "mail"
  | "globe"
  | "sun"
  | "moon"
  | "menu"
  | "close"
  | "arrow-right"
  | "arrow-up-right"
  | "quote"

type Props = SVGProps<SVGSVGElement>

/** Shared attributes for the filled brand marks. */
const brand = {
  viewBox: "0 0 24 24",
  fill: "currentColor",
  "aria-hidden": true,
  focusable: false,
} as const

/** Shared attributes for the stroked UI icons. */
const line = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
  focusable: false,
} as const

function GitHub(props: Props) {
  return (
    <svg {...brand} {...props}>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23a11.5 11.5 0 0 1 3-.405c1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  )
}

function LinkedIn(props: Props) {
  return (
    <svg {...brand} {...props}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function X(props: Props) {
  return (
    <svg {...brand} {...props}>
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932zM17.61 20.644h2.039L6.486 3.24H4.298z" />
    </svg>
  )
}

function Instagram(props: Props) {
  return (
    <svg {...brand} {...props}>
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9c-.42-.42-.68-.82-.9-1.38-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16M12 0C8.74 0 8.33.01 7.05.07c-1.28.06-2.15.26-2.91.56-.79.3-1.46.72-2.13 1.38C1.35 2.68.93 3.35.63 4.14c-.3.76-.5 1.63-.56 2.91C.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.28.26 2.15.56 2.91.3.79.72 1.46 1.38 2.13.67.67 1.34 1.08 2.13 1.38.76.3 1.63.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.28-.06 2.15-.26 2.91-.56.79-.3 1.46-.71 2.13-1.38.67-.67 1.08-1.34 1.38-2.13.3-.76.5-1.63.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.28-.26-2.15-.56-2.91-.3-.79-.71-1.46-1.38-2.13C21.32 1.35 20.65.93 19.86.63c-.76-.3-1.63-.5-2.91-.56C15.67.01 15.26 0 12 0Z" />
      <path d="M12 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32M12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8" />
      <circle cx="18.41" cy="5.59" r="1.44" />
    </svg>
  )
}

function Facebook(props: Props) {
  return (
    <svg {...brand} {...props}>
      <path d="M24 12.07C24 5.44 18.63.07 12 .07S0 5.44 0 12.07c0 5.99 4.39 10.95 10.13 11.85v-8.38H7.08v-3.47h3.05V9.43c0-3.01 1.79-4.67 4.53-4.67 1.31 0 2.69.24 2.69.24v2.95h-1.51c-1.49 0-1.96.93-1.96 1.87v2.25h3.33l-.53 3.47h-2.8v8.38C19.61 23.02 24 18.06 24 12.07" />
    </svg>
  )
}

function Dribbble(props: Props) {
  return (
    <svg {...line} {...props}>
      <circle cx="12" cy="12" r="9.25" />
      <path d="M5.1 5.7c2.7 3 4.6 6.8 5.4 10.9.3 1.5.5 3 .5 4.6" />
      <path d="M2.9 14.1c3.8-1 7.7-.9 11.3.3 1.6.6 3.1 1.4 4.5 2.4" />
      <path d="M8.2 2.9c2.4 3 5.7 5.3 9.3 6.5 1.2.4 2.4.6 3.7.7" />
    </svg>
  )
}

function Mail(props: Props) {
  return (
    <svg {...line} {...props}>
      <rect x="2" y="4.5" width="20" height="15" rx="2.5" />
      <path d="m3 7 8.15 5.43a1.5 1.5 0 0 0 1.7 0L21 7" />
    </svg>
  )
}

function Globe(props: Props) {
  return (
    <svg {...line} {...props}>
      <circle cx="12" cy="12" r="9.25" />
      <path d="M2.75 12h18.5" />
      <path d="M12 2.75c2.2 2.5 3.44 5.79 3.5 9.25-.06 3.46-1.3 6.75-3.5 9.25-2.2-2.5-3.44-5.79-3.5-9.25.06-3.46 1.3-6.75 3.5-9.25Z" />
    </svg>
  )
}

function Sun(props: Props) {
  return (
    <svg {...line} {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  )
}

function Moon(props: Props) {
  return (
    <svg {...line} {...props}>
      <path d="M20.4 13.7A8.5 8.5 0 0 1 10.3 3.6a8.5 8.5 0 1 0 10.1 10.1Z" />
    </svg>
  )
}

function Menu(props: Props) {
  return (
    <svg {...line} {...props}>
      <path d="M3.75 7h16.5M3.75 12h16.5M3.75 17h16.5" />
    </svg>
  )
}

function Close(props: Props) {
  return (
    <svg {...line} {...props}>
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  )
}

function ArrowRight(props: Props) {
  return (
    <svg {...line} {...props}>
      <path d="M4 12h16M14 6l6 6-6 6" />
    </svg>
  )
}

function ArrowUpRight(props: Props) {
  return (
    <svg {...line} {...props}>
      <path d="M7 17 17 7M8.5 7H17v8.5" />
    </svg>
  )
}

/** The oversized quotation mark on the testimonial. Outlined, as drawn. */
function Quote(props: Props) {
  return (
    <svg {...line} {...props}>
      <path d="M4 20V9.5A5.5 5.5 0 0 1 9.5 4h.5" />
      <path d="M4 20h5.5A2.5 2.5 0 0 0 12 17.5v-3A2.5 2.5 0 0 0 9.5 12H4" />
      <path d="M14 20V9.5A5.5 5.5 0 0 1 19.5 4h.5" />
      <path d="M14 20h5.5a2.5 2.5 0 0 0 2.5-2.5v-3a2.5 2.5 0 0 0-2.5-2.5H14" />
    </svg>
  )
}

const icons: Record<IconName, (props: Props) => React.ReactElement> = {
  github: GitHub,
  linkedin: LinkedIn,
  x: X,
  instagram: Instagram,
  facebook: Facebook,
  dribbble: Dribbble,
  mail: Mail,
  globe: Globe,
  sun: Sun,
  moon: Moon,
  menu: Menu,
  close: Close,
  "arrow-right": ArrowRight,
  "arrow-up-right": ArrowUpRight,
  quote: Quote,
}

/**
 * Renders an icon by name. Size comes from `width`/`height` (default 20) so a
 * single call site can scale it: `<Icon name="mail" width={16} height={16} />`.
 */
export function Icon({ name, ...props }: { name: IconName } & Props) {
  const Component = icons[name]
  return <Component width={20} height={20} {...props} />
}
