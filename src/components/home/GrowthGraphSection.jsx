import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
// @ts-ignore
import marketGrowthIcon from '../../assets/icons/market-growth.svg';

const graphData = [
  { year: "2023", chatgpt: 100, gemini: 20, perplexity: 10, claude: 5 },
  { year: "Q2 2023", chatgpt: 180, gemini: 40, perplexity: 20, claude: 12 },
  { year: "Q3 2023", chatgpt: 280, gemini: 80, perplexity: 40, claude: 25 },
  { year: "Q4 2023", chatgpt: 400, gemini: 150, perplexity: 80, claude: 50 },
  { year: "2024", chatgpt: 550, gemini: 280, perplexity: 150, claude: 100 },
  { year: "Q2 2024", chatgpt: 700, gemini: 420, perplexity: 280, claude: 180 },
  { year: "Q3 2024", chatgpt: 850, gemini: 580, perplexity: 420, claude: 300 },
  { year: "Q4 2024", chatgpt: 980, gemini: 720, perplexity: 560, claude: 450 },
  { year: "2025", chatgpt: 1100, gemini: 880, perplexity: 720, claude: 600 },
  { year: "2026", chatgpt: 1200, gemini: 950, perplexity: 800, claude: 680 },
];

// Simplified data for mobile/tablet - yearly only
const graphDataSimplified = [
  { year: "2023", chatgpt: 100, gemini: 20, perplexity: 10, claude: 5 },
  { year: "2024", chatgpt: 550, gemini: 280, perplexity: 150, claude: 100 },
  { year: "2025", chatgpt: 1100, gemini: 880, perplexity: 720, claude: 600 },
  { year: "2026", chatgpt: 1200, gemini: 950, perplexity: 800, claude: 680 },
];

const stats = [
  {
    icon: "/icons/lightning.svg",
    value: "40%",
    label: "month-over-month growth",
  },
  {
    icon: "/icons/money-growth.png",
    value: "2.1x",
    label: "better conversion from AI traffic",
  },
  {
    icon: "/icons/radar.png",
    value: "3x",
    label: "higher intent than traditional search",
  },
  {
    icon: "/icons/chart-up.png",
    value: "65%",
    label: "of professionals use AI search weekly",
  },
];

const logo = [
  { name: "marketGrowth", logo: marketGrowthIcon  },
];

// ─── PNG LOGO COMPONENTS (for ChatGPT & Gemini) ──────────────────────────────
// ChatGPT icon needs larger size to match others
const ChatGPTIcon = ({ size = 16 }) => (
  <img
    src="/logos/chatgpt_w_bg.png"
    alt="ChatGPT"
    style={{ width: size * 1.5, height: size * 1.5, objectFit: "contain" }}
  />
);

// Gemini icon needs larger size to match others
const GeminiIcon = ({ size = 16 }) => (
  <img
    src="/logos/gemini.png"
    alt="Gemini"
    style={{ width: size * 1.6, height: size * 1.6, objectFit: "contain" }}
  />
);

const PerplexityIcon = ({ size = 16 }) => (
  <img
    src="/logos/perplexity-icon_bg.png"
    alt="Gemini"
    style={{ width: size * 1.5, height: size * 1.5, objectFit: "contain" }}
  />
);

const ClaudeIcon = ({ size = 16 }) => (
  <img
    src="/logos/claude.png"
    alt="Claude"
    style={{ width: size * 1.6, height: size * 1.6, objectFit: "contain" }}
  />
);

// ─── CONFIG ───────────────────────────────────────────────────────────────────

const platformsConfig = {
  chatgpt: {
    label: "ChatGPT",
    color: "#10A37F",
    Icon: ChatGPTIcon,
    endIconSize: 28, // Larger for ChatGPT
  },
  gemini: {
    label: "Gemini",
    color: "#4285F4",
    Icon: GeminiIcon,
    endIconSize: 28, // Larger for Gemini
  },
  perplexity: {
    label: "Perplexity",
    color: "#1a7f64",
    Icon: PerplexityIcon,
    endIconSize: 18, // Standard for Perplexity
  },
  claude: {
    label: "Claude",
    color: "#D97757",
    Icon: ClaudeIcon,
    endIconSize: 28, // Slightly larger for Claude
  },
};

const platformKeys = Object.keys(platformsConfig);

// ─── CUSTOM TOOLTIP ───────────────────────────────────────────────────────────

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;
  return (
    <div
      style={{
        background: "rgba(20,20,20,0.95)",
        border: "1px solid rgba(237,237,237,0.15)",
        borderRadius: "12px",
        padding: "12px 16px",
        backdropFilter: "blur(8px)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
        minWidth: "160px",
      }}
    >
      <div
        style={{
          color: "#ededed",
          fontSize: "14px",
          fontWeight: 600,
          marginBottom: "10px",
        }}
      >
        {label}
      </div>
      {platformKeys.map((key) => {
        const entry = payload.find((p) => p.dataKey === key);
        const { Icon } = platformsConfig[key];
        return (
          <div
            key={key}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "6px",
            }}
          >
            <Icon size={14} />
            <span style={{ color: "#ededed", fontSize: "13px" }}>
              {entry ? `${entry.value}M users` : "—"}
            </span>
          </div>
        );
      })}
    </div>
  );
};

// ─── END-OF-LINE ICON (last point only, no circle) ──────────────────────────────────────

const EndDot = ({ cx, cy, dataKey, index, data }) => {
  if (index !== data.length - 1) return null;
  const { Icon, endIconSize } = platformsConfig[dataKey];

  return (
    <g>
      <foreignObject
        x={cx - endIconSize / 2}
        y={cy - endIconSize / 2}
        width={endIconSize}
        height={endIconSize}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <Icon size={endIconSize} />
        </div>
      </foreignObject>
    </g>
  );
};

// ─── MAIN ─────────────────────────────────────────────────────────────────────

export default function GrowthGraphSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="py-6 sm:py-8 lg:py-16 bg-black relative overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[120px]">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="flex justify-center mb-4 sm:mb-5 lg:mb-6"
        >
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-[30px] border border-[#ef2b15] bg-[#fd2d15]/10">
            <motion.img
              src={logo[0].logo}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="h-[10px] sm:h-[15px] lg:h-[20px] object-contain"
            />
            <span className="text-[14px] sm:text-[16px] lg:text-[18px] font-semibold text-[#ef2b15]/80">
              Market Growth
            </span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="text-center mb-4 sm:mb-5 lg:mb-6"
        >
          <h2 className="text-[32px] sm:text-[48px] lg:text-[64px] font-semibold text-white leading-[1.1] px-2">
            The AI search revolution is here
            <br />
            <span className="text-[#ef2b15]">Is your brand ready?</span>
          </h2>
        </motion.div>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="text-[14px] sm:text-[16px] lg:text-[18px] font-medium text-[#ededed]/90 text-center max-w-[500px] sm:max-w-[600px] lg:max-w-[677px] mx-auto mb-6 sm:mb-8 lg:mb-10 px-2"
        >
          Over 1.5 billion people now search with AI platforms. Don't let your
          competitors capture this traffic while you're invisible.
        </motion.p>

        {/* Chart Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="rounded-[30px] sm:rounded-[40px] lg:rounded-[50px] border border-[#ededed]/15 bg-[#b0b0b0]/5 shadow-[0px_4px_4px_rgba(255,255,255,0.06)] p-4 sm:p-6 lg:p-10 mb-6 sm:mb-7 lg:mb-8"
        >
          {/* Legend — icons only on mobile/tablet with equal spacing, icons + labels on desktop */}
          <div className="flex flex-wrap items-start justify-start lg:justify-start gap-2 sm:gap-5 lg:gap-7 mb-6 sm:mb-7 lg:mb-8">
            {platformKeys.map((key) => {
              const { label, Icon } = platformsConfig[key];
              return (
                <div key={key} className="flex items-center gap-2">
                  <Icon size={18} />
                  <span className="hidden lg:inline text-[15px] sm:text-[16px] lg:text-[17px] font-semibold text-[#ededed]">
                    {label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Chart - Desktop shows full data, Mobile/Tablet shows simplified yearly data */}
          <div className="h-[250px] sm:h-[300px] lg:h-[350px] relative">
            <div className="absolute left-0 top-0 bottom-[40px] flex flex-col justify-between text-[11px] sm:text-[12px] lg:text-[14px] font-medium text-[#ededed]">
              <span>1200M</span>
              <span>900M</span>
              <span>600M</span>
              <span>300M</span>
              <span>0M</span>
            </div>

            {/* Desktop Chart - Full data */}
            <div className="hidden lg:block ml-8 sm:ml-10 lg:ml-12 h-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={graphData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 30 }}
                >
                  <defs>
                    <linearGradient
                      id="chatgptGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#10A37F" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#10A37F" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient
                      id="geminiGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#4285F4" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#4285F4" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient
                      id="perplexityGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#1a7f64" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#1a7f64" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient
                      id="claudeGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#D97757" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#D97757" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="year"
                    stroke="#ededed"
                    fontSize={11}
                    tickLine={false}
                    axisLine={{ stroke: "#1e1e1e" }}
                  />
                  <YAxis hide domain={[0, 1200]} />
                  <Tooltip
                    content={
                      <CustomTooltip
                        active={undefined}
                        payload={undefined}
                        label={undefined}
                      />
                    }
                    cursor={{
                      stroke: "rgba(237,237,237,0.15)",
                      strokeWidth: 1,
                    }}
                  />

                  <Area
                    type="monotone"
                    dataKey="chatgpt"
                    stroke="#10A37F"
                    strokeWidth={2}
                    fill="url(#chatgptGradient)"
                    dot={(props) => (
                      <EndDot {...props} dataKey="chatgpt" data={graphData} />
                    )}
                    activeDot={{
                      r: 4,
                      fill: "#10A37F",
                      stroke: "#111",
                      strokeWidth: 2,
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="gemini"
                    stroke="#4285F4"
                    strokeWidth={2}
                    fill="url(#geminiGradient)"
                    dot={(props) => (
                      <EndDot {...props} dataKey="gemini" data={graphData} />
                    )}
                    activeDot={{
                      r: 4,
                      fill: "#4285F4",
                      stroke: "#111",
                      strokeWidth: 2,
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="perplexity"
                    stroke="#1a7f64"
                    strokeWidth={2}
                    fill="url(#perplexityGradient)"
                    dot={(props) => (
                      <EndDot
                        {...props}
                        dataKey="perplexity"
                        data={graphData}
                      />
                    )}
                    activeDot={{
                      r: 4,
                      fill: "#1a7f64",
                      stroke: "#111",
                      strokeWidth: 2,
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="claude"
                    stroke="#D97757"
                    strokeWidth={2}
                    fill="url(#claudeGradient)"
                    dot={(props) => (
                      <EndDot {...props} dataKey="claude" data={graphData} />
                    )}
                    activeDot={{
                      r: 4,
                      fill: "#D97757",
                      stroke: "#111",
                      strokeWidth: 2,
                    }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Mobile/Tablet Chart - Simplified yearly data */}
            <div className="block lg:hidden ml-8 sm:ml-10 lg:ml-12 h-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={graphDataSimplified}
                  margin={{ top: 10, right: 30, left: 0, bottom: 30 }}
                >
                  <defs>
                    <linearGradient
                      id="chatgptGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#10A37F" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#10A37F" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient
                      id="geminiGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#4285F4" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#4285F4" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient
                      id="perplexityGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#1a7f64" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#1a7f64" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient
                      id="claudeGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#D97757" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#D97757" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="year"
                    stroke="#ededed"
                    fontSize={11}
                    tickLine={false}
                    axisLine={{ stroke: "#1e1e1e" }}
                  />
                  <YAxis hide domain={[0, 1200]} />
                  <Tooltip
                    content={
                      <CustomTooltip
                        active={undefined}
                        payload={undefined}
                        label={undefined}
                      />
                    }
                    cursor={{
                      stroke: "rgba(237,237,237,0.15)",
                      strokeWidth: 1,
                    }}
                  />

                  <Area
                    type="monotone"
                    dataKey="chatgpt"
                    stroke="#10A37F"
                    strokeWidth={2}
                    fill="url(#chatgptGradient)"
                    dot={(props) => (
                      <EndDot
                        {...props}
                        dataKey="chatgpt"
                        data={graphDataSimplified}
                      />
                    )}
                    activeDot={{
                      r: 4,
                      fill: "#10A37F",
                      stroke: "#111",
                      strokeWidth: 2,
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="gemini"
                    stroke="#4285F4"
                    strokeWidth={2}
                    fill="url(#geminiGradient)"
                    dot={(props) => (
                      <EndDot
                        {...props}
                        dataKey="gemini"
                        data={graphDataSimplified}
                      />
                    )}
                    activeDot={{
                      r: 4,
                      fill: "#4285F4",
                      stroke: "#111",
                      strokeWidth: 2,
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="perplexity"
                    stroke="#1a7f64"
                    strokeWidth={2}
                    fill="url(#perplexityGradient)"
                    dot={(props) => (
                      <EndDot
                        {...props}
                        dataKey="perplexity"
                        data={graphDataSimplified}
                      />
                    )}
                    activeDot={{
                      r: 4,
                      fill: "#1a7f64",
                      stroke: "#111",
                      strokeWidth: 2,
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="claude"
                    stroke="#D97757"
                    strokeWidth={2}
                    fill="url(#claudeGradient)"
                    dot={(props) => (
                      <EndDot
                        {...props}
                        dataKey="claude"
                        data={graphDataSimplified}
                      />
                    )}
                    activeDot={{
                      r: 4,
                      fill: "#D97757",
                      stroke: "#111",
                      strokeWidth: 2,
                    }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Total Badge */}
          <div className="flex justify-center mt-4 sm:mt-5 lg:mt-6">
            <div className="inline-flex items-center gap-2 px-4 sm:px-5 lg:px-6 py-3 sm:py-3.5 lg:py-4 rounded-[30px] border border-black bg-[#0d0d0d] shadow-[inset_0px_4px_7px_rgba(225,225,225,0.32)]">
              <img
                src="/icons/person.svg"
                alt=""
                className="w-4 h-4 sm:w-5 sm:h-5 object-contain"
              />
              <span className="text-[13px] sm:text-[15px] lg:text-[18px] font-medium text-[#ededed]">
                Total: 1.5B+ people now search with AI
              </span>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="flex justify-center mt-4 sm:mt-5 lg:mt-6 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8 lg:mb-10">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="rounded-[20px] sm:rounded-[25px] lg:rounded-[30px] bg-[#0d0d0d] shadow-[inset_0px_4px_7px_rgba(237,237,237,0.15)] p-4 sm:p-5 lg:p-6 flex flex-col gap-[8px] sm:gap-[10px]"
              >
                <img
                  src={stat.icon}
                  alt=""
                  className="w-[40px] h-[40px] sm:w-[48px] sm:h-[48px] lg:w-[55px] lg:h-[55px] object-contain"
                />
                <div>
                  <span className="text-[24px] sm:text-[28px] lg:text-[32px] font-semibold text-[#ededed] block">
                    {stat.value}
                  </span>
                  <span className="text-[10px] sm:text-[11px] lg:text-[12px] font-medium text-[#ededed]/90">
                    {stat.label}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8 }}
            className="flex justify-center"
          >
            <button
              className="px-6 sm:px-7 lg:px-8 py-3 sm:py-3.5 lg:py-4 rounded-[30px] border border-[#fd2d15]/15 bg-[#fd2d15]/5 hover:bg-[#fd2d15]/10 transition-all"
              style={{
                boxShadow: "inset 0px 4px 8px rgba(237, 237, 237, 0.32)",
              }}
            >
              <span className="text-[14px] sm:text-[16px] lg:text-[18px] font-semibold text-[#fd2d15]/70">
                Don't Get Left Behind - Start Tracking Now
              </span>
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
