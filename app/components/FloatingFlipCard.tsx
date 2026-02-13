'use client';

import { useEffect, useState, useRef, ReactNode } from 'react';
import FloatingCard from './FloatingCard';
import styles from './FloatingFlipCard.module.css';

type ContentItem = string | ReactNode;

interface FloatingFlipCardProps {
  content: ContentItem[];
  width?: number;
  height?: number;
  floatSpeed?: number;
  flipSpeed?: number;
  flipInterval?: number;
}

export default function FloatingFlipCard({
  content,
  width = 320,
  height = 420,
  floatSpeed = 10,
  flipSpeed = 1,
  flipInterval = 5000,
}: FloatingFlipCardProps) {
  const [flipping, setFlipping] = useState(false);
  const [front, setFront] = useState(content[0]);
  const [back, setBack] = useState(content[1]);
  const currentIndexRef = useRef(0);

  useEffect(() => {
    const id = setInterval(() => {
      setFlipping(true);

      setTimeout(() => {
        setFront(back);
        currentIndexRef.current = (currentIndexRef.current + 1) % content.length;
        const nextIndex = (currentIndexRef.current + 1) % content.length;
        setBack(content[nextIndex]);
        setFlipping(false);
      }, flipSpeed * 1000);
    }, flipInterval);

    return () => clearInterval(id);
  }, [back, content, flipInterval, flipSpeed]);

  const renderContent = (item: ContentItem) => {
    if (typeof item === 'string') {
      return <img src={item} className={styles.image} alt="" />;
    }
    return item;
  };

  return (
    <FloatingCard width={width} height={height} floatSpeed={floatSpeed}>
      <div 
        className={`${styles.flipCard} ${flipping ? styles.flipped : ''}`}
        style={{
          '--flip-speed': `${flipSpeed}s`,
        } as React.CSSProperties}
      >
        <div className={styles.face}>
          {renderContent(front)}
        </div>
        <div className={`${styles.face} ${styles.back}`}>
          {renderContent(back)}
        </div>
      </div>
    </FloatingCard>
  );
}