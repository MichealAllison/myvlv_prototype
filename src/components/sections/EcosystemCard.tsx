import type { Division } from '@/lib/data/divisions';

import styles from './EcosystemCard.module.css';

interface EcosystemCardProps {
  division: Division;
}

/** One division pillar — numbered, equal-weight (steven-style framing). */
export function EcosystemCard({ division }: EcosystemCardProps) {
  return (
    <article className={styles.card}>
      <p className={styles.tag}>
        {division.index} / {division.tag}
      </p>
      <h3 className={styles.name}>{division.name}</h3>
      <p className={styles.description}>{division.description}</p>
      <a
        href={division.url}
        className={styles.link}
        target="_blank"
        rel="noopener noreferrer"
      >
        {division.urlLabel} <span aria-hidden="true">→</span>
      </a>
    </article>
  );
}
