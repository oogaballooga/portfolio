import CraftStashProjectCard from './CraftStashProjectCard';
import DefaultProjectCard from './DefaultProjectCard';
import type { ProjectCardDetail } from './types';

const PROJECT_CARD_DETAILS: Record<string, ProjectCardDetail> = {
  'mobile-app-capstone': CraftStashProjectCard,
  'portfolio-website': DefaultProjectCard,
};

export function getProjectCardDetail(projectId: string): ProjectCardDetail {
  return PROJECT_CARD_DETAILS[projectId] ?? DefaultProjectCard;
}