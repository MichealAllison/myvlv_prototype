'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';

import { companies } from '@/lib/data/companies';
import { staggerChild, staggerContainer, viewportOnce } from '@/lib/animation/variants';

import styles from './GroupCTA.module.css';

const paths = [
  {
    action: 'Build technology',
    prompt: 'AI, products, platforms and transformation',
    href: '/companies/ambidexters',
  },
  {
    action: 'Develop your people',
    prompt: 'Capability, learning and executive development',
    href: '/companies/skillhubs',
  },
  {
    action: 'Grow people and communities',
    prompt: 'Professional growth, visibility and influence',
    href: '/companies/impactcity',
  },
  {
    action: 'Solve a challenge across several areas',
    prompt: 'Strategy and integration across the whole system',
    href: '/contact',
  },
];

/**
 * Movement 10 — the group conversion layer.
 * Routes each visitor type to the right company instead of funnelling
 * everyone to a generic "About". The cross-area option gives the parent role
 * a revenue-generating pathway.
 */
export function GroupCTA() {
  return (
    <motion.section
      id="start"
      className={styles.section}
      aria-labelledby="start-heading"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={viewportOnce}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      <div className={styles.inner}>
        <p className={styles.eyebrow}>Start with the system</p>
        <h2 id="start-heading" className={styles.heading}>
          What are you trying to build?
        </h2>

        <div className={styles.paths}>
          {paths.map((path) => (
            <Link key={path.action} href={path.href} className={styles.path}>
              <span className={styles.action}>{path.action}</span>
              <span className={styles.prompt}>{path.prompt}</span>
              <span className={styles.arrow} aria-hidden="true">→</span>
            </Link>
          ))}
        </div>

        <div className={styles.companies}>
          {companies.map((company) => (
            <Link key={company.slug} href={company.url} className={styles.companyChip}>
              {company.name}
            </Link>
          ))}
        </div>
      </div>
    </motion.section>
  );
}