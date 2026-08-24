import React from 'react';
import { ShieldAlert } from 'lucide-react';

/* Persistent floating shortcut back to the statutory fraud advisory (the
   modal in App.jsx only auto-shows once per session) — same red/amber
   "official advisory" language used there and in the Fraud & Safety
   section, so it reads as a trust signal rather than a stray widget. */
export default function AdvisoryWidget({ onOpen }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label="Read the official MUDRA fraud advisory"
      className="group fixed bottom-6 left-4 z-40 flex items-center gap-2 rounded-full border border-slate-200 bg-white py-2.5 pl-2.5 pr-3 shadow-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-2xl dark:border-slate-700 dark:bg-slate-900 sm:left-6 sm:gap-3 sm:rounded-2xl sm:py-3 sm:pl-3 sm:pr-2.5"
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-red-50 to-amber-50 text-red-700 dark:from-red-950/40 dark:to-amber-950/30 dark:text-red-400 sm:h-10 sm:w-10 sm:rounded-xl">
        <ShieldAlert size={18} aria-hidden="true" />
      </span>

      {/* Title + description — collapses to just the icon + label on mobile
          so this can't crowd the chatbot launcher or overflow the screen. */}
      <span className="hidden min-w-0 max-w-[13rem] text-left sm:block">
        <span className="block text-sm font-black leading-snug text-[#011a39] dark:text-white">Official Advisory</span>
        <span className="block truncate text-xs font-medium text-slate-500 dark:text-slate-400">
          MUDRA loans are sanctioned via Banks/MFIs/NBFCs only
        </span>
      </span>
      <span className="text-xs font-bold text-[#011a39] dark:text-white sm:hidden">Advisory</span>

      <span className="ml-1 hidden shrink-0 items-center rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-3 py-2 text-xs font-extrabold text-white shadow-sm transition-transform duration-200 group-hover:translate-x-0.5 sm:inline-flex">
        Read Advisory
      </span>
    </button>
  );
}
