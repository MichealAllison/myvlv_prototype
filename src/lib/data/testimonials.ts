export interface Testimonial {
  quote: string;
  author: string;
  avatar?: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      'Working with Ambidexters felt less like hiring a vendor and more like adding a technical co-founder to the team.',
    author: '— Partner, Fintech Startup',
    avatar: 'https://randomuser.me/api/portraits/men/54.jpg',
  },
  {
    quote:
      'SkillHubs redesigned how our managers think about feedback. The change showed up in retention within a quarter.',
    author: '— HR Director, Logistics Co.',
    avatar: 'https://randomuser.me/api/portraits/women/50.jpg',
  },
  {
    quote:
      "Impact City gave our team a space to grow that wasn't just another corporate wellness checkbox.",
    author: '— Operations Lead, NGO',
    avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
  },
];
