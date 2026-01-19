import React from 'react';
import { motion } from 'framer-motion';
import { Target, Globe, Building2 } from 'lucide-react';

const markets = [
  {
    label: 'TAM',
    title: 'Total Addressable Market',
    value: '$680B',
    description: 'Global Digital Ad Spend. As search moves to AI, budget shifts from Google Ads to AI Optimization.',
    icon: Globe,
    colorClasses: {
      bg: 'bg-violet-100',
      text: 'text-violet-600',
      border: 'border-violet-200'
    }
  },
  {
    label: 'SAM',
    title: 'Serviceable Addressable Market',
    value: '$80B',
    description: 'Global SEO & Content Marketing Industry.',
    icon: Target,
    colorClasses: {
      bg: 'bg-cyan-100',
      text: 'text-cyan-600',
      border: 'border-cyan-200'
    }
  },
  {
    label: 'SOM',
    title: 'Serviceable Obtainable Market',
    value: '$100M',
    description: 'Targeting the Top 50,000 SaaS & E-commerce companies who are "Early Adopters."',
    icon: Building2,
    colorClasses: {
      bg: 'bg-emerald-100',
      text: 'text-emerald-600',
      border: 'border-emerald-200'
    }
  }
];

export default function MarketSection() {
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
          <span className="text-violet-600 text-sm font-semibold tracking-widest uppercase mb-4 block">Market Opportunity</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Capturing the
            <span className="bg-gradient-to-r from-violet-600 to-cyan-500 bg-clip-text text-transparent"> $600B</span>
            <br />Ad Spend Transition.
          </h2>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {markets.map((market, index) => (
            <motion.div
              key={market.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative group"
            >
              <div className="relative bg-white rounded-2xl border border-gray-200 p-8 h-full hover:shadow-lg transition-all duration-300">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${market.colorClasses.bg} mb-6`}>
                  <market.icon className={`w-6 h-6 ${market.colorClasses.text}`} />
                </div>
                
                <div className={`text-xs font-bold tracking-widest ${market.colorClasses.text} mb-2`}>{market.label}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{market.title}</h3>
                
                <div className="mb-6">
                  <span className="text-5xl font-bold text-gray-900">{market.value}</span>
                  {market.label === 'SOM' && <span className="text-xl text-gray-500 ml-2">ARR</span>}
                </div>
                
                <p className="text-gray-600 text-sm leading-relaxed">{market.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}