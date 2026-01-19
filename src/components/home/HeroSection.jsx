import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Sparkles, Building2, Plane, Heart } from 'lucide-react';
import { ChatGPTLogo, GeminiLogo, PerplexityLogo, ClaudeLogo } from "@/components/icons/AILogos";

const industries = [
  {
    id: 'real-estate',
    icon: Building2,
    label: 'Real Estate',
    color: 'from-orange-500 to-red-600',
    query: 'luxury waterfront homes in Dubai under $5M',
    platform: 'ChatGPT',
    Logo: ChatGPTLogo,
    response: {
      brand: 'LuxuryEstates Dubai',
      content: 'Featured listings include the Marina Pearl Residence ($4.2M), Palm Jumeirah Villa ($4.8M), and Creek Harbor Penthouse ($3.9M). All properties verified by LuxuryEstates Dubai.',
      link: 'luxuryestates.ae/waterfront'
    }
  },
  {
    id: 'travel',
    icon: Plane,
    label: 'Travel',
    color: 'from-red-500 to-rose-600',
    query: 'perfect 7-day Japan itinerary for first-time visitors',
    platform: 'Perplexity',
    Logo: PerplexityLogo,
    response: {
      brand: 'WanderWise Travel',
      content: 'Day 1-3: Tokyo (Shibuya, Senso-ji, Tsukiji). Day 4-5: Kyoto (Fushimi Inari, Arashiyama). Day 6-7: Osaka & Day Trip. Curated by WanderWise Travel experts.',
      link: 'wanderwise.com/japan-guide'
    }
  },
  {
    id: 'healthcare',
    icon: Heart,
    label: 'Healthcare',
    color: 'from-rose-500 to-pink-600',
    query: 'what are early signs of vitamin D deficiency?',
    platform: 'Claude',
    Logo: ClaudeLogo,
    response: {
      brand: 'HealthFirst Clinic',
      content: 'Key symptoms: fatigue, bone pain, muscle weakness, mood changes, hair loss. According to HealthFirst Clinic, 42% of adults are deficient.',
      link: 'healthfirst.com/vitamin-d'
    }
  }
];

const IndustryCard = ({ industry, isActive }) => {
  const Icon = industry.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isActive ? 1 : 0.5, y: 0, scale: isActive ? 1 : 0.95 }}
      className={`relative bg-white backdrop-blur-xl rounded-2xl border border-slate-200 overflow-hidden transition-all duration-500 shadow-xl ${isActive ? 'ring-2 ring-red-500/50' : ''}`}
    >
      {/* Header */}
      <div className="px-4 py-3 border-b border-slate-100 flex items-center gap-2 bg-slate-50">
        <div className={`p-1.5 rounded-lg bg-gradient-to-br ${industry.color}`}>
          <Icon className="w-3.5 h-3.5 text-white" />
        </div>
        <span className="text-xs font-medium text-slate-700">{industry.label}</span>
        <div className="ml-auto px-2 py-0.5 rounded-full bg-slate-100 border border-slate-200 flex items-center gap-1.5">
          <industry.Logo className="w-3 h-3" />
          <span className="text-[10px] font-medium text-slate-600">{industry.platform}</span>
        </div>
      </div>

      {/* Query */}
      <div className="p-4 border-b border-slate-100">
        <div className="flex items-start gap-2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center flex-shrink-0">
            <span className="text-[10px] text-white font-medium">U</span>
          </div>
          <div className="flex-1">
            <p className="text-sm text-slate-700 leading-relaxed">"{industry.query}"</p>
          </div>
        </div>
      </div>

      {/* Response */}
      <div className="p-4 bg-gradient-to-b from-white to-red-50/50">
        <div className="flex items-start gap-2">
          <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${industry.color} flex items-center justify-center flex-shrink-0`}>
            <Sparkles className="w-3 h-3 text-white" />
          </div>
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-900">{industry.response.brand}</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-green-100 text-green-700 font-medium">Cited</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">{industry.response.content}</p>
            <div className="flex items-center gap-1.5 text-red-600 text-[10px]">
              <span className="underline">{industry.response.link}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % industries.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-white via-slate-50 to-red-50 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-red-500/5 to-orange-500/5 rounded-full blur-3xl" />

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 border border-red-100"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-sm text-slate-700">AI Search Optimization Platform</span>
            </motion.div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
                Get Your Brand Discovered Where{' '}
                <span className="bg-gradient-to-r from-red-600 via-orange-600 to-rose-600 bg-clip-text text-transparent">
                  1.5 Billion+
                </span>{' '}
                People Search with AI
              </h1>
              <p className="text-lg sm:text-xl text-slate-600 max-w-xl leading-relaxed">
                The first platform built to make your brand visible in ChatGPT, Perplexity, Claude, and Gemini. Track, optimize, and dominate AI search results.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                onClick={() => navigate('/signup')}
                className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg rounded-xl shadow-lg shadow-red-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-red-500/30 hover:-translate-y-0.5"
              >
                Start Free 7-Day Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <button
                onClick={() => document.getElementById('how-it-works').scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 px-8 py-4 text-lg rounded-xl transition-all duration-300 shadow-sm font-medium"
              >
                <Play className="mr-2 w-5 h-5" />
                See How It Works
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center gap-8 pt-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-red-400 to-orange-500 border-2 border-white flex items-center justify-center shadow-md">
                    <span className="text-xs font-medium text-white">{String.fromCharCode(64 + i)}</span>
                  </div>
                ))}
              </div>
              <div className="text-slate-600 text-sm">
                <span className="text-slate-900 font-semibold">2,500+</span> brands already optimizing
              </div>
            </div>
          </motion.div>

          {/* Right - Industry Cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Industry Selector */}
            <div className="flex justify-center gap-2 mb-6">
              {industries.map((industry, index) => {
                const Icon = industry.icon;
                return (
                  <button
                    key={industry.id}
                    onClick={() => setActiveIndex(index)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${activeIndex === index
                      ? 'bg-red-100 text-red-700'
                      : 'bg-white text-slate-500 hover:text-slate-700 border border-slate-200'
                      }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium hidden sm:inline">{industry.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 gap-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <IndustryCard industry={industries[activeIndex]} isActive={true} />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Preview of other cards */}
            <div className="grid grid-cols-2 gap-4 mt-4 opacity-60">
              {industries.filter((_, i) => i !== activeIndex).map((industry) => (
                <div
                  key={industry.id}
                  onClick={() => setActiveIndex(industries.indexOf(industry))}
                  className="bg-white backdrop-blur-xl rounded-xl border border-slate-200 p-3 cursor-pointer hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm"
                >
                  <div className="flex items-center gap-2">
                    <industry.icon className="w-4 h-4 text-slate-500" />
                    <span className="text-xs text-slate-600">{industry.label}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Floating Elements */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-4 -right-4 px-3 py-1.5 rounded-lg bg-green-100 border border-green-200 shadow-lg"
            >
              <span className="text-xs text-green-700 font-medium">+180% visibility</span>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, delay: 1 }}
              className="absolute -bottom-4 -left-4 px-3 py-1.5 rounded-lg bg-red-100 border border-red-200 shadow-lg"
            >
              <span className="text-xs text-red-700 font-medium">Live tracking</span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}