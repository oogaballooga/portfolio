'use client';

import { CSSProperties, ReactNode, useState, useEffect } from 'react';
import FloatingCard from './FloatingCard';
import styles from './FlippableCard.module.css';

interface FloatingClickCardProps {
  id: number;
  restTop: string;
  restLeft: string;
  width?: number; // Changed to number for easier math, or handle strings carefully
  height?: number;
  activeWidth?: number;
  activeHeight?: number;
  floatSpeed?: number;
  flipSpeed?: number;
  inactiveContent: ReactNode;
  activeContent: ReactNode;
  isActive: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
  style?: CSSProperties;
  disabled?: boolean;
}

export default function FloatingClickCard({
  restTop,
  restLeft,
  width = 320,
  height = 420,
  activeWidth = 600, // Explicitly default these for calculations
  activeHeight = 800,
  floatSpeed = 20,
  flipSpeed = 0.5,
  inactiveContent,
  activeContent,
  isActive,
  onActivate,
  onDeactivate,
  style,
  disabled = false,
}: FloatingClickCardProps) {
  const [flipped, setFlipped] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (isActive) {
      const id = requestAnimationFrame(() => setFlipped(true));
      return () => cancelAnimationFrame(id);
    } else {
      setFlipped(false);
    }
  }, [isActive]);

  const frontBg = isActive ? '#181818' : hovered ? '#101010' : 'black';
  const backBg = '#181818';

  return (
    <FloatingCard
      style={{
        position: 'fixed',
        top: isActive ? '50%' : restTop,
        left: isActive ? '50%' : restLeft,
        transform: 'translate(-50%, -50%)',
        transition: 'top 0.4s ease, left 0.4s ease',
        pointerEvents: disabled ? 'none' : 'auto',
        ...style,
      }}
      width={width}
      height={height}
      activeWidth={activeWidth}
      activeHeight={activeHeight}
      floatSpeed={floatSpeed}
      isActive={isActive}
      hoverHighlight={false}
      onActivate={onActivate}
      onDeactivate={onDeactivate}
    >
      <div
        className={`${styles.flipCard} ${flipped ? styles.flipped : ''}`}
        style={{ '--flip-speed': `${flipSpeed}s` } as CSSProperties}
      >
        {/* Front face — Fixed to Inactive Dimensions */}
        <div className={styles.face}>
          <div
            className="border-4 border-gray-500/50 rounded-2xl flex flex-col text-white relative overflow-hidden"
            style={{
              backgroundColor: frontBg,
              cursor: isActive ? 'default' : 'pointer',
              transition: 'background-color 0.4s ease',
              pointerEvents: 'auto',
              // LOCK THE SIZE HERE:
              width: `${width}px`,
              height: `${height}px`,
            }}
            onMouseEnter={() => !isActive && setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            {inactiveContent}
          </div>
        </div>

        {/* Back face — Fixed to Active Dimensions */}
        <div className={`${styles.face} ${styles.back}`}>
          <div
            className="border-4 border-gray-500/50 rounded-2xl flex flex-col text-white relative overflow-hidden"
            style={{ 
              backgroundColor: backBg, 
              pointerEvents: 'auto',
              // LOCK THE SIZE HERE:
              width: `${activeWidth}px`,
              height: `${activeHeight}px`,
            }}
          >
            {activeContent}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDeactivate();
              }}
              style={{
                position: 'absolute',
                top: 10,
                right: 10,
                zIndex: 10, // Ensure it stays on top
                background: 'black',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: 28,
                height: 28,
                cursor: 'pointer',
              }}
            >
              ✕
            </button>
          </div>
        </div>
      </div>
    </FloatingCard>
  );
}