import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

export default function LatestUpdatesTicker() {
  const { t } = useLanguage();
  const [currentNews, setCurrentNews] = useState(0);
  const newsItems = [t('heroNews1'), t('heroNews2'), t('heroNews3')];

  useEffect(() => {
    const newsTimer = setInterval(() => {
      setCurrentNews((prev) => (prev + 1) % newsItems.length);
    }, 4500);
    return () => clearInterval(newsTimer);
  }, [newsItems.length]);

  return (
    <div className="border-t border-[#183957] bg-[#0e263d] py-2.5 text-white">
      <div className="shell flex items-center gap-3 text-xs sm:gap-4">
        <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-blue-600 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white sm:text-[11px]">
          <span className="h-1.5 w-1.5 rounded-full bg-white" aria-hidden="true" />
          {t('latestUpdates')}
        </span>

        <div className="min-w-0 flex-1" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentNews}
              initial={{ y: 14, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -14, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="truncate font-semibold text-blue-300"
            >
              {newsItems[currentNews]}
            </motion.p>
          </AnimatePresence>
        </div>

        <div className="flex shrink-0 gap-1">
          <button
            type="button"
            aria-label="Previous update"
            onClick={() => setCurrentNews((prev) => (prev - 1 + newsItems.length) % newsItems.length)}
            className="rounded-md bg-white/10 p-2.5 text-white transition-colors duration-200 hover:bg-blue-600"
          >
            <ChevronLeft size={14} aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Next update"
            onClick={() => setCurrentNews((prev) => (prev + 1) % newsItems.length)}
            className="rounded-md bg-white/10 p-2.5 text-white transition-colors duration-200 hover:bg-blue-600"
          >
            <ChevronRight size={14} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
