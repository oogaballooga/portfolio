'use client';

import { createContext, useContext, type ReactNode } from 'react';
import { type MotionValue } from 'framer-motion';
import type { PageId, CameraDirection, GhostPage } from '../types/content';

interface CameraContextValue {
  cameraY: MotionValue<number> | null;
  currentPage: PageId;
  isTransitioning: boolean;
  direction: CameraDirection;
  ghostPages: GhostPage[];
  navigateTo: (pageId: PageId) => void;
  registerScrollRef?: (pageId: string, ref: HTMLDivElement | null) => void;
}

export const CameraContext = createContext<CameraContextValue>({
  cameraY: null,
  currentPage: 'contact',
  isTransitioning: false,
  direction: 'none',
  ghostPages: [],
  navigateTo: () => {},
});

export function useCameraContext(): CameraContextValue {
  return useContext(CameraContext);
}

interface CameraProviderProps {
  value: CameraContextValue;
  children: ReactNode;
}

export function CameraProvider({ value, children }: CameraProviderProps) {
  return (
    <CameraContext.Provider value={value}>{children}</CameraContext.Provider>
  );
}