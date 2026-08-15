'use client';

import {
  type CSSProperties,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import type { Project } from '../types/content';

type CardDimension = number | string;

interface ProjectCardProps {
  project: Project;
  restTop: string;
  restLeft: string;
  width?: number;
  height?: number;
  activeWidth?: CardDimension;
  activeHeight?: CardDimension;
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
const ACTIVE_WIDTH: CardDimension = '100vw';
const ACTIVE_HEIGHT: CardDimension = '100vh';

export { CARD_WIDTH, CARD_HEIGHT, ACTIVE_WIDTH, ACTIVE_HEIGHT };

function toCssDimension(dimension: CardDimension): string {
  return typeof dimension === 'number' ? `${dimension}px` : dimension;
}

function toPixelDimension(
  dimension: CardDimension,
  viewport: { width: number; height: number },
  fallback: number
): number {
  if (typeof dimension === 'number') return dimension;
  if (dimension === '100vw') return viewport.width || fallback;
  if (dimension === '100vh') return viewport.height || fallback;

  const pixels = Number.parseFloat(dimension);
  return Number.isNaN(pixels) ? fallback : pixels;
}

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
  const [hovered, setHovered] = useState(false);
  const [viewport, setViewport] = useState({ width: 0, height: 0 });
  const detailRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const updateViewport = () =>
      setViewport({ width: window.innerWidth, height: window.innerHeight });

    updateViewport();
    window.addEventListener('resize', updateViewport);
    return () => window.removeEventListener('resize', updateViewport);
  }, []);

  const resolvedActiveWidth = activeWidth;
  const resolvedActiveHeight = activeHeight;
  const activeWidthCss = toCssDimension(resolvedActiveWidth);
  const activeHeightCss = toCssDimension(resolvedActiveHeight);
  const activeWidthPx = toPixelDimension(
    resolvedActiveWidth,
    viewport,
    width
  );
  const activeHeightPx = toPixelDimension(
    resolvedActiveHeight,
    viewport,
    height
  );
  const inactiveScaleX = Math.min(1, width / activeWidthPx);
  const inactiveScaleY = Math.min(1, height / activeHeightPx);
  const transition = `${flipSpeed}s ease-in-out`;

  // Reset project detail scroll whenever the card is closed.
  useEffect(() => {
    if (!isActive && detailRef.current) {
      detailRef.current.scrollTop = 0;
    }
  }, [isActive]);

  const handleDetailWheel = useCallback(
    (e: React.WheelEvent<HTMLDivElement>) => {
      const el = e.currentTarget;
      const atTop = el.scrollTop <= 0;
      const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1;

      // Keep wheel events inside the detail panel until its edge is reached.
      if ((e.deltaY < 0 && !atTop) || (e.deltaY > 0 && !atBottom)) {
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
        width: isActive ? activeWidthCss : `${width}px`,
        height: isActive ? activeHeightCss : `${height}px`,
        transition: `top ${transition}, left ${transition}, width ${transition}, height ${transition}`,
        backgroundColor: isActive ? '#181818' : hovered ? '#101010' : 'black',
        border: '4px solid rgba(156, 163, 175, 0.5)',
        borderRadius: '1rem',
        overflow: 'hidden',
        pointerEvents: disabled ? 'none' : 'auto',
        ...style,
      }}
      onClick={(e) => {
        e.stopPropagation();
        if (!isActive) onActivate();
      }}
    >
      {/* Inactive content stays at its original layout size and only fades. */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: `${width}px`,
          height: `${height}px`,
          transform: 'translate(-50%, -50%)',
          opacity: isActive ? 0 : 1,
          transition: `opacity ${transition}`,
          pointerEvents: isActive ? 'none' : 'auto',
        }}
        onMouseEnter={() => !isActive && setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="p-8 w-full h-full flex flex-col justify-between text-white">
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

      {/* Active content has final-size layout from the first render. It is
          scaled while the border grows, so its text does not rewrap. */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: isActive ? 1 : 0,
          transition: `opacity ${transition}`,
          pointerEvents: isActive ? 'auto' : 'none',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: activeWidthCss,
            height: activeHeightCss,
            transform: `translate(-50%, -50%) scale(${isActive ? 1 : inactiveScaleX}, ${isActive ? 1 : inactiveScaleY})`,
            transformOrigin: 'center center',
            transition: `transform ${transition}`,
          }}
        >
          <div
            ref={detailRef}
            onWheel={handleDetailWheel}
            className="p-12 w-full h-full flex flex-col overflow-y-auto text-white"
          >
            <h2 className="text-3xl font-bold mb-6">{project.title}</h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              {project.description}
            </p>

            {project.keyFeatures && project.keyFeatures.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-3 text-gray-400 uppercase tracking-wide">
                  Key Features
                </h3>
                <ul className="space-y-2">
                  {project.keyFeatures.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-gray-300">
                      <span className="text-gray-500 mt-1">▸</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {project.skills.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-3 text-gray-400 uppercase tracking-wide">
                  Skills Demonstrated
                </h3>
                <ul className="space-y-2">
                  {project.skills.map((skill) => (
                    <li key={skill} className="flex items-start gap-2 text-gray-300">
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
                  <span key={tech} className="px-4 py-1.5 text-sm bg-gray-800 rounded-full text-gray-300">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {project.links && project.links.length > 0 && (
              <div className="mb-8">
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

            {project.attachments && project.attachments.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-3 text-gray-400 uppercase tracking-wide">
                  Documents
                </h3>
                <div className="flex flex-wrap gap-4">
                  {project.attachments.map((attachment) => (
                    <a
                      key={attachment.url}
                      href={attachment.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg text-blue-400 hover:text-blue-300 hover:bg-gray-700 transition-colors text-sm"
                    >
                      {attachment.label}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {project.demoVideo && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-3 text-gray-400 uppercase tracking-wide">
                  Demo
                </h3>
                <div className="rounded-xl overflow-hidden border border-gray-600 bg-black">
                  <video controls preload="metadata" className="w-full">
                    <source src={project.demoVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onDeactivate();
          }}
          className="absolute top-4 right-4 bg-black text-white border-none rounded-full w-8 h-8 cursor-pointer z-10 flex items-center justify-center hover:bg-gray-800 transition-colors"
          aria-label="Close project detail view"
        >
          ✕
        </button>
      </div>
    </div>
  );
}