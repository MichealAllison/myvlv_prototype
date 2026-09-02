export interface Division {
  index: string;
  tag: string;
  name: string;
  description: string;
  url: string;
  urlLabel: string;
}

export const divisions: Division[] = [
  {
    index: '01',
    tag: 'AMBIDEXTERS',
    name: 'Ambidexters',
    description:
      'Technology & Intelligence — AI, digital products, platforms, transformation and business systems.',
    url: 'https://ambidexters.com',
    urlLabel: 'ambidexters.com',
  },
  {
    index: '02',
    tag: 'SKILLHUBS',
    name: 'SkillHubs',
    description:
      'Learning & Capability — professional education, executive development, corporate training and workforce capability.',
    url: 'https://theskillhubs.com',
    urlLabel: 'theskillhubs.com',
  },
  {
    index: '03',
    tag: 'IMPACTCITY',
    name: 'ImpactCity',
    description:
      'People & Influence — personal development, professional growth, communities, visibility and influence.',
    url: 'https://impact-city.com',
    urlLabel: 'impact-city.com',
  },
];