import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import {
  TrendingUp, TrendingDown, Calendar, IndianRupee, Users, ShieldCheck,
  PieChart, Sparkles, ArrowUpRight, Minus
} from 'lucide-react';
import { Reveal, RevealGroup, CountUp } from '@/components/ui/reveal';
import SectionHeading from '@/components/ui/section-heading';
import { useLanguage } from '../LanguageContext';

/* Per-financial-year figures — verbatim from the site's published PMMY
   achievements data (previously in AboutPMMY.jsx). Newest first. */
const achievements = [
  { year: '2023-2024', loans: '6,72,56,612', sanctioned: '₹5,34,934.57 CRORE', disbursed: '₹5,20,687.23 CRORE', updated: '31/03/2024' },
  { year: '2022-2023', loans: '6,23,44,938', sanctioned: '₹4,67,982.43 CRORE', disbursed: '₹4,54,628.12 CRORE', updated: '31/03/2023' },
  { year: '2021-2022', loans: '5,38,41,721', sanctioned: '₹3,39,110.35 CRORE', disbursed: '₹3,31,012.54 CRORE', updated: '31/03/2022' },
  { year: '2015-2016', loans: '3,48,80,924', sanctioned: '₹1,37,449.27 CRORE', disbursed: '₹1,32,954.73 CRORE', updated: '31/03/2016' }
];

/* "₹5,34,934.57 CRORE" -> { prefix: '₹', number: 534934.57, decimals: 2, suffix: ' CRORE' }
   "6,72,56,612" -> { prefix: '', number: 67256612, decimals: 0, suffix: '' }
   Parses the real published strings instead of hand-duplicating numeric values. */
function parseFigure(str) {
  const match = str.match(/^([^\d]*)([\d,]+(?:\.\d+)?)(.*)$/);
  if (!match) return { prefix: '', number: 0, decimals: 0, suffix: '' };
  const [, prefix, digits, suffix] = match;
  const clean = digits.replace(/,/g, '');
  const decimals = clean.includes('.') ? clean.split('.')[1].length : 0;
  return { prefix: prefix.trim(), number: parseFloat(clean), decimals, suffix };
}

function trendVs(currentStr, previousStr) {
  if (!previousStr) return null;
  const cur = parseFigure(currentStr).number;
  const prev = parseFigure(previousStr).number;
  if (!prev) return null;
  const pct = ((cur - prev) / prev) * 100;
  return pct;
}

export default function ImpactDashboard() {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const current = achievements[currentIndex];
  const previous = achievements[currentIndex + 1];

  const METRIC_DEFS = [
    { key: 'sanctioned', label: t('impactAmountSanctioned'), icon: IndianRupee, tone: 'text-blue-700 dark:text-blue-400' },
    { key: 'disbursed', label: t('impactAmountDisbursed'), icon: TrendingUp, tone: 'text-emerald-700 dark:text-emerald-400' },
    { key: 'loans', label: t('impactLoansAccounts'), icon: Users, tone: 'text-[#011a39] dark:text-white' }
  ];

  const cumulativeHighlights = [
    { icon: IndianRupee, value: 33.07, decimals: 2, prefix: '₹', suffix: ' Lakh Cr+', label: t('impactTotalDisbursed') },
    { icon: Users, value: 50.2, decimals: 1, prefix: '', suffix: ' Crore+', label: t('impactLoansSanctionedAllTime') },
    { icon: ShieldCheck, value: 70, decimals: 0, prefix: '', suffix: '%', label: t('impactWomenBeneficiaries') },
    { icon: Sparkles, value: 4.5, decimals: 1, prefix: '', suffix: ' Crore+', label: t('impactNewEntrepreneurs') }
  ];

  const demographicBreakdown = [
    { label: t('impactDemoWomen'), percentage: 70, color: 'bg-emerald-500' },
    { label: t('impactDemoScSt'), percentage: 52, color: 'bg-blue-900' },
    { label: t('impactDemoFirstTime'), percentage: 48, color: 'bg-blue-500' },
    { label: t('impactDemoRural'), percentage: 65, color: 'bg-purple-500' }
  ];

  const chartData = useMemo(
    () =>
      [...achievements]
        .slice()
        .reverse()
        .map((row) => ({
          year: row.year,
          sanctioned: parseFigure(row.sanctioned).number,
          disbursed: parseFigure(row.disbursed).number,
          loans: parseFigure(row.loans).number
        })),
    []
  );

  return (
    <section className="section-y relative overflow-hidden border-t border-slate-200 text-slate-900 dark:border-slate-800 dark:text-slate-100">
      <div className="pointer-events-none absolute right-1/4 top-0 h-96 w-96 rounded-full bg-blue-400/8 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-0 left-1/4 h-96 w-96 rounded-full bg-blue-700/8 blur-3xl" aria-hidden="true" />

      <div className="shell relative">
        <SectionHeading
          eyebrow={t('impactEyebrow')}
          icon={Sparkles}
          title={t('impactTitle')}
          description={t('impactDescription')}
        />

        {/* FY selector — stacks on mobile; the tab strip is a full-width,
            horizontally-scrollable pill row with a soft right-edge fade so a
            cut-off year reads as "swipe for more", not a broken layout. */}
        <div className="mb-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <p className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            {t('impactViewingFY')}
          </p>
          <div
            role="tablist"
            aria-label="Financial year"
            className="no-scrollbar fade-scroll-x flex w-full items-center gap-1 overflow-x-auto rounded-full border border-slate-200 bg-[#E0F2FE]/30 p-1.5 text-xs font-bold dark:border-slate-700 dark:bg-slate-800/90 sm:w-auto"
          >
            {achievements.map((item, idx) => {
              const isSelected = currentIndex === idx;
              return (
                <button
                  key={item.year}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setCurrentIndex(idx)}
                  className={`relative whitespace-nowrap rounded-full px-4 py-1.5 transition-colors duration-200 ${
                    isSelected ? 'text-white dark:text-slate-950' : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
                  }`}
                >
                  {isSelected && (
                    <motion.span
                      layoutId="dashboardFyPill"
                      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                      className="absolute inset-0 -z-10 rounded-full bg-blue-700 shadow-sm dark:bg-blue-400"
                    />
                  )}
                  <span className="relative">{item.year}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 4 primary metric cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.year}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4"
          >
            {METRIC_DEFS.map((def) => {
              const raw = current[def.key];
              const parsed = parseFigure(raw);
              const pct = previous ? trendVs(raw, previous[def.key]) : null;
              const Icon = def.icon;
              const TrendIcon = pct === null ? Minus : pct >= 0 ? TrendingUp : TrendingDown;
              return (
                <article
                  key={def.key}
                  className="card-lift card-accent-top relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:border-blue-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-600/50"
                >
                  <div className="mb-5 flex items-start justify-between gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#011a39] text-blue-300 shadow-sm">
                      <Icon size={18} aria-hidden="true" />
                    </span>
                    {pct !== null && (
                      <span className={`flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-bold ${pct >= 0 ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400' : 'bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-400'}`}>
                        <TrendIcon size={11} aria-hidden="true" />
                        {Math.abs(pct).toFixed(1)}%
                      </span>
                    )}
                  </div>

                  <p className={`text-2xl font-extrabold tracking-tight sm:text-[1.65rem] ${def.tone}`}>
                    {parsed.prefix}
                    <CountUp value={parsed.number} decimals={parsed.decimals} separator />
                    {parsed.suffix && <span className="ml-1 text-sm font-bold uppercase text-slate-500 dark:text-slate-400">{parsed.suffix}</span>}
                  </p>

                  <p className="mt-1.5 text-xs font-bold uppercase tracking-wide text-slate-600 dark:text-slate-400">
                    {def.label}
                  </p>

                  <p className="mt-3 flex items-center gap-1.5 border-t border-slate-100 pt-3 text-[11px] font-semibold text-slate-500 dark:border-slate-800 dark:text-slate-400">
                    <Calendar size={12} className="text-blue-600 dark:text-blue-400" aria-hidden="true" />
                    {t('impactUpdated')}: {current.updated}
                  </p>
                </article>
              );
            })}

            {/* 4th card: no published "Outstanding Amount" figure exists in
                MUDRA's public content, so this card surfaces the other real,
                widely-published headline metric instead of inventing one. */}
            <article className="card-lift card-accent-top relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:border-blue-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-600/50">
              <div className="mb-5 flex items-start justify-between gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#011a39] text-blue-300 shadow-sm">
                  <ShieldCheck size={18} aria-hidden="true" />
                </span>
                <span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-bold uppercase text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                  {t('impactAllTime')}
                </span>
              </div>
              <p className="text-2xl font-extrabold tracking-tight text-emerald-700 sm:text-[1.65rem] dark:text-emerald-400">
                <CountUp value={70} />%
              </p>
              <p className="mt-1.5 text-xs font-bold uppercase tracking-wide text-slate-600 dark:text-slate-400">
                {t('impactWomenBeneficiaries')}
              </p>
              <p className="mt-3 flex items-center gap-1.5 border-t border-slate-100 pt-3 text-[11px] font-semibold text-slate-500 dark:border-slate-800 dark:text-slate-400">
                {t('impactWomenFootnote')}
              </p>
            </article>
          </motion.div>
        </AnimatePresence>

        {/* Trend visualization */}
        <Reveal className="mb-14 overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-7">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h3 className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-wide text-slate-700 dark:text-slate-300">
              <TrendingUp size={16} className="text-blue-700 dark:text-blue-400" aria-hidden="true" />
              {t('impactTrendChartTitle')}
            </h3>
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold uppercase text-slate-500 dark:bg-slate-800 dark:text-slate-400">
              {t('impactPublishedFYData')}
            </span>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={chartData} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.25)" vertical={false} />
                <XAxis dataKey="year" tick={{ fontSize: 11, fontWeight: 700 }} stroke="rgba(148,163,184,0.6)" />
                <YAxis yAxisId="left" tick={{ fontSize: 11 }} stroke="rgba(148,163,184,0.6)" tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}K`} />
                <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} stroke="rgba(148,163,184,0.6)" tickFormatter={(v) => `${(v / 1e7).toFixed(0)}Cr`} />
                <Tooltip
                  formatter={(value, name) => {
                    if (name === 'loans') return [`${value.toLocaleString('en-IN')} loans`, 'Loans Sanctioned'];
                    return [`₹${value.toLocaleString('en-IN')} Cr`, name === 'sanctioned' ? 'Amount Sanctioned' : 'Amount Disbursed'];
                  }}
                  contentStyle={{ borderRadius: 12, border: '1px solid rgba(148,163,184,0.3)', fontSize: 12 }}
                />
                <Bar yAxisId="left" dataKey="sanctioned" name="sanctioned" fill="#00b6f0" radius={[6, 6, 0, 0]} barSize={28} />
                <Bar yAxisId="left" dataKey="disbursed" name="disbursed" fill="#004265" radius={[6, 6, 0, 0]} barSize={28} />
                <Line yAxisId="right" dataKey="loans" name="loans" stroke="#3fa253" strokeWidth={2.5} dot={{ r: 4 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </Reveal>

        {/* All-time cumulative highlights strip */}
        <RevealGroup stagger={80} className="mb-14 grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-4">
          {cumulativeHighlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.label} index={idx} className="h-full">
                <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-6 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#194d70] text-blue-300">
                    <Icon size={19} aria-hidden="true" />
                  </span>
                  <p className="text-2xl font-extrabold leading-none text-[#011a39] dark:text-blue-400">
                    <CountUp value={item.value} prefix={item.prefix} suffix={item.suffix} decimals={item.decimals} />
                  </p>
                  <p className="mt-1 text-[11px] font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    {item.label}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </RevealGroup>

        {/* Demographic reach + PAN-India footprint */}
        <Reveal>
          <div className="grid grid-cols-1 items-center gap-8 rounded-2xl border border-slate-200 bg-white p-7 shadow-[0_18px_44px_-20px_rgba(15,41,66,0.24)] dark:border-slate-800 dark:bg-slate-900 lg:grid-cols-12 lg:p-10">
            <div className="space-y-5 lg:col-span-7">
              <div className="flex items-center gap-2">
                <PieChart className="h-5 w-5 text-blue-700 dark:text-blue-400" aria-hidden="true" />
                <h3 className="heading-lg text-slate-900 dark:text-white">
                  {t('impactDemographicTitle')}
                </h3>
              </div>

              <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                {t('impactDemographicDesc')}
              </p>

              <ul className="space-y-4 pt-1">
                {demographicBreakdown.map((item, idx) => (
                  <li key={item.label} className="space-y-2">
                    <div className="flex justify-between text-xs font-bold text-slate-800 dark:text-slate-200">
                      <span>{item.label}</span>
                      <span className="text-blue-700 dark:text-blue-400">{item.percentage}%</span>
                    </div>
                    <div
                      className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800"
                      role="progressbar"
                      aria-valuenow={item.percentage}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={item.label}
                    >
                      <Reveal
                        variant="fade"
                        delay={idx * 120}
                        className={`h-full rounded-full ${item.color} origin-left`}
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex h-full flex-col justify-between gap-5 rounded-xl border border-blue-200 bg-blue-50/70 p-6 dark:border-slate-700 dark:bg-slate-800/70 lg:col-span-5">
              <div>
                <span className="mb-2 block text-[11px] font-bold uppercase tracking-[0.12em] text-blue-700 dark:text-blue-400">
                  {t('impactPanIndiaLabel')}
                </span>
                <h4 className="mb-2.5 text-lg font-extrabold leading-snug text-slate-900 dark:text-white">
                  {t('impactPanIndiaTitle')}
                </h4>
                <p className="text-xs font-medium leading-relaxed text-slate-600 dark:text-slate-300">
                  {t('impactPanIndiaDesc')}
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 border-t border-blue-200 pt-4 dark:border-slate-700">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  {t('impactBulletinUpdated')}
                </span>
                <a
                  href="https://www.mudra.org.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline group flex items-center gap-1.5 text-xs font-bold text-blue-700 dark:text-blue-400"
                >
                  <span>{t('impactDownloadReport')}</span>
                  <ArrowUpRight size={14} className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
