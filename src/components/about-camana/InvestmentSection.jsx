import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Code, Target, Users } from 'lucide-react';

const fundAllocation = [
  { label: 'Product Engineering', percentage: 40, description: 'Developing the "One-Click Optimization" API and expanding to video/multimodal search tracking.', icon: Code },
  { label: 'Go-to-Market', percentage: 35, description: 'Aggressive sales targeting Top 50 Marketing Agencies to integrate our tool.', icon: Target },
  { label: 'Talent', percentage: 25, description: 'Hiring Head of AEO Research and Customer Success leads.', icon: Users },
];

export default function InvestmentSection() {
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
            <Rocket className="w-4 h-4 text-emerald-600" />
            <span className="text-sm text-emerald-600 font-medium">The Ask</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Fueling the
            <span className="bg-gradient-to-r from-red-600 to-slate-500 bg-clip-text text-transparent"> Future of Search.</span>
          </h2>
        </motion.div>
        
        {/* Investment Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid md:grid-cols-3 gap-6 mb-12"
        >
          <div className="bg-gradient-to-br from-red-50 to-white rounded-2xl border border-red-200 p-8 text-center">
            <span className="text-sm text-gray-500 uppercase tracking-widest">Raise</span>
            <p className="text-4xl font-bold text-gray-900 mt-2">$1,000,000</p>
            <span className="text-gray-500">USD</span>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center">
            <span className="text-sm text-gray-500 uppercase tracking-widest">Equity</span>
            <p className="text-4xl font-bold text-gray-900 mt-2">17%</p>
            <span className="text-gray-500">Offered</span>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center">
            <span className="text-sm text-gray-500 uppercase tracking-widest">Valuation</span>
            <p className="text-4xl font-bold text-gray-900 mt-2">~$5.8M</p>
            <span className="text-gray-500">Post-Money</span>
          </div>
        </motion.div>
        
        {/* Use of Funds */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 md:p-12"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-semibold text-gray-900">Use of Funds</h3>
            <span className="text-sm text-gray-500">18-Month Runway</span>
          </div>
          
          <div className="space-y-8">
            {fundAllocation.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex items-start gap-4 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-gray-900 font-medium">{item.label}</span>
                      <span className="text-2xl font-bold text-red-600">{item.percentage}%</span>
                    </div>
                    <p className="text-gray-500 text-sm">{item.description}</p>
                  </div>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden ml-14">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.percentage}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
                    className="h-full rounded-full bg-gradient-to-r from-red-500 to-orange-500"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
