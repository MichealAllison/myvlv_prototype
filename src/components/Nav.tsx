'use client';

import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import { EASE_EXPO } from '@/lib/animation/variants';
import { NAV_ITEMS, useView } from '@/lib/view/ViewContext';

import styles from './Nav.module.css';
import { OverlayMenu } from './OverlayMenu';

export function Nav() {
  const { navigate } = useView();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll while the overlay is open so the page behind can't drift.
  useEffect(() => {
    if (!open) return;
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [open]);

  const navClass = scrolled || open ? `${styles.nav} ${styles.scrolled}` : styles.nav;
  // When the menu is open, keep the header transparent so the brand panel
  // shows through cleanly underneath it (no opaque scrolled bar).
  const headerClass = open ? `${navClass} ${styles.open}` : navClass;

  const select = (key: Parameters<typeof navigate>[0]) => {
    navigate(key);
    setOpen(false);
  };

  return (
    <>
      <nav className={headerClass} aria-label="Main">
        <button
          type="button"
          className={styles.logo}
          aria-label="VivaLaVida home"
          onClick={() => select('home')}
        >
          <Image
            src="/logo.png"
            alt="VivaLaVida logo"
            width={32}
            height={32}
            className={styles.logoImage}
          />
          <span className={styles.wordmark}>
            Viva<span className={styles.logoAccent}>La</span>Vida
          </span>
        </button>

        <button
          type="button"
          className={styles.toggle}
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="site-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          data-cursor-label="MENU"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={open ? 'close' : 'menu'}
              className={styles.toggleLabel}
              initial={{ y: '115%' }}
              animate={{ y: '0%' }}
              exit={{ y: '-115%' }}
              transition={{ duration: 0.35, ease: EASE_EXPO }}
            >
              {open ? 'CLOSE' : 'MENU'}
            </motion.span>
          </AnimatePresence>
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <OverlayMenu
            open
            items={NAV_ITEMS}
            onSelect={select}
            onClose={() => setOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
