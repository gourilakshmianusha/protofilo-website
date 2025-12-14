import { Course, Project, Note, DataState } from '../types';

const STORAGE_KEY = 'devfolio_data_v1';

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
    id: 'cpp-1',
    title: 'Advanced C++ Development',
    description: 'Learn object-oriented programming, STL, and modern C++ features for high-performance application development.',
    level: 'Intermediate',
    duration: '12 Weeks',
    tags: ['C++', 'OOP', 'Game Dev']
  },
  {
    id: 'java-1',
    title: 'Java Enterprise Essentials',
    description: 'Comprehensive guide to Java SE and EE, focusing on building robust, scalable enterprise applications.',
    level: 'Intermediate',
    duration: '10 Weeks',
    tags: ['Java', 'Backend', 'Enterprise']
  },
  {
    id: 'py-1',
    title: 'Python for Data Science',
    description: 'Learn to analyze data, build predictive models, and visualize trends using Python libraries like Pandas and Scikit-learn.',
    level: 'Intermediate',
    duration: '8 Weeks',
    tags: ['Python', 'AI', 'Data']
  },
  {
    id: 'web-1',
    title: 'Full Stack Web Development',
    description: 'Build modern, responsive web applications using React, Node.js, and TypeScript from scratch.',
    level: 'Advanced',
    duration: '12 Weeks',
    tags: ['React', 'TypeScript', 'Web']
  }
];

const DEFAULT_PROJECTS: Project[] = [
  {
    id: 'p-1',
    title: 'E-Commerce Dashboard',
    description: 'A comprehensive analytics dashboard for online retailers featuring real-time sales tracking and inventory management.',
    techStack: ['React', 'D3.js', 'Tailwind'],
    githubUrl: '#',
    demoUrl: '#'
  },
  {
    id: 'p-2',
    title: 'AI Code Assistant',
    description: 'A VS Code extension that uses generative AI to suggest code completions and refactoring options.',
    techStack: ['TypeScript', 'Gemini API', 'Node.js'],
    githubUrl: '#'
  }
];

const DEFAULT_NOTES: Note[] = [
  {
    id: 'n-1',
    title: 'C Programming Quick Reference',
    category: 'C',
    url: '#'
  },
  {
    id: 'n-2',
    title: 'Java OOP Interview Questions',
    category: 'Java',
    url: '#'
  }
];

export const loadData = (): DataState => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    const parsed = JSON.parse(stored);
    // Migration for existing data without notes
    if (!parsed.notes) parsed.notes = DEFAULT_NOTES;
    return parsed;
  }
  return { courses: DEFAULT_COURSES, projects: DEFAULT_PROJECTS, notes: DEFAULT_NOTES };
};

export const saveData = (data: DataState) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};