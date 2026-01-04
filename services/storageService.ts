import { Course, Project, Note, DataState } from '../types';

const STORAGE_KEY = 'anusha_portfolio_data_v4';

const DEFAULT_COURSES: Course[] = [
  {
    id: 'c-1',
    title: 'Mastering C Programming',
    description: 'Dive deep into memory management, pointers, and low-level system programming with the mother of all languages.',
    level: 'Beginner',
    duration: '10 Weeks',
    tags: ['C', 'Systems', 'Backend']
  },
  {
    id: 'java-1',
    title: 'Java Enterprise Essentials',
    description: 'Comprehensive guide to Java SE and EE, focusing on building robust, scalable enterprise applications.',
    level: 'Intermediate',
    duration: '10 Weeks',
    tags: ['Java', 'Backend', 'Enterprise']
  }
];

const DEFAULT_PROJECTS: Project[] = [
  {
    id: 'p-1',
    title: 'E-Commerce Dashboard',
    description: 'A comprehensive analytics dashboard for online retailers featuring real-time sales tracking and inventory management.',
    techStack: ['React', 'D3.js', 'Tailwind'],
    githubUrl: 'https://github.com/',
    demoUrl: 'https://demo.com'
  }
];

const DEFAULT_NOTES: Note[] = [
  {
    id: 'n-1',
    title: 'C Programming Quick Reference',
    category: 'C',
    url: 'https://www.tutorialspoint.com/cprogramming/cprogramming_tutorial.pdf'
  }
];

export const loadData = (): DataState => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Ensure we always return a valid object structure
      return {
        courses: Array.isArray(parsed.courses) ? parsed.courses : [],
        projects: Array.isArray(parsed.projects) ? parsed.projects : [],
        notes: Array.isArray(parsed.notes) ? parsed.notes : []
      };
    }
  } catch (e) {
    console.error("Error loading data from localStorage:", e);
  }
  
  // Return defaults if no storage exists or if there was an error
  return { 
    courses: DEFAULT_COURSES, 
    projects: DEFAULT_PROJECTS, 
    notes: DEFAULT_NOTES 
  };
};

export const saveData = (data: DataState) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error("Error saving data to localStorage:", e);
  }
};