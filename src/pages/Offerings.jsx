import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Sparkles, ArrowRight, CheckCircle2, FileText, Zap } from 'lucide-react';
import Header from '../components/home/Header';
import Footer from '../components/home/Footer';
import ChatBot from '../components/ChatBot';
import { createPageUrl } from '@/utils';

const loanProducts = [
  {
    id: 'shishu',
    title: 'Shishu Category',
    tagline: 'Seed capital for micro-enterprises and early stage entrepreneurs',
    limit: 'Up to ₹50,000/-',
    color: 'from-amber-500 to-amber-600',
    borderColor: 'border-amber-400',
    bgBadge: 'bg-amber-100 text-amber-900 dark:bg-amber-900/40 dark:text-amber-300',
    targetAudience: 'Small vendors, artisans, shopkeepers, fruit/vegetable sellers, micro service units',
    features: [
      'Zero collateral security required',
      'No processing fee charged by banks',
      'Flexible repayment tenure up to 5 years',
      'MUDRA Card for working capital drawdown'
    ],
    documents: [
      'Proof of Identity (Aadhaar / Voter ID / PAN)',
      'Proof of Residence (Utility Bill / Aadhaar)',
      'Business quotation for machinery / equipment'
    ]
  },
  {
    id: 'kishore',
    title: 'Kishore Category',
    tagline: 'Expansion credit for growing micro enterprises seeking equipment or stock',
    limit: 'Above ₹50,000 to ₹5 Lakh',
    color: 'from-blue-600 to-indigo-700',
    borderColor: 'border-blue-500',
    bgBadge: 'bg-blue-100 text-blue-900 dark:bg-blue-900/40 dark:text-blue-300',
    targetAudience: 'Small manufacturing units, food processing units, repair workshops, retail stores',
    features: [
      'Credit guarantee coverage via CGFMU',
      'Repayment tenure 3 to 5 years',
      'Competitive interest rates linked to bank MCLR',
      'Working capital & term loan facility'
    ],
    documents: [
      'Identity & Residence Proofs',
      'MSME Udyam Registration Certificate',
      'Bank statement for past 6 months',
      'Unaudited balance sheet / income projections'
    ]
  },
  {
    id: 'tarun',
    title: 'Tarun Category',
    tagline: 'Scaling capital for established small enterprises modernizing operations',
    limit: 'Above ₹5 Lakh to ₹10 Lakh',
    color: 'from-emerald-600 to-teal-700',
    borderColor: 'border-emerald-500',
    bgBadge: 'bg-emerald-100 text-emerald-900 dark:bg-emerald-900/40 dark:text-emerald-300',
    targetAudience: 'Established manufacturing plants, logistics operators, IT services, commercial units',
    features: [
      'No third-party collateral guarantee needed',
      'Moratorium period up to 6 months available',
      'Term loan for machinery & equipment purchase',
      'MUDRA Card facility for working capital'
    ],
    documents: [
      'KYC documents & Udyam Registration',
      'Past 2-year audited financial statements',
      'GST Returns for past 12 months',
      'Machinery quotation & project report'
    ]
  },
  {
    id: 'tarunplus',
    title: 'TarunPlus Category',
    tagline: 'Enhanced ceiling for proven repeat borrowers scaling enterprise capacity',
    limit: 'Above ₹10 Lakh to ₹20 Lakh',
    color: 'from-purple-600 to-red-700',
    borderColor: 'border-purple-500',
    bgBadge: 'bg-purple-100 text-purple-900 dark:bg-purple-900/40 dark:text-purple-300',
    targetAudience: 'Repeat PMMY borrowers with clean repayment track record expanding production capacity',
    features: [
      'Enhanced ceiling introduced under Budget 2024-25',
      'Extended repayment tenure up to 7 years',
      'Priority processing at Member Lending Institutions',
      'Comprehensive CGFMU guarantee coverage'
    ],
    documents: [
      'Previous PMMY loan closure / track record certificate',
      'Audited financial statements for last 2 years',
      'Bank statement for last 12 months',
      'Detailed expansion project report'
    ]
  }
];

export default function Offerings() {
  const [searchParams] = useSearchParams();
  const schemeParam = searchParams.get('scheme');
  const [activeTab, setActiveTab] = useState('shishu');

  useEffect(() => {
    if (schemeParam && loanProducts.some(p => p.id === schemeParam)) {
      setActiveTab(schemeParam);
    }
  }, [schemeParam]);

  const activeProduct = loanProducts.find(p => p.id === activeTab) || loanProducts[0];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070b14] text-slate-900 dark:text-slate-100 transition-colors duration-300 flex flex-col justify-between relative overflow-hidden">
      
      {/* Taj Mahal Fixed Background Image Effect */}
      <div 
        className="absolute inset-0 pointer-events-none bg-cover bg-center bg-fixed filter brightness-105 contrast-110 opacity-75 dark:opacity-55"
        style={{ backgroundImage: `url('/photo/tajmahal.png')` }}
      />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#fffbeb]/75 via-white/55 to-[#fffbeb]/85 dark:from-[#070b14]/85 dark:via-[#070b14]/75 dark:to-[#070b14]/90" />

      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 py-12 w-full relative z-10">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 bg-[#f97316] text-white px-3.5 py-1 rounded-md text-xs font-black tracking-wider uppercase mb-3 shadow-sm">
            <Sparkles size={14} className="text-white" />
            <span>PMMY CREDIT PRODUCTS</span>
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0f2942] dark:text-white tracking-tight mb-3">
            MUDRA Offerings & Scheme Categories
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base font-semibold">
            Tailored collateral-free credit products signifying stages of growth of micro enterprises across India.
          </p>
        </div>

        {/* Product Navigation Tabs */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
          {loanProducts.map((product) => (
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              key={product.id}
              type="button"
              onClick={() => setActiveTab(product.id)}
              className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-black tracking-wide transition-all ${
                activeTab === product.id
                  ? 'bg-red-800 dark:bg-amber-500 text-white dark:text-slate-950 shadow-lg'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-amber-50'
              }`}
            >
              {product.title} ({product.limit})
            </motion.button>
          ))}
        </div>

        {/* Selected Product Card Detail */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeProduct.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border-2 border-slate-200 dark:border-slate-800 shadow-xl max-w-5xl mx-auto space-y-8"
          >
            {/* Header Title Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
              <div>
                <span className={`px-3 py-1 rounded-full text-xs font-black uppercase ${activeProduct.bgBadge}`}>
                  {activeProduct.title}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-[#0f2942] dark:text-white mt-2">
                  Credit Limit: <span className="text-red-700 dark:text-amber-400">{activeProduct.limit}</span>
                </h2>
                <p className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400 mt-1">
                  {activeProduct.tagline}
                </p>
              </div>

              <a
                href="https://www.jansamarth.in/login"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-red-800 hover:bg-red-900 text-white text-xs font-black rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 shrink-0 uppercase tracking-wide"
              >
                <span>Apply via JanSamarth</span>
                <ArrowRight size={14} />
              </a>
            </div>

            {/* Target Audience */}
            <div className="bg-amber-500/10 dark:bg-slate-800/50 p-5 rounded-2xl border border-amber-300 dark:border-slate-700">
              <h3 className="text-xs font-black uppercase text-amber-700 dark:text-amber-400 tracking-wider mb-1">Eligible Target Audience</h3>
              <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">{activeProduct.targetAudience}</p>
            </div>

            {/* Key Features & Documents Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Key Features */}
              <div className="space-y-4">
                <h3 className="text-base font-black text-[#0f2942] dark:text-white flex items-center gap-2">
                  <ShieldCheck size={20} className="text-emerald-500" />
                  Key Features & Highlights
                </h3>
                <ul className="space-y-3">
                  {activeProduct.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
                      <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Required Documents */}
              <div className="space-y-4">
                <h3 className="text-base font-black text-[#0f2942] dark:text-white flex items-center gap-2">
                  <FileText size={20} className="text-amber-500" />
                  Required Documentation
                </h3>
                <ul className="space-y-3">
                  {activeProduct.documents.map((doc, dIdx) => (
                    <li key={dIdx} className="flex items-start gap-2 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
                      <CheckCircle2 size={16} className="text-amber-500 shrink-0 mt-0.5" />
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Application CTA */}
            <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-slate-500 font-bold">
                <Zap size={16} className="text-amber-500" />
                <span>Loans disbursed through Banks, RRBs, SFBs & MFIs under RBI Guidelines</span>
              </div>

              <Link
                to={createPageUrl('EntrepreneurOnboarding')}
                className="px-5 py-2.5 bg-[#0f2942] text-white hover:bg-[#153a5c] text-xs font-black rounded-xl transition-all shadow-md shrink-0"
              >
                Start Borrower Self-Check
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
      <ChatBot />
    </div>
  );
}
