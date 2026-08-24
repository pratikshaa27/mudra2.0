import React, { useEffect, useRef, useState, createContext, useContext } from 'react';

/**
 * Scroll-reveal primitives built on IntersectionObserver.
 *
 * These are presentation-only wrappers: they never alter the content they
 * wrap. Animation is limited to `opacity` and `transform` so it stays on the
 * compositor and does not trigger layout shifts.
 *
 * Users with `prefers-reduced-motion: reduce` get the content immediately;
 * the CSS in index.css neutralises the transform/transition, and we also
 * short-circuit the observer so nothing can ever stay hidden.
 */

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Lets a <RevealGroup> hand a computed stagger delay down to its children. */
const StaggerContext = createContext(null);

const variantClass = {
  up: '',
  fade: 'reveal-fade',
  left: 'reveal-left',
  right: 'reveal-right',
  scale: 'reveal-scale',
};

/**
 * Reveals its children once they scroll into view.
 *
 * @param {'up'|'fade'|'left'|'right'|'scale'} variant  Entrance direction.
 * @param {number} delay     Delay in ms before the transition starts.
 * @param {number} index     Position within a RevealGroup (drives stagger).
 * @param {string} as        Element tag to render. Defaults to 'div'.
 * @param {boolean} once     Animate a single time. Defaults to true.
 */
export function Reveal({
  children,
  variant = 'up',
  delay = 0,
  index = 0,
  as: Tag = 'div',
  once = true,
  className = '',
  style,
  ...rest
}) {
  const ref = useRef(null);
  const stagger = useContext(StaggerContext);
  // Reduced-motion users start visible, so nothing can be trapped hidden.
  const [visible, setVisible] = useState(() => prefersReducedMotion());

  useEffect(() => {
    if (prefersReducedMotion()) {
      setVisible(true);
      return undefined;
    }

    const node = ref.current;
    if (!node) return undefined;

    // Fail open: if the browser lacks IntersectionObserver, just show content.
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.unobserve(entry.target);
        } else if (!once) {
          setVisible(false);
        }
      },
      {
        // Trigger slightly before the element is fully on screen so the
        // motion reads as "already settling" rather than popping in late.
        rootMargin: '0px 0px -12% 0px',
        threshold: 0.08,
      },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [once]);

  const step = stagger ?? 0;
  const totalDelay = delay + index * step;

  return (
    <Tag
      ref={ref}
      className={`reveal ${variantClass[variant] ?? ''} ${visible ? 'is-visible' : ''} ${className}`.trim()}
      style={totalDelay ? { transitionDelay: `${totalDelay}ms`, ...style } : style}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/**
 * Wraps a set of <Reveal index={i}> children and gives them a shared
 * stagger step, so grids cascade instead of appearing all at once.
 */
export function RevealGroup({ children, stagger = 80, as: Tag = 'div', className = '', ...rest }) {
  return (
    <StaggerContext.Provider value={stagger}>
      <Tag className={className} {...rest}>
        {children}
      </Tag>
    </StaggerContext.Provider>
  );
}

/**
 * Counts up to `value` the first time it scrolls into view.
 * Animates on requestAnimationFrame with an ease-out curve, and renders the
 * final value immediately for reduced-motion users.
 *
 * Formatting hooks (`prefix`, `suffix`, `decimals`, `separator`) exist so the
 * displayed figure can match the original text exactly.
 */
export function CountUp({
  value,
  duration = 1800,
  decimals = 0,
  prefix = '',
  suffix = '',
  separator = false,
  className = '',
}) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(() => (prefersReducedMotion() ? value : 0));

  useEffect(() => {
    if (prefersReducedMotion()) {
      setDisplay(value);
      return undefined;
    }

    const node = ref.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      setDisplay(value);
      return undefined;
    }

    let frame;
    let cancelled = false;

    const run = () => {
      const start = performance.now();
      const tick = (now) => {
        if (cancelled) return;
        const progress = Math.min((now - start) / duration, 1);
        // easeOutCubic keeps the tail slow so the final number settles.
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplay(value * eased);
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          run();
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(node);

    return () => {
      cancelled = true;
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [value, duration]);

  const fixed = display.toFixed(decimals);
  const formatted = separator
    ? Number(fixed).toLocaleString('en-IN', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })
    : fixed;

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

export default Reveal;
