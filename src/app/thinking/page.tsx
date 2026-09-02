import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'VLV Thinking | VivaLaVida',
  description:
    'Ideas and essays from across the VLV ecosystem on AI, learning, leadership and human potential.',
};

const essays = [
  {
    title: 'The Human Side of AI Transformation',
    excerpt: 'Designing intelligent systems that create confidence, not confusion.',
  },
  {
    title: 'Why Capability Is Becoming Infrastructure',
    excerpt: 'The organisations that win will invest in people as seriously as they invest in technology.',
  },
  {
    title: 'What Organisations Get Wrong About AI Adoption',
    excerpt: 'The real barrier is usually not the tool—it is the operating model around it.',
  },
];

export default function ThinkingPage() {
  return (
    <main style={{ maxWidth: 1180, margin: '0 auto', padding: '120px 24px 80px' }}>
      <div style={{ display: 'grid', gap: 18, marginBottom: 40 }}>
        <p style={{ textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--color-muted)', fontSize: 12 }}>
          VLV thinking
        </p>
        <h1 style={{ fontSize: 'clamp(2.8rem, 5vw, 5rem)', lineHeight: 1.04, letterSpacing: '-0.05em' }}>
          Ideas at the edge of technology, learning and human potential.
        </h1>
      </div>

      <div style={{ display: 'grid', gap: 20 }}>
        {essays.map((essay) => (
          <article
            key={essay.title}
            style={{
              border: '1px solid var(--line)',
              borderRadius: 24,
              background: 'rgba(255,255,255,0.02)',
              padding: 24,
            }}
          >
            <h2 style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2.5rem)', lineHeight: 1.1 }}>{essay.title}</h2>
            <p style={{ marginTop: 14, lineHeight: 1.7 }}>{essay.excerpt}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
