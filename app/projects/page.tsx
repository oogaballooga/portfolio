'use client';

import FloatingClickCard from '../components/FloatingClickCard';
import { useCardStack } from '../hooks/useCardStack';

export default function Projects() {
  const { activeCard, overlayZIndex, getCardProps, deactivate } = useCardStack();

  type CardConfig = {
    id: number;
    restTop: string;
    restLeft: string;
    width: number;
    height: number;
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
        <div className="p-5">
          <h2 className="text-[2.15rem] font-bold mb-7 text-center">
            Mobile App for Local Business
          </h2>
          <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-7 text-gray-200 text-[1.4rem]">
            <div className="text-right text-gray-300 font-normal">Description:</div>
            <div>Capstone Project; A mobile app for a local company</div>
            <div className="text-right text-gray-300 font-normal">Skills:</div>
            <div>Architecture design, DevOps, Agile teamwork, Client communication</div>
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
        <div className="p-4">
          <h2 className="text-[2.15rem] font-bold mb-5 text-center">
            Portfolio website
          </h2>
          <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-7 text-gray-200 text-[1.4rem]">
            <div className="text-right text-gray-300 font-normal">Description:</div>
            <div>Developed a personal portfolio using custom UI components without external React libraries</div>
            <div className="text-right text-gray-300 font-normal">Skills:</div>
            <div>UX/UI design, Component architecture</div>
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
      height: 325,
      activeWidth: 1000,
      activeHeight: 1000,
      inactiveContent: (
        <div className="p-4">
          <h2 className="text-[2.15rem] font-bold mb-5 text-center">
            Company Internal Website Redesign
          </h2>
          <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-7 text-gray-200 text-[1.4rem]">
            <div className="text-right text-gray-300 font-normal">Description:</div>
            <div>Redesigned an internal company website during my internship with iterative employee feedback</div>
            <div className="text-right text-gray-300 font-normal">Skills:</div>
            <div>Self-directed learning, UI/UX design, Documentation, Stakeholder presentation</div>
            <div className="text-right text-gray-300 font-normal">Tech:</div>
            <div>React, Tailwind CSS, REST API, Vercel</div>
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
        <div className="p-4">
          <h2 className="text-[2.15rem] font-bold mb-5 text-center">
            ML Heart Failure Dataset Analysis
          </h2>
          <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-7 text-gray-200 text-[1.4rem]">
            <div className="text-right text-gray-300 font-normal">Description:</div>
            <div>Analyzed records using machine learning techniques to identify key predictors of heart failure mortality</div>
            <div className="text-right text-gray-300 font-normal">Skills:</div>
            <div>Model evaluation, Data analysis, Feature selection</div>
            <div className="text-right text-gray-300 font-normal">Tech:</div>
            <div>Python, Pandas</div>
          </div>
        </div>
      ),
      activeContent: <div className="w-full h-full">Card 4 Active</div>,
    },
  ];

  return (
    <main onClick={deactivate} className="relative w-full text-white overflow-hidden">
      {/* Background */}
      <div
        className="fixed inset-0 -z-10 bg-black h-[150vh] w-full
          bg-[radial-gradient(circle_at_20%_20%,#333_0%,transparent_40%),radial-gradient(circle_at_80%_30%,#222_0%,transparent_35%),radial-gradient(circle_at_50%_80%,#2a2a2a_0%,transparent_40%)]"
      />

      {cards.map((card) => {
        const { isActive, zIndex, disabled, onActivate, onDeactivate } = getCardProps(card.id);
        return (
          <FloatingClickCard
            key={card.id}
            id={card.id}
            restTop={card.restTop}
            restLeft={card.restLeft}
            width={card.width}
            height={card.height}
            activeWidth={card.activeWidth}
            activeHeight={card.activeHeight}
            floatSpeed={20}
            inactiveContent={card.inactiveContent}
            activeContent={card.activeContent}
            isActive={isActive}
            disabled={disabled}
            onActivate={onActivate}
            onDeactivate={onDeactivate}
            style={{ zIndex }}
          />
        );
      })}

      {/* Blur overlay when a card is active */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          backdropFilter: activeCard ? 'blur(6px)' : 'blur(0px)',
          background: activeCard ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0)',
          transition: 'backdrop-filter 0.4s ease, background 0.4s ease',
          zIndex: overlayZIndex,
          pointerEvents: 'none',
        }}
      />
    </main>
  );
}