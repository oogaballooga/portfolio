'use client';

import AboutSkillsCard from '../AboutSkillsCard';

export default function AboutSection() {
  return (
    <div className="relative w-full min-h-screen text-white flex items-center justify-center">
      <div className="w-full px-8 pt-24 pb-16">
        <h1 className="text-4xl font-bold mb-12 text-center">
          About Me & Skills
        </h1>
        <AboutSkillsCard />
      </div>
    </div>
  );
}