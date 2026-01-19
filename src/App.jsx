import { Suspense, lazy } from 'react';
import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import NavigationTracker from '@/lib/NavigationTracker'
import { pagesConfig } from './pages.config'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';

// Lazy Load Components for Performance
const Login = lazy(() => import('@/pages/Login'));
const Signup = lazy(() => import('@/pages/Signup'));
const Onboarding = lazy(() => import('@/pages/Onboarding'));
const ReportGeneration = lazy(() => import('@/pages/ReportGeneration'));
const AboutUs = lazy(() => import('@/pages/AboutUs'));


// Dashboard Components
const DashboardLayout = lazy(() => import('@/layouts/DashboardLayout'));
const AgentDashboard = lazy(() => import('@/pages/dashboard/AgentDashboard'));
const ComingSoon = lazy(() => import('@/pages/dashboard/ComingSoon'));
const Reports = lazy(() => import('@/pages/dashboard/Reports'));

const { Pages, Layout, mainPage } = pagesConfig;
const mainPageKey = mainPage ?? Object.keys(Pages)[0];
const MainPage = Pages[mainPageKey];

const LayoutWrapper = ({ children, currentPageName }) => {
  return Layout ? <Layout currentPageName={currentPageName}>{children}</Layout> : <>{children}</>;
};

const AuthenticatedApp = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-red-200 border-t-red-600 rounded-full animate-spin"></div>
          <p className="text-sm text-slate-500 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Suspense fallback={
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        <div className="w-8 h-8 border-4 border-red-200 border-t-red-600 rounded-full animate-spin"></div>
      </div>
    }>
      <Routes>
        {/* Public Routes with Redirect if Logged In */}
        <Route path="/login" element={
          user ? (
            user.onboardingCompleted ? <Navigate to="/dashboard" /> : <Navigate to="/onboarding" />
          ) : <Login />
        } />
        <Route path="/signup" element={
          user ? (
            user.onboardingCompleted ? <Navigate to="/dashboard" /> : <Navigate to="/onboarding" />
          ) : <Signup />
        } />
        <Route path="/about-us" element={
          <LayoutWrapper currentPageName="about-us">
            <AboutUs />
          </LayoutWrapper>
        } />

        {/* Onboarding Flow */}
        <Route path="/onboarding" element={user ? <Onboarding /> : <Navigate to="/login" />} />
        <Route path="/generating-report" element={user ? <ReportGeneration /> : <Navigate to="/login" />} />



        {/* Dashboard Routes (Protected & Require Onboarding) */}
        <Route path="/dashboard" element={
          user ? (
            user.onboardingCompleted ? <DashboardLayout /> : <Navigate to="/onboarding" replace />
          ) : <Navigate to="/login" replace />
        }>
          <Route index element={<Navigate to="/dashboard/reports" replace />} />
          <Route path="reports" element={<Reports />} />
          <Route path="agent" element={<Navigate to="/dashboard/coming-soon" replace />} />
          <Route path="coming-soon" element={<ComingSoon />} />
          <Route path="*" element={<Navigate to="/dashboard/coming-soon" replace />} />
        </Route>

        {/* Home Route - accessible to everyone */}
        <Route path="/" element={
          user ? <Navigate to="/dashboard" replace /> : (
            (() => {
              console.log("Rendering Home Route. User:", user?.email, "Onboarding:", user?.onboardingCompleted);
              return (
                <LayoutWrapper currentPageName={mainPageKey}>
                  <MainPage />
                </LayoutWrapper>
              );
            })()
          )
        } />

        {/* Other Generated Pages */}
        {Object.entries(Pages).map(([path, Page]) => (
          <Route
            key={path}
            path={`/${path}`}
            element={
              <LayoutWrapper currentPageName={path}>
                <Page />
              </LayoutWrapper>
            }
          />
        ))}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Suspense>
  );
};


function App() {

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <NavigationTracker />
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App
