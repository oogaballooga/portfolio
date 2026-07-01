import type { CameraDirection, GhostPage, PageId } from './content';

// Configuration for a single page transition
export interface TransitionConfig {
  from: PageId;
  to: PageId;
  distance: number;
  direction: CameraDirection;
  useGhosts: boolean;
  ghostPages: GhostPage[];
  duration: number;
}

// Spring physics config for camera movement
export interface CameraSpringConfig {
  stiffness: number;
  damping: number;
  mass: number;
}