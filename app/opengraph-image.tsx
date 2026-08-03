import { ImageResponse } from "next/og"
import { site } from "@/content/site"

// Social card. Satori only supports flexbox, so every wrapper sets display.
export const alt = `${site.name} — ${site.role}`
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#191919",
          backgroundImage:
            "radial-gradient(60% 55% at 15% 0%, rgba(248,154,77,0.22) 0%, transparent 70%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 56,
              height: 56,
              borderRadius: 999,
              border: "2px solid #f89a4d",
              color: "#f89a4d",
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            {site.initials.toUpperCase()}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 24,
              letterSpacing: 6,
              textTransform: "uppercase",
            }}
          >
            {site.name}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", fontSize: 68, fontWeight: 700, lineHeight: 1.1 }}>
            {site.headline}
          </div>
          <div style={{ display: "flex", fontSize: 28, color: "#9ea3ae" }}>{site.tagline}</div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            color: "#9ea3ae",
          }}
        >
          <div style={{ display: "flex", color: "#f89a4d" }}>{site.role}</div>
          <div style={{ display: "flex" }}>{site.url.replace(/^https?:\/\//, "")}</div>
        </div>
      </div>
    ),
    size,
  )
}
