import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function HeroSection({ onGetStarted }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-white to-slate-50" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-red-200/30 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-slate-200/30 rounded-full blur-[100px]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-100 border border-red-200 mb-8">
            <Sparkles className="w-4 h-4 text-red-600" />
            <span className="text-sm text-red-700 font-medium">AI Search Optimization Platform</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-gray-900 tracking-tight mb-6">
            Searchlyst
            <span className="bg-gradient-to-r from-red-600 via-orange-500 to-slate-500 bg-clip-text text-transparent"> Technologies</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 font-light max-w-3xl mx-auto mb-12 leading-relaxed">
            Building the future of AI search and discovery
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={onGetStarted}
              className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white px-8 py-6 text-lg rounded-full shadow-lg shadow-red-500/25 transition-all duration-300 hover:shadow-red-500/40 hover:scale-105"
            >
              Start Free 7 Day Trial
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-6 text-lg rounded-full"
            >
              Watch Demo
            </Button>
          </div>

          <div className="flex items-center justify-center gap-8 mt-12 text-sm text-gray-500">
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Setup in 5 minutes
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              No credit card required
            </span>
            <span className="hidden sm:flex items-center gap-2">
              <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Cancel anytime
            </span>
          </div>
        </motion.div>

        {/* Animated Dashboard Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mt-20 relative mx-auto max-w-5xl"
        >
          <div className="bg-white/40 backdrop-blur-xl border border-white/50 rounded-2xl shadow-2xl overflow-hidden p-2 ring-1 ring-black/5">
            <div className="bg-slate-900 rounded-xl overflow-hidden shadow-inner border border-slate-800 relative min-h-[400px]">
              {/* Window Controls */}
              <div className="bg-slate-800/50 px-4 py-3 flex items-center gap-2 border-b border-slate-700/50">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>

              {/* Dashboard Operations */}
              <div className="p-8 grid grid-cols-12 gap-6">
                {/* Sidebar */}
                <div className="col-span-3 space-y-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-2 bg-slate-800 rounded-full w-full animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                  ))}
                </div>

                {/* Main Content */}
                <div className="col-span-9 space-y-8">
                  {/* Search Simulation */}
                  <div className="bg-slate-800/80 rounded-lg p-4 border border-slate-700 flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full border-2 border-slate-500" />
                    <div className="h-2 bg-slate-600 rounded-full w-1/3 overflow-hidden relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                    </div>
                  </div>

                  {/* Charts Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50 h-32 flex items-end justify-between px-4 pb-2">
                      {[40, 70, 50, 90, 60].map((h, i) => (
                        <motion.div
                          key={i}
                          initial={{ height: 0 }}
                          whileInView={{ height: `${h}%` }}
                          transition={{ duration: 1, delay: i * 0.1 }}
                          className="w-4 bg-gradient-to-t from-red-600 to-orange-500 rounded-t-sm"
                        />
                      ))}
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50 h-32 relative overflow-hidden">
                      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-900/20 via-slate-900 to-slate-900" />
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-red-500/20 rounded-full animate-ping" />
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-red-500/50 rounded-full backdrop-blur-md" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
