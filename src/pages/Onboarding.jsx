import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/lib/AuthContext';
import { db, auth } from '@/lib/firebase';
import { collection, addDoc, doc, setDoc } from 'firebase/firestore';
import { motion, AnimatePresence } from 'framer-motion';
import {
    CheckCircle2,
    ArrowRight,
    ArrowLeft,
    Loader2,
    Sparkles as SparklesIcon,
    Mail,
    Check,
    ChevronRight,
    MapPin,
    Search,
    Globe,
    Target
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from "@/components/ui/use-toast";
import { suggestCompetitors } from '@/lib/ai-agent';
import { enrichWebsiteData, detectIndustry, findCompetitors, generateTopics, suggestAudience, suggestMoat } from '@/lib/intelligentOnboarding';

const steps = [
    { id: 'identity', title: 'Identity', description: 'Brand details' },
    { id: 'location', title: 'Location', description: 'Headquarters' },
    { id: 'focus', title: 'Focus & Audience', description: 'Industry & targets' },
    { id: 'competition', title: 'Competition', description: 'Market & strategy' },
    { id: 'voice', title: 'Voice', description: 'Brand tone' }
];

// --- Step Components (Defined Outside to prevent re-renders) ---

// Step components moved to main flow or refactored below

const StepIdentity = ({ formData, updateForm, onEnrichWebsite, isEnriching }) => (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
        <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">Brand Identity</h2>
            <p className="text-base text-slate-600">Enter your website to unlock auto-detection.</p>
        </div>
        <div className="space-y-5">
            <div className="group">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block group-focus-within:text-red-600 transition-colors">Website URL</span>
                <div className="flex gap-3">
                    <div className="relative flex-1">
                        <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <Input
                            value={formData.websiteUrl}
                            onChange={(e) => updateForm('websiteUrl', e.target.value)}
                            placeholder="https://camanahomes.com"
                            className="h-14 text-base pl-12 bg-white border-slate-200 focus:border-red-600 focus:ring-4 focus:ring-red-50 transition-all rounded-2xl shadow-sm w-full"
                        />
                    </div>
                    <Button
                        onClick={() => onEnrichWebsite(formData.websiteUrl)}
                        disabled={isEnriching || !formData.websiteUrl}
                        className="h-14 px-8 bg-red-600 hover:bg-black text-white rounded-2xl shadow-lg shadow-red-100 transition-all duration-300 flex items-center gap-2 group/btn"
                    >
                        {isEnriching ? <Loader2 className="w-5 h-5 animate-spin" /> : <SparklesIcon className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />}
                        <span className="font-bold">Auto-Fill</span>
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-100 mt-6">
                <div className="group">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Company Name</span>
                    <Input
                        value={formData.brandName}
                        onChange={(e) => updateForm('brandName', e.target.value)}
                        placeholder="Verified Brand Name"
                        className="h-14 text-base bg-white/50 border-slate-200 focus:border-red-600 rounded-2xl shadow-sm w-full"
                    />
                </div>
                <div className="group">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Tagline / Mission</span>
                    <Input
                        value={formData.tagline}
                        onChange={(e) => updateForm('tagline', e.target.value)}
                        placeholder="Elevating visibility..."
                        className="h-14 text-base bg-white/50 border-slate-200 focus:border-red-600 rounded-2xl shadow-sm w-full"
                    />
                </div>
            </div>

            <div className="group">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Description</span>
                <textarea
                    value={formData.description}
                    onChange={(e) => updateForm('description', e.target.value)}
                    placeholder="Briefly describe what you do..."
                    className="w-full min-h-[100px] p-4 text-base bg-white border-slate-200 focus:border-red-600 focus:ring-4 focus:ring-red-50 transition-all rounded-2xl resize-none shadow-sm"
                />
            </div>
        </div>
    </div>
);

const StepLocation = ({ formData, updateForm }) => (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
        <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">Target Location</h2>
            <p className="text-base text-slate-600">Where is your HQ? This helps AI localise your reach.</p>
        </div>
        <div className="group">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block group-focus-within:text-red-600 transition-colors">Headquarters Address</span>
            <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                    value={formData.headquarters}
                    onChange={(e) => updateForm('headquarters', e.target.value)}
                    placeholder="Deoria, Uttar Pradesh"
                    className="h-14 text-base pl-12 bg-white border-slate-200 focus:border-red-600 focus:ring-4 focus:ring-red-50 transition-all rounded-2xl shadow-sm w-full"
                />
            </div>
            <p className="mt-3 text-sm text-slate-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-slate-400" />
                Essential for localized AI search and "Near Me" results.
            </p>
        </div>
    </div>
);

const StepFocus = ({ formData, updateForm, isAiProcessing, suggestions }) => (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
        <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">Core Focus</h2>
            <p className="text-base text-slate-600">Define your orbit and target audience.</p>
        </div>
        <div className="space-y-6">
            <div className="group">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block group-focus-within:text-red-600 transition-colors">Main Industry Keyword</span>
                <div className="relative">
                    <Target className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <Input
                        value={formData.industry}
                        onChange={(e) => updateForm('industry', e.target.value)}
                        placeholder="Luxury Real Estate"
                        className="h-14 text-base pl-12 bg-white border-slate-200 focus:border-red-600 focus:ring-4 focus:ring-red-50 transition-all rounded-2xl shadow-sm w-full"
                    />
                </div>
                {/* AI Suggestion Chip */}
                {suggestions?.industry && formData.industry !== suggestions.industry && (
                    <button
                        onClick={() => updateForm('industry', suggestions.industry)}
                        className="mt-2 px-3 py-1.5 bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-700 text-xs font-bold rounded-full transition-all flex items-center gap-1"
                    >
                        <SparklesIcon className="w-3 h-3" /> Use: {suggestions.industry}
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="group">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Target Persona</span>
                    <Input
                        value={formData.persona}
                        onChange={(e) => updateForm('persona', e.target.value)}
                        placeholder="e.g. Luxury Home Seekers"
                        className="h-14 text-base bg-white/50 border-slate-200 focus:border-red-600 rounded-2xl shadow-sm w-full"
                    />
                    {suggestions?.persona && formData.persona !== suggestions.persona && (
                        <button
                            onClick={() => updateForm('persona', suggestions.persona)}
                            className="mt-2 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-700 text-xs font-bold rounded-full transition-all"
                        >
                            + {suggestions.persona}
                        </button>
                    )}
                </div>
                <div className="group">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Core Pain Point</span>
                    <Input
                        value={formData.painPoint}
                        onChange={(e) => updateForm('painPoint', e.target.value)}
                        placeholder="e.g. Finding exclusive listings"
                        className="h-14 text-base bg-white/50 border-slate-200 focus:border-red-600 rounded-2xl shadow-sm w-full"
                    />
                    {suggestions?.painPoint && formData.painPoint !== suggestions.painPoint && (
                        <button
                            onClick={() => updateForm('painPoint', suggestions.painPoint)}
                            className="mt-2 px-3 py-1.5 bg-orange-50 hover:bg-orange-100 border border-orange-200 text-orange-700 text-xs font-bold rounded-full transition-all"
                        >
                            + {suggestions.painPoint}
                        </button>
                    )}
                </div>
            </div>

            {isAiProcessing && (
                <div className="mt-4 flex items-center gap-2 text-red-600">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm font-medium">Refining audience profiles...</span>
                </div>
            )}

            {formData.relatedTopics?.length > 0 && (
                <div className="space-y-3">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">AI-Generated Topic Clusters</span>
                    <div className="flex flex-wrap gap-2">
                        {formData.relatedTopics.map((topic, i) => (
                            <span key={i} className="px-4 py-2 bg-slate-100 text-slate-700 text-sm font-semibold rounded-full border border-slate-200">
                                {topic}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    </div>
);

const StepCompetition = ({ formData, updateForm, aiLoading }) => (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
        <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">Competition & Strategy</h2>
            <p className="text-base text-slate-600">Benchmark rivals and pick your battlegrounds.</p>
        </div>
        <div className="space-y-6">
            <div className="group">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block group-focus-within:text-red-600 transition-colors">Platform Priority</span>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {['AI Search', 'Google Search', 'Social Media', 'Professional', 'Video Content'].map(platform => (
                        <button
                            key={platform}
                            onClick={() => {
                                const newPlatforms = formData.platforms.includes(platform)
                                    ? formData.platforms.filter(p => p !== platform)
                                    : [...formData.platforms, platform];
                                updateForm('platforms', newPlatforms);
                            }}
                            className={`px-4 py-2 text-sm font-bold rounded-xl border transition-all ${formData.platforms.includes(platform)
                                ? 'bg-black text-white border-black'
                                : 'bg-white text-slate-600 border-slate-200 hover:border-red-200'
                                }`}
                        >
                            {platform}
                        </button>
                    ))}
                </div>
            </div>

            <div className="group">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Competitive Moat (USP)</span>
                <Input
                    value={formData.moat}
                    onChange={(e) => updateForm('moat', e.target.value)}
                    placeholder="What makes you unique?"
                    className="h-14 text-base bg-white border-slate-200 focus:border-red-600 rounded-2xl shadow-sm w-full"
                />
            </div>

            <div className="pt-6 border-t border-slate-100">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 block">Top 3 Rivals</span>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {[0, 1, 2].map((index) => (
                        <Input
                            key={index}
                            value={formData.competitors[index]?.domain || ''}
                            onChange={(e) => {
                                const newComps = [...formData.competitors];
                                newComps[index] = { domain: e.target.value };
                                updateForm('competitors', newComps);
                            }}
                            placeholder={`https://rival-${index + 1}.com`}
                            className="h-12 text-sm bg-white/50 border-slate-200 focus:border-red-600 rounded-xl"
                        />
                    ))}
                </div>
            </div>

            {aiLoading ? (
                <div className="flex items-center gap-3 text-purple-600 p-4 bg-purple-50 rounded-2xl animate-pulse">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm font-semibold">Analyzing market power dynamics...</span>
                </div>
            ) : (
                <div className="flex flex-wrap gap-2">
                    {formData.suggestedCompetitors?.length > 0 &&
                        formData.suggestedCompetitors.map((suggestion, i) => (
                            <button
                                key={i}
                                onClick={() => {
                                    const emptyIndex = formData.competitors.findIndex(c => !c.domain);
                                    if (emptyIndex !== -1) {
                                        const newComps = [...formData.competitors];
                                        newComps[emptyIndex] = { domain: suggestion.domain };
                                        updateForm('competitors', newComps);
                                    }
                                }}
                                className="px-3 py-1.5 bg-white hover:bg-red-600 border border-slate-200 hover:border-red-600 text-slate-600 hover:text-white text-xs font-bold rounded-full transition-all shadow-sm"
                            >
                                + {suggestion.domain}
                            </button>
                        ))
                    }
                </div>
            )}
        </div>
    </div>
);

const StepVoice = ({ formData, updateForm }) => (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
        <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">Brand Voice</h2>
            <p className="text-base text-slate-600">Determine how your AI reports and interactions will sound.</p>
        </div>
        <div className="space-y-8">
            <div className="p-8 bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-100/50">
                <div className="flex justify-between mb-6">
                    <div className="text-center">
                        <span className="block text-sm font-bold text-slate-900">Professional</span>
                        <span className="text-xs text-slate-400 uppercase tracking-widest mt-1">Corporate & Formal</span>
                    </div>
                    <div className="text-center">
                        <span className="block text-sm font-bold text-slate-900">Casual</span>
                        <span className="text-xs text-slate-400 uppercase tracking-widest mt-1">Friendly & Bold</span>
                    </div>
                </div>
                <div className="relative pt-2 pb-6">
                    <div className="absolute top-1/2 -translate-y-1/2 w-full h-1 bg-slate-100 rounded-full" />
                    <input
                        type="range"
                        min="1"
                        max="5"
                        value={formData.brandTone || 3}
                        onChange={(e) => updateForm('brandTone', parseInt(e.target.value))}
                        className="relative w-full h-8 bg-transparent appearance-none cursor-pointer accent-red-600 focus:outline-none"
                    />
                    <div className="flex justify-between mt-4 px-1">
                        {[1, 2, 3, 4, 5].map(v => (
                            <div key={v} className={`w-1.5 h-1.5 rounded-full ${formData.brandTone >= v ? 'bg-red-600 shadow-[0_0_8px_rgba(220,38,38,0.5)]' : 'bg-slate-200'}`} />
                        ))}
                    </div>
                </div>
            </div>

            <div className="p-6 bg-red-50 border border-red-100 rounded-2xl flex gap-4">
                <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center shrink-0">
                    <SparklesIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                    <h4 className="font-bold text-slate-900">Adaptive AI Intelligence</h4>
                    <p className="text-sm text-slate-600 mt-1">Your selection will fine-tune the Gemini LLM for all future data extractions and reports.</p>
                </div>
            </div>
        </div>
    </div>
);

export default function Onboarding() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const [isEnriching, setIsEnriching] = useState(false);
    const [enrichedData, setEnrichedData] = useState(null);
    const [aiLoading, setAiLoading] = useState(false);
    const { toast } = useToast();

    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const isSubmitting = React.useRef(false);

    // Redirect already onboarded users to report generation
    useEffect(() => {
        if (user?.onboardingCompleted && !isSubmitting.current) {
            navigate('/generating-report');
        }
    }, [user, navigate]);

    const handleLogoutAndHome = async () => {
        try {
            await auth.signOut();
            navigate('/');
        } catch (error) {
            console.error("Logout failed", error);
            navigate('/');
        }
    };

    // Handler for website enrichment - now with FULL intelligence
    const handleEnrichWebsite = async (url) => {
        if (!url) {
            toast({
                title: "URL Required",
                description: "Please enter a website URL first",
                variant: "destructive"
            });
            return;
        }

        setIsEnriching(true);
        try {
            // Enhanced enrichWebsiteData now returns industry + competitors too!
            const result = await enrichWebsiteData(url);

            if (result.success) {
                setEnrichedData(result);

                // Auto-fill ALL available fields from the single API call
                setFormData(prev => ({
                    ...prev,
                    brandName: result.brandName || prev.brandName,
                    tagline: result.tagline || prev.tagline,
                    description: result.description || result.tagline || prev.description,
                    logo: result.logo || prev.logo,
                    industry: result.industry || prev.industry,
                    // Pre-fill competitors if returned
                    competitors: result.competitors?.length > 0
                        ? [...result.competitors.map(c => ({ domain: c.domain || c })), { domain: '' }].slice(0, 3)
                        : prev.competitors,
                    suggestedCompetitors: result.competitors || prev.suggestedCompetitors
                }));

                // Background: Suggest audience based on industry
                if (result.industry) {
                    suggestAudience(result.industry, result.content).then(audResult => {
                        if (audResult.success) {
                            setFormData(prev => ({
                                ...prev,
                                persona: prev.persona || audResult.persona,
                                painPoint: prev.painPoint || audResult.painPoint
                            }));
                        }
                    });

                    // Background: Generate topics
                    generateTopics(result.industry).then(topicsResult => {
                        if (topicsResult.success) {
                            setFormData(prev => ({ ...prev, relatedTopics: topicsResult.topics }));
                        }
                    });

                    // Background: Suggest USP/Moat
                    suggestMoat(result.brandName, result.tagline, result.industry).then(moatResult => {
                        if (moatResult.success) {
                            setFormData(prev => ({ ...prev, moat: prev.moat || moatResult.moat }));
                        }
                    });
                }

                toast({
                    title: "✨ Magic Complete!",
                    description: "All fields auto-filled from your website"
                });
            } else {
                toast({
                    title: "Scan Failed",
                    description: result.error || "Could not analyze website",
                    variant: "destructive"
                });
            }
        } catch (error) {
            console.error("Enrichment error:", error);
            toast({
                title: "Error",
                description: "Failed to analyze website",
                variant: "destructive"
            });
        } finally {
            setIsEnriching(false);
        }
    };

    const [formData, setFormData] = useState({
        websiteUrl: '',
        brandName: '',
        tagline: '',
        description: '',
        logo: '',
        headquarters: '',
        industry: '',
        persona: '',
        painPoint: '',
        moat: '',
        platforms: [],
        relatedTopics: [],
        competitors: [{ domain: '' }, { domain: '' }, { domain: '' }],
        suggestedCompetitors: [],
        brandTone: 3
    });

    const updateForm = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleNext = async () => {
        if (currentStep < steps.length - 1) {
            // Trigger AI intelligence at specific steps
            if (currentStep === 2) { // Transitioning from Focus & Audience (3) to Competition (4)
                if (formData.industry && formData.relatedTopics.length === 0) {
                    fetchRelatedTopics();
                }
            }
            if (currentStep === 3) { // Before Competition step
                fetchCompetitors();
                // Also suggest moat
                suggestMoat(formData.brandName, formData.description, formData.industry).then(moatResult => {
                    if (moatResult.success) {
                        setFormData(prev => ({ ...prev, moat: moatResult.moat }));
                    }
                });
            }
            setCurrentStep(prev => prev + 1);
        } else {
            await finishOnboarding();
        }
    };

    const fetchRelatedTopics = async () => {
        if (!formData.industry) return;
        setAiLoading(true);
        try {
            const { success, topics } = await generateTopics(formData.industry);
            if (success) {
                setFormData(prev => ({ ...prev, relatedTopics: topics }));
            }
        } catch (e) {
            console.error("Topic fetching failed", e);
        } finally {
            setAiLoading(false);
        }
    };

    const fetchCompetitors = async () => {
        if (formData.industry && formData.websiteUrl) {
            setAiLoading(true);
            try {
                const { success, competitors } = await findCompetitors(
                    formData.industry,
                    formData.headquarters || 'Global',
                    formData.brandName,
                    enrichedData?.content
                );
                if (success) {
                    setFormData(prev => ({ ...prev, suggestedCompetitors: competitors }));
                }
            } catch (e) {
                console.error("Competitor fetch failed", e);
            } finally {
                setAiLoading(false);
            }
        }
    };

    const finishOnboarding = async () => {
        if (loading) return;
        setLoading(true);
        isSubmitting.current = true;
        try {
            const workspaceRef = await addDoc(collection(db, "workspaces"), {
                ownerId: user.uid,
                name: formData.brandName || "My Workspace",
                domain: formData.websiteUrl,
                ...formData,
                createdAt: new Date()
            });

            await setDoc(doc(db, "users", user.uid), {
                email: user.email,
                onboardingCompleted: true,
                workspaceId: workspaceRef.id,
                role: 'owner',
                createdAt: new Date()
            }, { merge: true });

            // Redirect to report generation instead of showing modal
            navigate('/generating-report');
        } catch (error) {
            console.error("Onboarding failed:", error);
            isSubmitting.current = false;
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-red-100 relative overflow-hidden">
            {/* Google-style Animated Background */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-200/30 rounded-full blur-[100px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-red-200/30 rounded-full blur-[100px] animate-pulse delay-1000" />
                <div className="absolute top-[40%] left-[40%] w-[30%] h-[30%] bg-blue-200/20 rounded-full blur-[80px] animate-pulse delay-500" />
            </div>

            {/* Header */}
            <header className="h-20 flex items-center justify-between px-8 lg:px-12 fixed w-full top-0 z-50 bg-white/80 backdrop-blur-md border-b border-white/50">
                <div
                    className="flex items-center gap-3 cursor-pointer"
                    onClick={handleLogoutAndHome}
                >
                    <img src="/brand-logo.png" alt="Logo" className="w-7 h-7 object-contain" />
                    <span className="text-lg font-bold text-slate-900">AI Discovery</span>
                </div>
                <div className="text-sm font-medium text-slate-500">
                    Step {currentStep + 1} of {steps.length}
                </div>
            </header>

            <main className="flex-1 pt-32 pb-20 px-4 md:px-8 relative z-10 max-w-5xl mx-auto w-full">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
                    {/* Left Panel: Steps */}
                    <div className="hidden lg:block w-64 shrink-0 space-y-8 fixed mt-8">
                        <div className="space-y-1">
                            {steps.map((step, index) => (
                                <div key={step.id} className="relative pl-6">
                                    {/* Line */}
                                    {index !== steps.length - 1 && (
                                        <div className={`absolute left-[11px] top-6 bottom-[-24px] w-0.5 ${index < currentStep ? 'bg-red-600' : 'bg-slate-200'}`} />
                                    )}
                                    {/* Dot */}
                                    <div className={`absolute left-0 top-1.5 w-[22px] h-[22px] rounded-full border-2 flex items-center justify-center transition-all ${index < currentStep ? 'bg-red-600 border-red-600' :
                                        index === currentStep ? 'bg-white border-red-600 ring-2 ring-red-100' :
                                            'bg-white border-slate-300'
                                        }`}>
                                        {index < currentStep && <Check className="w-3 h-3 text-white" />}
                                        {index === currentStep && <div className="w-2 h-2 bg-red-600 rounded-full" />}
                                    </div>
                                    <div className={`transition-all ${index === currentStep ? 'opacity-100 translate-x-1' : 'opacity-60'}`}>
                                        <p className={`text-sm font-bold ${index === currentStep ? 'text-slate-900' : 'text-slate-500'}`}>{step.title}</p>
                                        <p className="text-xs text-slate-400">{step.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Panel: Form */}
                    <div className="flex-1 lg:pl-80">
                        <div className="relative">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentStep}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {currentStep === 0 && <StepIdentity formData={formData} updateForm={updateForm} onEnrichWebsite={handleEnrichWebsite} isEnriching={isEnriching} />}
                                    {currentStep === 1 && <StepLocation formData={formData} updateForm={updateForm} />}
                                    {currentStep === 2 && <StepFocus formData={formData} updateForm={updateForm} isAiProcessing={aiLoading} suggestions={enrichedData} />}
                                    {currentStep === 3 && <StepCompetition formData={formData} updateForm={updateForm} aiLoading={aiLoading} />}
                                    {currentStep === 4 && <StepVoice formData={formData} updateForm={updateForm} />}
                                </motion.div>
                            </AnimatePresence>

                            <div className="mt-10 flex items-center justify-between pt-6 border-t border-slate-200">
                                <Button
                                    variant="ghost"
                                    onClick={() => setCurrentStep(prev => prev - 1)}
                                    disabled={currentStep === 0 || loading}
                                    className="text-slate-500 hover:text-slate-900"
                                >
                                    <ArrowLeft className="w-4 h-4 mr-2" /> Back
                                </Button>

                                <Button
                                    onClick={handleNext}
                                    disabled={loading}
                                    className={`h-11 px-8 rounded-full text-sm font-semibold shadow-lg transition-all transform active:scale-95 ${loading
                                        ? 'bg-slate-100 text-slate-400'
                                        : 'bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white shadow-red-200 scale-100'
                                        }`}
                                >
                                    {loading ? (
                                        <div className="flex items-center gap-2">
                                            <Loader2 className="w-3.5 h-3.5 animate-spin" /> Saving...
                                        </div>
                                    ) : (
                                        currentStep === steps.length - 1 ? 'Generate Your Report' : 'Continue'
                                    )}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
