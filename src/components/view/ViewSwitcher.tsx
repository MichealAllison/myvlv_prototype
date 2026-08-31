'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

import { EASE_SMOOTH } from '@/lib/animation/variants';
import { useView, type ViewKey } from '@/lib/view/ViewContext';

import { About } from '@/components/sections/About';
import { Blog } from '@/components/sections/Blog';
import { Contact } from '@/components/sections/Contact';
import { Ecosystem } from '@/components/sections/Ecosystem';
import { Hero } from '@/components/sections/Hero';
import { Marquee } from '@/components/sections/Marquee';
import { Services } from '@/components/sections/Services';
import { Testimonials } from '@/components/sections/Testimonials';
import { WhyChooseUs } from '@/components/sections/WhyChooseUs';
import { NewsletterBand } from '@/components/newsletter/NewsletterBand';
import { ContactBar } from '@/components/ContactBar';

import styles from './ViewSwitcher.module.css';

/**
 * One full-viewport frame. Scrolls internally only if its own content is taller
 * than the viewport — the page itself never scrolls between views.
 */
function Frame({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.section
      className={className ? `${styles.view} ${className}` : styles.view}
      id={id}
      initial={{ opacity: 0, y: reduced ? 0 : 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: reduced ? 0 : -26 }}
      transition={{ duration: 0.7, ease: EASE_SMOOTH }}
    >
      {children}
    </motion.section>
  );
}

/** Maps each view key to the sections that make up that view. */
function ViewContent({ view }: { view: ViewKey }) {
  switch (view) {
    case 'about':
      return (
        <>
          <Marquee />
          <About />
          <WhyChooseUs />
        </>
      );
    case 'ecosystem':
      return (
        <>
          <Ecosystem />
          <Testimonials />
        </>
      );
    case 'services':
      return <Services />;
    case 'blog':
      return (
        <>
          <Blog />
          <NewsletterBand />
        </>
      );
    case 'contact':
      return (
        <div className={styles.contactLayout}>
          <div className={styles.contactScroll}>
            <Contact />
          </div>
          <ContactBar />
        </div>
      );
    default:
      return <Hero />;
  }
}

/**
 * View switcher — renders exactly one view in the viewport at a time. The
 * overlay menu route between these frames; transitions run via AnimatePresence.
 */
export function ViewSwitcher() {
  const { view } = useView();

  return (
    <main id="main" className={styles.stage}>
      <AnimatePresence mode="wait" initial={false}>
        <Frame
          key={view}
          id={`view-${view}`}
          className={view === 'contact' ? styles.contactFrame : undefined}
        >
          <ViewContent view={view} />
        </Frame>
      </AnimatePresence>
    </main>
  );
}