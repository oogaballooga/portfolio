import type { Experience } from '../types/content';

export const experiences: Experience[] = [];

export function getExperienceBySlug(slug: string): Experience | undefined {
  return experiences.find((e) => e.slug === slug);
}