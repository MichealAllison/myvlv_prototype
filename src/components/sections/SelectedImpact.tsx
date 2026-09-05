'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';

import { impactCases } from '@/lib/data/work';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { staggerChild, staggerContainer, viewportOnce } from '@/lib/animation/variants';

import styles from './SelectedImpact.module.css';

/**
 * Movement 07 — Selected Impact / proof.
 * Real evidence, not a generic gallery. Each case is structured as
 * problem → intervention → result, tagged with the owning company.
 * Currently fed from src/lib/data/work.ts (static); later becomes /work.
 */
export function SelectedImpact() {
  return (
    <section id="impact" className={styles.section} aria-labelledby="impact-heading">
      <div className={styles.inner}>
        <SectionHeading
          eyebrow="Selected impact"
          title={<span id="impact-heading">Proof the ecosystem works in practice.</span>}
          intro="Traction, not language. Each story follows the route: client problem → intervention → tangible result — and the company that delivered it."
        />

        <motion.div
          className={styles.grid}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {impactCases.map((item) => (
            <motion.article
              key={`${item.company}-${item.tag}`}
              variants={staggerChild}
              className={styles.case}
            >
              <div className={styles.caseHead}>
                <span className={styles.tag}>{item.tag}</span>
                <span className={styles.company}>{item.companyName}</span>
              </div>

              <h3 className={styles.title}>{item.title}</h3>

              <dl className={styles.flow}>
                <div className={styles.row}>
                  <dt>Problem</dt>
                  <dd>{item.problem}</dd>
                </div>
                <div className={styles.row}>
                  <dt>Intervention</dt>
                  <dd>{item.intervention}</dd>
                </div>
                <div className={styles.row}>
                  <dt>Result</dt>
                  <dd>{item.result}</dd>
                </div>
              </dl>
            </motion.article>
          ))}
        </motion.div>

        <div className={styles.foot}>
          <Link className={styles.more} href="/work">
            Explore the full work / impact board <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}