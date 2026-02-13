'use client';

import { CSSProperties, ReactNode } from 'react';
import styles from './FloatingCard.module.css';

interface FloatingCardProps {
  children: ReactNode;
  width?: number | string;
  height?: number | string;
  activeWidth?: number;
  activeHeight?: number;
  floatSpeed?: number;
  hoverHighlight?: boolean;
  isActive?: boolean;
  onActivate?: () => void;
  onDeactivate?: () => void;
  style?: CSSProperties;
}

export default function FloatingCard({
  children,
  width = 320,
  height = 420,
  activeWidth,
  activeHeight,
  floatSpeed = 15,
  hoverHighlight = false,
  isActive = false,
  onActivate,
  onDeactivate,
  style,
}: FloatingCardProps) {

  const currentWidth  = isActive ? (activeWidth  ?? width)  : width;
  const currentHeight = isActive ? (activeHeight ?? height) : height;

  return (
    <div 
      className={styles.scene}
      style={style}
    >
      <div 
        className={`${styles.floatWrapper} ${isActive ? styles.stopped : ''}`}
        style={{ animationDuration: `${floatSpeed}s` }}
      >
        <div 
          className={`${styles.card} ${hoverHighlight ? styles.hoverable : ''} ${isActive ? styles.active : ''}`}
          style={{
            width: typeof width === 'number' ? `${width}px` : width,
            height: typeof height === 'number' ? `${height}px` : height,
          }}
          onClick={(e) => {
            e.stopPropagation();
            if (!isActive) onActivate?.();
          }}
        >
          {isActive && (
            <button
              className={styles.closeButton}
              onClick={(e) => {
                e.stopPropagation();
                onDeactivate?.();
              }}
            >
              ×
            </button>
          )}
          {children}
        </div>
      </div>
    </div>
  );
}