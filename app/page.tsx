"use client";

import { useEffect, useRef } from "react";
import FloatingCard from "./components/FloatingCard";
import FloatingFlipCard from "./components/FloatingFlipCard";

const images = [
  "images/pfp/image.jpg",
  "images/pfp/image2.jpg",
  "images/pfp/image3.jpg",
  "images/pfp/image4.jpg",
  "images/pfp/image5.jpg",
  "images/pfp/image6.jpg",
];

const bgScrollSpeed = 0.25;
const abMeInitialWidth = 160;
const abMeInitialHeight = 50;
const disableAbMeProgress = 0.5;

export default function Home() {
  const backgroundRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const aboutButtonRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId = 0;

    const onScroll = () => {
      if (rafId) return;

      rafId = requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const progress = Math.min(scrollY / window.innerHeight, 1);

        // Background parallax
        if (backgroundRef.current) {
          backgroundRef.current.style.transform = `translateY(${scrollY * -bgScrollSpeed}px)`;
        }

        // About Me button scaling, color, and interactivity
        if (aboutButtonRef.current) {
          const btn = aboutButtonRef.current;

          const extraHeight = progress * 1250;
          const extraWidth = progress * 2250;

          const abMeTextScale = 1 + progress * 0.8;
          const contentTextScale = Math.min(progress * 1.2, 1);

          btn.style.width = `${abMeInitialWidth + extraWidth}px`;
          btn.style.height = `${abMeInitialHeight + extraHeight}px`;

          const disabledAbMe = progress > disableAbMeProgress;
          if (!disabledAbMe) {
            btn.classList.add("animate-flash-bg", "cursor-pointer");
            btn.style.pointerEvents = "auto";
          } else {
            btn.classList.remove("animate-flash-bg", "cursor-pointer");
            btn.style.pointerEvents = "none";
            btn.style.backgroundColor = "rgba(100,100,100,0.2)";
          }

          const textSpan = btn.querySelector("span");
          const arrowSpan = btn.querySelector("p");
          if (textSpan) {
            textSpan.style.transform = `scale(${abMeTextScale})`;
            textSpan.style.transformOrigin = "top";
          }
          if (arrowSpan) {
            arrowSpan.style.transform = `scale(${abMeTextScale})`;
            arrowSpan.style.transformOrigin = "top";
            arrowSpan.style.opacity = `${1 - progress * 2}`;
          }

          if (contentRef.current) {
            const contentOpacity = Math.max(0, progress * 2 - disableAbMeProgress);
            contentRef.current.style.opacity = `${contentOpacity}`;
            contentRef.current.style.transformOrigin = "top center";
            contentRef.current.style.transform = `
              translateY(${progress * 150}px)
              scale(${contentTextScale})
            `;
          }
        }

        rafId = 0;
      });
    };

    // Scroll snap logic
    const onWheel = (e: WheelEvent) => {

      const scrollY = window.scrollY;
      const vh = window.innerHeight;


      if (e.deltaY > 0 && scrollY < vh * 0.99) {
        window.scrollTo({ top: vh, behavior: "smooth" });
      }

      if (e.deltaY < 0 && scrollY > vh * 0.01) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", onWheel, { passive: true });

    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", onWheel);
    };
  }, []);

  return (
    <main className="relative w-full text-white overflow-hidden">
      {/* Background */}
      <div
        ref={backgroundRef}
        className="fixed inset-0 -z-10 bg-black h-[150vh] w-full
        bg-[radial-gradient(circle_at_20%_20%,#333_0%,transparent_40%),radial-gradient(circle_at_80%_30%,#222_0%,transparent_35%),radial-gradient(circle_at_50%_80%,#2a2a2a_0%,transparent_40%)]"
      />

      {/* Hero */}
      <div className="relative min-h-screen flex items-center justify-center ">
        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <FloatingCard width={550} height={250}>
            <div className="p-8 h-full flex flex-col justify-center">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                <div className="text-gray-300 text-5xl">Hi, I am</div>
                <div>Oscar Eriksen</div>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-gray-400 max-w-xl">
                I am a graduate CS student at Seattle University.
              </p>
            </div>
          </FloatingCard>
          

          <div className="flex justify-center md:justify-end">
            <FloatingFlipCard content={images} />
          </div>
        </div>

        <div
          ref={aboutButtonRef}
          onClick={() => aboutRef.current?.scrollIntoView({ behavior: "smooth" })}
          className="
            absolute
            top-[calc(100vh-100px)] left-1/2
            font-semibold text-gray-300 text-lg
            border-2 border-gray-500/50
            rounded-2xl
            origin-top
            overflow-hidden
            z-20
            flex justify-center
          "
          style={{
            transform: "translateX(-50%)",
            width: `${abMeInitialWidth}px`,
            height: `${abMeInitialHeight}px`,
            paddingTop: "9px",
          }}
        >
          <span className="absolute whitespace-nowrap inline-block">About Me</span>
          <p className="absolute whitespace-nowrap inline-block">↓ About Me ↓</p>
        </div>
      </div>

      {/* About content */}
      <div ref={aboutRef} className="min-h-[82vh] flex justify-center gap-150">
        <div
          ref={contentRef}
          className="w-full flex flex-col lg:flex-row justify-center gap-x-150 opacity-0"
        >
          <div className="max-w-4xl px-8 pt-24 text-center inline-block">
            <h1 className="text-3xl text-gray-200 leading-relaxed font-bold">
              PERSONAL
            </h1>
            <p className="mt-6 text-xl text-gray-300 max-w-xl">
              I am 21 years old and have spent nearly all of my life in Washington state. I have many hobbies, including 
              gaming, gymming, soccer, playing the guitar, listening to music, spending time with friends, and watching 
              twitch/youtube to name a few.
            </p>
          </div>

          <div className="max-w-4xl px-8 pt-24 text-center">
            <h1 className="text-3xl text-gray-200 leading-relaxed font-bold">
              PROFESSIONAL
            </h1>
            <p className="mt-6 text-xl text-gray-300 max-w-xl">
              My introduction to programming began in high school, where I learned Unity and built simple games using C#. 
              Since then, my interest in programming and technology has continued to grow, ultimately leading me to pursue 
              both a bachelor’s and a master’s degree in computer science. While exploring the many areas within the field, 
              I realized that I am most drawn to developing software that directly interacts with users. I am especially 
              interested in integrating AI into hardware systems to create practical, innovative applications. The future of 
              VR and AR excites me, along with broader computer vision technologies, and I am eager to contribute to these 
              areas and help shape what comes next.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
