import React, { useState, useEffect } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { db } from '@/lib/firebase';
import { localDB } from "@/lib/local-db";
import { collection, query, where, getDocs, orderBy, addDoc } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Download, FileText, Calendar, Sparkles, TrendingUp } from 'lucide-react';
import { generateVisibilityReport, downloadPDF } from '@/lib/pdf-generator';

export default function Reports() {
    const { user } = useAuth();
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(null);
    const [generating, setGenerating] = useState(false);

    useEffect(() => {
        fetchReports();
        fetchUserData();
    }, [user]);

    const fetchUserData = async () => {
        if (!user) return;

        try {
            const userDoc = await getDocs(query(collection(db, 'users'), where('__name__', '==', user.uid)));
            if (!userDoc.empty) {
                const workspaceId = userDoc.docs[0].data().workspaceId;
                if (workspaceId) {
                    const workspaceDoc = await getDocs(query(collection(db, 'workspaces'), where('__name__', '==', workspaceId)));
                    if (!workspaceDoc.empty) {
                        setUserData(workspaceDoc.docs[0].data());
                    }
                }
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const fetchReports = async () => {
        if (!user) return;

        try {
            // Fetch from Local DB First (Fast & Instant)
            const localReports = localDB.getReports(user.uid);

            // If we have local reports, use them immediately
            if (localReports.length > 0) {
                setReports(localReports);
            }
            // Optional: You could still fetch from Firestore here to sync

        } catch (error) {
            console.error('Error fetching reports:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDownloadReport = (report) => {
        if (!userData) return;

        // Regenerate PDF from saved data
        const pdfBlob = generateVisibilityReport(userData);
        downloadPDF(pdfBlob, report.filename);
    };

    const handleGenerateNewReport = async () => {
        if (!userData) return;

        setGenerating(true);
        try {
            const pdfBlob = generateVisibilityReport(userData);
            const filename = `${userData.brandName?.replace(/\s+/g, '-') || 'brand'}-visibility-report-${new Date().toISOString().split('T')[0]}.pdf`;

            downloadPDF(pdfBlob, filename);

            // Save to Local DB
            localDB.saveReport({
                userId: user.uid,
                brandName: userData.brandName,
                filename: filename,
                type: 'visibility',
                size: pdfBlob.size
            });

            // Save to Firebase (Backup)
            await addDoc(collection(db, 'reports'), {
                userId: user.uid,
                brandName: userData.brandName,
                filename: filename,
                generatedAt: new Date(),
                type: 'visibility',
                size: pdfBlob.size
            });

            // Refresh reports list
            await fetchReports();
        } catch (error) {
            console.error('Error generating report:', error);
        } finally {
            setGenerating(false);
        }
    };

    const formatDate = (timestamp) => {
        if (!timestamp) return 'N/A';
        const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
        return new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    };

    const formatFileSize = (bytes) => {
        if (!bytes) return 'N/A';
        return `${(bytes / 1024).toFixed(1)} KB`;
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-8 h-8 border-4 border-red-200 border-t-red-600 rounded-full animate-spin"></div>
                    <p className="text-sm text-slate-500">Loading reports...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-8 max-w-6xl">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">Visibility Reports</h1>
                        <p className="text-slate-600 mt-2">
                            Track your AI search visibility across major platforms
                        </p>
                    </div>
                    <Button
                        onClick={handleGenerateNewReport}
                        disabled={generating || !userData}
                        className="bg-red-600 hover:bg-red-700 text-white px-6"
                    >
                        {generating ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                                Generating...
                            </>
                        ) : (
                            <>
                                <Sparkles className="w-4 h-4 mr-2" />
                                Generate New Report
                            </>
                        )}
                    </Button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-6 border border-red-100">
                    <div className="flex items-center justify-between mb-3">
                        <FileText className="w-8 h-8 text-red-600" />
                        <div className="px-3 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full">
                            Total
                        </div>
                    </div>
                    <div className="text-3xl font-bold text-slate-900">{reports.length}</div>
                    <div className="text-sm text-slate-600 mt-1">Reports Generated</div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100">
                    <div className="flex items-center justify-between mb-3">
                        <Calendar className="w-8 h-8 text-blue-600" />
                        <div className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                            Latest
                        </div>
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                        {reports.length > 0 ? new Date(reports[0].generatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'N/A'}
                    </div>
                    <div className="text-sm text-slate-600 mt-1">Last Report Date</div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
                    <div className="flex items-center justify-between mb-3">
                        <TrendingUp className="w-8 h-8 text-green-600" />
                        <div className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                            Avg
                        </div>
                    </div>
                    <div className="text-3xl font-bold text-slate-900">73%</div>
                    <div className="text-sm text-slate-600 mt-1">Visibility Score</div>
                </div>
            </div>

            {/* Reports List */}
            <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-4">All Reports</h2>

                {reports.length === 0 ? (
                    <div className="bg-white rounded-2xl border-2 border-dashed border-slate-200 p-12 text-center">
                        <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-slate-900 mb-2">No reports yet</h3>
                        <p className="text-slate-500 mb-6">
                            Your first report was generated during onboarding. Generate a new one to see it here.
                        </p>
                        <Button
                            onClick={handleGenerateNewReport}
                            disabled={generating || !userData}
                            className="bg-red-600 hover:bg-red-700 text-white"
                        >
                            <Sparkles className="w-4 h-4 mr-2" />
                            Generate Your First Report
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {reports.map((report) => (
                            <div
                                key={report.id}
                                className="bg-white rounded-xl border border-slate-200 hover:border-red-200 hover:shadow-md transition-all p-6 flex items-center justify-between"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center">
                                        <FileText className="w-6 h-6 text-red-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-slate-900">
                                            {report.brandName || 'Visibility Report'}
                                        </h3>
                                        <div className="flex items-center gap-3 mt-1">
                                            <span className="text-sm text-slate-500">
                                                <Calendar className="w-3.5 h-3.5 inline mr-1" />
                                                {formatDate(report.generatedAt)}
                                            </span>
                                            <span className="text-sm text-slate-400">•</span>
                                            <span className="text-sm text-slate-500">
                                                {formatFileSize(report.size)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <Button
                                    onClick={() => handleDownloadReport(report)}
                                    variant="outline"
                                    className="border-slate-200 hover:border-red-500 hover:text-red-600"
                                >
                                    <Download className="w-4 h-4 mr-2" />
                                    Download
                                </Button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
