"use client"

import { useVideoBackground } from "@/hooks/use-video-background"
import { Button } from "./ui/button"
import { Container } from "./ui/container"
import Image from "next/image"
import { useTranslations } from "next-intl"
import Link from "next/link"
import { useParams } from "next/navigation"
import TypingEffect from "./typing-effect"

export default function HeroSection() {
  return (
    <div className="relative flex flex-col items-start justify-center w-full h-[60vh] overflow-hidden">
      <HeroBackground />
      <GradientOverlay />
      <HeroContent />
    </div>
  )
}

function HeroBackground() {
  const { videoRef, isVideoReady } = useVideoBackground({
    videoSrc: "/background.webm",
  })

  return (
    <>
      {/* Video background */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[2000ms] ease-in-out z-0 ${
          isVideoReady ? "opacity-100" : "opacity-0"
        }`}
        style={{ transitionDelay: "1500ms" }}
      />

      {/* Fallback image background (shown while video loads) */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-[2000ms] ease-in-out z-0 ${
          isVideoReady ? "opacity-0" : "opacity-100"
        }`}
        style={{
          backgroundImage: "url('/bg.webp')",
          transitionDelay: "1500ms"
        }}
      />
    </>
  )
}

function GradientOverlay() {
  return (
    <div
      className="absolute inset-0 bg-gradient-to-r from-black/30 from-10% via-transparent via-50% to-transparent z-[1]"
    />
  )
}

function HeroContent() {
  const t = useTranslations("Hero")
  const params = useParams()
  const locale = params.lang as string
  const keywords = t("keywords").split(",")

  return (
    <Container className="w-full h-full relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full items-center">
        <div className="flex flex-col gap-4 max-w-xl items-center md:items-start justify-center">
          <h1 
            className="animate-fade-in-up opacity-0 relative text-4xl bg-green-900/98 text-center md:text-left p-4 md:text-5xl lg:text-6xl font-bold text-white overflow-hidden"
            style={{ animationDelay: "0.2s", animationDuration: "0.8s" }}
          >
            {t("title")}
          </h1>
          <p 
            className="animate-fade-in-up opacity-0 text-lg md:text-xl lg:text-2xl text-white text-center md:text-left bg-green-900/98 p-4"
            style={{ animationDelay: "0.7s", animationDuration: "0.8s" }}
          >
            {t("subtitle")}
          </p>
          <div 
            className="animate-fade-in-up opacity-0"
            style={{ animationDelay: "1.2s", animationDuration: "0.8s" }}
          >
            <Link href={`/${locale}/contact`}>
              <Button className="bg-green-900 hover:bg-green-950 text-white px-8 py-6 text-lg font-semibold rounded-full w-fit transition-colors">
                {t("cta")}
              </Button>
            </Link>
          </div>
        </div>

        <div className="hidden md:flex items-center justify-center h-full">
          <div className="bg-green-900/98 p-4">
            <TypingEffect words={keywords} startDelay={200} />
          </div>
        </div>
      </div>
    </Container>
  )
}
