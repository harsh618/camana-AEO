import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Handshake, CheckCircle } from 'lucide-react';

const tiers = [
  {
    name: 'Starter',
    price: '$99',
    period: '/mo',
    description: 'For SMBs',
    features: ['Basic visibility tracking', 'Single platform monitoring', 'Monthly reports'],
    highlight: false
  },
  {
    name: 'Growth',
    price: '$299',
    period: '/mo',
    description: 'For high-growth startups',
    tag: 'Core Driver',
    features: ['Competitor Intelligence', 'Advanced AEO Audits', 'Multi-platform tracking', 'Weekly optimization tips', 'Priority support'],
    highlight: true
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For Agencies',
    features: ['API access', 'White-Label Reporting', 'Dedicated success manager', 'Custom integrations', 'SLA guarantee'],
    highlight: false
  }
];

export default function BusinessModelSection() {
  return (
    <section id="pricing" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-100 mb-6">
            <Layers className="w-4 h-4 text-violet-600" />
            <span className="text-sm text-violet-600 font-medium">Business Model</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Scalable SaaS with
            <br />
            <span className="bg-gradient-to-r from-violet-600 to-cyan-500 bg-clip-text text-transparent">"Land & Expand"</span> Potential.
          </h2>
        </motion.div>
        
        {/* Pricing Tiers */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative rounded-2xl ${
                tier.highlight 
                  ? 'bg-gradient-to-b from-violet-50 to-white border-2 border-violet-300 shadow-lg' 
                  : 'bg-white border border-gray-200'
              } p-8`}
            >
              {tier.tag && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white text-xs font-semibold rounded-full">
                    {tier.tag}
                  </span>
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{tier.name}</h3>
                <p className="text-gray-500 text-sm mb-4">{tier.description}</p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold text-gray-900">{tier.price}</span>
                  <span className="text-gray-500">{tier.period}</span>
                </div>
              </div>
              
              <ul className="space-y-3">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle className={`w-5 h-5 flex-shrink-0 ${tier.highlight ? 'text-violet-600' : 'text-gray-400'}`} />
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
        
        {/* Agency Partnership */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="bg-gradient-to-r from-violet-50 via-fuchsia-50 to-cyan-50 rounded-2xl border border-violet-200 p-8 md:p-12"
        >
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-20 h-20 rounded-2xl bg-violet-100 flex items-center justify-center flex-shrink-0">
              <Handshake className="w-10 h-10 text-violet-600" />
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Agency Partnership Strategy</h3>
              <p className="text-gray-600 leading-relaxed">
                We enable marketing agencies to sell "AI SEO Services" using our white-label reports, 
                creating a <span className="text-violet-600 font-semibold">B2B2B viral loop</span>.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}