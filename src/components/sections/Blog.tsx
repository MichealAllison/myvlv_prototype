'use client';

import { motion } from 'framer-motion';

import { SectionHeading } from '@/components/ui/SectionHeading';
import {
  staggerChild,
  staggerContainer,
  viewportOnce,
} from '@/lib/animation/variants';
import { posts } from '@/lib/data/posts';

import styles from './Blog.module.css';
import { BlogCard } from './BlogCard';

export function Blog() {
  return (
    <section id="blog" className={styles.section} aria-labelledby="blog-heading">
      <div className={styles.inner}>
        <SectionHeading
          eyebrow="From the Blog"
          title={<span id="blog-heading">Ideas, notes, and updates.</span>}
          intro="Writing from across the ecosystem — tech, learning, and growth."
        />
        <motion.div
          className={styles.grid}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {posts.map((post) => (
            <motion.div key={post.slug} variants={staggerChild}>
              <BlogCard post={post} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
