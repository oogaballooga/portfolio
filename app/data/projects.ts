import type { Project } from '../types/content';

export const projects: Project[] = [
  {
    id: 'mobile-app-capstone',
    slug: 'mobile-app-capstone',
    title: 'Mobile App for Local Business',
    shortDescription:
      'Capstone project: a mobile app built for a local company to reduce fabric waste.',
    description:
      'Designed and developed a full-stack mobile application from scratch for a local business. The app helps artists keep track of their fabric inventory, which in turn reduces material waste, and helps artists manage their projects more efficiently. Worked in an Agile team of four, communicating directly with the business sponsor throughout the semester.',
    skills: [
      'Architecture design',
      'DevOps',
      'Agile teamwork',
      'Client communication',
    ],
    tech: ['Flutter', 'Dart', 'Firebase'],
    images: [],
    links: [],
    keyFeatures: [
      'Firebase authorization',
      'Personal inventory management',
      'Design board using personal inventory',
      'Calendar showing in-store classes',
    ],
    attachments: [
      { label: 'Design Document', url: '/documents/design-doc.pdf' },
      { label: 'Scope Document', url: '/documents/scope-doc.pdf' },
      { label: 'Presentation Slides', url: '/documents/slides.pdf' },
    ],
    demoVideo: '/videos/demo.mp4',
    activeWidth: 1000,
    activeHeight: 800,
    featured: true,
  },
  {
    id: 'portfolio-website',
    slug: 'portfolio-website',
    title: 'Portfolio Website',
    shortDescription:
      'Personal portfolio with 3D spatial navigation and custom UI components.',
    description:
      'Developed a personal portfolio website using Next.js and React without external React UI libraries. Features a custom 3D camera navigation system that creates the illusion of moving through a connected spatial environment. Built with performance, accessibility, and recruiter experience as top priorities.',
    skills: ['UX/UI design', 'Component architecture', '3D spatial design'],
    tech: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
    images: [],
    links: [{ label: 'GitHub', url: 'https://github.com/oogaballooga/portfolio' }],
    featured: true,
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}