export interface NavRoute {
  id: string;
  label: string;
  href: string;
}

export interface CompanyRoute {
  name: string;
  href: string;
  label: string;
}

/**
 * Primary institutional menu — the "potential full menu" the user briefed:
 * About, Our Companies, Work, Thinking, Partner, Careers, Contact.
 * These are real, crawlable routes (see src/app/<route>/page.tsx) and are the
 * links used in the site footer.
 */
export const PRIMARY_NAV: NavRoute[] = [
  { id: 'about', label: 'About', href: '/about' },
  { id: 'companies', label: 'Our Companies', href: '/companies' },
  { id: 'work', label: 'Work', href: '/work' },
  { id: 'thinking', label: 'Thinking', href: '/thinking' },
  { id: 'partner', label: 'Partner', href: '/partner' },
  { id: 'careers', label: 'Careers', href: '/careers' },
  { id: 'contact', label: 'Contact', href: '/contact' },
];

/**
 * Overlay-menu links that jump to the corresponding movement on the scrolling
 * homepage (in-page anchors), so MENU navigates the journey directly rather
 * than leaving the page.
 */
export const SCROLL_NAV: NavRoute[] = [
  { id: 'ecosystem', label: 'Ecosystem', href: '#ecosystem' },
  { id: 'companies', label: 'Companies', href: '#companies' },
  { id: 'impact', label: 'Impact', href: '#impact' },
  { id: 'thinking', label: 'Thinking', href: '#blog' },
  { id: 'footprint', label: 'Partners', href: '#footprint' },
  { id: 'start', label: 'Start', href: '#start' },
];

/** The three subsidiary brand gateways, surfaced in the menu footer. */
export const COMPANY_ROUTES: CompanyRoute[] = [
  { name: 'Ambidexters', href: '/companies/ambidexters', label: 'Build' },
  { name: 'SkillHubs', href: '/companies/skillhubs', label: 'Learn' },
  { name: 'ImpactCity', href: '/companies/impactcity', label: 'Grow' },
];