import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/navbar";
import { Container } from "@/components/ui/container";
import Image from "next/image";
import {NextIntlClientProvider} from 'next-intl';
import {getMessages, getTranslations} from 'next-intl/server';
import Link from "next/link";
import SmoothScroller from "@/components/smooth-scroller";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Website",
  description: "Generated with Next.js and Tailwind CSS",
};

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{lang: string}>;
}) {
  const { lang } = await params;
  const locale = lang;
  const messages = await getMessages();
  const t = await getTranslations('Footer');

  return (
    <html lang={locale}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}>
        <NextIntlClientProvider messages={messages}>
          <SmoothScroller>
            <Navbar />

            <main className="flex-grow w-full">
              {children}
            </main>

            <footer className="w-full border-t border-gray-200 bg-white mt-auto">
              <Container className="py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      {t('company')}
                    </h3>
                    <ul className="space-y-2">
                      <li>
                        <Link
                          href={`/${locale}/about`}
                          className="text-gray-600 hover:text-gray-900 transition-colors"
                        >
                          {t('about')}
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={`/${locale}/contact`}
                          className="text-gray-600 hover:text-gray-900 transition-colors"
                        >
                          {t('contact')}
                        </Link>
                      </li>
              
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      {t('connect')}
                    </h3>
                    <div className="flex space-x-4">
                      <a
                        href="#"
                        className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                        aria-label="Facebook"
                      >
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M22.675 0H1.325C.594 0 0 .593 0 1.326v21.348C0 23.406.594 24 1.325 24h11.497v-9.294H9.692v-3.622h3.13V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.464.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.762v2.309h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.406 24 22.674V1.326C24 .593 23.406 0 22.675 0"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-start gap-4 p-4 rounded-lg">
                      <div className="relative w-12 h-8">
                        <Image 
                          src="/flag.webp" 
                          alt="Polish Flag" 
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="relative w-16 h-16">
                        <Image 
                          src="/produkt_polski.png" 
                          alt="Produkt Polski" 
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-600">
                  <p>&copy; {new Date().getFullYear()} {t('copyright')}</p>
                </div>
              </Container>
            </footer>
          </SmoothScroller>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
