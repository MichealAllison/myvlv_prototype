'use client';

import { motion, useReducedMotion } from 'framer-motion';

import { useView } from '@/lib/view/ViewContext';
import { viewportOnce } from '@/lib/animation/variants';

import styles from './FinalCTA.module.css';

export function FinalCTA() {
  const { navigate } = useView();
  const reduced = useReducedMotion();

  return (
    <motion.section
      className={styles.section}
      aria-labelledby="final-cta-heading"
      initial={reduced ? false : { opacity: 0, y: 24 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      <div className={styles.inner}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>Start with the system</p>
          <h2 id="final-cta-heading">Build what happens next.</h2>
        </div>

        <p className={styles.lede}>
          If the challenge is bigger than a single campaign, product or program,
          we design the operating model around it — strategy, capability, launch,
          and long-term influence.
        </p>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.primary}
            onClick={() => navigate('contact')}
          >
            Start a conversation
          </button>
          <button
            type="button"
            className={styles.secondary}
            onClick={() => navigate('ecosystem')}
          >
            Explore the ecosystem
          </button>
        </div>
      </div>
    </motion.section>
  );
}
