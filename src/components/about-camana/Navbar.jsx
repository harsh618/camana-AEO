import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Menu, X, Sparkles } from 'lucide-react';

const navLinks = [
  { label: 'Features', href: '#solution' },
  { label: 'How It Works', href: '#traction' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
];

export default function Navbar({ onGetStarted }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-xl border-b border-gray-200' : 'bg-transparent'
          }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-600 to-orange-600 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">AI Discovery</span>
            </a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors font-medium"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* CTA */}
            <div className="flex items-center gap-3">
              <a href="#" className="hidden sm:block text-sm text-gray-600 hover:text-gray-900 font-medium">
                Sign Up
              </a>
              <Button
                onClick={onGetStarted}
                className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white rounded-full px-5"
              >
                Start 7 Days Free Trial
              </Button>
              <button
                className="md:hidden text-gray-900 p-2"
                onClick={() => setMobileOpen(true)}
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-white"
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-12">
              <span className="text-xl font-bold text-gray-900">AI Discovery</span>
              <button onClick={() => setMobileOpen(false)}>
                <X className="w-6 h-6 text-gray-900" />
              </button>
            </div>
            <div className="space-y-6">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block text-2xl text-gray-900 font-medium"
                >
                  {link.label}
                </a>
              ))}
              <Button
                onClick={() => { setMobileOpen(false); onGetStarted(); }}
                className="w-full bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-full mt-8"
              >
                Start 7 Days Free Trial
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}
