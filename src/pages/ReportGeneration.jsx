import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Sparkles, Loader2, PlayCircle, Scale, Globe, ArrowRight } from 'lucide-react';
import { db } from '@/lib/firebase';
import { localDB } from "@/lib/local-db";
import { doc, getDoc, setDoc, collection, addDoc } from 'firebase/firestore';
import { useAuth } from '@/lib/AuthContext';
import { generateVisibilityReport, downloadPDF } from '@/lib/pdf-generator';

const LOGOS = [
    { name: 'ChatGPT', color: 'bg-green-100 text-green-600', icon: '🤖' },
    { name: 'Claude', color: 'bg-amber-100 text-amber-600', icon: '🧠' },
    { name: 'Google', color: 'bg-blue-100 text-blue-600', icon: 'G' },
    { name: 'Perplexity', color: 'bg-cyan-100 text-cyan-600', icon: '🔍' },
    { name: 'Bing', color: 'bg-indigo-100 text-indigo-600', icon: 'B' },
    { name: 'Gemini', color: 'bg-rose-100 text-rose-600', icon: '✨' },
];

export default function ReportGeneration() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState('Initializing agent...');
    const [completedLogos, setCompletedLogos] = useState([]);
    const [isReady, setIsReady] = useState(false);
    const [userData, setUserData] = useState(null);

    // Fetch user data on mount
    useEffect(() => {
        const fetchUserData = async () => {
            if (!user) return;

            try {
                const userDoc = await getDoc(doc(db, 'users', user.uid));
                if (userDoc.exists()) {
                    const workspaceId = userDoc.data().workspaceId;
                    if (workspaceId) {
                        const workspaceDoc = await getDoc(doc(db, 'workspaces', workspaceId));
                        if (workspaceDoc.exists()) {
                            setUserData(workspaceDoc.data());
                        }
                    }
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [user]);


    useEffect(() => {
        // 1. Initial Start
        const timer = setTimeout(() => {
            setStatus('Connecting to AI knowledge base...');
            setProgress(10);
        }, 1000);

        // 2. Loop through logos simulation
        let currentLogoIndex = 0;
        const logoInterval = setInterval(() => {
            if (currentLogoIndex < LOGOS.length) {
                const logo = LOGOS[currentLogoIndex];
                setStatus(`Scanning ${logo.name} visibility...`);
                setCompletedLogos(prev => [...prev, logo.name]);
                setProgress(prev => prev + 15);
                currentLogoIndex++;
            } else {
                clearInterval(logoInterval);
                setStatus('Finalizing your visibility score...');
                setProgress(100);

                // Generate PDF after animation completes
                setTimeout(async () => {
                    if (userData) {
                        try {
                            setStatus('Generating your PDF report...');

                            // Generate PDF
                            const pdfBlob = generateVisibilityReport(userData);
                            const filename = `${userData.brandName?.replace(/\s+/g, '-') || 'brand'}-visibility-report-${new Date().toISOString().split('T')[0]}.pdf`;

                            // Download PDF - Skipped as per request, download only on dashboard
                            // downloadPDF(pdfBlob, filename);

                            // Save report metadata to Firebase
                            if (user) {
                                const reportData = {
                                    userId: user.uid,
                                    brandName: userData.brandName,
                                    filename: filename,
                                    type: 'visibility',
                                    size: pdfBlob.size
                                };

                                // Save to Local DB (Priority)
                                localDB.saveReport(reportData);

                                // Save to Firestore (Backup)
                                await addDoc(collection(db, 'reports'), {
                                    ...reportData,
                                    generatedAt: new Date()
                                });
                            }

                            setStatus('Report generated successfully!');
                        } catch (error) {
                            console.error('Error generating PDF:', error);
                            setStatus('Report generation complete!');
                        }
                    }

                    setIsReady(true);
                }, 1000);
            }
        }, 1500);

        return () => {
            clearTimeout(timer);
            clearInterval(logoInterval);
        };
    }, [userData, user]);

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-5xl rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row min-h-[600px]">

                {/* Left Side: Context & Action */}
                <div className="w-full md:w-1/2 p-12 flex flex-col justify-center border-b md:border-b-0 md:border-r border-slate-100">
                    <div className="mb-8">
                        <img src="/brand-logo.png" alt="Logo" className="w-10 h-10 mb-6" />
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-red-100 rounded-lg">
                                <span className="text-red-600 font-bold">X</span>
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-900">Camana Homes</h3>
                                <p className="text-sm text-slate-500">camanahomes.com</p>
                            </div>
                        </div>
                    </div>

                    <h1 className="text-4xl font-bold text-slate-900 mb-6 leading-tight">
                        Generating your first report
                    </h1>

                    <p className="text-lg text-slate-600 mb-10 leading-relaxed">
                        We're creating your prompts and running your first visibility report now. We'll do this automatically every night so you always have fresh data on how your brand appears across ChatGPT, Perplexity, Claude, and more.
                    </p>

                    <div className="flex items-center gap-4">
                        <Button
                            onClick={() => navigate('/dashboard/reports')}
                            disabled={!isReady}
                            className={`w-full h-12 text-lg transition-all transform duration-300 ${isReady ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'}
                                bg-slate-900 hover:bg-slate-800 text-white shadow-lg hover:shadow-xl rounded-xl`}
                        >
                            View Report in Dashboard
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                        <span className="text-sm text-slate-500 font-medium animate-pulse">
                            {isReady ? '← Ready to view!' : ''}
                        </span>
                    </div>

                    <div className="mt-auto pt-10 text-xs text-slate-400">
                        © 2026 AI Discovery Engine
                    </div>
                </div>

                {/* Right Side: Animation & Status */}
                <div className="w-full md:w-1/2 bg-slate-50/50 p-12 flex flex-col items-center justify-center relative">

                    {/* Central Animation */}
                    <div className="relative mb-12">
                        <div className="flex gap-4 items-center justify-center flex-wrap max-w-xs mx-auto">
                            {LOGOS.map((logo) => {
                                const isActive = completedLogos.includes(logo.name);
                                return (
                                    <div
                                        key={logo.name}
                                        className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-sm transition-all duration-500 ${isActive
                                            ? `${logo.color} scale-100 opacity-100`
                                            : 'bg-white text-slate-300 scale-90 opacity-50 grayscale'
                                            }`}
                                    >
                                        {isActive ? (
                                            <div className="relative">
                                                {logo.icon}
                                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                                            </div>
                                        ) : logo.icon}
                                    </div>
                                )
                            })}
                        </div>

                        {/* Scanning Line Animation */}
                        {!isReady && (
                            <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500/20 to-transparent -translate-y-1/2 animate-pulse" />
                        )}
                    </div>

                    <h3 className="text-xl font-medium text-slate-900 mb-2">
                        {status}
                    </h3>

                    <div className="w-64 h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-red-600 transition-all duration-300 ease-linear"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

            </div>
        </div>
    );
}
