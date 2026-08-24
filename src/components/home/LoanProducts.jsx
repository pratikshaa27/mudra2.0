import React, { useState, useEffect, useRef } from 'react';
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
  Sprout,
  Rocket,
  Building2,
  Crown
} from 'lucide-react';
import { Reveal, RevealGroup } from '@/components/ui/reveal';
import SectionHeading from '@/components/ui/section-heading';
import { useLanguage } from '../LanguageContext';

const buildProducts = (t) => [
  {
    id: 'shishu',
    icon: Sprout,
    name: 'Shishu',
    limit: 'Up to ₹50,000',
    range: t('loanProductShishuRange'),
    stage: t('loanProductShishuStage'),
    image: '/photo/shishu.jpg',
    description: t('loanProductShishuDesc'),
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
    icon: Rocket,
    name: 'Kishore',
    limit: '₹50,000 to ₹5 Lakh',
    range: t('loanProductKishoreRange'),
    stage: t('loanProductKishoreStage'),
    image: '/photo/kishor.webp',
    description: t('loanProductKishoreDesc'),
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
    icon: Building2,
    name: 'Tarun',
    limit: '₹5 Lakh to ₹10 Lakh',
    range: t('loanProductTarunRange'),
    stage: t('loanProductTarunStage'),
    image: '/photo/tarun.jpeg',
    description: t('loanProductTarunDesc'),
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
    icon: Crown,
    name: 'TarunPlus',
    limit: '₹10 Lakh to ₹20 Lakh',
    range: t('loanProductTarunPlusRange'),
    stage: t('loanProductTarunPlusStage'),
    image: '/photo/tarun plus.jpeg',
    description: t('loanProductTarunPlusDesc'),
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

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1590682680695-43b964a3ae17?auto=format&fit=crop&w=800&q=80';

export default function LoanProducts() {
  const { t } = useLanguage();
  const products = buildProducts(t);
  const [selectedScheme, setSelectedScheme] = useState(null);
  const closeButtonRef = useRef(null);

  // Modal: lock background scroll, close on Escape, and move focus in.
  useEffect(() => {
    if (!selectedScheme) return undefined;

    const onKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedScheme(null);
    };

    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedScheme]);

  return (
    <section
      id="schemes"
      className="section-y relative border-t border-slate-200 text-slate-900 dark:border-slate-800 dark:text-slate-100"
    >
      <div className="shell">
        <SectionHeading
          eyebrow={t('loanProductsEyebrow')}
          icon={Sparkles}
          title={t('loanProductsTitle')}
          description={t('loanProductsDescription')}
        />

        <RevealGroup stagger={90} className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {products.map((product, idx) => (
            <Reveal key={product.id} index={idx} className="h-full">
              <article className="card-lift group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm hover:border-blue-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-500/50">

                {/* Scheme imagery with gradient scrim */}
                <div className="media-frame media-scrim relative h-44 shrink-0 rounded-none bg-slate-100 dark:bg-slate-800">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = FALLBACK_IMAGE;
                    }}
                  />

                  <span className="absolute left-3 top-3 z-10 flex items-center gap-1.5 rounded-full border border-white/15 bg-slate-950/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-blue-300 backdrop-blur-sm">
                    <product.icon
                      size={13}
                      className="shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-110"
                      aria-hidden="true"
                    />
                    {product.badge}
                  </span>

                  <span className="absolute right-3 top-3 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-white shadow-sm">
                    <ShieldCheck size={14} aria-hidden="true" />
                  </span>

                  <div className="absolute inset-x-4 bottom-3 z-10">
                    <h3 className="text-xl font-extrabold tracking-tight text-white">{product.name}</h3>
                    <p className="text-[11px] font-bold text-blue-300">{product.limit}</p>
                  </div>
                </div>

                {/* Always-visible details */}
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-blue-700 dark:text-blue-400">
                    {product.stage}
                  </p>

                  <p className="mt-2 text-sm font-medium leading-relaxed text-slate-600 dark:text-slate-300">
                    {product.range}
                  </p>

                  <p className="mt-3 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-200">
                    {t('loanProductsCollateralFree')}
                  </p>

                  <button
                    type="button"
                    onClick={() => setSelectedScheme(product)}
                    className="btn btn-secondary mt-4 w-full text-xs"
                  >
                    <span>{t('loanProductsViewInfo')}</span>
                    <ArrowRight size={14} className="btn-icon" aria-hidden="true" />
                  </button>
                </div>
              </article>
            </Reveal>
          ))}
        </RevealGroup>
      </div>

      {/* Scheme detail dialog */}
      <AnimatePresence>
        {selectedScheme && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm"
            onClick={() => setSelectedScheme(null)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="scheme-dialog-title"
              initial={{ opacity: 0, scale: 0.97, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 12 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="media-scrim relative h-52 w-full overflow-hidden bg-slate-800">
                <img
                  src={selectedScheme.image}
                  alt={selectedScheme.name}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = FALLBACK_IMAGE;
                  }}
                />

                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={() => setSelectedScheme(null)}
                  className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-slate-900/80 text-white transition-colors duration-200 hover:bg-blue-700"
                  aria-label="Close modal"
                >
                  <X size={18} aria-hidden="true" />
                </button>

                <div className="absolute inset-x-6 bottom-4 z-10">
                  <span className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-blue-400 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-slate-950">
                    <selectedScheme.icon size={13} className="shrink-0" aria-hidden="true" />
                    {selectedScheme.badge}
                  </span>
                  <h3 id="scheme-dialog-title" className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                    PMMY {selectedScheme.name} Scheme Details
                  </h3>
                  <p className="text-xs font-bold text-blue-300">
                    Loan Limit: {selectedScheme.limit} ({selectedScheme.stage})
                  </p>
                </div>
              </div>

              <div className="space-y-6 p-6 md:p-8">
                <div>
                  <h4 className="mb-2 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.1em] text-slate-500 dark:text-slate-400">
                    <Info size={13} className="text-blue-700 dark:text-blue-400" aria-hidden="true" />
                    <span>Scheme Overview &amp; Purpose</span>
                  </h4>
                  <p className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm font-medium leading-relaxed text-slate-700 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-200">
                    {selectedScheme.description}
                  </p>
                </div>

                <div>
                  <h4 className="mb-3 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.1em] text-slate-500 dark:text-slate-400">
                    <ShieldCheck size={13} className="text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                    <span>Key Loan Features &amp; Benefits</span>
                  </h4>
                  <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    {selectedScheme.features.map((feat) => (
                      <li key={feat} className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50/70 px-3.5 py-2.5 text-xs font-semibold text-slate-800 dark:border-emerald-900/50 dark:bg-emerald-950/30 dark:text-slate-200">
                        <CheckCircle2 size={15} className="shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/60">
                    <div className="mb-1 flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
                      <Percent size={15} className="text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                      <span>Interest Rate Guidance</span>
                    </div>
                    <p className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
                      {selectedScheme.interestRate}
                    </p>
                    <p className="mt-1 text-[10px] text-slate-500 dark:text-slate-400">
                      As per RBI &amp; Member Lending Institution guidelines
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/60">
                    <div className="mb-1 flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
                      <Briefcase size={15} className="text-blue-700 dark:text-blue-400" aria-hidden="true" />
                      <span>Repayment Tenure</span>
                    </div>
                    <p className="text-xs font-bold text-blue-800 dark:text-blue-300">
                      {selectedScheme.tenure}
                    </p>
                    <p className="mt-1 text-[10px] text-slate-500 dark:text-slate-400">
                      Flexible EMI with zero pre-closure penalty
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="mb-2 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.1em] text-slate-500 dark:text-slate-400">
                    <Briefcase size={13} className="text-blue-700 dark:text-blue-400" aria-hidden="true" />
                    <span>Eligible Business Activities</span>
                  </h4>
                  <p className="rounded-xl border border-slate-200 bg-slate-50 p-3.5 text-xs font-semibold leading-relaxed text-slate-700 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-300">
                    {selectedScheme.eligible}
                  </p>
                </div>

                <div>
                  <h4 className="mb-3 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.1em] text-slate-500 dark:text-slate-400">
                    <FileText size={13} className="text-blue-700 dark:text-blue-400" aria-hidden="true" />
                    <span>Required Documents Checklist</span>
                  </h4>
                  <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {selectedScheme.documents.map((doc) => (
                      <li key={doc} className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700 dark:border-slate-700/60 dark:bg-slate-800/40 dark:text-slate-300">
                        <CheckCircle2 size={14} className="shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                        <span>{doc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap items-center justify-end gap-3 border-t border-slate-200 pt-5 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => setSelectedScheme(null)}
                    className="btn text-xs text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                  >
                    Close
                  </button>

                  <Link
                    to={`${createPageUrl('EntrepreneurOnboarding')}?scheme=${selectedScheme.id}`}
                    onClick={() => setSelectedScheme(null)}
                    className="btn btn-primary text-xs"
                  >
                    <span>Apply for {selectedScheme.name} Loan Now</span>
                    <ArrowRight size={15} className="btn-icon" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
