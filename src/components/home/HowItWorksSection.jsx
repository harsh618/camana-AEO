import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, ReferenceDot } from 'recharts';
import { Button } from "@/components/ui/button";
import { Search, Wrench, Settings, TrendingUp, Crown, Zap, BarChart3, Target, DollarSign, CheckCircle2 } from 'lucide-react';

const milestones = [
  {
    week: 0,
    visibility: 8,
    stage: 'Discovery & Baseline',
    color: '#EF4444', // Red-500
    details: [
      'Complete AI visibility audit',
      'Identify citation gaps',
      'Benchmark competitors'
    ]
  },
  {
    week: 2,
    visibility: 33,
    stage: 'Technical Foundation',
    color: '#F97316', // Orange-500
    details: [
      'Deploy llms.txt & robots.txt',
      'Add structured data',
      'Fix technical blockers'
    ]
  },
  {
    week: 4,
    visibility: 63,
    stage: 'Content Optimization',
    color: '#EAB308', // Yellow-500
    details: [
      'Transform content for AI',
      'Create answer-worthy formats',
      'Build topical authority'
    ]
  },
  {
    week: 7,
    visibility: 93,
    stage: 'Citation Strategy',
    color: '#3B82F6', // Blue-500
    details: [
      'Earn high-authority citations',
      'Target new prompt categories',
      'Amplify brand signals'
    ]
  },
  {
    week: 10,
    visibility: 180,
    stage: 'AI Domination',
    color: '#22C55E', // Green-500
    details: [
      'Real-time tracking across 4+ AI engines',
      'Instant technical recommendations',
      'Competitor gap analysis',
      'Citation opportunity alerts'
    ]
  }
];

const graphData = Array.from({ length: 12 }, (_, i) => {
  const week = i; // 0 to 11
  let withOptimization = 8;

  // Interpolate between milestones
  if (week <= 2) {
    const t = week / 2;
    withOptimization = 8 + (33 - 8) * t;
  } else if (week <= 4) {
    const t = (week - 2) / 2;
    withOptimization = 33 + (63 - 33) * t;
  } else if (week <= 7) {
    const t = (week - 4) / 3;
    withOptimization = 63 + (93 - 63) * t;
  } else if (week <= 10) {
    const t = (week - 7) / 3;
    withOptimization = 93 + (180 - 93) * t;
  } else {
    // Week 11+
    withOptimization = 180 + (week - 10) * 15;
  }

  const milestone = milestones.find(m => m.week === week);

  return {
    week: week === 0 ? 'Start' : `Week ${week}`,
    weekNum: week,
    withOptimization: Math.round(withOptimization),
    withoutOptimization: 8 + week * 0.5, // Slight baseline growth
    milestone: milestone ? milestone.stage : null,
    milestoneData: milestone
  };
});

const CustomDot = (props) => {
  const { cx, cy, payload } = props;
  if (!payload.milestoneData) return null;
  const color = payload.milestoneData.color;

  return (
    <g>
      <circle cx={cx} cy={cy} r={14} fill={color} opacity={0.2} />
      <circle cx={cx} cy={cy} r={8} fill={color} stroke="white" strokeWidth={3} />
    </g>
  );
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    if (data.milestoneData) {
      const m = data.milestoneData;
      return (
        <div className="bg-white text-slate-900 rounded-xl border border-slate-200 shadow-xl p-5 w-72">
          {/* Title */}
          <h4 className="font-bold text-lg text-slate-900 mb-4">{m.stage}</h4>

          {/* Checklist */}
          <div className="space-y-3">
            {m.details.map((detail, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-red-500 flex-shrink-0" />
                <span className="text-sm text-slate-600 leading-tight">{detail}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // Default Tooltip for non-milestone points
    return (
      <div className="bg-white rounded-lg border border-slate-200 shadow-xl p-3 text-sm">
        <p className="font-semibold text-slate-800 mb-1">{label}</p>
        <div className="flex items-center gap-2">
          <span className="text-slate-600">Visibility Score:</span>
          <span className="font-bold text-slate-900">{data.withOptimization}%</span>
        </div>
      </div>
    );
  }
  return null;
};

const stats = [
  { icon: Zap, label: 'Time to First Citation', value: '18 days', sublabel: 'average' },
  { icon: BarChart3, label: '90-Day Growth', value: '180%', sublabel: 'visibility increase' },
  { icon: Target, label: 'Citation Rate', value: '2.5x', sublabel: 'vs competitors' },
  { icon: DollarSign, label: 'Traffic Quality', value: '2.1x', sublabel: 'better conversion' },
];

export default function HowItWorksSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="how-it-works" ref={ref} className="py-24 bg-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(220,38,38,0.03),transparent_70%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-20"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 text-red-600 text-sm font-medium mb-6">
            <Settings className="w-4 h-4" />
            Our Process
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
            Growth Trajectory
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            From baseline discovery to total domination. <span className="font-medium text-red-600">Every step is AI-Enhanced.</span>
          </p>
        </motion.div>

        {/* Graph Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-6 sm:p-12 mb-16 relative overflow-hidden"
        >
          {/* Graph Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-12 relative z-10">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Visibility Score</h3>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-1 bg-gradient-to-r from-red-500 to-red-400 rounded-full" />
                  <span className="text-sm font-medium text-slate-600">With Our Platform</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-1 bg-slate-200 border-t border-dashed border-slate-300 rounded-full" />
                  <span className="text-sm font-medium text-slate-400">Without Optimization</span>
                </div>
              </div>
            </div>

            <div className="px-4 py-2 rounded-lg bg-red-50 border border-red-100 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-red-600" />
              <span className="text-red-700 text-sm font-medium">Avg time to first citation: 18 days</span>
            </div>
          </div>

          {/* Chart */}
          <div className="h-[450px] w-full relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={graphData} margin={{ top: 80, right: 60, left: 60, bottom: 40 }}>
                <defs>
                  <linearGradient id="colorOptimized" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#EF4444" />
                    <stop offset="30%" stopColor="#F97316" />
                    <stop offset="60%" stopColor="#EAB308" />
                    <stop offset="100%" stopColor="#22C55E" />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis
                  dataKey="week"
                  stroke="#94a3b8"
                  fontSize={12}
                  axisLine={false}
                  tickLine={false}
                  dy={10}
                />
                <YAxis
                  stroke="#94a3b8"
                  fontSize={12}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value) => `${value}`}
                />
                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{ stroke: '#cbd5e1', strokeWidth: 2 }}
                />

                {/* Baseline Line */}
                <Line
                  type="monotone"
                  dataKey="withoutOptimization"
                  stroke="#cbd5e1"
                  strokeWidth={2}
                  strokeDasharray="6 6"
                  dot={false}
                  activeDot={false}
                />

                {/* Growth Line */}
                <Line
                  type="monotone"
                  dataKey="withOptimization"
                  stroke="url(#colorOptimized)"
                  strokeWidth={5}
                  dot={<CustomDot />}
                  activeDot={{ r: 8, fill: 'white', strokeWidth: 0 }}
                  animationDuration={2000}
                  label={(props) => {
                    const { x, y, index } = props;
                    const data = graphData[index];
                    const m = data?.milestoneData;
                    if (!m) return null;

                    return (
                      <g key={`label-${index}`}>
                        {/* Stage Name Above Dot */}
                        <text
                          x={x}
                          y={y - 35}
                          fill="#64748b"
                          fontSize={12}
                          fontWeight={600}
                          textAnchor="middle"
                          dominantBaseline="auto"
                        >
                          {m.stage}
                        </text>
                        {/* Percentage Badge Below Dot */}
                        <g transform={`translate(${x},${y + 30})`}>
                          <rect x={-22} y={-10} width={44} height={20} rx={10} fill={m.color} />
                          <text x={0} y={5} fill="white" fontSize={11} fontWeight={700} textAnchor="middle">{m.visibility}%</text>
                        </g>
                      </g>
                    );
                  }}
                />

              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* KPI Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg shadow-slate-100 border border-slate-100 text-center hover:shadow-xl transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center mx-auto mb-4 text-red-600">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</div>
                <div className="text-sm font-medium text-slate-900 mb-1">{stat.label}</div>
                <div className="text-xs text-slate-500">{stat.sublabel}</div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center"
        >
          <div className="inline-block bg-gradient-to-r from-red-50 to-orange-50 rounded-3xl p-8 border border-red-100">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Ready to Start Your Growth Journey?</h3>
            <p className="text-slate-600 mb-6">See your current score, benchmark vs competitors, get custom roadmap</p>
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg rounded-xl shadow-lg shadow-red-500/25"
            >
              Get Your Free AI Visibility Report
            </Button>
            <div className="flex justify-center gap-6 mt-4 text-sm text-slate-500">
              <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-green-500" /> See your current score</span>
              <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-green-500" /> Benchmark vs competitors</span>
              <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-green-500" /> Get custom roadmap</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}