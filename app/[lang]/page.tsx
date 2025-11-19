import { useTranslations } from 'next-intl';
import HeroSection from "@/components/hero-section";
import WhyChooseUs from "@/components/why-choose-us";
import ProductShowcase from "@/components/product-showcase";
import StatsSection from "@/components/stats-section";

export default function Home() {
  const t = useTranslations('Stats');
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-amber-50/20 to-white">
      <HeroSection />
      <StatsSection 
        delay={2000}
        stats={[
          { value: 5000, label: t('production') },
          { value: 25, label: t('experience'), suffix: "+" },
          { value: 150, label: t('clients'), suffix: "k" },
          { value: 12, label: t('varieties') }
        ]} 
      />
      <WhyChooseUs />
      <ProductShowcase />
    </div>
  );
}
