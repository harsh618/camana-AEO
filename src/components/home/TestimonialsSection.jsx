import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Quote, Star, TrendingUp, Trophy, DollarSign } from 'lucide-react';

const testimonials = [
  {
    quote: "We went from zero ChatGPT mentions to being cited in 43% of relevant queries in just 90 days. Game-changing for our lead generation.",
    author: "Sarah Chen",
    role: "VP of Marketing",
    company: "TechFlow Solutions",
    industry: "SaaS Industry",
    avatar: "SC",
    metric: "+310%",
    metricLabel: "AI Visibility",
    icon: TrendingUp,
    color: 'from-red-500 to-red-600'
  },
  {
    quote: "Finally, a way to track what actually matters. We discovered competitors were dominating AI search while we were invisible. Not anymore.",
    author: "Marcus Rodriguez",
    role: "Founder",
    company: "GreenLeaf Consulting",
    industry: "Professional Services",
    avatar: "MR",
    metric: "8/10",
    metricLabel: "Outranking Competitors",
    icon: Trophy,
    color: 'from-slate-800 to-slate-900'
  },
  {
    quote: "The ROI is insane. AI-referred traffic converts 2.5x better than Google for us. This platform pays for itself 10x over.",
    author: "Emily Thompson",
    role: "Head of Growth",
    company: "Wellness Co",
    industry: "E-commerce",
    avatar: "ET",
    metric: "$47K",
    metricLabel: "Revenue from AI Search",
    icon: DollarSign,
    color: 'from-red-600 to-red-700'
  }
];

export default function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="testimonials" ref={ref} className="py-24 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(253,45,21,0.03),transparent_50%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 text-red-600 text-sm font-medium mb-6">
            <Star className="w-4 h-4 fill-current" />
            Success Stories
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
            Brands{' '}
            <span className="bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
              Winning
            </span>{' '}
            in AI Search
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            See how leading brands are transforming their visibility across AI platforms.
          </p>
        </motion.div>

        {/* Testimonial Cards */}
        <div className="grid lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => {
            const Icon = testimonial.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="h-full bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:border-slate-200 transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
                  {/* Quote Icon */}
                  <div className="absolute top-6 right-6 opacity-10">
                    <Quote className="w-16 h-16 text-slate-900" />
                  </div>

                  {/* Stars */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-amber-400 fill-current" />
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="text-lg text-slate-700 leading-relaxed mb-8 relative z-10">
                    "{testimonial.quote}"
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${testimonial.color} flex items-center justify-center text-white font-bold`}>
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">{testimonial.author}</div>
                      <div className="text-sm text-slate-600">{testimonial.role}, {testimonial.company}</div>
                      <div className="text-xs text-slate-400">{testimonial.industry}</div>
                    </div>
                  </div>

                  {/* Metric Badge */}
                  <div className={`inline-flex items-center gap-3 px-4 py-3 rounded-2xl bg-gradient-to-r ${testimonial.color} bg-opacity-10`}>
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${testimonial.color} flex items-center justify-center`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-slate-900">{testimonial.metric}</div>
                      <div className="text-xs text-slate-600">{testimonial.metricLabel}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}