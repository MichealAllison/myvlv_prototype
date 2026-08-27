import type { Division } from '@/lib/data/divisions';

import styles from './EcosystemCard.module.css';

interface EcosystemCardProps {
  division: Division;
}

/** One division pillar — preview iframe of the division site, equal-weight framing. */
export function EcosystemCard({ division }: EcosystemCardProps) {
  const title = `${division.name} preview`;
  return (
    <article className={styles.card}>
      <div className={styles.media}>
        <iframe
          src={division.url}
          title={title}
          className={styles.preview}
          loading="lazy"
          referrerPolicy="no-referrer"
        />
      </div>
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