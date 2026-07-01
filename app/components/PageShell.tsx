'use client';

import { type ReactNode, useRef, useEffect } from 'react';

interface PageShellProps {
  yIndex: number;
  pageId: string;
  children: ReactNode;
  onScrollRef?: (pageId: string, ref: HTMLDivElement | null) => void;
}

export default function PageShell({
  yIndex,
  pageId,
  children,
  onScrollRef,
}: PageShellProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (onScrollRef) {
      onScrollRef(pageId, scrollRef.current);
    }
    return () => {
      if (onScrollRef) {
        onScrollRef(pageId, null);
      }
    };
  }, [pageId, onScrollRef]);

  return (
    <div
      id={pageId}
      ref={scrollRef}
      className="page-shell"
      style={{ transform: `translateY(${yIndex * 100}vh)` }}
    >
      {children}
    </div>
  );
}