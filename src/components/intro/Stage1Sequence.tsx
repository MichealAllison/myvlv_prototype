'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

import { divisions } from '@/lib/data/divisions';
import { EASE_SMOOTH } from '@/lib/animation/variants';

import { Stage1Slide } from './Stage1Slide';

import styles from './Stage1Sequence.module.css';

const SLIDE_MS = 4500; // per-division hold (≈13–14s for all three)
const SKIP_AFTER_MS = 2500; // accessibility / impatient-visitor escape hatch

const SLIDE_EXIT = {
  opacity: 0,
  scale: 1.04,
  transition: { duration: 0.7, ease: EASE_SMOOTH },
};

interface Stage1SequenceProps {
  /** Auto-advance after the three slides complete. */
  onComplete: () => void;
  /** Skip button — jumps straight to the site. */
  onSkip: () => void;
}

/**
 * Stage 1 — the motion montage. Three full-screen division slides play in
 * sequence with a progress indicator and a skip escape hatch. It is not
 * scroll-linked, so a simple timed state drive (Framer Motion variants +
 * AnimatePresence crossfade) is all that's needed — no ScrollTrigger.
 */
export function Stage1Sequence({ onComplete, onSkip }: Stage1SequenceProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showSkip, setShowSkip] = useState(false);

  const completeRef = useRef(onComplete);
  completeRef.current = onComplete;

  // Advance through slides; when we run past the last one, notify the parent.
  useEffect(() => {
    if (activeIndex >= divisions.length) {
      completeRef.current();
      return;
    }
    const id = window.setTimeout(() => setActiveIndex((i) => i + 1), SLIDE_MS);
    return () => window.clearTimeout(id);
  }, [activeIndex]);

  // Skip button fades in after a beat so it never crowds the first slide.
  useEffect(() => {
    const id = window.setTimeout(() => setShowSkip(true), SKIP_AFTER_MS);
    return () => window.clearTimeout(id);
  }, []);

  // Hard-block wheel/touch while this montage is up — belt-and-braces on top of
  // the overflow lock, so the page behind can never scroll even if the boot
  // Preloader (layout.tsx) resets overflow at its own cadence.
  useEffect(() => {
    const block = (e: Event) => e.preventDefault();
    document.addEventListener('wheel', block, { passive: false });
    document.addEventListener('touchmove', block, { passive: false });
    return () => {
      document.removeEventListener('wheel', block);
      document.removeEventListener('touchmove', block);
    };
  }, []);

  const progress = Math.min(activeIndex, divisions.length) / divisions.length;

  return (
    <div className={styles.stage} aria-roledescription="carousel" aria-label="VivaLaVida divisions">
      {/* Thin progress line so it never reads as a stuck loader. */}
      <div className={styles.progress} aria-hidden="true">
        <div
          className={styles.progressFill}
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>

      <AnimatePresence>
        {activeIndex < divisions.length && (
          <motion.div
            key={divisions[activeIndex].index}
            className={styles.slideWrap}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={SLIDE_EXIT}
          >
            <Stage1Slide
              division={divisions[activeIndex]}
              index={activeIndex}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dot progress indicator. */}
      <div className={styles.dots} role="tablist" aria-label="Ecosystem division">
        {divisions.map((division, i) => {
          const cls =
            i === activeIndex
              ? styles.dotActive
              : i < activeIndex
                ? styles.dotDone
                : styles.dot;
          return (
            <span key={division.index} className={cls} role="tab" aria-selected={i === activeIndex} />
          );
        })}
      </div>

      <AnimatePresence>
        {showSkip && (
          <motion.button
            type="button"
            className={styles.skip}
            onClick={onSkip}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE_SMOOTH }}
          >
            Skip <span aria-hidden="true">→</span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}