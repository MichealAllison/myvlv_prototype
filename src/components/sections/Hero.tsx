'use client';

import { motion } from 'framer-motion';

import { ButtonLink } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { loadInVariant } from '@/lib/animation/variants';

import styles from './Hero.module.css';
import { OrbitVisual } from './OrbitVisual';

export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      <div className={`${styles.float} ${styles.floatOne}`} aria-hidden="true" />
      <div className={`${styles.float} ${styles.floatTwo}`} aria-hidden="true" />

      <div className={styles.inner}>
        <motion.div
          className={styles.text}
          variants={loadInVariant}
          initial="hidden"
          animate="visible"
          custom={0.15}
        >
          <Eyebrow>VivaLaVida — Est. 2025</Eyebrow>
          <h1 id="hero-heading">
            Building <em>ideas</em>,
            <br />
            impact, and people.
          </h1>
          <p className={styles.lede}>
            VLV bridges innovation, knowledge, and impact — connecting three
            divisions into one ecosystem designed to help people and
            organizations thrive.
          </p>
          <div className={styles.actions}>
            <ButtonLink href="/#ecosystem">
              Explore the ecosystem <span aria-hidden="true">→</span>
            </ButtonLink>
            <ButtonLink href="/#about" variant="ghost">
              About us
            </ButtonLink>
          </div>
        </motion.div>

        <motion.div
          variants={loadInVariant}
          initial="hidden"
          animate="visible"
          custom={0.35}
        >
          <OrbitVisual />
        </motion.div>
      </div>
    </section>
  );
}
