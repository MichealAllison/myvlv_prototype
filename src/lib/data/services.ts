export interface Service {
  initials: string;
  title: string;
  description: string;
}

export const services: Service[] = [
  {
    initials: 'Tc',
    title: 'Technology & Product',
    description:
      'Custom software, web & mobile products, and digital infrastructure built by Ambidexters.',
  },
  {
    initials: 'Tr',
    title: 'Training & Consulting',
    description:
      'Corporate learning, upskilling programs, and organizational consulting via SkillHubs Global.',
  },
  {
    initials: 'Gr',
    title: 'Personal Growth',
    description:
      'Community, coaching, and development spaces for individuals through Impact City.',
  },
  {
    initials: 'Cn',
    title: 'Strategic Consulting',
    description:
      'Cross-division advisory for organizations navigating tech, talent, and culture change.',
  },
  {
    initials: 'Pt',
    title: 'Partnerships',
    description:
      'Collaborations with organizations who share our approach to sustainable impact.',
  },
  {
    initials: 'Cm',
    title: 'Community Access',
    description:
      'A network of innovators, learners, and leaders you can plug straight into.',
  },
];
