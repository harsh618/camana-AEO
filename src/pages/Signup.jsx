import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { localDB } from "@/lib/local-db";
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { toast } = useToast();

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Create initial user record in Firestore
            await setDoc(doc(db, "users", user.uid), {
                email: user.email,
                createdAt: new Date(),
                plan: 'free_trial',
                role: 'owner', // Default role for new signups
                onboardingCompleted: false
            });

            // Save to Local DB (Backup & Fast Access)
            localDB.saveUser({
                uid: user.uid,
                email: user.email,
                plan: 'free_trial',
                role: 'owner',
                onboardingCompleted: false,
                createdAt: new Date().toISOString()
            });

            // toast({
            //     title: "Account created successfully",
            //     description: "Welcome to AI Discovery Engine! Let's get you set up.",
            // });
            navigate('/onboarding');
        } catch (error) {
            toast({
                title: "Signup Failed",
                description: error.message,
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignup = async () => {
        setLoading(true);
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            // Check if user document exists
            const userDoc = await getDoc(doc(db, "users", user.uid));

            if (!userDoc.exists()) {
                // New user - create record
                await setDoc(doc(db, "users", user.uid), {
                    email: user.email,
                    createdAt: new Date(),
                    plan: 'free_trial',
                    role: 'owner',
                    onboardingCompleted: false
                });
                navigate('/onboarding');
            } else {
                // Existing user
                if (userDoc.data().onboardingCompleted) {
                    navigate('/onboarding');
                } else {
                    navigate('/onboarding');
                }
            }
        } catch (error) {
            console.error(error);
            toast({
                title: "Google Signup Failed",
                description: error.message,
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col lg:flex-row">
            {/* Left Panel - Form */}
            <div className="flex-1 flex items-center justify-center p-8 bg-white">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center lg:text-left">
                        <Link to="/" className="inline-flex items-center gap-2 mb-8">
                            <img src="/brand-logo.png" alt="AI Discovery" className="w-8 h-8 object-contain" />
                            <span className="text-xl font-bold text-slate-900">Searchlyst</span>
                        </Link>
                        <h1 className="text-3xl font-bold text-slate-900 mb-2">Start Your Free Trial</h1>
                        <p className="text-slate-500">Get 14 days of free premium access. No credit card required.</p>
                    </div>

                    <div className="space-y-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleGoogleSignup}
                            disabled={loading}
                            className="w-full h-12 rounded-xl text-base font-medium border-slate-200 hover:bg-slate-50 hover:text-slate-900 text-slate-700 flex items-center justify-center gap-2"
                        >
                            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
                            Sign up with Google
                        </Button>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-slate-200" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-white px-2 text-slate-500">Or continue with email</span>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSignup} className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-900">Work Email</label>
                            <Input
                                type="email"
                                placeholder="name@company.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="bg-slate-50 border-slate-200 focus:border-red-500 focus:ring-red-500"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-900">Create Password</label>
                            <Input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="bg-slate-50 border-slate-200 focus:border-red-500 focus:ring-red-500"
                            />
                        </div>

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-red-600 hover:bg-red-700 text-white rounded-xl py-6"
                        >
                            {loading ? "Creating Account..." : "Create Account"}
                        </Button>
                    </form>

                    <p className="text-center text-sm text-slate-500">
                        Already have an account?{' '}
                        <Link to="/login" className="text-red-600 hover:text-red-700 font-medium">
                            Sign in
                        </Link>
                    </p>

                    {/* Social Proof */}
                    <div className="pt-8 border-t border-slate-100">
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Trusted by growth teams at</p>
                        <div className="flex gap-4 opacity-50 grayscale">
                            {/* Placeholders for logos if available, or just keeping the section structure */}
                            <div className="h-6 w-20 bg-slate-200 rounded"></div>
                            <div className="h-6 w-20 bg-slate-200 rounded"></div>
                            <div className="h-6 w-20 bg-slate-200 rounded"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Panel - Branding */}
            <div className="hidden lg:flex flex-1 bg-slate-900 relative">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(253,45,21,0.2),transparent_50%)]" />
                <div className="flex-1 flex flex-col justify-center p-12 text-white relative z-10">
                    <div className="max-w-md mx-auto space-y-8">
                        <h2 className="text-4xl font-bold">See What You've Been Missing</h2>

                        <div className="space-y-4">
                            {[
                                { title: 'Full Visibility Audit', desc: 'See where you rank on 5+ AI platforms' },
                                { title: 'Competitor Analysis', desc: 'Track up to 10 competitors daily' },
                                { title: 'Smart Recommendations', desc: 'AI-driven tips to improve citations' }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                                    <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                                        <CheckCircle2 className="w-5 h-5 text-red-500" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-white">{item.title}</h3>
                                        <p className="text-sm text-slate-400">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="p-6 rounded-2xl bg-gradient-to-br from-red-600 to-red-800 text-white">
                            <div className="flex gap-1 mb-2">
                                {[1, 2, 3, 4, 5].map(i => <Sparkles key={i} className="w-4 h-4 text-yellow-400 fill-current" />)}
                            </div>
                            <p className="italic mb-4">"We doubled our traffic from Claude and ChatGPT in just one month. Essential tool."</p>
                            <div className="text-sm font-semibold opacity-80">- Alex R., Head of SEO</div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
}
