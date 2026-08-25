'use client';

import { useState, type FormEvent } from 'react';

import { ButtonSubmit } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';

import styles from './NewsletterForm.module.css';

/**
 * Shared newsletter submit handler. Wire to ESP (Mailchimp/Resend/etc.)
 * in one place — both the inline band and the popup use it.
 */
export async function subscribeEmail(
  email: string
): Promise<{ ok: boolean }> {
  // TODO: replace with real endpoint when ESP is chosen
  await new Promise((r) => setTimeout(r, 400));
  return { ok: Boolean(email.includes('@')) };
}

interface NewsletterFormProps {
  idPrefix: string;
}

/** Email input + subscribe button with inline status messaging. */
export function NewsletterForm({ idPrefix }: NewsletterFormProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.includes('@')) {
      setStatus('error');
      return;
    }
    setStatus('sending');
    const result = await subscribeEmail(email);
    setStatus(result.ok ? 'done' : 'error');
  }

  if (status === 'done') {
    return (
      <p className={styles.done} role="status">
        You're on the list — talk soon.
      </p>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <label htmlFor={`${idPrefix}-email`} className={styles.srOnly}>
        Email address
      </label>
      <input
        id={`${idPrefix}-email`}
        type="email"
        placeholder="you@email.com"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (status === 'error') setStatus('idle');
        }}
        aria-invalid={status === 'error'}
        aria-describedby={status === 'error' ? `${idPrefix}-error` : undefined}
      />
      <ButtonSubmit>
        {status === 'sending' ? 'Joining…' : 'Subscribe →'}
      </ButtonSubmit>
      {status === 'error' && (
        <p id={`${idPrefix}-error`} className={styles.error} role="alert">
          Please enter a valid email address.
        </p>
      )}
    </form>
  );
}
