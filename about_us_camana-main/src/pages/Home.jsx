import React, { useRef } from 'react';
import Navbar from '@/components/landing/Navbar';
import HeroSection from '@/components/landing/HeroSection';
import MacroShiftSection from '@/components/landing/MacroShiftSection';
import ProblemSection from '@/components/landing/ProblemSection';
import SolutionSection from '@/components/landing/SolutionSection';
import MethodologySection from '@/components/landing/MethodologySection';
import TractionSection from '@/components/landing/TractionSection';
import MarketSection from '@/components/landing/MarketSection';
import BusinessModelSection from '@/components/landing/BusinessModelSection';
import FAQSection from '@/components/landing/FAQSection';
import TeamSection from '@/components/landing/TeamSection';
import InvestmentSection from '@/components/landing/InvestmentSection';
import ActionSection from '@/components/landing/ActionSection';
import FinalCTASection from '@/components/landing/FinalCTASection';
import Footer from '@/components/landing/Footer';

export default function Home() {
  const actionRef = useRef(null);
  
  const scrollToAction = () => {
    const actionSection = document.getElementById('action');
    if (actionSection) {
      actionSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <div className="min-h-screen bg-[#0A0F1C]">
      <Navbar onGetStarted={scrollToAction} />
      <HeroSection onGetStarted={scrollToAction} />
      <MacroShiftSection />
      <div id="problem">
        <ProblemSection />
      </div>
      <div id="solution">
        <SolutionSection />
      </div>
      <MethodologySection />
      <div id="traction">
        <TractionSection />
      </div>
      <MarketSection />
      <BusinessModelSection />
      <div id="faq">
        <FAQSection />
      </div>
      <div id="team">
        <TeamSection />
      </div>
      <InvestmentSection />
      <ActionSection />
      <FinalCTASection onGetStarted={scrollToAction} />
      <Footer />
    </div>
  );
}