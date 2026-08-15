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
import { useCameraContext } from '../CameraContext';

export default function ExperienceSection() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [zCounter, setZCounter] = useState(1);
  const [cardZ, setCardZ] = useState<Record<string, number>>({});

  const experienceIds = useMemo(() => experiences.map((e) => e.id), []);
  const { cardRects, sectionRef, setPlaceholderRef } =
    useProjectCardLayout(experienceIds);
  const { currentPage } = useCameraContext();

  const activate = (id: string) => {
    setZCounter((prev) => {
      const next = prev + 1;
      setCardZ((z) => ({ ...z, [id]: next }));
      return next;
    });
    setActiveId(id);
  };

  const deactivate = useCallback(() => setActiveId(null), []);

  // Deactivate card when user navigates away from experience page
  useEffect(() => {
    if (currentPage !== 'experience') {
      deactivate();
    }
  }, [currentPage, deactivate]);

  return (
    <div ref={sectionRef} className="relative w-full min-h-screen text-white">
      <div className="max-w-[90rem] mx-auto px-8 pt-24 pb-16">
        <h1 className="text-4xl font-bold mb-12">Experience</h1>

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
            zIndex={cardZ[experience.id] ?? 1}
            onActivate={() => activate(experience.id)}
            onDeactivate={deactivate}
            disabled={activeId !== null && !isActive}
          />
        );
      })}
    </div>
  );
}