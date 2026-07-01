'use client';

import { useCameraContext } from './components/CameraContext';
import PageShell from './components/PageShell';
import ContactSection from './components/sections/ContactSection';
import AboutSection from './components/sections/AboutSection';
import AcademicsSection from './components/sections/AcademicsSection';
import ProjectsSection from './components/sections/ProjectsSection';
import ExperienceSection from './components/sections/ExperienceSection';
import { PAGE_SLOTS } from './data/pages';

export default function HomePage() {
  const { registerScrollRef } = useCameraContext();

  const sections = [
    { slot: PAGE_SLOTS[0], component: <ContactSection /> },
    { slot: PAGE_SLOTS[1], component: <AboutSection /> },
    { slot: PAGE_SLOTS[2], component: <AcademicsSection /> },
    { slot: PAGE_SLOTS[3], component: <ProjectsSection /> },
    { slot: PAGE_SLOTS[4], component: <ExperienceSection /> },
  ];

  return (
    <>
      {sections.map(({ slot, component }) => (
        <PageShell
          key={slot.id}
          yIndex={slot.yIndex}
          pageId={slot.id}
          onScrollRef={registerScrollRef}
        >
          {component}
        </PageShell>
      ))}
    </>
  );
}