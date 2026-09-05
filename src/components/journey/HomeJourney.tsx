import { Hero } from '@/components/sections/Hero';
import { Ecosystem } from '@/components/sections/Ecosystem';
import { Blog } from '@/components/sections/Blog';

import { BrandPortals } from '@/components/sections/BrandPortals';
import { SelectedImpact } from '@/components/sections/SelectedImpact';
import { Footprint } from '@/components/sections/Footprint';
import { GroupCTA } from '@/components/sections/GroupCTA';
import { SiteFooter } from '@/components/sections/SiteFooter';

import styles from './homeJourney.module.css';

/**
 * The VLV homepage as a single scrolling journey.
 *
 * Movements (matching the group brief):
 *   01 Loading / VLV ident         -> handled by <IntroExperience> in page.tsx
 *   02 Hero                        -> Hero section (anchor: #hero)
 *   03 Parent thesis               -> Ecosystem: thesis (+ #ecosystem)
 *   04 Interactive ecosystem       -> Ecosystem: nodes
 *   05 How the system works        -> Ecosystem: Strategy -> … -> Influence
 *   06 Three brand portals         -> BrandPortals (#companies)
 *   07 Selected impact / proof     -> SelectedImpact (#impact)
 *   08 VLV Thinking                -> Blog (#blog)
 *   09 Footprint / partnerships    -> Footprint (#footprint)
 *   10 Group CTA                   -> GroupCTA (#start)
 *   11 Strong institutional footer -> SiteFooter
 *
 * Each section reveals on scroll (whileInView), so the page behaves as a
 * genuine long-form journey rather than the previous one-viewport-at-a-time
 * switcher.
 */
export function HomeJourney() {
  return (
    <main id="main" className={styles.journey}>
      <Hero />
      <Ecosystem />
      <BrandPortals />
      <SelectedImpact />
      <Blog />
      <Footprint />
      <GroupCTA />
      <SiteFooter />
    </main>
  );
}