import React from 'react';
import { useCMS } from '../CMSContext';
import { Sparkles, Building2, Eye, Palette } from 'lucide-react';

export default function MockupSwitcher() {
  const { cmsData, updateMockupTheme } = useCMS();
  const currentTheme = cmsData.mockupTheme || 'mockup1';

  return (
    <div className="bg-slate-900 text-white border-b border-slate-800 px-4 py-2 text-xs">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2 font-medium text-slate-300">
          <Palette className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span className="text-white font-bold">MUDRA 2.0 Evaluation Studio:</span>
          <span className="text-slate-400 hidden md:inline">Select Mockup Concept for Review</span>
        </div>

        <div className="flex items-center gap-2 bg-slate-800/80 p-1 rounded-lg border border-slate-700">
          <button
            type="button"
            onClick={() => updateMockupTheme('mockup2')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-all ${
              currentTheme === 'mockup2'
                ? 'bg-[#011a39] text-white border border-amber-500/50 shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
            }`}
          >
            <Building2 className="w-3.5 h-3.5 text-amber-400" />
            <span>Official SIDBI / CGTMSE Design (Recommended)</span>
          </button>

          <button
            type="button"
            onClick={() => updateMockupTheme('mockup1')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-all ${
              currentTheme === 'mockup1'
                ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 font-bold shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Mockup 1: Simple FinTech</span>
          </button>
        </div>

        <div className="hidden lg:flex items-center gap-3 text-slate-400">
          <a
            href="https://www.sidbi.in/en/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan-400 transition-colors flex items-center gap-1"
          >
            <Eye className="w-3 h-3" /> SIDBI Ref
          </a>
          <span>•</span>
          <a
            href="https://www.cgtmse.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-amber-400 transition-colors"
          >
            CGTMSE Ref
          </a>
          <span>•</span>
          <a
            href="https://www.ncgtc.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple-400 transition-colors"
          >
            NCGTC Ref
          </a>
        </div>
      </div>
    </div>
  );
}
