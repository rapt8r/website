"use client"

import { ReactLenis } from "lenis/react"
import { ReactNode } from "react"

export default function SmoothScroller({ children }: { children: ReactNode }) {
  return (
    <ReactLenis 
      root 
      options={{
        duration: 1.2, 
        smoothWheel: true,
        wheelMultiplier: 1,
        lerp: 0.1,
      }}
    >
      {children}
    </ReactLenis>
  )
}
