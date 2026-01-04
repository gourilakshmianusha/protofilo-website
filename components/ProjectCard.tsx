import React from 'react';
import { Project } from '../types';
import { Github, ExternalLink } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  // Use custom image URL if provided, otherwise auto-generate
  const imageUrl = (project as any).imageUrl || `https://image.pollinations.ai/prompt/${encodeURIComponent(project.title + " software interface dashboard technology")}?width=800&height=600&nologo=true`;

  return (
    <div className="bg-slate-800 rounded-xl overflow-hidden shadow-lg border border-slate-700 flex flex-col h-full hover:border-indigo-500/50 transition-colors group">
      <div className="h-48 md:h-52 overflow-hidden relative">
        <img 
          src={imageUrl}
          alt={project.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60" />
      </div>
      <div className="p-5 md:p-6 flex-1 flex flex-col">
        <h3 className="text-lg md:text-xl font-bold text-white mb-2 leading-tight">{project.title}</h3>
        <p className="text-slate-400 text-sm mb-4 line-clamp-3 flex-1 leading-relaxed">
          {project.description}
        </p>
        
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span key={tech} className="px-2 py-1 rounded bg-indigo-900/50 text-indigo-300 text-[10px] md:text-xs font-semibold">
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="flex gap-4 mt-auto pt-4 border-t border-slate-700">
          {project.githubUrl && (
            <a 
              href={project.githubUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors text-xs md:text-sm font-medium"
            >
              <Github size={16} />
              <span>GitHub</span>
            </a>
          )}
          {project.demoUrl && (
            <a 
              href={project.demoUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors text-xs md:text-sm font-medium"
            >
              <ExternalLink size={16} />
              <span>Visit Site</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;