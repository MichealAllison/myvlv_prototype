'use client';

import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';

import styles from './NewsletterBand.module.css';
import { NewsletterForm } from './NewsletterForm';

export function NewsletterBand() {
  return (
    <section aria-labelledby="newsletter-heading" className={styles.section}>
      <div className={styles.inner}>
        <Reveal>
          <div className={styles.band}>
            <div>
              <Eyebrow>Newsletter</Eyebrow>
              <h2 id="newsletter-heading" className={styles.heading}>
                Stay close to the ecosystem.
              </h2>
            </div>
            <NewsletterForm idPrefix="band" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
