import React from 'react';
import { Reveal } from './reveal';

/**
 * Shared section heading used across the home page sections.
 *
 * Presentation-only: callers pass their existing eyebrow / title / description
 * copy through unchanged. Centralising it keeps the vertical rhythm, type
 * scale, and reveal timing identical from section to section.
 */
export default function SectionHeading({
  eyebrow,
  icon: Icon,
  title,
  description,
  align = 'center',
  className = '',
  children,
}) {
  const centered = align === 'center';

  return (
    <div
      className={`${centered ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl text-left'} mb-12 lg:mb-16 ${className}`.trim()}
    >
      {eyebrow && (
        <Reveal variant="fade">
          <span className="eyebrow">
            {Icon && <Icon size={13} aria-hidden="true" />}
            <span>{eyebrow}</span>
          </span>
        </Reveal>
      )}

      {title && (
        <Reveal delay={70}>
          <h2 className="display-2 mt-4 text-slate-900 dark:text-white">{title}</h2>
        </Reveal>
      )}

      <Reveal delay={120}>
        <span className={`title-rule mt-5 block ${centered ? 'mx-auto' : ''}`} aria-hidden="true" />
      </Reveal>

      {description && (
        <Reveal delay={160}>
          <p className="body-lg mt-5 font-medium text-slate-600 dark:text-slate-300">{description}</p>
        </Reveal>
      )}

      {children && (
        <Reveal delay={200}>
          <div className="mt-7">{children}</div>
        </Reveal>
      )}
    </div>
  );
}
