import React from "react";
import { motion } from "framer-motion";
import industryInsightsIcon from '../../assets/icons/industry-insights.svg';

const logo = [
  { name: "industryInsights", logo: industryInsightsIcon },
];

export default function McKinseySection() {
  return (
    <section className="py-16 bg-black relative overflow-hidden">
      {/* Top gradient background */}
      <div className="absolute top-0 left-0 right-0 h-[450px] bg-gradient-to-b from-[#ef2b15]/10 to-transparent" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[120px] relative z-10">
        {/* Badge - Updated with glowing red dot */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mb-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-[30px] border border-[#ef2b15] bg-[#fd2d15]/10">
            <motion.img
              src={logo[0].logo}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="h-[10px] sm:h-[15px] lg:h-[20px] object-contain"
            />
            <span className="text-[14px] sm:text-[16px] lg:text-[18px] font-semibold text-[#ef2b15]/80">
              Industry Insight
            </span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-[28px] sm:text-[40px] md:text-[56px] lg:text-[64px] font-bold text-center mb-4 sm:mb-6 leading-[1.2] px-2 sm:px-0"
        >
          <span className="text-white">AI Search: </span>
          <span className="text-[#ef2b15]">The New </span>
          <span className="text-white">Frontier of Search</span>
        </motion.h2>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-[14px] sm:text-[16px] lg:text-[18px] font-medium text-[#ededed]/90 text-center max-w-[621px] mx-auto mb-8 sm:mb-12 px-2 sm:px-0 leading-[1.5]"
        >
          Traditional SEO is evolving. Brands must now optimize for AI discovery
          engines to stay visible in the new search landscape.
        </motion.p>

        {/* McKinsey Card - Updated layout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="max-w-[623px] mx-auto"
        >
          <div className="rounded-[20px] sm:rounded-[30px] border border-[#ededed]/15 bg-[#b0b0b0]/5 p-6 sm:p-8 md:p-10 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 md:gap-12">
            {/* Left: Stat */}
            <div className="text-center sm:text-left flex-shrink-0">
              <span className="text-[42px] sm:text-[48px] lg:text-[58px] font-bold text-[#ef2b15] block leading-none">
                50%
              </span>
              <p className="text-[14px] sm:text-[16px] lg:text-[18px] font-medium text-[#ededed] mt-2 max-w-[200px] mx-auto sm:mx-0">
                of consumers use AI for buying decisions
              </p>
            </div>

            {/* Horizontal Divider (mobile) / Vertical Divider (sm+) */}
            <div className="sm:hidden w-[80px] h-[2px] bg-gradient-to-r from-transparent via-[#333] to-transparent" />
            <div
              className="hidden sm:block w-[2px] h-[110px] bg-gradient-to-b from-transparent via-[#333] to-transparent"
              style={{
                boxShadow: "0 0 8px rgba(0, 0, 0, 0.5)",
              }}
            />

            {/* Right: McKinsey Logo */}
            <div className="flex flex-col items-center sm:items-start flex-shrink-0">
              <img
                src="/logos/mckinsey.png"
                alt="McKinsey & Company"
                className="h-[48px] sm:h-[60px] lg:h-[70px] object-contain"
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Divider line */}
      <div className="mt-16 flex justify-center">
        <div className="w-[90%] sm:w-[681px] max-w-[681px] h-[2px] bg-[#2b2b2b] blur-[4px]" />
      </div>
    </section>
  );
}