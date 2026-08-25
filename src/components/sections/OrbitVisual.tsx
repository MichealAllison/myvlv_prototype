import styles from './OrbitVisual.module.css';

const NODES = [
  { id: 'AMB', name: 'Ambidexters', r: 34, orbit: 200, startAngle: -90 },
  { id: 'SKH', name: 'SkillHubs Global', r: 30, orbit: 140, startAngle: 50 },
  { id: 'IMC', name: 'Impact City', r: 30, orbit: 200, startAngle: 160 },
];

/**
 * Hero "ecosystem moment" — three divisions orbiting the VLV core.
 * Decorative SVG; accessible names live in the visually-hidden list.
 */
export function OrbitVisual() {
  return (
    <div
      className={styles.wrap}
      role="img"
      aria-label="Diagram: Ambidexters, SkillHubs Global and Impact City orbiting the VivaLaVida core"
    >
      <svg className={styles.svg} viewBox="0 0 460 460" aria-hidden="true">
        <circle className={styles.ring} cx="230" cy="230" r="200" />
        <circle className={styles.ring} cx="230" cy="230" r="140" />
        <circle cx="230" cy="230" r="2" fill="var(--color-accent)" />
        <text x="230" y="225" textAnchor="middle" className={styles.coreLabel}>
          VLV
        </text>
        <text
          x="230"
          y="243"
          textAnchor="middle"
          className={`${styles.coreLabel} ${styles.coreDim}`}
        >
          CORE
        </text>

        {NODES.map((node, i) => {
          const rev = i % 2 === 1;
          return (
            <g key={node.id} className={rev ? styles.spinSlowRev : styles.spinSlow}>
              <g
                transform={`rotate(${node.startAngle} 230 230) translate(230 ${
                  230 - node.orbit
                })`}
              >
                <circle className={styles.dot} r={node.r} cx="0" cy="0" />
                <text textAnchor="middle" y="4" className={styles.nodeLabel}>
                  {node.id}
                </text>
              </g>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
