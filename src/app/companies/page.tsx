import type { Metadata } from 'next';
import Link from 'next/link';

import { companies } from '@/lib/data/companies';

export const metadata: Metadata = {
  title: 'Our Companies | VivaLaVida',
  description:
    'The connected VLV ecosystem brings together Ambidexters, SkillHubs and ImpactCity to build technology, capability and people.',
};

export default function CompaniesPage() {
  return (
    <main style={{ maxWidth: 1180, margin: '0 auto', padding: '120px 24px 80px' }}>
      <div style={{ display: 'grid', gap: 14, marginBottom: 48 }}>
        <p style={{ textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--color-muted)', fontSize: 12 }}>
          Our companies
        </p>
        <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)', lineHeight: 1.05, letterSpacing: '-0.05em' }}>
          Three companies. One connected ecosystem.
        </h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 22 }}>
        {companies.map((company) => (
          <Link
            key={company.slug}
            href={company.url}
            style={{
              display: 'grid',
              gap: 14,
              padding: 24,
              border: '1px solid var(--line)',
              borderRadius: 24,
              background: 'rgba(255,255,255,0.02)',
              color: 'inherit',
            }}
          >
            <span style={{ fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-muted)' }}>
              {company.eyebrow}
            </span>
            <h2 style={{ fontSize: 'clamp(2rem, 3vw, 2.7rem)', lineHeight: 1.05 }}>{company.name}</h2>
            <p style={{ color: 'var(--color-fg)', lineHeight: 1.6 }}>{company.proposition}</p>
            <span style={{ marginTop: 'auto', fontWeight: 600 }}>Explore {company.name} →</span>
          </Link>
        ))}
      </div>
    </main>
  );
}
