'use client';

import {
  type CSSProperties,
  createElement,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { getProjectCardDetail } from './projectCards';
import { useDialogA11y } from '../hooks/useDialogA11y';
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
  activeTop?: string;
  useFixedActivePosition?: boolean;
  flipSpeed?: number;
  zIndex?: number;
  isActive: boolean;
  isPageActive?: boolean;
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
  activeTop = '50%',
  useFixedActivePosition = false,
  flipSpeed = 0.5,
  zIndex = 1,
  isActive,
  isPageActive = true,
  onActivate,
  onDeactivate,
  style,
  disabled = false,
}: ProjectCardProps) {
  const [hovered, setHovered] = useState(false);
  const [viewport, setViewport] = useState({ width: 0, height: 0 });
  const detailRef = useRef<HTMLDivElement>(null);
  const { containerRef, closeButtonRef } = useDialogA11y({
    isActive,
    onClose: onDeactivate,
  });

  useLayoutEffect(() => {
    const updateViewport = () =>
      setViewport({ width: window.innerWidth, height: window.innerHeight });

    updateViewport();
    window.addEventListener('resize', updateViewport);
    return () => window.removeEventListener('resize', updateViewport);
  }, []);

  const activeWidthCss = toCssDimension(activeWidth);
  const activeHeightCss = toCssDimension(activeHeight);
  const activeWidthPx = toPixelDimension(activeWidth, viewport, width);
  const activeHeightPx = toPixelDimension(activeHeight, viewport, height);
  const inactiveScaleX = Math.min(1, width / activeWidthPx);
  const inactiveScaleY = Math.min(1, height / activeHeightPx);
  const transition = `${flipSpeed}s ease-in-out`;
  const cardIsActive = isActive && isPageActive;
  const cardTransition = isPageActive ? transition : 'none';
  const activePositionIsFixed = cardIsActive && useFixedActivePosition;

  useEffect(() => {
    if (!isActive && detailRef.current) {
      detailRef.current.scrollTop = 0;
    }
  }, [isActive]);

  const handleDetailWheel = useCallback(
    (event: React.WheelEvent<HTMLDivElement>) => {
      const element = event.currentTarget;
      const atTop = element.scrollTop <= 0;
      const atBottom =
        element.scrollTop + element.clientHeight >= element.scrollHeight - 1;

      if (
        (event.deltaY < 0 && !atTop) ||
        (event.deltaY > 0 && !atBottom)
      ) {
        event.stopPropagation();
      }
    },
    []
  );

  return (
    <div
      style={{
        position: activePositionIsFixed ? 'fixed' : 'absolute',
        top: cardIsActive ? activeTop : restTop,
        left: cardIsActive ? '50%' : restLeft,
        zIndex: cardIsActive ? 1051 : zIndex,
        transform: 'translate(-50%, -50%)',
        width: cardIsActive ? activeWidthCss : `${width}px`,
        height: cardIsActive ? activeHeightCss : `${height}px`,
        transition: `top ${cardTransition}, left ${cardTransition}, width ${cardTransition}, height ${cardTransition}`,
        willChange: 'top, left, width, height',
        backgroundColor: isActive ? '#181818' : hovered ? '#101010' : 'black',
        border: '4px solid rgba(156, 163, 175, 0.5)',
        borderRadius: '1rem',
        overflow: 'hidden',
        pointerEvents: disabled ? 'none' : 'auto',
        cursor: cardIsActive ? 'default' : 'pointer',
        ...style,
      }}
      role="button"
      tabIndex={0}
      aria-expanded={isActive}
      aria-controls={`${project.id}-detail`}
      onClick={(event) => {
        event.stopPropagation();
        if (!isActive) onActivate();
      }}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          if (!isActive) onActivate();
        }
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: `${width}px`,
          height: `${height}px`,
          transform: 'translate(-50%, -50%)',
          opacity: cardIsActive ? 0 : 1,
          transition: `opacity ${cardTransition}`,
          pointerEvents: cardIsActive ? 'none' : 'auto',
        }}
        onMouseEnter={() => !cardIsActive && setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="flex h-full w-full flex-col justify-between p-4 text-white md:p-8">
          <div>
            <h2 className="mb-3 text-2xl font-bold">{project.title}</h2>
            <p className="text-sm leading-relaxed text-gray-400">
              {project.shortDescription}
            </p>
            {project.inactiveCallout && (
              <p className="mt-2 font-bold text-gray-200">
                {project.inactiveCallout}
              </p>
            )}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="rounded-full bg-gray-800 px-3 py-1 text-xs text-gray-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div
        ref={containerRef}
        id={`${project.id}-detail`}
        inert={!cardIsActive}
        role={cardIsActive ? 'dialog' : undefined}
        aria-modal={cardIsActive ? true : undefined}
        aria-labelledby={`${project.id}-detail-title`}
        style={{
          position: 'absolute',
          inset: 0,
          opacity: cardIsActive ? 1 : 0,
          transition: `opacity ${cardTransition}`,
          pointerEvents: cardIsActive ? 'auto' : 'none',
        }}
      >
        <h2 id={`${project.id}-detail-title`} className="sr-only">
          {project.title}
        </h2>
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: activeWidthCss,
            height: activeHeightCss,
            transform: `translate(-50%, -50%) scale(${cardIsActive ? 1 : inactiveScaleX}, ${cardIsActive ? 1 : inactiveScaleY})`,
            transformOrigin: 'center center',
            transition: `transform ${cardTransition}`,
          }}
        >
          <div
            ref={detailRef}
            onWheel={handleDetailWheel}
            className="h-full w-full overflow-y-auto"
          >
            {createElement(getProjectCardDetail(project.id), { project })}
          </div>
        </div>

        <button
          type="button"
          ref={closeButtonRef}
          onClick={(event) => {
            event.stopPropagation();
            onDeactivate();
          }}
          className="detail-close-control absolute right-3 top-3 z-10 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-none bg-[#333] text-2xl text-white transition-colors hover:bg-[#444] md:right-5 md:top-5 md:h-16 md:w-16 md:text-3xl"
          aria-label="Close project detail view"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
