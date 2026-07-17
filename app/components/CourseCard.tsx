'use client';

import { useRef, useState, useLayoutEffect, useCallback } from 'react';
import './CourseCard.css';

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  width?: number;
  height?: number;
  isActive: boolean;
  zIndex: number;
  onActivate: () => void;
  onDeactivate: () => void;
}

export default function CourseCard({
  title,
  description,
  width = 270,
  height = 115,
  isActive,
  zIndex,
  onActivate,
}: CourseCardProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [titleWidth, setTitleWidth] = useState(0);
  const [activeWidth, setActiveWidth] = useState(700);
  const [overflowShift, setOverflowShift] = useState(0);

  useLayoutEffect(() => {
    if (titleRef.current) {
      setTitleWidth(titleRef.current.offsetWidth);
    }
  }, [title]);

  const recalculateOverflow = useCallback(
    (newWidth: number) => {
      if (!wrapperRef.current) return;
      const rect = wrapperRef.current.getBoundingClientRect();
      const rightEdge = rect.left + newWidth;
      const overflow = rightEdge - window.innerWidth + 8; // 8px buffer

      if (overflow > 0) {
        // Clamp so the card doesn't shift past its original left edge
        setOverflowShift(Math.min(overflow, rect.left - 8));
      } else {
        setOverflowShift(0);
      }
    },
    []
  );

  useLayoutEffect(() => {
    if (isActive && descRef.current && wrapperRef.current) {
      const descWidth = descRef.current.scrollWidth;
      const neededWidth = titleWidth + 31 + descWidth + 50;
      const newWidth = Math.max(700, Math.min(neededWidth, 900));
      setActiveWidth(newWidth);
      recalculateOverflow(newWidth);
    } else if (!isActive) {
      setOverflowShift(0);
    }
  }, [isActive, titleWidth, description, recalculateOverflow]);

  // Recalculate overflow shift on window resize so the card repositions
  // when grid columns change (e.g. 5 columns → 4 columns)
  useLayoutEffect(() => {
    if (!isActive) return;

    const onResize = () => recalculateOverflow(activeWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [isActive, activeWidth, recalculateOverflow]);

  const cardPadding = 25;
  const lineMargin = 15;
  const lineWidth = 1;
  const activeLine = lineWidth + lineMargin * 2;

  const contentWidth = width - cardPadding * 2;
  const centerOffset = contentWidth / 2 - titleWidth / 2;
  const titleTransform = isActive
    ? 'translateX(0)'
    : `translateX(${centerOffset}px)`;

  const descriptionWidth =
    activeWidth - cardPadding * 2 - titleWidth - activeLine;

  const inactiveLineGroupMargin =
    contentWidth - (lineMargin + lineWidth) - titleWidth;
  const lineGroupMarginLeft = isActive ? 0 : inactiveLineGroupMargin;

  return (
    <div
      ref={wrapperRef}
      style={{
        width: isActive ? activeWidth : width,
        height,
        position: 'relative',
        zIndex,
        transform: overflowShift > 0
          ? `translateX(-${overflowShift}px)`
          : undefined,
        transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      <div
        className={`course-card ${isActive ? 'active' : ''}`}
        style={{
          width: isActive ? activeWidth : width,
          height,
        }}
        role="button"
        tabIndex={0}
        onClick={(e) => {
          e.stopPropagation();
          onActivate();
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onActivate();
          }
        }}
      >
        <div
          className="title-wrapper"
          style={{ transform: titleTransform }}
        >
          <h3 ref={titleRef}>{title}</h3>
        </div>

        <div
          className="line-description-group"
          style={{ marginLeft: lineGroupMarginLeft }}
        >
          <div className="vertical-line" />
          <div
            className="description-area"
            style={{ width: isActive ? descriptionWidth : 0 }}
          >
            <div
              className="description-text"
              style={{ width: descriptionWidth }}
            >
              <p ref={descRef}>{description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}