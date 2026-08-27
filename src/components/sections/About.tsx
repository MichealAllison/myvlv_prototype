'use client';

import Image from 'next/image';

import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';

import styles from './About.module.css';

const PORTRAIT = {
  src: 'https://randomuser.me/api/portraits/men/46.jpg',
  alt: 'A VLV team member in the community space',
};

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
        <Reveal delay={0.2} className={styles.portraitWrap}>
          <Image
            src={PORTRAIT.src}
            alt={PORTRAIT.alt}
            width={640}
            height={800}
            className={styles.portrait}
          />
        </Reveal>
      </div>
    </section>
  );
}
