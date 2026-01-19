import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, TrendingDown, UserX, DollarSign } from 'lucide-react';

const impacts = [
  {
    icon: TrendingDown,
    title: 'Loss of High-Intent Traffic',
    description: 'AI search queries have 3x higher intent than keyword search.',
    stat: '3x',
    statLabel: 'Higher Intent'
  },
  {
    icon: UserX,
    title: 'The "Trust Gap"',
    description: 'When AI lists competitors but excludes you, users perceive you as irrelevant.',
    stat: '90%',
    statLabel: 'Invisible Brands'
  },
  {
    icon: DollarSign,
    title: 'Revenue Impact',
    description: 'Brands losing potential traffic as search volume migrates to AI platforms.',
    stat: '~30%',
    statLabel: 'Traffic Loss'
  }
];

export default function ProblemSection() {
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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-100 mb-6">
            <AlertTriangle className="w-4 h-4 text-red-600" />
            <span className="text-sm text-red-600 font-medium">The Problem</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            The "Invisible Brand" Crisis
            <br />
            <span className="text-red-500">is Costing Billions.</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            90% of brands ranking on Google Page 1 are completely invisible in ChatGPT.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {impacts.map((impact, index) => (
            <motion.div
              key={impact.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="relative bg-white rounded-2xl border border-gray-200 p-8 h-full hover:border-red-200 hover:shadow-lg transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-red-100 flex items-center justify-center mb-6">
                  <impact.icon className="w-7 h-7 text-red-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{impact.title}</h3>
                <p className="text-gray-600 mb-6">{impact.description}</p>
                <div className="pt-6 border-t border-gray-100">
                  <span className="text-4xl font-bold text-red-500">{impact.stat}</span>
                  <span className="text-sm text-gray-500 ml-2">{impact.statLabel}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}