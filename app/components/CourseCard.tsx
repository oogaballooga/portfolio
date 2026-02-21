"use client";

import { useRef, useState, useLayoutEffect, CSSProperties } from 'react';
import "./CourseCard.css";

type Props = {
  id: number;
  title: string;
  description: string;
  width?: number;
  height?: number;
  activeWidth?: number;
  isActive?: boolean;
  onActivate?: () => void;
  style?: CSSProperties;
};

export default function CourseCard({
  title,
  description,
  width = 250,
  height = 100,
  activeWidth = 420,
  isActive = false,
  onActivate,
  style,
}: Props) {
  const titleRef = useRef<HTMLDivElement>(null);
  const [titleWidth, setTitleWidth] = useState(0);

  useLayoutEffect(() => {
    if (titleRef.current) {
      setTitleWidth(titleRef.current.offsetWidth);
    }
  }, [title]);

  const cardPadding = 25;
  const lineMargin = 15; // margin on each side of the vertical line when active
  const lineWidth = 1;
  const activeLine = lineWidth + lineMargin * 2; // 31px total

  // When inactive: center the title in the card
  const contentWidth = width - cardPadding * 2;
  const centerOffset = (contentWidth / 2) - (titleWidth / 2);
  const titleTransform = isActive ? 'translateX(0)' : `translateX(${centerOffset}px)`;

  // Description area width when active
  const descriptionWidth = activeWidth - cardPadding * 2 - titleWidth - activeLine;

  const inactiveLineGroupMargin = contentWidth - (lineMargin + lineWidth) - titleWidth;
  const lineGroupMarginLeft = isActive ? 0 : inactiveLineGroupMargin;

  return (
    <div style={{ width, height, position: 'relative' }}>
      <div
        className={`course-card ${isActive ? "active" : ""}`}
        style={{
          ...style,
          width: isActive ? activeWidth : width,
          height,
        }}
        onClick={(e) => {
          e.stopPropagation();
          onActivate?.();
        }}
      >
        {/* Title — transforms to center when inactive */}
        <div
          ref={titleRef}
          className="title-wrapper"
          style={{ transform: titleTransform }}
        >
          <h3>{title}</h3>
        </div>

        {/* Line + description group — slides to right edge when inactive */}
        <div
          className="line-description-group"
          style={{ marginLeft: lineGroupMarginLeft }}
        >
          <div
            className="vertical-line"
          />

          <div
            className="description-area"
            style={{ width: isActive ? descriptionWidth : 0 }}
          >
            <div className="description-text" style={{ width: descriptionWidth }}>
              <p>{description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}