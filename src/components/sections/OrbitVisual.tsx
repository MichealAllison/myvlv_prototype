'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

import styles from './OrbitVisual.module.css';

const NODES = [
  {
    id: 'AMB',
    name: 'Ambidexters',
    size: 68,
    orbit: 200,
    startAngle: -90,
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    delay: 7.1,
  },
  {
    id: 'SKH',
    name: 'SkillHubs Global',
    size: 60,
    orbit: 140,
    startAngle: 50,
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    delay: 7.3,
  },
  {
    id: 'IMC',
    name: 'Impact City',
    size: 60,
    orbit: 200,
    startAngle: 160,
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    delay: 7.5,
  },
];

const CENTER = 230; // viewBox 460 / 2

/**
 * Hero "ecosystem moment" — the three division avatars ARE the orbiting
 * nodes. Each avatar rides its ring exactly where the SVG node used to sit:
 *   AMB → outer ring (orbit 200), starts -90°, clockwise
 *   SKH → inner ring (orbit 140), starts  50°, counter-clockwise
 *   IMC → outer ring (orbit 200), starts 160°, clockwise
 * Rotor + arm follow the SVG orbital math (rotate(startAngle) →
 * translateY(-orbit)); a counter-rotator cancels both so the face stays
 * upright while its POSITION travels the circumference.
 */
export function OrbitVisual() {
  return (
    <div
      className={styles.wrap}
      role="img"
      aria-label="Diagram: Ambidexters, SkillHubs Global and Impact City orbiting the VivaLaVida core"
    >
      <svg className={styles.svg} viewBox="0 0 460 460" aria-hidden="true">
        <circle className={styles.ring} cx={CENTER} cy={CENTER} r="200" />
        <circle className={styles.ring} cx={CENTER} cy={CENTER} r="140" />
        <circle cx={CENTER} cy={CENTER} r="2" fill="var(--color-accent)" />
        <text x={CENTER} y="225" textAnchor="middle" className={styles.coreLabel}>
          VLV
        </text>
        <text
          x={CENTER}
          y="243"
          textAnchor="middle"
          className={`${styles.coreLabel} ${styles.coreDim}`}
        >
          CORE
        </text>
      </svg>

      <div className={styles.avatarLayer} aria-hidden="true">
        {NODES.map((node, i) => {
          const rev = i % 2 === 1; // SKH counter-clockwise, AMB/IMC clockwise
          const duration = rev ? '58s' : '46s';
          const radius = `calc(min(460px, 88vw) * ${-node.orbit / 460})`;
          return (
            <div
              key={node.id}
              className={rev ? styles.rotorRev : styles.rotor}
              style={{ animationDuration: duration }}
            >
              <div
                className={styles.arm}
                style={{
                  transform: `rotate(${node.startAngle}deg) translateY(${radius})`,
                }}
              >
                <div
                  className={rev ? styles.counterCCW : styles.counterCW}
                  style={{ animationDuration: duration }}
                >
                  <div style={{ transform: `rotate(${-node.startAngle}deg)` }}>
                    <motion.div
                      className={styles.avatar}
                      style={{
                        width: node.size,
                        height: node.size,
                        left: -node.size / 2,
                        top: -node.size / 2,
                      }}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{
                        type: 'spring',
                        stiffness: 260,
                        damping: 18,
                        delay: node.delay,
                      }}
                      whileHover={{ scale: 1.12 }}
                    >
                      <Image
                        src={node.avatar}
                        alt=""
                        width={node.size * 2}
                        height={node.size * 2}
                        className={styles.photo}
                      />
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
