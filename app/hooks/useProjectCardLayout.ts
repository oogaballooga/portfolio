'use client';

import { useState, useRef, useCallback, useEffect, useLayoutEffect } from 'react';

export interface CardRect {
  projectId: string;
  left: number;
  top: number;
}

interface UseProjectCardLayoutReturn {
  cardRects: CardRect[];
  sectionRef: React.RefObject<HTMLDivElement | null>;
  setPlaceholderRef: (projectId: string, el: HTMLDivElement | null) => void;
}

export function useProjectCardLayout(cardIds: string[]): UseProjectCardLayoutReturn {
  const [cardRects, setCardRects] = useState<CardRect[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const placeholderRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  // Measure grid placeholder positions relative to the section container.
  // Section-relative coordinates stay stable regardless of camera movement.
  const measureRects = useCallback(() => {
    const section = sectionRef.current;
    if (!section) return;

    const sectionRect = section.getBoundingClientRect();
    const rects: CardRect[] = [];
    placeholderRefs.current.forEach((el, projectId) => {
      const r = el.getBoundingClientRect();
      rects.push({
        projectId,
        left: r.left - sectionRect.left + r.width / 2,
        top: r.top - sectionRect.top + r.height / 2,
      });
    });
    setCardRects(rects);
  }, []);

  useLayoutEffect(() => {
    measureRects();
  }, [measureRects]);

  useEffect(() => {
    const onResize = () => measureRects();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [measureRects]);

  useEffect(() => {
    const onHashChange = () => setTimeout(measureRects, 100);
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, [measureRects]);

  const setPlaceholderRef = useCallback(
    (projectId: string, el: HTMLDivElement | null) => {
      if (el) {
        placeholderRefs.current.set(projectId, el);
        requestAnimationFrame(measureRects);
      } else {
        placeholderRefs.current.delete(projectId);
      }
    },
    [measureRects]
  );

  return { cardRects, sectionRef, setPlaceholderRef };
}
