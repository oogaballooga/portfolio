'use client';

import { CSSProperties, useState, useEffect, useRef } from 'react';
import type { Project } from '../types/content';

interface ProjectCardProps {
  project: Project;
  restTop: string;
  restLeft: string;
  width?: number;
  height?: number;
  activeWidth?: number;
  activeHeight?: number;
  flipSpeed?: number;
  zIndex?: number;
  isActive: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
  style?: CSSProperties;
  disabled?: boolean;
}

const CARD_WIDTH = 500;
const CARD_HEIGHT = 260;
const ACTIVE_WIDTH = 900;
const ACTIVE_HEIGHT = 640;

export { CARD_WIDTH, CARD_HEIGHT, ACTIVE_WIDTH, ACTIVE_HEIGHT };

export default function ProjectCard({
  project,
  restTop,
  restLeft,
  width = CARD_WIDTH,
  height = CARD_HEIGHT,
  activeWidth = ACTIVE_WIDTH,
  activeHeight = ACTIVE_HEIGHT,
  flipSpeed = 0.5,
  zIndex = 1,
  isActive,
  onActivate,
  onDeactivate,
  style,
  disabled = false,
}: ProjectCardProps) {
  const [rotationIndex, setRotationIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(false);

  const prevActiveRef = useRef(isActive);
  useEffect(() => {
    if (isActive !== prevActiveRef.current) {
      prevActiveRef.current = isActive;
      setRotationIndex((r) => r + 1);
    }
  }, [isActive]);

  useEffect(() => {
    if (isActive) {
      setExpanded(true);
    } else {
      const timer = setTimeout(() => setExpanded(false), flipSpeed * 1000);
      return () => clearTimeout(timer);
    }
  }, [isActive, flipSpeed]);

  const currentW = expanded ? activeWidth : width;
  const currentH = expanded ? activeHeight : height;
  const frontBg = isActive ? '#181818' : hovered ? '#101010' : 'black';

  return (
    <div
      style={{
        position: 'absolute',
        top: isActive ? '50%' : restTop,
        left: isActive ? '50%' : restLeft,
        zIndex: isActive ? zIndex + 50 : zIndex,
        transform: 'translate(-50%, -50%)',
        transition:
          'top 0.4s ease, left 0.4s ease, width 0.4s ease, height 0.4s ease',
        width: `${currentW}px`,
        height: `${currentH}px`,
        perspective: '1200px',
        pointerEvents: disabled ? 'none' : 'auto',
        ...style,
      }}
      onClick={(e) => {
        e.stopPropagation();
        if (!isActive) onActivate();
      }}
    >
      <div
        className="flip-card"
        style={{
          '--flip-speed': `${flipSpeed}s`,
          transform: `rotateY(${rotationIndex * 180}deg)`,
        } as CSSProperties}
      >
        {/* Front face */}
        <div className="face">
          <div
            className="border-4 border-gray-500/50 rounded-2xl flex flex-col text-white relative overflow-hidden"
            style={{
              backgroundColor: frontBg,
              cursor: isActive ? 'default' : 'pointer',
              transition: 'background-color 0.4s ease',
              pointerEvents: 'auto',
              width: `${width}px`,
              height: `${height}px`,
            }}
            onMouseEnter={() => !isActive && setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <div className="p-8 w-full h-full flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-3">{project.title}</h2>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {project.shortDescription}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs bg-gray-800 rounded-full text-gray-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Back face */}
        <div className="face back">
          <div
            className="border-4 border-gray-500/50 rounded-2xl flex flex-col text-white relative overflow-hidden"
            style={{
              backgroundColor: '#181818',
              pointerEvents: 'auto',
              width: `${activeWidth}px`,
              height: `${activeHeight}px`,
            }}
          >
            <div className="p-12 w-full h-full flex flex-col overflow-y-auto">
              <h2 className="text-3xl font-bold mb-6">{project.title}</h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                {project.description}
              </p>

              {project.skills.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-3 text-gray-400 uppercase tracking-wide">
                    Skills Demonstrated
                  </h3>
                  <ul className="space-y-2">
                    {project.skills.map((skill) => (
                      <li
                        key={skill}
                        className="flex items-start gap-2 text-gray-300"
                      >
                        <span className="text-gray-500 mt-1">▸</span>
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-3 text-gray-400 uppercase tracking-wide">
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-4 py-1.5 text-sm bg-gray-800 rounded-full text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {project.links && project.links.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-gray-400 uppercase tracking-wide">
                    Links
                  </h3>
                  <div className="flex gap-4">
                    {project.links.map((link) => (
                      <a
                        key={link.url}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 underline transition-colors"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDeactivate();
              }}
              className="absolute top-4 right-4 bg-black text-white border-none rounded-full w-8 h-8 cursor-pointer z-10 flex items-center justify-center hover:bg-gray-800 transition-colors"
            >
              ✕
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}