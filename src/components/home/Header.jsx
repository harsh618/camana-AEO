import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, LogOut } from 'lucide-react';
import { useAuth } from "@/lib/AuthContext";
import Logo from "@/components/ui/Logo";

const navLinks = [
  { label: 'Features', href: '/#features', isScroll: true },
  { label: 'How It Works', href: '/#how-it-works', isScroll: true },
  { label: 'Pricing', href: '/#pricing', isScroll: true },
  { label: 'FAQ', href: '/#faq', isScroll: true },
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

  const handleNavClick = (e, link) => {
    if (link.isScroll) {
      if (window.location.pathname !== '/') {
        return;
      }
      e.preventDefault();
      const element = document.querySelector(link.href.replace('/', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  const theme = isScrolled ? 'dark' : 'dark'; // Always dark for now based on user request/design, or adapt if white theme is introduced. 
  // User provided specific logos for themes. Assuming "Black Theme" logo (white text) for dark backgrounds.
  // The header background is transparent (on black) or black/95. So always dark theme.
  // However, the user asked for responsiveness and provided a "white theme" logo. 
  // If the mobile menu is white? Use white logo.
  // Current mobile menu bg is #0d0d0d (dark).
  
  // Wait, if isScrolled is true, bg is black/95. 
  // If I add a 'light' mode to the header (e.g. white background on scroll), I would use 'light'.
  // For now, I'll stick to 'dark' variant logo as the background is consistently dark.

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/95 backdrop-blur-xl border-b border-white/10' : 'bg-transparent'
      }`}>
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-20">
          <div className="flex items-center justify-between h-16 lg:h-[76px]">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <Logo theme="dark" className="h-10 w-auto" />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link)}
                  className="text-base font-medium text-[#ededed] hover:text-[#ef2b15] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Desktop CTAs */}
            <div className="hidden lg:flex items-center gap-6">
              {user ? (
                <>
                  <span className="text-sm font-medium text-[#ededed]/70">
                    {user.email}
                  </span>
                  <button
                    onClick={() => logout()}
                    className="text-base font-semibold text-[#ededed] hover:text-[#ef2b15] transition-colors flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <span className="text-base font-medium text-[#ededed] hover:text-[#ef2b15] transition-colors">
                      Log in
                    </span>
                  </Link>
                  <Link to="/signup">
                    <button className="px-6 py-2.5 rounded-full border border-white/20 text-[#ededed] hover:bg-white/10 transition-all font-medium text-base">
                      Start for free
                    </button>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-[#ededed]" />
              ) : (
                <Menu className="w-6 h-6 text-[#ededed]" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[280px] bg-[#0d0d0d] border-l border-white/10 shadow-2xl z-50 lg:hidden"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-5 border-b border-white/10">
                  <div className="flex items-center gap-2">
                     <Logo theme="dark" className="h-8 w-auto" />
                  </div>
                  <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                    <X className="w-6 h-6 text-[#ededed]" />
                  </button>
                </div>
                <nav className="flex-1 px-4 py-6">
                  <div className="space-y-2">
                    {navLinks.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link)}
                        className="block px-4 py-3 text-lg font-medium text-[#ededed] hover:text-[#ef2b15] hover:bg-white/5 rounded-xl transition-colors"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </nav>
                <div className="p-5 border-t border-white/10 space-y-4">
                  {user ? (
                    <button
                      onClick={() => { logout(); setIsMobileMenuOpen(false); }}
                      className="w-full py-3 px-4 rounded-xl border border-white/20 text-[#ededed] hover:bg-white/5 transition-colors flex items-center justify-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  ) : (
                    <>
                      <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="block w-full">
                         <button className="w-full py-3 text-center text-[#ededed] hover:text-[#ef2b15] transition-colors font-medium">
                          Log in
                        </button>
                      </Link>
                      <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)} className="block w-full">
                        <button className="w-full py-3 px-6 rounded-full bg-[#ef2b15] text-white hover:bg-[#ef2b15]/90 transition-colors font-medium">
                          Start for free
                        </button>
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
