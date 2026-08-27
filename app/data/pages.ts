import type { PageId, PageSlot } from '../types/content';

const PAGE_SLOTS: PageSlot[] = [
  { id: 'contact', label: 'Contact', route: '/#contact', yIndex: 0 },
  { id: 'aboutSkills', label: 'About/Skills', route: '/#aboutSkills', yIndex: 1 },
  { id: 'academics', label: 'Academics', route: '/#academics', yIndex: 2 },
  { id: 'projects', label: 'Projects', route: '/#projects', yIndex: 3 },
  { id: 'experience', label: 'Experience', route: '/#experience', yIndex: 4 },
];

export const PAGE_MAP: Record<PageId, PageSlot> = Object.fromEntries(
  PAGE_SLOTS.map((slot) => [slot.id, slot])
) as Record<PageId, PageSlot>;

export function getPageSlot(pageId: PageId): PageSlot {
  return PAGE_MAP[pageId];
}

export { PAGE_SLOTS };