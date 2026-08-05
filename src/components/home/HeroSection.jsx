import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Award } from 'lucide-react';

const slides = [
  {
    title: "₹33,00,000+ Crore",
    subtitle: "Collateral-free MUDRA loans worth ₹33+ lakh crore disbursed",
    highlights: [
      "Funding the unfunded for ease of credit to Small businesses",
      "70% of beneficiaries are women entrepreneurs"
    ],
    bg: "from-red-800 via-red-700 to-red-900",
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6978c66565209a38e92b1aa2/39d1e2421_image.png"
  },
  {
    title: "50+ Crore Loans",
    subtitle: "Over 50 crore loans sanctioned under PMMY since inception",
    highlights: [
      "Empowering micro enterprises across India",
      "Supporting first-generation entrepreneurs"
    ],
    bg: "from-amber-700 via-amber-600 to-amber-800"
  },
  {
    title: "10 Years of MUDRA",
    subtitle: "Celebrating a decade of financial inclusion",
    highlights: [
      "Transforming lives through accessible credit",
      "Building an entrepreneurial India"
    ],
    bg: "from-red-900 via-red-800 to-red-700",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=500&q=80"
  }
];

const newsItems = [
  "Borrowers are advised to keep away from persons posing as Agents/facilitators of MUDRA/PMMY",
  "MUDRA is conducting Vigilance Awareness Week 2024",
  "New online portal launched for easier loan applications",
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentNews, setCurrentNews] = useState(0);

  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(slideTimer);
  }, []);

  useEffect(() => {
    const newsTimer = setInterval(() => {
      setCurrentNews((prev) => (prev + 1) % newsItems.length);
    }, 4000);
    return () => clearInterval(newsTimer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative">
      {/* Main Hero */}
      <div className="relative h-[500px] md:h-[600px] overflow-hidden shadow-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={`absolute inset-0 bg-gradient-to-r ${slides[currentSlide].bg}`}
          >
            {/* Decorative Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-white to-amber-400 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-yellow-500 to-amber-600 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>
              <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-white rounded-full blur-3xl"></div>
            </div>
            
            {/* Animated Mesh Background */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                backgroundSize: '40px 40px'
              }}></div>
            </div>

            {/* Content */}
            <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
              <div className="flex flex-col md:flex-row items-center justify-between w-full gap-8">
                {/* Left Badge */}
                <motion.div 
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="hidden md:flex flex-col items-center bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 rounded-2xl p-6 shadow-2xl border-4 border-amber-300/50 backdrop-blur-sm"
                >
                  <Award className="text-black mb-3 drop-shadow-lg" size={42} />
                  <span className="text-black font-black text-3xl">10</span>
                  <span className="text-black text-sm font-bold tracking-wider">YEARS OF</span>
                  <span className="text-black font-black text-lg tracking-wide">MUDRA</span>
                  <div className="mt-3 w-full h-1 bg-red-900 rounded-full"></div>
                </motion.div>

                {/* Main Content */}
                <div className="flex-1 text-center md:text-left">
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="inline-block mb-4"
                  >
                    <span className="bg-amber-400 text-black px-4 py-1 rounded-full text-xs font-bold tracking-wider shadow-lg">
                      GOVERNMENT OF INDIA INITIATIVE
                    </span>
                  </motion.div>
                  
                  <motion.h2
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
                    className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight drop-shadow-2xl"
                  >
                    {slides[currentSlide].title}
                  </motion.h2>
                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-xl md:text-3xl text-amber-100 mb-8 font-light"
                  >
                    {slides[currentSlide].subtitle}
                  </motion.p>
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="space-y-3"
                  >
                    {slides[currentSlide].highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-white text-lg">
                        <div className="w-3 h-3 bg-amber-400 rounded-full shadow-lg"></div>
                        <span className="font-medium">{highlight}</span>
                      </div>
                    ))}
                  </motion.div>
                </div>

                {/* Slide Image */}
                {slides[currentSlide].image && (
                  <motion.div 
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="hidden md:block"
                  >
                    <div className="relative">
                      <img 
                        src={slides[currentSlide].image}
                        alt="MUDRA Impact"
                        className="w-64 h-80 object-cover rounded-2xl shadow-2xl border-4 border-white/20"
                      />
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button 
          onClick={prevSlide}
          className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/30 backdrop-blur-md hover:bg-white/50 p-3 rounded-full text-white transition-all shadow-xl border border-white/20 hover:scale-110"
        >
          <ChevronLeft size={28} />
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/30 backdrop-blur-md hover:bg-white/50 p-3 rounded-full text-white transition-all shadow-xl border border-white/20 hover:scale-110"
        >
          <ChevronRight size={28} />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex gap-3 bg-black/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all ${
                idx === currentSlide ? 'bg-amber-400 w-12 shadow-lg' : 'bg-white/60 w-2 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      </div>

      {/* News Ticker */}
      <div className="bg-gradient-to-r from-amber-100 via-amber-50 to-amber-100 border-y-4 border-amber-400 shadow-inner">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-6">
          <span className="bg-gradient-to-r from-red-700 to-red-800 text-white px-5 py-2 text-sm font-bold rounded-lg shadow-lg whitespace-nowrap flex items-center gap-2">
            <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></span>
            Latest Updates
          </span>
          <div className="flex-1 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={currentNews}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -30, opacity: 0 }}
                className="text-red-900 text-base font-medium"
              >
                {newsItems[currentNews]}
              </motion.p>
            </AnimatePresence>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setCurrentNews((prev) => (prev - 1 + newsItems.length) % newsItems.length)}
              className="bg-red-700 hover:bg-red-800 text-white p-2 rounded-lg transition-all shadow-md hover:shadow-lg"
            >
              <ChevronLeft size={18} />
            </button>
            <button 
              onClick={() => setCurrentNews((prev) => (prev + 1) % newsItems.length)}
              className="bg-red-700 hover:bg-red-800 text-white p-2 rounded-lg transition-all shadow-md hover:shadow-lg"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}