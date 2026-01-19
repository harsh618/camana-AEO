import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { CheckCircle2, Star, Sparkles, Mail } from 'lucide-react';

const plans = [
  {
    name: 'Starter',
    subtitle: 'Serious Startups & Niche Brands',
    price: 99,
    period: '/month',
    features: [
      '150 Custom Prompts',
      '3 Brands + 5 Competitors',
      'Weekly Visibility Reports',
      'Basic GEO Intelligence: Track ranking in 1 Country',
      'Sentiment Analysis (Positive/Neutral/Negative)',
      '4 Platforms: ChatGPT, Gemini, Perplexity, Claude',
      'AI Content Generation',
      'Email Support'
    ],
    cta: 'Start 7 Days Free Trial',
    popular: false,
    gradient: 'from-slate-500 to-slate-600'
  },
  {
    name: 'Growth',
    subtitle: 'High-Growth Teams & Scale-ups',
    price: 199,
    period: '/month',
    features: [
      '600 Custom Prompts',
      '10 Brands + 15 Competitors',
      'Weekly Visibility Updates',
      'Advanced GEO Intelligence: Track ranking in 5 Regions',
      'Technical AEO: Schema & llms.txt generation',
      'Citation Gap Analysis: Direct competitor comparison',
      'Basic AEO Audits: Automated content recommendations',
      'AI Content Generation',
      'Priority Support (Email)'
    ],
    cta: 'Start 7 Days Free Trial',
    popular: true,
    gradient: 'from-red-600 to-red-500'
  },
  {
    name: 'Scale',
    subtitle: 'Agencies & Dominant Brands',
    price: 299,
    period: '/month',
    features: [
      '1,500 Custom Prompts',
      'Unlimited Brands + 50 Competitors',
      'Real-Time Monitoring Capability',
      'Global GEO Intelligence: Unlimited regional tracking',
      'Technical AEO: Schema & llms.txt generation',
      'White-Label Reporting: PDF exports for clients',
      'AI Content Generation',
      'Dedicated Account Manager'
    ],
    cta: 'Start 7 Days Free Trial',
    popular: false,
    gradient: 'from-slate-700 to-slate-800'
  }
];

export default function PricingSection() {
  const ref = useRef(null);
  const navigate = useNavigate();
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isAnnual, setIsAnnual] = useState(false);

  const getPrice = (basePrice) => {
    if (isAnnual) {
      return Math.round(basePrice * 0.7); // 30% discount
    }
    return basePrice;
  };

  return (
    <section id="pricing" ref={ref} className="py-24 bg-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_80%,rgba(253,45,21,0.05),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(0,0,0,0.05),transparent_50%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 text-red-600 text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Pricing
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
            Plans That Scale With{' '}
            <span className="bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
              Your Ambition
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Choose the perfect plan to dominate AI search results and grow your brand visibility.
          </p>

          {/* Monthly/Annual Toggle */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <span className={`text-sm font-medium ${!isAnnual ? 'text-slate-900' : 'text-slate-500'}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative w-14 h-7 rounded-full transition-colors ${isAnnual ? 'bg-green-500' : 'bg-slate-300'}`}
            >
              <div className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-md transition-transform ${isAnnual ? 'translate-x-7' : 'translate-x-0'}`} />
            </button>
            <span className={`text-sm font-medium ${isAnnual ? 'text-slate-900' : 'text-slate-500'}`}>
              Annual
            </span>
            {isAnnual && (
              <span className="text-sm font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">
                Save 30%
              </span>
            )}
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className={`relative ${plan.popular ? 'lg:-mt-4 lg:mb-4' : ''}`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <div className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-red-600 to-red-500 text-white text-sm font-medium shadow-lg">
                    <Star className="w-4 h-4 fill-current" />
                    Most Popular
                  </div>
                </div>
              )}

              <div className={`h-full rounded-3xl p-8 transition-all duration-300 ${plan.popular
                ? 'bg-gradient-to-b from-red-50 to-orange-50 border-2 border-red-200 shadow-xl shadow-red-500/10'
                : 'bg-white border border-slate-200 hover:border-slate-300 hover:shadow-lg'
                }`}>
                {/* Plan Header */}
                <div className="text-center mb-8">
                  <h3 className="text-xl font-bold text-slate-900 mb-1">{plan.name}</h3>
                  <p className="text-sm text-slate-500 mb-4">{plan.subtitle}</p>
                  <div className="flex items-baseline justify-center gap-1 mb-3">
                    <span className={`text-5xl font-bold bg-gradient-to-r ${plan.popular ? 'from-red-600 to-red-500' : 'from-slate-900 to-slate-700'} bg-clip-text text-transparent`}>
                      ${getPrice(plan.price)}
                    </span>
                    <span className="text-slate-500">{plan.period}</span>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <CheckCircle2 className={`w-5 h-5 mt-0.5 flex-shrink-0 ${plan.popular ? 'text-red-600' : 'text-green-600'
                        }`} />
                      <span className="text-slate-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Button
                  onClick={() => navigate('/signup')}
                  className={`w-full py-6 text-lg rounded-xl transition-all duration-300 ${plan.popular
                    ? 'bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-orange-500 text-white shadow-lg shadow-red-500/25 hover:shadow-xl hover:shadow-red-500/30'
                    : 'bg-slate-900 hover:bg-slate-800 text-white'
                    }`}
                >
                  {plan.cta}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Enterprise Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-slate-900 rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-white mb-3">Enterprise & Custom Solutions</h3>
            <p className="text-slate-300 text-lg leading-relaxed">
              Need unlimited prompts, API access, custom integrations, or dedicated support? Let's build a plan tailored to your organization's needs.
            </p>
          </div>
          <Button
            onClick={() => window.location.href = 'mailto:sales@camanahomes.com?subject=Enterprise Inquiry'}
            className="bg-white hover:bg-slate-100 text-slate-900 px-8 py-6 text-lg rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2 whitespace-nowrap"
          >
            <Mail className="w-5 h-5" />
            Contact Us
          </Button>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-6 text-sm text-slate-500 mt-12"
        >
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-500" />
            No credit card required for trial
          </span>
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-500" />
            Cancel anytime, no questions asked
          </span>
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-500" />
            7-day money-back guarantee
          </span>
        </motion.div>
      </div>
    </section>
  );
}