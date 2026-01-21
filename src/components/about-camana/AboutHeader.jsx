import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

export default function AboutHeader() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-xl shadow-sm border-b border-slate-100' : 'bg-white/50 backdrop-blur-md'
            }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 lg:h-20 relative">

                    {/* Left: Logo */}
                    <Link to="/" className="flex items-center gap-2 z-10">
                        <img src="/brand-logo.png" alt="Searchlyst" className="w-10 h-10 object-contain" />
                        <span className="text-xl font-bold text-slate-900">
                            Searchlyst
                        </span>
                    </Link>

                    {/* Center: Title */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                        <span className="text-lg font-semibold text-slate-700">About Us</span>
                    </div>

                    {/* Right: Back to Home */}
                    <div className="z-10">
                        <Link to="/">
                            <Button variant="ghost" className="text-slate-600 hover:text-red-600">
                                Back to Home
                            </Button>
                        </Link>
                    </div>

                </div>
            </div>
        </header>
    );
}
