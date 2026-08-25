'use client';

import { motion } from 'framer-motion';

import { SectionHeading } from '@/components/ui/SectionHeading';
import {
  staggerChild,
  staggerContainer,
  viewportOnce,
} from '@/lib/animation/variants';
import { whyPoints } from '@/lib/data/whyPoints';

import styles from './WhyChooseUs.module.css';

export function WhyChooseUs() {
  return (
    <section
      id="why"
      className={styles.section}
      aria-labelledby="why-heading"
    >
      <div className={styles.inner}>
        <SectionHeading
          eyebrow="Why Choose Us"
          title={<span id="why-heading">Empowering change, one solution at a time.</span>}
        />
        <motion.ul
          className={styles.grid}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {whyPoints.map((point) => (
            <motion.li key={point.title} variants={staggerChild} className={styles.card}>
              <span className={styles.num} aria-hidden="true">
                —
              </span>
              <h3 className={styles.title}>{point.title}</h3>
              <p className={styles.description}>{point.description}</p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
