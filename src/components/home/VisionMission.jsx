import React from 'react';
import { Eye, Target, Sparkles, Compass, ShieldCheck, HeartHandshake, Zap, Globe, Check } from 'lucide-react';
import { Reveal } from '@/components/ui/reveal';
import SectionHeading from '@/components/ui/section-heading';
import { useLanguage } from '../LanguageContext';

export default function VisionMission() {
  const { t, language } = useLanguage();
  const mudraSpan = (
    <span className="bg-gradient-to-r from-[#00b6f0] via-blue-700 to-blue-600 bg-clip-text text-transparent">
      MUDRA
    </span>
  );

  const cards = [
    {
      key: 'vision',
      icon: Eye,
      kicker: t('visionKicker'),
      title: t('visionTitle'),
      tagIcon: Compass,
      tag: t('visionTag'),
      quote: t('visionQuote'),
      pillarsLabel: t('visionPillarsLabel'),
      pillarsIcon: Zap,
      pillars: [t('visionPillar1'), t('visionPillar2'), t('visionPillar3'), t('visionPillar4')],
      footerIcon: Globe,
      footerLeft: t('visionFooterLeft'),
      footerRight: t('visionFooterRight'),
      accent: 'from-blue-400 to-blue-700',
      iconBg: 'bg-blue-600 text-white',
      quoteBorder: 'border-blue-600',
      quoteBg: 'bg-blue-50/80 dark:bg-slate-800/60',
      kickerColor: 'text-blue-800 dark:text-blue-400',
      chip: 'bg-blue-50 text-blue-900 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-900/60',
    },
    {
      key: 'mission',
      icon: Target,
      kicker: t('missionKicker'),
      title: t('missionTitle'),
      tagIcon: ShieldCheck,
      tag: t('missionTag'),
      quote: t('missionQuote'),
      pillarsLabel: t('missionPillarsLabel'),
      pillarsIcon: HeartHandshake,
      pillars: [t('missionPillar1'), t('missionPillar2'), t('missionPillar3'), t('missionPillar4')],
      footerIcon: ShieldCheck,
      footerLeft: t('missionFooterLeft'),
      footerRight: t('missionFooterRight'),
      accent: 'from-[#00b6f0] to-[#23ace1]',
      iconBg: 'bg-[#00b6f0] text-white',
      quoteBorder: 'border-[#00b6f0]',
      quoteBg: 'bg-blue-50/70 dark:bg-slate-800/60',
      kickerColor: 'text-blue-700 dark:text-blue-400',
      chip: 'bg-blue-50 text-blue-900 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-900/60',
    },
  ];

  return (
    <section
      id="vision"
      className="section-y relative overflow-hidden border-t border-slate-200 text-slate-900 dark:border-slate-800 dark:text-slate-100"
    >
      {/* Restrained ambient wash */}
      <div className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-blue-400/10 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-[26rem] w-[26rem] rounded-full bg-blue-600/8 blur-3xl" aria-hidden="true" />

      <div className="shell relative">
        <SectionHeading
          eyebrow={t('visionMissionEyebrow')}
          icon={Sparkles}
          title={
            language === 'hi' ? (
              <>{mudraSpan} {t('visionMissionTitlePrefix')}</>
            ) : (
              <>{t('visionMissionTitlePrefix')} {mudraSpan}</>
            )
          }
          description={t('visionMissionDescription')}
        />

        <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            const TagIcon = card.tagIcon;
            const PillarsIcon = card.pillarsIcon;
            const FooterIcon = card.footerIcon;

            return (
              <Reveal key={card.key} variant={idx === 0 ? 'left' : 'right'} delay={idx * 90} className="h-full">
                <article className="card-lift group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-7 shadow-sm hover:border-blue-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-600/50 sm:p-9">
                  <span className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${card.accent}`} aria-hidden="true" />

                  <Icon
                    className="pointer-events-none absolute -bottom-8 -right-8 h-44 w-44 text-slate-900/[0.03] transition-transform duration-500 group-hover:scale-105 dark:text-white/[0.03]"
                    aria-hidden="true"
                  />

                  <header className="relative mb-6 flex flex-wrap items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <span className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl shadow-sm ${card.iconBg}`}>
                        <Icon size={26} aria-hidden="true" />
                      </span>
                      <div>
                        <span className={`text-[11px] font-bold uppercase tracking-[0.14em] ${card.kickerColor}`}>
                          {card.kicker}
                        </span>
                        <h3 className="heading-lg text-slate-900 dark:text-white">{card.title}</h3>
                      </div>
                    </div>

                    <span className={`hidden items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-bold sm:inline-flex ${card.chip}`}>
                      <TagIcon size={13} aria-hidden="true" />
                      <span>{card.tag}</span>
                    </span>
                  </header>

                  <blockquote className={`relative mb-7 rounded-xl border-l-4 p-6 ${card.quoteBorder} ${card.quoteBg}`}>
                    <p className="text-sm font-medium italic leading-relaxed text-slate-700 dark:text-slate-200 sm:text-base">
                      {card.quote}
                    </p>
                  </blockquote>

                  <div className="mt-auto">
                    <h4 className="mb-3 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.1em] text-slate-500 dark:text-slate-400">
                      <PillarsIcon size={13} aria-hidden="true" />
                      {card.pillarsLabel}
                    </h4>

                    <ul className="flex flex-wrap gap-2">
                      {card.pillars.map((pillar) => (
                        <li
                          key={pillar}
                          className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-transform duration-200 hover:-translate-y-0.5 ${card.chip}`}
                        >
                          <Check size={12} className="shrink-0" aria-hidden="true" />
                          <span>{pillar}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-7 flex items-center justify-between border-t border-slate-100 pt-4 text-xs font-semibold text-slate-500 dark:border-slate-800 dark:text-slate-400">
                      <span className={`flex items-center gap-1.5 font-bold ${card.kickerColor}`}>
                        <FooterIcon size={13} aria-hidden="true" /> {card.footerLeft}
                      </span>
                      <span>{card.footerRight}</span>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
