import type { Experience } from '../types/content';

export const experiences: Experience[] = [
  {
    id: 'ekj-it-intern',
    slug: 'ekj-it-intern',
    company: 'EKJ Rådgivende Ingeniører AS',
    role: 'IT Intern',
    location: 'Copenhagen, DK',
    startDate: 'Jun 2025',
    endDate: 'Aug 2025',
    description:
      'Completed a 3-month IT internship at an engineering consulting firm in Copenhagen. Worked on a variety of technical tasks including system maintenance, process automation, and internal tool development. Gained hands-on experience with Microsoft AI Studio and independently learned React to modernize an internal web application.',
    achievements: [
      'Ran scripts to update and maintain company computers across the organization',
      'Built automated workflows for employees upon request, improving internal efficiency',
      'Learned Microsoft AI Studio and developed a PDF translator tool for document processing',
      'Taught myself React and updated an internal company website with a modern interface',
    ],
    skills: ['React', 'Microsoft AI Studio', 'Scripting', 'Process Automation'],
  },
];