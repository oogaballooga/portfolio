import type { Education, Course } from '../types/content';

export const mastersEducation: Education = {
  id: 'ms-cs-seattleu',
  school: 'Seattle University',
  degree: 'Master of Science in Computer Science',
  field: 'Computer Science',
  startDate: 'Jan 2026',
  endDate: 'Dec 2026',
  gpa: 3.7,
  honors: ['Student Grader'],
  logo: 'images/seattleuCrest.webp',
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
};

export const courses: Course[] = [
  {
    id: 'large-language-models',
    title: 'Large Language Models',
    description:
      'Followed "Build a Large Language Model (From Scratch)" by Sebastian Raschka. Implemented transformer architectures from the ground up including multi-head attention and positional encoding. Covered modern LLM techniques such as quantization, mixture of experts (MoE), fine-tuning strategies, and efficient inference.',
  },
  {
    id: 'advanced-machine-learning',
    title: 'Advanced Machine Learning',
    description:
      'Each week covered a new topic in modern machine learning, including CNNs for image classification, auto-encoders for representation learning, GANs for generative modeling, and the YOLO algorithm for real-time object detection. Emphasized hands-on implementation and evaluation of state-of-the-art models.',
  },
  {
    id: 'artificial-intelligence',
    title: 'Artificial Intelligence',
    description:
      'Covered search algorithms, game theory, heuristic optimization strategies, uncertainty, game-tree search (minimax with pruning), and more. Followed the UC Berkley AI Pacman exercises.',
  },
  {
    id: 'machine-learning',
    title: 'Machine Learning',
    description:
      'Learned supervised and unsupervised learning algorithms including linear regression, classification models, and clustering techniques. Focused on model evaluation, overfitting prevention, gradient-based optimization, and data preprocessing.',
  },
  {
    id: 'robotics-development',
    title: 'Robotics Software Development',
    description:
      'Explored modern robotic software techniques and architectures. Used ROS 2 and Gazebo Harmonic to design, simulate, and test a fully autonomous robot in a virtual environment. Delivered a recorded presentation and developed a public GitHub repository showcasing simulation demos and project documentation.',
  },
  {
    id: 'capstone-project',
    title: 'Capstone Project',
    description:
      'Created an app from scratch for a local business to reduce fabric waste. Learned full-stack development, UI/UX design, project management, team collaboration, how to communicate with sponsors, Flutter, and Firebase.',
  },
  {
    id: 'mobile-development',
    title: 'Mobile Software Development',
    description:
      'Developed cross-platform mobile applications using Flutter and Dart. Built a solo app from concept to completion and collaborated with a classmate on a second app. Focused on responsive UI design, state management, and platform-specific APIs.',
  },
  {
    id: 'software-architecture',
    title: 'Software Architecture and Design',
    description:
      'Learned how to design and plan for long-term development projects with emphasis on clean architecture, separation of concerns, and scalability. Completed both a solo REST API and a group API project following structured planning methodologies, technical documentation, and iterative design reviews.',
  },
  {
    id: 'parallel-computing',
    title: 'Parallel Computing',
    description:
      'Implemented shared-memory and distributed-memory algorithms. Worked with synchronization primitives, MPI communication, workload partitioning, and scalability performance analysis. Worked in both C++ and CUDA.',
  },
  {
    id: 'game-project',
    title: 'Game Project',
    description:
      'Created a space game using Godot. Worked on physics simulation, sound design, enemy AI, and shaders. Learned shader programming, design patterns, and game architecture.',
  },
  {
    id: 'algorithms',
    title: 'Algorithms',
    description:
      'Analyzed and implemented advanced algorithms including divide-and-conquer, greedy strategies, and dynamic programming. Focused on optimization techniques, and disguised programming problems.',
  },
  {
    id: 'databases',
    title: 'Databases',
    description:
      'Designed relational database schemas and implemented complex SQL queries. Covered indexing, query optimization, ACID properties, and made a small HTML website to test the database I created.',
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
];