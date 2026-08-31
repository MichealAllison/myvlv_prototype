'use client';

import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { useRef, type ReactNode } from 'react';

/**
 * Magnetic wrapper — the "pulls toward the cursor" micro-interaction used on
 * the premium-agency CTAs (footer button, board "Get in touch", etc.).
 *
 * The element translates toward the pointer with spring physics, then settles
 * back on leave. Fully optional and gracefully disabled for prefers-reduced-
 * motion (renders a plain, non-moving box) so it never gets in the way.
 */
export function Magnetic({
  children,
  strength = 0.32,
  className,
}: {
  children: ReactNode;
  /** How strongly it chases the cursor, 0–1. Lower = subtler. */
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  // Session springs — raw mousemove value, smoothed by the spring for the
  // "buttery" feel (matching the glide of the rest of the site).
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 160, damping: 16, mass: 0.12 });
  const sy = useSpring(y, { stiffness: 160, damping: 16, mass: 0.12 });

  const onMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * strength);
    y.set(relY * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: sx, y: sy, display: 'inline-block' }}
      onMouseMove={onMouseMove}
      onMouseLeave={reset}
    >
      {children}
    </motion.div>
  );
}