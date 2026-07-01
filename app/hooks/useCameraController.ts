'use client';

import { useState, useCallback, useRef, useEffect, useLayoutEffect } from 'react';
import { useMotionValue, useSpring, type MotionValue } from 'framer-motion';
import type { PageId, CameraDirection, GhostPage } from '../types/content';
import type { TransitionConfig } from '../types/transitions';
import { getPageSlot, PAGE_SLOTS } from '../data/pages';

const SPRING_CONFIG = { stiffness: 100, damping: 20, mass: 0.5 };

function hashToPageId(hash: string): PageId | null {
  const cleaned = hash.replace('#', '');
  const slot = PAGE_SLOTS.find(
    (s) => s.id === cleaned || (s.id === 'contact' && cleaned === '')
  );
  return slot?.id ?? null;
}

function pageIdToHash(pageId: PageId): string {
  const slot = getPageSlot(pageId);
  return slot.id === 'contact' ? '' : `#${slot.id}`;
}

function getTransitionConfig(from: PageId, to: PageId): TransitionConfig {
  const fromSlot = getPageSlot(from);
  const toSlot = getPageSlot(to);
  const distance = Math.abs(toSlot.yIndex - fromSlot.yIndex);
  const direction: CameraDirection =
    toSlot.yIndex > fromSlot.yIndex ? 'down' : 'up';

  const useGhosts = distance >= 2;
  const ghostPages: GhostPage[] = [];

  if (useGhosts) {
    const step = direction === 'down' ? 1 : -1;
    const start = fromSlot.yIndex + step;
    const end = toSlot.yIndex;
    for (let y = start; y !== end; y += step) {
      const slot = PAGE_SLOTS.find((s) => s.yIndex === y);
      if (slot) {
        ghostPages.push({
          pageId: slot.id,
          yIndex: slot.yIndex,
          label: slot.label,
        });
      }
    }
  }

  return { from, to, distance, direction, useGhosts, ghostPages, duration: distance >= 2 ? 0.9 : 0.6 };
}

export interface CameraControllerReturn {
  cameraY: MotionValue<number>;
  cameraYSpring: MotionValue<number>;
  currentPage: PageId;
  isTransitioning: boolean;
  direction: CameraDirection;
  ghostPages: GhostPage[];
  navigateTo: (pageId: PageId) => void;
}

export function useCameraController(
  isAtScrollBoundary: (pageId: string, direction: 'up' | 'down') => boolean,
  scrollToTop: (pageId: string) => void
): CameraControllerReturn {
  const initialPage = hashToPageId(
''
  ) ?? 'contact';

  const [currentPage, setCurrentPage] = useState<PageId>(initialPage);
  const currentPageRef = useRef<PageId>(initialPage);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState<CameraDirection>('none');
  const [ghostPages, setGhostPages] = useState<GhostPage[]>([]);

  const initialY =
    -getPageSlot(initialPage).yIndex *
    (typeof window !== 'undefined' ? window.innerHeight : 0);
  const cameraY = useMotionValue(initialY);
  const cameraYSpring = useSpring(cameraY, SPRING_CONFIG);
  const isNavigating = useRef(false);

  // On mount, jump to the correct page from the URL hash (before paint, no animation)
  useLayoutEffect(() => {
    const hash = window.location.hash;
    const target = hashToPageId(hash) ?? 'contact';
    if (target === 'contact') return;

    const targetY = -getPageSlot(target).yIndex * window.innerHeight;
    cameraY.set(targetY);
    cameraYSpring.set(targetY);
    setCurrentPage(target);
    currentPageRef.current = target;
  }, []);

  const navigateTo = useCallback(
    (target: PageId) => {
      const current = currentPageRef.current;
      if (isNavigating.current || target === current) return;

      const config = getTransitionConfig(current, target);
      const targetSlot = getPageSlot(target);
      const targetY = -targetSlot.yIndex * window.innerHeight;

      isNavigating.current = true;
      currentPageRef.current = target;
      setDirection(config.direction);

      if (config.useGhosts) {
        setGhostPages(config.ghostPages);
      }

      setIsTransitioning(true);
      setCurrentPage(target);
      scrollToTop(target);
      cameraY.set(targetY);

      if (typeof window !== 'undefined') {
        const hash = pageIdToHash(target);
        history.replaceState(null, '', hash || window.location.pathname);
      }

      const duration = config.duration * 1000 + 200;
      setTimeout(() => {
        setIsTransitioning(false);
        setDirection('none');
        setGhostPages([]);
        isNavigating.current = false;
      }, duration);
    },
    [cameraY]
  );

  useEffect(() => {
    currentPageRef.current = currentPage;
  }, [currentPage]);

  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash;
      const target = hashToPageId(hash) ?? 'contact';
      if (target === currentPageRef.current) return;
      navigateTo(target);
    };

    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, [navigateTo]);

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (isNavigating.current) return;

      const current = currentPageRef.current;
      const currentSlot = getPageSlot(current);

      if (e.deltaY > 0 && currentSlot.yIndex < PAGE_SLOTS.length - 1) {
        if (isAtScrollBoundary(current, 'down')) {
          const nextSlot = PAGE_SLOTS[currentSlot.yIndex + 1];
          navigateTo(nextSlot.id);
        }
      } else if (e.deltaY < 0 && currentSlot.yIndex > 0) {
        if (isAtScrollBoundary(current, 'up')) {
          const prevSlot = PAGE_SLOTS[currentSlot.yIndex - 1];
          navigateTo(prevSlot.id);
        }
      }
    };

    window.addEventListener('wheel', onWheel, { passive: true });
    return () => window.removeEventListener('wheel', onWheel);
  }, [navigateTo, isAtScrollBoundary]);

  return {
    cameraY,
    cameraYSpring,
    currentPage,
    isTransitioning,
    direction,
    ghostPages,
    navigateTo,
  };
}