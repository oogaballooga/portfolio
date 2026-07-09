'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import type { InterestCategory } from '../data/interests';

interface InterestCarouselProps {
  category: InterestCategory;
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

export default function InterestCarousel({ category }: InterestCarouselProps) {
  const { title, items } = category;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const itemCount = items.length;
  const currentItem = items[currentIndex];

  const goTo = useCallback(
    (index: number, dir: number) => {
      setDirection(dir);
      setCurrentIndex((index + itemCount) % itemCount);
    },
    [itemCount]
  );

  const goNext = useCallback(() => goTo(currentIndex + 1, 1), [currentIndex, goTo]);
  const goPrev = useCallback(() => goTo(currentIndex - 1, -1), [currentIndex, goTo]);

  // Auto-rotate every 5 seconds
  useEffect(() => {
    timerRef.current = setInterval(goNext, 5000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [goNext]);

  const pauseTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const resumeTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(goNext, 5000);
  }, [goNext]);

  const handlePrev = useCallback(() => {
    pauseTimer();
    goPrev();
    resumeTimer();
  }, [pauseTimer, goPrev, resumeTimer]);

  const handleNext = useCallback(() => {
    pauseTimer();
    goNext();
    resumeTimer();
  }, [pauseTimer, goNext, resumeTimer]);

  const handleImageError = useCallback((id: string) => {
    setImageErrors((prev) => new Set(prev).add(id));
  }, []);

  return (
    <div className="text-center">
      {/* Category title */}
      <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
        {title}
      </h3>

      {/* Image + arrows row */}
      <div className="flex items-center justify-center gap-2 mb-2">
        {/* Left arrow */}
        <button
          onClick={handlePrev}
          className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 text-gray-300 transition-colors"
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
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: 'easeInOut' }}
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
          className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 text-gray-300 transition-colors"
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
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="text-white font-semibold text-sm absolute inset-x-0"
          >
            {currentItem.name}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}