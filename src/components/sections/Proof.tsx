'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, Compass, Cpu, GraduationCap, Users } from 'lucide-react';

import { SectionHeading } from '@/components/ui/SectionHeading';
import {
  staggerChild,
  staggerContainer,
  viewportOnce,
} from '@/lib/animation/variants';

import styles from './Proof.module.css';

const metrics = [
  { value: '01', label: 'strategy layer' },
  { value: '03', label: 'operating companies' },
  { value: '360°', label: 'capability loop' },
  { value: '∞', label: 'pathways to scale' },
];

const outcomes = [
  {
    title: 'Build with purpose',
    description:
      'Strategic clarity moves from idea to delivery, reducing wasted effort and aligning product, people and partnerships.',
    icon: Compass,
  },
  {
    title: 'Learn at velocity',
    description:
      'SkillHubs turns capability-building into a repeatable engine for adoption, confidence and commercial execution.',
    icon: GraduationCap,
  },
  {
    title: 'Deploy real systems',
    description:
      'Ambidexters integrates technology, workflows and operating models so change is not theoretical but executable.',
    icon: Cpu,
  },
  {
    title: 'Scale through community',
    description:
      'ImpactCity amplifies the signal, creates trust, and expands the network effect around momentum and social value.',
    icon: Users,
  },
];

export function Proof() {
  return (
    <section id="proof" className={styles.section} aria-labelledby="proof-heading">
      <div className={styles.inner}>
        <SectionHeading
          eyebrow="Proof over positioning"
          title={
            <span id="proof-heading">
              A model designed to create traction, not just language.
            </span>
          }
          intro="The point of VivaLaVida is not to look complete. It is to turn strategy into repeatable movement across technology, people and impact."
        />

        <motion.div
          className={styles.metrics}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {metrics.map((metric) => (
            <motion.div key={metric.label} variants={staggerChild} className={styles.metric}>
              <span className={styles.metricValue}>{metric.value}</span>
              <span className={styles.metricLabel}>{metric.label}</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className={styles.grid}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {outcomes.map((item) => {
            const Icon = item.icon;
            return (
              <motion.article key={item.title} variants={staggerChild} className={styles.card}>
                <span className={styles.iconWrap} aria-hidden="true">
                  <Icon size={18} />
                </span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <span className={styles.link}>
                  See the loop <ArrowUpRight size={15} />
                </span>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
