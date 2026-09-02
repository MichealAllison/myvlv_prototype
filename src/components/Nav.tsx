'use client';

import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import { EASE_EXPO } from '@/lib/animation/variants';
import { NAV_ITEMS, useView } from '@/lib/view/ViewContext';

import styles from './Nav.module.css';
import { OverlayMenu } from './OverlayMenu';

type ThemeMode = 'dark' | 'light';

export function Nav() {
  const { navigate } = useView();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<ThemeMode>('dark');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const stored = window.localStorage.getItem('vlv-theme') as ThemeMode | null;
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    const initialTheme = stored ?? (prefersLight ? 'light' : 'dark');
    setTheme(initialTheme);
    root.setAttribute('data-theme', initialTheme);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    window.localStorage.setItem('vlv-theme', theme);
  }, [theme]);

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

  const toggleTheme = () => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'));
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

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.themeToggle}
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            <span className={styles.themeLabel}>
              {theme === 'dark' ? 'Light' : 'Dark'}
            </span>
            <span className={styles.themeIcon} aria-hidden="true">
              {theme === 'dark' ? '☀' : '☾'}
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
        </div>
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
