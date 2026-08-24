import React from 'react';

/**
 * Small decorative S-curve accent rule for page banners — traces the
 * brand's light-blue → accent → navy ramp, echoing the S-curve border at
 * the bottom of the Home hero video. Drop in wherever a page currently
 * uses a straight divider bar under its title.
 */
export default function SDivider({ className = '' }) {
  const gradientId = React.useId();

  return (
    <svg viewBox="0 0 160 20" preserveAspectRatio="none" className={`h-4 w-32 ${className}`} aria-hidden="true">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#7dd3fc" />
          <stop offset="55%" stopColor="#00b6f0" />
          <stop offset="100%" stopColor="#021731" />
        </linearGradient>
      </defs>
      <path
        d="M2,4 C40,4 40,16 80,16 C120,16 120,4 158,4"
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
