import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, Briefcase, ArrowRight, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { base44 } from '@/api/base44Client';

export default function ActionSection() {
  const [activeTab, setActiveTab] = useState('brand');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [brandForm, setBrandForm] = useState({
    full_name: '',
    email: '',
    company_website: ''
  });

  const [investorForm, setInvestorForm] = useState({
    full_name: '',
    email: '',
    linkedin_url: '',
    firm_name: '',
    location: '',
    investor_type: '',
    investment_range: '',
    help_beyond_capital: ''
  });

  const handleBrandSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await base44.entities.WaitlistSignup.create({
      ...brandForm,
      signup_type: 'brand'
    });
    setIsSubmitting(false);
    setSubmitted(true);
  };

  const handleInvestorSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await base44.entities.WaitlistSignup.create({
      ...investorForm,
      signup_type: 'investor'
    });
    setIsSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section id="action" className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-emerald-50 rounded-2xl border border-emerald-200 p-12"
          >
            <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-emerald-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Thank You!</h3>
            <p className="text-gray-600">
              We've received your submission and will be in touch shortly.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="action" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Choose Your Path
          </h2>
        </motion.div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-gray-100 rounded-2xl p-1.5">
            <button
              onClick={() => setActiveTab('brand')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === 'brand'
                  ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
                }`}
            >
              <Building2 className="w-4 h-4" />
              I am a Brand / User
            </button>
            <button
              onClick={() => setActiveTab('investor')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === 'investor'
                  ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
                }`}
            >
              <Briefcase className="w-4 h-4" />
              I am an Investor
            </button>
          </div>
        </div>

        {/* Forms */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-gray-50 rounded-2xl border border-gray-200 p-8 md:p-12"
        >
          {activeTab === 'brand' ? (
            <>
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Stop Being Invisible.</h3>
                <p className="text-gray-600">
                  Secure early access to the Searchlyst Discovery Engine. Optimize your brand for ChatGPT, Perplexity, and Gemini.
                </p>
              </div>
              <form onSubmit={handleBrandSubmit} className="space-y-6">
                <div>
                  <label className="text-sm text-gray-700 mb-2 block font-medium">Full Name</label>
                  <Input
                    value={brandForm.full_name}
                    onChange={(e) => setBrandForm({ ...brandForm, full_name: e.target.value })}
                    placeholder="John Smith"
                    required
                    className="bg-white border-gray-300 h-12 rounded-xl"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-700 mb-2 block font-medium">Work Email</label>
                  <Input
                    type="email"
                    value={brandForm.email}
                    onChange={(e) => setBrandForm({ ...brandForm, email: e.target.value })}
                    placeholder="john@company.com"
                    required
                    className="bg-white border-gray-300 h-12 rounded-xl"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-700 mb-2 block font-medium">Company Website URL</label>
                  <Input
                    value={brandForm.company_website}
                    onChange={(e) => setBrandForm({ ...brandForm, company_website: e.target.value })}
                    placeholder="https://yourcompany.com"
                    className="bg-white border-gray-300 h-12 rounded-xl"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white h-12 rounded-xl text-base font-medium"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>Join Waitlist <ArrowRight className="ml-2 w-5 h-5" /></>
                  )}
                </Button>
              </form>
            </>
          ) : (
            <>
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Fuel the Future of Search.</h3>
                <p className="text-gray-600">
                  We are opening a strategic round for value-add partners. Request access to our Data Room and Pitch Deck.
                </p>
              </div>
              <form onSubmit={handleInvestorSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-700 mb-2 block font-medium">Full Name</label>
                    <Input
                      value={investorForm.full_name}
                      onChange={(e) => setInvestorForm({ ...investorForm, full_name: e.target.value })}
                      placeholder="Jane Doe"
                      required
                      className="bg-white border-gray-300 h-12 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-700 mb-2 block font-medium">Direct Email</label>
                    <Input
                      type="email"
                      value={investorForm.email}
                      onChange={(e) => setInvestorForm({ ...investorForm, email: e.target.value })}
                      placeholder="jane@vc.com"
                      required
                      className="bg-white border-gray-300 h-12 rounded-xl"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm text-gray-700 mb-2 block font-medium">LinkedIn Profile URL</label>
                  <Input
                    value={investorForm.linkedin_url}
                    onChange={(e) => setInvestorForm({ ...investorForm, linkedin_url: e.target.value })}
                    placeholder="https://linkedin.com/in/yourprofile"
                    className="bg-white border-gray-300 h-12 rounded-xl"
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-700 mb-2 block font-medium">Firm / Syndicate Name</label>
                    <Input
                      value={investorForm.firm_name}
                      onChange={(e) => setInvestorForm({ ...investorForm, firm_name: e.target.value })}
                      placeholder="Acme Ventures"
                      className="bg-white border-gray-300 h-12 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-700 mb-2 block font-medium">Location</label>
                    <Input
                      value={investorForm.location}
                      onChange={(e) => setInvestorForm({ ...investorForm, location: e.target.value })}
                      placeholder="Dubai, UAE"
                      className="bg-white border-gray-300 h-12 rounded-xl"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-700 mb-2 block font-medium">Investor Type</label>
                    <Select
                      value={investorForm.investor_type}
                      onValueChange={(v) => setInvestorForm({ ...investorForm, investor_type: v })}
                    >
                      <SelectTrigger className="bg-white border-gray-300 h-12 rounded-xl">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="angel">Angel</SelectItem>
                        <SelectItem value="vc_fund">VC Fund</SelectItem>
                        <SelectItem value="family_office">Family Office</SelectItem>
                        <SelectItem value="strategic">Strategic</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm text-gray-700 mb-2 block font-medium">Investment Interest</label>
                    <Select
                      value={investorForm.investment_range}
                      onValueChange={(v) => setInvestorForm({ ...investorForm, investment_range: v })}
                    >
                      <SelectTrigger className="bg-white border-gray-300 h-12 rounded-xl">
                        <SelectValue placeholder="Select range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="50k-100k">$50,000 - $100,000 (Angel)</SelectItem>
                        <SelectItem value="100k-250k">$100,000 - $250,000 (Super Angel)</SelectItem>
                        <SelectItem value="250k-500k">$250,000 - $500,000 (Strategic)</SelectItem>
                        <SelectItem value="500k-1m">$500,000 - $1,000,000 (Lead)</SelectItem>
                        <SelectItem value="1m+">$1,000,000+ (Full Round)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <label className="text-sm text-gray-700 mb-2 block font-medium">How can you help beyond capital? (Optional)</label>
                  <Textarea
                    value={investorForm.help_beyond_capital}
                    onChange={(e) => setInvestorForm({ ...investorForm, help_beyond_capital: e.target.value })}
                    placeholder="Network connections, strategic partnerships, industry expertise..."
                    rows={3}
                    className="bg-white border-gray-300 rounded-xl resize-none"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-emerald-600 to-slate-600 hover:from-emerald-500 hover:to-slate-500 text-white h-12 rounded-xl text-base font-medium"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>Request Data Room Access <ArrowRight className="ml-2 w-5 h-5" /></>
                  )}
                </Button>
              </form>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}
