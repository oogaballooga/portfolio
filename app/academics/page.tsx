"use client";

import { useState, useEffect, useRef } from "react";
import FloatingCard from "../components/FloatingCard";
import './academics.css'

const bgScrollSpeed = 0.25;
const disableAbMeProgress = 0.5;

export default function Page() {
  const backgroundRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const aboutButtonRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [currZIndex, setCurrZIndex] = useState(100);
  const [cardZ, setCardZ] = useState<Record<number, number>>({});

  type CardConfig = { 
    id: number;
    restTop: string;
    restLeft: string;
    width: number | string;
    height: number | string;
    activeWidth: number;
    activeHeight: number;
    inactiveContent: React.ReactNode;
    activeContent: React.ReactNode;
  };

  const cards: CardConfig[] = [
    {id: 1,
      restTop: '35%',
      restLeft: '50%',
      width: 700,
      height: 300,
      activeWidth: 1000,
      activeHeight: 1000,
      inactiveContent: (
        <div className='p-5'>
          <h2 className="text-[2.15rem] font-bold mb-9">
            Master of Science in Computer Science
          </h2>

          <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-7 text-gray-200 font-bold text-[1.4rem]">
            <div className="text-right text-gray-300 font-normal">School:</div>
            <div>Seattle University</div>

            <div className="text-right text-gray-300 font-normal">Dates:</div>
            <div>Jan 2026 – Present (Dec 2026)</div>

            <div className="text-right text-gray-300 font-normal">GPA:</div>
            <div>4.0</div>
          </div>

          <img
            src="images/seattleuCrest.png"
            alt="Seattle University Crest"
            className="absolute bottom-8 right-12 w-40 opacity-85"
          />
        </div>
      ),
      activeContent: <div className="w-full h-full">Card 1 Active</div>,
    },
    {id: 2,
      restTop: '65%',
      restLeft: '50%',
      width: 670,
      height: 270,
      activeWidth: 1000,
      activeHeight: 1000,
      inactiveContent: (
        <div className='p-4'>
          <h2 className="text-[1.85rem] font-bold mb-5">
            Bachelor of Science in Computer Science
          </h2>

          <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-3 text-gray-200 font-bold text-[1.35rem]">
            <div className="text-right text-gray-300 font-normal">School:</div>
            <div>Seattle University</div>

            <div className="text-right text-gray-300 font-normal">Dates:</div>
            <div>Sept 2023 – Dec 2025</div>

            <div className="text-right text-gray-300 font-normal">GPA:</div>
            <div>3.8</div>

            <div className="text-right text-gray-300 font-normal">Honors:</div>
            <div>6x Quarterly Dean’s List</div>
          </div>

          <img
            src="images/seattleuCrest.png"
            alt="Seattle University Crest"
            className="absolute bottom-8 right-12 w-40 opacity-85"
          />
        </div>
      ),
      activeContent: <div className="w-full h-full">Card 2 Active</div>,
    },
  ];

  useEffect(() => {
    let rafId = 0;

    const onScroll = () => {
      if (rafId) return;

      rafId = requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const progress = Math.min(scrollY / (window.innerHeight), 1);

        // Background parallax
        if (backgroundRef.current) {
          backgroundRef.current.style.transform = `translateY(${scrollY * -bgScrollSpeed}px)`;
        }

        // About Me button scaling, color, and interactivity
        if (aboutButtonRef.current) {
          const btn = aboutButtonRef.current;

          const contentTextScale = Math.min(progress, 1);
          btn.classList.add("animate-flash-bg", "cursor-pointer");
          btn.style.pointerEvents = "auto";

          const textSpan = btn.querySelector("span");
          if (textSpan) {
            textSpan.style.transformOrigin = "top";
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

      if (e.deltaY > 0 && aboutRef.current) {
        // scroll directly to academics container top
        window.scrollTo({ 
          top: aboutRef.current.offsetTop, 
          behavior: "smooth" 
        });
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
    <main onClick={() => setActiveCard(null)} className="relative w-full text-white overflow-hidden">
      {/* Background */}
      <div
        ref={backgroundRef}
        className="fixed inset-0 -z-10 bg-black h-[150vh] w-full
        bg-[radial-gradient(circle_at_20%_20%,#333_0%,transparent_40%),radial-gradient(circle_at_80%_30%,#222_0%,transparent_35%),radial-gradient(circle_at_50%_80%,#2a2a2a_0%,transparent_40%)]"
      />

      {/* Hero */}
      <div className="relative min-h-screen flex items-start justify-center">
        <div className="absolute top-0 left-0 w-full h-full">
          {cards.map((card) => {
            const isActive = activeCard === card.id;
            return (
              <FloatingCard
                key={card.id}
                style={{
                  position: 'absolute',
                  top: isActive ? '50%' : card.restTop,
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  transition: 'top 0.4s ease, left 0.4s ease',
                  pointerEvents: activeCard !== null && !isActive ? 'none' : 'auto',
                  zIndex: cardZ[card.id] ?? 1,
                }}
                width={card.width}
                height={card.height}
                floatSpeed={20}
                activeWidth={card.activeWidth}
                activeHeight={card.activeHeight}
                isActive={isActive}
                hoverHighlight
                onActivate={() => {
                  setCurrZIndex(prev => {
                    const next = prev + 1;
                    setCardZ(z => ({ ...z, [card.id]: next }));
                    return next;
                  });
                  setActiveCard(card.id);
                }}

                onDeactivate={() => setActiveCard(null)}
              >
                <div className='w-full h-full border-4 border-gray-500/50 rounded-2xl flex flex-col text-white relative'>
                  {isActive ? card.activeContent : card.inactiveContent}
                </div>
              </FloatingCard>
            );
          })}

            {/* blur other cards when activeCard */}
            <div
              style={{
                position: "fixed",
                inset: 0,
                backdropFilter: activeCard ? "blur(6px)" : "blur(0px)",
                background: activeCard ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0)",
                transition: "backdrop-filter 0.4s ease, background 0.4s ease",
                zIndex: currZIndex - 1,
                pointerEvents: "none",
              }}
            />
        </div>

        <div
          ref={aboutButtonRef}
          onClick={() => contentRef.current?.scrollIntoView({ behavior: "smooth" })}
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
            width: `200px`,
            height: `50px`,
            paddingTop: "9px",
          }}
        >
          <span className="absolute whitespace-nowrap inline-block">Relevant Courses</span>
          <p className="absolute whitespace-nowrap inline-block">↓ Relevant Courses ↓</p>
        </div>
      </div>

      {/* About content */}
      <div ref={aboutRef} className="min-h-screen flex">
        <div
          ref={contentRef}
          className="w-full flex flex-col items-center"
        >
          <div className="academics-container w-full translate-y-[-7%]">

            <div className="academics-row">
              <div>Course</div>
              <div>
                Description
              </div>
            </div>
              
            <div className="academics-row">
              <div className="course-title">Artificial Intelligence</div>
              <div className="course-desc">
                Implemented search algorithms, constraint satisfaction problems, game-tree search (minimax with pruning), and knowledge representation techniques. Explored reasoning under uncertainty and heuristic optimization strategies.
              </div>
            </div>

            <div className="academics-row">
              <div className="course-title">Machine Learning</div>
              <div className="course-desc">
                Implemented supervised and unsupervised learning algorithms including linear regression, classification models, and clustering techniques. Focused on model evaluation, overfitting prevention, gradient-based optimization, and data preprocessing.
              </div>
            </div>

            <div className="academics-row">
              <div className="course-title">Capstone</div>
              <div className="course-desc">
                Led a full software development lifecycle project from requirements gathering to deployment. Applied version control, testing strategies, documentation standards, and collaborative team workflows.
              </div>
            </div>

            <div className="academics-row">
              <div className="course-title">Object-Oriented Development</div>
              <div className="course-desc">
                Built large-scale applications using object-oriented principles such as abstraction, encapsulation, inheritance, and polymorphism. Emphasized clean architecture, maintainability, and design patterns.
              </div>
            </div>

            <div className="academics-row">
              <div className="course-title">Parallel Computing</div>
              <div className="course-desc">
                Designed and implemented shared-memory and distributed-memory algorithms. Worked with synchronization primitives, MPI communication, workload partitioning, and scalability/performance analysis.
              </div>
            </div>

            <div className="academics-row">
              <div className="course-title">Tech Comm & Project Management</div>
              <div className="course-desc">
                Developed professional technical writing and presentation skills. Applied Agile methodologies, sprint planning, risk assessment, and stakeholder communication strategies.
              </div>
            </div>

            <div className="academics-row">
              <div className="course-title">Databases</div>
              <div className="course-desc">
                Designed relational database schemas and implemented complex SQL queries. Covered normalization, indexing, query optimization, ACID properties, and transaction management concepts.
              </div>
            </div>

            <div className="academics-row">
              <div className="course-title">Game Project</div>
              <div className="course-desc">
                Developed a complete interactive game using a modern game engine. Applied real-time systems programming, physics simulation, AI behavior design, and user experience considerations.
              </div>
            </div>

            <div className="academics-row">
              <div className="course-title">Algorithms</div>
              <div className="course-desc">
                Analyzed and implemented advanced algorithms including divide-and-conquer, greedy strategies, graph algorithms, and dynamic programming. Focused extensively on asymptotic analysis, correctness proofs, and optimization techniques.
              </div>
            </div>
            
            <div className="academics-row">
              <div className="course-title">Computing Systems</div>
              <div className="course-desc">
                Explored operating systems concepts including processes, threads, memory management, caching, and file systems. Gained hands-on experience with concurrency, synchronization, and low-level performance analysis.
              </div>
            </div>

            <div className="academics-row">
              <div className="course-title">Data Structures</div>
              <div className="course-desc">
                Implemented and analyzed arrays, linked lists, stacks, queues, trees, heaps, hash maps, and graphs. Focused heavily on time and space complexity analysis, algorithmic efficiency, and practical implementation tradeoffs.
              </div>
            </div>

            <div className="academics-row">
              <div className="course-title">Languages and Computation</div>
              <div className="course-desc">
                Covered automata theory, formal grammars, regular languages, context-free languages, Turing machines, and computability. Analyzed language recognition models and computational complexity classes.
              </div>
            </div>

            <div className="academics-row">
              <div className="course-title">Foundations of Computer Science</div>
              <div className="course-desc">
                Studied discrete mathematics including logic, proof techniques, set theory, combinatorics, and recurrence relations. Developed formal reasoning skills used in algorithm design and correctness proofs.
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}