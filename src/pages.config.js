/**
 * pages.config.js - Page routing configuration
 */
import AICreditScore from './pages/AICreditScore';
import About from './pages/About';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';
import AuditLogs from './pages/AuditLogs';
import BankOfficerConsole from './pages/BankOfficerConsole';
import Careers from './pages/Careers';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';
import EntrepreneurOnboarding from './pages/EntrepreneurOnboarding';
import FAQ from './pages/FAQ';
import Financials from './pages/Financials';
import FraudAlerts from './pages/FraudAlerts';
import Gallery from './pages/Gallery';
import Home from './pages/Home';
import LoanPassbook from './pages/LoanPassbook';
import LoanRecommendations from './pages/LoanRecommendations';
import LoanTracking from './pages/LoanTracking';
import MUDRA2Home from './pages/MUDRA2Home';
import MobilePreview from './pages/MobilePreview';
import NotificationsSupport from './pages/NotificationsSupport';
import Offerings from './pages/Offerings';
import PMMYPortal from './pages/PMMYPortal';
import POCScope from './pages/POCScope';
import SkillTraining from './pages/SkillTraining';
import SuccessStories from './pages/SuccessStories';
import Sitemap from './pages/Sitemap';
import __Layout from './Layout.jsx';

export const PAGES = {
    "AICreditScore": AICreditScore,
    "About": About,
    "AdminDashboard": AdminDashboard,
    "AdminLogin": AdminLogin,
    "AuditLogs": AuditLogs,
    "BankOfficerConsole": BankOfficerConsole,
    "Careers": Careers,
    "Contact": Contact,
    "Dashboard": Dashboard,
    "EntrepreneurOnboarding": EntrepreneurOnboarding,
    "FAQ": FAQ,
    "Financials": Financials,
    "FraudAlerts": FraudAlerts,
    "Gallery": Gallery,
    "Home": Home,
    "LoanPassbook": LoanPassbook,
    "LoanRecommendations": LoanRecommendations,
    "LoanTracking": LoanTracking,
    "MUDRA2Home": MUDRA2Home,
    "MobilePreview": MobilePreview,
    "NotificationsSupport": NotificationsSupport,
    "Offerings": Offerings,
    "PMMYPortal": PMMYPortal,
    "POCScope": POCScope,
    "SkillTraining": SkillTraining,
    "SuccessStories": SuccessStories,
    "Sitemap": Sitemap,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};