import type { ComponentType } from 'react';
import type { Project } from '../../types/content';

export interface ProjectCardDetailProps {
  project: Project;
}

export type ProjectCardDetail = ComponentType<ProjectCardDetailProps>;