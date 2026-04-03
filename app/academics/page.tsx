"use client";

import './academics.css';
import CourseCard from "../components/CourseCard";
import "../components/CourseCard.css";
import { useCardStack } from '../hooks/useCardStack';

export default function Page() {
  const { getCardProps, deactivate } = useCardStack();

  const courses = [
    { id: 1, activeWidth: 660, title: "Machine Learning",
      description: "Learned supervised and unsupervised learning algorithms including linear regression, classification models, and clustering techniques. Focused on model evaluation, overfitting prevention, gradient-based optimization, and data preprocessing." },
    { id: 2, activeWidth: 580, title: "Artificial Intelligence",
      description: "Covered search algorithms, game theory, heuristic optimization strategies, uncertainty, game-tree search (minimax with pruning), and more. Followed the UC Berkley AI Pacman exercises." },
    { id: 3, activeWidth: 520, title: "Algorithms",
      description: "Analyzed and implemented advanced algorithms including divide-and-conquer, greedy strategies, and dynamic programming. Focused on optimization techniques, and disguised programming problems." },
    { id: 4, activeWidth: 630, title: "Parallel Computing",
      description: "Implemented shared-memory and distributed-memory algorithms. Worked with synchronization primitives, MPI communication, workload partitioning, and scalability performance analysis. Worked in both C++ and CUDA." },
    { id: 5, activeWidth: 605, title: "Capstone Project",
      description: "Created an app from scratch for a local business to reduce fabric waste. Learned full-stack development, UI/UX design, project management, team collaboration, how to communicate with sponsors, Flutter, and Firebase." },
    { id: 6, activeWidth: 510, title: "Game Project",
      description: "Created a space game using Godot. Worked on physics simulation, sound design, enemy AI, and shaders. Learned shader programming, design patterns, and game architecture." },
    { id: 7, activeWidth: 590, title: "Object-Oriented Dev",
      description: "Thoroughly covered object-oriented principles such as abstraction, encapsulation, inheritance, composition, and polymorphism. Emphasized clean architecture, maintainability, and design patterns." },
    { id: 8, activeWidth: 635, title: "Tech Communication",
      description: "Developed professional technical writing and presentation skills. Learned Agile methodologies, sprint planning, risk assessment, and stakeholder communication strategies to apply to my capstone project." },
    { id: 9, activeWidth: 540, title: "Databases",
      description: "Designed relational database schemas and implemented complex SQL queries. Covered indexing, query optimization, ACID properties, and made a small HTML website to test the database I created." },
    { id: 10, activeWidth: 670, title: "Languages and Computation",
      description: "Covered automata theory, formal grammars, regular languages, context-free languages, Turing machines, and computability. Analyzed language recognition models and computational complexity classes." },
    { id: 11, activeWidth: 600, title: "Data Structures",
      description: "Implemented and analyzed arrays, linked lists, stacks, queues, trees, heaps, hash maps, and graphs. Focused heavily on time and space complexity analysis, algorithmic efficiency, and practical implementation tradeoffs." },
    { id: 12, activeWidth: 560, title: "Computing Systems",
      description: "Explored operating systems concepts including processes, threads, memory management, caching, and file systems. Also, briefly covered computer networks and the OSI model." },
    { id: 13, activeWidth: 590, title: "Foundations of CS",
      description: "Studied discrete mathematics including logic, proof techniques, set theory, combinatorics, and recurrence relations. Developed formal reasoning skills used in algorithm design and correctness proofs." },
    { id: 14, activeWidth: 590, title: "Computer Organization",
      description: "Covered computer architecture, instruction sets, memory hierarchy, system design principles, and assembly. Learned about CPU design, cache memory, and data representation." },
  ];

  return (
    <main onClick={deactivate} className="relative min-h-screen text-white">
      {/* Background */}
      <div
        className="fixed inset-0 -z-10 bg-black
        bg-[radial-gradient(circle_at_20%_20%,#333_0%,transparent_40%),radial-gradient(circle_at_80%_30%,#222_0%,transparent_35%),radial-gradient(circle_at_50%_80%,#2a2a2a_0%,transparent_40%)]"
      />

      {/* Headers */}
      <h1 className="text-[3.5rem] font-bold mb-12 absolute top-[13%] left-[20%] translate-x-[-50%] translate-y-[-50%] text-gray-300">
        Degrees
      </h1>
      <h1 className="text-[3.5rem] font-bold mb-12 absolute top-[13%] left-[67%] translate-x-[-50%] translate-y-[-50%] text-gray-300">
        Relevant Courses
      </h1>

      {/* Masters Degree */}
      <div className="border-5 border-[rgb(100,100,100)] rounded-3xl p-5 bg-black absolute top-[37%] left-[20%] translate-x-[-50%] translate-y-[-50%]">
        <h2 className="text-[2.15rem] font-bold mb-9 text-white">
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

      {/* Bachelors Degree */}
      <div className="border-5 border-[rgb(100,100,100)] rounded-3xl p-5 bg-black absolute top-[67%] left-[20%] translate-x-[-50%] translate-y-[-50%]">
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
          <div>6x Quarterly Dean's List</div>
        </div>
        <img
          src="images/seattleuCrest.png"
          alt="Seattle University Crest"
          className="absolute bottom-8 right-12 w-40 opacity-85"
        />
      </div>

      {/* Relevant Courses */}
      <div className="grid-wrapper absolute top-[22%] left-[67%] translate-x-[-50%]">
        <div className="course-grid">
          {courses.map((course) => {
            const { isActive, zIndex, disabled, onActivate, onDeactivate } = getCardProps(course.id);
            return (
              <CourseCard
                key={course.id}
                {...course}
                style={{
                  pointerEvents: disabled ? 'none' : 'auto',
                  zIndex,
                }}
                activeWidth={course.activeWidth}
                isActive={isActive}
                onActivate={() => {
                  // CourseCard toggles off when clicking an already-active card
                  if (isActive) onDeactivate();
                  else onActivate();
                }}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
}