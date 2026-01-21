import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function McKinseySection() {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-red-50/50 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-orange-50/50 rounded-full blur-[100px]" />

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-center">
                {/* Centered Header */}
                <div className="max-w-full mx-auto mb-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 mb-6 border border-red-100">
                            <Sparkles className="w-4 h-4 text-red-600" />
                            <span className="text-sm text-red-700 font-medium">Industry Insight</span>
                        </div>

                        <h2 className="text-4xl lg:text-6xl font-bold text-slate-900 leading-tight whitespace-nowrap">
                            AI Search: <span className="bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">The New Frontier of AI Discovery</span>
                        </h2>
                    </motion.div>
                </div>

                {/* Main Card */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="w-full"
                >
                    <div className="bg-gradient-to-br from-slate-50 to-white rounded-3xl p-10 md:p-14 border border-slate-100 shadow-xl flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden group transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 max-w-6xl mx-auto">

                        {/* Interactive Shine Effect on Hover */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out pointer-events-none" />

                        {/* Left Content: Stat */}
                        <div className="flex-1 text-center md:text-left relative z-10">
                            <span className="text-7xl md:text-8xl font-bold text-slate-900 tracking-tight block mb-4">
                                50%
                            </span>
                            <p className="text-xl md:text-2xl text-slate-600 font-medium leading-relaxed max-w-xl">
                                of consumers use AI-powered search to make buying decisions.
                            </p>
                        </div>

                        {/* Divider for Desktop */}
                        <div className="hidden md:block w-px h-32 bg-slate-200" />

                        {/* Right Content: Logo */}
                        <div className="flex-shrink-0 relative z-10">
                            <div className="flex flex-col items-center md:items-start opacity-80 group-hover:opacity-100 transition-opacity">
                                <span className="text-3xl font-serif font-bold text-slate-900 tracking-tight">McKinsey</span>
                                <span className="text-xl font-serif italic text-slate-700">& Company</span>
                            </div>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
