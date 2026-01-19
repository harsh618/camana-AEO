import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { TrendingUp, Users, Target, DollarSign, Zap } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { ChatGPTLogo, GeminiLogo, PerplexityLogo, ClaudeLogo, CopilotLogo } from "@/components/icons/AILogos";

const graphData = [
  { year: '2023', chatgpt: 100, gemini: 20, perplexity: 10, claude: 5, copilot: 15 },
  { year: 'Q2 2023', chatgpt: 120, gemini: 30, perplexity: 15, claude: 8, copilot: 25 },
  { year: 'Q3 2023', chatgpt: 150, gemini: 50, perplexity: 25, claude: 12, copilot: 40 },
  { year: 'Q4 2023', chatgpt: 200, gemini: 80, perplexity: 40, claude: 20, copilot: 60 },
  { year: '2024', chatgpt: 300, gemini: 150, perplexity: 80, claude: 40, copilot: 100 },
  { year: 'Q2 2024', chatgpt: 450, gemini: 250, perplexity: 150, claude: 80, copilot: 180 },
  { year: 'Q3 2024', chatgpt: 600, gemini: 400, perplexity: 250, claude: 150, copilot: 300 },
  { year: 'Q4 2024', chatgpt: 750, gemini: 550, perplexity: 400, claude: 250, copilot: 450 },
  { year: '2025', chatgpt: 900, gemini: 700, perplexity: 600, claude: 400, copilot: 600 },
  { year: '2026', chatgpt: 1100, gemini: 900, perplexity: 800, claude: 600, copilot: 800 },
];

const stats = [
  { icon: TrendingUp, value: '65%', label: 'of professionals use AI search weekly', color: 'from-red-500 to-red-600' },
  { icon: Target, value: '3x', label: 'higher intent than traditional search', color: 'from-slate-800 to-slate-900' },
  { icon: DollarSign, value: '2.1x', label: 'better conversion from AI traffic', color: 'from-red-600 to-red-700' },
  { icon: Zap, value: '40%', label: 'month-over-month growth', color: 'from-slate-900 to-black' },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/95 backdrop-blur-xl rounded-xl border border-slate-200 shadow-xl p-4">
        <p className="font-semibold text-slate-800 mb-2">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-slate-600">{entry.name}:</span>
            <span className="font-medium text-slate-800">{entry.value}M users</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function GrowthGraphSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [animatedStats, setAnimatedStats] = useState(stats.map(() => 0));

  useEffect(() => {
    if (isInView) {
      stats.forEach((stat, index) => {
        const target = parseFloat(stat.value);
        const duration = 2000;
        const steps = 60;
        const increment = target / steps;
        let current = 0;

        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          setAnimatedStats(prev => {
            const newStats = [...prev];
            newStats[index] = current;
            return newStats;
          });
        }, duration / steps);
      });
    }
  }, [isInView]);

  return (
    <section ref={ref} className="py-24 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(253,45,21,0.05),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(0,0,0,0.05),transparent_50%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 text-red-600 text-sm font-medium mb-6">
            <TrendingUp className="w-4 h-4" />
            Market Growth
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
            The AI Search Revolution Is Here.{' '}
            <span className="bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
              Is Your Brand Ready?
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Over 1.5 billion people now search with AI platforms. Don't let your competitors capture this traffic while you're invisible.
          </p>
        </motion.div>

        {/* Graph Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-6 sm:p-8 mb-12"
        >
          {/* Graph Header */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-8">
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
              {[
                { name: 'ChatGPT', icon: ChatGPTLogo, color: '#10A37F' },
                { name: 'Gemini', icon: GeminiLogo, color: '#4E8BF5' },
                { name: 'Perplexity', icon: PerplexityLogo, color: '#222222' },
                { name: 'Claude', icon: ClaudeLogo, color: '#D97757' },
                { name: 'Copilot', icon: CopilotLogo, color: '#EC4899' },
              ].map((platform) => (
                <div key={platform.name} className="flex items-center gap-2">
                  <platform.icon className="w-5 h-5" />
                  <span className="text-sm font-medium text-slate-600">{platform.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Chart */}
          <div className="h-80 sm:h-96">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={graphData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorChatgpt" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10A37F" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#10A37F" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorGemini" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4E8BF5" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#4E8BF5" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorPerplexity" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#222222" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#222222" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorClaude" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D97757" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#D97757" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorCopilot" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EC4899" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#EC4899" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                <XAxis dataKey="year" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94A3B8" fontSize={12} tickFormatter={(value) => `${value}M`} tickLine={false} axisLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="chatgpt"
                  stroke="#10A37F"
                  strokeWidth={3}
                  fill="url(#colorChatgpt)"
                  dot={(props) => {
                    if (props.index === graphData.length - 1) {
                      return (
                        <foreignObject x={props.cx - 12} y={props.cy - 12} width={24} height={24}>
                          <ChatGPTLogo className="w-full h-full" />
                        </foreignObject>
                      );
                    }
                    return <></>;
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="gemini"
                  stroke="#4E8BF5"
                  strokeWidth={3}
                  fill="url(#colorGemini)"
                  dot={(props) => {
                    if (props.index === graphData.length - 1) {
                      return (
                        <foreignObject x={props.cx - 12} y={props.cy - 12} width={24} height={24}>
                          <GeminiLogo className="w-full h-full" />
                        </foreignObject>
                      );
                    }
                    return <></>;
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="copilot"
                  stroke="#EC4899"
                  strokeWidth={3}
                  fill="url(#colorCopilot)"
                  dot={(props) => {
                    if (props.index === graphData.length - 1) {
                      return (
                        <foreignObject x={props.cx - 12} y={props.cy - 12} width={24} height={24}>
                          <CopilotLogo className="w-full h-full" />
                        </foreignObject>
                      );
                    }
                    return <></>;
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="perplexity"
                  stroke="#222222"
                  strokeWidth={3}
                  fill="url(#colorPerplexity)"
                  dot={(props) => {
                    if (props.index === graphData.length - 1) {
                      return (
                        <foreignObject x={props.cx - 12} y={props.cy - 12} width={24} height={24}>
                          <PerplexityLogo className="w-full h-full" />
                        </foreignObject>
                      );
                    }
                    return <></>;
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="claude"
                  stroke="#D97757"
                  strokeWidth={3}
                  fill="url(#colorClaude)"
                  dot={(props) => {
                    if (props.index === graphData.length - 1) {
                      return (
                        <foreignObject x={props.cx - 12} y={props.cy - 12} width={24} height={24}>
                          <ClaudeLogo className="w-full h-full" />
                        </foreignObject>
                      );
                    }
                    return <></>;
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Total Callout */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="mt-6 inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-gradient-to-r from-red-600 to-red-500 text-white"
          >
            <Users className="w-5 h-5" />
            <span className="font-semibold">Total: 1.5B+ people now search with AI</span>
          </motion.div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg shadow-slate-100 border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
                  {stat.value.includes('%') || stat.value.includes('x')
                    ? stat.value
                    : `${animatedStats[index].toFixed(0)}%`
                  }
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="text-center"
        >
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg rounded-xl shadow-lg shadow-red-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-red-500/30"
          >
            Don't Get Left Behind - Start Tracking Now
          </Button>
        </motion.div>
      </div>
    </section>
  );
}