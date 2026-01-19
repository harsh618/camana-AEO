import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Search, Wrench, Settings, LineChart, Crown } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

const chartData = [
  { week: 'W0', withPlatform: 0, baseline: 8 },
  { week: 'W1', withPlatform: 8, baseline: 8, label: 'Discovery' },
  { week: 'W2', withPlatform: 15, baseline: 8 },
  { week: 'W3', withPlatform: 25, baseline: 8, label: 'Foundation' },
  { week: 'W4', withPlatform: 38, baseline: 8 },
  { week: 'W5', withPlatform: 55, baseline: 8, label: 'Optimization' },
  { week: 'W6', withPlatform: 68, baseline: 8 },
  { week: 'W7', withPlatform: 80, baseline: 8 },
  { week: 'W8', withPlatform: 95, baseline: 8, label: 'Expansion' },
  { week: 'W9', withPlatform: 120, baseline: 8 },
  { week: 'W10', withPlatform: 150, baseline: 8 },
  { week: 'W11', withPlatform: 180, baseline: 8, label: 'Dominance' },
  { week: 'W12', withPlatform: 180, baseline: 8 },
];

const milestones = [
  { week: 1, label: 'Discovery', visibility: '8%', icon: Search, color: 'bg-blue-100 text-blue-600' },
  { week: 3, label: 'Foundation', visibility: '25%', icon: Wrench, color: 'bg-red-100 text-red-600' },
  { week: 5, label: 'Optimization', visibility: '55%', icon: Settings, color: 'bg-purple-100 text-purple-600' },
  { week: 8, label: 'Expansion', visibility: '95%', icon: LineChart, color: 'bg-orange-100 text-orange-600' },
  { week: 11, label: 'Dominance', visibility: '180%', icon: Crown, color: 'bg-amber-100 text-amber-600' },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0]?.payload;
    return (
      <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-4">
        <p className="font-semibold text-gray-900 mb-2">{label}</p>
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm">
            <div className="w-3 h-3 rounded-full bg-gray-300" />
            <span className="text-gray-600">Without Optimization:</span>
            <span className="font-semibold text-gray-900">{data?.baseline}%</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="w-3 h-3 rounded-full bg-red-600" />
            <span className="text-gray-600">With Our Platform:</span>
            <span className="font-semibold text-red-600">{data?.withPlatform}%</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default function TractionSection() {
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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-100 mb-6">
            <TrendingUp className="w-4 h-4 text-red-600" />
            <span className="text-sm text-red-600 font-medium">Traction & Performance</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            The "Hockey Stick"
            <span className="bg-gradient-to-r from-red-600 to-slate-500 bg-clip-text text-transparent"> is Real.</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We consistently deliver exponential visibility growth within one quarter.
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
              <h3 className="text-xl font-bold text-gray-900">AI Visibility Growth Trajectory</h3>
              <p className="text-gray-500 text-sm">Your journey to AI search dominance</p>
            </div>
            <div className="flex items-center gap-6 mt-4 md:mt-0">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-600" />
                <span className="text-sm text-gray-700">With Our Platform</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gray-300" />
                <span className="text-sm text-gray-700">Without Optimization</span>
              </div>
            </div>
          </div>
          
          {/* Chart */}
          <div className="relative h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="platformGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                <XAxis 
                  dataKey="week" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                  tickFormatter={(value) => `${value}%`}
                  domain={[0, 200]}
                  ticks={[0, 50, 100, 150, 200]}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="baseline" 
                  stroke="#d1d5db" 
                  strokeWidth={2} 
                  strokeDasharray="5 5"
                  fill="none" 
                />
                <Area 
                  type="monotone" 
                  dataKey="withPlatform" 
                  stroke="#8b5cf6" 
                  strokeWidth={3} 
                  fill="url(#platformGradient)"
                  dot={(props) => {
                    const { cx, cy, payload } = props;
                    if (payload.label) {
                      return (
                        <circle cx={cx} cy={cy} r={6} fill="#8b5cf6" stroke="#fff" strokeWidth={2} />
                      );
                    }
                    return null;
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
            
            {/* Callout badge */}
            <div className="absolute top-4 right-4 md:right-20">
              <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-4 py-2 rounded-lg shadow-lg">
                <span className="text-sm font-semibold">Average 180% visibility increase in 90 days</span>
              </div>
            </div>
          </div>
          
          {/* Milestone cards */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8 pt-8 border-t border-gray-100">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="text-center"
              >
                <div className={`w-12 h-12 rounded-xl ${milestone.color} flex items-center justify-center mx-auto mb-3`}>
                  <milestone.icon className="w-6 h-6" />
                </div>
                <p className="text-xs text-gray-500 mb-1">Week {milestone.week}</p>
                <p className="font-semibold text-gray-900 mb-1">{milestone.label}</p>
                <p className="text-2xl font-bold text-red-600">{milestone.visibility}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
