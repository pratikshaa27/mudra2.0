import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  ExternalLink, 
  FileText, 
  FolderCheck, 
  Sparkles, 
  Image as GalleryIcon, 
  X
} from 'lucide-react';
import { Reveal, RevealGroup } from '@/components/ui/reveal';
import SectionHeading from '@/components/ui/section-heading';
import { useLanguage } from '../LanguageContext';

const buildLinkCategories = (t) => [
  {
    id: 'portals',
    title: t('quickLinksCatPortalsTitle'),
    subtitle: t('quickLinksCatPortalsSubtitle'),
    icon: ExternalLink,
    color: 'from-[#011a39] to-blue-600',
    badgeBg: 'bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800',
    description: t('quickLinksCatPortalsDesc'),
    items: [
      { label: 'SIDBI Refinance Portal', href: 'https://www.sidbi.in/', desc: 'Apex financial institution for MSME refinancing', type: 'PORTAL' },
      { label: 'Stand Up India Portal', href: 'https://www.standupmitra.in/', desc: 'Greenfield enterprise loans for SC/ST & Women', type: 'PORTAL' },
      { label: 'DFS Financial Services', href: 'https://financialservices.gov.in/', desc: 'Department of Financial Services, Ministry of Finance', type: 'GOVT' },
      { label: 'NABARD Rural Credit', href: 'https://www.nabard.org/', desc: 'National Bank for Agriculture & Rural Development', type: 'APEX' },
      { label: 'UdyamiMitra Portal', href: 'https://www.udyamimitra.in/', desc: 'Matchmaking platform for MSME credit access', type: 'PORTAL' },
      { label: 'Jansamarth Credit Portal', href: 'https://www.jansamarth.in/login', desc: 'One-stop digital portal linking govt credit schemes', type: 'PORTAL' }
    ]
  },
  {
    id: 'reports',
    title: t('quickLinksCatReportsTitle'),
    subtitle: t('quickLinksCatReportsSubtitle'),
    icon: FileText,
    color: 'from-emerald-800 to-teal-900',
    badgeBg: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
    description: t('quickLinksCatReportsDesc'),
    items: [
      { label: 'PMMY Annual Performance 2023-24', href: 'https://www.mudra.org.in', desc: 'Comprehensive financial year statistical bulletin', type: 'PDF • 4.8 MB' },
      { label: 'Cumulative Progress Report', href: 'https://www.mudra.org.in', desc: 'Decade performance summary since 2015 inception', type: 'PDF • 6.2 MB' },
      { label: 'State-wise Sanctions & Disbursement', href: 'https://www.mudra.org.in', desc: '28 States & 8 UTs granular credit breakdown', type: 'XLS • 2.1 MB' },
      { label: 'Bank & MLI Wise Credit Breakdown', href: 'https://www.mudra.org.in', desc: 'Performance records across 1,500+ lending institutions', type: 'PDF • 3.5 MB' },
      { label: 'Women Entrepreneurship Impact Study', href: 'https://www.mudra.org.in', desc: '70%+ women empowerment gender analysis', type: 'PDF • 5.1 MB' },
      { label: 'Category Wise (Shishu/Kishore/Tarun)', href: 'https://www.mudra.org.in', desc: 'Distribution across micro loan tiers', type: 'PDF • 2.9 MB' }
    ]
  },
  {
    id: 'documents',
    title: t('quickLinksCatDocumentsTitle'),
    subtitle: t('quickLinksCatDocumentsSubtitle'),
    icon: FolderCheck,
    color: 'from-amber-700 to-amber-900',
    badgeBg: 'bg-amber-500/10 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800',
    description: t('quickLinksCatDocumentsDesc'),
    items: [
      { label: 'Coffee Table Book - MUDRA Udyamis', href: 'https://www.mudra.org.in', desc: 'High-res commemorative volume of Indian entrepreneurs', type: 'PDF • 12.4 MB' },
      { label: 'Grassroots Success Stories Vol I', href: 'https://www.mudra.org.in', desc: 'First-hand stories of micro enterprise founders', type: 'PDF • 8.1 MB' },
      { label: 'Grassroots Success Stories Vol II', href: 'https://www.mudra.org.in', desc: 'Women-led rural manufacturing case studies', type: 'PDF • 9.5 MB' },
      { label: 'MUDRA Scheme Operating Guidelines', href: 'https://www.mudra.org.in', desc: 'RBI & SIDBI statutory circulars and rules', type: 'PDF • 1.8 MB' },
      { label: 'MUDRA Card Operational Manual', href: 'https://www.mudra.org.in', desc: 'RuPay debit card working capital guidelines', type: 'PDF • 2.3 MB' }
    ]
  },
  {
    id: 'events',
    title: t('quickLinksCatEventsTitle'),
    subtitle: t('quickLinksCatEventsSubtitle'),
    icon: GalleryIcon,
    color: 'from-red-800 to-rose-950',
    badgeBg: 'bg-red-500/10 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800',
    description: t('quickLinksCatEventsDesc'),
    items: [
      { label: 'National MUDRA Loan Melas 2026', href: 'https://www.mudra.org.in', desc: '500+ district credit disbursement camps', type: 'EVENT' },
      { label: 'National MSME Awards Ceremony', href: 'https://www.mudra.org.in', desc: 'Recognizing top grassroots micro enterprises', type: 'GALLERY' },
      { label: 'State Entrepreneurship Conclaves', href: 'https://www.mudra.org.in', desc: 'State level banker & borrower meets', type: 'MEDIA' },
      { label: 'Financial Literacy Workshops', href: 'https://www.mudra.org.in', desc: 'RSETI & EDP skill development programs', type: 'ARCHIVE' },
      { label: 'Official Press Bulletins 2026', href: 'https://www.mudra.org.in', desc: 'Verified Ministry of Finance releases', type: 'PRESS' }
    ]
  }
];

export default function QuickLinks() {
  const { t } = useLanguage();
  const linkCategories = buildLinkCategories(t);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (!selectedDoc) return undefined;

    const onKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedDoc(null);
    };

    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedDoc]);

  return (
    <section className="section-y relative border-t border-slate-200 text-slate-900 dark:border-slate-800 dark:text-slate-100">
      <div className="pointer-events-none absolute left-10 top-1/3 h-96 w-96 rounded-full bg-blue-400/8 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-10 right-10 h-96 w-96 rounded-full bg-blue-600/8 blur-3xl" aria-hidden="true" />

      <div className="shell relative">
        <SectionHeading
          eyebrow={t('quickLinksEyebrow')}
          icon={Sparkles}
          title={t('quickLinksTitle')}
          description={t('quickLinksDescription')}
        />

        <RevealGroup stagger={90} className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {linkCategories.map((category, idx) => (
            <Reveal key={category.id} index={idx} className="h-full">
              <article className="card-lift card-accent-top group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:border-blue-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-600/50">

                <div className="mb-5 flex items-start justify-between gap-3">
                  <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${category.color} text-white shadow-sm transition-transform duration-300 group-hover:scale-105`}>
                    <category.icon size={21} aria-hidden="true" />
                  </span>

                  <span className={`rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${category.badgeBg}`}>
                    {category.subtitle}
                  </span>
                </div>

                <h3 className="mb-2 text-lg font-extrabold tracking-tight text-slate-900 transition-colors duration-200 group-hover:text-blue-700 dark:text-white dark:group-hover:text-blue-400">
                  {category.title}
                </h3>

                <p className="mb-4 text-[11px] font-medium leading-relaxed text-slate-500 dark:text-slate-400">
                  {category.description}
                </p>

                <ul className="space-y-1">
                  {category.items.map((item, itemIdx) => (
                    <li key={itemIdx}>
                      <button
                        type="button"
                        onClick={() => setSelectedDoc(item)}
                        className="group/item flex w-full items-center justify-between gap-2 rounded-lg border border-transparent px-2.5 py-2 text-left text-xs font-semibold text-slate-700 transition-all duration-200 hover:translate-x-0.5 hover:border-blue-200 hover:bg-blue-50/80 hover:text-blue-700 dark:text-slate-200 dark:hover:border-slate-700 dark:hover:bg-slate-800/80 dark:hover:text-blue-400"
                      >
                        <span className="truncate pr-1">{item.label}</span>
                        <span className="flex shrink-0 items-center gap-1">
                          <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[9px] font-bold text-slate-500 transition-colors duration-200 group-hover/item:bg-blue-700 group-hover/item:text-white dark:bg-slate-800 dark:text-slate-400">
                            {item.type}
                          </span>
                          <ArrowRight size={12} className="text-blue-600 opacity-0 transition-all duration-200 group-hover/item:translate-x-0.5 group-hover/item:opacity-100" aria-hidden="true" />
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto border-t border-slate-100 pt-4 dark:border-slate-800">
                  <a 
                    href="https://www.mudra.org.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link flex items-center justify-between text-xs font-bold uppercase tracking-wide text-blue-700 dark:text-blue-400"
                  >
                    <span>{t('quickLinksExploreDirectory')}</span>
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 transition-all duration-200 group-hover/link:translate-x-0.5 group-hover/link:bg-blue-700 group-hover/link:text-white dark:bg-slate-800">
                      <ArrowRight size={14} aria-hidden="true" />
                    </span>
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </RevealGroup>
      </div>

      {/* Resource detail dialog */}
      <AnimatePresence>
        {selectedDoc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm"
            onClick={() => setSelectedDoc(null)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="resource-dialog-title"
              initial={{ opacity: 0, scale: 0.97, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 12 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900 md:p-8"
            >
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setSelectedDoc(null)}
                className="absolute right-5 top-5 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-slate-100 text-slate-700 transition-colors duration-200 hover:bg-blue-700 hover:text-white dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                aria-label="Close modal"
              >
                <X size={18} aria-hidden="true" />
              </button>

              <span className="eyebrow mb-4">
                <FileText size={13} aria-hidden="true" />
                <span>OFFICIAL RESOURCE</span>
              </span>

              <h3 id="resource-dialog-title" className="mb-3 mt-1 text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                {selectedDoc.label}
              </h3>

              <p className="mb-5 rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs font-medium leading-relaxed text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                {selectedDoc.desc}
              </p>

              <div className="mb-6 flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2.5 text-xs font-bold text-slate-500 dark:bg-slate-800/60 dark:text-slate-400">
                <span>File Format / Gateway:</span>
                <span className="text-blue-700 dark:text-blue-400">{selectedDoc.type}</span>
              </div>

              <div className="flex flex-wrap items-center justify-end gap-3 border-t border-slate-100 pt-5 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setSelectedDoc(null)}
                  className="btn text-xs text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  Close
                </button>

                <a
                  href={selectedDoc.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setSelectedDoc(null)}
                  className="btn btn-primary text-xs"
                >
                  <span>Open Resource</span>
                  <ExternalLink size={14} className="btn-icon" aria-hidden="true" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
