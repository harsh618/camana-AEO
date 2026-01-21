import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function IndustryInsightsSection() {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-red-50/50 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-orange-50/50 rounded-full blur-[100px]" />

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">


                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Left Content - Text */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 mb-8 border border-red-100">
                            <Sparkles className="w-4 h-4 text-red-600" />
                            <span className="text-sm text-red-700 font-medium">Industry Insights</span>
                        </div>

                        <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-8 leading-tight">
                            Born from the <br />
                            <span className="bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">AI Revolution</span>
                        </h2>
                        <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                            <p>
                                In 2023, we noticed a seismic shift in how people discover information.
                                AI platforms like ChatGPT, Perplexity, and Claude weren't just answering
                                questions—they were becoming the new search engines.
                            </p>
                            <p>
                                Traditional SEO tools couldn't track this new landscape. Brands were
                                flying blind in a world where 1.5 billion users now rely on AI for
                                recommendations.
                            </p>
                            <p>
                                We built Searchlyst to fill this gap—a platform that helps brands
                                understand, track, and optimize their visibility across every major AI
                                search platform.
                            </p>
                        </div>
                    </motion.div>

                    {/* Right Content - Floating Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative"
                    >
                        {/* Decorative Elements around card */}
                        <div className="absolute -top-10 -right-10 w-24 h-24 bg-red-100 rounded-full opacity-50 blur-xl"></div>
                        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-orange-100 rounded-full opacity-50 blur-xl"></div>

                        <div className="bg-gradient-to-br from-slate-50 to-white p-8 lg:p-10 rounded-3xl border border-slate-100 shadow-xl relative z-10 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                            {/* Badge on Card */}
                            <div className="absolute -top-5 right-8 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-bold shadow-sm border border-green-200">
                                55% by 2028
                            </div>

                            <div className="mb-8">
                                <p className="text-xl lg:text-2xl font-medium text-slate-900 leading-relaxed italic">
                                    "AI platforms like ChatGPT, Perplexity, Gemini, and Claude now serve 1.5 billion users and already handle 32% of global search queries — projected to reach 55% by 2028."
                                </p>
                            </div>

                            <div className="flex items-center gap-4 border-t border-slate-200 pt-6">
                                <div className="px-4 py-1.5 bg-slate-100 rounded-lg text-slate-900 font-bold tracking-wide">
                                    Gartner
                                </div>
                                <span className="text-slate-500 font-medium">Industry Research</span>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
