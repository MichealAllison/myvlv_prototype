import type { ReactNode } from 'react';

import styles from './Eyebrow.module.css';

interface EyebrowProps {
  children: ReactNode;
}

/** Mono uppercase label with accent tick — shared section marker. */
export function Eyebrow({ children }: EyebrowProps) {
  return <p className={styles.eyebrow}>{children}</p>;
}
