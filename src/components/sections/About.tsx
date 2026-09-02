'use client';

import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';

import styles from './About.module.css';

export function About() {
  return (
    <section id="about" className={styles.section} aria-labelledby="about-heading">
      <div className={styles.grid}>
        <Reveal>
          <Eyebrow>VivaLaVida</Eyebrow>
        </Reveal>
        <div>
          <Reveal delay={0.05}>
            <h2 id="about-heading" className={styles.heading}>
              We build the systems,
              <br />
              capabilities and human potential
              <br />
              that move organisations forward.
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className={styles.body}>
              <strong>VivaLaVida</strong> is the parent company that brings
              together the strategy, partnerships, ventures and integration that
              make <strong>Ambidexters</strong>, <strong>SkillHubs</strong> and{' '}
              <strong>ImpactCity</strong> more valuable as one system than they
              are separately. We are not a wrapper around three brands; we are
              the operating layer that connects technology, learning and human
              potential.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className={styles.body}>
              Our model is simple: <strong>Strategy</strong> ·{' '}
              <strong>Integration</strong> · <strong>Ventures</strong> ·{' '}
              <strong>Partnerships</strong>. VivaLaVida shapes the group
              vision, aligns the opportunities, and creates the conditions for
              the ecosystem to scale together.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
