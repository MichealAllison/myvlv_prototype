import type { Service } from '@/lib/data/services';

import styles from './ServiceCard.module.css';

interface ServiceCardProps {
  service: Service;
}

/** "What We Can Do For You" entry — initials monogram + title + blurb. */
export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.icon} aria-hidden="true">
        {service.initials}
      </div>
      <h3 className={styles.title}>{service.title}</h3>
      <p className={styles.description}>{service.description}</p>
    </article>
  );
}
