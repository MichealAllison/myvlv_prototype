'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';

import { divisions } from '@/lib/data/divisions';
import { staggerChild, staggerContainer, viewportOnce } from '@/lib/animation/variants';

import styles from './Ecosystem.module.css';
import { EcosystemCard } from './EcosystemCard';
import { SectionHeading } from '@/components/ui/SectionHeading';

const actionMap: Record<string, string> = {
  AMBIDEXTERS: 'Build',
  SKILLHUBS: 'Learn',
  IMPACTCITY: 'Grow',
};

const companyRoutes: Record<string, string> = {
  AMBIDEXTERS: '/companies/ambidexters',
  SKILLHUBS: '/companies/skillhubs',
  IMPACTCITY: '/companies/impactcity',
};

const journey = [
  {
    step: '01',
    title: 'Strategy',
    body: 'VivaLaVida defines the opportunity, the operating model, and the path to value.',
  },
  {
    step: '02',
    title: 'Build',
    body: 'Ambidexters creates the technology, products, and systems that make the idea real.',
  },
  {
    step: '03',
    title: 'Deploy',
    body: 'SkillHubs enables people and teams to learn, adapt, and activate the change in practice.',
  },
  {
    step: '04',
    title: 'Scale',
    body: 'The model grows through adoption, capability, and better commercial momentum.',
  },
  {
    step: '05',
    title: 'Influence',
    body: 'ImpactCity turns traction into leadership, visibility, and long-term social momentum.',
  },
];

export function Ecosystem() {
  const reduced = useReducedMotion();

  return (
    <section
      id="ecosystem"
      className={styles.section}
      aria-labelledby="ecosystem-heading"
    >
      <div className={styles.inner}>
        <SectionHeading
          eyebrow="Three companies. One connected ecosystem."
          title={
            <span id="ecosystem-heading">Technology. Capability. People.</span>
          }
          intro="VivaLaVida brings them together through strategy, integration, ventures and partnerships — creating one operating system for progress."
        />

        <div className={styles.thesis}>
          <motion.p
            className={styles.thesisLead}
            initial={reduced ? false : { opacity: 0, y: 18 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            The challenges shaping tomorrow do not fit neatly into one discipline.
            Neither do we.
          </motion.p>

          <motion.div
            className={styles.thesisCore}
            initial={reduced ? false : { opacity: 0, scale: 0.98 }}
            whileInView={reduced ? undefined : { opacity: 1, scale: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div className={styles.wordTrack} aria-label="Technology, capability and people connect under VivaLaVida">
              <span>Technology.</span>
              <span>Capability.</span>
              <span>People.</span>
            </div>
          </motion.div>
        </div>

        <motion.div
          className={styles.nodes}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {divisions.map((division) => (
            <motion.div
              key={division.index}
              className={`${styles.node} ${styles[division.tag.toLowerCase()]}`}
              variants={staggerChild}
              whileHover={reduced ? undefined : { y: -8, scale: 1.01 }}
              transition={{ duration: 0.32, ease: 'easeOut' }}
            >
              <Link href={companyRoutes[division.tag]} className={styles.nodeLink}>
                <div className={styles.nodeTop}>
                  <span className={styles.nodeIndex}>{division.index}</span>
                  <span className={styles.nodeAction}>{actionMap[division.tag]}</span>
                </div>

                <div className={styles.nodeMeta}>
                  <p className={styles.nodeTag}>{division.tag}</p>
                  <h3>{division.name}</h3>
                </div>

                <p className={styles.nodeDescription}>{division.description}</p>
                <span className={styles.nodeLinkHint}>Explore {division.name} <span aria-hidden="true">→</span></span>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <div className={styles.journeyWrap}>
          <div className={styles.journeyHeader}>
            <span className={styles.journeyEyebrow}>How the system works</span>
            <h3 className={styles.journeyTitle}>Strategy → Build → Deploy → Scale → Influence</h3>
          </div>

          <div className={styles.journey}>
            {journey.map((item, idx) => (
              <motion.div
                key={item.step}
                className={styles.journeyItem}
                initial={reduced ? false : { opacity: 0, y: 22 }}
                whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.6, ease: 'easeOut', delay: idx * 0.08 }}
              >
                <div className={styles.journeyStep}>{item.step}</div>
                <div className={styles.journeyBody}>
                  <h4>{item.title}</h4>
                  <p>{item.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
