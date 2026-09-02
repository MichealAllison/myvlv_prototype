import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Selected Work | VivaLaVida',
  description:
    'Selected impact across Ambidexters, SkillHubs and ImpactCity showing how the VLV ecosystem delivers measurable results.',
};

const work = [
  {
    company: 'Ambidexters',
    label: 'AI Platform',
    title: 'A digital operating layer for a faster-moving team.',
    outcome: 'Reduced reporting friction and improved strategic visibility.',
  },
  {
    company: 'SkillHubs',
    label: 'Executive Programme',
    title: 'Leadership capability built into the rhythm of the work.',
    outcome: 'Raised confidence, capability and retention in a fast-scaling organisation.',
  },
  {
    company: 'ImpactCity',
    label: 'Community',
    title: 'An ecosystem that turns interest into visible momentum.',
    outcome: 'Stronger engagement and clearer pathways from participation to growth.',
  },
];

export default function WorkPage() {
  return (
    <main style={{ maxWidth: 1180, margin: '0 auto', padding: '120px 24px 80px' }}>
      <div style={{ display: 'grid', gap: 18, marginBottom: 40 }}>
        <p style={{ textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--color-muted)', fontSize: 12 }}>
          Selected work
        </p>
        <h1 style={{ fontSize: 'clamp(2.6rem, 5vw, 5rem)', lineHeight: 1.04, letterSpacing: '-0.05em' }}>
          Proof that the ecosystem works in practice.
        </h1>
      </div>

      <div style={{ display: 'grid', gap: 22, gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
        {work.map((item) => (
          <article
            key={item.company}
            style={{
              border: '1px solid var(--line)',
              borderRadius: 24,
              background: 'rgba(255,255,255,0.02)',
              padding: 22,
            }}
          >
            <p style={{ color: 'var(--color-muted)', fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
              {item.company}
            </p>
            <p style={{ marginTop: 12, color: 'var(--color-muted)', fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
              {item.label}
            </p>
            <h2 style={{ marginTop: 18, fontSize: 'clamp(1.6rem, 2.3vw, 2.3rem)', lineHeight: 1.1 }}>{item.title}</h2>
            <p style={{ marginTop: 16, lineHeight: 1.7 }}>{item.outcome}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
