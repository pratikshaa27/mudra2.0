import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { ArrowRight, Award, MapPin, Quote, Sparkles } from 'lucide-react';
import SectionHeading from '@/components/ui/section-heading';
import { useLanguage } from '../LanguageContext';

const stories = [
  {
    id: 1,
    category: 'women',
    categoryLabel: 'Women Entrepreneur',
    name: 'Savita Devi',
    business: 'Ananya Handloom & Textiles',
    location: 'Guwahati, Assam',
    loanCategory: 'Tarun (₹8.5 Lakh)',
    image: '/photo/success/handloom-weaver.jpg',
    description: 'Started as a small home weaving setup with 2 looms. With a MUDRA Tarun loan, expanded to 14 automatic looms employing 22 local women weavers and exporting traditional Eri silk products.',
    impact: '22 Local Women Employed • 5x Revenue Growth'
  },
  {
    id: 2,
    category: 'youth',
    categoryLabel: 'Youth MSME Achiever',
    name: 'Rahul Sharma',
    business: 'Zenith Precision Engineering Works',
    location: 'Pune, Maharashtra',
    loanCategory: 'TarunPlus (₹15 Lakh)',
    image: '/photo/success/cnc-engineering.jpg',
    description: 'A young diploma engineer who established a CNC lathe component manufacturing unit supplying auto ancillaries. Scaled up under TarunPlus scheme with zero third-party collateral.',
    impact: 'Supplies 12 Auto OEM Manufacturers • ISO Certified'
  },
  {
    id: 3,
    category: 'women',
    categoryLabel: 'Women Leader',
    name: 'Meenakshi Sundaram',
    business: 'Sri Lakshmi Organic Spice Processing',
    location: 'Madurai, Tamil Nadu',
    loanCategory: 'Kishore (₹4.2 Lakh)',
    image: '/photo/success/spice-processing.jpg',
    description: 'Procures organic spices from local smallholders, processes and vacuum packs them for retail chains across South India. Increased monthly revenue 5x post-MUDRA financial support.',
    impact: '45 Organic Farmers Onboarded • Pan-South Reach'
  },
  {
    id: 4,
    category: 'rural',
    categoryLabel: 'Rural Innovation',
    name: 'Rameshwar Mahato',
    business: 'Kisan Chilling & Dairy Processing',
    location: 'Anand, Gujarat',
    loanCategory: 'Kishore (₹3.8 Lakh)',
    image: '/photo/success/dairy-farmer.jpg',
    description: 'Set up a bulk milk cooling unit in his village, collecting 1,200 liters daily from 45 dairy farmers and delivering directly to cooperative dairies.',
    impact: '1,200 Ltrs Daily Capacity • Village Dairy Cooperative'
  },
  {
    id: 5,
    category: 'youth',
    categoryLabel: 'Youth Entrepreneur',
    name: 'Arjun Verma',
    business: 'GreenWatt Solar Installation Solutions',
    location: 'Jaipur, Rajasthan',
    loanCategory: 'Tarun (₹10 Lakh)',
    image: '/photo/success/solar-installer.jpg',
    description: 'Provided rooftop solar installation services for commercial shops in Tier-2 cities. Utilized MUDRA credit to purchase testing equipment and inventory.',
    impact: '180+ Solar Roofs Installed • Green Clean Energy'
  },
  {
    id: 6,
    category: 'rural',
    categoryLabel: 'Artisan Revival',
    name: 'Sunil Kumar',
    business: 'EcoPottery Artisans Collective',
    location: 'Varanasi, Uttar Pradesh',
    loanCategory: 'Shishu (₹50,000)',
    image: '/photo/success/pottery-artisan.jpg',
    description: 'Upgraded traditional manual pottery wheel to an electric pug mill and kiln. Reduced manufacturing cycle time by 60% and expanded to online handicraft platforms.',
    impact: '60% Production Time Saved • E-Commerce Seller'
  }
];

const MotionLink = motion(Link);

export default function SuccessStoriesCarousel() {
  const { t } = useLanguage();

  return (
    <section className="section-y relative overflow-hidden border-t border-slate-200 text-slate-900 dark:border-slate-800 dark:text-slate-100">

      {/* Ambient glow (static, not perpetually animated) */}
      <div className="pointer-events-none absolute left-0 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-blue-400/10 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute right-0 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-blue-600/10 blur-3xl" aria-hidden="true" />

      <div className="shell relative">
        <SectionHeading
          eyebrow={t('successCarouselEyebrow')}
          icon={Sparkles}
          title={t('successCarouselTitle')}
          description={t('successCarouselDescription')}
        >
          <Link
            to={createPageUrl('SuccessStories')}
            className="link-underline inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-400"
          >
            <span>{t('successCarouselExploreAll')}</span>
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </SectionHeading>

        {/* Hover-reveal story row — each card shows its photo by default;
            hovering swaps it for a gradient spotlight panel with the quote,
            impact stat and a CTA, one card at a time. */}
        <div className="flex snap-x snap-mandatory gap-2 overflow-x-auto pb-3 lg:snap-none lg:overflow-visible lg:pb-0">
          {stories.map((story, idx) => (
            <MotionLink
              key={story.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, delay: idx * 0.06, ease: [0.22, 1, 0.36, 1] }}
              to={`${createPageUrl('SuccessStories')}?cat=${story.category}`}
              className="group relative h-[420px] w-[240px] shrink-0 snap-start overflow-hidden rounded-2xl bg-gradient-to-br from-slate-700 to-slate-900 shadow-lg ring-1 ring-black/5 transition-transform duration-500 hover:z-10 hover:-translate-y-1 lg:h-[460px] lg:w-auto lg:flex-1"
            >
              {/* Default state — photo + name caption */}
              <img
                src={story.image}
                alt={`${story.name} — ${story.business}, ${story.location}`}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500 group-hover:opacity-0"
                onError={(e) => {
                  // Keep the card readable (gradient + caption) if the photo ever fails to load.
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent transition-opacity duration-500 group-hover:opacity-0"
                aria-hidden="true"
              />
              <div className="absolute inset-x-0 bottom-0 p-4 text-white transition-opacity duration-500 group-hover:opacity-0">
                <p className="mb-1 flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-blue-300">
                  <Award size={11} aria-hidden="true" />
                  <span>{story.categoryLabel}</span>
                </p>
                <h4 className="text-sm font-black leading-snug">{story.name}</h4>
                <p className="mt-0.5 flex items-center gap-1 text-[11px] text-slate-300">
                  <MapPin size={11} aria-hidden="true" />
                  <span>{story.location}</span>
                </p>
              </div>

              {/* Hover reveal — gradient spotlight panel replaces the photo */}
              <div className="absolute inset-0 flex translate-y-2 flex-col justify-between bg-gradient-to-br from-[#012a4a] via-[#0369a1] to-[#00b6f0] p-5 text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-blue-200">{story.categoryLabel}</p>
                  <h4 className="mt-1 text-base font-black leading-snug">{story.name}</h4>
                  <Quote size={22} className="mt-3 text-blue-200/60" aria-hidden="true" />
                  <p className="mt-2 line-clamp-5 text-xs font-medium italic leading-relaxed text-blue-50">
                    "{story.description}"
                  </p>
                </div>

                <div>
                  <div className="mb-3 rounded-xl border border-white/20 bg-white/10 p-2.5 backdrop-blur-sm">
                    <span className="block text-[9px] font-bold uppercase tracking-wide text-blue-200">{t('successCarouselImpact')}</span>
                    <span className="text-[11px] font-extrabold text-white">{story.impact}</span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-black text-white">
                    <span>{t('successCarouselReadFull')}</span>
                    <ArrowRight size={13} aria-hidden="true" />
                  </span>
                </div>
              </div>
            </MotionLink>
          ))}
        </div>
      </div>
    </section>
  );
}
