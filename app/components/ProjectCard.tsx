'use client';

import { CSSProperties, ReactNode, useState, useEffect } from 'react';
import styles from './FlippableCard.module.css';

interface ProjectCardProps {
  id: number;
  restTop: string;
  restLeft: string;
  width?: number;
  height?: number;
  activeWidth?: number;
  activeHeight?: number;
  flipSpeed?: number;
  inactiveContent: ReactNode;
  activeContent: ReactNode;
  isActive: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
  style?: CSSProperties;
  disabled?: boolean;
}

export default function ProjectCard({
  restTop,
  restLeft,
  width = 700,
  height = 300,
  activeWidth = 1000, 
  activeHeight = 1000,
  flipSpeed = 0.5,
  inactiveContent,
  activeContent,
  isActive,
  onActivate,
  onDeactivate,
  style,
  disabled = false,
}: ProjectCardProps) {
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
    <div
      style={{
        position: 'fixed',
        top: isActive ? '50%' : restTop,
        left: isActive ? '50%' : restLeft,
        transform: 'translate(-50%, -50%)',
        transition: 'top 0.4s ease, left 0.4s ease, width 0.4s ease, height 0.4s ease',
        width: `${isActive ? activeWidth : width}px`,
        height: `${isActive ? activeHeight : height}px`,
        pointerEvents: disabled ? 'none' : 'auto',
        perspective: '1200px', // Added perspective here since we removed the FloatingCard wrapper
        ...style,
      }}
      onClick={(e) => {
        e.stopPropagation();
        if (!isActive) onActivate();
      }}
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
              className="absolute top-4 right-4 bg-black text-white border-none rounded-full w-8 h-8 cursor-pointer z-10 flex items-center justify-center hover:bg-gray-800 transition-colors"
            >
              ✕
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}