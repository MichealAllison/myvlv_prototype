'use client';

import Link from 'next/link';

import styles from './Button.module.css';

type ButtonVariant = 'primary' | 'ghost';

interface ButtonLinkProps {
  href: string;
  variant?: ButtonVariant;
  children: React.ReactNode;
  external?: boolean;
}

/** Shared CTA link. Primary = filled accent, Ghost = bordered. */
export function ButtonLink({
  href,
  variant = 'primary',
  children,
  external,
}: ButtonLinkProps) {
  const cls =
    variant === 'primary' ? styles.btnPrimary : styles.btnGhost;

  if (external) {
    return (
      <a href={href} className={cls}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

interface ButtonSubmitProps {
  children: React.ReactNode;
}

/** Accent submit button for forms (newsletter/contact). */
export function ButtonSubmit({ children }: ButtonSubmitProps) {
  return (
    <button type="submit" className={styles.btnPrimary}>
      {children}
    </button>
  );
}
