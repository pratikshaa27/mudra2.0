import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ClipboardCheck, LayoutGrid, FileSignature, LineChart, ArrowRight, ExternalLink, Sparkles } from 'lucide-react';
import { Reveal, RevealGroup } from '@/components/ui/reveal';
import SectionHeading from '@/components/ui/section-heading';
import { useLanguage } from '../LanguageContext';

const buildSteps = (t) => [
  {
    step: '01',
    icon: ClipboardCheck,
    title: t('loanJourneyStep1Title'),
    desc: t('loanJourneyStep1Desc'),
    cta: { label: t('loanJourneyStep1Cta'), href: createPageUrl('Offerings') }
  },
  {
    step: '02',
    icon: LayoutGrid,
    title: t('loanJourneyStep2Title'),
    desc: t('loanJourneyStep2Desc'),
    cta: { label: t('loanJourneyStep2Cta'), href: `${createPageUrl('Home')}#schemes` }
  },
  {
    step: '03',
    icon: FileSignature,
    title: t('loanJourneyStep3Title'),
    desc: t('loanJourneyStep3Desc'),
    cta: { label: t('loanJourneyStep3Cta'), href: createPageUrl('EntrepreneurOnboarding') },
    secondaryCta: { label: t('loanJourneyStep3SecondaryCta'), href: 'https://www.jansamarth.in/login' }
  },
  {
    step: '04',
    icon: LineChart,
    title: t('loanJourneyStep4Title'),
    desc: t('loanJourneyStep4Desc'),
    cta: { label: t('loanJourneyStep4Cta'), href: createPageUrl('LoanTracking') }
  }
];

export default function LoanJourney() {
  const { t } = useLanguage();
  const steps = buildSteps(t);

  return (
    <section className="section-y relative border-t border-slate-200 text-slate-900 dark:border-slate-800 dark:text-slate-100">
      <div className="shell relative">
        <SectionHeading
          eyebrow={t('loanJourneyEyebrow')}
          icon={Sparkles}
          title={t('loanJourneyTitle')}
          description={t('loanJourneyDescription')}
        />

        <div className="relative">
          {/* Connecting line — desktop only */}
          <div className="absolute left-0 right-0 top-11 hidden h-0.5 bg-slate-200 dark:bg-slate-800 xl:block" aria-hidden="true" />

          <RevealGroup stagger={100} className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {steps.map((s, idx) => {
              const Icon = s.icon;
              return (
                <Reveal key={s.step} index={idx} className="h-full">
                  <article className="card-lift relative flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 pt-8 shadow-sm transition-all duration-200 hover:border-blue-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-600/50">
                    {/* Step marker sits on the connecting line */}
                    <span className="absolute -top-3 left-6 flex h-8 w-8 items-center justify-center rounded-full border-4 border-white bg-[#011a39] text-[11px] font-extrabold text-white shadow-sm dark:border-slate-950">
                      {s.step}
                    </span>

                    <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-700 shadow-sm transition-transform duration-300 group-hover:scale-105 dark:bg-slate-800 dark:text-blue-400">
                      <Icon size={22} aria-hidden="true" />
                    </span>

                    <h3 className="mb-2 text-base font-extrabold leading-snug text-slate-900 dark:text-white">
                      {s.title}
                    </h3>

                    <p className="mb-5 flex-1 text-sm font-medium leading-relaxed text-slate-600 dark:text-slate-300">
                      {s.desc}
                    </p>

                    <div className="space-y-2">
                      <Link
                        to={s.cta.href}
                        className="group/cta flex items-center justify-between gap-2 rounded-lg bg-[#011a39] px-3.5 py-2.5 text-xs font-bold text-white transition-colors duration-200 hover:bg-[#194d70]"
                      >
                        <span>{s.cta.label}</span>
                        <ArrowRight size={14} className="shrink-0 transition-transform duration-200 group-hover/cta:translate-x-0.5" aria-hidden="true" />
                      </Link>

                      {s.secondaryCta && (
                        <a
                          href={s.secondaryCta.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/cta flex items-center justify-between gap-2 rounded-lg border border-slate-200 px-3.5 py-2.5 text-xs font-bold text-slate-600 transition-colors duration-200 hover:border-blue-300 hover:text-blue-700 dark:border-slate-700 dark:text-slate-300 dark:hover:text-blue-400"
                        >
                          <span>{s.secondaryCta.label}</span>
                          <ExternalLink size={13} className="shrink-0 transition-transform duration-200 group-hover/cta:translate-x-0.5" aria-hidden="true" />
                        </a>
                      )}
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
