'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import type { InterestCategory } from '../data/interests';

interface InterestCarouselProps {
  category: InterestCategory;
  isPaused?: boolean;
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -80 : 80,
    opacity: 0,
  }),
};

const reducedMotionSlideVariants = {
  enter: { x: 0, opacity: 1 },
  center: { x: 0, opacity: 1 },
  exit: { x: 0, opacity: 1 },
};

export default function InterestCarousel({ category, isPaused = false }: InterestCarouselProps) {
  const { title, items } = category;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const [isDocumentHidden, setIsDocumentHidden] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);

  const itemCount = items.length;
  const currentItem = items[currentIndex];
  const carouselVariants = prefersReducedMotion ? reducedMotionSlideVariants : slideVariants;
  const carouselTransition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.35, ease: 'easeInOut' as const };

  const goTo = useCallback(
    (index: number, dir: number) => {
      setDirection(dir);
      setCurrentIndex((index + itemCount) % itemCount);
    },
    [itemCount]
  );

  const goNext = useCallback(() => goTo(currentIndex + 1, 1), [currentIndex, goTo]);
  const goPrev = useCallback(() => goTo(currentIndex - 1, -1), [currentIndex, goTo]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');
    const updateIsMobile = () => setIsMobile(mediaQuery.matches);
    const updateVisibility = () => setIsDocumentHidden(document.hidden);

    updateIsMobile();
    updateVisibility();
    mediaQuery.addEventListener('change', updateIsMobile);
    document.addEventListener('visibilitychange', updateVisibility);
    return () => {
      mediaQuery.removeEventListener('change', updateIsMobile);
      document.removeEventListener('visibilitychange', updateVisibility);
    };
  }, []);

  // Auto-rotate only while visible and not being used. Mobile users advance explicitly.
  useEffect(() => {
    if (isPaused || isMobile || prefersReducedMotion || isDocumentHidden || isInteracting) return;
    const timerId = setInterval(goNext, 5000);
    return () => clearInterval(timerId);
  }, [goNext, isDocumentHidden, isInteracting, isMobile, isPaused, prefersReducedMotion]);

  const handlePrev = useCallback(() => {
    goPrev();
  }, [goPrev]);

  const handleNext = useCallback(() => {
    goNext();
  }, [goNext]);

  const handleImageError = useCallback((id: string) => {
    setImageErrors((prev) => new Set(prev).add(id));
  }, []);

  return (
    <div
      className="flex flex-col justify-end text-center"
      onFocusCapture={() => setIsInteracting(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setIsInteracting(false);
      }}
      onPointerDown={() => setIsInteracting(true)}
      onPointerUp={() => setIsInteracting(false)}
      onPointerCancel={() => setIsInteracting(false)}
    >
      {/* Category title */}
      <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
        {title}
      </h3>

      {/* Image + arrows row */}
      <div className="flex items-center justify-center gap-2 mb-2">
        {/* Left arrow */}
        <button
          onClick={handlePrev}
          className="flex-shrink-0 w-8 h-8 max-md:w-11 max-md:h-11 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 text-gray-300 transition-colors cursor-pointer"
          aria-label={`Previous ${title}`}
        >
          ‹
        </button>

        {/* Image with slide animation */}
        <div className="relative w-28 h-28 flex-shrink-0 rounded-xl overflow-hidden border-2 border-gray-500/50">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentItem.id}
              custom={direction}
              variants={carouselVariants}
              initial={prefersReducedMotion ? false : 'enter'}
              animate="center"
              exit="exit"
              transition={carouselTransition}
              className="absolute inset-0"
            >
              {imageErrors.has(currentItem.id) ? (
                <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                  <span className="text-gray-500 text-xs text-center px-2">
                    {currentItem.name}
                  </span>
                </div>
              ) : (
                <Image
                  src={currentItem.image}
                  alt={currentItem.name}
                  fill
                  sizes="112px"
                  className="object-cover"
                  onError={() => handleImageError(currentItem.id)}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right arrow */}
        <button
          onClick={handleNext}
          className="flex-shrink-0 w-8 h-8 max-md:w-11 max-md:h-11 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 text-gray-300 transition-colors cursor-pointer"
          aria-label={`Next ${title}`}
        >
          ›
        </button>
      </div>

      {/* Item name with slide animation */}
      <div className="relative h-5 overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
            <motion.p
              key={currentItem.id}
              custom={direction}
              variants={carouselVariants}
              initial={prefersReducedMotion ? false : 'enter'}
              animate="center"
              exit="exit"
              transition={carouselTransition}
              className="text-white font-semibold text-sm absolute inset-x-0"
            >
            {currentItem.name}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
