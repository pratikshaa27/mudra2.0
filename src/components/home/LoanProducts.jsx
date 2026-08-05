import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  X,
  FileText,
  Percent,
  Briefcase,
  Info,
  Maximize2
} from 'lucide-react';

const products = [
  {
    id: 'shishu',
    name: 'Shishu',
    limit: 'Up to ₹50,000',
    range: 'Loans up to ₹50,000/-',
    stage: 'Startups & Micro Beginners',
    image: '/photo/shishu.jpg',
    description: 'Designed for early-stage micro entrepreneurs, small artisans, street vendors, and shopkeepers setting up initial business operations.',
    features: ['Zero collateral required', 'Minimal documentation', 'Up to 5 years tenure', 'Zero processing fee'],
    gradient: 'from-blue-600 to-indigo-700',
    ring: 'ring-blue-300 dark:ring-blue-900',
    badge: 'SHISHU CATEGORY',
    eligible: 'Fruit & vegetable vendors, artisans, tailors, cobblers, beauty parlors, small repair shops, and new startup micro units.',
    interestRate: '8.50% - 10.50% p.a. (MLI Specific)',
    tenure: 'Up to 60 Months with flexible moratorium',
    documents: ['Aadhaar Card & PAN Card', 'Proof of Business Address', 'Bank Account Details (6 Months)', '2 Passport Photos']
  },
  {
    id: 'kishore',
    name: 'Kishore',
    limit: '₹50,000 to ₹5 Lakh',
    range: 'Above ₹50k & Up to ₹5 Lakh',
    stage: 'Growing Micro Units',
    image: '/photo/kishor.webp',
    description: 'Ideal for existing business owners seeking working capital, machinery purchase, inventory expansion, or business modernization.',
    features: ['Working capital & machinery credit', 'MUDRA Card facility', 'Flexible repayment options', 'Covered under CGFMU'],
    gradient: 'from-emerald-600 to-teal-700',
    ring: 'ring-emerald-300 dark:ring-emerald-900',
    badge: 'KISHORE CATEGORY',
    eligible: 'Small manufacturing units, food processing firms, textile traders, hardware stores, dairy farmers, and service enterprises.',
    interestRate: '9.25% - 11.25% p.a. (MLI Specific)',
    tenure: '3 to 5 Years depending on loan purpose',
    documents: ['Identity & Address Proof', 'GST Registration (if applicable)', 'Last 12 Months Bank Statement', 'Project Report / Business Quotation']
  },
  {
    id: 'tarun',
    name: 'Tarun',
    limit: '₹5 Lakh to ₹10 Lakh',
    range: 'Above ₹5 Lakh & Up to ₹10 Lakh',
    stage: 'Established Enterprises',
    image: '/photo/tarun.jpeg',
    description: 'Tailored for established small businesses expanding operations, upgrading technology, scaling trade volume, or buying commercial vehicles.',
    features: ['Expansion credit line', 'Competitive MLI interest rate', 'National guarantee cover', 'No third party collateral'],
    gradient: 'from-amber-500 to-amber-700',
    ring: 'ring-amber-300 dark:ring-amber-900',
    badge: 'TARUN CATEGORY',
    eligible: 'Established MSME units, commercial transport operators, wholesale trade hubs, packaging units, and cold storage providers.',
    interestRate: '9.75% - 11.75% p.a. (MLI Specific)',
    tenure: 'Up to 5 Years with custom repayment cycles',
    documents: ['Audited Financial Statements (2 Years)', 'ITR Returns (2 Years)', 'Business Pan & GST Proof', 'Machine Purchase Invoice / Plan']
  },
  {
    id: 'tarunplus',
    name: 'TarunPlus',
    limit: '₹10 Lakh to ₹20 Lakh',
    range: 'Above ₹10 Lakh & Up to ₹20 Lakh',
    stage: 'Repeat Track Record Borrowers',
    image: '/photo/tarun plus.jpeg',
    description: 'Union Budget MUDRA 2.0 initiative doubling the limit for repeat borrowers who have successfully repaid previous Tarun loans with pristine record.',
    features: ['MUDRA 2.0 enhanced limit', 'Zero third-party collateral', 'Priority MLI processing', 'Enhanced working capital'],
    gradient: 'from-red-600 to-rose-800',
    ring: 'ring-red-300 dark:ring-red-900',
    badge: 'MUDRA 2.0 HIGHER TIER',
    eligible: 'Repeat PMMY borrowers with a pristine repayment track record expanding high-capacity manufacturing or tech-enabled services.',
    interestRate: '10.00% - 12.00% p.a. (MLI Specific)',
    tenure: 'Up to 7 Years extended tenure',
    documents: ['Previous Tarun Loan Repayment Certificate', '2 Years Audited Financials & ITR', 'Detailed Expansion Project Report', 'Bank Statements (1 Year)']
  }
];

export default function LoanProducts() {
  const [selectedScheme, setSelectedScheme] = useState(null);

  return (
    <section id="schemes" className="py-20 bg-transparent text-slate-900 dark:text-slate-100 transition-colors duration-300 relative border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Centered Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-100 dark:bg-red-950/60 border border-red-300 dark:border-red-800 text-red-900 dark:text-amber-300 text-xs font-black tracking-wider uppercase mb-3">
            <Sparkles size={14} className="text-red-700 dark:text-amber-400" />
            <span>CATEGORIZED CREDIT CATEGORIES</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">
            PMMY Schemes Overview & Categories
          </h2>

          <div className="w-32 h-1.5 bg-gradient-to-r from-red-700 via-amber-500 to-red-700 mx-auto rounded-full mb-6"></div>

          <p className="text-slate-600 dark:text-slate-300 max-w-3xl mx-auto text-sm md:text-base font-semibold leading-relaxed">
            MUDRA classifies loans into four tailored categories. Click on any scheme card to open complete eligibility, interest rates, required documents, and application info.
          </p>
        </motion.div>

        {/* 4 Cards Grid - Image First (Full Image Displayed Without Cropping) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
          {products.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              whileHover={{ y: -8, scale: 1.02 }}
              onClick={() => setSelectedScheme(product)}
              className="relative group cursor-pointer flex"
            >
              <div className="relative bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-xl border-2 border-slate-200 dark:border-slate-800 group-hover:border-amber-400 dark:group-hover:border-amber-500/80 transition-all w-full h-[22rem] flex flex-col justify-between">

                {/* Full Cover Image Container (object-contain shows full image without cropping) */}
                <div className="relative w-full h-full p-2 bg-slate-100 dark:bg-slate-900 flex items-center justify-center overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 rounded-2xl"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1590682680695-43b964a3ae17?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                </div>

                {/* Top Badge (Always Visible) */}
                <div className="absolute top-3 left-3 right-3 flex justify-between items-center z-10">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-900/90 text-amber-300 backdrop-blur-md border border-slate-700 shadow-md">
                    {product.badge}
                  </span>
                  <div className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md">
                    <ShieldCheck size={15} />
                  </div>
                </div>

                {/* Initial Scheme Title at Bottom (Fades out on hover) */}
                <div className="absolute bottom-3 left-3 right-3 z-10 group-hover:opacity-0 transition-opacity duration-300 bg-slate-950/80 p-3 rounded-2xl backdrop-blur-md border border-white/10 shadow-lg">
                  <h3 className="text-xl font-black text-white tracking-tight">
                    {product.name}
                  </h3>
                  <p className="text-[11px] font-extrabold text-amber-300">
                    {product.limit}
                  </p>
                </div>

                {/* Info Overlay (Revealed On Cursor Hover) */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/90 to-slate-950/60 p-5 flex flex-col justify-end gap-3 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-6 group-hover:translate-y-0 z-20 backdrop-blur-[3px]">
                  <div>
                    <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest">
                      {product.badge}
                    </span>
                    <h3 className="text-2xl font-black text-white tracking-tight mt-0.5">
                      {product.name}
                    </h3>
                    <p className="text-xs font-extrabold text-amber-300">
                      {product.stage}
                    </p>
                  </div>

                  <div className="w-full text-center text-amber-300 font-black text-xs px-3 py-2 bg-white/10 rounded-xl border border-white/20 backdrop-blur-md shadow-inner">
                    Limit: {product.limit}
                  </div>

                  <p className="text-[11px] text-slate-300 font-bold text-center">
                    Collateral-Free PMMY Credit Facility
                  </p>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedScheme(product);
                    }}
                    className="w-full py-2.5 rounded-xl bg-red-800 hover:bg-red-700 text-white font-black text-xs shadow-lg transition-all flex items-center justify-center gap-2 mt-1"
                  >
                    <Maximize2 size={14} className="text-amber-400" />
                    <span>Click to View Info & Apply</span>
                  </button>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Interactive Detail Modal Popup */}
      <AnimatePresence>
        {selectedScheme && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.2 }}
              className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border-2 border-slate-200 dark:border-slate-800 shadow-2xl relative"
            >
              {/* Modal Header with Local Photo */}
              <div className="relative h-60 w-full overflow-hidden bg-slate-800">
                <img
                  src={selectedScheme.image}
                  alt={selectedScheme.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1590682680695-43b964a3ae17?auto=format&fit=crop&w=800&q=80';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

                <button
                  type="button"
                  onClick={() => setSelectedScheme(null)}
                  className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-slate-900/80 text-white hover:bg-red-700 transition-colors flex items-center justify-center border border-slate-700"
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>

                <div className="absolute bottom-4 left-6 right-6 z-10">
                  <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-amber-400 text-slate-950 mb-2 inline-block shadow-md">
                    {selectedScheme.badge}
                  </span>
                  <h3 className="text-3xl font-black text-white tracking-tight flex items-center gap-2">
                    <span>PMMY {selectedScheme.name} Scheme Details</span>
                  </h3>
                  <p className="text-xs font-bold text-amber-300">
                    Loan Limit: {selectedScheme.limit} ({selectedScheme.stage})
                  </p>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 md:p-8 space-y-6">

                {/* Description */}
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2 flex items-center gap-1.5">
                    <Info size={14} className="text-red-700 dark:text-amber-400" />
                    <span>Scheme Overview & Purpose</span>
                  </h4>
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 leading-relaxed bg-amber-50/60 dark:bg-slate-800/80 p-4 rounded-2xl border border-amber-200 dark:border-slate-700">
                    {selectedScheme.description}
                  </p>
                </div>

                {/* Key Features List */}
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3 flex items-center gap-1.5">
                    <ShieldCheck size={14} className="text-emerald-600 dark:text-emerald-400" />
                    <span>Key Loan Features & Benefits</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {selectedScheme.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200 bg-emerald-50/70 dark:bg-emerald-950/30 px-3.5 py-2.5 rounded-xl border border-emerald-200 dark:border-emerald-900/50">
                        <CheckCircle2 size={15} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Interest & Tenure */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-2 text-xs font-black text-slate-900 dark:text-white mb-1">
                      <Percent size={16} className="text-emerald-600 dark:text-emerald-400" />
                      <span>Interest Rate Guidance</span>
                    </div>
                    <p className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
                      {selectedScheme.interestRate}
                    </p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
                      As per RBI & Member Lending Institution guidelines
                    </p>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-2 text-xs font-black text-slate-900 dark:text-white mb-1">
                      <Briefcase size={16} className="text-amber-600 dark:text-amber-400" />
                      <span>Repayment Tenure</span>
                    </div>
                    <p className="text-xs font-bold text-amber-700 dark:text-amber-300">
                      {selectedScheme.tenure}
                    </p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
                      Flexible EMI with zero pre-closure penalty
                    </p>
                  </div>
                </div>

                {/* Eligible Activities */}
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2 flex items-center gap-1.5">
                    <Briefcase size={14} className="text-red-700 dark:text-amber-400" />
                    <span>Eligible Business Activities</span>
                  </h4>
                  <p className="text-xs font-bold text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700">
                    {selectedScheme.eligible}
                  </p>
                </div>

                {/* Required Documents Checklist */}
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3 flex items-center gap-1.5">
                    <FileText size={14} className="text-red-700 dark:text-amber-400" />
                    <span>Required Documents Checklist</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedScheme.documents.map((doc, dIdx) => (
                      <div key={dIdx} className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/40 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700/60">
                        <CheckCircle2 size={14} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <span>{doc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedScheme(null)}
                    className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    Close
                  </button>

                  <Link
                    to={`${createPageUrl('EntrepreneurOnboarding')}?scheme=${selectedScheme.id}`}
                    onClick={() => setSelectedScheme(null)}
                    className="px-6 py-2.5 rounded-xl bg-red-800 hover:bg-red-900 text-white font-extrabold text-xs shadow-lg transition-all flex items-center gap-2"
                  >
                    <span>Apply for {selectedScheme.name} Loan Now</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>

              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}