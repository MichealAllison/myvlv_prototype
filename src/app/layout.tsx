import type { Metadata } from 'next';

import { MotionProvider } from '@/lib/animation/MotionProvider';
import { Preloader } from '@/components/ui/Preloader';
import { Cursor } from '@/components/Cursor';

import './globals.css';

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
      <body>
        <MotionProvider>
          <Preloader />
          {children}
          <Cursor />
        </MotionProvider>
      </body>
    </html>
  );
}
