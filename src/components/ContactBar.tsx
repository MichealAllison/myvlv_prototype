import styles from './ContactBar.module.css';

const socials = ['LinkedIn', 'Instagram', 'Facebook', 'X'];

/**
 * Minimal single-line contact bar — replaces the old full footer block.
 * One thin strip: contact email + social links + copyright, separated by a
 * border line. Understated, consistent with the reference sites.
 */
export function ContactBar() {
  return (
    <div className={styles.bar}>
      <span className={styles.mail}>
        <a href="mailto:hello@vivalavida.com">hello@vivalavida.com</a>
      </span>
      <ul className={styles.socials}>
        {socials.map((name) => (
          <li key={name}>
            {/* Placeholder hrefs — real profile URLs to be supplied by client */}
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