import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Network } from 'lucide-react';
import { createPageUrl } from '@/utils';
import { useLanguage } from './LanguageContext';

const FONT_SCALE_KEY = 'mudra-font-scale';

const FONT_SCALES = { lg: '18px', base: '16px', sm: '14px' };
const FONT_STEPS = [
  { key: 'lg', label: 'A+', title: 'Increase text size' },
  { key: 'base', label: 'A', title: 'Reset text size' },
  { key: 'sm', label: 'A-', title: 'Decrease text size' },
];

const LANGUAGE_OPTIONS = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिंदी' },
];

/**
 * GIGW-style accessibility strip — rendered once in Layout.jsx so it appears
 * fixed at the very top of every page. Every control here has a real,
 * working effect (not decorative): skip link, root font-size scaling, the
 * site language switch, and a link to the sitemap.
 */
export default function AccessibilityBar() {
  const { language, setLanguage } = useLanguage();
  const [fontScale, setFontScale] = useState(() => {
    if (typeof window === 'undefined') return 'base';
    return window.localStorage.getItem(FONT_SCALE_KEY) || 'base';
  });
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const langMenuRef = useRef(null);

  useEffect(() => {
    document.documentElement.style.fontSize = FONT_SCALES[fontScale];
    window.localStorage.setItem(FONT_SCALE_KEY, fontScale);
  }, [fontScale]);

  useEffect(() => {
    if (!langMenuOpen) return undefined;
    const handlePointerDown = (e) => {
      if (langMenuRef.current && !langMenuRef.current.contains(e.target)) {
        setLangMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, [langMenuOpen]);

  const currentLanguageLabel = LANGUAGE_OPTIONS.find((opt) => opt.code === language)?.label ?? 'English';

  return (
    <div className="fixed inset-x-0 top-0 z-[100] flex h-8 items-center justify-between gap-3 bg-[#cfeaf5] px-4 text-[11px] font-bold text-[#0b3d54] sm:px-6">
      <a href="#main-content" className="shrink-0 hover:underline">
        Skip to Main Content
      </a>

      <div className="flex shrink-0 items-center gap-1.5">
        <div className="flex items-center gap-0.5" role="group" aria-label="Adjust text size">
          {FONT_STEPS.map((step) => (
            <button
              key={step.key}
              type="button"
              title={step.title}
              aria-pressed={fontScale === step.key}
              onClick={() => setFontScale(step.key)}
              className={`flex h-5 w-6 items-center justify-center rounded text-[10.5px] font-black transition-colors duration-150 ${
                fontScale === step.key ? 'bg-[#0b3d54] text-white' : 'bg-[#0b3d54]/10 hover:bg-[#0b3d54]/20'
              }`}
            >
              {step.label}
            </button>
          ))}
        </div>

        <span className="h-4 w-px shrink-0 bg-[#0b3d54]/20" aria-hidden="true" />

        <div ref={langMenuRef} className="relative shrink-0">
          <button
            type="button"
            onClick={() => setLangMenuOpen((prev) => !prev)}
            aria-haspopup="listbox"
            aria-expanded={langMenuOpen}
            className="flex items-center gap-1 rounded px-1.5 py-0.5 hover:bg-[#0b3d54]/10"
          >
            <span>{currentLanguageLabel}</span>
            <ChevronDown size={12} aria-hidden="true" className={`transition-transform duration-150 ${langMenuOpen ? 'rotate-180' : ''}`} />
          </button>

          {langMenuOpen && (
            <ul
              role="listbox"
              className="absolute right-0 top-full mt-1.5 w-32 rounded-lg border border-[#0b3d54]/15 bg-white py-1 text-[#0f172a] shadow-xl"
            >
              {LANGUAGE_OPTIONS.map((opt) => (
                <li key={opt.code}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={language === opt.code}
                    onClick={() => {
                      setLanguage(opt.code);
                      setLangMenuOpen(false);
                    }}
                    className={`flex w-full items-center px-3 py-1.5 text-left text-[12.5px] font-semibold hover:bg-sky-50 ${
                      language === opt.code ? 'text-sky-700' : 'text-slate-700'
                    }`}
                  >
                    {opt.label}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <span className="h-4 w-px shrink-0 bg-[#0b3d54]/20" aria-hidden="true" />

        <Link
          to={createPageUrl('Sitemap')}
          title="Sitemap"
          className="flex h-5 w-5 shrink-0 items-center justify-center rounded hover:bg-[#0b3d54]/10"
        >
          <Network size={13} aria-hidden="true" />
          <span className="sr-only">Sitemap</span>
        </Link>
      </div>
    </div>
  );
}
