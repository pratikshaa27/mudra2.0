import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Award, ShieldCheck, CheckCircle2 } from 'lucide-react';

const pmModiImage = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6978c66565209a38e92b1aa2/39d1e2421_image.png";

const TypingText = ({ text, speed = 60 }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    setDisplayedText('');
    let index = 0;

    const timer = setInterval(() => {
      if (index <= text.length) {
        setDisplayedText(text.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return (
    <span className="inline-inline">
      {displayedText}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="inline-block text-amber-300 font-bold ml-1"
      >
        |
      </motion.span>
    </span>
  );
};

const slides = [
  {
    title: "₹33,00,000+ Crore",
    subtitle: "Collateral-free MUDRA loans worth ₹33+ lakh crore disbursed",
    highlights: [
      "Funding the unfunded for ease of credit to Small businesses",
      "70% of beneficiaries are women entrepreneurs"
    ],
    image: pmModiImage
  },
  {
    title: "50+ Crore Loans",
    subtitle: "Over 50 crore loans sanctioned under PMMY since inception",
    highlights: [
      "Empowering micro enterprises across India",
      "Supporting first-generation entrepreneurs"
    ],
    image: pmModiImage
  },
  {
    title: "10 Years of MUDRA",
    subtitle: "Celebrating a decade of financial inclusion",
    highlights: [
      "Transforming lives through accessible credit",
      "Building an entrepreneurial India"
    ],
    image: pmModiImage
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
    }, 6000);
    return () => clearInterval(slideTimer);
  }, []);

  useEffect(() => {
    const newsTimer = setInterval(() => {
      setCurrentNews((prev) => (prev + 1) % newsItems.length);
    }, 4500);
    return () => clearInterval(newsTimer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative overflow-hidden">
      
      {/* Light Sky Blue Top Border Accent Strip */}
      <div className="h-3 bg-[#b4d5e0] dark:bg-slate-800 transition-colors w-full"></div>

      {/* Main Orange Background Hero Canvas Container */}
      <div className="relative min-h-[520px] md:min-h-[580px] py-10 md:py-14 flex items-center overflow-hidden bg-gradient-to-br from-[#ff6800] via-[#e65c00] to-[#c94b00] dark:from-[#c94b00] dark:via-[#9e3700] dark:to-[#070b14] text-white">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 bg-gradient-to-br from-[#ff6800] via-[#e65c00] to-[#c94b00] dark:from-[#c94b00] dark:via-[#9e3700] dark:to-[#070b14] transition-colors duration-300"
          >
            {/* Glowing Accent Orbs */}
            <div className="absolute inset-0 pointer-events-none opacity-50">
              <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                className="absolute top-0 right-0 w-[550px] h-[550px] bg-amber-300/30 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3"
              />
              <motion.div 
                animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.6, 0.3] }}
                transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
                className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-[#b4d5e0]/30 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3"
              />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center py-6">
              <div className="flex flex-col md:flex-row items-center justify-between w-full gap-8">
                
                {/* Floating 10 YEARS OF MUDRA Seal Badge */}
                <motion.div 
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0, y: [0, -8, 0] }}
                  transition={{ 
                    x: { duration: 0.5 },
                    y: { repeat: Infinity, duration: 4, ease: "easeInOut" }
                  }}
                  whileHover={{ scale: 1.08, rotate: 2 }}
                  className="hidden md:flex flex-col items-center bg-white text-slate-950 rounded-2xl p-6 shadow-2xl border-2 border-amber-300 shrink-0 cursor-pointer"
                >
                  <Award size={46} className="mb-1 text-[#ff6800] drop-shadow-md" />
                  <span className="font-black text-3xl leading-none text-slate-950">10</span>
                  <span className="text-[11px] font-black tracking-widest uppercase mt-1 text-slate-700">YEARS OF</span>
                  <span className="font-black text-lg tracking-wider text-[#ff6800]">MUDRA</span>
                </motion.div>

                {/* Center Content */}
                <div className="flex-1 text-center md:text-left">
                  <motion.div
                    initial={{ opacity: 0, y: -15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="inline-flex items-center gap-2 bg-slate-950 text-amber-300 px-4 py-1.5 rounded-full text-xs font-black tracking-wider uppercase mb-4 shadow-xl border border-slate-800"
                  >
                    <ShieldCheck size={14} className="text-amber-400" />
                    <span>GOVERNMENT OF INDIA INITIATIVE</span>
                  </motion.div>
                  
                  <motion.h2
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
                    className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-3 leading-tight tracking-tight drop-shadow-md min-h-[1.25em]"
                  >
                    <TypingText text={slides[currentSlide].title} />
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-lg sm:text-2xl text-amber-200 mb-5 font-extrabold leading-snug drop-shadow-sm"
                  >
                    {slides[currentSlide].subtitle}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="space-y-2 mb-6"
                  >
                    {slides[currentSlide].highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 text-white text-sm sm:text-base justify-center md:justify-start font-bold drop-shadow-sm">
                        <CheckCircle2 size={18} className="text-amber-300 shrink-0" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </motion.div>

                </div>

                {/* Right Image: Hon'ble Prime Minister */}
                <motion.div 
                  initial={{ opacity: 0, x: 40, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  whileHover={{ scale: 1.04, rotate: 1 }}
                  className="hidden md:block shrink-0 cursor-pointer"
                >
                  <div className="relative">
                    <div className="absolute -inset-1 bg-white rounded-3xl blur opacity-60 animate-pulse"></div>
                    <img 
                      src={pmModiImage}
                      alt="Hon'ble Prime Minister Narendra Modi"
                      className="relative w-60 h-72 object-cover rounded-2xl shadow-2xl border-4 border-white bg-white"
                    />
                  </div>
                </motion.div>

              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Slide Controls */}
        <motion.button 
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          type="button"
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-slate-950/70 hover:bg-slate-950 text-white p-2.5 rounded-full transition-all shadow-lg border border-slate-700"
        >
          <ChevronLeft size={22} />
        </motion.button>

        <motion.button 
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          type="button"
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-slate-950/70 hover:bg-slate-950 text-white p-2.5 rounded-full transition-all shadow-lg border border-slate-700"
        >
          <ChevronRight size={22} />
        </motion.button>

        {/* Carousel Pagination Dots */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all ${
                idx === currentSlide ? 'bg-white w-8' : 'bg-white/50 w-2'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Animated News Ticker Bar */}
      <div className="bg-slate-950 text-white border-t border-slate-800 py-2.5 px-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center gap-4 text-xs">
          <span className="bg-[#ff6800] text-white px-3 py-1 rounded font-black uppercase tracking-wider shrink-0 flex items-center gap-1.5 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
            Latest Updates
          </span>
          <div className="flex-1 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={currentNews}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="text-amber-300 font-bold truncate"
              >
                {newsItems[currentNews]}
              </motion.p>
            </AnimatePresence>
          </div>
          <div className="flex gap-1 shrink-0">
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              type="button"
              onClick={() => setCurrentNews((prev) => (prev - 1 + newsItems.length) % newsItems.length)}
              className="p-1 bg-[#ff6800] text-white rounded hover:bg-orange-700 transition-colors"
            >
              <ChevronLeft size={14} />
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              type="button"
              onClick={() => setCurrentNews((prev) => (prev + 1) % newsItems.length)}
              className="p-1 bg-[#ff6800] text-white rounded hover:bg-orange-700 transition-colors"
            >
              <ChevronRight size={14} />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}