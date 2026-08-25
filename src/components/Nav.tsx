'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import styles from './Nav.module.css';
import Image from 'next/image';

const links = [
  { href: '/#about', label: 'About' },
  { href: '/#ecosystem', label: 'Ecosystem' },
  { href: '/#services', label: 'Services' },
  { href: '/#blog', label: 'Blog' },
  { href: '/#contact', label: 'Contact' },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={scrolled ? `${styles.nav} ${styles.scrolled}` : styles.nav}>
      <Link href="/" className={styles.logo} aria-label="VivaLaVida home">
        <Image src='/logo.png' alt='VivaLaVida logo' width={32} height={32} className={styles.logoImage} />
        Viva<span className={styles.logoAccent}>La</span>Vida
      </Link>
      <div className={styles.links}>
        {links.map((link) => (
          <Link key={link.href} href={link.href} className={styles.link}>
            {link.label}
          </Link>
        ))}
      </div>
      <Link href="/#contact" className={styles.cta}>
        Get in touch
      </Link>
    </nav>
  );
}
