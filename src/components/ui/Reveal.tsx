'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { revealVariant, viewportOnce } from '@/lib/animation/variants';

import styles from './Reveal.module.css';

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Extra delay in seconds for hand-tuned sequencing. */
  delay?: number;
}

/**
 * Scroll-triggered fade/rise wrapper. All motion behavior is
 * centralized here; sections never hand-roll observers.
 */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  return (
    <motion.div
      className={className ? `${styles.reveal} ${className}` : styles.reveal}
      variants={revealVariant}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
