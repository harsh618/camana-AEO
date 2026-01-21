import React from 'react';
import { Rocket, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";

export default function ComingSoon() {
    const navigate = useNavigate();

    return (
        <div className="h-full flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-500">
            <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mb-6">
                <Rocket className="w-12 h-12 text-red-600" />
            </div>

            <h1 className="text-3xl font-bold text-slate-900 mb-3">Coming Soon</h1>
            <p className="text-slate-500 max-w-md mb-8">
                We're working hard to bring you this feature.
                Stay tuned for updates as we expand Searchlyst.
            </p>

            <Button
                onClick={() => navigate('/dashboard/agent')}
                variant="outline"
                className="gap-2"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
            </Button>
        </div>
    );
}
