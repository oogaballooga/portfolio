'use client';

import { useRef, useState, useLayoutEffect } from 'react';
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
  width = 280,
  height = 100,
  isActive,
  zIndex,
  onActivate,
}: CourseCardProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const [titleWidth, setTitleWidth] = useState(0);
  const [activeWidth, setActiveWidth] = useState(700);

  useLayoutEffect(() => {
    if (titleRef.current) {
      setTitleWidth(titleRef.current.offsetWidth);
    }
  }, [title]);

  useLayoutEffect(() => {
    if (isActive && descRef.current) {
      const descWidth = descRef.current.scrollWidth;
      const neededWidth = titleWidth + 31 + descWidth + 50;
      setActiveWidth(Math.max(700, Math.min(neededWidth, 900)));
    }
  }, [isActive, titleWidth, description]);

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
      style={{
        width: isActive ? activeWidth : width,
        height,
        position: 'relative',
        zIndex,
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