import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  ZoomIn, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  Search, 
  Share2, 
  Download, 
  Tag, 
  Calendar,
  Building2
} from 'lucide-react';
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
    { url: 'https://media.base44.com/images/public/6978c66565209a38e92b1aa2/94ec599e3_image.png', caption: 'PM Modi at MUDRA Launch Ceremony', date: 'April 2015', location: 'New Delhi' },
    { url: 'https://media.base44.com/images/public/6978c66565209a38e92b1aa2/fb7f3e133_image.png', caption: 'MUDRA Inauguration - Union Finance Minister & Dignitaries', date: 'April 2015', location: 'Vigyan Bhawan' },
    { url: 'https://media.base44.com/images/public/6978c66565209a38e92b1aa2/d2f6d13eb_image.png', caption: 'PM Modi Addressing Micro Entrepreneurs at PMMY Launch', date: 'April 2015', location: 'New Delhi' },
    { url: 'https://media.base44.com/images/public/6978c66565209a38e92b1aa2/1c94928a7_image.png', caption: 'PM Modi Distributing First Batch of MUDRA Loan Cards', date: 'April 2015', location: 'New Delhi' },
    { url: 'https://media.base44.com/images/public/6978c66565209a38e92b1aa2/986054bf8_image.png', caption: 'MUDRA Mega Loan Disbursement Ceremony', date: 'May 2015', location: 'Mumbai' },
    { url: 'https://media.base44.com/images/public/6978c66565209a38e92b1aa2/8f5dc791a_image.png', caption: 'PM Modi Handing Over MUDRA Loan Passbook to Women Artisans', date: 'April 2015', location: 'Vigyan Bhawan' },
  ],
  awards: [
    { url: 'https://media.base44.com/images/public/6978c66565209a38e92b1aa2/2cb0ecb45_image.png', caption: 'PM Modi Handing Over National MSME Award', date: 'Oct 2018', location: 'Ludhiana' },
    { url: 'https://media.base44.com/images/public/6978c66565209a38e92b1aa2/7748456b5_image.png', caption: 'SKOCH Gold Award - Pradhan Mantri MUDRA Yojana', date: 'Dec 2019', location: 'New Delhi' },
  ],
  conferences: [
    { url: 'https://media.base44.com/images/public/6978c66565209a38e92b1aa2/5b38c7001_image.png', caption: 'Bankers Borrowers Business Meet - Empowering MSME Credit', date: 'Feb 2017', location: 'Ahmedabad' },
    { url: 'https://media.base44.com/images/public/6978c66565209a38e92b1aa2/5ea3c1e1c_image.png', caption: 'ASSOCHAM Financial Inclusion Appreciation Ceremony', date: 'Nov 2016', location: 'New Delhi' },
    { url: 'https://media.base44.com/images/public/6978c66565209a38e92b1aa2/c7a7fd8c6_image.png', caption: 'Madhya Pradesh Inclusive Finance State Conference', date: 'Jul 2018', location: 'Bhopal' },
    { url: 'https://media.base44.com/images/public/6978c66565209a38e92b1aa2/b2bf9d19d_image.png', caption: 'NBFC & MFI Refinance Conference - Mumbai 2016', date: 'Sep 2016', location: 'Mumbai' },
  ],
  programmes: [
    { url: 'https://media.base44.com/images/public/6978c66565209a38e92b1aa2/8470fe5e1_image.png', caption: 'MUDRA Commercial Vehicle Key Handover Ceremony', date: 'Jan 2017', location: 'Lucknow' },
    { url: 'https://media.base44.com/images/public/6978c66565209a38e92b1aa2/e36016ce5_image.png', caption: 'Launch of 101 E-Rickshaw & 251 Cycle Rickshaw - Lucknow 2015', date: 'Aug 2015', location: 'Lucknow' },
    { url: 'https://media.base44.com/images/public/6978c66565209a38e92b1aa2/306cb91f3_image.png', caption: 'MUDRA Official Coffee Table Publication Launch', date: 'Nov 2017', location: 'New Delhi' },
  ],
  foundation: [
    { url: 'https://media.base44.com/images/public/6978c66565209a38e92b1aa2/7020d1e25_image.png', caption: 'MUDRA 10th Foundation Day - Outstanding MLI Felicitation', date: 'April 2025', location: 'New Delhi' },
    { url: 'https://media.base44.com/images/public/6978c66565209a38e92b1aa2/2c1769430_image.png', caption: 'MUDRA 10th Foundation Day - Executive Team Commemoration', date: 'April 2025', location: 'New Delhi' },
    { url: 'https://media.base44.com/images/public/6978c66565209a38e92b1aa2/19029d398_image.png', caption: 'MUDRA Glorious 10 Years - Group Photo of Awardees', date: 'April 2025', location: 'New Delhi' },
    { url: 'https://media.base44.com/images/public/6978c66565209a38e92b1aa2/80ae4e9cf_image.png', caption: 'MUDRA 10th Foundation Day - Decennial Celebration', date: 'April 2025', location: 'New Delhi' },
  ],
};

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('inauguration');
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [copied, setCopied] = useState(false);

  const images = galleryImages[activeCategory] || [];
  
  const filteredImages = images.filter(img => 
    !searchQuery || img.caption.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleNextImage = (e) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((prev) => (prev + 1) % filteredImages.length);
    }
  };

  const handlePrevImage = (e) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
    }
  };

  const currentModalImage = selectedIndex !== null ? filteredImages[selectedIndex] : null;

  const handleShare = () => {
    setCopied(true);
    navigator.clipboard.writeText(window.location.href);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070b14] text-slate-900 dark:text-slate-100 transition-colors duration-300 flex flex-col justify-between">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-12 w-full">
        
        {/* Centered Page Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-100 dark:bg-red-950/60 border border-red-300 dark:border-red-800 text-red-900 dark:text-amber-300 text-xs font-black tracking-wider uppercase mb-3 shadow-sm">
            <Sparkles size={14} className="text-red-700 dark:text-amber-400" />
            <span>OFFICIAL MEDIA ARCHIVE</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
            MUDRA Photo Gallery
          </h1>

          <div className="w-32 h-1.5 bg-gradient-to-r from-red-700 via-amber-500 to-red-700 mx-auto rounded-full mb-6"></div>

          <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base font-semibold leading-relaxed">
            Explore official photographs of Pradhan Mantri MUDRA Yojana inauguration, national MSME awards ceremonies, state level conclaves, and foundation day events.
          </p>
        </motion.div>

        {/* Search Bar & Category Navigation */}
        <div className="space-y-6 mb-12">
          
          {/* Interactive Search Bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search photo captions, events, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs font-bold shadow-md focus:outline-none focus:border-red-800 dark:focus:border-amber-400 transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-red-500 hover:underline"
              >
                Clear
              </button>
            )}
          </div>

          {/* Animated Category Tabs with Spring Pill */}
          <div className="flex items-center justify-center gap-1.5 bg-white dark:bg-slate-900 p-1.5 rounded-full border-2 border-slate-200 dark:border-slate-800 shadow-md flex-wrap justify-center max-w-4xl mx-auto">
            {categories.map((cat) => {
              const isSelected = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setSelectedIndex(null);
                  }}
                  className={`relative z-10 px-4 py-2 rounded-full text-xs font-black tracking-wider transition-colors ${
                    isSelected
                      ? 'text-white dark:text-slate-950 font-black'
                      : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="galleryCatPill"
                      transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                      className="absolute inset-0 bg-red-800 dark:bg-amber-400 rounded-full shadow-md z-[-1]"
                    />
                  )}
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

        </div>

        {/* Gallery Grid */}
        {filteredImages.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 max-w-md mx-auto">
            <Search className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <p className="text-sm font-bold text-slate-700 dark:text-slate-300">No photos found matching "{searchQuery}"</p>
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="mt-3 text-xs font-black text-red-800 dark:text-amber-400 hover:underline"
            >
              Reset Search Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            <AnimatePresence mode="wait">
              {filteredImages.map((img, idx) => (
                <motion.div
                  key={`${activeCategory}-${idx}`}
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  onClick={() => setSelectedIndex(idx)}
                  className="group relative bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-xl border-2 border-slate-200 dark:border-slate-800 hover:border-amber-400 dark:hover:border-amber-500/70 transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div className="relative h-64 overflow-hidden bg-slate-200 dark:bg-slate-800">
                    <img
                      src={img.url}
                      alt={img.caption}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="w-13 h-13 w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold shadow-xl group-hover:scale-110 transition-transform">
                        <ZoomIn size={22} />
                      </div>
                    </div>

                    <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md text-amber-300 px-2.5 py-1 rounded-full text-[10px] font-black border border-slate-700">
                      {img.date}
                    </div>
                  </div>

                  <div className="p-5 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-black text-slate-900 dark:text-white line-clamp-1">
                        {img.caption}
                      </h4>
                      <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 mt-0.5">
                        📍 {img.location}
                      </p>
                    </div>
                    <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-slate-800 text-red-800 dark:text-amber-400 flex items-center justify-center shrink-0 group-hover:bg-red-800 group-hover:text-white transition-colors">
                      <ZoomIn size={15} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Lightbox Slideshow Modal */}
        <AnimatePresence>
          {currentModalImage && (
            <div
              className="fixed inset-0 z-[9999] bg-slate-950/90 backdrop-blur-md p-4 flex items-center justify-center"
              onClick={() => setSelectedIndex(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative max-w-4xl w-full bg-slate-900 rounded-3xl overflow-hidden border-2 border-slate-800 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between text-white">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-amber-400 uppercase tracking-wider">
                      PHOTO {selectedIndex + 1} OF {filteredImages.length}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedIndex(null)}
                    className="w-9 h-9 rounded-full bg-slate-800 text-white hover:bg-red-700 transition-colors flex items-center justify-center border border-slate-700"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Main Image Container */}
                <div className="relative h-[60vh] max-h-[500px] w-full bg-black flex items-center justify-center overflow-hidden">
                  <img
                    src={currentModalImage.url}
                    alt={currentModalImage.caption}
                    className="w-full h-full object-contain"
                  />

                  {/* Left / Right Slideshow Navigation */}
                  <button
                    type="button"
                    onClick={handlePrevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-slate-900/80 text-white hover:bg-amber-500 hover:text-slate-950 flex items-center justify-center shadow-xl border border-slate-700 transition-all"
                  >
                    <ChevronLeft size={22} />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-slate-900/80 text-white hover:bg-amber-500 hover:text-slate-950 flex items-center justify-center shadow-xl border border-slate-700 transition-all"
                  >
                    <ChevronRight size={22} />
                  </button>
                </div>

                {/* Modal Footer Caption & Controls */}
                <div className="p-5 bg-slate-900 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-base font-black text-white mb-1">
                      {currentModalImage.caption}
                    </h3>
                    <p className="text-xs text-slate-400 font-bold flex items-center gap-3">
                      <span>🗓️ {currentModalImage.date}</span>
                      <span>📍 {currentModalImage.location}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={handleShare}
                      className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 font-black text-xs border border-slate-700 transition-all flex items-center gap-1.5"
                    >
                      <Share2 size={14} />
                      <span>{copied ? 'Copied Link!' : 'Share'}</span>
                    </button>
                    <a
                      href={currentModalImage.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs shadow-md transition-all flex items-center gap-1.5"
                    >
                      <Download size={14} />
                      <span>High-Res</span>
                    </a>
                  </div>
                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </main>

      <Footer />
      <ChatBot />
    </div>
  );
}