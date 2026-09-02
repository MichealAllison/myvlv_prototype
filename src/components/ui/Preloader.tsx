'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import { EASE_EXPO } from '@/lib/animation/variants';

import styles from './Preloader.module.css';

const WORD = ['V', 'i', 'v', 'a', 'L', 'a', 'V', 'i', 'd', 'a'];
const SESSION_KEY = 'vlv-preloaded';
const HOLD_MS = 7000;
const COUNT_MS = 7000;

/**
 * WordPress-style preloader moment: pulsing core, rising wordmark, a slow
 * progress line with a live percentage counter, then a curtain lift.
 * Runs once per browser session; collapses to a quick fade under
 * prefers-reduced-motion (via global MotionConfig + CSS).
 */
export function Preloader() {
  const [done, setDone] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const seen = sessionStorage.getItem(SESSION_KEY);
    const hold = seen ? 5000 : HOLD_MS;
    document.documentElement.style.overflow = 'hidden';

    // Ease-out percentage counter (0 → 100)
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / COUNT_MS, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const t = window.setTimeout(() => {
      setDone(true);
      sessionStorage.setItem(SESSION_KEY, '1');
      document.documentElement.style.overflow = '';
    }, hold);
    return () => {
      window.clearTimeout(t);
      cancelAnimationFrame(raf);
      document.documentElement.style.overflow = '';
    };
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className={styles.overlay}
          aria-hidden="true"
          initial={{ clipPath: 'inset(0 0 0% 0)' }}
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 1.1, ease: EASE_EXPO }}
        >
          <div className={styles.inner}>
            <motion.span
              className={styles.core}
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.25, 1] }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            />
            <div className={styles.word} aria-label="VivaLaVida">
              {WORD.map((letter, i) => (
                <motion.span
                  key={i}
                  className={i === 4 || i === 6 ? styles.accent : styles.letter}
                  initial={{ y: '110%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.15 + i * 0.045,
                    ease: EASE_EXPO,
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>
            <div className={styles.meter}>
              <motion.span
                className={styles.bar}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: COUNT_MS / 1000, ease: 'easeOut' }}
              />
              <span className={styles.count}>{count}%</span>
            </div>
            <span className={styles.caption}>EST. 2022 — BUILDING IDEAS, IMPACT, AND PEOPLE</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}