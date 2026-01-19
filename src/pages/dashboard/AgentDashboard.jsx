import React from 'react';
import { useAuth } from '@/lib/AuthContext';
import { Input } from "@/components/ui/input";
import { Paperclip, Mic, SlidersHorizontal, ArrowUp, Globe, FileText, Search, Activity } from 'lucide-react';

export default function AgentDashboard() {
    const { user } = useAuth();
    const userName = user?.email?.split('@')[0] || 'there';

    // Capitalize name
    const formattedName = userName.charAt(0).toUpperCase() + userName.slice(1);

    return (
        <div className="h-full flex flex-col items-center pt-20 px-4">

            {/* Greeting */}
            <h1 className="text-4xl font-semibold text-slate-900 mb-2">
                Good evening, {formattedName}.
            </h1>
            <p className="text-lg text-slate-500 mb-12">
                Want an update or have a question? Just chat below.
            </p>

            {/* Chat Interface */}
            <div className="w-full max-w-2xl mb-16">
                <div className="relative group">
                    <div className="absolute -top-8 left-0 flex items-center gap-2 text-xs text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="flex items-center gap-1"><span className="w-2 h-2 bg-yellow-400 rounded-full"></span> Analytics</span>
                        <span className="flex items-center gap-1"><span className="w-2 h-2 bg-blue-400 rounded-full"></span> Sources</span>
                    </div>

                    <div className="w-full bg-white rounded-3xl border border-slate-200 shadow-sm focus-within:shadow-md focus-within:border-slate-300 transition-all p-4 min-h-[120px] flex flex-col relative">
                        <textarea
                            placeholder="Get better answers and context by connecting your data"
                            className="flex-1 w-full bg-transparent border-none resize-none focus:ring-0 text-slate-900 placeholder:text-slate-400 text-base py-2"
                        />

                        <div className="flex justify-between items-center mt-2 px-1">
                            <div className="flex items-center gap-2 text-slate-400">
                                <button className="p-2 hover:bg-slate-50 rounded-full transition-colors">
                                    <Paperclip className="w-5 h-5" />
                                </button>
                                <button className="p-2 hover:bg-slate-50 rounded-full transition-colors">
                                    <SlidersHorizontal className="w-5 h-5" />
                                </button>
                                <button className="p-2 hover:bg-slate-50 rounded-full transition-colors">
                                    <Mic className="w-5 h-5" />
                                </button>
                            </div>

                            <button className="p-3 bg-slate-100 text-slate-400 rounded-full cursor-not-allowed hover:bg-slate-200 hover:text-slate-600 transition-colors">
                                <ArrowUp className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Suggestions Grid */}
            <div className="w-full max-w-4xl">
                <div className="flex justify-between items-center mb-4 px-1">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Get started</span>
                    <button className="text-slate-400 hover:text-slate-600">×</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {[
                        { icon: Globe, label: 'Find keyword opportunities' },
                        { icon: FileText, label: 'Generate an llms.txt' },
                        { icon: Search, label: 'Find content gaps' },
                        { icon: Activity, label: 'Audit my homepage' },
                    ].map((item, i) => (
                        <div key={i} className="p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-100 hover:border-slate-200 cursor-pointer transition-all h-32 flex flex-col justify-between">
                            <item.icon className="w-6 h-6 text-slate-600" />
                            <span className="text-sm font-medium text-slate-700 leading-tight pr-4">
                                {item.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}
