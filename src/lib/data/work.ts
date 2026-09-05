import type { CompanySlug } from './companies';

export interface ImpactCase {
  company: CompanySlug;
  companyName: string;
  /** Short work category: AI Platform / Executive Programme / Community. */
  tag: string;
  title: string;
  problem: string;
  intervention: string;
  result: string;
}

/**
 * Selected Impact — the VLV proof layer. Each case is structured as
 * client problem → intervention → tangible result → owning company,
 * so "ecosystem" reads as delivery rather than marketing language.
 */
export const impactCases: ImpactCase[] = [
  {
    company: 'ambidexters',
    companyName: 'Ambidexters',
    tag: 'AI Platform',
    title: 'A digital operating layer for a faster-moving team.',
    problem:
      'A scaling organisation was drowning in manual reporting and fragmented internal tooling.',
    intervention:
      'Ambidexters designed a single AI-assisted operating platform and rebuilt the underlying data workflow.',
    result:
      'Reporting friction dropped sharply and leadership gained real-time strategic visibility.',
  },
  {
    company: 'skillhubs',
    companyName: 'SkillHubs',
    tag: 'Executive Programme',
    title: 'Leadership capability built into the rhythm of the work.',
    problem:
      'Managers had been promoted on tenure, not on the capability the new operating model demanded.',
    intervention:
      'SkillHubs ran a capability programme knitted directly into the organisation’s operating cadence.',
    result:
      'Confidence, capability and retention all rose inside a fast-scaling organisation.',
  },
  {
    company: 'impactcity',
    companyName: 'ImpactCity',
    tag: 'Community',
    title: 'An ecosystem that turns interest into visible momentum.',
    problem:
      'A growing community had attention but no clear pathway from participation to practical growth.',
    intervention:
      'ImpactCity designed structured experiences and visibility pathways that moved members forward.',
    result:
      'Engagement strengthened and members progressed from participation into leadership.',
  },
];