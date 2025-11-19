import AboutHero from "@/components/about/about-hero";
import OurStory from "@/components/about/our-story";
import MissionSection from "@/components/about/mission-section";
import TeamSection from "@/components/about/team-section";
import { Metadata } from "next";
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const t = await getTranslations({locale: lang, namespace: 'About'});
 
  return {
    title: `${t('heroTitle')} | Fiutowski Apples`,
    description: t('heroSubtitle')
  };
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <AboutHero />
      <OurStory />
      <MissionSection />
      <TeamSection />
    </div>
  );
}
