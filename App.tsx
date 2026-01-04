import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import { DataState, ContentType, Course, Note, Project } from './types';
import { loadData, saveData } from './services/storageService';
import { generateDescription } from './services/geminiService';
import { Plus, Trash2, Wand2, MapPin, Phone, Mail, FileText, Settings, ArrowLeft, Clock, Award, Target, BookOpen, Linkedin, Github, Twitter, Download, Eye, X, ExternalLink, Image as ImageIcon, Copy, Database, RefreshCw, CheckCircle2 } from 'lucide-react';
import CourseCard from './components/CourseCard';
import ProjectCard from './components/ProjectCard';
import NoteCard from './components/NoteCard';

// -- Sub-Components --

const Home: React.FC = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div className="text-center py-10 md:py-20">
      <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight mb-6 md:mb-8 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
        Build. Teach. Innovate.
      </h1>
      <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 mb-8 md:mb-10">
        Welcome to my digital garden. I explore complex IT concepts through teaching and build software that matters.
      </p>
      <div className="flex justify-center gap-3 md:gap-4 flex-wrap">
        <button onClick={() => window.location.hash = 'courses/all'} className="px-6 md:px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-all text-sm md:text-base">
          Explore Courses
        </button>
        <button onClick={() => window.location.hash = 'projects'} className="px-6 md:px-8 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-semibold transition-all border border-slate-700 text-sm md:text-base">
          View Projects
        </button>
        <button onClick={() => window.location.hash = 'notes'} className="px-6 md:px-8 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-semibold transition-all border border-slate-700 text-sm md:text-base">
          Student Notes
        </button>
      </div>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-8">
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
        <h3 className="text-xl font-bold text-white mb-2">Expert Instruction</h3>
        <p className="text-slate-400">Master programming concepts with structured, industry-relevant paths.</p>
      </div>
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
        <h3 className="text-xl font-bold text-white mb-2">Real World Projects</h3>
        <p className="text-slate-400">Practical application of software engineering principles.</p>
      </div>
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
        <h3 className="text-xl font-bold text-white mb-2">AI Integration</h3>
        <p className="text-slate-400">Leveraging Gemini AI for enhanced productivity and learning.</p>
      </div>
    </div>
  </div>
);

const CourseDetail: React.FC<{ course: Course; notes: Note[]; onPreview: (note: Note) => void }> = ({ course, notes, onPreview }) => {
  const imageUrl = course.imageUrl || `https://image.pollinations.ai/prompt/${encodeURIComponent(course.title + " programming code high quality")}?width=1200&height=400&nologo=true`;
  const relatedNotes = notes.filter(n => course.tags.some(t => n.category.toLowerCase().includes(t.toLowerCase())) || course.title.toLowerCase().includes(n.category.toLowerCase()));

  return (
    <div className="animate-in fade-in duration-500">
      <div className="relative h-64 md:h-80 w-full overflow-hidden">
        <img src={imageUrl} alt={course.title} className="w-full h-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 max-w-7xl mx-auto">
          <button onClick={() => window.history.back()} className="flex items-center gap-2 text-indigo-400 hover:text-white mb-4 text-sm"><ArrowLeft size={16} /> Back</button>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">{course.title}</h1>
          <p className="text-indigo-400 font-bold uppercase tracking-widest text-xs">{course.level} LEVEL</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
              <h2 className="text-xl font-bold text-white mb-4">Course Details</h2>
              <p className="text-slate-300 leading-relaxed">{course.description}</p>
            </div>
            {relatedNotes.length > 0 && (
                <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
                    <h2 className="text-xl font-bold text-white mb-6">Course Materials</h2>
                    <div className="grid grid-cols-1 gap-4">
                        {relatedNotes.map(note => (
                             <div key={note.id} className="flex items-center justify-between p-4 bg-slate-900 rounded-lg border border-slate-700">
                                 <div className="flex items-center gap-3">
                                     <FileText className="text-indigo-400" size={20} />
                                     <h4 className="font-semibold text-white truncate text-sm">{note.title}</h4>
                                 </div>
                                 <div className="flex gap-2">
                                     <button onClick={() => onPreview(note)} className="p-2 text-slate-400 hover:text-indigo-400"><Eye size={18} /></button>
                                     <a href={note.url} target="_blank" className="p-2 text-slate-400 hover:text-white"><Download size={18} /></a>
                                 </div>
                             </div>
                        ))}
                    </div>
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Contact: React.FC = () => (
  <div className="max-w-4xl mx-auto px-4 py-12">
    <div className="bg-slate-800 rounded-2xl border border-slate-700 p-8 shadow-xl">
      <h2 className="text-3xl font-bold text-white mb-6">Get In Touch</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-900/30 rounded-lg text-indigo-400"><Mail size={24} /></div>
            <div><p className="text-xs text-slate-500 font-bold">EMAIL</p><p className="font-semibold">atomceatomce@gmail.com</p></div>
          </div>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-900/30 rounded-lg text-indigo-400"><Phone size={24} /></div>
            <div><p className="text-xs text-slate-500 font-bold">PHONE</p><p className="font-semibold">9035066863</p></div>
          </div>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-900/30 rounded-lg text-indigo-400"><MapPin size={24} /></div>
            <div><p className="text-xs text-slate-500 font-bold">LOCATION</p><p className="font-semibold">Hublli, Swastik Plaza</p></div>
          </div>
        </div>
        <div className="flex gap-4 items-end justify-center md:justify-start">
          <a href="#" className="p-4 bg-slate-700 hover:bg-indigo-600 rounded-xl transition-all text-white"><Linkedin size={24} /></a>
          <a href="#" className="p-4 bg-slate-700 hover:bg-indigo-600 rounded-xl transition-all text-white"><Github size={24} /></a>
        </div>
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
  const [activeTab, setActiveTab] = useState<ContentType | 'sync'>('course');
  const [isGenerating, setIsGenerating] = useState(false);
  const [syncCode, setSyncCode] = useState('');
  const [copied, setCopied] = useState(false);
  
  // Form States
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [noteUrl, setNoteUrl] = useState('');
  const [demoUrl, setDemoUrl] = useState('');
  const [repoUrl, setRepoUrl] = useState('');
  const [customImageUrl, setCustomImageUrl] = useState('');
  const [level, setLevel] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Beginner');

  const handleGenerate = async () => {
    if (!title) return alert('Enter a title first');
    setIsGenerating(true);
    const desc = await generateDescription(title, activeTab === 'project' ? 'project' : 'course', tags);
    setDescription(desc);
    setIsGenerating(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = Date.now().toString();
    const tagArray = tags.split(',').map(t => t.trim()).filter(Boolean);
    const newData = { ...data };

    if (activeTab === 'course') {
      newData.courses.push({ id, title, description, level, duration: 'Self-paced', tags: tagArray, imageUrl: customImageUrl || undefined });
    } else if (activeTab === 'project') {
      newData.projects.push({ id, title, description, techStack: tagArray, githubUrl: repoUrl || undefined, demoUrl: demoUrl || undefined, imageUrl: customImageUrl || undefined });
    } else if (activeTab === 'note') {
      newData.notes.push({ id, title, category: tags || 'General', url: noteUrl || '#' });
    }
    
    onUpdate(newData);
    setTitle(''); setDescription(''); setTags(''); setNoteUrl(''); setDemoUrl(''); setRepoUrl(''); setCustomImageUrl('');
    alert('Added successfully!');
  };

  const handleExport = () => {
    const code = btoa(JSON.stringify(data));
    setSyncCode(code);
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleImport = () => {
    if (!syncCode) return alert('Paste the code first!');
    try {
      const decoded = JSON.parse(atob(syncCode));
      if (decoded.courses || decoded.projects || decoded.notes) {
        onUpdate(decoded);
        alert('Success! Page will now reload to apply changes.');
        window.location.reload();
      } else {
        alert('Invalid sync code format.');
      }
    } catch (e) {
      alert('Error: Make sure you copied the full code from your desktop.');
    }
  };

  const handleDelete = (id: string, type: string) => {
    if (!confirm('Are you sure you want to delete this?')) return;
    const newData = { ...data };
    if (type === 'course') newData.courses = newData.courses.filter(c => c.id !== id);
    else if (type === 'project') newData.projects = newData.projects.filter(p => p.id !== id);
    else if (type === 'note') newData.notes = newData.notes.filter(n => n.id !== id);
    onUpdate(newData);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden shadow-2xl">
        <div className="p-2 bg-slate-900/80 border-b border-slate-700 flex flex-wrap justify-center gap-1 md:gap-2">
          {['course', 'project', 'note', 'sync'].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab as any)} className={`px-4 py-2 rounded-lg text-xs font-bold capitalize transition-all ${activeTab === tab ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}>
              {tab === 'sync' ? <Database size={14} className="inline mr-1" /> : null}
              {tab}s
            </button>
          ))}
        </div>

        <div className="p-6">
          {activeTab === 'sync' ? (
            <div className="max-w-xl mx-auto space-y-8 py-4 text-center">
               <div className="bg-indigo-900/20 p-6 rounded-2xl border border-indigo-500/30">
                  <h3 className="text-lg font-bold text-white mb-2">Device Synchronization</h3>
                  <p className="text-slate-400 text-sm mb-6">Since your data is stored on this device, use this tool to move it to your phone or another computer.</p>
                  <button onClick={handleExport} className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all">
                    {copied ? <CheckCircle2 size={18} /> : <Copy size={18} />}
                    {copied ? 'Copied to Clipboard!' : 'Export All Data as Code'}
                  </button>
               </div>
               <div className="space-y-4">
                  <h3 className="text-lg font-bold text-white">Import Data</h3>
                  <textarea value={syncCode} onChange={e => setSyncCode(e.target.value)} className="w-full h-32 bg-slate-900 border border-slate-700 rounded-lg p-3 text-white text-[10px] font-mono outline-none focus:ring-1 focus:ring-indigo-500" placeholder="Paste your sync code here..."></textarea>
                  <button onClick={handleImport} className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all">
                    <RefreshCw size={18} /> Import & Refresh Website
                  </button>
               </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-lg font-bold text-white mb-2">New {activeTab}</h3>
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white text-sm outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Title" required />
                <input type="text" value={tags} onChange={e => setTags(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white text-sm outline-none focus:ring-2 focus:ring-indigo-500" placeholder={activeTab === 'note' ? "Category" : "Tags (comma separated)"} />
                {activeTab !== 'note' && <input type="url" value={customImageUrl} onChange={e => setCustomImageUrl(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white text-sm" placeholder="Custom Image URL (Optional)" />}
                {activeTab === 'project' && (
                  <div className="grid grid-cols-2 gap-3">
                    <input type="url" value={demoUrl} onChange={e => setDemoUrl(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-3 text-white text-xs" placeholder="Live Site" />
                    <input type="url" value={repoUrl} onChange={e => setRepoUrl(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-3 text-white text-xs" placeholder="GitHub" />
                  </div>
                )}
                {activeTab === 'note' ? (
                  <input type="url" value={noteUrl} onChange={e => setNoteUrl(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white text-sm" placeholder="File URL (Drive/PDF)" required />
                ) : (
                  <div className="space-y-1">
                    <div className="flex justify-between items-center px-1"><label className="text-[10px] text-slate-500 uppercase font-bold">Description</label><button type="button" onClick={handleGenerate} disabled={isGenerating || !title} className="text-[10px] text-indigo-400 font-bold flex items-center gap-1"><Wand2 size={12} /> AI AUTO-WRITE</button></div>
                    <textarea value={description} onChange={e => setDescription(e.target.value)} className="w-full h-32 bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white text-sm outline-none resize-none focus:ring-2 focus:ring-indigo-500" placeholder="Tell us more about this item..." required />
                  </div>
                )}
                <button type="submit" className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg flex items-center justify-center gap-2 transition-all"><Plus size={20} /> Add to Portfolio</button>
              </form>

              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white mb-2">Existing Items</h3>
                <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                  {(activeTab === 'course' ? data.courses : activeTab === 'project' ? data.projects : data.notes).map((item) => (
                    <div key={item.id} className="bg-slate-900 p-4 rounded-xl border border-slate-700 flex justify-between items-center group hover:border-slate-500 transition-colors">
                      <div className="min-w-0 pr-4">
                        <h4 className="font-bold text-white text-sm truncate">{item.title}</h4>
                        <p className="text-[10px] text-slate-500 truncate mt-1">{activeTab.toUpperCase()} • {item.id}</p>
                      </div>
                      <button onClick={() => handleDelete(item.id, activeTab)} className="text-slate-600 hover:text-red-400 p-2 transition-colors"><Trash2 size={18} /></button>
                    </div>
                  ))}
                  {(activeTab === 'course' ? data.courses : activeTab === 'project' ? data.projects : data.notes).length === 0 && (
                    <p className="text-slate-500 text-center py-10 italic">No {activeTab}s found.</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// -- Main Application Entry --

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [courseFilter, setCourseFilter] = useState<string>('all');
  const [data, setData] = useState<DataState>({ courses: [], projects: [], notes: [] });
  const [previewNote, setPreviewNote] = useState<Note | null>(null);

  useEffect(() => {
    setData(loadData());
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash.startsWith('course/')) {
        const part = hash.split('/')[1];
        if (['beginner', 'intermediate', 'advanced', 'all'].includes(part)) { setCourseFilter(part); setCurrentPage('courses'); setSelectedCourseId(null); }
        else { setSelectedCourseId(part); setCurrentPage('course-detail'); }
      } else if (hash.startsWith('courses')) { setCourseFilter('all'); setCurrentPage('courses'); setSelectedCourseId(null); }
      else if (hash) { setCurrentPage(hash); setSelectedCourseId(null); }
      else { setCurrentPage('home'); setSelectedCourseId(null); }
    };
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleUpdateData = (newData: DataState) => { 
    setData(newData); 
    saveData(newData); 
  };

  const navigate = (page: string) => { window.location.hash = page; };
  const handleCourseClick = (id: string) => { window.location.hash = `course/${id}`; };

  const selectedCourse = selectedCourseId ? data.courses.find(c => c.id === selectedCourseId) : null;
  const displayedCourses = data.courses.filter(c => courseFilter === 'all' || c.level.toLowerCase() === courseFilter.toLowerCase());

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans overflow-x-hidden selection:bg-indigo-500/30">
      <Navbar currentPage={currentPage} onNavigate={navigate} />
      <main className="flex-1 animate-in fade-in duration-500">
        {currentPage === 'home' && <Home />}
        {currentPage === 'courses' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 border-l-4 border-indigo-500 pl-4 capitalize">{courseFilter === 'all' ? 'IT Training Courses' : `${courseFilter} Courses`}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedCourses.map(c => <CourseCard key={c.id} course={c} onClick={handleCourseClick} />)}
            </div>
          </div>
        )}
        {currentPage === 'course-detail' && selectedCourse && <CourseDetail course={selectedCourse} notes={data.notes} onPreview={setPreviewNote} />}
        {currentPage === 'projects' && (
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
             <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 border-l-4 border-indigo-500 pl-4">Project Portfolio</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {data.projects.map(p => <ProjectCard key={p.id} project={p} />)}
             </div>
           </div>
        )}
        {currentPage === 'notes' && (
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
             <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 border-l-4 border-indigo-500 pl-4">Study Resources</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
               {data.notes.map(n => <NoteCard key={n.id} note={n} onPreview={setPreviewNote} />)}
             </div>
           </div>
        )}
        {currentPage === 'contact' && <Contact />}
        {currentPage === 'admin' && <Admin data={data} onUpdate={handleUpdateData} />}
      </main>

      {/* Global Note Preview Modal */}
      {previewNote && (
        <div className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center p-2 backdrop-blur-sm animate-in zoom-in-95 duration-200" onClick={() => setPreviewNote(null)}>
          <div className="bg-slate-900 w-full max-w-5xl h-[90vh] rounded-2xl flex flex-col border border-slate-700 shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center p-4 border-b border-slate-700 bg-slate-900/50">
              <h3 className="text-sm font-bold text-white truncate pr-4">{previewNote.title}</h3>
              <div className="flex items-center gap-2">
                   <a href={previewNote.url} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white text-xs font-bold transition-all"><Download size={14} className="inline mr-1" /> Download</a>
                   <button onClick={() => setPreviewNote(null)} className="p-2 text-slate-400 hover:text-white"><X size={20} /></button>
              </div>
            </div>
            <iframe src={previewNote.url} className="flex-1 bg-white" title="Preview" sandbox="allow-same-origin allow-scripts" />
          </div>
        </div>
      )}

      <footer className="bg-slate-950 border-t border-slate-800 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold mr-3">{`{A}`}</div>
            <span className="font-bold text-xl text-white">Anusha Portfolio</span>
          </div>
          <p className="text-slate-500 text-xs max-w-md mx-auto mb-8">Professional instructor and developer providing quality IT training and software solutions.</p>
          <div className="flex justify-center gap-6 mb-8 text-xs font-bold uppercase tracking-widest text-slate-400">
            <button onClick={() => navigate('courses')} className="hover:text-indigo-400 transition-colors">Courses</button>
            <button onClick={() => navigate('projects')} className="hover:text-indigo-400 transition-colors">Portfolio</button>
            <button onClick={() => navigate('notes')} className="hover:text-indigo-400 transition-colors">Notes</button>
            <button onClick={() => navigate('contact')} className="hover:text-indigo-400 transition-colors">Contact</button>
          </div>
          <p className="text-slate-700 text-[10px]">&copy; {new Date().getFullYear()} Anusha. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}