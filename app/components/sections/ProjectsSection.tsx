'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ProjectCard, {
  CARD_WIDTH,
  CARD_HEIGHT,
  ACTIVE_WIDTH,
  ACTIVE_HEIGHT,
} from '../ProjectCard';
import { projects } from '../../data/projects';
import { useProjectCardLayout } from '../../hooks/useProjectCardLayout';
import { useCardZStack } from '../../hooks/useCardZStack';
import { useCameraContext } from '../CameraContext';

const MOBILE_NAV_CLEARANCE =
  'calc(56px + max(0px, env(safe-area-inset-bottom, 0px) - 4px))';
const MOBILE_ACTIVE_HEIGHT = `calc(100dvh - max(16px, env(safe-area-inset-top, 0px)) - ${MOBILE_NAV_CLEARANCE})`;
const MOBILE_ACTIVE_TOP = `calc((max(16px, env(safe-area-inset-top, 0px)) + 100dvh - ${MOBILE_NAV_CLEARANCE}) / 2)`;

export default function ProjectsSection() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const { activateCard, getZIndex } = useCardZStack();

  const { currentPage, registerPageReset } = useCameraContext();
  const projectIds = useMemo(() => projects.map((p) => p.id), []);
  const { cardRects, viewport, sectionRef, setPlaceholderRef } =
    useProjectCardLayout(projectIds, currentPage === 'projects');
  const isNarrow = viewport.width > 0 && viewport.width < 768;

  const activate = (id: string) => {
    activateCard(id);
    setActiveId(id);
  };

  const deactivate = useCallback(() => setActiveId(null), []);

  // Deactivate project cards whenever the camera leaves the projects page.
  useEffect(() => {
    if (currentPage !== 'projects') {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- deactivation on navigation is a legitimate lifecycle sync
      deactivate();
    }
  }, [currentPage, deactivate]);

  // Let the navbar close the active project when its tab is clicked again.
  useEffect(
    () => registerPageReset('projects', deactivate),
    [registerPageReset, deactivate]
  );

  return (
    <div ref={sectionRef} className="relative w-full min-h-screen text-white">
      <div className="max-w-[90rem] mx-auto px-4 pt-12 pb-16 md:px-8 md:pt-24">
        <h1 className="text-4xl font-bold mb-2">Projects</h1>
        <p className="text-gray-500 text-sm mb-6">Click card for more information</p>

        {/* Invisible grid for layout measurement only */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[repeat(auto-fit,minmax(400px,1fr))]">
          {projects.map((p) => (
            <div
              key={p.id}
              ref={(el) => setPlaceholderRef(p.id, el)}
              style={{ height: `${CARD_HEIGHT}px` }}
              aria-hidden
            />
          ))}
        </div>
      </div>

      {/* Dim backdrop */}
      <AnimatePresence>
        {activeId !== null && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[1050] bg-black/60"
            onClick={deactivate}
          />
        )}
      </AnimatePresence>

      {/* Cards positioned over grid placeholders */}
      {projects.map((project) => {
        const rect = cardRects.find((r) => r.projectId === project.id);
        const isActive = activeId === project.id;

        return (
          <ProjectCard
            key={project.id}
            project={project}
            restTop={rect ? `${rect.top}px` : '0px'}
            restLeft={rect ? `${rect.left}px` : '0px'}
            width={isNarrow ? (rect?.width ?? CARD_WIDTH) : CARD_WIDTH}
            height={CARD_HEIGHT}
            activeWidth={isNarrow ? 'calc(100vw - 32px)' : ACTIVE_WIDTH}
            activeHeight={isNarrow ? MOBILE_ACTIVE_HEIGHT : ACTIVE_HEIGHT}
            activeTop={isNarrow ? MOBILE_ACTIVE_TOP : undefined}
            useFixedActivePosition={isNarrow}
            isActive={isActive}
            isPageActive={currentPage === 'projects'}
            zIndex={getZIndex(project.id)}
            onActivate={() => activate(project.id)}
            onDeactivate={deactivate}
            disabled={activeId !== null && !isActive}
          />
        );
      })}
    </div>
  );
}
