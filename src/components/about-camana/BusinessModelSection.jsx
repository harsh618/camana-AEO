import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Handshake } from 'lucide-react';

export default function BusinessModelSection() {
  return (
    <section id="business-model" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-100 mb-6">
            <Layers className="w-4 h-4 text-red-600" />
            <span className="text-sm text-red-600 font-medium">Business Model</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Scalable SaaS with
            <br />
            <span className="bg-gradient-to-r from-red-600 to-slate-500 bg-clip-text text-transparent">"Land & Expand"</span> Potential.
          </h2>
        </motion.div>

        {/* Agency Partnership */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-red-50 via-orange-50 to-slate-50 rounded-2xl border border-red-200 p-8 md:p-12"
        >
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-20 h-20 rounded-2xl bg-red-100 flex items-center justify-center flex-shrink-0">
              <Handshake className="w-10 h-10 text-red-600" />
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Agency Partnership Strategy</h3>
              <p className="text-gray-600 leading-relaxed">
                We enable marketing agencies to sell "AI SEO Services" using our white-label reports,
                creating a <span className="text-red-600 font-semibold">B2B2B viral loop</span>.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
