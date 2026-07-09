import type { Education } from '../types/content';

export const education: Education = {
  id: 'ms-cs-seattleu',
  school: 'Seattle University',
  degree: 'Master of Science in Computer Science',
  field: 'Computer Science',
  startDate: 'Jan 2026',
  endDate: 'Dec 2026',
  gpa: 4.0,
  logo: 'images/seattleuCrest.webp',
  courses: [
    {
      id: 'machine-learning',
      title: 'Machine Learning',
      description:
        'Learned supervised and unsupervised learning algorithms including linear regression, classification models, and clustering techniques. Focused on model evaluation, overfitting prevention, gradient-based optimization, and data preprocessing.',
    },
    {
      id: 'artificial-intelligence',
      title: 'Artificial Intelligence',
      description:
        'Covered search algorithms, game theory, heuristic optimization strategies, uncertainty, game-tree search (minimax with pruning), and more. Followed the UC Berkley AI Pacman exercises.',
    },
    {
      id: 'algorithms',
      title: 'Algorithms',
      description:
        'Analyzed and implemented advanced algorithms including divide-and-conquer, greedy strategies, and dynamic programming. Focused on optimization techniques, and disguised programming problems.',
    },
    {
      id: 'parallel-computing',
      title: 'Parallel Computing',
      description:
        'Implemented shared-memory and distributed-memory algorithms. Worked with synchronization primitives, MPI communication, workload partitioning, and scalability performance analysis. Worked in both C++ and CUDA.',
    },
    {
      id: 'capstone-project',
      title: 'Capstone Project',
      description:
        'Created an app from scratch for a local business to reduce fabric waste. Learned full-stack development, UI/UX design, project management, team collaboration, how to communicate with sponsors, Flutter, and Firebase.',
    },
    {
      id: 'game-project',
      title: 'Game Project',
      description:
        'Created a space game using Godot. Worked on physics simulation, sound design, enemy AI, and shaders. Learned shader programming, design patterns, and game architecture.',
    },
    {
      id: 'object-oriented-dev',
      title: 'Object-Oriented Dev',
      description:
        'Thoroughly covered object-oriented principles such as abstraction, encapsulation, inheritance, composition, and polymorphism. Emphasized clean architecture, maintainability, and design patterns.',
    },
    {
      id: 'tech-communication',
      title: 'Tech Communication',
      description:
        'Developed professional technical writing and presentation skills. Learned Agile methodologies, sprint planning, risk assessment, and stakeholder communication strategies to apply to my capstone project.',
    },
    {
      id: 'databases',
      title: 'Databases',
      description:
        'Designed relational database schemas and implemented complex SQL queries. Covered indexing, query optimization, ACID properties, and made a small HTML website to test the database I created.',
    },
    {
      id: 'languages-computation',
      title: 'Languages and Computation',
      description:
        'Covered automata theory, formal grammars, regular languages, context-free languages, Turing machines, and computability. Analyzed language recognition models and computational complexity classes.',
    },
    {
      id: 'data-structures',
      title: 'Data Structures',
      description:
        'Implemented and analyzed arrays, linked lists, stacks, queues, trees, heaps, hash maps, and graphs. Focused heavily on time and space complexity analysis, algorithmic efficiency, and practical implementation tradeoffs.',
    },
    {
      id: 'computing-systems',
      title: 'Computing Systems',
      description:
        'Explored operating systems concepts including processes, threads, memory management, caching, and file systems. Also, briefly covered computer networks and the OSI model.',
    },
    {
      id: 'foundations-cs',
      title: 'Foundations of CS',
      description:
        'Studied discrete mathematics including logic, proof techniques, set theory, combinatorics, and recurrence relations. Developed formal reasoning skills used in algorithm design and correctness proofs.',
    },
    {
      id: 'computer-organization',
      title: 'Computer Organization',
      description:
        'Covered computer architecture, instruction sets, memory hierarchy, system design principles, and assembly. Learned about CPU design, cache memory, and data representation.',
    },
  ],
};

export const bachelorsEducation: Education = {
  id: 'bs-cs-seattleu',
  school: 'Seattle University',
  degree: 'Bachelor of Science in Computer Science',
  field: 'Computer Science',
  startDate: 'Sept 2023',
  endDate: 'Dec 2025',
  gpa: 3.8,
  honors: ["6x Quarterly Dean's List"],
  logo: 'images/seattleuCrest.webp',
  courses: [],
};