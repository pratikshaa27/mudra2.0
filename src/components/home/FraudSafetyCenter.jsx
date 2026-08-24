import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ShieldAlert, AlertTriangle, PhoneCall, Mail, ArrowRight, ShieldCheck, UserX, FileWarning } from 'lucide-react';
import { Reveal, RevealGroup } from '@/components/ui/reveal';
import { useLanguage } from '../LanguageContext';

export default function FraudSafetyCenter() {
  const { t } = useLanguage();

  const safeguards = [
    { icon: UserX, title: t('fraudSafeguard1Title'), desc: t('fraudSafeguard1Desc') },
    { icon: ShieldCheck, title: t('fraudSafeguard2Title'), desc: t('fraudSafeguard2Desc') },
    { icon: FileWarning, title: t('fraudSafeguard3Title'), desc: t('fraudSafeguard3Desc') },
  ];

  return (
    <section className="section-y relative overflow-hidden border-t border-slate-200 bg-[#011a39] text-white">
      <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-red-500/10 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" aria-hidden="true" />

      <div className="shell relative">
        {/* Custom heading (not the shared SectionHeading) — this section stays
            permanently navy regardless of the site's light/dark toggle, same
            as HeroSection, so it needs its own always-light-on-dark text
            colors rather than the shared component's dark:-toggle-aware ones. */}
        <div className="mx-auto mb-12 max-w-3xl text-center lg:mb-16">
          <Reveal variant="fade">
            <span className="inline-flex items-center gap-2 rounded-full border border-red-400/40 bg-red-500/15 px-3.5 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.12em] text-red-200">
              <ShieldAlert size={13} aria-hidden="true" />
              <span>{t('fraudEyebrow')}</span>
            </span>
          </Reveal>
          <Reveal delay={70}>
            <h2 className="display-2 mt-4 text-white">{t('fraudTitle')}</h2>
          </Reveal>
          <Reveal delay={120}>
            <span className="title-rule mx-auto mt-5 block bg-gradient-to-r from-red-400 to-amber-400" aria-hidden="true" />
          </Reveal>
          <Reveal delay={160}>
            <p className="body-lg mt-5 font-medium text-slate-300">
              {t('fraudDescription')}
            </p>
          </Reveal>
        </div>

        <RevealGroup stagger={90} className="mb-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {safeguards.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.title} index={idx} className="h-full">
                <article className="card-lift relative flex h-full flex-col rounded-2xl border border-white/15 bg-white/[0.06] p-6 backdrop-blur-sm transition-colors duration-200 hover:border-red-300/40">
                  <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-red-400/30 bg-red-500/15 text-red-300">
                    <Icon size={20} aria-hidden="true" />
                  </span>
                  <h3 className="mb-2 text-sm font-extrabold leading-snug text-white">{item.title}</h3>
                  <p className="text-xs font-medium leading-relaxed text-slate-300">{item.desc}</p>
                </article>
              </Reveal>
            );
          })}
        </RevealGroup>

        <Reveal>
          <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-amber-400/25 bg-white/[0.04] p-6 backdrop-blur-sm sm:p-7 lg:flex-row lg:items-center">
            <div className="flex flex-1 items-start gap-4">
              <span className="mt-0.5 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-red-500/40 bg-red-600/90 text-amber-300">
                <AlertTriangle size={24} aria-hidden="true" />
              </span>
              <div className="space-y-2">
                <span className="block text-[11px] font-bold uppercase tracking-[0.14em] text-amber-400">
                  {t('fraudReportLabel')}
                </span>
                <p className="text-xs font-medium leading-relaxed text-slate-100 sm:text-sm">
                  {t('fraudReportDesc')}
                </p>
                <div className="flex flex-wrap items-center gap-4 pt-1 text-xs font-bold text-white">
                  <a href="tel:18001801111" className="link-underline flex items-center gap-1.5">
                    <PhoneCall size={13} className="text-amber-300" aria-hidden="true" />
                    1800-180-1111 [Toll Free]
                  </a>
                  <a href="mailto:helpdesk@mudra.org.in" className="link-underline flex items-center gap-1.5">
                    <Mail size={13} className="text-amber-300" aria-hidden="true" />
                    helpdesk@mudra.org.in
                  </a>
                </div>
              </div>
            </div>

            <Link
              to={createPageUrl('Contact')}
              className="btn btn-primary w-full shrink-0 text-xs uppercase tracking-wide lg:w-auto"
            >
              <span>{t('fraudReportCta')}</span>
              <ArrowRight size={14} className="btn-icon" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
