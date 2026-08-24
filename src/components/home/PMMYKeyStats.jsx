import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import SectionHeading from '@/components/ui/section-heading';
import { useLanguage } from '../LanguageContext';

export default function PMMYKeyStats() {
  const { t } = useLanguage();

  return (
    <section className="section-y relative overflow-hidden border-t border-slate-200 text-slate-900 dark:border-slate-800 dark:text-slate-100">
      <div className="shell relative">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow={t('impactEyebrow')}
              title={t('heroSlide2Title')}
              description={t('heroSlide2Subtitle')}
              align="left"
            />
            <ul className="mt-6 space-y-3 text-sm font-semibold text-slate-700 dark:text-slate-300">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="mt-0.5 text-blue-600 dark:text-blue-400" size={16} />
                <span>{t('heroSlide2Highlight1')}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="mt-0.5 text-blue-600 dark:text-blue-400" size={16} />
                <span>{t('heroSlide2Highlight2')}</span>
              </li>
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            {[
              { value: '₹33+', label: t('impactTotalDisbursed') },
              { value: '50+', label: t('impactLoansSanctionedAllTime') },
              { value: '70%', label: t('impactWomenBeneficiaries') },
              { value: '10+', label: t('ofService') },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <span className="block text-2xl sm:text-3xl font-black tracking-tight text-[#011a39] dark:text-white">{item.value}</span>
                <span className="mt-1 block text-[11px] font-black uppercase tracking-wide text-slate-500 dark:text-slate-400">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
