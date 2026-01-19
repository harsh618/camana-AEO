import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Home, Plane, Heart, Search, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';

const useCases = [
  {
    id: 'real-estate',
    category: 'REAL ESTATE',
    title: 'Property Search',
    icon: Home,
    color: 'red',
    query: 'luxury waterfront homes in Dubai under $5M',
    platform: 'ChatGPT',
    result: {
      brand: 'LuxuryEstates Dubai',
      description: 'Your brand appearing with featured listings and citation link',
      features: ['Premium waterfront villas', 'Price range: $2.8M - $4.9M', 'Direct booking available']
    }
  },
  {
    id: 'travel',
    category: 'TRAVEL',
    title: 'Itinerary Building',
    icon: Plane,
    color: 'slate',
    query: 'perfect 7-day Japan itinerary for first-time visitors',
    platform: 'Perplexity',
    result: {
      brand: 'JapanTravel Experts',
      description: 'Your travel agency featured as the source with detailed day-by-day plan',
      features: ['Day 1-3: Tokyo highlights', 'Day 4-5: Kyoto temples', 'Day 6-7: Osaka food tour']
    }
  },
  {
    id: 'healthcare',
    category: 'HEALTHCARE',
    title: 'Symptom Research',
    icon: Heart,
    color: 'rose',
    query: 'what are early signs of vitamin D deficiency?',
    platform: 'ChatGPT',
    result: {
      brand: 'HealthFirst Clinic',
      description: 'Your medical clinic/health brand cited with authoritative symptoms list',
      features: ['Fatigue and tiredness', 'Bone and muscle pain', 'Mood changes']
    }
  }
];

const colorMap = {
  red: {
    bg: 'bg-red-100',
    text: 'text-red-600',
    border: 'border-red-200',
    gradient: 'from-red-500 to-red-600'
  },
  slate: {
    bg: 'bg-slate-100',
    text: 'text-slate-600',
    border: 'border-slate-200',
    gradient: 'from-slate-500 to-slate-600'
  },
  rose: {
    bg: 'bg-rose-100',
    text: 'text-rose-600',
    border: 'border-rose-200',
    gradient: 'from-rose-500 to-rose-600'
  }
};

function UseCaseCard({ useCase, isActive }) {
  const colors = colorMap[useCase.color];
  
  return (
    <motion.div
      layout
      className={`bg-white rounded-2xl border ${isActive ? 'border-red-300 shadow-lg' : 'border-gray-200'} overflow-hidden h-full flex flex-col`}
    >
      {/* Header */}
      <div className={`px-6 py-4 ${colors.bg} border-b ${colors.border}`}>
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl bg-white flex items-center justify-center`}>
            <useCase.icon className={`w-5 h-5 ${colors.text}`} />
          </div>
          <div>
            <span className={`text-xs font-bold tracking-widest ${colors.text}`}>{useCase.category}</span>
            <h4 className="font-semibold text-gray-900">{useCase.title}</h4>
          </div>
        </div>
      </div>
      
      {/* Query Section */}
      <div className="p-6 border-b border-gray-100 flex-1">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 rounded-full bg-gray-900 flex items-center justify-center">
            <Search className="w-3 h-3 text-white" />
          </div>
          <span className="text-xs text-gray-500 font-medium">{useCase.platform} Query</span>
        </div>
        <p className="text-gray-800 font-medium italic">"{useCase.query}"</p>
      </div>
      
      {/* Result Section */}
      <div className="p-6 bg-gradient-to-br from-gray-50 to-white">
        <div className="flex items-center gap-2 mb-3">
          <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${colors.gradient} flex items-center justify-center`}>
            <ExternalLink className="w-3 h-3 text-white" />
          </div>
          <span className="text-xs text-gray-500 font-medium">AI Citation Result</span>
        </div>
        <div className={`p-4 rounded-xl border ${colors.border} ${colors.bg} bg-opacity-50`}>
          <p className={`font-bold ${colors.text} mb-1`}>{useCase.result.brand}</p>
          <p className="text-sm text-gray-600 mb-3">{useCase.result.description}</p>
          <ul className="space-y-1">
            {useCase.result.features.map((feature, idx) => (
              <li key={idx} className="text-xs text-gray-500 flex items-center gap-2">
                <div className={`w-1.5 h-1.5 rounded-full ${colors.text.replace('text', 'bg')}`} />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

export default function SolutionSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const nextCase = () => setActiveIndex((prev) => (prev + 1) % useCases.length);
  const prevCase = () => setActiveIndex((prev) => (prev - 1 + useCases.length) % useCases.length);
  
  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 mb-6">
            <Zap className="w-4 h-4 text-emerald-600" />
            <span className="text-sm text-emerald-600 font-medium">The Solution</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            The First
            <span className="bg-gradient-to-r from-red-600 to-slate-500 bg-clip-text text-transparent"> "AI Discovery Engine"</span>
            <br />Platform.
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We turn brand invisibility into authoritative citations.
          </p>
        </motion.div>
        
        {/* Desktop: 3 cards side by side */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-6">
          {useCases.map((useCase, index) => (
            <motion.div
              key={useCase.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <UseCaseCard useCase={useCase} isActive={index === activeIndex} />
            </motion.div>
          ))}
        </div>
        
        {/* Mobile: Carousel */}
        <div className="lg:hidden">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <UseCaseCard useCase={useCases[activeIndex]} isActive={true} />
              </motion.div>
            </AnimatePresence>
            
            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <button 
                onClick={prevCase}
                className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div className="flex gap-2">
                {useCases.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    className={`w-2 h-2 rounded-full transition-colors ${idx === activeIndex ? 'bg-red-600' : 'bg-gray-300'}`}
                  />
                ))}
              </div>
              <button 
                onClick={nextCase}
                className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
