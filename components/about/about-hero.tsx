"use client"

import { Container } from "@/components/ui/container"
import { useTranslations } from "next-intl"

export default function AboutHero() {
  const t = useTranslations("About")

  return (
    <div className="relative w-full h-[50vh] flex items-center justify-center overflow-hidden bg-green-900">
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 z-10" />
      
      <Container className="relative z-20 text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in-up">
          {t("heroTitle")}
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
          {t("heroSubtitle")}
        </p>
      </Container>
    </div>
  )
}
