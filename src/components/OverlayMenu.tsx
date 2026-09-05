'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import Link from 'next/link';

import { EASE_EXPO } from '@/lib/animation/variants';
import { useFocusTrap } from '@/lib/useFocusTrap';
import { COMPANY_ROUTES, SCROLL_NAV } from '@/lib/data/navigation';

import styles from './OverlayMenu.module.css';

const PANEL_SLIDE: Variants = {
  hidden: { clipPath: 'inset(0 0 0 100%)' },
  show: {
    clipPath: 'inset(0 0 0 0%)',
    transition: { duration: 0.7, ease: EASE_EXPO },
  },
  exit: {
    clipPath: 'inset(0 0 0 100%)',
    transition: { duration: 0.55, ease: EASE_EXPO },
  },
};

/** Container staggers items in, then out in reverse when the panel closes. */
const LIST: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
  exit: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
};

/** Each menu item rises out of its clip mask. */
const ITEM: Variants = {
  hidden: { y: '115%', opacity: 0 },
  show: { y: '0%', opacity: 1, transition: { duration: 0.7, ease: EASE_EXPO } },
  exit: { y: '115%', opacity: 0, transition: { duration: 0.42, ease: EASE_EXPO } },
};

interface OverlayMenuProps {
  /** Drives the focus trap + whether the panel is considered active. */
  open: boolean;
  onClose: () => void;
}

/**
 * Full-height overlay menu that slides in from the right over everything,
 * beneath the persistent header. Institutional routes are primary; the three
 * subsidiary gateways sit in the footer. Focus-trapped, Esc/backdrop
 * dismissible. Respects prefers-reduced-motion by collapsing the clip-path
 * slide + word rise to a simple opacity fade.
 */
export function OverlayMenu({ open, onClose }: OverlayMenuProps) {
  const reduced = useReducedMotion();
  const trapRef = useFocusTrap(open, onClose);

  // Reduced motion: plain fade, no clip/stagger.
  const panel = reduced
    ? {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { duration: 0.3 } },
        exit: { opacity: 0, transition: { duration: 0.25 } },
      }
    : PANEL_SLIDE;

  return (
    <motion.div
      id="site-menu"
      ref={trapRef}
      className={styles.overlay}
      variants={panel}
      initial="hidden"
      animate="show"
      exit="exit"
      aria-label="Site navigation"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className={styles.inner}>
        <div className={styles.meta}>
          <span>Menu</span>
          <span>Est. 2022</span>
        </div>

        <motion.ul
          className={styles.list}
          variants={LIST}
          initial="hidden"
          animate="show"
          exit="exit"
        >
          {SCROLL_NAV.map((item, i) => (
            <li key={item.id} className={styles.itemWrap}>
              <motion.span className={styles.mask} variants={ITEM}>
                <Link href={item.href} className={styles.item} onClick={onClose}>
                  <span className={styles.index}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className={styles.label}>{item.label}</span>
                </Link>
              </motion.span>
            </li>
          ))}
        </motion.ul>

        <div className={styles.foot}>
          <div className={styles.companyLinks} aria-label="Company destinations">
            {COMPANY_ROUTES.map((company) => (
              <Link key={company.href} href={company.href} className={styles.companyLink} onClick={onClose}>
                <span>{company.label}</span>
                <strong>{company.name}</strong>
              </Link>
            ))}
          </div>
          <Link href="/contact" className={styles.footHint} onClick={onClose}>
            Get in touch ↓
          </Link>
        </div>
      </div>
    </motion.div>
  );
}