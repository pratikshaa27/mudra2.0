import React from 'react';
import { ShieldCheck, Building2, Landmark, Lightbulb, CreditCard, MapPin } from 'lucide-react';
import { Reveal, RevealGroup } from '@/components/ui/reveal';
import SectionHeading from '@/components/ui/section-heading';
import { useLanguage } from '../LanguageContext';

export default function AboutPMMY() {
  const { t } = useLanguage();

  const pillars = [
    { icon: Landmark, title: t('aboutPillar1Title'), desc: t('aboutPillar1Desc') },
    { icon: ShieldCheck, title: t('aboutPillar2Title'), desc: t('aboutPillar2Desc') },
    { icon: CreditCard, title: t('aboutPillar3Title'), desc: t('aboutPillar3Desc') },
    { icon: Lightbulb, title: t('aboutPillar4Title'), desc: t('aboutPillar4Desc') },
  ];

  /* CGTMSE-style 4-step refinance flow cards */
  const processSteps = [
    { step: 1, icon: Landmark, title: t('aboutStep1Title'), desc: t('aboutStep1Desc') },
    { step: 2, icon: CreditCard, title: t('aboutStep2Title'), desc: t('aboutStep2Desc') },
    { step: 3, icon: ShieldCheck, title: t('aboutStep3Title'), desc: t('aboutStep3Desc') },
    { step: 4, icon: MapPin, title: t('aboutStep4Title'), desc: t('aboutStep4Desc') },
  ];

  return (
    <section
      id="about-mudra"
      className="section-y relative overflow-hidden border-t border-slate-200 text-slate-900 dark:border-slate-800 dark:text-slate-100"
    >
      {/* Soft neutral wash separating this band from the global backdrop */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/70 via-white/50 to-transparent dark:from-[#021731]/70 dark:via-[#021731]/50"
        aria-hidden="true"
      />

      <div className="shell relative">
        <SectionHeading
          eyebrow={t('aboutEyebrow')}
          icon={Building2}
          title={t('aboutTitle')}
          description={t('aboutDescription')}
          className="max-w-4xl"
        />

        {/* Four operating pillars */}
        <RevealGroup stagger={90} className="mb-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mb-20 xl:grid-cols-4 lg:gap-6">
          {pillars.map((pillar, idx) => (
            <Reveal key={pillar.title} index={idx} className="h-full">
              <article className="card-lift card-accent-top relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white/95 p-6 shadow-sm backdrop-blur-sm hover:border-blue-300 dark:border-slate-800 dark:bg-slate-900/95 dark:hover:border-blue-500/50">
                <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#011a39] text-blue-300 shadow-sm transition-transform duration-300 group-hover:scale-105">
                  <pillar.icon size={21} aria-hidden="true" />
                </span>

                <h3 className="mb-2 text-lg font-extrabold leading-snug text-slate-900 dark:text-white">
                  {pillar.title}
                </h3>

                <p className="text-sm font-medium leading-relaxed text-slate-600 dark:text-slate-300">
                  {pillar.desc}
                </p>
              </article>
            </Reveal>
          ))}
        </RevealGroup>

        {/* CGTMSE-style 4-step refinance process */}
        <RevealGroup stagger={90} className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4 lg:gap-6">
          {processSteps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <Reveal key={step.title} index={idx} className="h-full">
                <article
                  className="relative flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:border-blue-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-600/50"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#011a39] text-blue-300 shadow-sm">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-blue-300 bg-white text-[#011a39] dark:border-slate-700 dark:bg-slate-800">
                      <Icon size={18} aria-hidden="true" />
                    </div>
                  </div>

                  <div className="mb-3 flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs font-extrabold text-blue-700 dark:bg-slate-800 dark:text-blue-400">
                      {step.step}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                      {t('aboutStepLabel')} {step.step}
                    </span>
                  </div>

                  <h3 className="mb-2.5 text-sm font-extrabold leading-snug text-slate-900 dark:text-white">
                    {step.title}
                  </h3>

                  <p className="mt-auto text-xs font-medium leading-relaxed text-slate-600 dark:text-slate-300">
                    {step.desc}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
