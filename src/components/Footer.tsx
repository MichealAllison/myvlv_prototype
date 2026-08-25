import { Reveal } from '@/components/ui/Reveal';
import styles from './Footer.module.css';

const socials = ['LinkedIn', 'Instagram', 'Facebook', 'X'];

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <Reveal>
          <h3 className={styles.headline}>
            Be part of the
            <br />
            VivaLaVida experience.
          </h3>
        </Reveal>
        <ul className={styles.socials}>
          {socials.map((name) => (
            <li key={name}>
              {/* Placeholder hrefs — real profile URLs to be supplied by client */}
              <a
                href="#"
                className={styles.socialLink}
                aria-label={`VivaLaVida on ${name}`}
              >
                {name}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.bottom}>
        <span>© 2026 VivaLaVida. All rights reserved.</span>
        <span>Ambidexters · SkillHubs Global · Impact City</span>
      </div>
    </footer>
  );
}
