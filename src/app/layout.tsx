import type { Metadata } from 'next';

import { MotionProvider } from '@/lib/animation/MotionProvider';
import { Cursor } from '@/components/Cursor';

import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'VivaLaVida — Technology. Capability. People.',
    template: '%s | VivaLaVida',
  },
  description:
    'VivaLaVida builds the systems, capabilities and human potential that help organisations and people move forward through Ambidexters, SkillHubs, and ImpactCity.',
  metadataBase: new URL('https://myvlv-prototype.vercel.app'),
  openGraph: {
    title: 'VivaLaVida — Technology. Capability. People.',
    description:
      'A connected ecosystem of Ambidexters, SkillHubs and ImpactCity building technology, capability and human potential.',
    url: 'https://myvlv-prototype.vercel.app',
    siteName: 'VivaLaVida',
    type: 'website',
  },
  alternates: {
    canonical: 'https://myvlv-prototype.vercel.app',
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'VivaLaVida',
              url: 'https://myvlv-prototype.vercel.app',
              description:
                'VivaLaVida connects technology, capability and people through Ambidexters, SkillHubs and ImpactCity.',
              knowsAbout: [
                'Technology',
                'Learning',
                'Professional development',
                'AI transformation',
              ],
              subOrganization: [
                {
                  '@type': 'Organization',
                  name: 'Ambidexters',
                  url: 'https://ambidexters.com',
                },
                {
                  '@type': 'Organization',
                  name: 'SkillHubs',
                  url: 'https://theskillhubs.com',
                },
                {
                  '@type': 'Organization',
                  name: 'ImpactCity',
                  url: 'https://impact-city.com',
                },
              ],
            }),
          }}
        />
        <MotionProvider>
          {children}
          <Cursor />
        </MotionProvider>
      </body>
    </html>
  );
}
