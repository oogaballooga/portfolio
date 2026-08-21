'use client';

import { type ReactNode, useCallback, useRef, useMemo } from 'react';
import { motion, useTransform } from 'framer-motion';
import { CameraProvider } from './CameraContext';
import { useCameraController } from '../hooks/useCameraController';
import NavWrapper from './NavWrapper';
import type { GhostPage, PageId } from '../types/content';

interface CameraSystemProps {
  children: ReactNode;
}

function GhostPageOverlay({ ghost }: { ghost: GhostPage }) {
  const yOffset = ghost.yIndex * 100;
  return (
    <div
      className="ghost-page"
      style={{ transform: `translateY(${yOffset}vh)` }}
      aria-hidden="true"
    >
      <span className="ghost-page-label">{ghost.label}</span>
    </div>
  );
}

export default function CameraSystem({ children }: CameraSystemProps) {
  const scrollRefs = useRef<Map<string, HTMLDivElement | null>>(new Map());
  const pageResetters = useRef<Map<PageId, () => void>>(new Map());

  const isAtScrollBoundary = useCallback(
    (pageId: string, direction: 'up' | 'down'): boolean => {
      const el = scrollRefs.current.get(pageId);
      if (!el) return true;

      const threshold = 5;

      if (direction === 'down') {
        return (
          el.scrollTop + el.clientHeight >= el.scrollHeight - threshold
        );
      }
      return el.scrollTop <= threshold;
    },
    []
  );

  const scrollToTop = useCallback((pageId: string) => {
    const el = scrollRefs.current.get(pageId);
    if (el) {
      el.scrollTop = 0;
    }
  }, []);

  const handleScrollRef = useCallback(
    (pageId: string, ref: HTMLDivElement | null) => {
      scrollRefs.current.set(pageId, ref);
    },
    []
  );

  const registerPageReset = useCallback(
    (pageId: PageId, reset: () => void) => {
      pageResetters.current.set(pageId, reset);

      return () => {
        if (pageResetters.current.get(pageId) === reset) {
          pageResetters.current.delete(pageId);
        }
      };
    },
    []
  );

  const resetPage = useCallback((pageId: PageId) => {
    pageResetters.current.get(pageId)?.();
  }, []);

  const controller = useCameraController(
    isAtScrollBoundary,
    scrollToTop,
    resetPage
  );
  const {
    cameraYSpring,
    currentPage,
    isTransitioning,
    direction,
    ghostPages,
    navigateTo,
  } = controller;

  const backgroundY = useTransform(cameraYSpring, (y: number) => y * 0.3);

  const contextValue = useMemo(
    () => ({
      cameraY: cameraYSpring,
      currentPage,
      isTransitioning,
      direction,
      ghostPages,
      navigateTo,
      resetPage,
      registerPageReset,
      registerScrollRef: handleScrollRef,
    }),
    [cameraYSpring, currentPage, isTransitioning, direction, ghostPages, navigateTo, resetPage, registerPageReset, handleScrollRef]
  );

  return (
    <CameraProvider value={contextValue}>
      <NavWrapper />

      <div className="camera-container">
        <div className="fixed inset-0 -z-10 bg-black" />
        <motion.div
          className="fixed top-0 left-0 w-full h-[300vh] -z-10 bg-[radial-gradient(circle_at_20%_20%,#333_0%,transparent_40%),radial-gradient(circle_at_80%_30%,#222_0%,transparent_35%),radial-gradient(circle_at_50%_70%,#2a2a2a_0%,transparent_40%)]"
          style={{ y: backgroundY }}
        />

        <motion.div className="camera-view" style={{ y: cameraYSpring }}>
          {children}

          {ghostPages.map((ghost) => (
            <GhostPageOverlay key={ghost.pageId} ghost={ghost} />
          ))}
        </motion.div>
      </div>
    </CameraProvider>
  );
}