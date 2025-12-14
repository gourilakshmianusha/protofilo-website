import React from 'react';
import { Note } from '../types';
import { FileText, Download, Eye } from 'lucide-react';

interface NoteCardProps {
  note: Note;
  onPreview?: (note: Note) => void;
}

const NoteCard: React.FC<NoteCardProps> = ({ note, onPreview }) => {
  return (
    <div className="bg-slate-800 rounded-lg p-5 border border-slate-700 hover:border-indigo-500 transition-colors flex items-center justify-between group">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-indigo-900/30 rounded-lg text-indigo-400">
          <FileText size={24} />
        </div>
        <div>
          <h4 className="font-semibold text-white">{note.title}</h4>
          <span className="text-xs font-medium text-slate-400 bg-slate-700 px-2 py-0.5 rounded-full mt-1 inline-block">
            {note.category}
          </span>
        </div>
      </div>
      <div className="flex gap-2">
        {onPreview && (
          <button 
            onClick={() => onPreview(note)}
            className="p-2 text-slate-400 hover:text-indigo-400 hover:bg-slate-700 rounded-full transition-all"
            title="Preview"
          >
            <Eye size={20} />
          </button>
        )}
        <a 
          href={note.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-full transition-all"
          title="Download / Open"
        >
          <Download size={20} />
        </a>
      </div>
    </div>
  );
};

export default NoteCard;