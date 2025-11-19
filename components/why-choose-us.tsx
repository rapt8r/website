"use client"

import { Container } from "./ui/container"
import { Leaf, Award, Truck } from "lucide-react"
import { useTranslations } from 'next-intl';
import { motion } from "framer-motion"

export default function WhyChooseUs() {
  const t = useTranslations('WhyChooseUs');

  const features = [
    {
      icon: Leaf,
      key: "sustainable",
    },
    {
      icon: Award,
      key: "quality",
      delay: 0.2,
    },
    {
      icon: Truck,
      key: "direct",
      delay: 0.4,
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-green-50/50">
      <Container>
        <div className="max-w-4xl mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="block text-xl md:text-2xl text-gray-600 mb-6"
          >
            {t('title')}
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-green-950 leading-[1.1] tracking-tight"
          >
            {t('subtitle')}
          </motion.h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div 
              key={feature.key} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 + (index * 0.1) }}
              className="group flex flex-col items-start text-left p-0"
            >
              <div className="h-16 w-16 flex items-center justify-center rounded-2xl bg-green-900/10 text-green-900 mb-6 transition-colors duration-300 group-hover:bg-green-900 group-hover:text-white">
                <feature.icon size={32} />
              </div>
              <h3 className="text-2xl font-bold text-green-950 mb-3">
                {t(`features.${feature.key}.title`)}
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t(`features.${feature.key}.description`)}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
