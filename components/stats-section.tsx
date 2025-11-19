"use client"

import { useEffect, useState, useRef } from "react"
import { Container } from "@/components/ui/container"
import { useInView } from "framer-motion"

interface StatItem {
  value: number
  label: string
  suffix?: string
}

interface StatsSectionProps {
  stats: StatItem[]
  delay?: number
}

function Counter({ value, duration = 2500, delay = 0 }: { value: number; duration?: number; delay?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  
  useEffect(() => {
    if (isInView) {
      let animationFrame: number
      let timeoutId: NodeJS.Timeout

      const startAnimation = () => {
        let startTime: number

        const animate = (timestamp: number) => {
          if (!startTime) startTime = timestamp
          const progress = timestamp - startTime
          
          if (progress < duration) {
            const nextCount = Math.min(value, Math.ceil((progress / duration) * value))
            setCount(nextCount)
            animationFrame = requestAnimationFrame(animate)
          } else {
            setCount(value)
          }
        }

        animationFrame = requestAnimationFrame(animate)
      }

      if (delay > 0) {
        timeoutId = setTimeout(startAnimation, delay)
      } else {
        startAnimation()
      }

      return () => {
        if (timeoutId) clearTimeout(timeoutId)
        if (animationFrame) cancelAnimationFrame(animationFrame)
      }
    }
  }, [isInView, value, duration, delay])

  return <span ref={ref}>{count}</span>
}

export default function StatsSection({ stats, delay = 0 }: StatsSectionProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  return (
    <section className="py-20 bg-white">
      <Container>
        <div 
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 transition-opacity duration-1000 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="text-6xl md:text-7xl font-bold text-gray-900 tracking-tight leading-none mb-2">
                {/* We can pass 0 as delay to Counter since the parent container handles the delay */}
                <Counter value={stat.value} delay={500} duration={3000} />
                {stat.suffix && <span>{stat.suffix}</span>}
              </div>
              <div className="text-xl md:text-2xl text-gray-600 font-normal">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

