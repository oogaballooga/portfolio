'use client';

import { useState, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ProjectCard, {
  CARD_WIDTH,
  CARD_HEIGHT,
  ACTIVE_WIDTH,
  ACTIVE_HEIGHT,
} from '../ProjectCard';
import { projects } from '../../data/projects';
import { useProjectCardLayout } from '../../hooks/useProjectCardLayout';

export default function ProjectsSection() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [zCounter, setZCounter] = useState(1);
  const [cardZ, setCardZ] = useState<Record<string, number>>({});

  const projectIds = useMemo(() => projects.map((p) => p.id), []);
  const { cardRects, sectionRef, setPlaceholderRef } =
    useProjectCardLayout(projectIds);

  const activate = (id: string) => {
    setZCounter((prev) => {
      const next = prev + 1;
      setCardZ((z) => ({ ...z, [id]: next }));
      return next;
    });
    setActiveId(id);
  };

  const deactivate = () => setActiveId(null);

  return (
    <div ref={sectionRef} className="relative w-full min-h-screen text-white">
      <div className="max-w-[90rem] mx-auto px-8 pt-24 pb-16">
        <h1 className="text-4xl font-bold mb-12">Projects</h1>

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
            zIndex={cardZ[project.id] ?? 1}
            onActivate={() => activate(project.id)}
            onDeactivate={deactivate}
            disabled={activeId !== null && !isActive}
          />
        );
      })}
    </div>
  );
}