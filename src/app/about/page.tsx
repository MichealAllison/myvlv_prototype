import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About VLV | VivaLaVida',
  description:
    'VivaLaVida is the strategic parent company connecting Ambidexters, SkillHubs and ImpactCity through strategy, innovation and growth.',
};

const pillars = [
  'Strategy that connects the system',
  'Capacity that turns ideas into action',
  'Movement that scales with purpose',
];

export default function AboutPage() {
  return (
    <main style={{ maxWidth: 1180, margin: '0 auto', padding: '120px 24px 80px' }}>
      <div style={{ display: 'grid', gap: 20, marginBottom: 48 }}>
        <p style={{ textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--color-muted)', fontSize: 12 }}>
          About VivaLaVida
        </p>
        <h1 style={{ fontSize: 'clamp(2.8rem, 5vw, 5rem)', lineHeight: 1.04, letterSpacing: '-0.05em' }}>
          We build the systems, capabilities and human potential that move organisations forward.
        </h1>
      </div>

      <div style={{ display: 'grid', gap: 24, gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
        <article style={{ border: '1px solid var(--line)', borderRadius: 24, padding: 24, background: 'rgba(255,255,255,0.02)' }}>
          <p style={{ textTransform: 'uppercase', letterSpacing: '0.18em', fontSize: 12, color: 'var(--color-muted)' }}>The parent layer</p>
          <p style={{ marginTop: 16, lineHeight: 1.8 }}>
            VivaLaVida is the operating system that links the strategy, ventures, partnerships and integration work
            across Ambidexters, SkillHubs and ImpactCity. The system exists to make the whole more valuable than the parts.
          </p>
        </article>

        <article style={{ border: '1px solid var(--line)', borderRadius: 24, padding: 24, background: 'rgba(255,255,255,0.02)' }}>
          <p style={{ textTransform: 'uppercase', letterSpacing: '0.18em', fontSize: 12, color: 'var(--color-muted)' }}>Our model</p>
          <p style={{ marginTop: 16, lineHeight: 1.8 }}>
            We connect technology, learning and human potential in one integrated model so organisations can move from
            challenge to capability to sustained momentum.
          </p>
        </article>
      </div>

      <div style={{ marginTop: 48, display: 'grid', gap: 18 }}>
        <p style={{ textTransform: 'uppercase', letterSpacing: '0.18em', fontSize: 12, color: 'var(--color-muted)' }}>Core principles</p>
        <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
          {pillars.map((pillar) => (
            <div key={pillar} style={{ border: '1px solid var(--line)', borderRadius: 18, padding: 18, background: 'rgba(255,255,255,0.01)' }}>
              {pillar}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
