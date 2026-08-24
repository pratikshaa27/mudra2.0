import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { Award, ShieldCheck, CheckCircle2, ArrowRight, TrendingUp, Users } from 'lucide-react';
import { createPageUrl } from '@/utils';
import { useLanguage } from '../LanguageContext';

const HERO_VIDEO = '/vdo/The_website_is_related_to_Prad.mp4';

/* Cinematic full-bleed video banner — split out of the old HeroSection so
   the impact slideshow (HeroSlideshow.jsx) can be positioned elsewhere on
   the page instead of sitting directly beneath it. */
export default function HeroVideoBanner() {
  const { t } = useLanguage();
  const videoRef = useRef(null);
  const reduceMotion = useReducedMotion();

  // Honour the OS reduced-motion setting: never autoplay looping footage.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !reduceMotion) return;
    video.pause();
  }, [reduceMotion]);

  return (
    <section aria-label="Highlights" className="relative isolate flex min-h-[560px] items-center overflow-hidden bg-[#021731] py-16 text-white md:min-h-[680px] md:py-24">

      {/* Video layer */}
      <video
        ref={videoRef}
        className="absolute inset-0 -z-10 h-full w-full object-cover"
        src={HERO_VIDEO}
        autoPlay={!reduceMotion}
        loop
        muted
        playsInline
        preload="metadata"
        aria-hidden="true"
        tabIndex={-1}
      />

      {/* Legibility scrims — lightened so the background video reads through
          clearly; text picks up a drop-shadow below to stay readable. */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#021731]/70 via-[#021731]/45 to-[#021731]/10" aria-hidden="true" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#021731]/55 via-transparent to-[#021731]/20" aria-hidden="true" />

      {/* Depth accents */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.05]"
        style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1.5px, transparent 1.5px)', backgroundSize: '28px 28px' }}
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute -right-32 -top-32 -z-10 h-[520px] w-[520px] rounded-full bg-blue-500/15 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-40 -left-32 -z-10 h-[440px] w-[440px] rounded-full bg-blue-600/12 blur-3xl" aria-hidden="true" />

      <div className="shell relative">
        <div className="flex flex-col items-center gap-8 md:flex-row md:items-start lg:gap-10">

          {/* Anniversary seal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="hidden shrink-0 lg:block"
          >
            <div className="flex flex-col items-center rounded-2xl border border-blue-300/60 bg-white/95 px-5 py-4 shadow-[0_18px_40px_-14px_rgba(0,0,0,0.5)] backdrop-blur-sm">
              <Award size={32} className="mb-1 text-blue-700" aria-hidden="true" />
              <span className="text-2xl font-extrabold leading-none text-[#0e263d]">10</span>
              <span className="mt-1 text-[9px] font-bold uppercase tracking-[0.16em] text-slate-600">YEARS OF</span>
              <span className="text-sm font-extrabold tracking-wide text-blue-700">MUDRA</span>
            </div>
          </motion.div>

          {/* Copy column */}
          <div className="mx-auto max-w-2xl flex-1 text-center md:mx-0 md:text-left">
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-blue-300 backdrop-blur-sm"
            >
              <ShieldCheck size={13} aria-hidden="true" />
              <span>{t('heroBadge')}</span>
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="display-1 mb-4 text-white [text-shadow:0_4px_20px_rgba(2,23,49,0.85)]"
            >
              {t('heroTitle')}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="mb-6 text-lg font-bold leading-snug text-blue-300 [text-shadow:0_3px_16px_rgba(2,23,49,0.85)] sm:text-2xl"
            >
              {t('heroSubtitle')}
            </motion.p>

            <ul className="mb-8 space-y-2.5">
              {[t('heroHighlight1'), t('heroHighlight2')].map((highlight, idx) => (
                <motion.li
                  key={highlight}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 + idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-start justify-center gap-2.5 text-sm font-semibold text-slate-100 [text-shadow:0_2px_10px_rgba(2,23,49,0.85)] sm:text-base md:justify-start"
                >
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-blue-400" aria-hidden="true" />
                  <span>{highlight}</span>
                </motion.li>
              ))}
            </ul>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center md:justify-start"
            >
              <Link to={createPageUrl('Offerings')} className="btn btn-primary">
                {t('heroCtaApply')}
                <ArrowRight size={16} className="btn-icon" aria-hidden="true" />
              </Link>

              <Link to={createPageUrl('FAQ')} className="btn btn-ghost backdrop-blur-sm">
                {t('heroCtaExplore')}
              </Link>
            </motion.div>
          </div>

          {/* Growth visual — ascending bars + floating stat chips echoing the
              trust-stats strip in HeroSlideshow.jsx. Purely decorative; no
              new figures. */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden h-[280px] w-[260px] shrink-0 items-end justify-center xl:flex"
            aria-hidden="true"
          >
            {/* Ascending growth bars */}
            <div className="flex items-end gap-3">
              {[38, 56, 46, 74, 62, 100].map((h, idx) => (
                <motion.span
                  key={idx}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: `${h * 1.4}px`, opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.4 + idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="w-6 rounded-t-md bg-gradient-to-t from-blue-700 via-blue-500 to-blue-300 shadow-[0_0_20px_-4px_rgba(0,182,240,0.5)]"
                />
              ))}
            </div>

            {/* Floating stat chip — top-left */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: [0, -8, 0] }}
              transition={
                reduceMotion
                  ? { duration: 0.5, delay: 0.9 }
                  : { duration: 4.5, delay: 0.9, repeat: Infinity, ease: 'easeInOut' }
              }
              className="absolute -top-2 left-0 flex items-center gap-2 rounded-xl border border-blue-300/50 bg-white/95 px-3 py-2 shadow-[0_14px_30px_-10px_rgba(0,0,0,0.45)] backdrop-blur-sm"
            >
              <TrendingUp size={15} className="text-blue-700" aria-hidden="true" />
              <span className="text-xs font-extrabold text-[#0e263d]">₹33L+ Cr Disbursed</span>
            </motion.div>

            {/* Floating stat chip — mid-right */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: [0, 9, 0] }}
              transition={
                reduceMotion
                  ? { duration: 0.5, delay: 1.1 }
                  : { duration: 5, delay: 1.1, repeat: Infinity, ease: 'easeInOut' }
              }
              className="absolute right-0 top-1/3 flex items-center gap-2 rounded-xl border border-emerald-300/50 bg-white/95 px-3 py-2 shadow-[0_14px_30px_-10px_rgba(0,0,0,0.45)] backdrop-blur-sm"
            >
              <Users size={15} className="text-emerald-700" aria-hidden="true" />
              <span className="text-xs font-extrabold text-[#0e263d]">70% Women-Led</span>
            </motion.div>

            {/* Floating stat chip — bottom-left */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: [0, -7, 0] }}
              transition={
                reduceMotion
                  ? { duration: 0.5, delay: 1.3 }
                  : { duration: 4.2, delay: 1.3, repeat: Infinity, ease: 'easeInOut' }
              }
              className="absolute -left-6 bottom-6 flex items-center gap-2 rounded-xl border border-blue-300/50 bg-white/95 px-3 py-2 shadow-[0_14px_30px_-10px_rgba(0,0,0,0.45)] backdrop-blur-sm"
            >
              <Award size={15} className="text-blue-700" aria-hidden="true" />
              <span className="text-xs font-extrabold text-[#0e263d]">50Cr+ Loans</span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom S-curve transition, traced with a thick light-blue → navy
          gradient border echoing the brand accent ramp. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-[-1px] z-0" aria-hidden="true">
        <svg viewBox="0 0 1440 140" preserveAspectRatio="none" className="block h-14 w-full sm:h-24">
          <defs>
            <linearGradient id="heroCurveBorder" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#7dd3fc" />
              <stop offset="55%" stopColor="#00b6f0" />
              <stop offset="100%" stopColor="#021731" />
            </linearGradient>
          </defs>
          <path
            d="M0,70 C360,0 720,140 1080,70 C1260,35 1350,20 1440,45 L1440,140 L0,140 Z"
            className="fill-slate-50 dark:fill-slate-900"
          />
          <path
            d="M0,70 C360,0 720,140 1080,70 C1260,35 1350,20 1440,45"
            fill="none"
            stroke="url(#heroCurveBorder)"
            strokeWidth="7"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </section>
  );
}
