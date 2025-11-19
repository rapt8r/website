"use client"

import { Container } from "@/components/ui/container"
import { useTranslations } from "next-intl"
import { motion } from "framer-motion"

export default function MissionSection() {
  const t = useTranslations("About")

  return (
    <section className="py-24 md:py-32 bg-white">
      <Container>
        <div className="max-w-5xl">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="block text-xl md:text-2xl text-gray-600 mb-4"
          >
            {t("missionTitle")}
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-green-950 leading-[1.1] tracking-tight"
          >
            {t("missionContent")}
          </motion.h2>
        </div>
      </Container>
    </section>
  )
}
