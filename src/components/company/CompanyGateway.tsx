'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

import type { CompanyConfig } from '@/lib/data/companies';

import styles from './CompanyGateway.module.css';

interface CompanyGatewayProps {
  company: CompanyConfig;
}

export function CompanyGateway({ company }: CompanyGatewayProps) {
  return (
    <main className={styles.page} style={{ ['--accent' as string]: company.accent, ['--accent-soft' as string]: company.accentSoft }}>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.kicker}>{company.eyebrow}</div>
          <h1 className={styles.heading}>{company.name}</h1>
          <p className={styles.proposition}>{company.proposition}</p>
          <div className={styles.actions}>
            <Link href={company.url} className={styles.primary}>
              {company.cta}
            </Link>
            <Link href="/companies" className={styles.secondary}>
              All companies
            </Link>
          </div>
        </div>

        <motion.div
          className={styles.signalPanel}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <div className={styles.panelLabel}>Motion language</div>
          <div className={styles.panelBody}>{company.motion}</div>
        </motion.div>
      </section>

      <section className={styles.grid}>
        <article className={styles.card}>
          <p className={styles.cardLabel}>What it does</p>
          <p className={styles.cardText}>{company.description}</p>
        </article>

        <article className={styles.card}>
          <p className={styles.cardLabel}>Capabilities</p>
          <ul className={styles.list}>
            {company.focus.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className={styles.metaGrid}>
        <article className={styles.metaBlock}>
          <p className={styles.cardLabel}>Selected work</p>
          <h2>Client problem → intervention → result</h2>
          <p className={styles.inlineText}>A filtered view of the VLV portfolio, showing the company’s contribution in real delivery.</p>
        </article>

        <article className={styles.metaBlock}>
          <p className={styles.cardLabel}>Latest activity</p>
          <h2>Campaigns, programmes and product momentum</h2>
          <p className={styles.inlineText}>Fresh activity from the group, organised around the company’s own world and operating rhythm.</p>
        </article>
      </section>
    </main>
  );
}
