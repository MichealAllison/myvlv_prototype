import styles from './Marquee.module.css';

const WORDS = ['Technology', 'Learning', 'Growth', 'Community'];

function Half({ hidden }: { hidden?: boolean }) {
  return (
    <div className={styles.half} aria-hidden={hidden || undefined}>
      {WORDS.map((word) => (
        <span key={word} className={styles.word}>
          {word}
          <span className={styles.dot}> · </span>
        </span>
      ))}
    </div>
  );
}

/** Infinite ticker between hero and body — pacing reset (zajno-style). */
export function Marquee() {
  return (
    <div className={styles.marquee}>
      <div className={styles.track}>
        <Half />
        <Half hidden />
      </div>
    </div>
  );
}
