'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

import { EASE_EXPO, EASE_SMOOTH } from '@/lib/animation/variants';

import styles from './Stage0Gate.module.css';

interface Stage0GateProps {
  /** Advance gate -> sequence. Fired by CTA click, scroll-down, and swipes. */
  onAdvance: () => void;
}

const loadIn = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: EASE_SMOOTH, delay },
  }),
};

const ARROW_NUDGE = {
  hidden: { x: 0 },
  visible: { x: 4, transition: { duration: 0.5, repeat: Infinity, repeatType: 'reverse' as const, ease: 'easeInOut' } },
};

// SWIPE_THRESHOLD must be small enough to feel responsive, big enough to ignore
// accidental jitter (px of upward finger travel on touch).
const SWIPE_THRESHOLD = 24;

/**
 * Stage 0 — the gate. A minimal, branded full-bleed screen that forces an
 * interaction before the journey begins. Clicking the CTA OR scrolling down
 * (wheel / swipe up) — not punishing scroll-happy visitors — advances to the
 * motion sequence. The overlay also hard-blocks page scroll behind it.
 */
export function Stage0Gate({ onAdvance }: Stage0GateProps) {
  const advanceRef = useRef(onAdvance);
  advanceRef.current = onAdvance;

  const touchStartRef = useRef<number | null>(null);

  useEffect(() => {
    const advance = () => advanceRef.current();

    // Wheel: block the page scroll, advance only on scroll-down.
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (e.deltaY > 0) advance();
    };

    // Touch: block overscroll; treat a swipe up as "scroll down".
    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const start = touchStartRef.current;
      if (start == null) return;
      const delta = start - e.touches[0].clientY;
      if (delta > SWIPE_THRESHOLD) {
        touchStartRef.current = null; // fire once per swipe
        advance();
      }
    };
    const onTouchStart = (e: TouchEvent) => {
      touchStartRef.current = e.touches[0].clientY;
    };

    // Keyboard escape hatch (accessibility).
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        advance();
      } else if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        advance();
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    document.addEventListener('touchmove', onTouchMove, { passive: false });
    document.addEventListener('touchstart', onTouchStart, { passive: true });
    document.addEventListener('keydown', onKey);

    return () => {
      window.removeEventListener('wheel', onWheel);
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('touchstart', onTouchStart);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  return (
    <div className={styles.gate} aria-label="VivaLaVida — enter the experience">
      <motion.div
        className={styles.card}
        initial="hidden"
        animate="visible"
      >
        <motion.div custom={0.15} variants={loadIn} className={styles.mark}>
          <Image
            src="/logo.png"
            alt="VivaLaVida logo mark"
            width={52}
            height={52}
            className={styles.logo}
            priority
          />
        </motion.div>

        <motion.p custom={0.28} variants={loadIn} className={styles.est}>
          Est. 2025 — Building ideas, impact, and people
        </motion.p>

        <motion.h1 custom={0.42} variants={loadIn} className={styles.title}>
          Viva<span className={styles.accent}>La</span>Vida
        </motion.h1>

        <motion.div custom={0.55} variants={loadIn} className={styles.actions}>
          <button
            type="button"
            className={styles.cta}
            onClick={() => advanceRef.current()}
          >
            Enter{' '}
            <motion.span
              aria-hidden="true"
              variants={ARROW_NUDGE}
              initial="hidden"
              animate="visible"
            >
              →
            </motion.span>
          </button>
        </motion.div>

        <motion.p custom={0.7} variants={loadIn} className={styles.hint}>
          Click, press Enter, or scroll to begin
        </motion.p>
      </motion.div>
    </div>
  );
}