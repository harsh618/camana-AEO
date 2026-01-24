import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function McKinseySection() {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-red-50/50 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-orange-50/50 rounded-full blur-[100px]" />

            <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-10">
                {/* Centered Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-10"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 mb-6 border border-red-100">
                        <Sparkles className="w-4 h-4 text-red-600" />
                        <span className="text-sm text-red-700 font-medium">Industry Insight</span>
                    </div>

                    <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 leading-tight">
                        AI Search: <span className="bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">The New Frontier of AI Discovery</span>
                    </h2>
                </motion.div>

                {/* Card */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl p-8 md:p-10 border border-slate-100 shadow-lg flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                        {/* Interactive Shine Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out pointer-events-none" />

                        {/* Left: Stat */}
                        <div className="text-center md:text-left relative z-10">
                            <span className="text-4xl lg:text-5xl font-bold text-slate-900 block mb-2">
                                50%
                            </span>
                            <p className="text-base text-slate-600 leading-relaxed max-w-sm">
                                of consumers use AI-powered search to make buying decisions.
                            </p>
                        </div>

                        {/* Right: McKinsey Branding */}
                        <div className="flex flex-col items-center md:items-end text-right relative z-10">
                            <span className="text-2xl font-serif font-bold text-slate-900">McKinsey</span>
                            <span className="text-lg font-serif italic text-slate-600">& Company</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
