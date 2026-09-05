'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';

import { companies } from '@/lib/data/companies';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { staggerChild, staggerContainer, viewportOnce } from '@/lib/animation/variants';

import styles from './BrandPortals.module.css';

const actionMap: Record<string, string> = {
  ambidexters: 'Build',
  skillhubs: 'Learn',
  impactcity: 'Grow',
};

/**
 * Movement 06 — three immersive brand portals.
 * Each company gets a large "world of its own" gateway that stays visibly
 * inside the VLV system (its own accent + motion personality), linking to the
 * full /companies/<slug> gateway pages.
 */
export function BrandPortals() {
  return (
    <section id="companies" className={styles.section} aria-labelledby="companies-heading">
      <div className={styles.inner}>
        <SectionHeading
          eyebrow="Three companies. One connected ecosystem."
          title={<span id="companies-heading">Different strengths. One connected system.</span>}
          intro="Each brand has its own personality and portfolio, operating inside the VLV parent system. Enter a world to see its proposition and proof."
        />

        <motion.div
          className={styles.grid}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {companies.map((company) => (
            <motion.article
              key={company.slug}
              variants={staggerChild}
              className={styles.portal}
              style={{ ['--acc' as string]: company.accent, ['--acc-soft' as string]: company.accentSoft }}
            >
              <Link href={company.url} className={styles.link}>
                <div className={styles.top}>
                  <span className={styles.index}>{actionMap[company.slug]}</span>
                  <span className={styles.eyebrow}>{company.eyebrow}</span>
                </div>

                <h3 className={styles.name}>{company.name}</h3>
                <p className={styles.proposition}>{company.proposition}</p>

                <ul className={styles.focus} aria-label={`${company.name} capabilities`}>
                  {company.focus.slice(0, 3).map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>

                <span className={styles.cta}>
                  Enter {company.name} <span aria-hidden="true">→</span>
                </span>
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}