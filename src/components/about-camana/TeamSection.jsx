import React from 'react';
import { motion } from 'framer-motion';
import { Users, Lightbulb, Settings, TrendingUp } from 'lucide-react';

const team = [
  {
    name: 'Vijay Singh',
    role: 'Founder & CEO',
    description: 'Founder of Camana Homes with deep domain expertise in Search technology and Real Estate tech.',
    why: 'Built Camana Technologies to solve the specific "AI Discovery" problem he faced in his own ventures.',
    superpower: 'Product Strategy & Market Penetration',
    icon: Lightbulb,
    color: 'red'
  },
  {
    name: 'Madhur Sinha',
    role: 'Chief Operating Officer',
    description: 'Founder of Camana Homes. Responsible for turning our proprietary "Optimization Cycle" into a scalable operational machine.',
    focus: 'Overseeing the delivery pipeline, customer success infrastructure, and agency partnerships.',
    superpower: 'Operational Efficiency & Scaling Teams',
    icon: Settings,
    color: 'slate'
  },
  {
    name: 'Simerpreet Singh',
    role: 'Chief Financial Officer',
    description: 'Managing capital allocation to ensure unit economics remain healthy as we scale from $0 to $2M ARR.',
    focus: 'Financial modeling, fundraising strategy, and SaaS metric optimization (CAC/LTV).',
    superpower: 'Financial Discipline & Growth Modeling',
    icon: TrendingUp,
    color: 'emerald'
  }
];

const colorClasses = {
  red: { bg: 'bg-red-100', text: 'text-red-600', border: 'border-red-200' },
  slate: { bg: 'bg-slate-100', text: 'text-slate-600', border: 'border-slate-200' },
  emerald: { bg: 'bg-emerald-100', text: 'text-emerald-600', border: 'border-emerald-200' }
};

export default function TeamSection() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-100 mb-6">
            <Users className="w-4 h-4 text-red-600" />
            <span className="text-sm text-red-600 font-medium">The Team</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            A C-Suite
            <span className="bg-gradient-to-r from-red-600 to-slate-500 bg-clip-text text-transparent"> Built for Scale.</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Deep expertise in AI Search, SaaS Operations, and Financial Strategy.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {team.map((member, index) => {
            const colors = colorClasses[member.color];
            return (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="group"
              >
                <div className="relative bg-white rounded-2xl border border-gray-200 p-8 h-full hover:shadow-lg transition-all duration-300">
                  {/* Avatar */}
                  <div className="mb-6">
                    <div className={`w-20 h-20 rounded-2xl ${colors.bg} flex items-center justify-center`}>
                      <member.icon className={`w-8 h-8 ${colors.text}`} />
                    </div>
                  </div>
                  
                  {/* Info */}
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className={`text-sm font-medium ${colors.text} mb-4`}>
                    {member.role}
                  </p>
                  
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {member.description}
                  </p>
                  
                  {member.why && (
                    <div className="mb-4 p-4 bg-gray-50 rounded-xl">
                      <span className="text-xs text-gray-500 uppercase tracking-widest">The "Why"</span>
                      <p className="text-gray-700 text-sm mt-1">{member.why}</p>
                    </div>
                  )}
                  
                  {member.focus && (
                    <div className="mb-4 p-4 bg-gray-50 rounded-xl">
                      <span className="text-xs text-gray-500 uppercase tracking-widest">The Focus</span>
                      <p className="text-gray-700 text-sm mt-1">{member.focus}</p>
                    </div>
                  )}
                  
                  <div className="pt-4 border-t border-gray-100">
                    <span className="text-xs text-gray-500 uppercase tracking-widest">Superpower</span>
                    <p className={`text-sm font-semibold ${colors.text} mt-1`}>
                      {member.superpower}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
