'use client';

import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';
import { TestimonialCarousel } from './TestimonialCarousel';
import { testimonials } from '@/lib/data/testimonials';

import styles from './Testimonials.module.css';

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className={styles.section}
      aria-labelledby="testimonials-heading"
    >
      <Reveal className={styles.center}>
        <Eyebrow>Testimonials</Eyebrow>
        <h2 id="testimonials-heading" className={styles.heading}>
          What partners say about VLV.
        </h2>
      </Reveal>
      <TestimonialCarousel items={testimonials} />
    </section>
  );
}
