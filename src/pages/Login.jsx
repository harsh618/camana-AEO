import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { toast } = useToast();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/dashboard');
        } catch (error) {
            toast({
                title: "Login Failed",
                description: error.message,
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setLoading(true);
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            // Check if user document exists
            const userDoc = await getDoc(doc(db, "users", user.uid));

            if (!userDoc.exists()) {
                // New user - create record (treat as signup)
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
                    navigate('/dashboard');
                } else {
                    navigate('/onboarding');
                }
            }
        } catch (error) {
            console.error(error);
            toast({
                title: "Google Login Failed",
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
                    <Link to="/" className="absolute top-8 left-8 inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Link>

                    <div className="text-center lg:text-left mt-12">
                        <Link to="/" className="inline-flex items-center gap-2 mb-8">
                            <img src="/brand-logo.png" alt="AI Discovery" className="w-8 h-8 object-contain" />
                            <span className="text-xl font-bold text-slate-900">AI Discovery</span>
                        </Link>
                        <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome Back</h1>
                        <p className="text-slate-500">Enter your details to access your dashboard.</p>
                    </div>

                    <div className="space-y-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleGoogleLogin}
                            disabled={loading}
                            className="w-full h-12 rounded-xl text-base font-medium border-slate-200 hover:bg-slate-50 hover:text-slate-900 text-slate-700 flex items-center justify-center gap-2"
                        >
                            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
                            Sign in with Google
                        </Button>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-slate-200" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-white px-2 text-slate-500">Or sign in with email</span>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-900">Email</label>
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
                            <label className="text-sm font-medium text-slate-900">Password</label>
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
                            {loading ? "Signing in..." : "Sign In"}
                        </Button>
                    </form>

                    <p className="text-center text-sm text-slate-500">
                        Don't have an account?{' '}
                        <Link to="/signup" className="text-red-600 hover:text-red-700 font-medium">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>

            {/* Right Panel - Branding */}
            <div className="hidden lg:flex flex-1 bg-slate-900 relative">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(253,45,21,0.2),transparent_50%)]" />
                <div className="flex-1 flex flex-col justify-center p-12 text-white relative z-10">
                    <div className="max-w-md mx-auto">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-600/10 border border-red-500/20 text-red-400 text-sm font-medium mb-8">
                            <Sparkles className="w-4 h-4" />
                            AI Visibility Engine
                        </div>
                        <h2 className="text-4xl font-bold mb-6">Dominate AI Search Results</h2>
                        <p className="text-lg text-slate-400 leading-relaxed mb-8">
                            Join thousands of brands tracking their visibility across ChatGPT, Claude, Gemini, and more.
                        </p>
                        <div className="grid gap-6">
                            {[
                                'Real-time visibility tracking',
                                'Competitor benchmarking',
                                'AI content optimization',
                                'Automated reporting'
                            ].map((feature, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center">
                                        <ArrowRight className="w-4 h-4 text-red-500" />
                                    </div>
                                    <span className="text-slate-300">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}
