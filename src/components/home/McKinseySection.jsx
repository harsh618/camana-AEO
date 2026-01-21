import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function McKinseySection() {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-red-50/50 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-orange-50/50 rounded-full blur-[100px]" />

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Column: Header & Title */}
                    <div className="text-left">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 mb-6 border border-red-100">
                                <Sparkles className="w-4 h-4 text-red-600" />
                                <span className="text-sm text-red-700 font-medium">Industry Insight</span>
                            </div>

                            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 leading-tight mb-6">
                                AI Search: <span className="bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">The New Frontier of Search</span>
                            </h2>
                            <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
                                Traditional SEO is evolving. Brands must now optimize for AI discovery engines to stay visible in the new search landscape.
                            </p>
                        </motion.div>
                    </div>

                    {/* Right Column: Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="w-full"
                    >
                        <div className="bg-gradient-to-br from-slate-50 to-white rounded-3xl p-10 border border-slate-100 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-8 relative overflow-hidden group transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">

                            {/* Interactive Shine Effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out pointer-events-none" />

                            <div className="text-center sm:text-left relative z-10">
                                <span className="text-6xl lg:text-7xl font-bold text-slate-900 tracking-tight block mb-2">
                                    50%
                                </span>
                                <p className="text-lg text-slate-600 font-medium leading-snug">
                                    of consumers use AI<br />for buying decisions
                                </p>
                            </div>

                            {/* Divider */}
                            <div className="hidden sm:block w-px h-24 bg-slate-200" />

                            <div className="flex flex-col items-center sm:items-start opacity-80 group-hover:opacity-100 transition-opacity relative z-10">
                                <span className="text-2xl font-serif font-bold text-slate-900 tracking-tight">McKinsey</span>
                                <span className="text-lg font-serif italic text-slate-700">& Company</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
