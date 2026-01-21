import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Twitter, Linkedin, Youtube, Mail, ArrowRight, Sparkles } from 'lucide-react';

const footerLinks = {
  product: [
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Case Studies', href: '#testimonials' },
    { label: 'API Documentation', href: '#' }
  ],
  resources: [
    { label: 'Blog', href: '#' },
    { label: 'AI Search Guide', href: '#' },
    { label: 'Help Center', href: '#' },
    { label: 'Status Page', href: '#' }
  ],
  company: [
    { label: 'About Us', href: '/about-us' },
    { label: 'Careers', href: '#' },
    { label: 'Contact', href: '#' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' }
  ]
};

const socialLinks = [
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Youtube, href: '#', label: 'YouTube' }
];

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-100 relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(253,45,21,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(253,45,21,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <img src="/brand-logo.png" alt="AI Discovery" className="w-10 h-10 object-contain" />
              <span className="text-xl font-bold text-slate-900">AI Discovery</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed mb-6">
              Making brands visible in the age of AI search. Track, optimize, and dominate AI search results.
            </p>

            {/* Newsletter */}
            <div className="space-y-3">
              <p className="text-sm font-medium text-slate-900">Subscribe to our newsletter</p>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 rounded-lg"
                />
                <Button size="icon" className="bg-red-600 hover:bg-red-500 rounded-lg">
                  <ArrowRight className="w-4 h-4 text-white" />
                </Button>
              </div>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-semibold text-slate-900 mb-4">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-slate-500 hover:text-red-600 text-sm transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="font-semibold text-slate-900 mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-slate-500 hover:text-red-600 text-sm transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-slate-900 mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-slate-500 hover:text-red-600 text-sm transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-semibold text-slate-900 mb-4">Connect</h4>
            <div className="flex gap-3 mb-6">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-lg bg-slate-100 hover:bg-red-50 flex items-center justify-center transition-colors"
                  >
                    <Icon className="w-5 h-5 text-slate-600" />
                  </a>
                );
              })}
            </div>
            <a href="mailto:hello@aidiscovery.com" className="flex items-center gap-2 text-slate-500 hover:text-red-600 text-sm transition-colors">
              <Mail className="w-4 h-4" />
              hello@aidiscovery.com
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © 2026 Searchlyst Technologies. Making brands visible in the age of AI search. v2.1
          </p>
          <div className="flex items-center gap-6 text-sm">
            <a href="#" className="text-slate-500 hover:text-red-600 transition-colors">Privacy</a>
            <a href="#" className="text-slate-500 hover:text-red-600 transition-colors">Terms</a>
            <a href="#" className="text-slate-500 hover:text-red-600 transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}