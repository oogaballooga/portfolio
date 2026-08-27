'use client';

import { useState, useRef, useCallback, useEffect, useLayoutEffect } from 'react';

export interface CardRect {
  projectId: string;
  left: number;
  top: number;
  width: number;
}

interface UseProjectCardLayoutReturn {
  cardRects: CardRect[];
  viewport: { width: number; height: number };
  sectionRef: React.RefObject<HTMLDivElement | null>;
  setPlaceholderRef: (projectId: string, el: HTMLDivElement | null) => void;
}

export function useProjectCardLayout(cardIds: string[], isPageActive: boolean = true): UseProjectCardLayoutReturn {
  const [cardRects, setCardRects] = useState<CardRect[]>([]);
  const [viewport, setViewport] = useState({ width: 0, height: 0 });
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
        width: r.width,
      });
    });
    setCardRects(rects);
  }, []);

  useLayoutEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- DOM measurement: must read positions before paint
    measureRects();
  }, [measureRects]);

  useEffect(() => {
    if (!isPageActive) return;
    let rafId: number | null = null;
    const onResize = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        const visualViewport = window.visualViewport;
        setViewport({
          width: visualViewport?.width ?? window.innerWidth,
          height: visualViewport?.height ?? window.innerHeight,
        });
        measureRects();
      });
    };
    onResize();
    window.addEventListener('resize', onResize);
    window.visualViewport?.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      window.visualViewport?.removeEventListener('resize', onResize);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [measureRects, isPageActive]);

  useEffect(() => {
    if (!isPageActive) return;
    const onHashChange = () => setTimeout(measureRects, 100);
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, [measureRects, isPageActive]);

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

  return { cardRects, viewport, sectionRef, setPlaceholderRef };
}
