import type { PageId, PageSlot } from '../types/content';

const PAGE_SLOTS: PageSlot[] = [
  { id: 'contact', label: 'Contact', route: '/', yIndex: 0 },
  { id: 'aboutSkills', label: 'About/Skills', route: '/about', yIndex: 1 },
  { id: 'academics', label: 'Academics', route: '/academics', yIndex: 2 },
  { id: 'projects', label: 'Projects', route: '/projects', yIndex: 3 },
  { id: 'experience', label: 'Experience', route: '/experience', yIndex: 4 },
];

export const PAGE_MAP: Record<PageId, PageSlot> = Object.fromEntries(
  PAGE_SLOTS.map((slot) => [slot.id, slot])
) as Record<PageId, PageSlot>;

export function getPageByRoute(pathname: string): PageId {
  const slot = PAGE_SLOTS.find((s) => s.route === pathname);
  return slot?.id ?? 'contact';
}

export function getPageSlot(pageId: PageId): PageSlot {
  return PAGE_MAP[pageId];
}

export const PAGE_ORDER: PageId[] = PAGE_SLOTS.map((s) => s.id);

export const TOTAL_PAGES = PAGE_SLOTS.length;

export { PAGE_SLOTS };