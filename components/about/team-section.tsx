"use client"

import { Container } from "@/components/ui/container"
import { useTranslations } from "next-intl"
import Image from "next/image"

const teamMembers = [
  {
    name: "Osoba 1",
    role: "Founder & Head Orchardist",
    image: "/team-1.webp"
  },
  {
    name: "Osoba 2",
    role: "Quality Control Manager",
    image: "/team-2.webp"
  },
]

export default function TeamSection() {
  const t = useTranslations("About")

  return (
    <section className="py-16 md:py-24 bg-white">
      <Container>
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-green-900">
            {t("teamTitle")}
          </h2>
          <p className="text-lg text-gray-600">
            {t("teamSubtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {teamMembers.map((member, index) => (
            <div 
              key={index} 
              className="group rounded-xl overflow-hidden"
            >
              <div className="relative h-80 w-full overflow-hidden">
                {/* Placeholder for real images - using gray background if image missing */}
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  <span className="text-6xl opacity-20">👤</span>
                </div>
                {/* Uncomment when images are available */}
                {/* <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                /> */}
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-green-700 font-medium">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

