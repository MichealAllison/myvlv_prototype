import Link from 'next/link';

import { COMPANY_ROUTES, PRIMARY_NAV } from '@/lib/data/navigation';

import styles from './SiteFooter.module.css';

const socials = ['LinkedIn', 'Instagram', 'Facebook', 'X'];

/**
 * Movement 11 — strong institutional footer.
 * Renders the full VLV navigation + the three subsidiary gateways, so the
 * parent architecture stays visible at the base of the journey.
 */
export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brandCol}>
          <p className={styles.wordmark}>
            Viva<span className={styles.accent}>La</span>Vida
          </p>
          <p className={styles.tagline}>
            Technology. Capability. People.
            <br />
            Ideas that connect into one system for progress.
          </p>
          <p className={styles.founded}>Est. 2022</p>
        </div>

        <nav className={styles.col} aria-label="Explore">
          <p className={styles.colLabel}>Explore</p>
          <ul className={styles.links}>
            {PRIMARY_NAV.map((item) => (
              <li key={item.id}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav className={styles.col} aria-label="Companies">
          <p className={styles.colLabel}>Companies</p>
          <ul className={styles.links}>
            {COMPANY_ROUTES.map((company) => (
              <li key={company.href}>
                <Link href={company.href}>
                  {company.name} <span className={styles.companyLabel}>{company.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.col}>
          <p className={styles.colLabel}>Contact</p>
          <a className={styles.mail} href="mailto:hello@vivalavida.com">
            hello@vivalavida.com
          </a>
          <ul className={styles.socials}>
            {socials.map((name) => (
              <li key={name}>
                <a href="#" aria-label={`VivaLaVida on ${name}`}>
                  {name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.base}>
        <span>© 2026 VivaLaVida</span>
        <span>Ambidexters × SkillHubs × ImpactCity</span>
      </div>
    </footer>
  );
}