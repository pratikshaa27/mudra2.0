  import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert } from 'lucide-react';
import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import NavigationTracker from '@/lib/NavigationTracker'
import HashScrollHandler from '@/lib/HashScrollHandler'
import { pagesConfig } from './pages.config'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import { CMSProvider } from '@/components/CMSContext';
import AdvisoryWidget from '@/components/AdvisoryWidget';

const { Pages, Layout, mainPage } = pagesConfig;
const mainPageKey = mainPage ?? Object.keys(Pages)[0];
const MainPage = mainPageKey ? Pages[mainPageKey] : <></>;

const LayoutWrapper = ({ children, currentPageName }) =>
  Layout ?
  <Layout currentPageName={currentPageName}>{children}</Layout>
  : <>{children}</>;

const StartupWarningModal = ({ onClose }) => (
  <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-md">
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="startup-warning-title"
      className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-red-200 bg-white shadow-2xl dark:border-red-900/50 dark:bg-slate-900"
    >
      {/* Statutory-warning accent — same red→amber ramp used by the Fraud &
          Safety section, so this reads as "official advisory", not a toast. */}
      <div className="h-1.5 w-full bg-gradient-to-r from-red-600 via-red-500 to-amber-400" aria-hidden="true" />

      <div className="p-6 sm:p-8">
        <div className="mb-4 flex items-start gap-4 border-b border-slate-100 pb-4 dark:border-slate-800">
          <motion.div
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-red-300 bg-gradient-to-br from-red-50 to-amber-50 text-red-700 shadow-sm dark:border-red-900/50 dark:from-red-950/40 dark:to-amber-950/30 dark:text-red-400"
          >
            <ShieldAlert size={24} aria-hidden="true" />
          </motion.div>
          <div>
            <span className="mb-1.5 inline-flex items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-red-700 dark:bg-red-950/50 dark:text-red-300">
              Statutory Advisory
            </span>
            <h2 id="startup-warning-title" className="text-lg font-black tracking-tight text-[#011a39] dark:text-white">
              Beware of Loan Fraud &amp; Fake Agents
            </h2>
            <p className="text-xs font-semibold text-red-700 dark:text-red-300">Government of India • MUDRA Ltd. (SIDBI Entity)</p>
          </div>
        </div>

        <p className="mb-6 text-xs leading-relaxed text-slate-700 dark:text-slate-300 sm:text-sm">
          <strong>MUDRA Ltd., Mumbai</strong> does not sanction individual MUDRA loans directly. All loans under Pradhan Mantri MUDRA Yojana (PMMY) are sanctioned exclusively through <strong>Banks, MFIs, and NBFCs</strong>.
          MUDRA Ltd. does not engage any agents or middlemen. Borrowers are strictly advised not to pay any money or processing fees to individuals posing as official MUDRA facilitators.
        </p>

        <div className="flex flex-col-reverse items-stretch gap-3 border-t border-slate-100 pt-4 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
            Toll-Free Helpline:{' '}
            <a href="tel:18001801111" className="font-bold text-[#011a39] hover:underline dark:text-blue-300">1800-180-1111</a>
          </span>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#011a39] to-[#0c3a63] px-5 py-2.5 text-xs font-extrabold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110"
          >
            I Understand &amp; Acknowledge
          </button>
        </div>
      </div>
    </motion.div>
  </div>
);

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  // Show loading spinner while checking app public settings or auth
  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-slate-50">
        <div className="w-10 h-10 border-4 border-slate-200 border-t-[#011a39] rounded-full animate-spin"></div>
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
  const [showStartupWarning, setShowStartupWarning] = useState(false);

  // Show the statutory fraud advisory on every full page load (including a
  // plain browser refresh) — shortly after the shell paints so it doesn't
  // compete with the initial load. It does NOT persist a "seen" flag: this
  // is a compliance notice, not a one-time tip, so it should reappear each
  // time the app is freshly loaded, not just once per browser session.
  useEffect(() => {
    const timer = setTimeout(() => setShowStartupWarning(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const dismissStartupWarning = () => setShowStartupWarning(false);

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
              <HashScrollHandler />
              <AuthenticatedApp />
            </div>
            <AdvisoryWidget onOpen={() => setShowStartupWarning(true)} />
            {showStartupWarning && (
              <StartupWarningModal onClose={dismissStartupWarning} />
            )}
          </Router>
          <Toaster />
        </QueryClientProvider>
      </AuthProvider>
    </CMSProvider>
  )
}

export default App
