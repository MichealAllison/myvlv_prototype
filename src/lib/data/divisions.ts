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
    name: 'Ambidexters Inc',
    description: 'Tech-enabled solutions revolutionizing business operations.',
    url: 'https://ambidexters.com',
    urlLabel: 'ambidexters.com',
  },
  {
    index: '02',
    tag: 'SKILLHUBS',
    name: 'SkillHubs Global',
    description:
      'Corporate growth through training, development, and consulting.',
    url: 'https://theskillhubs.com',
    urlLabel: 'theskillhubs.com',
  },
  {
    index: '03',
    tag: 'IMPACT CITY',
    name: 'Impact City',
    description:
      'A safe, inspiring space for personal and professional growth.',
    url: 'https://impact-city.com',
    urlLabel: 'impact-city.com',
  },
];
