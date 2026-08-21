'use client';

import { CSSProperties, useState, useEffect, useRef, useCallback } from 'react';
import type { Experience } from '../types/content';

interface ExperienceCardProps {
  experience: Experience;
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
const ACTIVE_WIDTH = 800;
const ACTIVE_HEIGHT = 720;

export { CARD_WIDTH, CARD_HEIGHT, ACTIVE_WIDTH, ACTIVE_HEIGHT };

export default function ExperienceCard({
  experience,
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
}: ExperienceCardProps) {
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

  const resolvedActiveWidth = experience.activeWidth ?? activeWidth;
  const resolvedActiveHeight = experience.activeHeight ?? activeHeight;
  // Apply the active dimensions during the same render as activation. The
  // `expanded` state is intentionally delayed on close so the reverse flip
  // can finish before the wrapper returns to its resting dimensions.
  const isExpanded = isActive || expanded;
  const currentW = isExpanded ? resolvedActiveWidth : width;
  const currentH = isExpanded ? resolvedActiveHeight : height;
  const frontBg = isActive ? '#181818' : hovered ? '#101010' : 'black';

  const detailRef = useRef<HTMLDivElement>(null);

  // Reset scroll position when card is deactivated
  useEffect(() => {
    if (!isActive && detailRef.current) {
      detailRef.current.scrollTop = 0;
    }
  }, [isActive]);

  const handleDetailWheel = useCallback(
    (e: React.WheelEvent<HTMLDivElement>) => {
      const el = e.currentTarget;
      const { scrollTop, scrollHeight, clientHeight } = el;
      const atTop = scrollTop <= 0;
      const atBottom = scrollTop + clientHeight >= scrollHeight - 1;

      if (e.deltaY < 0 && !atTop) {
        e.stopPropagation();
      } else if (e.deltaY > 0 && !atBottom) {
        e.stopPropagation();
      }
    },
    []
  );

  return (
    <div
      style={{
        position: 'absolute',
        top: isActive ? '50%' : restTop,
        left: isActive ? '50%' : restLeft,
        zIndex: isActive ? zIndex + 50 : zIndex,
        transform: 'translate(-50%, -50%)',
        // Keep the card's dimensions fixed during the flip. Animating the
        // wrapper width/height makes the detail content reflow while it is
        // entering, which produces visible line-wrapping jumps.
        transition: 'top 0.4s ease, left 0.4s ease',
        willChange: 'top, left',
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
                <p className="text-gray-400 text-md uppercase tracking-wide mb-1">
                  {experience.role}
                </p>
                <h2 className="text-2xl font-bold mb-1">{experience.company}</h2>
                {experience.location && (
                  <p className="text-gray-500 text-sm mb-3">{experience.location}</p>
                )}
                <p className="text-gray-400 text-sm">
                  {experience.startDate} – {experience.endDate ?? 'Present'}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {experience.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 text-xs bg-gray-800 rounded-full text-gray-300"
                  >
                    {skill}
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
              width: `${resolvedActiveWidth}px`,
              height: `${resolvedActiveHeight}px`,
            }}
          >
            <div
              ref={detailRef}
              onWheel={handleDetailWheel}
              className="p-12 w-full h-full flex flex-col overflow-y-auto"
            >
              <p className="text-gray-400 text-sm uppercase tracking-wide mb-1">
                {experience.role}
              </p>
              <h2 className="text-3xl font-bold mb-1">{experience.company}</h2>
              {experience.location && (
                <p className="text-gray-500 text-sm mb-2">{experience.location}</p>
              )}
              <p className="text-gray-500 text-sm mb-6">
                {experience.startDate} – {experience.endDate ?? 'Present'}
              </p>

              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                {experience.description}
              </p>

              {experience.achievements && experience.achievements.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-3 text-gray-400 uppercase tracking-wide">
                    What I Did
                  </h3>
                  <ul className="space-y-2">
                    {experience.achievements.map((a, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-300">
                        <span className="text-blue-400 mt-1">▸</span>
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-400 uppercase tracking-wide">
                  Skills Used
                </h3>
                <div className="flex flex-wrap gap-2">
                  {experience.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 text-sm bg-gray-800 rounded-full text-gray-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDeactivate();
              }}
              className="absolute top-4 right-4 bg-black text-white border-none rounded-full w-8 h-8 cursor-pointer z-10 flex items-center justify-center hover:bg-gray-800 transition-colors"
              aria-label="Close detail view"
            >
              ✕
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}