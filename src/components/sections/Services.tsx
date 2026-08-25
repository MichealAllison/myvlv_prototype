'use client';

import { motion } from 'framer-motion';

import { Eyebrow } from '@/components/ui/Eyebrow';
import {
  staggerChild,
  staggerContainer,
  viewportOnce,
} from '@/lib/animation/variants';
import { services } from '@/lib/data/services';

import styles from './Services.module.css';
import { ServiceCard } from './ServiceCard';

export function Services() {
  return (
    <section
      id="services"
      className={styles.section}
      aria-labelledby="services-heading"
    >
      <div className={styles.inner}>
        <Eyebrow>What We Can Do For You</Eyebrow>
        <h2 id="services-heading" className={styles.heading}>
          Whatever stage you're at, VLV has a way in.
        </h2>
        <motion.div
          className={styles.cards}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {services.map((service) => (
            <motion.div key={service.title} variants={staggerChild}>
              <ServiceCard service={service} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
