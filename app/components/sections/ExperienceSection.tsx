'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ExperienceCard, {
  CARD_WIDTH,
  CARD_HEIGHT,
  ACTIVE_WIDTH,
  ACTIVE_HEIGHT,
} from '../ExperienceCard';
import { experiences } from '../../data/experience';
import { useProjectCardLayout } from '../../hooks/useProjectCardLayout';
import { useCardZStack } from '../../hooks/useCardZStack';
import { useCameraContext } from '../CameraContext';

export default function ExperienceSection() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const { activateCard, getZIndex } = useCardZStack();

  const { currentPage, registerPageReset } = useCameraContext();
  const experienceIds = useMemo(() => experiences.map((e) => e.id), []);
  const { cardRects, sectionRef, setPlaceholderRef } =
    useProjectCardLayout(experienceIds, currentPage === 'experience');

  const activate = (id: string) => {
    activateCard(id);
    setActiveId(id);
  };

  const deactivate = useCallback(() => setActiveId(null), []);

  // Deactivate card when user navigates away from experience page
  useEffect(() => {
    if (currentPage !== 'experience') {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- deactivation on navigation is a legitimate lifecycle sync
      deactivate();
    }
  }, [currentPage, deactivate]);

  // Let the navbar close the active experience card when its tab is clicked again.
  useEffect(
    () => registerPageReset('experience', deactivate),
    [registerPageReset, deactivate]
  );

  return (
    <div ref={sectionRef} className="relative w-full min-h-screen text-white">
      <div className="max-w-[90rem] mx-auto px-8 pt-24 pb-16">
        <h1 className="text-4xl font-bold mb-2">Experience</h1>
        <p className="text-gray-500 text-sm mb-6">Click card for more information</p>

        {/* Invisible grid for layout measurement only */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(400px,1fr))] gap-8">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              ref={(el) => setPlaceholderRef(exp.id, el)}
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
      {experiences.map((experience) => {
        const rect = cardRects.find((r) => r.projectId === experience.id);
        const isActive = activeId === experience.id;

        return (
          <ExperienceCard
            key={experience.id}
            experience={experience}
            restTop={rect ? `${rect.top}px` : '0px'}
            restLeft={rect ? `${rect.left}px` : '0px'}
            width={CARD_WIDTH}
            height={CARD_HEIGHT}
            activeWidth={ACTIVE_WIDTH}
            activeHeight={ACTIVE_HEIGHT}
            isActive={isActive}
            zIndex={getZIndex(experience.id)}
            onActivate={() => activate(experience.id)}
            onDeactivate={deactivate}
            disabled={activeId !== null && !isActive}
          />
        );
      })}
    </div>
  );
}