import type { Metadata, Viewport } from "next"
import { Rubik, Syne } from "next/font/google"
import { Cursor } from "@/components/cursor"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { site, socials } from "@/content/site"
import "./globals.css"

// Style guide typefaces: Syne for headlines, Rubik for everything else.
const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
})

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
  display: "swap",
})

const title = `${site.name} — ${site.role}`
const xHandle = socials.find((social) => social.icon === "x")?.href.split("/").pop()

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: `%s — ${site.name}` },
  description: site.tagline,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: site.name,
    title,
    description: site.tagline,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: site.tagline,
    ...(xHandle ? { creator: `@${xHandle}` } : {}),
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f9fafb" },
    { media: "(prefers-color-scheme: dark)", color: "#191919" },
  ],
}

/**
 * Runs synchronously while the browser parses <head>, before first paint.
 *
 * - `js` tells globals.css that scroll-reveal can safely start hidden.
 * - `dark` is on by default in the server HTML; this only removes it when the
 *   visitor has explicitly chosen light, so there is no flash either way.
 */
const themeScript = `document.documentElement.classList.add("js");try{if(localStorage.getItem("theme")==="light")document.documentElement.classList.remove("dark")}catch(e){}`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${rubik.variable} dark h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-full flex-col bg-bg text-fg">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-accent focus:px-5 focus:py-2.5 focus:text-sm focus:text-accent-contrast"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <Cursor />
      </body>
    </html>
  )
}
