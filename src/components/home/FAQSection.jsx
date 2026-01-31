import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

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
    question: "Can you guarantee I'll rank in AI results??",
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
    <section id="faq" ref={ref} className="py-16 bg-black relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[120px]">
        {/* Badge - Updated with glowing red dot */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="flex justify-center mb-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-[30px] border border-[#ef2b15] bg-[#fd2d15]/10">
            <span 
              className="w-[9px] h-[9px] rounded-full bg-[#FD2D15]" 
              style={{ 
                boxShadow: '0 0 8px 2px rgba(253, 45, 21, 0.6), 0 0 4px 1px rgba(253, 45, 21, 0.8)',
                filter: 'blur(0.5px)'
              }} 
            />
            <span className="text-[18px] font-semibold text-[#ef2b15]/80">FAQ</span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="text-center mb-4"
        >
          <h2 className="text-[48px] sm:text-[64px] font-bold leading-tight">
            <span className="text-white">Common Questions About </span>
            <span className="text-[#ef2b15]">AI Search Optimization</span>
          </h2>
        </motion.div>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="text-[18px] font-medium text-[#ededed]/90 text-center max-w-[684px] mx-auto mb-12"
        >
          Everything you need to know about getting your brand discovered in AI search.
        </motion.p>

        {/* FAQ Accordion */}
        <div className="max-w-[838px] mx-auto space-y-[15px]">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + index * 0.05 }}
            >
              <div
                className="rounded-[25px] border border-[#ededed]/15 bg-[#b0b0b0]/3 shadow-[0px_4px_4px_rgba(255,255,255,0.06)] overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="text-[20px] font-semibold text-[#ededed] pr-4">{faq.question}</span>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex-shrink-0"
                  >
                    <svg width="15" height="11" viewBox="0 0 15 11" fill="none">
                      <path d="M1 1L7.5 9L14 1" stroke="#ededed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
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
                        <div className="h-px bg-[#ededed]/10 mb-4" />
                        <p className="text-[16px] text-[#ededed]/80 leading-relaxed">{faq.answer}</p>
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
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <p className="text-[14px] font-medium text-[#ededed] mb-4">Still have questions?</p>
          <button className="inline-flex items-center gap-2 px-6 py-3 rounded-[30px] border border-[#ededed]/50 text-[15px] font-medium text-[#ededed] hover:bg-[#ededed]/5 transition-all">
            <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
              <rect x="0.5" y="0.5" width="16" height="12" rx="1.5" stroke="#ededed" strokeOpacity="0.95"/>
              <path d="M1 14L5 10" stroke="#ededed" strokeOpacity="0.95" strokeLinecap="round"/>
              <path d="M16 14L12 10" stroke="#ededed" strokeOpacity="0.95" strokeLinecap="round"/>
            </svg>
            Chat with our team
          </button>
        </motion.div>
      </div>
    </section>
  );
}
