// Project entry
export interface Project {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  skills: string[];
  tech: string[];
  images: string[];
  links?: { label: string; url: string }[];
  featured: boolean;
}

// Experience entry
export interface Experience {
  id: string;
  slug: string;
  company: string;
  role: string;
  startDate: string;
  endDate?: string;
  description: string;
  skills: string[];
  logo?: string;
}

// Education entry
export interface Education {
  id: string;
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa: number;
  honors?: string[];
  logo?: string;
  courses: Course[];
}

// Course data
export interface Course {
  id: string;
  title: string;
  description: string;
}

// Pages in the vertical 3D stack (top to bottom)
export type PageId = 'contact' | 'aboutSkills' | 'academics' | 'projects' | 'experience';

// A page's fixed position in the 3D layout
export interface PageSlot {
  id: PageId;
  label: string;
  route: string;
  yIndex: number;
}

// Direction the camera is moving
export type CameraDirection = 'up' | 'down' | 'none';

// A placeholder ghost page rendered during distant fly-throughs
export interface GhostPage {
  pageId: PageId;
  yIndex: number;
  label: string;
}

// Camera system state
export interface CameraState {
  currentPage: PageId;
  targetPage: PageId | null;
  direction: CameraDirection;
  isTransitioning: boolean;
  transitionDistance: number;
}

// Skill category for About Me / Skills page
export interface SkillCategory {
  category: string;
  items: string[];
}