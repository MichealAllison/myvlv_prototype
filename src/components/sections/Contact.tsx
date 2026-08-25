'use client';

import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';

import styles from './Contact.module.css';
import { ContactForm } from './ContactForm';

export function Contact() {
  return (
    <section id="contact" className={styles.section} aria-labelledby="contact-heading">
      <div className={styles.inner}>
        <Reveal>
          <Eyebrow>Contact Us</Eyebrow>
          <h2 id="contact-heading" className={styles.heading}>
            Let's start the conversation.
          </h2>
          <p className={styles.lede}>
            Have a question, partnership idea, or project in mind? Reach out
            and we'll get back to you.
          </p>
        </Reveal>
        <ContactForm />
      </div>
    </section>
  );
}
