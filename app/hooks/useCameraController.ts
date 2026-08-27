'use client';

import { useState, useCallback, useRef, useEffect, useLayoutEffect } from 'react';
import {
  useMotionValue,
  useSpring,
  useReducedMotion,
  type MotionValue,
} from 'framer-motion';
import type { PageId, CameraDirection, GhostPage } from '../types/content';
import type { TransitionConfig } from '../types/transitions';
import { getPageSlot, PAGE_SLOTS } from '../data/pages';

const SPRING_CONFIG = { stiffness: 100, damping: 20, mass: 0.5 };
const SWIPE_THRESHOLD_PX = 50;

function getPageHeight(): number {
  return window.visualViewport?.height ?? window.innerHeight;
}

function isInteractiveElement(target: EventTarget | null): boolean {
  const element = target instanceof Element ? target : null;
  return Boolean(
    element?.closest(
      'a, button, input, textarea, select, option, label, [contenteditable], [role="button"], [role="link"]'
    )
  );
}

function startsInNestedScrollContainer(target: EventTarget | null, page: HTMLElement): boolean {
  let element = target instanceof HTMLElement ? target : target instanceof Element ? target.parentElement : null;

  while (element && element !== page) {
    const { overflowY } = window.getComputedStyle(element);
    if (overflowY === 'auto' || overflowY === 'scroll' || overflowY === 'overlay') {
      return true;
    }
    element = element.parentElement;
  }

  return false;
}

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
  scrollToTop: (pageId: string) => void,
  resetPage: (pageId: PageId) => void
): CameraControllerReturn {
  const initialPage: PageId = 'contact';

  const [currentPage, setCurrentPage] = useState<PageId>(initialPage);
  const currentPageRef = useRef<PageId>(initialPage);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState<CameraDirection>('none');
  const [ghostPages, setGhostPages] = useState<GhostPage[]>([]);
  const [canRenderGhosts, setCanRenderGhosts] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(min-width: 768px)').matches
  );

  const initialY = 0;
  const cameraY = useMotionValue(initialY);
  const cameraYSpring = useSpring(cameraY, SPRING_CONFIG);
  const reduceMotion = useReducedMotion();
  const isNavigating = useRef(false);
  const navigationTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isZoomingRef = useRef(false);
  const touchRef = useRef<{
    startX: number;
    startY: number;
    pageId: PageId;
    canNavigateUp: boolean;
    canNavigateDown: boolean;
  } | null>(null);

  const restoreInitialHash = useCallback(() => {
    const hash = window.location.hash;
    const target = hashToPageId(hash) ?? 'contact';
    const targetY = -getPageSlot(target).yIndex * getPageHeight();
    cameraY.set(targetY);
    cameraYSpring.jump(targetY);
    currentPageRef.current = target;
    return target;
  }, [cameraY, cameraYSpring]);

  // Debounce window before allowing the next navigation.
  // Prevents accidental multi-page jumps from a single scroll gesture,
  // but lets the user scroll quickly between pages since Framer Motion
  // springs handle mid-flight target redirection smoothly.
  const NAVIGATION_DEBOUNCE_MS = 200;

  // Reconcile the hash and viewport before paint in case hydration used a different viewport height.
  useLayoutEffect(() => {
    restoreInitialHash();
  }, [restoreInitialHash]);

  // Framer Motion may initialize after the layout effect; restore the hash target once more next frame.
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setCurrentPage(restoreInitialHash());
    });
    return () => cancelAnimationFrame(frame);
  }, [restoreInitialHash]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    const updateGhostRendering = () => {
      setCanRenderGhosts(mediaQuery.matches);
      if (!mediaQuery.matches) setGhostPages([]);
    };

    updateGhostRendering();
    mediaQuery.addEventListener('change', updateGhostRendering);
    return () => mediaQuery.removeEventListener('change', updateGhostRendering);
  }, []);

  const navigateTo = useCallback(
    (target: PageId) => {
      const current = currentPageRef.current;
      if (isNavigating.current || target === current) return;

      const config = getTransitionConfig(current, target);
      const targetSlot = getPageSlot(target);
      const targetY = -targetSlot.yIndex * getPageHeight();

      isNavigating.current = true;
      // Reset active cards before changing currentPage. This prevents a
      // rapid leave/re-entry from applying the normal close animation after
      // the destination page has already become visible.
      resetPage(current);
      if (navigationTimeoutRef.current !== null) {
        clearTimeout(navigationTimeoutRef.current);
      }
      navigationTimeoutRef.current = setTimeout(() => {
        isNavigating.current = false;
        navigationTimeoutRef.current = null;
      }, NAVIGATION_DEBOUNCE_MS);

      currentPageRef.current = target;
      setDirection(config.direction);

      if (config.useGhosts && canRenderGhosts && !reduceMotion) {
        setGhostPages(config.ghostPages);
      }

      setIsTransitioning(true);
      setCurrentPage(target);
      scrollToTop(target);
      cameraY.set(targetY);
      if (reduceMotion) {
        cameraYSpring.jump(targetY);
      }

      if (typeof window !== 'undefined') {
        const hash = pageIdToHash(target);
        history.replaceState(null, '', hash || window.location.pathname);
      }

      // Ghost pages and transition state remain until the camera
      // spring visually settles so that fly-through placeholders
      // and UI overlays stay in sync with the animation.
      const visualDuration = config.duration * 1000 + 200;
      setTimeout(() => {
        setIsTransitioning(false);
        setDirection('none');
        setGhostPages([]);
      }, visualDuration);
    },
    [cameraY, cameraYSpring, canRenderGhosts, reduceMotion, resetPage, scrollToTop]
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

  // Track whether the user is holding Ctrl/Meta for zoom.
  // When zooming, resize events fire on every tick — we use this
  // to recalibrate the camera position so it stays centered on the
  // current page while vh units recompute during viewport changes.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Control' || e.key === 'Meta') {
        isZoomingRef.current = true;
        document.body.classList.add('ctrl-zoom-active');
      }
    };
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'Control' || e.key === 'Meta') {
        isZoomingRef.current = false;
        document.body.classList.remove('ctrl-zoom-active');
      }
    };
    const onBlur = () => {
      isZoomingRef.current = false;
      document.body.classList.remove('ctrl-zoom-active');
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    window.addEventListener('blur', onBlur);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      window.removeEventListener('blur', onBlur);
    };
  }, []);

  // Keep CSS layout and the camera target aligned with the visual viewport.
  useEffect(() => {
    const onResize = () => {
      const height = getPageHeight();
      document.documentElement.style.setProperty('--page-height', `${height}px`);
      const current = currentPageRef.current;
      const targetY = -getPageSlot(current).yIndex * height;
      cameraY.set(targetY);
      cameraYSpring.set(targetY);
    };

    const visualViewport = window.visualViewport;
    onResize();
    window.addEventListener('resize', onResize);
    window.addEventListener('orientationchange', onResize);
    visualViewport?.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('orientationchange', onResize);
      visualViewport?.removeEventListener('resize', onResize);
      document.documentElement.style.removeProperty('--page-height');
    };
  }, [cameraY, cameraYSpring]);

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (isNavigating.current) return;
      // Don't navigate when user is zooming (Ctrl/Cmd + scroll)
      if (e.ctrlKey || e.metaKey) return;

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

  useEffect(() => {
    const mobileMediaQuery = window.matchMedia('(max-width: 767px) and (pointer: coarse)');

    const onTouchStart = (e: TouchEvent) => {
      touchRef.current = null;
      if (!mobileMediaQuery.matches || e.touches.length !== 1 || isInteractiveElement(e.target)) return;

      const page = (e.target instanceof Element ? e.target : null)?.closest<HTMLElement>('.page-shell');
      const current = currentPageRef.current;
      if (!page || page.id !== current || startsInNestedScrollContainer(e.target, page)) return;

      const touch = e.touches[0];
      touchRef.current = {
        startX: touch.clientX,
        startY: touch.clientY,
        pageId: current,
        canNavigateUp: isAtScrollBoundary(current, 'up'),
        canNavigateDown: isAtScrollBoundary(current, 'down'),
      };
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length !== 1) touchRef.current = null;
    };

    const onTouchEnd = (e: TouchEvent) => {
      const gesture = touchRef.current;
      touchRef.current = null;
      if (!gesture || e.changedTouches.length !== 1 || isNavigating.current) return;

      const touch = e.changedTouches[0];
      const deltaX = touch.clientX - gesture.startX;
      const deltaY = touch.clientY - gesture.startY;
      if (Math.abs(deltaY) < SWIPE_THRESHOLD_PX || Math.abs(deltaX) >= Math.abs(deltaY)) return;

      const current = currentPageRef.current;
      if (current !== gesture.pageId) return;
      const currentSlot = getPageSlot(current);
      if (deltaY < 0 && gesture.canNavigateDown && currentSlot.yIndex < PAGE_SLOTS.length - 1) {
        navigateTo(PAGE_SLOTS[currentSlot.yIndex + 1].id);
      } else if (deltaY > 0 && gesture.canNavigateUp && currentSlot.yIndex > 0) {
        navigateTo(PAGE_SLOTS[currentSlot.yIndex - 1].id);
      }
    };

    const onTouchCancel = () => {
      touchRef.current = null;
    };

    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    window.addEventListener('touchcancel', onTouchCancel, { passive: true });
    return () => {
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('touchcancel', onTouchCancel);
    };
  }, [navigateTo, isAtScrollBoundary]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          target.isContentEditable)
      ) {
        return;
      }

      const current = currentPageRef.current;
      const currentSlot = getPageSlot(current);

      if (e.key === 'ArrowDown') {
        if (
          currentSlot.yIndex < PAGE_SLOTS.length - 1 &&
          isAtScrollBoundary(current, 'down')
        ) {
          e.preventDefault();
          navigateTo(PAGE_SLOTS[currentSlot.yIndex + 1].id);
        }
      } else if (
        currentSlot.yIndex > 0 &&
        isAtScrollBoundary(current, 'up')
      ) {
        e.preventDefault();
        navigateTo(PAGE_SLOTS[currentSlot.yIndex - 1].id);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
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
