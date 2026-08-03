"use client"

import { useCallback, useEffect, useRef, useSyncExternalStore } from "react"

/* ----------------------------------------------------------------------------
 * Custom cursor, built from the logo's ring.
 *
 * Two parts: a hard dot pinned to the real pointer position, and a hairline
 * ring that eases toward it a frame behind. Over anything interactive the ring
 * swells and fills with the accent; over an element carrying
 * `data-cursor-label`, it fills solid and shows that word.
 *
 * It only exists where it makes sense — a fine pointer that has not asked for
 * reduced motion. Touch screens, coarse pointers and reduced-motion visitors
 * keep the native cursor and never see any of this.
 *
 * Nothing here re-renders React. Positions are written straight to the DOM
 * inside a requestAnimationFrame loop.
 * -------------------------------------------------------------------------- */

const INTERACTIVE =
  'a, button, [role="button"], summary, label, input, textarea, select, [data-cursor-label]'

/** How far the ring closes on the pointer each frame. Lower drags more. */
const EASING = 0.16

function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const list = window.matchMedia(query)
      list.addEventListener("change", onStoreChange)
      return () => list.removeEventListener("change", onStoreChange)
    },
    [query],
  )

  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query])

  // The server has no pointer to describe, so it renders nothing.
  return useSyncExternalStore(subscribe, getSnapshot, () => false)
}

export function Cursor() {
  const finePointer = useMediaQuery("(hover: hover) and (pointer: fine)")
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)")
  const enabled = finePointer && !reducedMotion

  const layerRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const layer = layerRef.current
    const ring = ringRef.current
    const dot = dotRef.current
    const label = labelRef.current
    if (!enabled || !layer || !ring || !dot || !label) return

    // Hide the native cursor only once ours is actually running.
    document.documentElement.classList.add("cursor-none")

    let pointerX = window.innerWidth / 2
    let pointerY = window.innerHeight / 2
    let ringX = pointerX
    let ringY = pointerY
    let started = false
    let frame = 0

    const onMove = (event: PointerEvent) => {
      pointerX = event.clientX
      pointerY = event.clientY

      if (!started) {
        // Jump the ring to the pointer on the first move, so it doesn't fly in
        // from the middle of the screen.
        started = true
        ringX = pointerX
        ringY = pointerY
        layer.style.opacity = "1"
      }

      dot.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0) translate(-50%, -50%)`
    }

    const onOver = (event: PointerEvent) => {
      const target = (event.target as Element | null)?.closest?.(INTERACTIVE) ?? null
      const text = target?.getAttribute("data-cursor-label")

      label.textContent = text ?? ""
      layer.dataset.cursorState = text ? "labelled" : target ? "interactive" : "idle"
    }

    const onDown = () => layer.classList.add("is-pressed")
    const onUp = () => layer.classList.remove("is-pressed")
    const onLeave = () => {
      layer.style.opacity = "0"
    }
    const onEnter = () => {
      if (started) layer.style.opacity = "1"
    }

    const loop = () => {
      ringX += (pointerX - ringX) * EASING
      ringY += (pointerY - ringY) * EASING
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`
      frame = requestAnimationFrame(loop)
    }

    layer.dataset.cursorState = "idle"
    frame = requestAnimationFrame(loop)

    const html = document.documentElement
    window.addEventListener("pointermove", onMove, { passive: true })
    window.addEventListener("pointerover", onOver, { passive: true })
    window.addEventListener("pointerdown", onDown, { passive: true })
    window.addEventListener("pointerup", onUp, { passive: true })
    html.addEventListener("pointerleave", onLeave)
    html.addEventListener("pointerenter", onEnter)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerover", onOver)
      window.removeEventListener("pointerdown", onDown)
      window.removeEventListener("pointerup", onUp)
      html.removeEventListener("pointerleave", onLeave)
      html.removeEventListener("pointerenter", onEnter)
      html.classList.remove("cursor-none")
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <div ref={layerRef} aria-hidden className="cursor-layer">
      {/* The eased ring, with its label held outside the scaled element so the
          text stays the same size however far the ring opens. */}
      <div ref={ringRef} className="cursor-ring">
        <span className="cursor-ring-shape" />
        <span ref={labelRef} className="cursor-ring-label" />
      </div>

      {/* Hard dot, exactly on the pointer. */}
      <div ref={dotRef} className="cursor-dot" />
    </div>
  )
}
