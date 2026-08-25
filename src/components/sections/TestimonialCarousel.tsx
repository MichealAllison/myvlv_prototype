'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';

import type { Testimonial } from '@/lib/data/testimonials';
import { EASE_SMOOTH } from '@/lib/animation/variants';

import styles from './TestimonialCarousel.module.css';

const ROTATE_MS = 6000;

interface TestimonialCarouselProps {
  items: Testimonial[];
}

/**
 * Accessible rotating carousel: prev/next buttons, dot navigation,
 * pause on hover/focus, respects reduced motion via global MotionConfig.
 */
export function TestimonialCarousel({ items }: TestimonialCarouselProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const regionRef = useRef<HTMLDivElement>(null);

  const go = useCallback(
    (next: number) => setIndex(((next % items.length) + items.length) % items.length),
    [items.length]
  );

  useEffect(() => {
    if (paused || items.length < 2) return;
    const id = window.setInterval(() => go(index + 1), ROTATE_MS);
    return () => window.clearInterval(id);
  }, [index, paused, go, items.length]);

  const current = items[index];

  return (
    <div
      ref={regionRef}
      className={styles.wrap}
      role="region"
      aria-roledescription="carousel"
      aria-label="Testimonials"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className={styles.stage} aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.figure
            key={index}
            className={styles.slide}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.5, ease: EASE_SMOOTH }}
          >
            <blockquote className={styles.quote}>{current.quote}</blockquote>
            <figcaption className={styles.author}>{current.author}</figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>

      <div className={styles.controls}>
        <button
          type="button"
          className={styles.arrow}
          onClick={() => go(index - 1)}
          aria-label="Previous testimonial"
        >
          ←
        </button>
        <div className={styles.dots} role="tablist" aria-label="Choose testimonial">
          {items.map((item, i) => (
            <button
              key={item.author}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Testimonial ${i + 1} of ${items.length}`}
              className={i === index ? `${styles.dot} ${styles.dotActive}` : styles.dot}
              onClick={() => go(i)}
            />
          ))}
        </div>
        <button
          type="button"
          className={styles.arrow}
          onClick={() => go(index + 1)}
          aria-label="Next testimonial"
        >
          →
        </button>
      </div>
    </div>
  );
}
