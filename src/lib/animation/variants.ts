import type { Transition, Variants } from 'framer-motion';

/**
 * Shared easing vocabulary — the JS mirror of tokens.css motion vars.
 * Framer Motion needs numeric cubic-bezier arrays, so easings live here
 * and are kept in sync with --ease-* custom properties.
 */
export const EASE_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];
export const EASE_SMOOTH: [number, number, number, number] = [
  0.16, 0.84, 0.44, 1,
];

export const transitionBase: Transition = {
  duration: 0.9,
  ease: EASE_SMOOTH,
};

/** Fade + rise on scroll into view. */
export const revealVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: transitionBase },
};

/** Container that staggers its children. ~100ms offsets (zajno-style sequencing). */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_SMOOTH } },
};

/** Hero load-in — fires immediately, slightly longer settle. */
export const loadInVariant: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: EASE_SMOOTH, delay },
  }),
};

/** Standard viewport config for whileInView reveals. */
export const viewportOnce = { once: true, margin: '0px 0px -60px 0px' } as const;
