"use client"

import { ReactLenis } from "lenis/react"
import { ReactNode } from "react"

export default function SmoothScroller({ children }: { children: ReactNode }) {
  return (
    <ReactLenis 
      root 
      options={{
        duration: 1.5, // Slightly reduced from 2.0 for better responsiveness
        smoothWheel: true,
        wheelMultiplier: 1,
        lerp: 0.08, // Lower lerp for smoother interpolation
      }}
    >
      {children}
    </ReactLenis>
  )
}
