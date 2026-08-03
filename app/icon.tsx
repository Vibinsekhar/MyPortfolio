import { ImageResponse } from "next/og"
import { site } from "@/content/site"

// Generated from site.initials — there is no icon file to keep in sync.
export const size = { width: 32, height: 32 }
export const contentType = "image/png"

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#191919",
          color: "#f89a4d",
          fontSize: site.initials.length > 2 ? 13 : 16,
          fontWeight: 700,
          letterSpacing: -0.5,
        }}
      >
        {site.initials.toUpperCase()}
      </div>
    ),
    size,
  )
}
