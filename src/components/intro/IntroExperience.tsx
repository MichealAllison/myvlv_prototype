'use client';

import { AnimatePresence, motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { useEffect, useLayoutEffect, useState } from 'react';

import { EASE_SMOOTH } from '@/lib/animation/variants';

import { Stage0Gate } from './Stage0Gate';
import { useIntroState } from './useIntroState';

import styles from './IntroExperience.module.css';

/**
 * Top-level state machine for the gated intro.
 *
 *   boot  -> neutral opaque cover; resolves to gate|site before first paint
 *   gate  -> Stage0Gate (minimal branded CTA)   -> advance on Enter/click/scroll
 *   site  -> overlay lifts; main site revealed, normal scroll
 *
 * There is deliberately no intermediate montage: pressing Enter (or clicking /
 * scrolling) on the gate drops you straight onto the main site.
 *
 * The main site (passed as `children` from page.tsx) stays mounted for the
 * whole ride. The intro renders as a fixed full-screen overlay on top, so
 * reaching the site never remounts or shifts the layout — the overlay simply
 * crossfades away. This is why returning-repeat-visitors see no flash: they go
 * straight to `site` in a layout effect, before the browser paints.
 *
 * One animation library is used throughout (Framer Motion, chosen because the
 * app already runs all of its motion through MotionProvider with a global
 * prefers-reduced-motion handler) — no GSAP dependency is added.
 */
type IntroStage = 'boot' | 'gate' | 'site';

const REVEAL_TRANSITION = { duration: 0.6, ease: EASE_SMOOTH };

/** Deliberate SSR-safe alias: layout effect on the client, regular effect on server. */
const useIsoLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export function IntroExperience({ children }: { children: ReactNode }) {
  const [stage, setStage] = useState<IntroStage>('boot');
  const { hasSeen, markSeen } = useIntroState();

  // Resolve gate-vs-site from sessionStorage before paint -> no flash,
  // no layout shift for repeat visitors.
  useIsoLayoutEffect(() => {
    setStage(hasSeen() ? 'site' : 'gate');
  }, [hasSeen]);

  // Lock the page scroll while an intro overlay is present. The overlays also
  // block wheel/touch themselves as a belt-and-braces guard (the boot
  // Preloader in layout.tsx writes overflow at its own cadence too).
  useEffect(() => {
    if (stage !== 'site') {
      document.documentElement.style.overflow = 'hidden';
    }
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [stage]);

  const goSite = () => {
    setStage('site');
    markSeen();
  };

  const introOpen = stage !== 'site';

  return (
    <>
      {children}

      <AnimatePresence>
        {introOpen && (
          <motion.div
            className={styles.overlayLayer}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.03, transition: REVEAL_TRANSITION }}
            aria-label="Website introduction"
          >
            <AnimatePresence>
              {stage === 'boot' && (
                <motion.div
                  key="boot"
                  className={styles.boot}
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: REVEAL_TRANSITION }}
                />
              )}
              {stage === 'gate' && (
                <motion.div
                  key="gate"
                  initial={{ opacity: 0, scale: 0.985 }}
                  animate={{ opacity: 1, scale: 1, transition: REVEAL_TRANSITION }}
                  exit={{ opacity: 0, scale: 1.02, transition: REVEAL_TRANSITION }}
                >
                  <Stage0Gate onAdvance={goSite} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}