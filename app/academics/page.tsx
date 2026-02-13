'use client';

import { useState } from 'react';
import FloatingCard from '../components/FloatingCard';

export default function Page() {
  const [activeCard, setActiveCard] = useState<number | null>(null);

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
      restTop: '20%',
      restLeft: '50%',
      width: 700,
      height: 300,
      activeWidth: 1000,
      activeHeight: 1000,
      inactiveContent: (
        <div className='p-5'>
          <h2 className="text-[2.15rem] font-bold mb-5">
            Master of Science in Computer Science
          </h2>

          <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-3 text-gray-200 font-bold text-[1.4rem]">
            <div className="text-right text-gray-300 font-normal">School:</div>
            <div>Seattle University</div>

            <div className="text-right text-gray-300 font-normal">Dates:</div>
            <div>Jan 2026 – Present (Dec 2026)</div>

            <div className="text-right text-gray-300 font-normal">GPA:</div>
            <div>4.0</div>

            <div className="text-right text-gray-300 font-normal">Honors:</div>
            <div></div>
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
    {
      id: 2,
      restTop: '47%',
      restLeft: '50%',
      width: 670,
      height: 270,
      activeWidth: 700,
      activeHeight: 450,
      inactiveContent: (
        <div className='p-4'>
          <h2 className="text-[1.7rem] font-bold mb-5">
            Bachelor of Science in Computer Science
          </h2>

          <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-3 text-gray-200 font-bold text-[1.35rem]">
            <div className="text-right text-gray-300 font-normal">School:</div>
            <div>Seattle University</div>

            <div className="text-right text-gray-300 font-normal">Dates:</div>
            <div>Sept 2023 – Dec 2025</div>

            <div className="text-right text-gray-300 font-normal">GPA:</div>
            <div>3.9</div>

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
    {
      id: 3,
      restTop: '70%',
      restLeft: '50%',
      width: 630,
      height: 230,
      activeWidth: 700,
      activeHeight: 450,
      inactiveContent: (
        <div className='p-4'>
          <h2 className="text-[1.7rem] font-bold mb-5">
            Associate in Arts and Sciences
          </h2>

          <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-3 text-gray-200 font-bold text-[1.4rem]">
            <div className="text-right text-gray-300 font-normal">School:</div>
            <div>Bellevue College</div>

            <div className="text-right text-gray-300 font-normal">Dates:</div>
            <div>Sept 2021 – June 2023</div>

            <div className="text-right text-gray-300 font-normal">GPA:</div>
            <div>3.7</div>
          </div>

          <img
            src="images/bellevuecollegeCrest.png"
            alt="Seattle University Crest"
            className="absolute bottom-6 right-7 w-40 opacity-85"
          />
        </div>
      ),
      activeContent: <div className="w-full h-full">Card 3 Active</div>,
    },
    {
      id: 4,
      restTop: '90%',
      restLeft: '50%',
      width: 600,
      height: 200,
      activeWidth: 700,
      activeHeight: 450,
      inactiveContent: (
        <div className='p-3'>
          <h2 className="text-[1.5rem] font-bold mb-5">
            High School Gradutate
          </h2>

          <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-3 text-gray-200 font-bold text-[1.2rem]">
            <div className="text-right text-gray-300 font-normal">School:</div>
            <div>Mount Si High School</div>

            <div className="text-right text-gray-300 font-normal">Dates:</div>
            <div>Sept 2019 – June 2021</div>

            <div className="text-right text-gray-300 font-normal">GPA:</div>
            <div></div>
          </div>

          <img
            src="images/mountsiCrest.png"
            alt="Seattle University Crest"
            className="absolute bottom-8 right-12 w-40 opacity-85"
          />
        </div>
      ),
      
      activeContent: <div className="w-full h-full">Card 4 Active</div>,
    },
  ];

  return (
    <div
      onClick={() => setActiveCard(null)}
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
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
              zIndex: isActive ? 100 : 'auto',
            }}
            width={card.width}
            height={card.height}
            floatSpeed={20}
            activeWidth={card.activeWidth}
            activeHeight={card.activeHeight}
            isActive={isActive}
            hoverHighlight
            onActivate={() => setActiveCard(card.id)}
            onDeactivate={() => setActiveCard(null)}
          >
            <div className='w-full h-full border-4 border-gray-500/50 rounded-2xl flex flex-col text-white relative'>
              {isActive ? card.activeContent : card.inactiveContent}
            </div>
          </FloatingCard>
        );
      })}
    </div>
  );
}