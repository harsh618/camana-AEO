import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, MessageCircle } from 'lucide-react';

const faqs = [
  {
    question: "How is this different from traditional SEO?",
    answer: "Traditional SEO optimizes for Google's algorithm. AI search optimization (AEO) focuses on making your content citation-worthy for AI platforms like ChatGPT and Claude. Different algorithms, different strategies. You need both."
  },
  {
    question: "Which AI platforms do you track?",
    answer: "We monitor ChatGPT, Claude, Perplexity, Gemini, and emerging AI search engines. As new platforms launch, we add them automatically."
  },
  {
    question: "How quickly will I see results?",
    answer: "Most brands see measurable visibility improvements within 30-60 days. Quick wins like adding llms.txt and optimizing structured data can show results in days."
  },
  {
    question: "Do I need technical knowledge?",
    answer: "No. We provide plain-English recommendations with one-click fixes where possible. Our team can also handle technical implementation for Enterprise clients."
  },
  {
    question: "Can you guarantee I'll rank in AI results?",
    answer: "We can't guarantee specific rankings (no one can), but we can guarantee you'll have the technical foundation and content strategy that AI platforms prefer for citations."
  },
  {
    question: "What if I'm not in the results yet?",
    answer: "Perfect - that means huge opportunity. We'll show you exactly why you're invisible and how to fix it. Most brands aren't optimized for AI yet."
  },
  {
    question: "Do you work with agencies?",
    answer: "Yes! We offer white-label reporting and agency-specific features. Many agencies use us to add AI visibility services for their clients."
  },
  {
    question: "What's your refund policy?",
    answer: "14-day money-back guarantee, no questions asked. Plus, try free for 14 days before paying anything."
  }
];

export default function FAQSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id="faq" ref={ref} className="py-24 bg-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(253,45,21,0.03),transparent_50%)]" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 text-red-600 text-sm font-medium mb-6">
            <HelpCircle className="w-4 h-4" />
            FAQ
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
            Common Questions About{' '}
            <span className="bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
              AI Search Optimization
            </span>
          </h2>
          <p className="text-xl text-slate-600">
            Everything you need to know about getting your brand discovered in AI search.
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <div
                className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${openIndex === index
                  ? 'border-red-200 shadow-lg shadow-red-500/10'
                  : 'border-slate-100 hover:border-slate-200'
                  }`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="text-lg font-semibold text-slate-900 pr-8">{faq.question}</span>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${openIndex === index ? 'bg-red-100' : 'bg-slate-100'
                      }`}
                  >
                    <ChevronDown className={`w-5 h-5 ${openIndex === index ? 'text-red-600' : 'text-slate-500'}`} />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6">
                        <div className="h-px bg-slate-100 mb-4" />
                        <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-slate-600 mb-4">Still have questions?</p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 font-medium transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            Chat with our team
          </a>
        </motion.div>
      </div>
    </section>
  );
}