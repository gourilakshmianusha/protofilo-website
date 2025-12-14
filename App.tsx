import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import { DataState, ContentType } from './types';
import { loadData, saveData } from './services/storageService';
import { generateDescription } from './services/geminiService';
import { Plus, Trash2, Wand2, MapPin, Phone, Mail, FileText, Settings } from 'lucide-react';
import CourseCard from './components/CourseCard';
import ProjectCard from './components/ProjectCard';
import NoteCard from './components/NoteCard';

// -- Sub-Components for Pages --

const Home: React.FC = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div className="text-center py-20">
      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
        Build. Teach. Innovate.
      </h1>
      <p className="max-w-2xl mx-auto text-xl text-slate-400 mb-10">
        Welcome to my digital garden. I explore complex IT concepts through teaching and build software that matters.
      </p>
      <div className="flex justify-center gap-4 flex-wrap">
        <button onClick={() => window.location.hash = 'courses'} className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-all">
          Explore Courses
        </button>
        <button onClick={() => window.location.hash = 'projects'} className="px-8 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-semibold transition-all border border-slate-700">
          View Projects
        </button>
        <button onClick={() => window.location.hash = 'notes'} className="px-8 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-semibold transition-all border border-slate-700">
          Student Notes
        </button>
      </div>
    </div>
    
    <div className="grid md:grid-cols-3 gap-8 mt-12">
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
        <h3 className="text-xl font-bold text-white mb-2">Expert Instruction</h3>
        <p className="text-slate-400">Master C, C++, Java, Python, and Web Development with structured paths.</p>
      </div>
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
        <h3 className="text-xl font-bold text-white mb-2">Real World Projects</h3>
        <p className="text-slate-400">See theory in action through my portfolio of deployed applications.</p>
      </div>
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
        <h3 className="text-xl font-bold text-white mb-2">AI Integration</h3>
        <p className="text-slate-400">Leveraging cutting-edge AI to enhance learning and productivity.</p>
      </div>
    </div>
  </div>
);

const Contact: React.FC = () => (
  <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <h2 className="text-3xl font-bold text-white mb-8 border-l-4 border-indigo-500 pl-4">Contact Me</h2>
    <div className="bg-slate-800 rounded-xl p-8 border border-slate-700 shadow-xl">
      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div className="space-y-8">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-indigo-900/30 rounded-lg text-indigo-400 mt-1">
              <MapPin size={24} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-1">Visit Us</h3>
              <p className="text-slate-300">
                #204 Flat, Swastik Plaza<br />
                Opposite to Police Station<br />
                Near City Center, Hublli - 580032
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-indigo-900/30 rounded-lg text-indigo-400 mt-1">
              <Phone size={24} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-1">Call Me</h3>
              <p className="text-slate-300 text-xl font-mono">9035066863</p>
              <p className="text-slate-500 text-sm mt-1">Available Mon-Sat, 9AM - 6PM</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-indigo-900/30 rounded-lg text-indigo-400 mt-1">
              <Mail size={24} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-1">Email</h3>
              <p className="text-slate-300">atomceatomce@gmail.com</p>
            </div>
          </div>
        </div>

        {/* Map Container */}
        <div className="h-full min-h-[350px] bg-slate-900 rounded-lg overflow-hidden border border-slate-700 relative shadow-inner">
             <iframe 
                width="100%" 
                height="100%" 
                className="absolute inset-0"
                style={{ border: 0 }}
                loading="lazy" 
                allowFullScreen 
                title="Location Map"
                src="https://maps.google.com/maps?q=Swastik%20Plaza%2C%20Hubballi&t=&z=15&ie=UTF8&iwloc=&output=embed">
            </iframe>
        </div>
      </div>
      
      <div className="mt-10 p-4 bg-slate-900/50 rounded-lg border border-slate-700/50">
        <p className="text-center text-slate-400 text-sm">
          Looking to join a course or start a project? Feel free to drop by or give a call!
        </p>
      </div>
    </div>
  </div>
);

// -- Admin Component --
interface AdminProps {
  data: DataState;
  onUpdate: (newData: DataState) => void;
}

const Admin: React.FC<AdminProps> = ({ data, onUpdate }) => {
  const [activeTab, setActiveTab] = useState<ContentType>('course');
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState(''); // Comma separated for simplicity (or category for notes)
  const [noteUrl, setNoteUrl] = useState(''); // Specific for notes

  const handleGenerate = async () => {
    if (activeTab === 'note') return; // Skip AI for notes
    if (!title) return alert('Please enter a title first');
    setIsGenerating(true);
    const desc = await generateDescription(title, activeTab, tags);
    setDescription(desc);
    setIsGenerating(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = Date.now().toString();
    const tagArray = tags.split(',').map(t => t.trim()).filter(Boolean);

    const newData = { ...data };

    if (activeTab === 'course') {
      newData.courses.push({
        id,
        title,
        description,
        level: 'Beginner', 
        duration: 'Self-paced',
        tags: tagArray
      });
    } else if (activeTab === 'project') {
      newData.projects.push({
        id,
        title,
        description,
        techStack: tagArray,
        githubUrl: '#',
      });
    } else if (activeTab === 'note') {
      newData.notes.push({
        id,
        title,
        category: tags || 'General', // Using tags field as category for notes
        url: noteUrl || '#'
      });
    }
    
    onUpdate(newData);
    setTitle('');
    setDescription('');
    setTags('');
    setNoteUrl('');
  };

  const handleDelete = (id: string, type: ContentType) => {
    const newData = { ...data };
    if (type === 'course') {
      newData.courses = newData.courses.filter(c => c.id !== id);
    } else if (type === 'project') {
      newData.projects = newData.projects.filter(p => p.id !== id);
    } else if (type === 'note') {
      newData.notes = newData.notes.filter(n => n.id !== id);
    }
    onUpdate(newData);
  };

  const renderList = () => {
    let items: any[] = [];
    if (activeTab === 'course') items = data.courses;
    else if (activeTab === 'project') items = data.projects;
    else items = data.notes;

    return (
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="bg-slate-900 p-3 rounded-lg border border-slate-700 flex justify-between items-start group">
            <div>
              <h4 className="font-medium text-white">{item.title}</h4>
              {activeTab === 'note' ? (
                <a href={(item as any).url} target="_blank" className="text-xs text-indigo-400 hover:underline">View File</a>
              ) : (
                <p className="text-xs text-slate-500 mt-1 line-clamp-1">{(item as any).description}</p>
              )}
            </div>
            <button 
              onClick={() => handleDelete(item.id, activeTab)}
              className="text-slate-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
        {items.length === 0 && (
          <p className="text-slate-500 text-sm italic">No items found.</p>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
        <div className="p-6 border-b border-slate-700 bg-slate-900/50 flex flex-wrap gap-4 justify-between items-center">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Settings className="text-indigo-500" /> Admin Dashboard
          </h2>
          <div className="flex bg-slate-700 rounded-lg p-1">
            <button 
              onClick={() => setActiveTab('course')}
              className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'course' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:text-white'}`}
            >
              Courses
            </button>
            <button 
              onClick={() => setActiveTab('project')}
              className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'project' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:text-white'}`}
            >
              Projects
            </button>
            <button 
              onClick={() => setActiveTab('note')}
              className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'note' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:text-white'}`}
            >
              Notes
            </button>
          </div>
        </div>

        <div className="p-6 grid lg:grid-cols-2 gap-8">
          {/* Form */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 capitalize">Add New {activeTab}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Title</label>
                <input 
                  type="text" 
                  value={title} 
                  onChange={e => setTitle(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder={activeTab === 'note' ? "e.g., C++ Cheat Sheet" : "e.g., Advanced Java Patterns"}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">
                  {activeTab === 'note' ? 'Category' : 'Tags / Tech Stack (comma separated)'}
                </label>
                <input 
                  type="text" 
                  value={tags} 
                  onChange={e => setTags(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder={activeTab === 'note' ? "e.g., Java" : "e.g., Java, Spring, Hibernate"}
                />
              </div>

              {activeTab === 'note' ? (
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">File URL / Drive Link</label>
                  <input 
                    type="url" 
                    value={noteUrl} 
                    onChange={e => setNoteUrl(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                    placeholder="https://drive.google.com/..."
                    required
                  />
                  <p className="text-xs text-slate-500 mt-1">Paste a link to your Google Drive or DropBox file.</p>
                </div>
              ) : (
                <div>
                  <div className="flex justify-between items-end mb-1">
                    <label className="block text-sm font-medium text-slate-400">Description</label>
                    <button 
                      type="button" 
                      onClick={handleGenerate}
                      disabled={isGenerating || !title}
                      className="text-xs flex items-center gap-1 text-indigo-400 hover:text-indigo-300 disabled:opacity-50"
                    >
                      <Wand2 size={12} />
                      {isGenerating ? 'Thinking...' : 'Generate with AI'}
                    </button>
                  </div>
                  <textarea 
                    value={description} 
                    onChange={e => setDescription(e.target.value)}
                    className="w-full h-32 bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
                    placeholder="Description..."
                    required
                  />
                </div>
              )}

              <button 
                type="submit"
                className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <Plus size={18} /> Add Item
              </button>
            </form>
          </div>

          {/* List */}
          <div className="border-l border-slate-700 pl-0 lg:pl-8 lg:h-[500px] overflow-y-auto">
             <h3 className="text-lg font-semibold text-white mb-4 capitalize">Existing {activeTab === 'note' ? 'Notes' : activeTab + 's'}</h3>
             {renderList()}
          </div>
        </div>
      </div>
    </div>
  );
};


// -- Main App Component --

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [data, setData] = useState<DataState>({ courses: [], projects: [], notes: [] });

  useEffect(() => {
    setData(loadData());
    
    // Simple hash router handler
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) setCurrentPage(hash);
      else setCurrentPage('home');
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Init
    
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleUpdateData = (newData: DataState) => {
    setData(newData);
    saveData(newData);
  };

  const navigate = (page: string) => {
    window.location.hash = page;
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      <Navbar currentPage={currentPage} onNavigate={navigate} />

      <main className="flex-1">
        {currentPage === 'home' && <Home />}
        
        {currentPage === 'courses' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-3xl font-bold text-white mb-8 border-l-4 border-indigo-500 pl-4">IT Courses</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.courses.map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        )}

        {currentPage === 'projects' && (
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
             <h2 className="text-3xl font-bold text-white mb-8 border-l-4 border-indigo-500 pl-4">Projects</h2>
             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
               {data.projects.map(project => (
                 <ProjectCard key={project.id} project={project} />
               ))}
             </div>
           </div>
        )}

        {currentPage === 'notes' && (
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
             <h2 className="text-3xl font-bold text-white mb-8 border-l-4 border-indigo-500 pl-4">Student Resources & Notes</h2>
             <p className="text-slate-400 mb-8 max-w-2xl">Download lecture notes, cheat sheets, and practice problems to support your learning.</p>
             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
               {data.notes.map(note => (
                 <NoteCard key={note.id} note={note} />
               ))}
             </div>
             {data.notes.length === 0 && (
                <div className="text-center py-10 bg-slate-800 rounded-xl border border-slate-700">
                    <p className="text-slate-400">No notes available yet. Check back soon!</p>
                </div>
             )}
           </div>
        )}

        {currentPage === 'contact' && <Contact />}

        {currentPage === 'admin' && (
          <Admin data={data} onUpdate={handleUpdateData} />
        )}
      </main>

      <footer className="bg-slate-950 border-t border-slate-800 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-500">
          <p>&copy; {new Date().getFullYear()} DevFolio. Built with React & Gemini.</p>
        </div>
      </footer>
    </div>
  );
}