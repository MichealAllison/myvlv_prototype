'use client';

import { MotionConfig } from 'framer-motion';
import type { ReactNode } from 'react';

/**
 * Single global place where prefers-reduced-motion is honored.
 * Framer's reducedMotion="user" disables transform/layout animations
 * and reduces them to instant opacity changes for users who opt out.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
