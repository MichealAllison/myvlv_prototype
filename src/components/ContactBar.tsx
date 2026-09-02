import Link from 'next/link';

import styles from './ContactBar.module.css';

const socials = ['LinkedIn', 'Instagram', 'Facebook', 'X'];

const companyLinks = [
  { name: 'Ambidexters', href: '/companies/ambidexters', label: 'Build' },
  { name: 'SkillHubs', href: '/companies/skillhubs', label: 'Learn' },
  { name: 'ImpactCity', href: '/companies/impactcity', label: 'Grow' },
];

/**
 * Minimal contact bar with direct company entry points.
 * This makes the ecosystem architecture visible even in the footer.
 */
export function ContactBar() {
  return (
    <div className={styles.bar}>
      <div className={styles.entryPoints} aria-label="Company entry points">
        {companyLinks.map((item) => (
          <Link key={item.name} href={item.href} className={styles.entryLink}>
            <span className={styles.entryLabel}>{item.label}</span>
            <span className={styles.entryName}>{item.name}</span>
          </Link>
        ))}
      </div>

      <span className={styles.mail}>
        <a href="mailto:hello@vivalavida.com">hello@vivalavida.com</a>
      </span>

      <ul className={styles.socials}>
        {socials.map((name) => (
          <li key={name}>
            <a href="#" aria-label={`VivaLaVida on ${name}`}>
              {name}
            </a>
          </li>
        ))}
      </ul>

      <span className={styles.copy}>© 2026 VivaLaVida</span>
    </div>
  );
}