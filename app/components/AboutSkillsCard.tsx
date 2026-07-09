'use client';

import { useState, useEffect } from 'react';
import { motion, useTransform } from 'framer-motion';
import { useCameraContext } from './CameraContext';
import { skills } from '../data/skills';
import { personalText, professionalText } from '../data/aboutMe';
import { interests } from '../data/interests';
import InterestCarousel from './InterestCarousel';

export default function AboutSkillsCard() {
  const { cameraY } = useCameraContext();
  const [vh, setVh] = useState(0);

  useEffect(() => {
    setVh(window.innerHeight);

    const onResize = () => setVh(window.innerHeight);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // cameraY is in pixels: 0 at Contact, -vh at About, -2*vh at Academics, etc.
  // The card peaks at About (cameraY = -vh) with scale=1 and shrinks symmetrically
  // in both directions — approaching from Contact or from Academics.
  // opacity fades in/out over the first 40% of the distance from either side.
  const scale = useTransform(cameraY!, [0, -vh, -2 * vh], [0.3, 1, 0.3]);
  const opacity = useTransform(
    cameraY!,
    [0, -vh * 0.4, -vh, -vh * 1.6, -2 * vh],
    [0, 0, 1, 0, 0]
  );

  if (!cameraY || vh === 0) return null;

  return (
    <motion.div
      className="relative border-4 border-gray-500/50 rounded-2xl bg-black overflow-hidden mx-auto"
      style={{ scale, opacity, width: '80vw', height: '70vh' }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-gray-500/50 h-full">
        {/* Left: Personal / Professional */}
        <div className="p-8 lg:p-12 space-y-10 overflow-y-auto">
          <div>
            <h2 className="text-2xl font-bold text-gray-200 mb-4">PERSONAL</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              {personalText}
            </p>
          </div>

          {/* Interests carousels */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-gray-500/30">
            {interests.map((category) => (
              <InterestCarousel key={category.id} category={category} />
            ))}
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-200 mb-4">
              PROFESSIONAL
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              {professionalText}
            </p>
          </div>
        </div>

        {/* Right: Skills */}
        <div className="p-8 lg:p-12 space-y-8 flex flex-col justify-center overflow-y-auto">
          <h2 className="text-2xl font-bold text-gray-200">SKILLS</h2>
          <div className="space-y-6">
            {skills.map((category) => (
              <div key={category.category}>
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  {category.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.items.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 text-sm bg-gray-800 rounded-full text-gray-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}