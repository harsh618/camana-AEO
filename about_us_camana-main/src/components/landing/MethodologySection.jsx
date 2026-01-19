import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, CheckCircle, X } from 'lucide-react';

const comparisons = [
  {
    traditional: 'Guess what AI platforms want',
    modern: 'Data-driven insights from 1.5B+ queries'
  },
  {
    traditional: 'Manual tracking across platforms',
    modern: 'Automated real-time monitoring'
  },
  {
    traditional: 'Generic SEO tactics',
    modern: 'AI-specific optimization strategies'
  },
  {
    traditional: 'Wait months for results',
    modern: 'See improvements in weeks'
  },
  {
    traditional: 'Hope for citations',
    modern: 'Engineer citation-worthy content'
  }
];

export default function MethodologySection() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-100 mb-6">
            <Shield className="w-4 h-4 text-violet-600" />
            <span className="text-sm text-violet-600 font-medium">The Moat</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            We Don't Guess.
            <br />
            <span className="bg-gradient-to-r from-violet-600 to-cyan-500 bg-clip-text text-transparent">We Engineer Authority.</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transforming SEO from a "Black Box" into a Scientific Process.
          </p>
        </motion.div>
        
        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="grid md:grid-cols-2 gap-4 md:gap-0">
            {/* Traditional Column */}
            <div className="bg-gray-50 rounded-2xl md:rounded-r-none border border-gray-200 overflow-hidden">
              <div className="p-6 bg-gray-100 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-500 text-center">Traditional Approach</h3>
              </div>
              <div className="p-6 space-y-4">
                {comparisons.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-100"
                  >
                    <X className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">{item.traditional}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Modern Column */}
            <div className="bg-gradient-to-br from-violet-50 to-cyan-50 rounded-2xl md:rounded-l-none border border-violet-200 overflow-hidden">
              <div className="p-6 bg-violet-100 border-b border-violet-200">
                <div className="flex items-center justify-center gap-2">
                  <Zap className="w-5 h-5 text-violet-600" />
                  <h3 className="text-lg font-semibold text-violet-700">Our AI-Enhanced Process</h3>
                </div>
              </div>
              <div className="p-6 space-y-4">
                {comparisons.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start gap-3 p-4 bg-white rounded-xl border border-violet-100"
                  >
                    <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-900 font-medium">{item.modern}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}