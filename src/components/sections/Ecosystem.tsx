'use client';

import { motion } from 'framer-motion';

import { divisions } from '@/lib/data/divisions';
import { staggerChild, staggerContainer, viewportOnce } from '@/lib/animation/variants';

import styles from './Ecosystem.module.css';
import { EcosystemCard } from './EcosystemCard';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function Ecosystem() {
  return (
    <section
      id="ecosystem"
      className={styles.section}
      aria-labelledby="ecosystem-heading"
    >
      <div className={styles.inner}>
        <SectionHeading
          eyebrow="The Ecosystem"
          title={
            <span id="ecosystem-heading">The heart of VivaLaVida.</span>
          }
          intro="Three divisions, one ecosystem — each built to help people and organizations thrive in a different way."
        />
        <motion.div
          className={styles.cards}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {divisions.map((division) => (
            <motion.div key={division.index} variants={staggerChild}>
              <EcosystemCard division={division} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
