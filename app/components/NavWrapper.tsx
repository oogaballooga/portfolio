'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCameraContext } from './CameraContext';
import { PAGE_SLOTS } from '../data/pages';
import type { PageId } from '../types/content';

const NAV_LABELS: Record<PageId, string> = {
  contact: 'Contact',
  aboutSkills: 'About/Skills',
  academics: 'Academics',
  projects: 'Projects',
  experience: 'Experience',
};

function pageIdToHref(pageId: PageId): string {
  return pageId === 'contact' ? '/' : `/#${pageId}`;
}

export default function NavWrapper() {
  const { currentPage, navigateTo, resetPage } = useCameraContext();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const handleClick = (e: React.MouseEvent, pageId: PageId) => {
    e.preventDefault();

    if (pageId === currentPage) {
      resetPage(pageId);
      return;
    }

    // Close any active card before leaving the current section. The section's
    // currentPage effect also handles this during camera-driven navigation.
    resetPage(currentPage);
    navigateTo(pageId);
  };

  return (
    <nav className="navbar" aria-label="Main navigation">
      {PAGE_SLOTS.map((slot) => (
        <Link
          key={slot.id}
          href={pageIdToHref(slot.id)}
          className={mounted && currentPage === slot.id ? 'font-bold scale-110' : ''}
          style={{ transition: 'transform 0.2s ease, font-weight 0.2s ease' }}
          onClick={(e) => handleClick(e, slot.id)}
        >
          {NAV_LABELS[slot.id]}
        </Link>
      ))}
    </nav>
  );
}