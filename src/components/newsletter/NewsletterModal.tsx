'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';

import { Eyebrow } from '@/components/ui/Eyebrow';
import { EASE_SMOOTH } from '@/lib/animation/variants';
import { useFocusTrap } from '@/lib/useFocusTrap';

import styles from './NewsletterModal.module.css';
import { NewsletterForm } from './NewsletterForm';

const SHOW_DELAY_MS = 6000;
const SESSION_KEY = 'vlv-newsletter-dismissed';

/**
 * One-time newsletter popup. Shows once per session after a short delay;
 * focus-trapped, Esc/backdrop dismissible.
 */
export function NewsletterModal() {
  const [open, setOpen] = useState(false);

  const close = useCallback(() => {
    setOpen(false);
    try {
      sessionStorage.setItem(SESSION_KEY, '1');
    } catch {
      /* storage unavailable (private mode) — fine */
    }
  }, []);

  const trapRef = useFocusTrap(open, close);

  useEffect(() => {
    let dismissed = false;
    try {
      dismissed = sessionStorage.getItem(SESSION_KEY) === '1';
    } catch {
      /* ignore */
    }
    if (dismissed) return;

    const id = window.setTimeout(() => setOpen(true), SHOW_DELAY_MS);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: EASE_SMOOTH }}
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <motion.div
            ref={trapRef}
            className={styles.card}
            role="dialog"
            aria-modal="true"
            aria-labelledby="newsletter-modal-heading"
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.5, ease: EASE_SMOOTH }}
          >
            <button
              type="button"
              className={styles.close}
              onClick={close}
              aria-label="Close newsletter signup"
            >
              ×
            </button>
            <Eyebrow>Join the list</Eyebrow>
            <h3 id="newsletter-modal-heading" className={styles.heading}>
              Don't miss what's next at VLV.
            </h3>
            <p className={styles.copy}>
              One email, occasionally — new from Ambidexters, SkillHubs, and
              Impact City.
            </p>
            <NewsletterForm idPrefix="modal" />
            <p className={styles.fine}>No spam. Unsubscribe anytime.</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
