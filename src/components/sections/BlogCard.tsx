import type { Post } from '@/lib/data/posts';

import styles from './BlogCard.module.css';

interface BlogCardProps {
  post: Post;
}

/**
 * Blog card. Thumbs are typographic placeholders until real imagery
 * exists — swap the .thumb block for next/image when assets arrive.
 */
export function BlogCard({ post }: BlogCardProps) {
  return (
    <article className={styles.card}>
      <div className={`${styles.thumb} ${styles[post.division.replace(' ', '')]}`}>
        <span>{post.division}</span>
      </div>
      <div className={styles.body}>
        <p className={styles.tag}>{post.category}</p>
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
