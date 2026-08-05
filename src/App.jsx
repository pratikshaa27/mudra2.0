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
  <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
    <div className="w-full max-w-2xl rounded-xl bg-white p-6 shadow-2xl border border-red-200">
      <h2 className="text-2xl font-bold text-red-700 mb-4">Beware !!!</h2>
      <p className="text-gray-800 leading-relaxed mb-6">
        MUDRA Ltd., Mumbai does not sanction individual MUDRA loans and such loans
        can be availed from Banks/ NBFCs/ MFIs. There are no agents or middleman
        engaged by MUDRA for availing such loans. The borrowers are advised to keep
        away from persons posing as agents/facilitators of MUDRA/ PMMY.
      </p>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onClose}
          className="rounded-md bg-red-700 px-4 py-2 text-sm font-semibold text-white hover:bg-red-800 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  </div>
);

const FloatingWarningNotice = ({ onExpand }) => (
  <div className="fixed bottom-4 left-4 z-[9998] w-[min(92vw,380px)] rounded-lg border border-red-200 bg-white/95 p-4 shadow-xl backdrop-blur-sm">
    <p className="text-sm font-bold text-red-700 mb-2">Beware !!!</p>
    <p className="text-xs text-gray-800 leading-relaxed mb-3">
      MUDRA Ltd., Mumbai does not sanction individual MUDRA loans. Stay away from
      persons posing as agents/facilitators of MUDRA/ PMMY.
    </p>
    <button
      type="button"
      onClick={onExpand}
      className="rounded-md bg-red-700 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-800 transition-colors"
    >
      View Full Warning
    </button>
  </div>
);

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  // Show loading spinner while checking app public settings or auth
  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
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


function App() {
  const [showStartupWarning, setShowStartupWarning] = useState(true);

  useEffect(() => {
    if (!showStartupWarning) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [showStartupWarning]);

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <div className={showStartupWarning ? 'pointer-events-none select-none' : ''}>
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
  )
}

export default App
