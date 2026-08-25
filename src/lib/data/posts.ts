export type BlogDivision = 'AMBIDEXTERS' | 'SKILLHUBS' | 'IMPACT CITY';

export interface Post {
  slug: string;
  division: BlogDivision;
  category: string;
  title: string;
  excerpt: string;
  date: string;
}

/**
 * Static post metadata for launch. When a CMS arrives, swap this
 * export for `async function getPosts(): Promise<Post[]>` — the
 * Blog section already treats it as async-shaped data.
 */
export const posts: Post[] = [
  {
    slug: 'why-we-build-in-public-at-ambidexters',
    division: 'AMBIDEXTERS',
    category: 'Technology',
    title: 'Why we build in public at Ambidexters',
    excerpt:
      'A look at how transparent product cycles shape better software for clients.',
    date: 'Aug 2026',
  },
  {
    slug: 'the-upskilling-gap-most-companies-miss',
    division: 'SKILLHUBS',
    category: 'Learning',
    title: 'The upskilling gap most companies miss',
    excerpt:
      'What our corporate training data tells us about where teams actually get stuck.',
    date: 'Aug 2026',
  },
  {
    slug: 'building-community-that-outlasts-the-program',
    division: 'IMPACT CITY',
    category: 'Growth',
    title: 'Building community that outlasts the program',
    excerpt:
      'Lessons from two years of running personal growth spaces at Impact City.',
    date: 'Aug 2026',
  },
];
