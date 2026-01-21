import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/AuthContext';
import { db } from '@/lib/firebase';
import { doc, getDoc, updateDoc, collection, addDoc } from 'firebase/firestore';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, CheckCircle2, AlertTriangle, FileText, Download, Share2, BarChart3, Globe, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from "@/components/ui/use-toast";
import { runGeoAudit } from '@/lib/geoAuditor';

const ReportGeneration = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { toast } = useToast();

    // State
    const [status, setStatus] = useState('initializing'); // initializing, scraping, analyzing, saving, complete, error
    const [progress, setProgress] = useState(0);
    const [reportData, setReportData] = useState(null);
    const [workspaceData, setWorkspaceData] = useState(null);

    // Fetch workspace and start audit
    useEffect(() => {
        const initAudit = async () => {
            if (!user?.uid) return;

            try {
                // 1. Get Workspace Data
                const userDoc = await getDoc(doc(db, "users", user.uid));
                if (!userDoc.exists()) {
                    throw new Error("User profile not found");
                }
                const workspaceId = userDoc.data().workspaceId;
                if (!workspaceId) {
                    throw new Error("No workspace linked");
                }
                const workspaceSnap = await getDoc(doc(db, "workspaces", workspaceId));
                if (!workspaceSnap.exists()) {
                    throw new Error("Workspace not found");
                }

                const wsData = workspaceSnap.data();
                setWorkspaceData(wsData);

                // Start Audit Flow
                runAuditFlow(wsData.websiteUrl || wsData.domain, workspaceId);

            } catch (error) {
                console.error("Init Error:", error);
                setStatus('error');
                toast({ title: "Initialization Failed", description: error.message, variant: "destructive" });
            }
        };

        if (user) {
            initAudit();
        }
    }, [user]);

    const runAuditFlow = async (url, workspaceId) => {
        if (!url) {
            setStatus('error');
            return;
        }

        try {
            // Step 1: Scraping
            setStatus('scraping');
            setProgress(20);

            const auditResult = await runGeoAudit(url);

            if (!auditResult.success) {
                throw new Error(auditResult.error);
            }

            setProgress(60);
            setStatus('analyzing');

            // Simulate analysis delay if needed for UX
            await new Promise(r => setTimeout(r, 1500));

            setProgress(90);
            setStatus('saving');

            // Step 3: Save to Firestore
            const reportPayload = {
                workspaceId,
                userId: user.uid,
                url,
                ...auditResult.analysis,
                createdAt: new Date(),
                type: 'geo_audit_v1'
            };

            const reportRef = await addDoc(collection(db, "reports"), reportPayload);

            await updateDoc(doc(db, "workspaces", workspaceId), {
                lastReportId: reportRef.id,
                lastAuditDate: new Date()
            });

            setReportData(reportPayload);
            setProgress(100);
            setStatus('complete');

        } catch (error) {
            console.error("Audit Error:", error);
            setStatus('error');
            toast({ title: "Audit Failed", description: error.message, variant: "destructive" });
        }
    };

    // --- SUCCESS MODAL & REDIRECT ---
    useEffect(() => {
        if (status === 'complete') {
            const timer = setTimeout(() => {
                navigate('/');
            }, 5000); // Redirect after 5 seconds
            return () => clearTimeout(timer);
        }
    }, [status, navigate]);

    if (status === 'complete') {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 relative overflow-hidden font-sans">
                {/* Google-style Animated Background */}
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-200/30 rounded-full blur-[100px] animate-pulse" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-red-200/30 rounded-full blur-[100px] animate-pulse delay-1000" />
                </div>

                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full text-center border border-slate-100 relative z-10"
                >
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="w-10 h-10 text-green-600" />
                    </div>

                    <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Report Generated!</h2>

                    <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                        Your deep audit for <span className="font-bold text-slate-900">{workspaceData?.brandName}</span> is ready.
                        <br /><br />
                        We've sent the complete PDF report to <span className="font-bold text-slate-900">{user?.email}</span>.
                    </p>

                    <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-8">
                        <p className="text-sm text-slate-500 mb-2">Redirecting to home in...</p>
                        <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 5, ease: "linear" }}
                                className="h-full bg-red-600"
                            />
                        </div>
                    </div>

                    <Button
                        onClick={() => navigate('/')}
                        className="w-full h-12 text-base bg-slate-900 hover:bg-black text-white rounded-xl shadow-lg"
                    >
                        Back to Home Now
                    </Button>
                </motion.div>
            </div>
        );
    }

    if (status === 'error') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="text-center p-8 bg-white rounded-2xl shadow-xl max-w-md">
                    <AlertTriangle className="w-16 h-16 text-red-600 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Audit Failed</h2>
                    <p className="text-slate-600 mb-6">We encountered an issue while auditing your website. Please check the URL and try again.</p>
                    <Button onClick={() => window.location.reload()} className="bg-red-600 hover:bg-black text-white">Retry Audit</Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white relative overflow-hidden">
            {/* Google-style Animated Background */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-200/30 rounded-full blur-[100px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-red-200/30 rounded-full blur-[100px] animate-pulse delay-1000" />
            </div>

            <div className="z-10 text-center space-y-8 max-w-lg w-full px-6">
                <div className="relative w-24 h-24 mx-auto">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="45" fill="none" stroke="#f1f5f9" strokeWidth="8" />
                        <motion.circle
                            cx="50" cy="50" r="45"
                            fill="none" stroke="#dc2626" strokeWidth="8"
                            strokeLinecap="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: progress / 100 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            style={{ rotate: -90, transformOrigin: "50% 50%" }}
                        />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xl font-bold text-slate-900">{progress}%</span>
                    </div>
                </div>

                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-slate-900 animate-pulse">
                        {status === 'initializing' && "Initializing Engines..."}
                        {status === 'scraping' && "Scanning Digital Footprint..."}
                        {status === 'analyzing' && "Analyzing GEO Visibility..."}
                        {status === 'saving' && "Finalizing Report..."}
                    </h2>
                    <p className="text-slate-500">Connecting to AI Knowledge Graphs...</p>
                </div>

                {/* Engine Status Cards */}
                <div className="grid grid-cols-1 gap-3 w-full animate-in slide-in-from-bottom duration-700">
                    <EngineStatusCard
                        name="Perplexity"
                        status={status === 'analyzing' || status === 'saving' ? 'complete' : progress > 30 ? 'scanning' : 'waiting'}
                        icon="/logos/perplexity.jpg"
                    />
                    <EngineStatusCard
                        name="Gemini 1.5 Pro"
                        status={status === 'analyzing' || status === 'saving' ? 'complete' : progress > 50 ? 'scanning' : 'waiting'}
                        icon="/logos/gemini.jpg"
                    />
                    <EngineStatusCard
                        name="ChatGPT-4o"
                        status={status === 'analyzing' || status === 'saving' ? 'complete' : progress > 70 ? 'scanning' : 'waiting'}
                        icon="/logos/chatgpt.jpg"
                    />
                    <EngineStatusCard
                        name="Claude 3.5 Sonnet"
                        status={status === 'analyzing' || status === 'saving' ? 'complete' : progress > 85 ? 'scanning' : 'waiting'}
                        icon="/logos/claude.jpg"
                    />
                </div>
            </div>
        </div>
    );
};

const EngineStatusCard = ({ name, status, icon }) => {
    return (
        <div className={`p-3 rounded-xl border flex items-center gap-3 transition-all ${status === 'scanning' ? 'border-red-500 bg-red-50 shadow-md ring-1 ring-red-200' :
                status === 'complete' ? 'border-green-200 bg-green-50' :
                    'border-slate-100 bg-white opacity-60'
            }`}>
            <div className="relative shrink-0">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm overflow-hidden border border-slate-100">
                    <img src={icon} alt={name} className="w-full h-full object-cover" />
                </div>
                {status === 'complete' && (
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                        <CheckCircle2 className="w-3 h-3 text-white" />
                    </div>
                )}
            </div>
            <div className="text-left flex-1">
                <div className="flex justify-between items-center">
                    <p className="text-sm font-bold text-slate-900">{name}</p>
                    {status === 'scanning' && <Loader2 className="w-3 h-3 text-red-500 animate-spin" />}
                </div>
                <p className="text-xs text-slate-500">
                    {status === 'waiting' && 'Pending...'}
                    {status === 'scanning' && 'Analyzing visibility...'}
                    {status === 'complete' && 'Audit Complete'}
                </p>
            </div>
        </div>
    );
};

export default ReportGeneration;
