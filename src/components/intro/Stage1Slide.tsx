'use client';

import { motion } from 'framer-motion';

import type { Division } from '@/lib/data/divisions';
import { EASE_SMOOTH } from '@/lib/animation/variants';

import styles from './Stage1Slide.module.css';

/** Placeholder backdrops until Betsy's footage lands — one hue-family per division. */
const PLACEHOLDER_BG = [
  // Ambidexters — tech/product (magenta-leaning)
  'radial-gradient(120% 120% at 20% 10%, #3a0b3a 0%, #1b0f2e 45%, #0c0d10 100%)',
  // SkillHubs Global — training/growth (teal-leaning)
  'radial-gradient(120% 120% at 80% 10%, #063f3b 0%, #10303a 45%, #0c0d10 100%)',
  // Impact City — community (warm rose-leaning)
  'radial-gradient(120% 120% at 20% 80%, #3a1122 0%, #1c1030 45%, #0c0d10 100%)',
];

export interface StageSlideMedia {
  type: 'image' | 'video';
  src: string;
}

interface Stage1SlideProps {
  division: Division;
  index: number;
  /** Optional real asset. Omitting it falls back to the placeholder gradient. */
  media?: StageSlideMedia;
}

const copyContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const copyItem = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE_SMOOTH },
  },
};

/**
 * Stage 1 — one division "slide" within the montage. Full-screen backdrop (a
 * Betsy clip once it lands, otherwise an on-brand gradient), a division index,
 * and a short line of copy easing in (opacity/y). The active slide is the only
 * one mounted; Stage1Sequence drives the mount/unmount crossfade.
 */
export function Stage1Slide({ division, index, media }: Stage1SlideProps) {
  return (
    <div className={styles.slide} aria-label={division.name}>
      <div
        className={styles.bg}
        style={media ? undefined : { background: PLACEHOLDER_BG[index % PLACEHOLDER_BG.length] }}
        aria-hidden="true"
      >
        {media?.type === 'image' && (
          <img className={styles.media} src={media.src} alt="" loading="lazy" />
        )}
        {media?.type === 'video' && (
          <video
            className={styles.media}
            src={media.src}
            autoPlay
            muted
            loop
            playsInline
          />
        )}
      </div>

      <span className={styles.index} aria-hidden="true">
        {division.index}
      </span>

      <motion.div
        className={styles.copy}
        variants={copyContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.span className={styles.eyebrow} variants={copyItem}>
          {division.tag}
        </motion.span>
        <motion.h2 className={styles.name} variants={copyItem}>
          {division.name}
        </motion.h2>
        <motion.p className={styles.desc} variants={copyItem}>
          {division.description}
        </motion.p>
      </motion.div>
    </div>
  );
}