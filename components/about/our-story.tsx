"use client"

import { Container } from "@/components/ui/container"
import { useTranslations } from "next-intl"
import Image from "next/image"

export default function OurStory() {
  const t = useTranslations("About")

  return (
    <section className="py-16 md:py-24 bg-white">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative h-[400px] w-full rounded-2xl overflow-hidden shadow-xl order-2 md:order-1">
            <Image
              src="/story.webp"
              alt="Our Story"
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div className="order-1 md:order-2 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-green-900">
              {t("storyTitle")}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              {t("storyContent")}
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}

