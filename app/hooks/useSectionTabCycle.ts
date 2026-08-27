import { useEffect } from 'react';

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

function getFocusables(container: Element | null): HTMLElement[] {
  if (!container) return [];
  return Array.from(
    container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
  ).filter((el) => !el.closest('[inert]') && el.offsetParent !== null);
}

export function useSectionTabCycle(currentPage: string): void {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab' || event.defaultPrevented) return;
      const active = document.activeElement;
      if (active instanceof Element && active.closest('[role="dialog"]')) return;

      const nav = document.querySelector('[aria-label="Main navigation"]');
      const section = document.getElementById(currentPage);
      const focusables = [...getFocusables(nav), ...getFocusables(section)];
      if (focusables.length === 0) return;

      event.preventDefault();

      const currentIndex = focusables.indexOf(active as HTMLElement);
      if (currentIndex === -1) {
        (event.shiftKey ? focusables[focusables.length - 1] : focusables[0]).focus();
        return;
      }

      let nextIndex = currentIndex + (event.shiftKey ? -1 : 1);
      if (nextIndex < 0) nextIndex = focusables.length - 1;
      else if (nextIndex >= focusables.length) nextIndex = 0;
      focusables[nextIndex].focus();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage]);
}
