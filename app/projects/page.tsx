'use client';

import { useState } from 'react';
import FloatingCard from '../components/FloatingCard';

export default function Projects() {
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
    {
      id: 1,
      restTop: '30%',
      restLeft: '33%',
      width: 700,
      height: 300,
      activeWidth: 1000,
      activeHeight: 1000,
      inactiveContent: (
        <div className='p-5'>
          <h2 className="text-[2.15rem] font-bold mb-7 text-center">
            Mobile App for Local Business
          </h2>

          <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-7 text-gray-200 text-[1.4rem]">
            <div className="text-right text-gray-300 font-normal">Description:</div>
            <div>Created a mobile app for Our Fabric Stash to help manage customer's fabric inventory</div>

            <div className="text-right text-gray-300 font-normal">Skills:</div>
            <div>Agile, Sprint planning, Architecture diagrams, Sponsor meetings </div>

            <div className="text-right text-gray-300 font-normal">Tech:</div>
            <div>Flutter, Dart, Firebase</div>
          </div>
        </div>
      ),
      activeContent: <div className="w-full h-full">Card 1 Active</div>,
    },
    {
      id: 2,
      restTop: '30%',
      restLeft: '66%',
      width: 700,
      height: 300,
      activeWidth: 1000,
      activeHeight: 1000,
      inactiveContent: (
        <div className='p-4'>
          <h2 className="text-[2.15rem] font-bold mb-5 text-center">
            Portfolio website
          </h2>

          <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-7 text-gray-200 text-[1.4rem]">
            <div className="text-right text-gray-300 font-normal">Description:</div>
            <div>Created my personal portfolio website to showcase my academics, projects, and skills</div>

            <div className="text-right text-gray-300 font-normal">Skills:</div>
            <div>UX/UI design, Component design </div>

            <div className="text-right text-gray-300 font-normal">Tech:</div>
            <div>React, Next.js, Tailwind CSS</div>
          </div>
        </div>
      ),
      activeContent: <div className="w-full h-full">Card 2 Active</div>,
    },
    {
      id: 3,
      restTop: '60%',
      restLeft: '33%',
      width: 700,
      height: 300,
      activeWidth: 1000,
      activeHeight: 1000,
      inactiveContent: (
        <div className='p-4'>
          <h2 className="text-[2.15rem] font-bold mb-5 text-center">
            Company Internal Website Redesign
          </h2>

          <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-7 text-gray-200 text-[1.4rem]">
            <div className="text-right text-gray-300 font-normal">Description:</div>
            <div>Redesigned an internal website to improve user experience and accessibility during my internship</div>

            <div className="text-right text-gray-300 font-normal">Skills:</div>
            <div>UX/UI design, Component design </div>

            <div className="text-right text-gray-300 font-normal">Tech:</div>
            <div>React, Vercel, Tailwind CSS, REST API</div>
          </div>
        </div>
      ),
      activeContent: <div className="w-full h-full">Card 3 Active</div>,
    },
    {
      id: 4,
      restTop: '60%',
      restLeft: '66%',
      width: 700,
      height: 300,
      activeWidth: 1000,
      activeHeight: 1000,
      inactiveContent: (
        <div className='p-4'>
          <h2 className="text-[2.15rem] font-bold mb-5 text-center">
            ML Heart Failure Dataset Analysis
          </h2>

          <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-7 text-gray-200 text-[1.4rem]">
            <div className="text-right text-gray-300 font-normal">Description:</div>
            <div></div>

            <div className="text-right text-gray-300 font-normal">Skills:</div>
            <div></div>

            <div className="text-right text-gray-300 font-normal">Tech:</div>
            <div></div>
          </div>
        </div>
      ),
      activeContent: <div className="w-full h-full">Card 4 Active</div>,
    },
  ];

  return (
    
    <main onClick={() => setActiveCard(null)} className="relative w-full text-white overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 -z-10 bg-black h-[150vh] w-full
        bg-[radial-gradient(circle_at_20%_20%,#333_0%,transparent_40%),radial-gradient(circle_at_80%_30%,#222_0%,transparent_35%),radial-gradient(circle_at_50%_80%,#2a2a2a_0%,transparent_40%)]"
      />
      {cards.map((card) => {
        const isActive = activeCard === card.id;
        return (
          <FloatingCard
            key={card.id}
            style={{
              position: 'fixed',
              top: isActive ? '50%' : card.restTop,
              left: isActive ? '50%' : card.restLeft,
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
    </main>
  );
}