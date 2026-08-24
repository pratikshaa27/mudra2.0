import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, Image as ImageIcon } from 'lucide-react';
import Header from '../components/home/Header';
import Footer from '../components/home/Footer';
import ChatBot from '../components/ChatBot';

const categories = [
  { id: 'inauguration', label: 'MUDRA INAUGURATION' },
  { id: 'awards', label: 'AWARDS' },
  { id: 'conferences', label: 'CONFERENCES' },
  { id: 'programmes', label: 'PROGRAMMES' },
  { id: 'foundation', label: '10TH FOUNDATION DAY' },
];

// Magazine Grid sizing is derived from position, not a hardcoded id, so the
// editorial rhythm (one big cover cell, one tall cell, a wide cell, and
// normal squares) holds up for every category regardless of how many photos
// it has — from 2 (awards) to 6 (inauguration).
const MAGAZINE_PATTERN = [
  { type: 'cover', span: 'col-span-2 row-span-2' },
  { type: 'tall', span: 'col-span-1 row-span-2' },
  { type: 'normal', span: 'col-span-1 row-span-1' },
  { type: 'wide', span: 'col-span-2 row-span-1' },
  { type: 'normal', span: 'col-span-1 row-span-1' },
  { type: 'normal', span: 'col-span-1 row-span-1' }
];

function getMagazineCell(idx) {
  return MAGAZINE_PATTERN[idx % MAGAZINE_PATTERN.length];
}

const galleryImages = {
  inauguration: [
    { url: 'https://media.base44.com/images/public/6978c66565209a38e92b1aa2/94ec599e3_image.png', caption: 'PM Modi at MUDRA Launch' },
    { url: 'https://media.base44.com/images/public/6978c66565209a38e92b1aa2/fb7f3e133_image.png', caption: 'MUDRA Inauguration - Dignitaries' },
    { url: 'https://media.base44.com/images/public/6978c66565209a38e92b1aa2/d2f6d13eb_image.png', caption: 'PM Modi at PMMY Launch' },
    { url: 'https://media.base44.com/images/public/6978c66565209a38e92b1aa2/1c94928a7_image.png', caption: 'PM Modi Distributing Loan Cards' },
    { url: 'https://media.base44.com/images/public/6978c66565209a38e92b1aa2/986054bf8_image.png', caption: 'MUDRA Loan Disbursement Ceremony' },
    { url: 'https://media.base44.com/images/public/6978c66565209a38e92b1aa2/8f5dc791a_image.png', caption: 'PM Modi Handing Over Loan Passbook' },
  ],
  awards: [
    { url: 'https://media.base44.com/images/public/6978c66565209a38e92b1aa2/2cb0ecb45_image.png', caption: 'PM Modi Handing Over Award' },
    { url: 'https://media.base44.com/images/public/6978c66565209a38e92b1aa2/7748456b5_image.png', caption: 'SKOCH Award - Pradhan Mantri MUDRA Yojana' },
  ],
  conferences: [
    { url: 'https://media.base44.com/images/public/6978c66565209a38e92b1aa2/5b38c7001_image.png', caption: 'Bankers Borrowers Business Meet - Empowering MSME' },
    { url: 'https://media.base44.com/images/public/6978c66565209a38e92b1aa2/5ea3c1e1c_image.png', caption: 'ASSOCHAM Appreciation Ceremony' },
    { url: 'https://media.base44.com/images/public/6978c66565209a38e92b1aa2/c7a7fd8c6_image.png', caption: 'Madhya Pradesh Inclusive Finance Conference' },
    { url: 'https://media.base44.com/images/public/6978c66565209a38e92b1aa2/b2bf9d19d_image.png', caption: 'Finance Companies Conference - Mumbai 2016' },
  ],
  programmes: [
    { url: 'https://media.base44.com/images/public/6978c66565209a38e92b1aa2/8470fe5e1_image.png', caption: 'MUDRA Key Handover Ceremony' },
    { url: 'https://media.base44.com/images/public/6978c66565209a38e92b1aa2/e36016ce5_image.png', caption: 'Launch of 101 E-Rickshaw & 251 Cycle Rickshaw - Lucknow 2015' },
    { url: 'https://media.base44.com/images/public/6978c66565209a38e92b1aa2/306cb91f3_image.png', caption: 'MUDRA Publication Launch' },
  ],
  foundation: [
    { url: 'https://media.base44.com/images/public/6978c66565209a38e92b1aa2/7020d1e25_image.png', caption: 'MUDRA 10th Foundation Day - Felicitation' },
    { url: 'https://media.base44.com/images/public/6978c66565209a38e92b1aa2/2c1769430_image.png', caption: 'MUDRA 10th Foundation Day - Team Photo' },
    { url: 'https://media.base44.com/images/public/6978c66565209a38e92b1aa2/19029d398_image.png', caption: 'MUDRA Glorious 10 Years - Group Photo' },
    { url: 'https://media.base44.com/images/public/6978c66565209a38e92b1aa2/80ae4e9cf_image.png', caption: 'MUDRA 10th Foundation Day - Cake Cutting' },
  ],
};

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('inauguration');
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-slate-50 transition-colors duration-300 dark:bg-[#021731]">
      <div
        className="pointer-events-none fixed inset-0 z-0 bg-cover bg-center opacity-[0.05] dark:opacity-[0.04]"
        style={{ backgroundImage: `url('/photo/tajmahal.png')` }}
        aria-hidden="true"
      />

      <div className="relative z-10">
        <Header />

        <div className="py-14 relative overflow-hidden bg-gradient-to-br from-[#075985] via-[#075985] to-[#021731]">
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.12, 0.22, 0.12],
                x: [0, 20, 0]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-white/20 blur-3xl"
            />
            <motion.div
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.12, 0.2, 0.12],
                x: [0, -20, 0]
              }}
              transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-white/10 blur-3xl"
            />
          </div>

          <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.span
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-1.5 bg-[#f97316] text-white px-3 py-1 rounded-full text-[10px] font-black tracking-wider uppercase mb-2 shadow-sm"
              >
                <ImageIcon size={12} className="text-white" />
                <span>PHOTO GALLERY</span>
              </motion.span>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight mb-2 [text-shadow:0_4px_18px_rgba(2,23,49,0.55)]">
                Photo Gallery
              </h1>
              <p className="pb-5 text-blue-50 max-w-3xl mx-auto text-sm sm:text-base font-semibold leading-snug [text-shadow:0_2px_10px_rgba(2,23,49,0.5)]">
                A visual journey through MUDRA's milestones, events, and celebrations.
              </p>
            </motion.div>
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-[-1px] z-10" aria-hidden="true">
            <svg viewBox="0 0 1440 140" preserveAspectRatio="none" className="block h-14 w-full sm:h-24">
              <defs>
                <linearGradient id="galleryHeroCurveBorder" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#7dd3fc" />
                  <stop offset="55%" stopColor="#00b6f0" />
                  <stop offset="100%" stopColor="#021731" />
                </linearGradient>
              </defs>
              <path d="M0,70 C360,0 720,140 1080,70 C1260,35 1350,20 1440,45 L1440,140 L0,140 Z" className="fill-slate-50 dark:fill-[#021731]" />
              <path d="M0,70 C360,0 720,140 1080,70 C1260,35 1350,20 1440,45" fill="none" stroke="url(#galleryHeroCurveBorder)" strokeWidth="7" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        <main className="max-w-7xl mx-auto px-4 py-12 w-full relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-8 bg-blue-700 dark:bg-blue-400"></div>
            <h2 className="text-2xl font-black text-[#011a39] dark:text-white">Photo Gallery</h2>
          </div>

          <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
            {categories.map((cat) => (
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-black tracking-wide transition-all ${
                  activeCategory === cat.id
                    ? 'bg-blue-800 dark:bg-blue-600 text-white shadow-lg'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-blue-50 dark:hover:bg-slate-800'
                }`}
              >
                {cat.label}
              </motion.button>
            ))}
          </div>

          <motion.div
            layout
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[170px] sm:auto-rows-[190px] md:auto-rows-[200px] [grid-auto-flow:dense] gap-3 md:gap-4"
          >
            <AnimatePresence mode="wait">
              {galleryImages[activeCategory]?.map((image, idx) => {
                const cell = getMagazineCell(idx);
                const isCover = cell.type === 'cover';
                const isFeature = isCover || cell.type === 'tall' || cell.type === 'wide';
                return (
                  <motion.div
                    key={`${activeCategory}-${idx}`}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: idx * 0.05 }}
                    className={`${cell.span} relative group cursor-pointer overflow-hidden rounded-3xl shadow-md hover:shadow-xl border border-slate-200 dark:border-slate-800 bg-slate-900 transition-all`}
                    onClick={() => setSelectedImage(image)}
                  >
                    <img
                      src={image.url}
                      alt={image.caption}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    {/* Persistent editorial caption bar, not hover-only — the
                        "always-on kicker + headline" is what reads as
                        magazine layout rather than a plain hover-gallery. */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />

                    {isCover && (
                      <span className="absolute top-4 left-4 text-5xl md:text-6xl font-black text-white/20 leading-none select-none">
                        01
                      </span>
                    )}

                    <div className={`absolute bottom-0 left-0 right-0 ${isFeature ? 'p-4 md:p-5' : 'p-3'}`}>
                      <span className={`block font-black uppercase tracking-wider text-amber-400 mb-1 ${isCover ? 'text-[11px]' : 'text-[9px]'}`}>
                        {categories.find((c) => c.id === activeCategory)?.label}
                      </span>
                      <p className={`text-white font-black leading-snug ${isCover ? 'text-xl md:text-2xl line-clamp-3' : isFeature ? 'text-sm md:text-base line-clamp-2' : 'text-xs line-clamp-2'}`}>
                        {image.caption}
                      </p>
                    </div>

                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-9 h-9 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <ZoomIn className="text-white" size={18} />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </main>

        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedImage(null)}
            >
              <button
                className="absolute top-6 right-6 text-white hover:text-amber-400 transition-colors"
                onClick={() => setSelectedImage(null)}
              >
                <X size={32} />
              </button>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="max-w-4xl max-h-[80vh] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={selectedImage.url}
                  alt={selectedImage.caption}
                  className="max-w-full max-h-[70vh] object-contain"
                />
                <p className="text-white dark:text-slate-900 text-center mt-4 text-lg font-bold px-4 pb-4">{selectedImage.caption}</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <Footer />
        <ChatBot />
      </div>
    </div>
  );
}
