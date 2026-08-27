'use client';

import { motion } from 'framer-motion';
import {
  Award,
  Globe,
  GraduationCap,
  Users,
  type LucideIcon,
} from 'lucide-react';

import { SectionHeading } from '@/components/ui/SectionHeading';
import {
  staggerChild,
  staggerContainer,
  viewportOnce,
} from '@/lib/animation/variants';
import { whyPoints } from '@/lib/data/whyPoints';

import styles from './WhyChooseUs.module.css';

const ICONS: Record<string, LucideIcon> = {
  'Interconnected Divisions': Globe,
  'Practical Outcomes': Award,
  'Expert-Led Programs': GraduationCap,
  'Community of Growth': Users,
};

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
          {whyPoints.map((point) => {
            const Icon = ICONS[point.title] ?? Award;
            return (
              <motion.li key={point.title} variants={staggerChild} className={styles.card}>
                <span className={styles.icon} aria-hidden="true">
                  <Icon />
                </span>
                <h3 className={styles.title}>{point.title}</h3>
                <p className={styles.description}>{point.description}</p>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}
