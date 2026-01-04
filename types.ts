export interface Course {
  id: string;
  title: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  tags: string[];
  imageUrl?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  demoUrl?: string;
  imageUrl?: string;
}

export interface Note {
  id: string;
  title: string;
  category: string;
  url: string;
}

export type ContentType = 'course' | 'project' | 'note';

export interface DataState {
  courses: Course[];
  projects: Project[];
  notes: Note[];
}