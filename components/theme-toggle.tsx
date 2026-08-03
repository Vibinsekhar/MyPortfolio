"use client"

import { useSyncExternalStore } from "react"
import { Icon } from "./icons"

/* ----------------------------------------------------------------------------
 * Light/dark toggle.
 *
 * The design is dark-first, so dark is the default and light is opt-in. The
 * choice is stored in `localStorage.theme` and expressed as a `.dark` class on
 * <html>, applied before first paint by the inline script in app/layout.tsx —
 * this component only flips it afterwards.
 *
 * Which glyph shows is decided by CSS (`dark:` variants), not React state, so
 * server and client render identical markup. The <html> class is the single
 * source of truth; the only thing React reads back from it is the accessible
 * label, via useSyncExternalStore.
 * -------------------------------------------------------------------------- */

function subscribe(onStoreChange: () => void) {
  const observer = new MutationObserver(onStoreChange)
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  })
  return () => observer.disconnect()
}

const getSnapshot = () => document.documentElement.classList.contains("dark")

// The server cannot know which theme the browser will end up with.
const getServerSnapshot = () => null

export function ThemeToggle({ className = "" }: { className?: string }) {
  const isDark = useSyncExternalStore<boolean | null>(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  )

  function toggle() {
    const next = !document.documentElement.classList.contains("dark")
    document.documentElement.classList.toggle("dark", next)
    try {
      localStorage.setItem("theme", next ? "dark" : "light")
    } catch {
      // Private mode / storage disabled. The toggle still works for this visit.
    }
  }

  const label =
    isDark === null
      ? "Toggle theme"
      : isDark
        ? "Switch to light theme"
        : "Switch to dark theme"

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className={`inline-flex size-10 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-accent hover:text-accent ${className}`}
    >
      <Icon name="sun" width={18} height={18} className="dark:hidden" />
      <Icon name="moon" width={18} height={18} className="hidden dark:block" />
    </button>
  )
}
