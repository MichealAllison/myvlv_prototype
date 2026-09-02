import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Careers | VivaLaVida',
  description: 'Build what comes next with VivaLaVida and the companies within the VLV ecosystem.',
};

const roles = [
  'Strategy & transformation',
  'Product & AI systems',
  'Learning & capability design',
  'Community & impact operations',
];

export default function CareersPage() {
  return (
    <main style={{ maxWidth: 1180, margin: '0 auto', padding: '120px 24px 80px' }}>
      <div style={{ display: 'grid', gap: 18, marginBottom: 40 }}>
        <p style={{ textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--color-muted)', fontSize: 12 }}>
          Careers
        </p>
        <h1 style={{ fontSize: 'clamp(2.8rem, 5vw, 5rem)', lineHeight: 1.04, letterSpacing: '-0.05em' }}>
          Build what comes next.
        </h1>
      </div>

      <div style={{ display: 'grid', gap: 24, gridTemplateColumns: '1.2fr 0.8fr' }}>
        <article style={{ border: '1px solid var(--line)', borderRadius: 24, padding: 28, background: 'rgba(255,255,255,0.02)' }}>
          <p style={{ lineHeight: 1.8 }}>
            We are building teams across technology, learning, communities and strategic growth. If you care about creating
            meaningful systems for people and organisations, we would like to hear from you.
          </p>
        </article>

        <aside style={{ border: '1px solid var(--line)', borderRadius: 24, padding: 24, background: 'rgba(255,255,255,0.02)' }}>
          <p style={{ textTransform: 'uppercase', letterSpacing: '0.18em', fontSize: 12, color: 'var(--color-muted)' }}>Focus areas</p>
          <ul style={{ listStyle: 'none', display: 'grid', gap: 12, marginTop: 18 }}>
            {roles.map((role) => (
              <li key={role} style={{ borderBottom: '1px solid var(--line)', paddingBottom: 8 }}>{role}</li>
            ))}
          </ul>
        </aside>
      </div>
    </main>
  );
}
