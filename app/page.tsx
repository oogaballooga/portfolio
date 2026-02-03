"use client";

import { useEffect, useRef } from "react";
import FloatingImageCard from "./components/FloatingImageCard";

const images = [
  "/pfp/image.jpg",
  "/pfp/image2.jpg",
  "/pfp/image3.jpg",
  "/pfp/image4.jpg",
  "/pfp/image5.jpg",
  "/pfp/image6.jpg",
];

const bgScrollSpeed = 0.25;
const abMeInitialWidth = 140;
const abMeInitialHeight = 50;

export default function Home() {
  const backgroundRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const aboutButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let rafId = 0;

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const onScroll = () => {
      if (rafId) return;

      rafId = requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const heroHeight = window.innerHeight;

        // Background parallax
        if (backgroundRef.current) {
          backgroundRef.current.style.transform = `translateY(${scrollY * -bgScrollSpeed}px)`;
        }

        // Progress
        const progress = Math.min(scrollY / heroHeight, 1);

        if (aboutButtonRef.current) {
          // Scale the text size slightly
          const extraHeight = progress * 1250; 
          const extraWidth = progress * 2250;
          const textScale = 1 + progress * 0.8; 

          // 2. Update Container
          // We keep the translateX to maintain centering
          aboutButtonRef.current.style.width = `${abMeInitialWidth + extraWidth}px`;
          aboutButtonRef.current.style.height = `${abMeInitialHeight + extraHeight}px`;

          // 3. Update Text Span
          const textSpan = aboutButtonRef.current.querySelector('span');
          if (textSpan) {
            textSpan.style.display = "inline-block"; // Required for transforms to work
            textSpan.style.transform = `scale(${textScale})`;
            textSpan.style.transformOrigin = "top"; // This is the correct property name
          }
        }

        rafId = 0;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main className="relative w-full text-white overflow-x-hidden">
      
      {/* Background */}
      <div
        ref={backgroundRef}
        className="fixed inset-0 -z-10 bg-black h-[150vh] w-full
        bg-[radial-gradient(circle_at_20%_20%,#333_0%,transparent_40%),radial-gradient(circle_at_80%_30%,#222_0%,transparent_35%),radial-gradient(circle_at_50%_80%,#2a2a2a_0%,transparent_40%)]"
      />

      {/* Hero */}
      <div className="relative min-h-screen flex items-center justify-center">
        <div className="max-w-6xl w-full px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              <div className="text-gray-300">Hi, I am</div>
              <div>Oscar Eriksen</div>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-gray-400 max-w-xl">
              I am a graduate CS student at Seattle University.
            </p>
          </div>

          <div className="flex justify-center md:justify-end">
            <FloatingImageCard images={images} interval={5000} />
          </div>
        </div>

        {/* About me button/header */}
        <button
          ref={aboutButtonRef}
          onClick={() => aboutRef.current?.scrollIntoView({ behavior: "smooth" })}
          className="
            absolute 
            top-[calc(100vh-100px)] left-1/2
            font-semibold text-gray-300 
            border-2 border-gray-500/50
            bg-[rgba(100,100,100,0.1)]
            rounded-2xl
            origin-top /* Ensures scaling happens downward */
            overflow-hidden
            z-20
            flex justify-center
          "
          style={{ 
            transform: "translateX(-50%)", 
            width: `${abMeInitialWidth}px`, 
            height: `${abMeInitialHeight}px`,
            paddingTop: '10px' // Keeps text at the top
          }}
        >
          <span className="whitespace-nowrap">About Me ↓</span>
        </button>
      </div>

      {/* About content */}
      <div
        ref={aboutRef}
        className="min-h-[85vh] flex items-center justify-center"
      >
        <div className="max-w-4xl px-8 pt-24">
          <p className="text-lg text-gray-400 leading-relaxed">
            blah blah blah blah blah blah blah blah blah blah blah blah
            blah blah blah blah blah blah blah blah blah blah blah blah
            blah blah blah blah blah blah blah blah blah blah blah blah
          </p>
        </div>
      </div>

    </main>
  );
}