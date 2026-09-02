import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Partner with VLV | VivaLaVida',
  description: 'Explore partnerships, ventures and strategic collaboration opportunities across the VLV ecosystem.',
};

const partnershipTypes = [
  'Strategic partnerships',
  'Innovation ventures',
  'Learning ecosystems',
  'Capability programmes',
];

export default function PartnerPage() {
  return (
    <main style={{ maxWidth: 1180, margin: '0 auto', padding: '120px 24px 80px' }}>
      <div style={{ display: 'grid', gap: 18, marginBottom: 36 }}>
        <p style={{ textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--color-muted)', fontSize: 12 }}>
          Partner with us
        </p>
        <h1 style={{ fontSize: 'clamp(2.8rem, 5vw, 5rem)', lineHeight: 1.04, letterSpacing: '-0.05em' }}>
          Solve a challenge across several areas.
        </h1>
      </div>

      <div style={{ display: 'grid', gap: 20, gridTemplateColumns: '1.2fr 0.8fr' }}>
        <article style={{ border: '1px solid var(--line)', borderRadius: 24, padding: 28, background: 'rgba(255,255,255,0.02)' }}>
          <p style={{ lineHeight: 1.8 }}>
            VivaLaVida brings together strategy, technology, learning and human potential. We help organisations move from
            challenge to capability to real traction.
          </p>
        </article>

        <aside style={{ border: '1px solid var(--line)', borderRadius: 24, padding: 24, background: 'rgba(255,255,255,0.02)' }}>
          <p style={{ textTransform: 'uppercase', letterSpacing: '0.18em', fontSize: 12, color: 'var(--color-muted)' }}>Partnership models</p>
          <ul style={{ listStyle: 'none', display: 'grid', gap: 12, marginTop: 18 }}>
            {partnershipTypes.map((item) => (
              <li key={item} style={{ borderBottom: '1px solid var(--line)', paddingBottom: 8 }}>{item}</li>
            ))}
          </ul>
        </aside>
      </div>
    </main>
  );
}
