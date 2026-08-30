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
      { label: 'GitHub', url: 'https://github.com/oogaballooga/Craft-Stash' },
    ],
    keyFeatures: [
      'Personal fabric inventory with camera and gallery uploads',
      'Calendar for one-time and recurring craft events and classes',
      'Build canvas for dragging, rotating, resizing, and combining fabric images',
      'Responsive light and dark mode across Android, iOS, and web',
    ],
    attachments: [
      { label: 'Design Document', url: '/projectDocs/craft-stash/Design%20Doc.pdf' },
      { label: 'Presentation Slides', url: '/projectDocs/craft-stash/Presentation.pdf' },
      { label: 'Scope Document', url: '/projectDocs/craft-stash/Scope%20Doc.pdf' },
    ],
    demoVideo: '/projectDocs/craft-stash/craftstash_video_demo.mp4',
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
        iconImage: '/projectDocs/craft-stash/icon.webp',
      },
    },
    activeWidth: 1000,
    activeHeight: 800,
    featured: true,
  },
  {
    id: 'slashbin',
    slug: 'slashbin',
    title: 'SlashBin',
    shortDescription:
      'Voice-activated autonomous smart bin that finds a caller and navigates to them in simulation.',
    inactiveCallout: 'Video demo available',
    description:
      'Built a ROS 2 autonomous robot simulation that combines voice commands, person detection, omni-wheel control, and Nav2 path planning. SlashBin searches for a person after hearing a wake command, approaches them using RGB-D perception, and returns to its home pose when dismissed.',
    skills: [
      'Robotics software development',
      'Autonomous navigation',
      'Computer vision',
      'Voice interaction',
      'Motion control',
    ],
    tech: ['ROS 2', 'Gazebo', 'Nav2', 'C++', 'Python'],
    images: [],
    links: [{ label: 'GitHub', url: 'https://github.com/oogaballooga/SlashBin' }],
    demoVideo: '/projectDocs/SlashBin/slashbin_final_demo.mp4',
    caseStudy: {
      eyebrow: 'ROS 2 · Gazebo · Nav2 · YOLO · Vosk',
      heroSummary:
        'A simulated autonomous smart bin that responds to voice commands, locates a person with RGB-D vision, and navigates to them before returning home.',
      sections: [
        {
          heading: 'Key features',
          items: [
            'Voice commands start a person-search flow or send the robot back home.',
            'YOLO-based person detection is confirmed across multiple frames before navigation begins.',
            'Depth data estimates the person’s position and preserves a comfortable approach distance.',
            'Nav2 handles planning and recovery while the robot moves through a mapped Gazebo world.',
          ],
        },
        {
          heading: 'System architecture',
          body:
            'Separate ROS 2 nodes coordinate speech recognition, perception, navigation, and low-level motion control through a shared robot-state topic.',
          items: [
            'Vosk recognizes the wake and dismiss phrases.',
            'YOLO processes synchronized camera and depth streams.',
            'A C++ kinematics node converts velocity commands into omni-wheel motion and publishes odometry.',
          ],
        },
        {
          heading: 'Engineering decisions',
          items: [
            'Required consecutive high-confidence detections to avoid reacting to a single false positive.',
            'Cancelled active navigation goals before issuing the home goal so the robot can safely change intent.',
            'Used Gazebo simulation to validate perception, navigation, and controller integration in one repeatable environment.',
          ],
        },
      ],
      recruiterTakeaway:
        'This project demonstrates that I can connect perception, stateful interaction, motion control, and autonomous navigation into a cohesive robotics system.',
      theme: {
        background: '#172638',
        primary: '#BEDEFF',
        secondary: '#BEDEFF',
        text: '#F3F8FF',
        mutedText: '#D5E5F5',
        panel: '#2A405C',
        panelAccent: '#799EBF',
        heroImage: '/projectDocs/SlashBin/robot.png',
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
    caseStudy: {
      eyebrow: 'React · Next.js · Tailwind CSS · Framer Motion',
      heroSummary:
        'Personal portfolio with a single-DOM 3D camera system that moves through five connected spatial pages.',
      sections: [
        {
          heading: 'Key features',
          items: [
            'Virtual camera translating along the Y axis with spring physics',
            'Hash-based deep links to every section with animated fly-throughs',
            'Ghost pages rendered during long-distance camera transitions',
            'Reduced-motion mode that disables all 3D, glow, and ghost effects',
          ],
        },
        {
          heading: 'Engineering decisions',
          body:
            'The entire experience is one DOM tree moved by a virtual camera — no WebGL, no canvas, no page reloads.',
          items: [
            'Framer Motion springs drive all navigation; CSS keyframes handle only ambient glow.',
            'Animation stays GPU-composited by transforming position, opacity, and filter only.',
            'The page is a single client component; all animation and navigation state lives in React hooks.',
            'Typed data files drive generic card blueprints, so content never lives in components.',
          ],
        },
      ],
      recruiterTakeaway:
        'This project demonstrates that I can design an interaction system from scratch, keep complex motion smooth without WebGL, and structure a codebase so content and presentation stay cleanly separated.',
      theme: {
        background: '#0A0A0A',
        primary: '#EDEDED',
        secondary: '#FFFFFF',
        text: '#D1D5DB',
        mutedText: '#9CA3AF',
        panel: '#181818',
        panelAccent: '#FFFFFF',
      },
    },
    skills: ['UX/UI design', 'Component architecture', '3D spatial design'],
    tech: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
    images: [],
    links: [{ label: 'GitHub', url: 'https://github.com/oogaballooga/portfolio' }],
    featured: true,
  },
];
