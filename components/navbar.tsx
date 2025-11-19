"use client"

import Logo from "@/registry/default/components/navbar-components/logo"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { Search } from "lucide-react"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { CONTACT_INFO } from "@/lib/constants"
import Link from "next/link"
import LanguageSwitcher from "./language-switcher"
import { useTranslations } from "next-intl"
import { useParams } from "next/navigation"

export default function Navbar() {
  const t = useTranslations("Navigation")
  const params = useParams()
  const locale = params.lang as string

  const navLinks = [
    { href: "/about", label: t("about") },
    { href: "/contact", label: t("contact") },
  ]

  const getLocalePath = (path: string) => {
    return `/${locale}${path}`
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b">
      {/* Main navigation bar */}
      <div className="bg-white">
        <Container>
          <div className="flex h-16 items-center justify-between gap-4">
            {/* Left side - Logo and Navigation */}
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-4">
                {/* Mobile menu trigger */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      className="group size-8 md:hidden"
                      variant="ghost"
                      size="icon"
                    >
                      <svg
                        className="pointer-events-none"
                        width={16}
                        height={16}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4 12L20 12"
                          className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                        />
                        <path
                          d="M4 12H20"
                          className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                        />
                        <path
                          d="M4 12H20"
                          className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                        />
                      </svg>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent align="start" className="w-56 p-1 md:hidden">
                    <NavigationMenu className="max-w-none *:w-full">
                      <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                        {navLinks.map((link, index) => (
                          <NavigationMenuItem key={index} className="w-full">
                            <NavigationMenuLink asChild className="py-1.5 w-full block">
                              <Link href={getLocalePath(link.href)}>
                                {link.label}
                              </Link>
                            </NavigationMenuLink>
                          </NavigationMenuItem>
                        ))}
                      </NavigationMenuList>
                    </NavigationMenu>
                  </PopoverContent>
                </Popover>

                {/* Logo */}
                <Link href={getLocalePath("/")} className="text-primary hover:text-primary/90">
                  <Logo />
                </Link>
              </div>

              {/* Desktop Navigation menu */}
              <NavigationMenu className="max-md:hidden">
                <NavigationMenuList className="gap-4">
                  {navLinks.map((link, index) => (
                    <NavigationMenuItem key={index}>
                      <NavigationMenuLink
                        asChild
                        className="py-1.5 px-4 text-sm font-medium text-gray-900 hover:text-gray-700 transition-colors uppercase tracking-wide"
                      >
                        <Link href={getLocalePath(link.href)}>
                          {link.label}
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            {/* Right side - Contact Sales button */}
            <div className="flex gap-2 items-center gap-4">
              <span className="text-black font-medium hidden lg:inline-block">{CONTACT_INFO.phone}</span>
              <Link href={getLocalePath("/contact")}>
                <Button 
                  className="bg-green-900 hover:bg-green-950 text-white px-6 py-2 rounded-full font-medium text-sm transition-colors"
                >
                  {t("contactSales")}
                </Button>
              </Link>
              <LanguageSwitcher />
            </div>
          </div>
        </Container>
      </div>
    </header>
  )
}
