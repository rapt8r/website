"use client"

import { useState } from "react"
import Image from "next/image"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import { useTranslations } from "next-intl"

const productIds = [
  {
    id: "gala",
    image: "https://a.allegroimg.com/original/114467/2adc5ec749bf93c4ab09305e5058", // Placeholder
  },
  {
    id: "golden-delicious",
    image: "https://www.sklep.owocowo.com.pl/img/1697/product.jpg",
  },
  {
    id: "ligol",
    image: "https://warzywniakzdostawa.pl/wp-content/uploads/2024/01/1704353276493-scaled-1.jpg",
  },
]

export default function ProductShowcase() {
  const t = useTranslations("ProductShowcase")
  
  const products = productIds.map(p => ({
    ...p,
    name: t(`products.${p.id}.name`),
    description: t(`products.${p.id}.description`)
  }))

  const [selectedProductId, setSelectedProductId] = useState(products[0].id)
  const currentProduct = products.find(p => p.id === selectedProductId) || products[0]

  return (
    <section className="py-16 md:py-24 bg-green-50/50">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Side: Selection Menu */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="mb-4">
              <h2 className="text-3xl md:text-4xl font-bold text-green-950 mb-4">
                {t('title')}
              </h2>
              <p className="text-muted-foreground">
                {t('subtitle')}
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {products.map((product) => (
                <button
                  key={product.id}
                  onClick={() => setSelectedProductId(product.id)}
                  className={`group flex items-center justify-between cursor-pointer p-4 pl-8 rounded-full text-left transition-all duration-300 ${
                    currentProduct.id === product.id
                      ? "bg-green-900 text-white scale-[1.02]"
                      : "bg-white hover:bg-green-900/10 text-green-900"
                  }`}
                >
                  <span className="font-semibold text-lg">{product.name}</span>
                  <ChevronRight 
                    className={`w-5 h-5 transition-transform duration-300 ${
                      currentProduct.id === product.id ? "translate-x-1" : "opacity-0 group-hover:opacity-50"
                    }`} 
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Side: Product Display */}
          <div className="lg:col-span-8">
            <div className="relative overflow-hidden rounded-4xl bg-black aspect-[4/3] md:aspect-[16/9] lg:aspect-auto lg:h-[600px] group">
              
              {/* Full Background Images with Transition */}
              {products.map((product) => (
                <div
                  key={product.id}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                    currentProduct.id === product.id ? "opacity-100 z-10" : "opacity-0 z-0"
                  }`}
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    priority={product.id === products[0].id}
                  />
                  {/* Gradient Overlay - Black from right to left */}
                  <div className="absolute inset-0 bg-gradient-to-l from-black/60 to-transparent" />
                </div>
              ))}

              {/* Content Overlay */}
              <div className="absolute inset-0 flex items-center justify-end p-8 md:p-12 z-20">
                <div className="w-full md:w-1/2 flex flex-col justify-center space-y-6 relative">
                  <div className="flex flex-col gap-2 animate-fade-in-up" key={currentProduct.id}>
                    <h3 className="text-4xl bg-green-900/98 p-4 md:text-5xl font-bold text-white">
                      {currentProduct.name}
                    </h3>
                    <p className="text-lg bg-green-900/98 p-4 md:text-xl text-gray-200 leading-relaxed">
                      {currentProduct.description}
                    </p>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
