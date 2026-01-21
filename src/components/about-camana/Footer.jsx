import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Twitter, Linkedin, Youtube, ArrowRight, Sparkles } from 'lucide-react';

const footerLinks = {
  Product: ['Features', 'Pricing', 'How It Works', 'Case Studies', 'API Documentation'],
  Resources: ['Blog', 'AI Search Guide', 'Help Center', 'Status Page'],
  Company: ['About Us', 'Careers', 'Contact', 'Privacy Policy', 'Terms of Service']
};

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-16">
          {/* Brand */}
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-600 to-orange-600 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">Searchlyst</span>
            </div>
            <p className="text-gray-400 text-sm mb-6 max-w-xs">
              Making brands visible in the age of AI search.
            </p>

            {/* Newsletter */}
            <div className="mb-6">
              <p className="text-sm text-gray-400 mb-3">Subscribe to our newsletter</p>
              <div className="flex gap-2">
                <Input
                  placeholder="your@email.com"
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 h-10 rounded-lg flex-1"
                />
                <Button size="icon" className="bg-red-600 hover:bg-red-500 h-10 w-10 rounded-lg">
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Social */}
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors">
                <Twitter className="w-4 h-4 text-gray-400" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors">
                <Linkedin className="w-4 h-4 text-gray-400" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors">
                <Youtube className="w-4 h-4 text-gray-400" />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold mb-4">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-gray-800">
          <p className="text-center text-gray-500 text-sm">
            © 2025 Searchlyst. Making brands visible in the age of AI search.
          </p>
        </div>
      </div>
    </footer>
  );
}
