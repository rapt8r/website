"use client"

import { useState, useEffect, useRef } from "react"

interface UseVideoBackgroundOptions {
  videoSrc: string
  onReady?: () => void
  onError?: () => void
}

interface UseVideoBackgroundReturn {
  videoRef: React.RefObject<HTMLVideoElement | null>
  isVideoReady: boolean
  error: boolean
}

export function useVideoBackground({
  videoSrc,
  onReady,
  onError,
}: UseVideoBackgroundOptions): UseVideoBackgroundReturn {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isVideoReady, setIsVideoReady] = useState(false)
  const [error, setError] = useState(false)
  const startTimeRef = useRef<number>(Date.now())
  const canPlayRef = useRef<boolean>(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video || !videoSrc) return

    // Record start time
    startTimeRef.current = Date.now()
    canPlayRef.current = false

    // Set video source
    video.src = videoSrc
    video.load()

    // Function to trigger transition after minimum 2 seconds
    const triggerTransition = () => {
      if (canPlayRef.current) {
        setIsVideoReady(true)
        onReady?.()
        video.play().catch((err) => {
          console.error("Error playing video:", err)
          setError(true)
          onError?.()
        })
      }
    }

    // Handle when video can play
    const handleCanPlay = () => {
      canPlayRef.current = true
      
      // Calculate elapsed time
      const elapsed = Date.now() - startTimeRef.current
      const remainingTime = Math.max(0, 2000 - elapsed)
      
      // Wait for the remaining time to ensure at least 2 seconds total
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      timeoutRef.current = setTimeout(triggerTransition, remainingTime)
    }

    // Handle video errors
    const handleError = () => {
      setError(true)
      onError?.()
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }

    // Handle when video is loaded enough to play
    const handleLoadedData = () => {
      // Video metadata is loaded, ready to play
    }

    video.addEventListener("canplay", handleCanPlay)
    video.addEventListener("loadeddata", handleLoadedData)
    video.addEventListener("error", handleError)

    return () => {
      video.removeEventListener("canplay", handleCanPlay)
      video.removeEventListener("loadeddata", handleLoadedData)
      video.removeEventListener("error", handleError)
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      video.pause()
      video.src = ""
    }
  }, [videoSrc, onReady, onError])

  return {
    videoRef,
    isVideoReady,
    error,
  }
}

