import React, { useMemo, useState } from 'react';
import {
  ComposedChart, Bar, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart
} from 'recharts';
import { Filter, Download, FileSpreadsheet, FileType, Info, BarChart3 } from 'lucide-react';

/* Real, published per-FY figures — same source as the homepage Impact
   Dashboard (MUDRA's official Financial Year statistical bulletins). */
const achievements = [
  { year: '2015-2016', loans: '3,48,80,924', sanctioned: '₹1,37,449.27 CRORE', disbursed: '₹1,32,954.73 CRORE' },
  { year: '2021-2022', loans: '5,38,41,721', sanctioned: '₹3,39,110.35 CRORE', disbursed: '₹3,31,012.54 CRORE' },
  { year: '2022-2023', loans: '6,23,44,938', sanctioned: '₹4,67,982.43 CRORE', disbursed: '₹4,54,628.12 CRORE' },
  { year: '2023-2024', loans: '6,72,56,612', sanctioned: '₹5,34,934.57 CRORE', disbursed: '₹5,20,687.23 CRORE' }
];

function parseNum(str) {
  const match = str.match(/[\d,]+(?:\.\d+)?/);
  return match ? parseFloat(match[0].replace(/,/g, '')) : 0;
}

const STATE_OPTIONS = ['All States', 'Maharashtra', 'Uttar Pradesh', 'Tamil Nadu', 'West Bengal', 'Rajasthan', 'Gujarat', 'Karnataka', 'Bihar'];
const MLI_OPTIONS = ['All MLIs', 'Public Sector Banks', 'Regional Rural Banks', 'Cooperative Banks', 'MFIs', 'NBFCs'];
const SCHEME_OPTIONS = ['All Schemes', 'Shishu', 'Kishore', 'Tarun', 'TarunPlus'];

/* Illustrative only — no real per-state / per-MLI-type / per-scheme split is
   published in MUDRA's existing content. Kept constant regardless of filter
   selection so the UI never implies a precision it doesn't have; the filter
   row is fully wired (state persists, feeds the disclosure note below) and
   ready to swap in live figures once an API exists. */
const illustrativeStateRanking = [
  { state: 'Maharashtra', value: 68 }, { state: 'Uttar Pradesh', value: 64 }, { state: 'Tamil Nadu', value: 55 },
  { state: 'West Bengal', value: 49 }, { state: 'Rajasthan', value: 44 }, { state: 'Gujarat', value: 41 },
  { state: 'Karnataka', value: 38 }, { state: 'Bihar', value: 33 }
];

const illustrativeMliMix = [
  { name: 'Public Sector Banks', value: 38, color: '#00b6f0' },
  { name: 'RRBs', value: 22, color: '#004265' },
  { name: 'Cooperative Banks', value: 14, color: '#3fa253' },
  { name: 'MFIs', value: 18, color: '#194d70' },
  { name: 'NBFCs', value: 8, color: '#a8e4fa' }
];

function downloadCsv(rows, filename) {
  const csv = rows.map((r) => r.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export default function AnalyticsDashboard() {
  const [state, setState] = useState('All States');
  const [mli, setMli] = useState('All MLIs');
  const [scheme, setScheme] = useState('All Schemes');
  const [fy, setFy] = useState('All Years');

  const filteredTrend = useMemo(
    () => (fy === 'All Years' ? achievements : achievements.filter((a) => a.year === fy)),
    [fy]
  );

  const chartData = filteredTrend.map((row) => ({
    year: row.year,
    sanctioned: parseNum(row.sanctioned),
    disbursed: parseNum(row.disbursed),
    loans: parseNum(row.loans)
  }));

  const isFiltered = state !== 'All States' || mli !== 'All MLIs' || scheme !== 'All Schemes';

  const handleExportCsv = () => {
    const rows = [
      ['Financial Year', 'Amount Sanctioned (₹ Crore)', 'Amount Disbursed (₹ Crore)', 'Loans Sanctioned'],
      ...filteredTrend.map((r) => [r.year, parseNum(r.sanctioned), parseNum(r.disbursed), parseNum(r.loans)])
    ];
    downloadCsv(rows, `pmmy-published-fy-data-${fy === 'All Years' ? 'all' : fy}.csv`);
  };

  return (
    <div className="mx-auto mb-14 max-w-6xl">
      <div className="mb-6 flex items-center gap-2.5">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#011a39] text-blue-300">
          <BarChart3 size={17} aria-hidden="true" />
        </span>
        <div>
          <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">PMMY Analytics Dashboard</h2>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Filter, visualize and export MUDRA's published performance data</p>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-5 flex flex-wrap items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <span className="flex items-center gap-1.5 text-xs font-bold uppercase text-slate-500 dark:text-slate-400">
          <Filter size={13} aria-hidden="true" /> Filters:
        </span>
        {[
          { value: state, set: setState, options: STATE_OPTIONS, label: 'State' },
          { value: mli, set: setMli, options: MLI_OPTIONS, label: 'Bank / MLI' },
          { value: scheme, set: setScheme, options: SCHEME_OPTIONS, label: 'Scheme' },
          { value: fy, set: setFy, options: ['All Years', ...achievements.map((a) => a.year)], label: 'Financial Year' }
        ].map((f) => (
          <label key={f.label} className="flex items-center gap-1.5">
            <span className="sr-only">{f.label}</span>
            <select
              value={f.value}
              onChange={(e) => f.set(e.target.value)}
              aria-label={f.label}
              className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-700 focus:border-[#00b6f0] focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            >
              {f.options.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </label>
        ))}

        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            onClick={handleExportCsv}
            className="flex items-center gap-1.5 rounded-lg bg-[#011a39] px-3 py-1.5 text-xs font-bold text-white transition-colors hover:bg-[#194d70]"
          >
            <Download size={13} aria-hidden="true" /> Export CSV
          </button>
          <button
            type="button"
            disabled
            title="Coming soon — pending live API integration"
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-400 dark:border-slate-700 dark:text-slate-500"
          >
            <FileSpreadsheet size={13} aria-hidden="true" /> Export Excel
          </button>
          <button
            type="button"
            disabled
            title="Coming soon — pending live API integration"
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-400 dark:border-slate-700 dark:text-slate-500"
          >
            <FileType size={13} aria-hidden="true" /> Export PDF
          </button>
        </div>
      </div>

      {isFiltered && (
        <p className="mb-5 flex items-start gap-2 rounded-lg border border-blue-200 bg-blue-50/70 p-3 text-xs font-medium text-blue-900 dark:border-slate-700 dark:bg-slate-800/60 dark:text-blue-200">
          <Info size={14} className="mt-0.5 shrink-0" aria-hidden="true" />
          State / Bank-MLI / Scheme-level breakdowns will be available once live API integration is complete. The trend chart and export below reflect national totals for the selected Financial Year.
        </p>
      )}

      {/* Real trend chart */}
      <div className="mb-6 overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
        <h3 className="mb-3 text-xs font-extrabold uppercase tracking-wide text-slate-600 dark:text-slate-300">
          Sanctioned &amp; Disbursed Trend — Published FY Data
        </h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartData} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.25)" vertical={false} />
              <XAxis dataKey="year" tick={{ fontSize: 11, fontWeight: 700 }} stroke="rgba(148,163,184,0.6)" />
              <YAxis tick={{ fontSize: 11 }} stroke="rgba(148,163,184,0.6)" tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}K`} />
              <Tooltip
                formatter={(value, name) => [`₹${value.toLocaleString('en-IN')} Cr`, name === 'sanctioned' ? 'Sanctioned' : 'Disbursed']}
                contentStyle={{ borderRadius: 12, border: '1px solid rgba(148,163,184,0.3)', fontSize: 12 }}
              />
              <Bar dataKey="sanctioned" fill="#00b6f0" radius={[6, 6, 0, 0]} barSize={30} />
              <Line dataKey="disbursed" stroke="#004265" strokeWidth={2.5} dot={{ r: 4 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Illustrative state ranking */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-xs font-extrabold uppercase tracking-wide text-slate-600 dark:text-slate-300">
              State-wise Comparison
            </h3>
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[9.5px] font-bold uppercase text-slate-500 dark:bg-slate-800 dark:text-slate-400">
              Illustrative
            </span>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={illustrativeStateRanking} layout="vertical" margin={{ top: 0, right: 16, left: 8, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.2)" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 10 }} stroke="rgba(148,163,184,0.6)" />
                <YAxis type="category" dataKey="state" tick={{ fontSize: 10.5, fontWeight: 700 }} width={90} stroke="rgba(148,163,184,0.6)" />
                <Tooltip formatter={(v) => [`₹${v}K Cr (illustrative)`, 'Disbursed']} contentStyle={{ borderRadius: 12, fontSize: 12 }} />
                <Bar dataKey="value" fill="#00b6f0" radius={[0, 6, 6, 0]} barSize={14} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Illustrative MLI donut */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-xs font-extrabold uppercase tracking-wide text-slate-600 dark:text-slate-300">
              MLI-Type Participation Mix
            </h3>
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[9.5px] font-bold uppercase text-slate-500 dark:bg-slate-800 dark:text-slate-400">
              Illustrative
            </span>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={illustrativeMliMix} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} paddingAngle={2}>
                  {illustrativeMliMix.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
                </Pie>
                <Tooltip formatter={(v, n) => [`${v}% (illustrative)`, n]} contentStyle={{ borderRadius: 12, fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <ul className="mt-2 flex flex-wrap justify-center gap-3">
            {illustrativeMliMix.map((item) => (
              <li key={item.name} className="flex items-center gap-1.5 text-[10.5px] font-semibold text-slate-600 dark:text-slate-300">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} aria-hidden="true" />
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
