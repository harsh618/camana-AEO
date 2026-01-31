import React from 'react';
import { Link } from 'react-router-dom';

const footerLinks = {
  product: [
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Case Studies', href: '#' },
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

export default function Footer() {
  return (
    <footer className="bg-[#020202]/40 border-t border-[#23293c]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[175px]">
        {/* Main Footer Content */}
        <div className="py-16 flex flex-col lg:flex-row gap-12 lg:gap-[201px]">
          {/* Brand Column */}
          <div className="flex-shrink-0">
            <div className="flex items-center gap-[5px] mb-4">
              <img src="/logos/searchlyst-icon.png" alt="Searchlyst" className="w-8 h-8 object-cover" />
              <span className="text-[20px] font-semibold text-[#ededed]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                searchlyst
              </span>
            </div>
            <p className="text-[14px] font-medium text-[#ededed] max-w-[194px] mb-4 leading-relaxed">
              Making brands visible in the age of AI search. Track, optimize, and dominate AI search results.
            </p>
            
            {/* Newsletter Input */}
            <div className="relative">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full max-w-[171px] px-4 py-2 bg-transparent border border-[#ededed]/30 rounded-lg text-[14px] font-medium text-[#ededed] placeholder:text-[#ededed] outline-none focus:border-[#ef2b15]/50"
              />
            </div>
          </div>

          {/* Links Section */}
          <div className="flex-1 flex flex-wrap gap-12 lg:gap-[78px]">
            {/* Product */}
            <div className="min-w-[127px]">
              <h4 className="text-[16px] font-semibold text-white mb-6">Product</h4>
              <ul className="space-y-[18px]">
                {footerLinks.product.map((link, index) => (
                  <li key={index}>
                    <a href={link.href} className="text-[14px] font-normal text-[#ededed] hover:text-[#ef2b15] transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div className="min-w-[107px]">
              <h4 className="text-[16px] font-semibold text-white mb-6">Resources</h4>
              <ul className="space-y-[18px]">
                {footerLinks.resources.map((link, index) => (
                  <li key={index}>
                    <a href={link.href} className="text-[14px] font-medium text-[#ededed] hover:text-[#ef2b15] transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div className="min-w-[115px]">
              <h4 className="text-[16px] font-semibold text-white mb-6">Company</h4>
              <ul className="space-y-[18px]">
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    {link.href.startsWith('/') ? (
                      <Link to={link.href} className="text-[14px] font-medium text-[#ededed] hover:text-[#ef2b15] transition-colors">
                        {link.label}
                      </Link>
                    ) : (
                      <a href={link.href} className="text-[14px] font-medium text-[#ededed] hover:text-[#ef2b15] transition-colors">
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect */}
            <div className="min-w-[113px]">
              <h4 className="text-[16px] font-semibold text-white mb-6">Connect</h4>
              <div className="flex items-center gap-[10px]">
                {/* Instagram */}
                <a href="#" className="w-6 h-6 flex items-center justify-center hover:opacity-80 transition-opacity">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <rect x="2" y="2" width="20" height="20" rx="5" stroke="#ededed" strokeWidth="1.5"/>
                    <circle cx="12" cy="12" r="4" stroke="#ededed" strokeWidth="1.5"/>
                    <circle cx="18" cy="6" r="1.5" fill="#ededed"/>
                  </svg>
                </a>
                {/* X (Twitter) */}
                <a href="#" className="w-6 h-6 flex items-center justify-center hover:opacity-80 transition-opacity">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="#ededed"/>
                  </svg>
                </a>
                {/* LinkedIn */}
                <a href="#" className="w-6 h-6 flex items-center justify-center hover:opacity-80 transition-opacity">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <rect x="2" y="2" width="20" height="20" rx="2" stroke="#ededed" strokeWidth="1.5"/>
                    <path d="M7 10v7M7 7v.01M11 17v-4a2 2 0 114 0v4M11 10v7" stroke="#ededed" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </a>
                {/* Reddit */}
                <a href="#" className="w-6 h-6 flex items-center justify-center hover:opacity-80 transition-opacity">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="#ededed" strokeWidth="1.5"/>
                    <circle cx="8" cy="12" r="1.5" fill="#ededed"/>
                    <circle cx="16" cy="12" r="1.5" fill="#ededed"/>
                    <path d="M8 16c1.333 1.333 5.333 1.333 8 0" stroke="#ededed" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-[#23293c]/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[14px] font-medium text-[#ededed]">
            © 2026 Searchlyst. Making brands visible in the age of AI search. v2.1
          </p>
          <div className="flex items-center gap-8 text-[14px] font-medium">
            <a href="#" className="text-[#ededed] hover:text-[#ef2b15] transition-colors">Privacy</a>
            <a href="#" className="text-[#ededed] hover:text-[#ef2b15] transition-colors">Terms</a>
            <a href="#" className="text-[#ededed] hover:text-[#ef2b15] transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
