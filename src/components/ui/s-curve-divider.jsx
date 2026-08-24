import React from 'react';

/**
 * Full-width S-curve section divider — a clean, symmetric powder-blue wave
 * traced between a page's intro banner and the content section that
 * follows it.
 */
export default function SCurveDivider({ className = '' }) {
  return (
    <div className={`pointer-events-none w-full ${className}`} aria-hidden="true">
      <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="block h-10 w-full sm:h-14">
        <path
          d="M0,50 C480,0 960,100 1440,50"
          fill="none"
          stroke="#B0E0E6"
          strokeWidth="5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
