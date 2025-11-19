"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface TypingEffectProps {
  words: string[]
  typingSpeed?: number
  deletingSpeed?: number
  delayBetweenWords?: number
  startDelay?: number
}

export default function TypingEffect({
  words,
  typingSpeed = 100,
  deletingSpeed = 50,
  delayBetweenWords = 3000,
  startDelay = 500,
}: TypingEffectProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)

  useEffect(() => {
    const startTimer = setTimeout(() => {
      setHasStarted(true)
    }, startDelay)

    return () => clearTimeout(startTimer)
  }, [startDelay])

  useEffect(() => {
    if (!hasStarted) return

    const handleTyping = () => {
      const fullText = words[currentWordIndex]

      if (isDeleting) {
        setCurrentText((prev) => prev.substring(0, prev.length - 1))
      } else {
        setCurrentText((prev) => fullText.substring(0, prev.length + 1))
      }

      if (!isDeleting && currentText === fullText) {
        setTimeout(() => setIsDeleting(true), delayBetweenWords)
      } else if (isDeleting && currentText === "") {
        setIsDeleting(false)
        setCurrentWordIndex((prev) => (prev + 1) % words.length)
      }
    }

    // Calculate random speed variation (±30% of base speed)
    const getSpeed = (baseSpeed: number) => {
      const variation = baseSpeed * 0.3
      return baseSpeed + (Math.random() * variation * 2 - variation)
    }

    const speed = isDeleting ? getSpeed(deletingSpeed) : getSpeed(typingSpeed)

    const timer = setTimeout(handleTyping, speed)

    return () => clearTimeout(timer)
  }, [
    currentText,
    isDeleting,
    words,
    currentWordIndex,
    typingSpeed,
    deletingSpeed,
    delayBetweenWords,
    hasStarted,
  ])

  return (
    <div className="flex items-center justify-center">
      <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tight drop-shadow-lg leading-none min-h-[1.1em]">
        {currentText}
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }}
          className="inline-block w-1 h-[1em] bg-white ml-1 align-middle"
        />
      </h2>
    </div>
  )
}
