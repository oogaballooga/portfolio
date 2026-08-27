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
  const timeoutIdsRef = useRef<Set<ReturnType<typeof setTimeout>>>(new Set());
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const motionPaused = paused || prefersReducedMotion || isMobile;

  useEffect(() => {
    contentRef.current = content;
  }, [content]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');
    const updateIsMobile = () => setIsMobile(mediaQuery.matches);

    updateIsMobile();
    mediaQuery.addEventListener('change', updateIsMobile);
    return () => mediaQuery.removeEventListener('change', updateIsMobile);
  }, []);

  useEffect(() => {
    if (motionPaused) return;
    const timeoutIds = timeoutIdsRef.current;
    const id = setInterval(() => {
      // Swap images at the midpoint (90°) when the face is edge-on and invisible.
      // flippedRef has already been toggled, so it reflects the new visible face.
      const timeoutId = setTimeout(() => {
        timeoutIds.delete(timeoutId);
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
      timeoutIds.add(timeoutId);

      // Flip to the opposite side (one rotation per tick).
      flippedRef.current = !flippedRef.current;
      setFlipping(flippedRef.current);
    }, flipInterval);

    return () => {
      clearInterval(id);
      timeoutIds.forEach(clearTimeout);
      timeoutIds.clear();
    };
  }, [flipInterval, flipSpeed, motionPaused]);

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
          animationPlayState: motionPaused ? 'paused' : 'running',
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
