import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, CheckCircle2, TrendingUp, Users, Percent } from 'lucide-react';
import { CountUp } from '@/components/ui/reveal';
import { useLanguage } from '../LanguageContext';

const SLIDE_IMAGES = [
  "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6978c66565209a38e92b1aa2/39d1e2421_image.png",
  "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1600&q=80",
  "/photo/shishu.jpg",
];

const SLIDE_DURATION = 6000;

/* Immersive storytelling carousel + trust-stats strip — split out of the
   old HeroSection so it can sit further down the page instead of directly
   beneath the video banner (HeroVideoBanner.jsx). */
export default function HeroSlideshow() {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const slides = [
    {
      title: t('heroTitle'),
      subtitle: t('heroSubtitle'),
      highlights: [t('heroHighlight1'), t('heroHighlight2')],
      image: SLIDE_IMAGES[0],
    },
    {
      title: t('heroSlide2Title'),
      subtitle: t('heroSlide2Subtitle'),
      highlights: [t('heroSlide2Highlight1'), t('heroSlide2Highlight2')],
      image: SLIDE_IMAGES[1],
    },
    {
      title: t('heroSlide3Title'),
      subtitle: t('heroSlide3Subtitle'),
      highlights: [t('heroSlide3Highlight1'), t('heroSlide3Highlight2')],
      image: SLIDE_IMAGES[2],
    },
  ];

  const trustStats = [
    { icon: TrendingUp, value: 33, suffix: 'L+ Cr', label: t('heroStatDisbursed') },
    { icon: Users, value: 50, suffix: 'Cr+', label: t('heroStatLoans') },
    { icon: Percent, value: 70, suffix: '%', label: t('heroStatWomen') },
    { icon: Award, value: 10, suffix: '', label: t('heroStatYears') },
  ];

  // Slideshow auto-advance — pauses on hover/focus.
  useEffect(() => {
    if (isPaused) return undefined;
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, SLIDE_DURATION);
    return () => clearInterval(slideTimer);
  }, [isPaused]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  const goToSlide = (idx) => setCurrentSlide(idx);

  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);

  const handleTouchStart = (e) => setTouchStartX(e.touches[0].clientX);
  const handleTouchMove = (e) => setTouchEndX(e.touches[0].clientX);
  const handleTouchEnd = () => {
    if (touchStartX === null || touchEndX === null) return;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) diff > 0 ? nextSlide() : prevSlide();
    setTouchStartX(null);
    setTouchEndX(null);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
  };

  return (
    <section aria-label="Impact highlights">
      {/* Slideshow — contained within the shell, matching the rest of the page. */}
      <div className="bg-slate-50 py-10 dark:bg-slate-900 md:py-14">
      <div className="shell">
      <div
        className="relative h-[420px] overflow-hidden rounded-2xl shadow-xl md:h-[500px] md:rounded-3xl lg:h-[560px]"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocusCapture={() => setIsPaused(true)}
        onBlurCapture={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="region"
        aria-roledescription="carousel"
        aria-label="Impact stories"
      >
        {slides.map((slide, idx) => {
          const isActive = idx === currentSlide;
          return (
            <motion.div
              key={idx}
              className="absolute inset-0"
              animate={{
                opacity: isActive ? 1 : 0,
                scale: isActive ? 1 : 1.08,
              }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              aria-hidden={!isActive}
            >
              {slide.image ? (
                <img
                  src={slide.image}
                  alt=""
                  loading={isActive ? 'eager' : 'lazy'}
                  className="h-full w-full object-contain bg-[#021731]"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#0e263d] via-[#194d70] to-[#021731]">
                  <Award size={120} className="text-blue-400/20" aria-hidden="true" />
                </div>
              )}
            </motion.div>
          );
        })}

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#021731] via-[#021731]/50 to-transparent pointer-events-none" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#021731]/40 via-transparent to-transparent pointer-events-none" aria-hidden="true" />

        {/* Editorial content overlay */}
        <div className="absolute inset-0 flex items-end">
          <div className="w-full px-6 pb-8 sm:px-10 md:pb-12 lg:px-14 lg:pb-16">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-3xl"
              >
                <span className="eyebrow text-blue-300 border-blue-400/30 bg-blue-500/10 backdrop-blur-sm">
                  {`0${currentSlide + 1} / 0${slides.length}`}
                </span>

                <h2 className="display-2 mt-4 text-white">
                  {slides[currentSlide].title}
                </h2>

                <p className="mt-3 text-lg font-bold text-blue-200 md:text-xl">
                  {slides[currentSlide].subtitle}
                </p>

                <ul className="mt-5 space-y-2.5">
                  {slides[currentSlide].highlights.map((highlight, idx) => (
                    <motion.li
                      key={highlight}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.12 + idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                      className="flex items-start gap-2.5 text-sm font-medium text-blue-100 md:text-base"
                    >
                      <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-blue-400" aria-hidden="true" />
                      <span>{highlight}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Vertical slide navigation */}
        <div className="absolute right-3 md:right-6 lg:right-8 top-1/2 z-20 -translate-y-1/2 flex flex-col gap-3 md:gap-4">
          {slides.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => goToSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              aria-current={idx === currentSlide}
              className={`
                flex items-center justify-center rounded-full font-extrabold transition-all duration-300
                ${idx === currentSlide
                  ? 'h-12 w-12 md:h-14 md:w-14 bg-blue-600 text-white shadow-lg shadow-blue-900/50 scale-110'
                  : 'h-8 w-8 md:h-10 md:w-10 bg-white/10 text-white/70 hover:bg-white/20 hover:text-white backdrop-blur-sm border border-white/20'
                }
              `}
            >
              {String(idx + 1).padStart(2, '0')}
            </button>
          ))}
        </div>
      </div>
      </div>
      </div>

      {/* Trust statistics strip */}
      <div className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="shell grid grid-cols-2 gap-x-4 gap-y-6 py-6 md:grid-cols-4 md:py-7">
          {trustStats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-3"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 dark:border-slate-700 dark:from-slate-800 dark:to-slate-800">
                  <Icon size={18} className="text-blue-700" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xl font-extrabold leading-none text-[#0e263d] dark:text-white md:text-2xl">
                    <CountUp value={stat.value} />{stat.suffix}
                  </p>
                  <p className="mt-1 text-[11px] font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    {stat.label}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
