import React, { useRef } from 'react';
import HeroSection from '@/components/about-camana/HeroSection';
import MacroShiftSection from '@/components/about-camana/MacroShiftSection';
import ProblemSection from '@/components/about-camana/ProblemSection';
import SolutionSection from '@/components/about-camana/SolutionSection';
import MethodologySection from '@/components/about-camana/MethodologySection';
import TractionSection from '@/components/about-camana/TractionSection';
import MarketSection from '@/components/about-camana/MarketSection';
import BusinessModelSection from '@/components/about-camana/BusinessModelSection';
import FAQSection from '@/components/about-camana/FAQSection';
import TeamSection from '@/components/about-camana/TeamSection';
import InvestmentSection from '@/components/about-camana/InvestmentSection';
import ActionSection from '@/components/about-camana/ActionSection';
import FinalCTASection from '@/components/about-camana/FinalCTASection';
import IndustryInsightsSection from '@/components/home/IndustryInsightsSection';

import AboutHeader from '@/components/about-camana/AboutHeader';
import Footer from '@/components/home/Footer';

export default function AboutUs() {
    const actionRef = useRef(null);

    const scrollToAction = () => {
        const actionSection = document.getElementById('action');
        if (actionSection) {
            actionSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 pt-20">
            <AboutHeader />
            <HeroSection onGetStarted={scrollToAction} />
            <IndustryInsightsSection />
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
            <div id="investment">
                <InvestmentSection />
            </div>
            {/* Removed InvestmentSection as per request to clone 'About Us' specifically, usually excluding investment details unless requested, and user mentioned 'remove login button' etc. */}
            {/* Will check ActionSection/FinalCTASection content for login buttons next */}
            <ActionSection />
            <FinalCTASection onGetStarted={scrollToAction} />
            <Footer />
        </div>
    );
}

