import type { Project } from '../types/content';

export const projects: Project[] = [
  {
    id: 'mobile-app-capstone',
    slug: 'mobile-app-capstone',
    title: 'Craft Stash',
    shortDescription:
      'Flutter app for fabric inventory, craft events, and visual project planning. Interactive demo available.',
    inactiveCallout: 'Interactive Demo available',
    description:
      'Built a cross-platform Flutter application that helps makers manage fabric inventory, discover craft events and classes, and experiment with fabric combinations. The application was originally created for a company in the craft and fabric space, then revisited and restored as a public portfolio demo after its original image-storage architecture stopped fitting the project’s free-tier requirements.',
    skills: [
      'Cross-platform Flutter development',
      'Backend architecture',
      'JWT authentication',
      'Secure object storage',
      'Cost-aware system design',
      'Image caching',
      'Agile teamwork',
    ],
    tech: [
      'Flutter',
      'Dart',
      'Firebase',
      'Cloudflare Workers',
      'Cloudflare R2',
    ],
    images: [],
    links: [
      { label: 'Interactive Demo', url: 'https://craft-stash.pages.dev/' },
    ],
    keyFeatures: [
      'Personal fabric inventory with camera and gallery uploads',
      'Calendar for one-time and recurring craft events and classes',
      'Build canvas for dragging, rotating, resizing, and combining fabric images',
      'Responsive light and dark mode across Android, iOS, and web',
    ],
    attachments: [
      { label: 'Design Document', url: '/documents/design-doc.pdf' },
      { label: 'Scope Document', url: '/documents/scope-doc.pdf' },
      { label: 'Presentation Slides', url: '/documents/slides.pdf' },
    ],
    demoVideo: '/videos/demo.mp4',
    caseStudy: {
      eyebrow: 'Flutter app · Firebase + Cloudflare architecture',
      heroSummary:
        'A fabric-inventory mobile app I initially made for my capstone project, then restored and re-architected into a functional, free public demo.',
      sections: [
        {
          heading: 'Key features',
          items: [
            'User authentication with Firebase',
            'Personal fabric inventory and storage',
            'Firestore-powered calendar for upcoming events',
            'Class requests saved to Firestore',
            'Design board for placing inventory fabrics on the canvas',
          ],
        },
        {
          heading: 'The architecture pivot',
          body:
            'Firebase removed image storage from its free tier, so I replaced only that layer with Cloudflare R2 while keeping Firebase Auth and Firestore intact.',
          items: [
            'Firebase handles identity, user state, and structured data.',
            'Cloudflare R2 stores images; a Worker brokers authenticated uploads, reads, and deletes.',
            'Firestore holds fabric metadata and R2 object keys — not image bytes.',
          ],
        },
        {
          heading: 'Key Implementation: Cloudflare Worker',
          body:
            'The Worker verifies Firebase ID tokens against public signing keys, derives the user ID, and enforces user-scoped R2 paths. It streams private bytes to Flutter — the client never sees R2 credentials.',
        },
        {
          heading: 'Engineering decisions',
          items: [
            'Supported Android, iOS, and web by sending image bytes instead of relying only on platform-specific file paths.',
            'Cached image futures and downloaded bytes to avoid repeated image requests when Firestore streams rebuild the inventory UI.',
            'Kept the migration focused by preserving Firebase Authentication and Firestore instead of rewriting the entire backend.',
            'Balanced security, service boundaries, and free-tier sustainability while restoring an aging project.',
          ],
        },
      ],
      recruiterTakeaway:
        'This project demonstrates that I can recover an aging codebase, diagnose a platform constraint, preserve working services, and design a secure boundary between independent backend systems.',
      theme: {
        background: '#101418',
        primary: '#4594D6',
        secondary: '#9CCBFB',
        text: '#EAF5FF',
        mutedText: '#C8E2F8',
        panel: '#101418',
        panelAccent: '#4594D6',
        patternImage: '/images/craft-stash/blue_plaid_pattern.png',
        iconImage: '/projectDocs/craft-stash/icon.png',
      },
    },
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