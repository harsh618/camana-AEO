import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Sparkles, Menu, X, LogOut } from 'lucide-react';
import { useAuth } from "@/lib/AuthContext";

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
];

export default function Header() {
  const { user, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-xl shadow-sm border-b border-slate-100' : 'bg-transparent'
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2">
              <img src="/brand-logo.png" alt="AI Discovery" className="w-10 h-10 object-contain" />
              <span className={`text-xl font-bold transition-colors ${isScrolled ? 'text-slate-900' : 'text-slate-900'}`}>
                AI Discovery
              </span>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={`text-sm font-medium transition-colors hover:text-red-600 ${isScrolled ? 'text-slate-600' : 'text-slate-600'
                    }`}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Desktop CTAs */}
            <div className="hidden lg:flex items-center gap-4">
              {user ? (
                <>
                  <span className="text-sm font-medium text-slate-600">
                    {user.email}
                  </span>
                  <Button
                    variant="ghost"
                    onClick={() => logout()}
                    className={`font-medium ${isScrolled ? 'text-slate-700 hover:text-red-600' : 'text-slate-700 hover:text-red-600'}`}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <Button
                      variant="ghost"
                      className={`font-medium ${isScrolled ? 'text-slate-700 hover:text-red-600' : 'text-slate-700 hover:text-red-600'}`}
                    >
                      Login
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button
                      className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-red-500/20"
                    >
                      Start 7 Days Free Trial
                    </Button>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-slate-700" />
              ) : (
                <Menu className="w-6 h-6 text-slate-700" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-80 bg-white shadow-2xl z-50 lg:hidden"
            >
              <div className="flex flex-col h-full">
                {/* Sidebar Header */}
                <div className="flex items-center justify-between p-4 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <img src="/brand-logo.png" alt="AI Discovery" className="w-10 h-10 object-contain" />
                    <span className="text-xl font-bold text-slate-900">AI Discovery</span>
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    <X className="w-6 h-6 text-slate-700" />
                  </button>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 p-4">
                  <div className="space-y-1">
                    {navLinks.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        onClick={(e) => scrollToSection(e, link.href)}
                        className="flex items-center px-4 py-3 text-slate-700 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors font-medium"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </nav>

                {/* Sidebar CTAs */}
                <div className="p-4 border-t border-slate-100 space-y-3">
                  {user ? (
                    <Button
                      variant="outline"
                      onClick={() => {
                        logout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full border-slate-200 text-slate-700"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </Button>
                  ) : (
                    <>
                      <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button
                          variant="outline"
                          className="w-full border-slate-200 text-slate-700"
                        >
                          Sign In
                        </Button>
                      </Link>
                      <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button
                          className="w-full bg-primary hover:bg-primary/90 text-white"
                        >
                          Start 7 Days Free Trial
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}