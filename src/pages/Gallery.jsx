import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Page Header */}
      <div className="bg-gradient-to-r from-red-800 to-red-900 py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-white">GALLERY</h1>
            <nav className="text-white/80 text-sm">
              <span className="hover:text-white cursor-pointer">Home</span>
              <span className="mx-2">/</span>
              <span className="text-amber-300">Gallery</span>
            </nav>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="bg-white border-b shadow-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex overflow-x-auto scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-6 py-4 text-sm font-semibold whitespace-nowrap transition-all border-b-2 ${
                  activeCategory === cat.id
                    ? 'text-red-700 border-red-700 bg-red-50'
                    : 'text-gray-600 border-transparent hover:text-red-700 hover:bg-gray-50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1 h-8 bg-red-700"></div>
          <h2 className="text-2xl font-bold text-gray-800">Photo Gallery</h2>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          <AnimatePresence mode="wait">
            {galleryImages[activeCategory]?.map((image, idx) => (
              <motion.div
                key={`${activeCategory}-${idx}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: idx * 0.05 }}
                className="relative group cursor-pointer overflow-hidden rounded-lg shadow-md"
                onClick={() => setSelectedImage(image)}
              >
                <img 
                  src={image.url} 
                  alt={image.caption}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-white text-sm font-medium">{image.caption}</p>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <ZoomIn className="text-white" size={24} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
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
              className="max-w-4xl max-h-[80vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={selectedImage.url} 
                alt={selectedImage.caption}
                className="max-w-full max-h-[70vh] object-contain rounded-lg"
              />
              <p className="text-white text-center mt-4 text-lg">{selectedImage.caption}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
      <ChatBot />
    </div>
  );
}