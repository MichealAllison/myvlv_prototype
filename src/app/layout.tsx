import type { Metadata } from 'next';
import { Fraunces, IBM_Plex_Mono, Inter } from 'next/font/google';

import { MotionProvider } from '@/lib/animation/MotionProvider';
import { Preloader } from '@/components/ui/Preloader';
import { Cursor } from '@/components/Cursor';

import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-body-loaded',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-display-loaded',
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono-loaded',
});

export const metadata: Metadata = {
  title: 'VivaLaVida — Building ideas, impact, and people',
  description:
    'VLV bridges innovation, knowledge, and impact — connecting Ambidexters, SkillHubs Global, and Impact City into one ecosystem.',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${fraunces.variable} ${plexMono.variable}`}
      >
        <MotionProvider>
          <Preloader />
          {children}
          <Cursor />
        </MotionProvider>
      </body>
    </html>
  );
}
