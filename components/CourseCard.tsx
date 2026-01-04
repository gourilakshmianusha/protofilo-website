import React from 'react';
import { Course } from '../types';
import { Clock, BarChart } from 'lucide-react';

interface CourseCardProps {
  course: Course;
  onClick?: (id: string) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onClick }) => {
  // Use custom image URL if provided, otherwise auto-generate
  const imageUrl = (course as any).imageUrl || `https://image.pollinations.ai/prompt/${encodeURIComponent(course.title + " programming code abstract technology high quality")}?width=800&height=600&nologo=true`;

  return (
    <div 
      onClick={() => onClick && onClick(course.id)}
      className="bg-slate-800 rounded-xl overflow-hidden shadow-lg hover:shadow-indigo-500/20 transition-all duration-300 hover:-translate-y-1 border border-slate-700 flex flex-col h-full cursor-pointer group"
    >
      <div className="h-44 md:h-48 overflow-hidden relative">
        <img 
          src={imageUrl}
          alt={course.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-90 group-hover:opacity-100"
        />
        <div className="absolute top-2 right-2 bg-slate-900/80 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-bold text-indigo-400 uppercase tracking-wider">
          {course.level}
        </div>
      </div>
      <div className="p-5 md:p-6 flex-1 flex flex-col">
        <div className="flex gap-2 mb-3 flex-wrap">
          {course.tags.map(tag => (
            <span key={tag} className="text-[10px] md:text-xs font-medium text-slate-300 bg-slate-700 px-2 py-0.5 rounded-full">
              #{tag}
            </span>
          ))}
        </div>
        <h3 className="text-lg md:text-xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors leading-tight">{course.title}</h3>
        <p className="text-slate-400 text-sm mb-4 line-clamp-3 flex-1 leading-relaxed">
          {course.description}
        </p>
        <div className="flex items-center justify-between text-slate-500 text-xs mt-auto pt-4 border-t border-slate-700">
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <BarChart size={14} />
            <span>Structured Path</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;