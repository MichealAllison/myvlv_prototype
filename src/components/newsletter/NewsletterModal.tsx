'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';

import { Eyebrow } from '@/components/ui/Eyebrow';
import { EASE_SMOOTH } from '@/lib/animation/variants';
import { useFocusTrap } from '@/lib/useFocusTrap';

import styles from './NewsletterModal.module.css';
import { NewsletterForm } from './NewsletterForm';

const MIN_DWELL_MS = 8000;
const SCROLL_DEPTH = 0.6;
const SESSION_KEY = 'vlv-newsletter-dismissed';

/** Safe sessionStorage read; private mode returns false (not dismissed). */
function readDismissed(): boolean {
  try {
    return sessionStorage.getItem(SESSION_KEY) === '1';
  } catch {
    return false;
  }
}

/**
 * One-time newsletter popup.
 *
 * Triggering is intentional, not a page-load nag — it fires on the first of:
 *  1. exit-intent (mouse leaves the viewport through the top edge), or
 *  2. scroll depth past ~60% of the document,
 * but only AFTER a minimum dwell (~8s) so it never interrupts the intro or
 * someone who just landed. Desktop hover-capable devices get exit-intent;
 * touch users (and those who never reach a threshold) still hit scroll-depth.
 *
 * Focus-trapped and Esc/backdrop dismissible. Never re-shows once closed.
 */
export function NewsletterModal() {
  const [open, setOpen] = useState(false);
  // First eligible instant in ms. Lives in a ref so trigger handlers can read it
  // without re-subscribing and without side-effects inside a state updater.
  const eligibleAtRef = useRef<number | null>(null);

  const close = useCallback(() => {
    setOpen(false);
    try {
      sessionStorage.setItem(SESSION_KEY, '1');
    } catch {
      /* storage unavailable (private mode) — fine */
    }
  }, []);

  const maybeOpen = useCallback(() => {
    const deadline = eligibleAtRef.current;
    if (deadline != null && Date.now() >= deadline) setOpen(true);
  }, []);

  const trapRef = useFocusTrap(open, close);

  useEffect(() => {
    const dismissed = readDismissed();
    // Dwell mark — the modal can't open until this elapses, so a visitor who
    // instantly exits (or scrolls past a threshold) isn't ambushed.
    eligibleAtRef.current = Date.now() + MIN_DWELL_MS;
    if (dismissed) return;
  }, []);

  useEffect(() => {
    if (open) return; // no need to keep listening after it's shown
    if (eligibleAtRef.current == null) return;

    // Re-check dismissal each time, so someone who closed it earlier in the
    // session can't be re-triggered by a later scroll/exit.
    if (readDismissed()) return;

    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');

    // Exit-intent — mouse leaves through the top of the viewport. Desktop only.
    const onMouseOut = (e: MouseEvent) => {
      if (!finePointer.matches) return;
      // Treat "the pointer left the window" as the cursor crossing y<=0.
      if (!e.relatedTarget && e.clientY <= 0) maybeOpen();
    };

    // Scroll-depth — past ~60% of the document's scrollable height.
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const ratio = window.scrollY / scrollable;
      if (ratio >= SCROLL_DEPTH) maybeOpen();
    };

    document.documentElement.addEventListener('mouseout', onMouseOut);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      document.documentElement.removeEventListener('mouseout', onMouseOut);
      window.removeEventListener('scroll', onScroll);
    };
  }, [open, maybeOpen]);

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
