import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/AuthContext';
import {
    LayoutDashboard,
    Bot,
    Eye,
    MessageSquare,
    Share2,
    BarChart3,
    Files,
    Search,
    FileText,
    Activity,
    AlertTriangle,
    BookOpen,
    Bell,
    GraduationCap,
    LogOut,
    FileBarChart
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function DashboardLayout() {
    const { user, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [showProfileMenu, setShowProfileMenu] = React.useState(false);

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    const isActive = (path) => location.pathname === path;

    const NavItem = ({ to, icon: Icon, label, disabled, comingSoon }) => {
        const navContent = (
            <div className={`flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium transition-colors group ${isActive(to)
                ? 'bg-slate-100 text-slate-900'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
                <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    {label}
                </div>
                {comingSoon && (
                    <span className="text-[10px] px-2 py-0.5 bg-slate-200 text-slate-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                        Coming Soon
                    </span>
                )}
            </div>
        );

        if (disabled) {
            return <div className="relative">{navContent}</div>;
        }

        return (
            <Link to={to}>
                {navContent}
            </Link>
        );
    };

    const GroupLabel = ({ label }) => (
        <div className="px-3 mt-6 mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
            {label}
        </div>
    );

    return (
        <div className="flex h-screen bg-white">
            {/* Sidebar */}
            <aside className="w-64 border-r border-slate-100 flex flex-col pt-6 pb-4">
                <div className="px-6 mb-8 flex items-center gap-2">
                    <img src="/brand-logo.png" alt="Logo" className="w-6 h-6 object-contain" />
                    <span className="font-bold text-slate-900">Camana Homes</span>
                </div>

                <div className="flex-1 overflow-y-auto px-3 space-y-1">
                    <NavItem to="/dashboard/reports" icon={FileBarChart} label="Reports" />
                    <NavItem to="/dashboard/agent" icon={Bot} label="Agent" disabled comingSoon />

                    <GroupLabel label="Analytics" />
                    <NavItem to="/dashboard/visibility" icon={Eye} label="Visibility" disabled comingSoon />
                    <NavItem to="/dashboard/mentions" icon={MessageSquare} label="Mentions" disabled comingSoon />
                    <NavItem to="/dashboard/sources" icon={Share2} label="Sources" disabled comingSoon />
                    <NavItem to="/dashboard/traffic" icon={BarChart3} label="Traffic" disabled comingSoon />

                    <GroupLabel label="Prompts" />
                    <NavItem to="/dashboard/prompts" icon={Files} label="Your Prompts" disabled comingSoon />
                    <NavItem to="/dashboard/research" icon={Search} label="Prompt Research" disabled comingSoon />

                    <GroupLabel label="Content" />
                    <NavItem to="/dashboard/articles" icon={FileText} label="Articles" disabled comingSoon />

                    <GroupLabel label="On-Page" />
                    <NavItem to="/dashboard/health" icon={Activity} label="Site Health" disabled comingSoon />
                    <NavItem to="/dashboard/issues" icon={AlertTriangle} label="Issues" disabled comingSoon />
                </div>

                <div className="mt-auto px-3 pt-4 border-t border-slate-100 space-y-1">
                    <div className="px-3 py-2 flex items-center gap-3 text-sm font-medium text-slate-600 cursor-pointer hover:text-slate-900">
                        <BookOpen className="w-4 h-4" />
                        Knowledge Base
                    </div>

                    <div className="relative">
                        <div
                            onClick={() => setShowProfileMenu(!showProfileMenu)}
                            className="flex items-center gap-3 px-3 py-3 mt-2 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors"
                        >
                            <Avatar className="w-8 h-8 rounded-full border border-slate-200">
                                <AvatarImage src={user?.photoURL} />
                                <AvatarFallback className="bg-red-50 text-red-600 text-xs">
                                    {user?.email?.substring(0, 2).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                                <div className="text-sm font-medium text-slate-900 truncate">
                                    {user?.email?.split('@')[0] || 'User'}
                                </div>
                            </div>
                            <div className="text-slate-400">
                                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg" className={`transition-transform ${showProfileMenu ? 'rotate-180' : ''}`}>
                                    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </div>

                        {showProfileMenu && (
                            <div className="absolute bottom-full left-0 w-full mb-2 bg-white border border-slate-100 rounded-lg shadow-lg py-1 z-10 animate-in fade-in slide-in-from-bottom-2">
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-slate-50 flex items-center gap-2"
                                >
                                    <LogOut className="w-4 h-4" />
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 bg-white">
                {/* Header */}
                <header className="h-16 flex items-center justify-end px-8 border-b border-transparent">
                    <div className="flex items-center gap-4">
                        <button className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors">
                            <Bell className="w-3.5 h-3.5" />
                            13
                        </button>
                        <button className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors">
                            <GraduationCap className="w-3.5 h-3.5" />
                            Learn
                        </button>
                    </div>
                </header>

                <div className="flex-1 overflow-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
