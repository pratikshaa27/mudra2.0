import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  ExternalLink, 
  FileText, 
  FolderCheck, 
  Sparkles, 
  Image as GalleryIcon, 
  CheckCircle2, 
  X
} from 'lucide-react';

const linkCategories = [
  {
    id: 'portals',
    title: 'QUICK LINKS',
    subtitle: 'Institutional Portals',
    icon: ExternalLink,
    color: 'from-[#0f2942] to-[#1e40af]',
    badgeBg: 'bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800',
    description: 'Direct access to government refinancing portals, lending gateways, and rural credit networks.',
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
    title: 'PMMY REPORTS',
    subtitle: 'Financial Performance',
    icon: FileText,
    color: 'from-emerald-800 to-teal-900',
    badgeBg: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
    description: 'Audited financial progress statistics, state-wise loan disbursements, and MLI performance metrics.',
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
    title: 'DOCUMENTS',
    subtitle: 'Official Publications',
    icon: FolderCheck,
    color: 'from-amber-700 to-amber-900',
    badgeBg: 'bg-amber-500/10 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800',
    description: 'Official circulars, coffee table books, MSME policy frameworks, and success story compendiums.',
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
    title: 'EVENTS & MEDIA',
    subtitle: 'Visual Highlights',
    icon: GalleryIcon,
    color: 'from-red-800 to-rose-950',
    badgeBg: 'bg-red-500/10 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800',
    description: 'Press bulletins, photo archives from national loan melas, and MSME award ceremonies.',
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
  const [selectedDoc, setSelectedDoc] = useState(null);

  return (
    <section className="py-20 bg-transparent text-slate-900 dark:text-slate-100 transition-colors duration-300 relative border-t border-slate-200 dark:border-slate-800">
      
      {/* Glow Ambient Orbs */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        
        {/* Centered Uniform Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-300 text-xs font-black tracking-wider uppercase mb-3">
            <Sparkles size={14} className="text-amber-600 dark:text-amber-400" />
            <span>RESOURCE HUB & DIRECTORY</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">
            Essential Links & Official Reports
          </h2>

          <div className="w-32 h-1.5 bg-gradient-to-r from-red-700 via-amber-500 to-red-700 mx-auto rounded-full mb-6"></div>

          <p className="text-slate-600 dark:text-slate-300 max-w-3xl mx-auto text-sm md:text-base font-semibold leading-relaxed">
            Direct access to government refinancing portals, annual statistical data, scheme circulars, and official MSME publications.
          </p>
        </motion.div>

        {/* Animated Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {linkCategories.map((category, idx) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 35, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.12, duration: 0.5, ease: 'easeOut' }}
              whileHover={{ 
                y: -10, 
                scale: 1.02,
                boxShadow: "0 25px 50px -12px rgba(15, 41, 66, 0.25)" 
              }}
              className="bg-white dark:bg-slate-900 rounded-3xl p-6 border-2 border-slate-200 dark:border-slate-800 hover:border-amber-400 dark:hover:border-amber-500/70 transition-all flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Subtle Card Glow Line on Hover */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-700 via-amber-500 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div>
                {/* Animated Header Badge & Icon */}
                <div className="flex items-center justify-between mb-5">
                  <motion.div 
                    whileHover={{ rotate: 12, scale: 1.15 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className={`w-13 h-13 w-12 h-12 rounded-2xl bg-gradient-to-br ${category.color} text-white flex items-center justify-center shadow-md`}
                  >
                    <category.icon size={22} />
                  </motion.div>
                  
                  <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border ${category.badgeBg}`}>
                    {category.subtitle}
                  </span>
                </div>

                <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2 tracking-tight group-hover:text-red-800 dark:group-hover:text-amber-400 transition-colors">
                  {category.title}
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold mb-4 leading-relaxed">
                  {category.description}
                </p>

                {/* Animated List of Resource Items */}
                <ul className="space-y-2">
                  {category.items.map((item, itemIdx) => (
                    <motion.li 
                      key={itemIdx}
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.15 }}
                    >
                      <button
                        type="button"
                        onClick={() => setSelectedDoc(item)}
                        className="w-full text-left flex items-center justify-between p-2.5 rounded-xl text-slate-800 dark:text-slate-200 hover:text-red-800 dark:hover:text-amber-400 hover:bg-amber-50/80 dark:hover:bg-slate-800/80 font-bold text-xs transition-all group/item border border-transparent hover:border-amber-200 dark:hover:border-slate-700"
                      >
                        <span className="truncate pr-2">{item.label}</span>
                        <div className="flex items-center gap-1 shrink-0">
                          <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover/item:bg-red-800 group-hover/item:text-white transition-colors">
                            {item.type}
                          </span>
                          <ArrowRight size={13} className="opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all text-amber-500" />
                        </div>
                      </button>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Card Footer Button */}
              <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800">
                <a 
                  href="https://www.mudra.org.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between text-xs font-black text-red-800 dark:text-amber-400 uppercase tracking-wider group/link"
                >
                  <span>Explore Directory</span>
                  <motion.div 
                    whileHover={{ x: 4 }}
                    className="w-8 h-8 rounded-full bg-amber-50 dark:bg-slate-800 flex items-center justify-center group-hover/link:bg-red-800 group-hover/link:text-white transition-colors shadow-sm"
                  >
                    <ArrowRight size={14} />
                  </motion.div>
                </a>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Interactive Detail Modal Drawer */}
      <AnimatePresence>
        {selectedDoc && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.2 }}
              className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 md:p-8 border-2 border-slate-200 dark:border-slate-800 shadow-2xl relative"
            >
              <button
                type="button"
                onClick={() => setSelectedDoc(null)}
                className="absolute top-5 right-5 z-20 w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-red-800 hover:text-white transition-colors flex items-center justify-center border border-slate-200 dark:border-slate-700"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 dark:bg-red-950/60 text-red-800 dark:text-amber-400 text-xs font-black uppercase tracking-wider mb-4 border border-red-200 dark:border-red-800">
                <FileText size={14} />
                <span>OFFICIAL RESOURCE</span>
              </div>

              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">
                {selectedDoc.label}
              </h3>

              <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 mb-6 bg-amber-50 dark:bg-slate-800 p-4 rounded-2xl border border-amber-200 dark:border-slate-700">
                {selectedDoc.desc}
              </p>

              <div className="flex items-center justify-between text-xs font-extrabold text-slate-500 dark:text-slate-400 mb-6 px-3 py-2 bg-slate-50 dark:bg-slate-800/60 rounded-xl">
                <span>File Format / Gateway:</span>
                <span className="text-red-800 dark:text-amber-400 font-black">{selectedDoc.type}</span>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setSelectedDoc(null)}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  Close
                </button>

                <a
                  href={selectedDoc.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setSelectedDoc(null)}
                  className="px-6 py-2.5 rounded-xl bg-red-800 hover:bg-red-900 text-white font-black text-xs shadow-lg transition-all flex items-center gap-2"
                >
                  <span>Open Resource</span>
                  <ExternalLink size={15} />
                </a>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}