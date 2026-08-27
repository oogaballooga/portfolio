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

export default function ProjectsSection() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const { activateCard, getZIndex } = useCardZStack();

  const { currentPage, registerPageReset } = useCameraContext();
  const projectIds = useMemo(() => projects.map((p) => p.id), []);
  const { cardRects, sectionRef, setPlaceholderRef } =
    useProjectCardLayout(projectIds, currentPage === 'projects');

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
      <div className="max-w-[90rem] mx-auto px-8 pt-24 pb-16">
        <h1 className="text-4xl font-bold mb-2">Projects</h1>
        <p className="text-gray-500 text-sm mb-6">Click card for more information</p>

        {/* Invisible grid for layout measurement only */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(400px,1fr))] gap-8">
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
            className="fixed inset-0 bg-black/60 z-40"
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
            width={CARD_WIDTH}
            height={CARD_HEIGHT}
            activeWidth={ACTIVE_WIDTH}
            activeHeight={ACTIVE_HEIGHT}
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