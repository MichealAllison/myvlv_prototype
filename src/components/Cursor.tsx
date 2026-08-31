'use client';

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion';
import { useEffect, useState } from 'react';

import styles from './Cursor.module.css';

type CursorState = 'default' | 'hover' | 'label' | 'text';

const INTERACTIVE = 'a, button, [role="button"], [tabindex], [data-cursor-label]';
const TEXT_INPUT = 'input, textarea, select, [contenteditable=""]';

/**
 * Custom mouse-follow cursor — a small ring that trails the pointer with a
 * gentle spring (the same motion-value + spring idiom as `Magnetic`).
 *
 * Contextual states:
 *   default — small outline ring
 *   hover   — grows on interactive elements
 *   label   — fills with a word ('VIEW' / 'MENU') via [data-cursor-label]
 *   text    — hides over text inputs/areas
 *
 * Desktop fine-pointer only (gated behind the same media query as the
 * newsletter exit-intent). Mounted once at the app root (see layout.tsx) so it
 * persists across the overlay open/close and section changes. Fully disabled
 * under prefers-reduced-motion.
 */
export function Cursor() {
  const reduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [state, setState] = useState<CursorState>('default');
  const [label, setLabel] = useState<string | null>(null);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 420, damping: 32, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 420, damping: 32, mass: 0.35 });

  useEffect(() => {
    if (reduced) return;
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (!fine.matches) return;

    setEnabled(true);
    document.body.classList.add('cur-on');

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target || !document.body.contains(target)) return;

      if (target.closest(TEXT_INPUT)) {
        setState('text');
        setLabel(null);
        return;
      }
      const labelled = target.closest<HTMLElement>('[data-cursor-label]');
      if (labelled?.dataset.cursorLabel) {
        setState('label');
        setLabel(labelled.dataset.cursorLabel);
        return;
      }
      if (target.closest(INTERACTIVE)) {
        setState('hover');
        setLabel(null);
        return;
      }
      setState('default');
      setLabel(null);
    };

    const onLeave = () => {
      setState('default');
      setLabel(null);
    };

    window.addEventListener('mousemove', move, { passive: true });
    document.addEventListener('mouseover', onOver, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseleave', onLeave);
      document.body.classList.remove('cur-on');
    };
  }, [reduced, x, y]);

  if (reduced || !enabled) return null;

  const ringCls = [
    styles.ring,
    state === 'default' ? styles.default : null,
    state === 'hover' ? styles.hover : null,
    state === 'label' ? styles.label : null,
    state === 'text' ? styles.text : null,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <motion.div
      className={styles.wrap}
      style={{ x: sx, y: sy }}
      aria-hidden="true"
    >
      <motion.div
        className={ringCls}
        animate={{
          scale: state === 'text' ? 0.4 : state === 'hover' ? 1.7 : 1,
          opacity: state === 'text' ? 0 : 1,
        }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      >
        {label && <span className={styles.caption}>{label}</span>}
      </motion.div>
    </motion.div>
  );
}