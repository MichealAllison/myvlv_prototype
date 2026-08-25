import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';

import styles from './About.module.css';

export function About() {
  return (
    <section id="about" className={styles.section} aria-labelledby="about-heading">
      <div className={styles.grid}>
        <Reveal>
          <Eyebrow>About Us</Eyebrow>
        </Reveal>
        <div>
          <Reveal delay={0.05}>
            <h2 id="about-heading" className={styles.heading}>
              Creating value
              <br />
              that transforms lives.
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className={styles.body}>
              VivaLaVida bridges innovation, knowledge, and impact to build
              solutions that empower people and organizations to thrive.
              Through our three divisions — <strong>Ambidexters</strong>,{' '}
              <strong>SkillHubs Global</strong>, and{' '}
              <strong>Impact City</strong> — we deliver practical technology,
              transformative learning, and purpose-driven growth, connected as
              one ecosystem.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
