"use client"

import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { i18n, type Locale } from "@/i18n-config"

export default function LanguageSwitcher() {
  const pathName = usePathname()
  const router = useRouter()

  const redirectedPathName = (locale: string) => {
    if (!pathName) return "/"
    const segments = pathName.split("/")
    segments[1] = locale
    return segments.join("/")
  }

  const currentLocale = pathName.split("/")[1] as Locale

  return (
    <div className="flex gap-1 border border-gray-200 rounded-full p-1 bg-white">
      {i18n.locales.map((locale) => {
        const isActive = currentLocale === locale
        return (
          <Button
            key={locale}
            variant="ghost"
            size="sm"
            className={`h-7 w-9 px-0 rounded-full text-xs font-medium ${
              isActive 
                ? "bg-green-900 text-white hover:bg-green-900 hover:text-white" 
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            }`}
            onClick={() => router.push(redirectedPathName(locale))}
          >
            {locale.toUpperCase()}
          </Button>
        )
      })}
    </div>
  )
}

