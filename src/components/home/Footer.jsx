import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const logo = [
  { name: "instagram", logo: "../public/logos/socialMedia/instagram.png" },
  { name: "twitter", logo: "../public/logos/socialMedia/x_logo.png" },
  { name: "linkedin", logo: "../public/logos/socialMedia/linkedin.png" },
  { name: "reddit", logo: "../public/logos/socialMedia/reddit.png" },
];

const footerLinks = {
  product: [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Case Studies", href: "#" },
    { label: "API Documentation", href: "#" },
  ],
  resources: [
    { label: "Blog", href: "#" },
    { label: "AI Search Guide", href: "#" },
    { label: "Help Center", href: "#" },
    { label: "Status Page", href: "#" },
  ],
  company: [
    { label: "About Us", href: "/about-us" },
    { label: "Careers", href: "#" },
    { label: "Contact", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#020202]/40 border-t border-[#23293c]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-[175px]">
        {/* Main Footer Content */}
        <div className="py-10 sm:py-12 md:py-14 lg:py-16 flex flex-col lg:flex-row gap-8 sm:gap-10 md:gap-12 lg:gap-16 xl:gap-[201px]">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <img
                src="/brand-full-logo.png"
                alt="AI Discovery"
                className="w-32 h-8 object-contain"
              />
              {/* <span className="text-xl font-bold text-slate-900">Searchlyst</span> */}
            </div>
            <p className="text-[13px] sm:text-[14px] font-medium text-[#ededed] max-w-full sm:max-w-[250px] lg:max-w-[194px] mb-4 sm:mb-5 leading-relaxed">
              Making brands visible in the age of AI search. Track, optimize,
              and dominate AI search results.
            </p>

            {/* Newsletter Input */}
            <div className="relative">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full sm:w-auto max-w-full sm:max-w-[240px] lg:max-w-[171px] px-3 sm:px-4 py-2 sm:py-2.5 bg-transparent border border-[#ededed]/30 rounded-lg text-[13px] sm:text-[14px] font-medium text-[#ededed] placeholder:text-[#ededed]/70 outline-none focus:border-[#ef2b15]/50 transition-colors"
              />
            </div>
          </div>

          {/* Links Section */}
          <div className="flex-1 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 md:gap-12 lg:gap-16 xl:gap-[78px]">
            {/* Product */}
            <div className="min-w-0">
              <h4 className="text-[15px] sm:text-[16px] font-semibold text-white mb-4 sm:mb-5 md:mb-6">
                Product
              </h4>
              <ul className="space-y-3 sm:space-y-[18px]">
                {footerLinks.product.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-[13px] sm:text-[14px] font-normal text-[#ededed] hover:text-[#ef2b15] transition-colors block"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div className="min-w-0">
              <h4 className="text-[15px] sm:text-[16px] font-semibold text-white mb-4 sm:mb-5 md:mb-6">
                Resources
              </h4>
              <ul className="space-y-3 sm:space-y-[18px]">
                {footerLinks.resources.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-[13px] sm:text-[14px] font-medium text-[#ededed] hover:text-[#ef2b15] transition-colors block"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div className="min-w-0">
              <h4 className="text-[15px] sm:text-[16px] font-semibold text-white mb-4 sm:mb-5 md:mb-6">
                Company
              </h4>
              <ul className="space-y-3 sm:space-y-[18px]">
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    {link.href.startsWith("/") ? (
                      <Link
                        to={link.href}
                        className="text-[13px] sm:text-[14px] font-medium text-[#ededed] hover:text-[#ef2b15] transition-colors block"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className="text-[13px] sm:text-[14px] font-medium text-[#ededed] hover:text-[#ef2b15] transition-colors block"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect */}
            <div className="min-w-0">
              <h4 className="text-[15px] sm:text-[16px] font-semibold text-white mb-4 sm:mb-5 md:mb-6">
                Connect
              </h4>
              <div className="flex items-center gap-2 sm:gap-3 md:gap-[5px] flex-wrap">
                {/* Instagram */}
                <a
                  href="#"
                  className="w-6 h-6 sm:w-10 sm:h-10 md:w-5 md:h-5 flex items-center justify-center hover:opacity-80 transition-opacity"
                  aria-label="Instagram"
                >
                  <motion.img
                    src={logo[0].logo}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="w-full h-full object-contain"
                    alt="Instagram"
                  />
                </a>

                {/* X (Twitter) */}
                <a
                  href="#"
                  className="w-6 h-6 sm:w-10 sm:h-10 md:w-5 md:h-5 flex items-center justify-center hover:opacity-80 transition-opacity"
                  aria-label="X (Twitter)"
                >
                  <motion.img
                    src={logo[1].logo}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="w-full h-full object-contain"
                    alt="X (Twitter)"
                  />
                </a>

                {/* LinkedIn */}
                <a
                  href="#"
                  className="w-9 h-9 sm:w-10 sm:h-10 md:w-7 md:h-7 flex items-center justify-center hover:opacity-80 transition-opacity"
                  aria-label="LinkedIn"
                >
                  <motion.img
                    src={logo[2].logo}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="w-full h-full object-contain"
                    alt="LinkedIn"
                  />
                </a>

                {/* Reddit */}
                <a
                  href="#"
                  className="w-6 h-6 sm:w-10 sm:h-10 md:w-5 md:h-5 flex items-center justify-center hover:opacity-80 transition-opacity"
                  aria-label="Reddit"
                >
                  <motion.img
                    src={logo[3].logo}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="w-full h-full object-contain"
                    alt="Reddit"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-4 sm:py-5 md:py-6 border-t border-[#23293c]/50 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <p className="text-[12px] sm:text-[13px] md:text-[14px] font-medium text-[#ededed] text-center sm:text-left">
            © 2026 Searchlyst. Making brands visible in the age of AI search.
            v2.1
          </p>
          <div className="flex items-center gap-4 sm:gap-6 md:gap-8 text-[12px] sm:text-[13px] md:text-[14px] font-medium">
            <a
              href="#"
              className="text-[#ededed] hover:text-[#ef2b15] transition-colors"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-[#ededed] hover:text-[#ef2b15] transition-colors"
            >
              Terms
            </a>
            <a
              href="#"
              className="text-[#ededed] hover:text-[#ef2b15] transition-colors"
            >
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
