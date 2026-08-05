import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, Sparkles } from 'lucide-react';
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

  const images = galleryImages[activeCategory] || [];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070b14] text-slate-900 dark:text-slate-100 transition-colors duration-300 flex flex-col justify-between">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 py-12 w-full">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 bg-[#f97316] text-white px-3.5 py-1 rounded-md text-xs font-black tracking-wider uppercase mb-3 shadow-sm">
            <Sparkles size={14} className="text-white" />
            <span>OFFICIAL MEDIA ARCHIVE</span>
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0f2942] dark:text-white tracking-tight mb-3">
            GALLERY
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base font-semibold">
            Official photographs of Pradhan Mantri MUDRA Yojana inauguration, awards ceremonies, conferences, and foundation day events.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
          {categories.map((cat) => (
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-black tracking-wider transition-all ${activeCategory === cat.id
                  ? 'bg-red-800 dark:bg-amber-500 text-white dark:text-slate-950 shadow-md'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-amber-50'
                }`}
            >
              {cat.label}
            </motion.button>
          ))}
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="wait">
            {images.map((img, idx) => (
              <motion.div
                key={`${activeCategory}-${idx}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                whileHover={{ y: -6 }}
                className="group relative bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-800 cursor-pointer flex flex-col justify-between"
                onClick={() => setSelectedImage(img)}
              >
                <div className="relative h-64 overflow-hidden bg-slate-200 dark:bg-slate-800">
                  <img
                    src={img.url}
                    alt={img.caption}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold shadow-lg">
                      <ZoomIn size={22} />
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
                  <p className="text-xs font-black text-slate-800 dark:text-slate-200">
                    {img.caption}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md p-4 flex items-center justify-center"
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="relative max-w-4xl w-full bg-slate-900 rounded-3xl overflow-hidden border border-slate-700 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-red-700 transition-colors"
                >
                  <X size={20} />
                </button>

                <img
                  src={selectedImage.url}
                  alt={selectedImage.caption}
                  className="w-full max-h-[75vh] object-contain bg-black"
                />

                <div className="p-5 bg-slate-900 border-t border-slate-800">
                  <p className="text-sm font-black text-white text-center">
                    {selectedImage.caption}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </main>

      <Footer />
      <ChatBot />
    </div>
  );
}