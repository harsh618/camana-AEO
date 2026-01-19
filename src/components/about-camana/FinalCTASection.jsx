import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function FinalCTASection({ onGetStarted }) {
  return (
    <section className="py-24 bg-gradient-to-br from-red-50 via-white to-slate-50 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-red-200/30 to-transparent rounded-full blur-[100px]" />
      
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Ready to Get Discovered by
            <br />
            <span className="bg-gradient-to-r from-red-600 via-orange-500 to-slate-500 bg-clip-text text-transparent">
              1.5 Billion AI Users?
            </span>
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Start your 7-day free trial. No credit card required. See your AI visibility score in minutes.
          </p>
          
          <Button 
            size="lg" 
            onClick={onGetStarted}
            className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white px-10 py-7 text-lg rounded-full shadow-lg shadow-red-500/25 transition-all duration-300 hover:shadow-red-500/40 hover:scale-105"
          >
            Get Your Free AI Visibility Report
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          
          <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-sm text-gray-500">
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-500" />
              Setup in 5 minutes
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-500" />
              No technical skills needed
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-500" />
              Cancel anytime
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
