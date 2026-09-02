import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact | VivaLaVida',
  description: 'Get in touch with VivaLaVida to explore partnerships, projects, learning and growth opportunities.',
};

export default function ContactPage() {
  return (
    <main style={{ maxWidth: 1180, margin: '0 auto', padding: '120px 24px 80px' }}>
      <div style={{ display: 'grid', gap: 18, marginBottom: 36 }}>
        <p style={{ textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--color-muted)', fontSize: 12 }}>
          Contact
        </p>
        <h1 style={{ fontSize: 'clamp(2.8rem, 5vw, 5rem)', lineHeight: 1.04, letterSpacing: '-0.05em' }}>
          Let’s build the next layer of progress.
        </h1>
      </div>

      <div style={{ display: 'grid', gap: 24, gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
        <article style={{ border: '1px solid var(--line)', borderRadius: 24, padding: 24, background: 'rgba(255,255,255,0.02)' }}>
          <p style={{ textTransform: 'uppercase', letterSpacing: '0.18em', fontSize: 12, color: 'var(--color-muted)' }}>Email</p>
          <p style={{ marginTop: 12, lineHeight: 1.7 }}><a href="mailto:hello@vivalavida.com">hello@vivalavida.com</a></p>
        </article>

        <article style={{ border: '1px solid var(--line)', borderRadius: 24, padding: 24, background: 'rgba(255,255,255,0.02)' }}>
          <p style={{ textTransform: 'uppercase', letterSpacing: '0.18em', fontSize: 12, color: 'var(--color-muted)' }}>Focus</p>
          <p style={{ marginTop: 12, lineHeight: 1.7 }}>Partnerships, strategy, learning, venture design and ecosystem growth.</p>
        </article>
      </div>
    </main>
  );
}
