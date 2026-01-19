import React from 'react';
import Header from '@/components/home/Header';
import HeroSection from '@/components/home/HeroSection';
import GrowthGraphSection from '@/components/home/GrowthGraphSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import HowItWorksSection from '@/components/home/HowItWorksSection';
import PricingSection from '@/components/home/PricingSection';
import FAQSection from '@/components/home/FAQSection';
import FinalCTASection from '@/components/home/FinalCTASection';
import Footer from '@/components/home/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <GrowthGraphSection />
      <FeaturesSection />
      <HowItWorksSection />
      <PricingSection />
      <FAQSection />
      <FinalCTASection />
      <Footer />
    </div>
  );
}