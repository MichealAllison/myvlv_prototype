'use client';

import Image from 'next/image';

import type { Post } from '@/lib/data/posts';

import styles from './BlogCard.module.css';

interface BlogCardProps {
  post: Post;
}

/** Blog card with a real image thumb. */
export function BlogCard({ post }: BlogCardProps) {
  return (
    <article className={styles.card} data-cursor-label="VIEW">
      <div className={styles.media}>
        <Image
          src={post.image}
          alt=""
          width={600}
          height={480}
          className={styles.image}
        />
        <p className={`${styles.tag} ${styles[post.division.replace(' ', '')]}`}>
          {post.division}
        </p>
      </div>
      <div className={styles.body}>
        <p className={styles.category}>{post.category}</p>
        <h3 className={styles.title}>{post.title}</h3>
        <p className={styles.excerpt}>{post.excerpt}</p>
        <div className={styles.meta}>
          <span>{post.date}</span>
          {/* Placeholder — real post routes arrive with the CMS integration */}
          <span className={styles.read}>
            Read more <span aria-hidden="true">→</span>
          </span>
        </div>
      </div>
    </article>
  );
}
