import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'How is this different from traditional SEO?',
    answer: 'Traditional SEO optimizes for Google\'s algorithm. AI search optimization (AEO) focuses on making your content citation-worthy for AI platforms like ChatGPT and Claude. Different algorithms, different strategies. You need both.'
  },
  {
    question: 'Which AI platforms do you track?',
    answer: 'We monitor ChatGPT, Claude, Perplexity, Gemini, and emerging AI search engines. As new platforms launch, we add them automatically.'
  },
  {
    question: 'How quickly will I see results?',
    answer: 'Most brands see measurable visibility improvements within 30-60 days. Quick wins like adding llms.txt and optimizing structured data can show results in days.'
  },
  {
    question: 'Do I need technical knowledge?',
    answer: 'No. We provide plain-English recommendations with one-click fixes where possible. Our team can also handle technical implementation for Enterprise clients.'
  },
  {
    question: 'Can you guarantee I\'ll rank in AI results?',
    answer: 'We can\'t guarantee specific rankings (no one can), but we can guarantee you\'ll have the technical foundation and content strategy that AI platforms prefer for citations.'
  },
  {
    question: 'What if I\'m not in the results yet?',
    answer: 'Perfect - that means huge opportunity. We\'ll show you exactly why you\'re invisible and how to fix it. Most brands aren\'t optimized for AI yet.'
  },
  {
    question: 'Do you work with agencies?',
    answer: 'Yes! We offer white-label reporting and agency-specific features. Many agencies use us to add AI visibility services for their clients.'
  }
];

function FAQItem({ faq, isOpen, onToggle }) {
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={onToggle}
        className="w-full py-6 flex items-center justify-between text-left group"
      >
        <span className="text-lg font-medium text-gray-900 group-hover:text-violet-600 transition-colors pr-4">
          {faq.question}
        </span>
        <ChevronDown 
          className={`w-5 h-5 text-gray-400 transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="text-gray-600 pb-6 leading-relaxed">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);
  
  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-100 mb-6">
            <HelpCircle className="w-4 h-4 text-violet-600" />
            <span className="text-sm text-violet-600 font-medium">FAQ</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Common Questions About
            <br />
            <span className="bg-gradient-to-r from-violet-600 to-cyan-500 bg-clip-text text-transparent">AI Search Optimization</span>
          </h2>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white rounded-2xl border border-gray-200 shadow-sm px-8"
        >
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}