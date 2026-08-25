'use client';

import { useState, type FormEvent } from 'react';

import { ButtonSubmit } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';
import { subscribeEmail } from '@/components/newsletter/NewsletterForm';

import styles from './Contact.module.css';

const FIELDS = [
  { id: 'name', label: 'Full name', type: 'text', placeholder: 'Your name' },
  { id: 'email', label: 'Email', type: 'email', placeholder: 'you@email.com' },
  {
    id: 'subject',
    label: 'Subject',
    type: 'text',
    placeholder: "What's this about?",
  },
] as const;

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = String(data.get('email') ?? '');
    if (!email.includes('@')) {
      setStatus('error');
      return;
    }
    setStatus('sending');
    const result = await subscribeEmail(email);
    setStatus(result.ok ? 'done' : 'error');
  }

  return (
    <Reveal>
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        {FIELDS.map((field) => (
          <div key={field.id} className={styles.field}>
            <label htmlFor={`contact-${field.id}`}>{field.label}</label>
            <input
              id={`contact-${field.id}`}
              name={field.id}
              type={field.type}
              placeholder={field.placeholder}
              required
            />
          </div>
        ))}
        <div className={styles.field}>
          <label htmlFor="contact-message">Message</label>
          <textarea
            id="contact-message"
            name="message"
            rows={3}
            placeholder="Tell us more..."
            required
          />
        </div>
        <div className={styles.submitRow}>
          <ButtonSubmit>
            {status === 'sending' ? 'Sending…' : 'Send message →'}
          </ButtonSubmit>
          {status === 'error' && (
            <p className={styles.error} role="alert">
              Something went wrong — please check your details and retry.
            </p>
          )}
          {status === 'done' && (
            <p className={styles.done} role="status">
              Message sent — we'll get back to you shortly.
            </p>
          )}
        </div>
      </form>
    </Reveal>
  );
}
