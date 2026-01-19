import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/lib/AuthContext';
import { db } from '@/lib/firebase';
import { doc, setDoc, addDoc, collection } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { suggestCompetitors } from '@/lib/ai-agent';
import {
    Sparkles as SparklesIcon,
    ArrowRight,
    CheckCircle2,
    ArrowLeft,
    Loader2,
    Check,
    ChevronRight,
    MapPin,
    Search,
    Target
} from 'lucide-react';

const steps = [
    { id: 'experience', title: 'Experience', description: 'Your expertise level' },
    { id: 'identity', title: 'Identity', description: 'Brand details' },
    { id: 'geo', title: 'Geo Intelligence', description: 'Location targeting' },
    { id: 'authority', title: 'Topic Authority', description: 'Core subjects' },
    { id: 'competitors', title: 'Competitive Set', description: 'Market landscape' }
];

// --- Step Components (Defined Outside to prevent re-renders) ---

const StepExperience = ({ formData, updateForm }) => (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
        <div>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 mb-2">Your experience level</h2>
            <p className="text-base text-slate-500 font-light">Help us calibrate the AI models to your expertise.</p>
        </div>
        <div className="grid grid-cols-1 gap-3">
            {['Beginner', 'Intermediate', 'Expert'].map((level) => (
                <div
                    key={level}
                    onClick={() => updateForm('seoLevel', level.toLowerCase())}
                    className={`p-4 rounded-xl border transition-all cursor-pointer group ${formData.seoLevel === level.toLowerCase()
                        ? 'border-red-600 bg-red-50/50 shadow-sm ring-1 ring-red-100'
                        : 'border-slate-200 hover:border-red-200 hover:shadow-sm bg-white'
                        }`}
                >
                    <div className="flex items-center justify-between">
                        <span className={`text-base font-medium transition-colors ${formData.seoLevel === level.toLowerCase() ? 'text-red-700' : 'text-slate-700 group-hover:text-red-600'}`}>
                            {level}
                        </span>
                        {formData.seoLevel === level.toLowerCase() && <Check className="w-5 h-5 text-red-600" />}
                    </div>
                </div>
            ))}
        </div>
        <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer">
            <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${formData.isAgency ? 'bg-red-600 border-red-600' : 'border-slate-300'}`}>
                {formData.isAgency && <Check className="w-3 h-3 text-white" />}
            </div>
            <input
                type="checkbox"
                className="hidden"
                checked={formData.isAgency}
                onChange={(e) => updateForm('isAgency', e.target.checked)}
            />
            <span className="text-slate-700 font-medium text-sm">I'm operating as an agency</span>
        </label>
    </div>
);

const StepIdentity = ({ formData, updateForm }) => (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
        <div>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 mb-2">Brand Identity</h2>
            <p className="text-base text-slate-500 font-light">Defining the core entity for the Knowledge Graph.</p>
        </div>
        <div className="space-y-4">
            <div className="group">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block group-focus-within:text-red-600 transition-colors">Brand Name</span>
                <Input
                    value={formData.brandName}
                    onChange={(e) => updateForm('brandName', e.target.value)}
                    placeholder="Camana Homes"
                    className="h-12 text-base bg-white border-slate-200 focus:border-red-500 focus:ring-red-100 transition-all rounded-xl px-4 shadow-sm"
                />
            </div>
            <div className="group">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block group-focus-within:text-red-600 transition-colors">Website URL</span>
                <Input
                    value={formData.websiteUrl}
                    onChange={(e) => updateForm('websiteUrl', e.target.value)}
                    placeholder="https://camanahomes.com"
                    className="h-12 text-base bg-white border-slate-200 focus:border-red-500 focus:ring-red-100 transition-all rounded-xl px-4 shadow-sm"
                />
            </div>
            <div className="group">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block group-focus-within:text-red-600 transition-colors">Mission Statement</span>
                <Input
                    value={formData.tagline}
                    onChange={(e) => updateForm('tagline', e.target.value)}
                    placeholder="Empowering modern families..."
                    className="h-12 text-base bg-white border-slate-200 focus:border-red-500 focus:ring-red-100 transition-all rounded-xl px-4 shadow-sm"
                />
            </div>
        </div>
    </div>
);

const StepGeo = ({ formData, updateForm }) => (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
        <div>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 mb-2">Geo Intelligence</h2>
            <p className="text-base text-slate-500 font-light">Pinpointing location for local graph authority.</p>
        </div>
        <div className="space-y-5">
            <div className="group">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block group-focus-within:text-red-600 transition-colors">Primary HQ</span>
                <div className="relative">
                    <MapPin className="absolute left-4 top-3 w-5 h-5 text-slate-300 group-focus-within:text-red-500 transition-colors" />
                    <Input
                        value={formData.primaryLocation}
                        onChange={(e) => updateForm('primaryLocation', e.target.value)}
                        placeholder="San Francisco, CA"
                        className="h-12 text-base pl-11 bg-white border-slate-200 focus:border-red-500 focus:ring-red-100 transition-all rounded-xl shadow-sm"
                    />
                </div>
            </div>

            <div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 block">Reach Scope</span>
                <div className="flex flex-wrap gap-2">
                    {['Neighborhood', 'City', 'Regional', 'National', 'Global'].map(scope => (
                        <button
                            key={scope}
                            onClick={() => {
                                const newRegions = formData.targetRegions.includes(scope)
                                    ? formData.targetRegions.filter(r => r !== scope)
                                    : [...formData.targetRegions, scope];
                                updateForm('targetRegions', newRegions);
                            }}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${formData.targetRegions.includes(scope)
                                ? 'bg-red-600 text-white shadow-md shadow-red-200'
                                : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                                }`}
                        >
                            {scope}
                        </button>
                    ))}
                </div>
            </div>

            <div className="group">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block group-focus-within:text-red-600 transition-colors">Target Service Areas</span>
                <Input
                    value={formData.serviceAreas}
                    onChange={(e) => updateForm('serviceAreas', e.target.value)}
                    placeholder="Mission District, Noe Valley, SoMa"
                    className="h-12 text-base bg-white border-slate-200 focus:border-red-500 focus:ring-red-100 transition-all rounded-xl px-4 shadow-sm"
                />
            </div>
        </div>
    </div>
);

const StepAuthority = ({ formData, updateForm }) => (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
        <div>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 mb-2">Topic Authority</h2>
            <p className="text-base text-slate-500 font-light">Establishing your niche in the AI knowledge base.</p>
        </div>
        <div className="space-y-4">
            <div className="group">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block group-focus-within:text-red-600 transition-colors">Core Topics</span>
                <div className="relative">
                    <Search className="absolute left-4 top-3 w-5 h-5 text-slate-300 group-focus-within:text-red-500 transition-colors" />
                    <Input
                        value={formData.coreTopics}
                        onChange={(e) => updateForm('coreTopics', e.target.value)}
                        placeholder="Luxury Real Estate, AI Automation"
                        className="h-12 text-base pl-11 bg-white border-slate-200 focus:border-red-500 focus:ring-red-100 transition-all rounded-xl shadow-sm"
                    />
                </div>
            </div>
            <div className="group">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block group-focus-within:text-red-600 transition-colors">Ideal Persona</span>
                <div className="relative">
                    <Target className="absolute left-4 top-3 w-5 h-5 text-slate-300 group-focus-within:text-red-500 transition-colors" />
                    <Input
                        value={formData.targetAudience}
                        onChange={(e) => updateForm('targetAudience', e.target.value)}
                        placeholder="Tech Executives, First-time Investors"
                        className="h-12 text-base pl-11 bg-white border-slate-200 focus:border-red-500 focus:ring-red-100 transition-all rounded-xl shadow-sm"
                    />
                </div>
            </div>
        </div>
    </div>
);

const StepCompetitors = ({ formData, updateForm, aiLoading }) => (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
        <div>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 mb-2">Competitive Set</h2>
            <p className="text-base text-slate-500 font-light">Benchmarking against industry leaders.</p>
        </div>

        <div className="space-y-3">
            {formData.competitors.map((comp, index) => (
                <div key={index} className="group">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 block">Competitor {index + 1}</span>
                    <Input
                        value={comp}
                        onChange={(e) => {
                            const newComps = [...formData.competitors];
                            newComps[index] = e.target.value;
                            updateForm('competitors', newComps);
                        }}
                        placeholder={`https://competitor-${index + 1}.com`}
                        className="h-12 text-base bg-white border-slate-200 focus:border-red-500 focus:ring-red-100 transition-all rounded-xl px-4 shadow-sm"
                    />
                </div>
            ))}
        </div>

        <div className="pt-4 border-t border-slate-100">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <SparklesIcon className="w-4 h-4 text-purple-500" />
                AI Explorer Suggestions
            </h3>
            {aiLoading ? (
                <div className="p-4 rounded-xl bg-purple-50/50 border border-purple-100 flex items-center justify-center gap-2 text-purple-700">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm font-medium animate-pulse">Scanning knowledge graph...</span>
                </div>
            ) : (
                <div className="flex flex-wrap gap-2">
                    {formData.suggestedCompetitors.length > 0 ? formData.suggestedCompetitors.map((suggestion, i) => (
                        <button
                            key={i}
                            onClick={() => {
                                const emptyIndex = formData.competitors.findIndex(c => c === '');
                                if (emptyIndex !== -1) {
                                    const newComps = [...formData.competitors];
                                    newComps[emptyIndex] = suggestion.domain;
                                    updateForm('competitors', newComps);
                                }
                            }}
                            className="px-3 py-1.5 bg-white hover:bg-purple-50 hover:border-purple-200 border border-slate-200 text-slate-600 hover:text-purple-700 text-xs font-medium rounded-full cursor-pointer transition-all shadow-sm flex items-center gap-1"
                        >
                            <span>+</span>
                            {suggestion.domain}
                        </button>
                    )) : (
                        <span className="text-xs text-slate-400 italic pl-1">
                            Enter your URL and topics to see suggestions.
                        </span>
                    )}
                </div>
            )}
        </div>
    </div>
);

export default function Onboarding() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const [aiLoading, setAiLoading] = useState(false);

    const [formData, setFormData] = useState({
        seoLevel: '',
        isAgency: false,
        brandName: '',
        websiteUrl: '',
        tagline: '',
        primaryLocation: '',
        targetRegions: [],
        serviceAreas: '',
        coreTopics: '',
        targetAudience: '',
        competitors: ['', '', ''],
        suggestedCompetitors: []
    });

    const updateForm = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleNext = async () => {
        if (currentStep < steps.length - 1) {
            if (currentStep === 3) {
                fetchCompetitors();
            }
            setCurrentStep(prev => prev + 1);
        } else {
            await finishOnboarding();
        }
    };

    const fetchCompetitors = async () => {
        if (formData.websiteUrl && formData.coreTopics) {
            setAiLoading(true);
            try {
                const suggestions = await suggestCompetitors(formData.websiteUrl, formData.coreTopics, formData.primaryLocation);
                setFormData(prev => ({ ...prev, suggestedCompetitors: suggestions }));
            } catch (e) {
                console.error("AI fetch failed", e);
            } finally {
                setAiLoading(false);
            }
        }
    }

    const finishOnboarding = async () => {
        setLoading(true);
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

            navigate('/generating-report');
        } catch (error) {
            console.error("Onboarding failed:", error);
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
                <div className="flex items-center gap-3">
                    <img src="/brand-logo.png" alt="Logo" className="w-7 h-7 object-contain" />
                    <span className="font-bold text-lg text-slate-900 tracking-tight">Camana Homes</span>
                </div>

                <div className="flex items-center gap-4">
                    <div className="h-1.5 w-32 bg-slate-100 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-red-600 transition-all duration-700 ease-out rounded-full shadow-[0_0_10px_rgba(220,38,38,0.5)]"
                            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                        />
                    </div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        Step {currentStep + 1} of {steps.length}
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex flex-col items-center justify-center pt-24 pb-16 px-4 relative z-10">
                <div className="w-full max-w-lg">
                    {/* Card Container */}
                    <div className="bg-white/80 backdrop-blur-sm shadow-xl shadow-slate-200/50 rounded-3xl p-8 border border-white">
                        <div className="min-h-[380px] flex flex-col">
                            <div className="flex-1">
                                {currentStep === 0 && <StepExperience formData={formData} updateForm={updateForm} />}
                                {currentStep === 1 && <StepIdentity formData={formData} updateForm={updateForm} />}
                                {currentStep === 2 && <StepGeo formData={formData} updateForm={updateForm} />}
                                {currentStep === 3 && <StepAuthority formData={formData} updateForm={updateForm} />}
                                {currentStep === 4 && <StepCompetitors formData={formData} updateForm={updateForm} aiLoading={aiLoading} />}
                            </div>

                            <div className="mt-8 flex items-center justify-between pt-6 border-t border-slate-50">
                                <Button
                                    variant="ghost"
                                    onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
                                    disabled={currentStep === 0}
                                    className="text-slate-400 hover:text-slate-900 hover:bg-transparent font-medium px-0 disabled:opacity-30 transition-colors"
                                >
                                    ← Back
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
                                        currentStep === steps.length - 1 ? 'Finish Setup' : 'Continue'
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
