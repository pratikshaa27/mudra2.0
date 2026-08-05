import { useEffect, useState } from 'react';
import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import NavigationTracker from '@/lib/NavigationTracker'
import { pagesConfig } from './pages.config'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';

const { Pages, Layout, mainPage } = pagesConfig;
const mainPageKey = mainPage ?? Object.keys(Pages)[0];
const MainPage = mainPageKey ? Pages[mainPageKey] : <></>;

const LayoutWrapper = ({ children, currentPageName }) => Layout ?
  <Layout currentPageName={currentPageName}>{children}</Layout>
  : <>{children}</>;

const StartupWarningModal = ({ onClose }) => (
  <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/60 backdrop-blur-md p-4">
    <div className="w-full max-w-xl rounded-2xl bg-white p-6 sm:p-8 shadow-2xl border border-amber-300 relative animate-in fade-in zoom-in duration-200">
      <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-4">
        <div className="w-10 h-10 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-800 font-extrabold shrink-0">
          <span className="text-xl">⚠️</span>
        </div>
        <div>
          <h2 className="text-lg font-black text-[#0f2942] tracking-tight">Official Statutory Advisory Notice</h2>
          <p className="text-xs text-amber-800 font-semibold">Government of India • MUDRA Ltd. (SIDBI Entity)</p>
        </div>
      </div>

      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-6">
        <strong>MUDRA Ltd., Mumbai</strong> does not sanction individual MUDRA loans directly. All loans under Pradhan Mantri MUDRA Yojana (PMMY) are sanctioned exclusively through <strong>Banks, MFIs, and NBFCs</strong>.
        MUDRA Ltd. does not engage any agents or middlemen. Borrowers are strictly advised not to pay any money or process fees to individuals posing as official MUDRA facilitators.
      </p>

      <div className="flex items-center justify-between pt-2 border-t border-slate-100">
        <span className="text-[11px] text-slate-500 font-medium">Toll-Free Helpline: 1800-180-1111</span>
        <button
          type="button"
          onClick={onClose}
          className="rounded-xl bg-[#0f2942] px-5 py-2.5 text-xs font-extrabold text-white hover:bg-[#153a5c] shadow-md transition-all"
        >
          I Understand & Acknowledge
        </button>
      </div>
    </div>
  </div>
);

const FloatingWarningNotice = ({ onExpand }) => (
  <div className="fixed bottom-4 left-4 z-[9998] w-[min(92vw,360px)] rounded-xl border border-slate-200 bg-white/95 p-3.5 shadow-2xl backdrop-blur-md flex items-center justify-between gap-3">
    <div>
      <p className="text-xs font-bold text-[#0f2942]">Official Advisory</p>
      <p className="text-[11px] text-slate-600 truncate max-w-[200px]">
        MUDRA loans are sanctioned via Banks only.
      </p>
    </div>
    <button
      type="button"
      onClick={onExpand}
      className="rounded-lg bg-amber-500 hover:bg-amber-600 px-3 py-1.5 text-[11px] font-bold text-slate-950 transition-colors shrink-0"
    >
      Read Advisory
    </button>
  </div>
);

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  // Show loading spinner while checking app public settings or auth
  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-slate-50">
        <div className="w-10 h-10 border-4 border-slate-200 border-t-[#0f2942] rounded-full animate-spin"></div>
      </div>
    );
  }

  // Handle authentication errors
  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      // Redirect to login automatically
      navigateToLogin();
      return null;
    }
  }

  // Render the main app
  return (
    <Routes>
      <Route path="/" element={
        <LayoutWrapper currentPageName={mainPageKey}>
          <MainPage />
        </LayoutWrapper>
      } />
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
  );
};


import { CMSProvider } from '@/components/CMSContext';

function App() {
  const [showStartupWarning, setShowStartupWarning] = useState(false);

  useEffect(() => {
    if (!showStartupWarning) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [showStartupWarning]);

  return (
    <CMSProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClientInstance}>
          <Router>
            <div>
              <NavigationTracker />
              <AuthenticatedApp />
            </div>
            {showStartupWarning && (
              <StartupWarningModal onClose={() => setShowStartupWarning(false)} />
            )}
            {!showStartupWarning && (
              <FloatingWarningNotice onExpand={() => setShowStartupWarning(true)} />
            )}
          </Router>
          <Toaster />
        </QueryClientProvider>
      </AuthProvider>
    </CMSProvider>
  )
}

export default App
