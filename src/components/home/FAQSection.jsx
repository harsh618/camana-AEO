import React, { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const logo = [
  { name: "faq", logo: "../public/logos/faq.png" },
  { name: "chat", logo: "../public/logos/chat.png" },
];

const faqs = [
  {
    question: "How is this different from traditional SEO?",
    answer:
      "Traditional SEO optimizes for Google's algorithm. AI search optimization (AEO) focuses on making your content citation-worthy for AI platforms like ChatGPT and Claude. Different algorithms, different strategies. You need both.",
  },
  {
    question: "Which AI platforms do you track?",
    answer:
      "We monitor ChatGPT, Claude, Perplexity, Gemini, and emerging AI search engines. As new platforms launch, we add them automatically.",
  },
  {
    question: "How quickly will I see results?",
    answer:
      "Most brands see measurable visibility improvements within 30-60 days. Quick wins like adding llms.txt and optimizing structured data can show results in days.",
  },
  {
    question: "Do I need technical knowledge?",
    answer:
      "No. We provide plain-English recommendations with one-click fixes where possible. Our team can also handle technical implementation for Enterprise clients.",
  },
  {
    question: "Can you guarantee I'll rank in AI results??",
    answer:
      "We can't guarantee specific rankings (no one can), but we can guarantee you'll have the technical foundation and content strategy that AI platforms prefer for citations.",
  },
  {
    question: "What if I'm not in the results yet?",
    answer:
      "Perfect - that means huge opportunity. We'll show you exactly why you're invisible and how to fix it. Most brands aren't optimized for AI yet.",
  },
  {
    question: "Do you work with agencies?",
    answer:
      "Yes! We offer white-label reporting and agency-specific features. Many agencies use us to add AI visibility services for their clients.",
  },
  {
    question: "What's your refund policy?",
    answer:
      "14-day money-back guarantee, no questions asked. Plus, try free for 14 days before paying anything.",
  },
];

export default function FAQSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section
      id="faq"
      ref={ref}
      className="py-6 sm:py-16 md:py-20 lg:py-12 bg-black relative overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-[120px]">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="flex justify-center mb-4 sm:mb-5 md:mb-6"
        >
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-[30px] border border-[#ef2b15] bg-[#fd2d15]/10">
            <motion.img
              src={logo[0].logo}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="h-[12px] sm:h-[15px] lg:h-[20px] object-contain"
            />
            <span className="text-[14px] sm:text-[16px] lg:text-[18px] font-semibold text-[#ef2b15]/80">
              FAQ
            </span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="text-center mb-3 sm:mb-4 px-2"
        >
          <h2 className="text-[28px] sm:text-[36px] md:text-[48px] lg:text-[56px] xl:text-[64px] font-bold leading-tight">
            <span className="text-white">Common Questions About </span>
            <span className="text-[#ef2b15]">AI Search Optimization</span>
          </h2>
        </motion.div>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="text-[14px] sm:text-[16px] md:text-[17px] lg:text-[18px] font-medium text-[#ededed]/90 text-center max-w-[684px] mx-auto mb-8 sm:mb-10 md:mb-12 px-4"
        >
          Everything you need to know about getting your brand discovered in AI
          search.
        </motion.p>

        {/* FAQ Accordion */}
        <div className="max-w-[838px] mx-auto space-y-3 sm:space-y-4 md:space-y-[15px]">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + index * 0.05 }}
            >
              <div className="rounded-[20px] sm:rounded-[25px] border border-[#ededed]/15 bg-[#b0b0b0]/3 shadow-[0px_4px_4px_rgba(255,255,255,0.06)] overflow-hidden">
                <button
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                  className="w-full flex items-center justify-between p-4 sm:p-5 md:p-6 text-left hover:bg-[#ededed]/5 transition-colors"
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span className="text-[15px] sm:text-[17px] md:text-[18px] lg:text-[20px] font-semibold text-[#ededed] pr-3 sm:pr-4 leading-snug">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex-shrink-0"
                  >
                    <svg 
                      width="15" 
                      height="11" 
                      viewBox="0 0 15 11" 
                      fill="none"
                      className="w-[12px] h-[9px] sm:w-[15px] sm:h-[11px]"
                    >
                      <path
                        d="M1 1L7.5 9L14 1"
                        stroke="#ededed"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.div>
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      id={`faq-answer-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-4 sm:px-5 md:px-6 pb-4 sm:pb-5 md:pb-6">
                        <div className="h-px bg-[#ededed]/10 mb-3 sm:mb-4" />
                        <p className="text-[14px] sm:text-[15px] md:text-[16px] text-[#ededed]/80 leading-relaxed">
                          {faq.answer}
                        </p>
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
          className="mt-8 sm:mt-10 md:mt-12 text-center"
        >
          <p className="text-[13px] sm:text-[14px] font-medium text-[#ededed] mb-3 sm:mb-4">
            Still have questions?
          </p>
          <button className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-[30px] border border-[#ededed]/50 text-[14px] sm:text-[15px] font-medium text-[#ededed] hover:bg-[#ededed]/5 transition-all active:scale-95">
            <svg
              width="21"
              height="21"
              viewBox="0 0 21 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-[18px] h-[18px] sm:w-[21px] sm:h-[21px]"
            >
              <path
                d="M1.69287 18.6232V3.38634C1.69287 2.92077 1.85864 2.52222 2.19018 2.19067C2.52173 1.85913 2.92028 1.69336 3.38585 1.69336H16.9297C17.3953 1.69336 17.7938 1.85913 18.1254 2.19067C18.4569 2.52222 18.6227 2.92077 18.6227 3.38634V13.5442C18.6227 14.0098 18.4569 14.4084 18.1254 14.7399C17.7938 15.0715 17.3953 15.2372 16.9297 15.2372H5.07884L1.69287 18.6232ZM4.35932 13.5442H16.9297V3.38634H3.38585V14.4965L4.35932 13.5442Z"
                fill="#EDEDED"
                fillOpacity="0.95"
              />
            </svg>
            Chat with our team
          </button>
        </motion.div>
      </div>
    </section>
  );
}