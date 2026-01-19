import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { Users } from 'lucide-react';

const chartData = [
  { period: '2023', chatgpt: 180, gemini: 20, perplexity: 5, claude: 2 },
  { period: 'Q2 2023', chatgpt: 250, gemini: 40, perplexity: 10, claude: 5 },
  { period: 'Q3 2023', chatgpt: 320, gemini: 70, perplexity: 20, claude: 10 },
  { period: 'Q4 2023', chatgpt: 400, gemini: 100, perplexity: 35, claude: 18 },
  { period: '2024', chatgpt: 480, gemini: 140, perplexity: 50, claude: 28 },
  { period: 'Q2 2024', chatgpt: 580, gemini: 180, perplexity: 70, claude: 40 },
  { period: 'Q3 2024', chatgpt: 680, gemini: 220, perplexity: 95, claude: 52 },
  { period: 'Q4 2024', chatgpt: 780, gemini: 260, perplexity: 115, claude: 65 },
  { period: '2025', chatgpt: 850, gemini: 290, perplexity: 135, claude: 72 },
  { period: '2026*', chatgpt: 950, gemini: 320, perplexity: 150, claude: 80 },
];

const platforms = [
  { key: 'chatgpt', name: 'ChatGPT', color: '#10b981', users: '950M users', logo: '/logos/chatgpt.jpg' },
  { key: 'gemini', name: 'Gemini', color: '#6366f1', users: '320M users', logo: '/logos/gemini.jpg' },
  { key: 'perplexity', name: 'Perplexity', color: '#f59e0b', users: '150M users', logo: '/logos/perplexity.jpg' },
  { key: 'claude', name: 'Claude', color: '#ec4899', users: '80M users', logo: '/logos/claude.jpg' },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-4">
        <p className="font-semibold text-gray-900 mb-2">{label}</p>
        {payload.map((entry, index) => {
          const platform = platforms.find(p => p.name === entry.name);
          return (
            <div key={index} className="flex items-center gap-2 text-sm">
              {platform?.logo ? (
                <img src={platform.logo} alt={entry.name} className="w-4 h-4 rounded-full object-cover" />
              ) : (
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
              )}
              <span className="text-gray-600">{entry.name}:</span>
              <span className="font-semibold text-gray-900">{entry.value}M users</span>
            </div>
          );
        })}
      </div>
    );
  }
  return null;
};

export default function MacroShiftSection() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="text-red-600 text-sm font-semibold tracking-widest uppercase mb-4 block">The Why Now</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            The Migration is Here.
            <br />
            <span className="bg-gradient-to-r from-red-600 to-slate-500 bg-clip-text text-transparent">1.5 Billion Users</span> Have Shifted.
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Search volume is moving from "Blue Links" to "Generative Answers" at unprecedented speed.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 md:p-8"
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Monthly Active Users by Platform</h3>
              <p className="text-gray-500 text-sm">In millions • 2023-2026 projected</p>
            </div>
            <div className="flex flex-wrap items-center gap-4 mt-4 md:mt-0">
              {platforms.map((platform) => (
                <div key={platform.key} className="flex items-center gap-2">
                  <img src={platform.logo} alt={platform.name} className="w-5 h-5 rounded-full object-cover" />
                  <span className="text-sm text-gray-700">{platform.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Chart */}
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="chatgptGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="geminiGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="perplexityGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="claudeGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ec4899" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#ec4899" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                <XAxis
                  dataKey="period"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                  tickFormatter={(value) => `${value}M`}
                  domain={[0, 1000]}
                  ticks={[0, 250, 500, 750, 1000]}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="chatgpt" name="ChatGPT" stroke="#10b981" strokeWidth={3} fill="url(#chatgptGradient)" />
                <Area type="monotone" dataKey="gemini" name="Gemini" stroke="#6366f1" strokeWidth={3} fill="url(#geminiGradient)" />
                <Area type="monotone" dataKey="perplexity" name="Perplexity" stroke="#f59e0b" strokeWidth={3} fill="url(#perplexityGradient)" />
                <Area type="monotone" dataKey="claude" name="Claude" stroke="#ec4899" strokeWidth={3} fill="url(#claudeGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Tooltip Legend Box */}
          <div className="absolute right-12 top-1/2 hidden lg:block">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4">
              <p className="font-semibold text-gray-900 mb-2">2026*</p>
              {platforms.map((platform) => (
                <div key={platform.key} className="flex items-center gap-2 text-sm py-1">
                  <img src={platform.logo} alt={platform.name} className="w-4 h-4 rounded-full object-cover" />
                  <span className="text-gray-600">{platform.name}:</span>
                  <span className="font-semibold" style={{ color: platform.color }}>{platform.users}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom callout */}
          <div className="mt-6">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-red-600 to-red-500 rounded-full text-white">
              <Users className="w-5 h-5" />
              <span className="font-semibold">Total: 1.5B+ people now search with AI</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

