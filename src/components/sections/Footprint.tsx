'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';

import { SectionHeading } from '@/components/ui/SectionHeading';
import { staggerChild, staggerContainer, viewportOnce } from '@/lib/animation/variants';

import styles from './Footprint.module.css';

const areas = [
  {
    title: 'Communities',
    body: 'VLV works where people already are — across Ambidexters, SkillHubs and ImpactCity ecosystems.',
    href: '/companies',
    label: 'See the ecosystem',
  },
  {
    title: 'Partnerships',
    body: 'We partner with organisations that share our approach to technology, capability and sustained impact.',
    href: '/partner',
    label: 'Partner with VLV',
  },
  {
    title: 'People & careers',
    body: 'We are building teams across technology, learning, communities and strategic growth.',
    href: '/careers',
    label: 'Careers at VLV',
  },
];

/**
 * Movement 09 — global footprint / people / partnerships.
 * Deliberately honest: guides visitors toward the real institutional routes
 * rather than asserting fabricated presence numbers.
 */
export function Footprint() {
  return (
    <section id="footprint" className={styles.section} aria-labelledby="footprint-heading">
      <div className={styles.inner}>
        <SectionHeading
          eyebrow="Footprint"
          title={<span id="footprint-heading">A parent system, felt where it works.</span>}
          intro="VivaLaVida operates at the group level — strategy, investment, partnerships and the people who carry the ecosystem."
        />

        <motion.div
          className={styles.grid}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {areas.map((area) => (
            <motion.article key={area.title} variants={staggerChild} className={styles.card}>
              <h3>{area.title}</h3>
              <p>{area.body}</p>
              <Link className={styles.link} href={area.href}>
                {area.label} <span aria-hidden="true">→</span>
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}