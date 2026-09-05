'use client';

import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import { EASE_EXPO } from '@/lib/animation/variants';

import styles from './Nav.module.css';
import { OverlayMenu } from './OverlayMenu';

type ThemeMode = 'dark' | 'light';

/**
 * Persistent header for the scroll-journey homepage.
 * Left: brand (returns to the top of the journey). Right: light/dark toggle
 * + overlay-menu toggle. The menu routes to the institutional pages
 * (About, Companies, Work, Thinking, Partner, Careers, Contact) while the
 * homepage itself remains the long-form journey.
 */
export function Nav() {
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
  const headerClass = open ? `${navClass} ${styles.open}` : navClass;

  const toggleTheme = () => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'));
  };

  return (
    <>
      <nav className={headerClass} aria-label="Main">
        <Link
          href="/"
          className={styles.logo}
          aria-label="VivaLaVida — back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
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
        </Link>

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
        {open && <OverlayMenu open onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
