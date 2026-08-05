import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink, FileText, FolderCheck, Sparkles, Image as GalleryIcon } from 'lucide-react';

const linkCategories = [
  {
    title: 'QUICK LINKS',
    subtitle: 'Institutional Portals',
    icon: ExternalLink,
    color: 'from-[#0f2942] to-[#1e40af]',
    badgeBg: 'bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800',
    items: [
      { label: 'SIDBI Refinance', href: 'https://www.sidbi.in/' },
      { label: 'Stand Up India', href: 'https://www.standupmitra.in/' },
      { label: 'DFS Financial Services', href: 'https://financialservices.gov.in/' },
      { label: 'MFIN Network', href: '#' },
      { label: 'SA-DHAN Microfinance', href: '#' },
      { label: 'NABARD Rural Credit', href: 'https://www.nabard.org/' },
      { label: 'UdyamiMitra Portal', href: 'https://www.udyamimitra.in/' },
      { label: 'Jansamarth Credit Portal', href: 'https://www.jansamarth.in/login' }
    ]
  },
  {
    title: 'PMMY REPORTS',
    subtitle: 'Financial Performance',
    icon: FileText,
    color: 'from-emerald-800 to-teal-900',
    badgeBg: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
    items: [
      { label: 'PMMY Performance 2023-24', href: '#' },
      { label: 'Cumulative Progress Report', href: '#' },
      { label: 'State-wise Sanctions Data', href: '#' },
      { label: 'Bank & MLI Wise Breakdown', href: '#' },
      { label: 'Women Entrepreneurship Stats', href: '#' },
      { label: 'Category-wise (Shishu/Kishore/Tarun)', href: '#' }
    ]
  },
  {
    title: 'DOCUMENTS',
    subtitle: 'Official Publications',
    icon: FolderCheck,
    color: 'from-amber-700 to-amber-900',
    badgeBg: 'bg-amber-500/10 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800',
    items: [
      { label: 'Coffee Table Book - MUDRA', href: '#' },
      { label: 'Success Stories Volume I', href: '#' },
      { label: 'Success Stories Volume II', href: '#' },
      { label: 'Success Stories Volume III', href: '#' },
      { label: 'Profile of MUDRA Udyamis', href: '#' },
      { label: 'Scheme Guidelines & Circulars', href: '#' }
    ]
  },
  {
    title: 'EVENTS & MEDIA',
    subtitle: 'Visual Highlights',
    icon: GalleryIcon,
    color: 'from-red-800 to-rose-950',
    badgeBg: 'bg-red-500/10 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800',
    items: [
      { label: 'MUDRA Launch Ceremonies', href: '#' },
      { label: 'National MSME Awards', href: '#' },
      { label: 'State Entrepreneur Conclaves', href: '#' },
      { label: 'Financial Literacy Programmes', href: '#' },
      { label: 'Press Releases & Bulletins', href: '#' }
    ]
  }
];

export default function QuickLinks() {
  return (
    <section className="py-20 bg-slate-50 dark:bg-[#070b14] text-slate-900 dark:text-slate-100 transition-colors duration-300 relative border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-300 text-xs font-black tracking-wider uppercase mb-3">
              <Sparkles size={14} className="text-amber-600 dark:text-amber-400" />
              <span>RESOURCE HUB & DIRECTORY</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              Essential Links & Official Reports
            </h2>
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm font-medium max-w-md">
            Direct access to government refinancing portals, annual statistical data, scheme circulars, and MSME publications.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {linkCategories.map((category, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              whileHover={{ y: -6 }}
              className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-xl dark:shadow-2xl border-2 border-slate-200/80 dark:border-slate-800 hover:border-amber-400 dark:hover:border-amber-500/50 transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Header Badge */}
                <div className="flex items-center justify-between mb-5">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${category.color} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
                    <category.icon size={22} />
                  </div>
                  <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border ${category.badgeBg}`}>
                    {category.subtitle}
                  </span>
                </div>

                <h3 className="text-xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">
                  {category.title}
                </h3>

                {/* List Items */}
                <ul className="space-y-2">
                  {category.items.map((item, itemIdx) => (
                    <li key={itemIdx}>
                      <a 
                        href={item.href} 
                        className="flex items-center justify-between p-2 rounded-xl text-slate-700 dark:text-slate-300 hover:text-red-700 dark:hover:text-amber-400 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold text-xs transition-all group/item"
                      >
                        <span className="truncate">{item.label}</span>
                        <ArrowRight size={13} className="opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all text-amber-500 shrink-0" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* View All Button */}
              <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800">
                <a 
                  href="#" 
                  className="flex items-center justify-between text-xs font-black text-red-800 dark:text-amber-400 uppercase tracking-wider group/link hover:text-red-900"
                >
                  <span>Explore Directory</span>
                  <div className="w-7 h-7 rounded-full bg-red-50 dark:bg-slate-800 flex items-center justify-center group-hover/link:bg-red-800 group-hover/link:text-white transition-all">
                    <ArrowRight size={13} />
                  </div>
                </a>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}