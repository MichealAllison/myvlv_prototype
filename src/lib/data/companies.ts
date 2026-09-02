export type CompanySlug = 'ambidexters' | 'skillhubs' | 'impactcity';

export interface CompanyConfig {
  slug: CompanySlug;
  name: string;
  shortName: string;
  eyebrow: string;
  proposition: string;
  description: string;
  focus: string[];
  motion: string;
  accent: string;
  accentSoft: string;
  cta: string;
  url: string;
}

export const companies: CompanyConfig[] = [
  {
    slug: 'ambidexters',
    name: 'Ambidexters',
    shortName: 'Ambidexters',
    eyebrow: 'Technology & Intelligence',
    proposition: 'Building intelligent systems for organisations that want to move differently.',
    description:
      'Ambidexters creates the digital products, AI systems and transformation platforms that help organisations build faster, think sharper and act with more clarity.',
    focus: ['AI & automation', 'Product strategy', 'Digital transformation', 'Platform design'],
    motion: 'Precise, computational, data-led movement',
    accent: '#e302e3',
    accentSoft: 'rgba(227, 2, 227, 0.18)',
    cta: 'Visit Ambidexters',
    url: '/companies/ambidexters',
  },
  {
    slug: 'skillhubs',
    name: 'SkillHubs',
    shortName: 'SkillHubs',
    eyebrow: 'Learning & Capability',
    proposition: 'Building capability for a world that refuses to stand still.',
    description:
      'SkillHubs develops people and organisations through executive learning, professional education, workplace capability programmes and practical growth experiences.',
    focus: ['Corporate learning', 'Executive education', 'Capability programmes', 'Workforce development'],
    motion: 'Structured, energetic, knowledge-oriented motion',
    accent: '#07c5bc',
    accentSoft: 'rgba(7, 197, 188, 0.18)',
    cta: 'Visit SkillHubs',
    url: '/companies/skillhubs',
  },
  {
    slug: 'impactcity',
    name: 'ImpactCity',
    shortName: 'ImpactCity',
    eyebrow: 'People & Influence',
    proposition: 'Helping people build the confidence, capability and visibility to move forward.',
    description:
      'ImpactCity brings people together through community, professional growth, visibility-building programmes and experiences designed to help individuals influence and lead.',
    focus: ['Communities', 'Professional growth', 'Influence', 'Personal development'],
    motion: 'Human, expressive, social and photographic motion',
    accent: '#f2a95c',
    accentSoft: 'rgba(242, 169, 92, 0.18)',
    cta: 'Visit ImpactCity',
    url: '/companies/impactcity',
  },
];

export function getCompanyBySlug(slug: string) {
  return companies.find((company) => company.slug === slug);
}
