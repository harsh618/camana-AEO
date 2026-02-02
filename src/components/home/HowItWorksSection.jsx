import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  ReferenceDot,
} from "recharts";

const milestones = [
  {
    week: 1,
    visibility: 5,
    label: "8%",
    stage: "Discovery & Baseline",
    color: "#EF4444",
  },
  {
    week: 4,
    visibility: 35,
    label: "33%",
    stage: "Technical Foundation",
    color: "#F97316",
  },
  {
    week: 6,
    visibility: 65,
    label: "63%",
    stage: "Content Optimization",
    color: "#EAB308",
  },
  {
    week: 9,
    visibility: 95,
    label: "93%",
    stage: "Citation Strategy",
    color: "#22C55E",
  },
  {
    week: 11,
    visibility: 180,
    label: "180%",
    stage: "AI Domination",
    color: "#22C55E",
  },
];

const graphData = [
  { week: "Week 1", value: 5 },
  { week: "Week 2", value: 12 },
  { week: "Week 3", value: 22 },
  { week: "Week 4", value: 35 },
  { week: "Week 5", value: 48 },
  { week: "Week 6", value: 65 },
  { week: "Week 7", value: 75 },
  { week: "Week 8", value: 85 },
  { week: "Week 9", value: 95 },
  { week: "Week 10", value: 130 },
  { week: "Week 11", value: 180 },
];

const stats = [
  {
    icon: "/icons/electricity.png",
    value: "18 days",
    label: "Time To First Citation",
  },
  { icon: "/icons/growth.png", value: "180%", label: "90-Day Growth" },
  { icon: "/icons/fibonacci.png", value: "3x", label: "Citation Rate" },
  { icon: "/icons/dollar-coin.png", value: "2.1x", label: "Traffic Quality" },
];

// Custom dot component for milestone markers
const CustomDot = ({ cx, cy, payload, dataKey }) => {
  const milestone = milestones.find((m) => `Week ${m.week}` === payload.week);
  if (!milestone) return null;

  return (
    <g>
      {/* Outer glow */}
      <circle cx={cx} cy={cy} r={12} fill={milestone.color} fillOpacity={0.3} />
      {/* Main dot */}
      <circle
        cx={cx}
        cy={cy}
        r={8}
        fill={milestone.color}
        stroke="white"
        strokeWidth={2}
      />
    </g>
  );
};

import industryInsightsIcon from '../../assets/icons/industry-insights.svg';

const logo = [
  { name: "industryInsights", logo: industryInsightsIcon },
];

export default function HowItWorksSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="how-it-works"
      ref={ref}
      className="py-16 bg-black relative overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[83px]">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
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
              Growth Trajectory
            </span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="text-center mb-4"
        >
          <h2 className="text-[28px] sm:text-[40px] md:text-[48px] lg:text-[58px] font-medium text-white leading-[1.2]">
            Growth Trajectory
          </h2>
        </motion.div>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="text-[14px] sm:text-[16px] lg:text-[18px] font-medium text-center mb-8 sm:mb-10 px-2 sm:px-0 leading-[1.5]"
        >
          <span className="text-[#ededed]/90">
            From baseline discovery to total domination.{" "}
          </span>
          <span className="text-[#ef2b15]">Every step is AI-Enhanced.</span>
        </motion.p>

        {/* Chart Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="rounded-[24px] sm:rounded-[36px] lg:rounded-[50px] border border-[#ededed]/15 bg-[#b0b0b0]/5 shadow-[0px_4px_4px_rgba(255,255,255,0.06)] p-4 sm:p-6 md:p-10 mb-8"
        >
          {/* Chart Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
            <h3 className="text-[22px] sm:text-[26px] lg:text-[32px] font-semibold text-[#ededed]">
              Visibility score
            </h3>
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-[13px] border border-[#460d06] bg-[#fd2d15]/10">
              <img
                src="/icons/currency-growth.png"
                alt=""
                className="w-4 h-4 sm:w-5 sm:h-5 object-contain"
              />
              <span className="text-[12px] sm:text-[14px] lg:text-[18px] font-medium text-[#ef2b15]/80">
                Avg time to first citation: 18 days
              </span>
            </div>
          </div>

          {/* Chart */}
          <div className="h-[260px] sm:h-[320px] lg:h-[400px] relative">
            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 bottom-[40px] sm:bottom-[50px] lg:bottom-[60px] flex flex-col justify-between text-[11px] sm:text-[14px] lg:text-[18px] font-medium text-[#ededed] w-[28px] sm:w-[36px] lg:w-[44px]">
              <span>200</span>
              <span>150</span>
              <span>100</span>
              <span>50</span>
              <span>0</span>
            </div>

            {/* Chart Area */}
            <div className="ml-[28px] sm:ml-[36px] lg:ml-[44px] h-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={graphData}
                  margin={{ top: 40, right: 10, left: 0, bottom: 30 }}
                >
                  <defs>
                    <linearGradient
                      id="visibilityGradient"
                      x1="0"
                      y1="0"
                      x2="1"
                      y2="0"
                    >
                      <stop offset="0%" stopColor="#EF4444" />
                      <stop offset="30%" stopColor="#F97316" />
                      <stop offset="60%" stopColor="#EAB308" />
                      <stop offset="100%" stopColor="#22C55E" />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="week"
                    stroke="#ededed"
                    fontSize={11}
                    fontWeight={500}
                    tickLine={false}
                    axisLine={{ stroke: "#e0e0e0" }}
                    dy={8}
                    interval={1}
                    tick={{ fontSize: "clamp(9px, 1.5vw, 18px)" }}
                  />
                  <YAxis hide domain={[0, 200]} />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="url(#visibilityGradient)"
                    strokeWidth={4}
                    dot={<CustomDot />}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Milestone Labels — hidden on mobile, visible sm+ */}
            <div className="hidden sm:block absolute top-0 left-[36px] lg:left-[44px] right-[10px] h-full pointer-events-none">
              {/* Week 1 - 8% Discovery & Baseline */}
              <div className="absolute" style={{ left: "5%", top: "72%" }}>
                <span className="text-[13px] lg:text-[16px] font-extrabold text-[#EF4444] block">
                  8%
                </span>
                <span className="text-[11px] lg:text-[14px] font-medium text-[#ededed]/80">
                  Discovery & Baseline
                </span>
              </div>
              {/* Week 4 - 33% Technical Foundation */}
              <div className="absolute" style={{ left: "28%", top: "55%" }}>
                <span className="text-[13px] lg:text-[16px] font-extrabold text-[#F97316] block">
                  33%
                </span>
                <span className="text-[11px] lg:text-[14px] font-medium text-[#ededed]/80">
                  Technical Foundation
                </span>
              </div>
              {/* Week 6 - 63% Content Optimization */}
              <div className="absolute" style={{ left: "48%", top: "40%" }}>
                <span className="text-[13px] lg:text-[16px] font-extrabold text-[#EAB308] block">
                  63%
                </span>
                <span className="text-[11px] lg:text-[14px] font-medium text-[#ededed]/80">
                  Content Optimization
                </span>
              </div>
              {/* Week 9 - 93% Citation Strategy */}
              <div className="absolute" style={{ left: "72%", top: "25%" }}>
                <span className="text-[13px] lg:text-[16px] font-extrabold text-[#22C55E] block">
                  93%
                </span>
                <span className="text-[11px] lg:text-[14px] font-medium text-[#ededed]/80">
                  Citation Strategy
                </span>
              </div>
              {/* Week 11 - 180% AI Domination */}
              <div className="absolute" style={{ right: "2%", top: "5%" }}>
                <span className="text-[13px] lg:text-[16px] font-extrabold text-[#22C55E] block">
                  180%
                </span>
                <span className="text-[11px] lg:text-[14px] font-medium text-[#ededed]/80">
                  AI Domination
                </span>
              </div>
            </div>

            {/* Mobile Milestone Labels — stacked list below chart dots, only on mobile */}
            <div className="sm:hidden absolute bottom-0 left-0 right-0 flex justify-between px-[28px]">
              {milestones.map((m, i) => (
                <div key={i} className="flex flex-col items-center">
                  <span className="text-[10px] font-extrabold" style={{ color: m.color }}>
                    {m.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile milestone stage labels — only on mobile, below chart */}
          <div className="sm:hidden flex flex-col gap-2 mt-4 mb-4">
            {milestones.map((m, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="inline-block w-[8px] h-[8px] rounded-full flex-shrink-0" style={{ backgroundColor: m.color }} />
                <span className="text-[11px] font-extrabold" style={{ color: m.color }}>{m.label}</span>
                <span className="text-[11px] font-medium text-[#ededed]/70">{m.stage}</span>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="h-[1px] bg-[#2b2b2b] blur-[4px] my-6 sm:my-8" />

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="rounded-[20px] sm:rounded-[30px] bg-[#0d0d0d] shadow-[inset_0px_4px_7px_rgba(237,237,237,0.15)] p-4 sm:p-6 flex flex-col items-center gap-[8px] sm:gap-[10px]"
              >
                <img
                  src={stat.icon}
                  alt=""
                  className="w-[40px] h-[40px] sm:w-[48px] sm:h-[48px] lg:w-[55px] lg:h-[55px] object-contain"
                />
                <div className="text-center">
                  <span className="text-[22px] sm:text-[26px] lg:text-[32px] font-semibold text-[#ededed]/90 block">
                    {stat.value}
                  </span>
                  <span className="text-[11px] sm:text-[12px] lg:text-[14px] font-medium text-[#ededed]/90">
                    {stat.label}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="flex justify-center mb-6 sm:mb-8">
            <button
              className="w-full max-w-[612px] py-4 sm:py-5 px-6 sm:px-8 rounded-[30px] border border-[#fd2d15]/15 bg-[#fd2d15]/5 
                flex items-center justify-center gap-2 sm:gap-3 hover:bg-[#fd2d15]/10 transition-all"
              style={{
                boxShadow:
                  "inset 0px 4px 12px rgba(237, 237, 237, 0.25), 0 0 30px rgba(253, 45, 21, 0.15)",
              }}
            >
              <span className="text-[16px] sm:text-[20px] lg:text-[24px] font-semibold text-[#fd2d15]/90">
                Get Your Free AI Visibility Score
              </span>
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" className="flex-shrink-0">
                <path
                  d="M4 10H16M16 10L10 4M16 10L10 16"
                  stroke="rgba(253, 45, 21, 0.90)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 lg:gap-[72px]">
            <div className="flex items-center gap-2">
              <svg width="19" height="19" viewBox="0 0 19 19" fill="none">
                <circle
                  cx="9.5"
                  cy="9.5"
                  r="8.5"
                  stroke="#EF2B15"
                  strokeWidth="1.5"
                />
                <path
                  d="M9.5 4.5V9.5L12.5 12.5"
                  stroke="#EF2B15"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              <span className="text-[13px] sm:text-[15px] lg:text-[18px] font-normal text-[#ededed]/80">
                Setup in 5 minutes
              </span>
            </div>
            <div className="flex items-center gap-2">
              <svg width="19" height="19" viewBox="0 0 19 19" fill="none">
                <circle
                  cx="9.5"
                  cy="9.5"
                  r="8.5"
                  stroke="#EF2B15"
                  strokeWidth="1.5"
                />
                <path
                  d="M6.5 9.5L8.5 11.5L12.5 7.5"
                  stroke="#EF2B15"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-[13px] sm:text-[15px] lg:text-[18px] font-normal text-[#ededed]/80">
                No technical skills needed
              </span>
            </div>
            <div className="flex items-center gap-2">
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <circle
                  cx="7.5"
                  cy="7.5"
                  r="6.5"
                  stroke="#EF2B15"
                  strokeWidth="1.5"
                />
                <path
                  d="M5 5L10 10M10 5L5 10"
                  stroke="#EF2B15"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              <span className="text-[13px] sm:text-[15px] lg:text-[18px] font-normal text-[#ededed]/80">
                Cancel anytime
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Divider line */}
      <div className="mt-8 flex justify-center">
        <div className="w-[90%] sm:w-[681px] max-w-[681px] h-[2px] bg-[#2b2b2b] blur-[4px]" />
      </div>
    </section>
  );
}