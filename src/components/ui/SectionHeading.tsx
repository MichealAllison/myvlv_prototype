import type { ReactNode } from 'react';

import { Eyebrow } from './Eyebrow';
import styles from './SectionHeading.module.css';

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  /** Optional right-column intro paragraph (eco-head style layout). */
  intro?: string;
}

/** Shared section header: eyebrow + display heading, optional intro column. */
export function SectionHeading({ eyebrow, title, intro }: SectionHeadingProps) {
  if (intro) {
    return (
      <div className={styles.splitHead}>
        <div>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className={`${styles.title} ${styles.large}`}>{title}</h2>
        </div>
        <p className={styles.intro}>{intro}</p>
      </div>
    );
  }

  return (
    <header className={styles.stack}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className={styles.title}>{title}</h2>
    </header>
  );
}
