/**
 * pages.config.js - Page routing configuration
 * 
 * This file is AUTO-GENERATED. Do not add imports or modify PAGES manually.
 * Pages are auto-registered when you create files in the ./pages/ folder.
 * 
 * THE ONLY EDITABLE VALUE: mainPage
 * This controls which page is the landing page (shown when users visit the app).
 * 
 * Example file structure:
 * 
 *   import HomePage from './pages/HomePage';
 *   import Dashboard from './pages/Dashboard';
 *   import Settings from './pages/Settings';
 *   
 *   export const PAGES = {
 *       "HomePage": HomePage,
 *       "Dashboard": Dashboard,
 *       "Settings": Settings,
 *   }
 *   
 *   export const pagesConfig = {
 *       mainPage: "HomePage",
 *       Pages: PAGES,
 *   };
 * 
 * Example with Layout (wraps all pages):
 *
 *   import Home from './pages/Home';
 *   import Settings from './pages/Settings';
 *   import __Layout from './Layout.jsx';
 *
 *   export const PAGES = {
 *       "Home": Home,
 *       "Settings": Settings,
 *   }
 *
 *   export const pagesConfig = {
 *       mainPage: "Home",
 *       Pages: PAGES,
 *       Layout: __Layout,
 *   };
 *
 * To change the main page from HomePage to Dashboard, use find_replace:
 *   Old: mainPage: "HomePage",
 *   New: mainPage: "Dashboard",
 *
 * The mainPage value must match a key in the PAGES object exactly.
 */
import AICreditScore from './pages/AICreditScore';
import About from './pages/About';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';
import AuditLogs from './pages/AuditLogs';
import BankOfficerConsole from './pages/BankOfficerConsole';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';
import EntrepreneurOnboarding from './pages/EntrepreneurOnboarding';
import FraudAlerts from './pages/FraudAlerts';
import Gallery from './pages/Gallery';
import Home from './pages/Home';
import LoanApplication from './pages/LoanApplication';
import LoanApplicationSuccess from './pages/LoanApplicationSuccess';
import LoanPassbook from './pages/LoanPassbook';
import LoanRecommendations from './pages/LoanRecommendations';
import LoanTracking from './pages/LoanTracking';
import MUDRA2Home from './pages/MUDRA2Home';
import MobilePreview from './pages/MobilePreview';
import NotificationsSupport from './pages/NotificationsSupport';
import PMMYPortal from './pages/PMMYPortal';
import POCScope from './pages/POCScope';
import SkillTraining from './pages/SkillTraining';
import __Layout from './Layout.jsx';


export const PAGES = {
    "AICreditScore": AICreditScore,
    "About": About,
    "AdminDashboard": AdminDashboard,
    "AdminLogin": AdminLogin,
    "AuditLogs": AuditLogs,
    "BankOfficerConsole": BankOfficerConsole,
    "Contact": Contact,
    "Dashboard": Dashboard,
    "EntrepreneurOnboarding": EntrepreneurOnboarding,
    "FraudAlerts": FraudAlerts,
    "Gallery": Gallery,
    "Home": Home,
    // "LoanApplication": LoanApplication,
    // "LoanApplicationSuccess": LoanApplicationSuccess,
    "LoanPassbook": LoanPassbook,
    "LoanRecommendations": LoanRecommendations,
    "LoanTracking": LoanTracking,
    "MUDRA2Home": MUDRA2Home,
    "MobilePreview": MobilePreview,
    "NotificationsSupport": NotificationsSupport,
    "PMMYPortal": PMMYPortal,
    "POCScope": POCScope,
    "SkillTraining": SkillTraining,
}

export const pagesConfig = {
    mainPage: "About",
    Pages: PAGES,
    Layout: __Layout,
};