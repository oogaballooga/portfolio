'use client';

import { useEffect, useState, useRef, ReactNode } from 'react';
import Image from 'next/image';
import { useReducedMotion } from 'framer-motion';

type ContentItem = string | { src: string; alt: string } | ReactNode;

interface FloatingFlipCardProps {
  content: ContentItem[];
  width?: number;
  height?: number;
  floatSpeed?: number;
  flipSpeed?: number;
  flipInterval?: number;
  paused?: boolean;
}

export default function FloatingFlipCard({
  content,
  width = 320,
  height = 420,
  floatSpeed = 10,
  flipSpeed = 1,
  flipInterval = 20000,
  paused = false,
}: FloatingFlipCardProps) {
  const [flipping, setFlipping] = useState(false);
  const [front, setFront] = useState(content[0]);
  const [back, setBack] = useState(content[1]);
  const currentIndexRef = useRef(0);
  const flippedRef = useRef(false);
  const contentRef = useRef(content);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    contentRef.current = content;
  }, [content]);

  useEffect(() => {
    if (paused || prefersReducedMotion) return;
    const id = setInterval(() => {
      // Swap images at the midpoint (90°) when the face is edge-on and invisible.
      // flippedRef has already been toggled, so it reflects the new visible face.
      setTimeout(() => {
        const c = contentRef.current;
        const nextIndex = (currentIndexRef.current + 1) % c.length;
        const nextNextIndex = (nextIndex + 1) % c.length;
        if (flippedRef.current) {
          // Back face is now visible — put next image there.
          setBack(c[nextIndex]);
          setFront(c[nextNextIndex]);
        } else {
          // Front face is now visible — put next image there.
          setFront(c[nextIndex]);
          setBack(c[nextNextIndex]);
        }
        currentIndexRef.current = nextIndex;
      }, flipSpeed * 500);

      // Flip to the opposite side (one rotation per tick).
      flippedRef.current = !flippedRef.current;
      setFlipping(flippedRef.current);
    }, flipInterval);

    return () => clearInterval(id);
  }, [flipInterval, flipSpeed, paused, prefersReducedMotion]);

  const renderContent = (item: ContentItem): ReactNode => {
    const isImageObject = typeof item === 'object' && item !== null && 'src' in item;
    if (!isImageObject && typeof item !== 'string') {
      return item;
    }
    const src = isImageObject ? item.src : item;
    const alt = isImageObject ? item.alt : '';
    return <Image src={src} width={576} height={768} className="flip-image" alt={alt} loading="eager" />;
  };

  return (
    <div className="flip-scene">
      <div
        className="float-wrapper"
        style={{
          animationDuration: `${floatSpeed}s`,
          animationPlayState: paused ? 'paused' : 'running',
        }}
      >
        <div style={{ width: `${width}px`, height: `${height}px` }}>
          <div 
            className={`flip-card ${flipping ? 'flipped' : ''}`}
            style={{
              '--flip-speed': `${flipSpeed}s`,
            } as React.CSSProperties}
          >
            <div className="face">
              {renderContent(front)}
            </div>
            <div className="face back">
              {renderContent(back)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}