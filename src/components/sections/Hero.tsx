'use client';

import { motion, type Variants } from 'framer-motion';
import Link from 'next/link';

import { Eyebrow } from '@/components/ui/Eyebrow';
import { EASE_EXPO, loadInVariant } from '@/lib/animation/variants';

import styles from './Hero.module.css';
import btnStyles from '@/components/ui/Button.module.css';
import { OrbitVisual } from './OrbitVisual';

/**
 * Split-text loading reveal for the headline, matching the premium-agency
 * pattern (Montek/Creatim): each word lives in an overflow-hidden mask and
 * rises into place with a short stagger. Grab-bag token structure so we keep
 * the italic accent on "ideas" exactly as the copy intends.
 */
const LINES: { tokens: { text: string; accent?: boolean; punct?: boolean }[] }[] = [
  {
    tokens: [
      { text: 'Building' },
      { text: 'ideas,', accent: true },
      { text: 'impact,' },
    ],
  },
  {
    tokens: [
      { text: 'and' },
      { text: 'people.' },
    ],
  },
];

/** One word rising out of its clip mask. `i` = global cascade index. */
const splitWord: Variants = {
  hidden: { y: '115%' },
  visible: (i: number) => ({
    y: '0%',
    transition: { duration: 0.85, ease: EASE_EXPO, delay: 0.12 + 0.06 * i },
  }),
};

export function Hero() {
  let cascade = 0;

  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      <div className={`${styles.float} ${styles.floatOne}`} aria-hidden="true" />
      <div className={`${styles.float} ${styles.floatTwo}`} aria-hidden="true" />

      <div className={styles.inner}>
        <div className={styles.text}>
          <motion.div
            variants={loadInVariant}
            initial="hidden"
            animate="visible"
            custom={0.05}
          >
            <Eyebrow>VivaLaVida — Est. 2022</Eyebrow>
          </motion.div>

          <motion.h1
            id="hero-heading"
            className={styles.heading}
            variants={{ hidden: {}, visible: {} }}
            initial="hidden"
            animate="visible"
          >
            {LINES.map((line, li) => (
              <span className={styles.line} key={li}>
                {line.tokens.map((token, ti) => {
                  const i = cascade++;
                  return (
                    <span
                      className={styles.mask}
                      key={ti}
                    >
                      <motion.span
                        custom={i}
                        variants={splitWord}
                        className={[
                          styles.word,
                          token.accent ? styles.accent : null,
                          token.punct ? styles.punct : null,
                        ]
                          .filter(Boolean)
                          .join(' ')}
                      >
                        {token.text}
                      </motion.span>
                    </span>
                  );
                })}
              </span>
            ))}
          </motion.h1>

          <motion.p
            className={styles.lede}
            variants={loadInVariant}
            initial="hidden"
            animate="visible"
            custom={0.5}
          >
            We build the systems, capabilities and human potential that help
            organisations and people move forward. Ambidexters, SkillHubs and
            ImpactCity operate as one connected ecosystem.
          </motion.p>

          <motion.div
            className={styles.actions}
            variants={loadInVariant}
            initial="hidden"
            animate="visible"
            custom={0.65}
          >
            <a
              href="#ecosystem"
              className={btnStyles.btnPrimary}
            >
              Enter the ecosystem <span aria-hidden="true">→</span>
            </a>
            <Link
              className={btnStyles.btnGhost}
              href="/companies"
            >
              Our companies
            </Link>
          </motion.div>
        </div>

        <motion.div
          className={styles.visual}
          variants={loadInVariant}
          initial="hidden"
          animate="visible"
          custom={0.35}
        >
          <OrbitVisual />
        </motion.div>
      </div>

      {/* Scroll cue — "there's more below". Hidden from AT (decorative). */}
      <motion.div
        className={styles.scrollCue}
        aria-hidden="true"
        variants={loadInVariant}
        initial="hidden"
        animate="visible"
        custom={1.1}
      >
        <span className={styles.scrollLine}>
          <span className={styles.scrollDot} />
        </span>
        <span className={styles.scrollText}>Scroll</span>
      </motion.div>
    </section>
  );
}
