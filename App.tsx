import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import { DataState, ContentType, Course, Note, Project } from './types';
import { loadData, saveData } from './services/storageService';
import { generateDescription } from './services/geminiService';
import { 
  Plus, Trash2, Wand2, MapPin, Phone, Mail, FileText, Settings, 
  ArrowLeft, Clock, Award, Target, BookOpen, Briefcase, Linkedin, 
  Github, Twitter, Download, Eye, X, ExternalLink, Image as ImageIcon, 
  Copy, Database, RefreshCw, CheckCircle2 
} from 'lucide-react';
import CourseCard from './components/CourseCard';
import ProjectCard from './components/ProjectCard';
import NoteCard from './components/NoteCard';

// -- Page Components --

const Home: React.FC = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div className="text-center py-10 md:py-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight mb-6 md:mb-8 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
        Build. Teach. Innovate.
      </h1>
      <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 mb-8 md:mb-10 leading-relaxed">
        Welcome to my digital garden. Professional IT training for beginners and advanced students, paired with real-world software projects.
      </p>
      <div className="flex justify-center gap-3 md:gap-4 flex-wrap">
        <button onClick={() => window.location.hash = 'courses/all'} className="px-6 md:px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-indigo-500/25">
          Explore Courses
        </button>
        <button onClick={() => window.location.hash = 'projects'} className="px-6 md:px-8 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-semibold transition-all border border-slate-700 hover:scale-105">
          View Projects
        </button>
      </div>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-12">
      <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 hover:border-indigo-500/50 transition-colors">
        <div className="w-12 h-12 bg-indigo-900/30 rounded-xl flex items-center justify-center text-indigo-400 mb-4">
          <BookOpen size={24} />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Expert Instruction</h3>
        <p className="text-slate-400 text-sm">Structured learning paths for C, Java, and modern Web Development.</p>
      </div>
      <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 hover:border-indigo-500/50 transition-colors">
        <div className="w-12 h-12 bg-indigo-900/30 rounded-xl flex items-center justify-center text-indigo-400 mb-4">
          <Briefcase size={24} />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Real World Projects</h3>
        <p className="text-slate-400 text-sm">Portfolio of deployed applications demonstrating full-stack expertise.</p>
      </div>
      <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 hover:border-indigo-500/50 transition-colors">
        <div className="w-12 h-12 bg-indigo-900/30 rounded-xl flex items-center justify-center text-indigo-400 mb-4">
          <Target size={24} />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Career Focused</h3>
        <p className="text-slate-400 text-sm">Providing the resources and notes you need to excel in interviews.</p>
      </div>
    </div>
  </div>
);

const Contact: React.FC = () => (
  <div className="max-w-4xl mx-auto px-4 py-12 md:py-20 animate-in fade-in duration-500">
    <div className="bg-slate-800 rounded-2xl border border-slate-700 p-8 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 p-10 opacity-5">
        <Mail size={200} />
      </div>
      <h2 className="text-3xl font-bold text-white mb-8">Let's Connect</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
        <div className="space-y-8">
          <div className="flex items-center gap-5">
            <div className="p-4 bg-indigo-900/40 rounded-2xl text-indigo-400 shadow-inner">
              <Mail size={28} />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Email Address</p>
              <p className="text-lg font-semibold text-slate-200">atomceatomce@gmail.com</p>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <div className="p-4 bg-indigo-900/40 rounded-2xl text-indigo-400 shadow-inner">
              <Phone size={28} />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Mobile Number</p>
              <p className="text-lg font-semibold text-slate-200">9035066863</p>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <div className="p-4 bg-indigo-900/40 rounded-2xl text-indigo-400 shadow-inner">
              <MapPin size={28} />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Office Location</p>
              <p className="text-lg font-semibold text-slate-200">Swastik Plaza, Hublli</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center gap-4">
          <h4 className="text-white font-bold mb-2">Follow my work</h4>
          <div className="flex gap-4">
            <a href="#" className="flex-1 p-4 bg-slate-900 border border-slate-700 rounded-xl hover:bg-indigo-600 hover:border-indigo-500 transition-all text-center group">
              <Linkedin className="inline mr-2 group-hover:scale-110 transition-transform" /> <span className="text-sm font-bold">LinkedIn</span>
            </a>
            <a href="#" className="flex-1 p-4 bg-slate-900 border border-slate-700 rounded-xl hover:bg-slate-700 hover:border-slate-500 transition-all text-center group">
              <Github className="inline mr-2 group-hover:scale-110 transition-transform" /> <span className="text-sm font-bold">GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// -- Course Detail View Component --

interface CourseDetailProps {
  course: Course;
  notes: Note[];
  onPreview: (note: Note) => void;
}

const CourseDetail: React.FC<CourseDetailProps> = ({ course, notes, onPreview }) => {
  const courseNotes = notes.filter(n => 
    course.tags.some(tag => n.category.toLowerCase().includes(tag.toLowerCase())) || 
    n.category.toLowerCase() === course.title.toLowerCase()
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button 
        onClick={() => window.location.hash = 'courses/all'} 
        className="flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors font-medium"
      >
        <ArrowLeft size={18} /> Back to Courses
      </button>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <div className="relative aspect-video rounded-3xl overflow-hidden border border-slate-700 shadow-2xl">
            <img 
              src={(course as any).imageUrl || `https://image.pollinations.ai/prompt/${encodeURIComponent(course.title + " programming code abstract technology high quality")}?width=1200&height=800&nologo=true`}
              alt={course.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60" />
            <div className="absolute bottom-6 left-6 right-6">
               <div className="flex gap-2 mb-4">
                 {course.tags.map(tag => (
                   <span key={tag} className="text-xs font-bold text-white bg-indigo-600/80 backdrop-blur-sm px-3 py-1 rounded-full uppercase tracking-wider">
                     {tag}
                   </span>
                 ))}
               </div>
               <h1 className="text-3xl md:text-5xl font-black text-white leading-tight">{course.title}</h1>
            </div>
          </div>

          <div className="bg-slate-800/50 rounded-3xl p-8 border border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <BookOpen className="text-indigo-400" />
              Course Overview
            </h2>
            <p className="text-slate-300 text-lg leading-relaxed whitespace-pre-line">
              {course.description}
            </p>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-slate-800 rounded-3xl p-8 border border-slate-700 shadow-xl">
            <h3 className="text-xl font-bold text-white mb-6 pb-4 border-b border-slate-700">Course Metadata</h3>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-indigo-900/40 rounded-xl flex items-center justify-center text-indigo-400">
                  <Award size={20} />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Skill Level</p>
                  <p className="text-white font-semibold">{course.level}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-indigo-900/40 rounded-xl flex items-center justify-center text-indigo-400">
                  <Clock size={20} />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Duration</p>
                  <p className="text-white font-semibold">{course.duration}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-indigo-900/40 rounded-xl flex items-center justify-center text-indigo-400">
                  <Target size={20} />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Access</p>
                  <p className="text-white font-semibold">Lifetime Access</p>
                </div>
              </div>
            </div>
            <button className="w-full mt-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold shadow-lg shadow-indigo-500/20 transition-all hover:scale-[1.02] active:scale-95">
              Enroll in Course
            </button>
          </div>

          <div className="bg-slate-800/30 rounded-3xl p-8 border border-slate-700 border-dashed">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <FileText className="text-indigo-400" size={18} />
              Related Study Materials
            </h3>
            <div className="space-y-3">
              {courseNotes.map(note => (
                <NoteCard key={note.id} note={note} onPreview={onPreview} />
              ))}
              {courseNotes.length === 0 && (
                <p className="text-slate-500 text-sm italic">No specific notes attached to this course yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// -- Admin Dashboard Component --

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
    alert('Item added successfully!');
  };

  const handleExport = () => {
    const code = btoa(JSON.stringify(data));
    setSyncCode(code);
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleImport = () => {
    if (!syncCode) return alert('Paste the sync code here first.');
    try {
      const decoded = JSON.parse(atob(syncCode));
      if (decoded.courses || decoded.projects || decoded.notes) {
        onUpdate(decoded);
        alert('Data updated! Refreshing page...');
        window.location.reload();
      } else {
        alert('Invalid code format.');
      }
    } catch (e) {
      alert('Error: Make sure you copied the correct code.');
    }
  };

  const handleDelete = (id: string, type: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    const newData = { ...data };
    if (type === 'course') newData.courses = newData.courses.filter(c => c.id !== id);
    else if (type === 'project') newData.projects = newData.projects.filter(p => p.id !== id);
    else if (type === 'note') newData.notes = newData.notes.filter(n => n.id !== id);
    onUpdate(newData);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:py-12 animate-in fade-in zoom-in-95 duration-500">
      <div className="bg-slate-800 rounded-3xl border border-slate-700 overflow-hidden shadow-2xl">
        <div className="p-3 md:p-4 bg-slate-900/80 border-b border-slate-700 flex flex-wrap justify-center gap-2">
          {['course', 'project', 'note', 'sync'].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab as any)} className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${activeTab === tab ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-slate-700'}`}>
              {tab === 'sync' ? <Database size={14} className="inline mr-1" /> : null}
              {tab}s
            </button>
          ))}
        </div>

        <div className="p-6 md:p-10">
          {activeTab === 'sync' ? (
            <div className="max-w-xl mx-auto space-y-8 text-center py-4">
               <div className="bg-indigo-900/10 p-8 rounded-3xl border border-indigo-500/20">
                  <h3 className="text-xl font-bold text-white mb-3">Cloud Sync (Local)</h3>
                  <p className="text-slate-400 text-sm mb-6">Use this code to transfer your added courses/projects between devices.</p>
                  <button onClick={handleExport} className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all">
                    {copied ? <CheckCircle2 size={20} /> : <Copy size={20} />}
                    {copied ? 'Data Copied!' : 'Export My Data Code'}
                  </button>
               </div>
               <div className="space-y-4">
                  <h3 className="text-xl font-bold text-white">Import Data Code</h3>
                  <textarea value={syncCode} onChange={e => setSyncCode(e.target.value)} className="w-full h-32 bg-slate-950 border border-slate-700 rounded-2xl p-4 text-white text-[10px] font-mono outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Paste the code here..."></textarea>
                  <button onClick={handleImport} className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-all">
                    <RefreshCw size={20} /> Save & Update Portfolio
                  </button>
               </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <form onSubmit={handleSubmit} className="space-y-5 bg-slate-900/30 p-6 rounded-2xl border border-slate-700">
                <h3 className="text-lg font-bold text-white mb-2">New {activeTab.toUpperCase()}</h3>
                <div className="space-y-4">
                  <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Title" required />
                  <input type="text" value={tags} onChange={e => setTags(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm outline-none focus:ring-2 focus:ring-indigo-500" placeholder={activeTab === 'note' ? "Category" : "Tags (comma separated)"} />
                  
                  {activeTab === 'course' && (
                    <select value={level} onChange={e => setLevel(e.target.value as any)} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm outline-none">
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  )}

                  {activeTab !== 'note' && <input type="url" value={customImageUrl} onChange={e => setCustomImageUrl(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm" placeholder="Image URL (Optional)" />}
                  
                  {activeTab === 'project' && (
                    <div className="grid grid-cols-2 gap-4">
                      <input type="url" value={demoUrl} onChange={e => setDemoUrl(e.target.value)} className="bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white text-xs" placeholder="Live Site" />
                      <input type="url" value={repoUrl} onChange={e => setRepoUrl(e.target.value)} className="bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white text-xs" placeholder="GitHub" />
                    </div>
                  )}

                  {activeTab === 'note' ? (
                    <input type="url" value={noteUrl} onChange={e => setNoteUrl(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm" placeholder="PDF/Document Link" required />
                  ) : (
                    <div className="space-y-2">
                      <div className="flex justify-between items-center"><label className="text-[10px] text-slate-500 font-black tracking-widest uppercase">Description</label><button type="button" onClick={handleGenerate} disabled={isGenerating || !title} className="text-[10px] text-indigo-400 font-bold hover:text-indigo-300 flex items-center gap-1 uppercase transition-colors"><Wand2 size={12} /> {isGenerating ? 'Thinking...' : 'AI Generate'}</button></div>
                      <textarea value={description} onChange={e => setDescription(e.target.value)} className="w-full h-32 bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm outline-none resize-none focus:ring-2 focus:ring-indigo-500" placeholder="Provide details..." required />
                    </div>
                  )}
                </div>
                <button type="submit" className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-xl flex items-center justify-center gap-3 transition-all"><Plus size={20} /> Create {activeTab}</button>
              </form>

              <div className="space-y-6">
                <h3 className="text-xl font-bold text-white flex items-center gap-2"><Database className="text-indigo-500" size={20} /> Manage Catalog</h3>
                <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                  {(activeTab === 'course' ? data.courses : activeTab === 'project' ? data.projects : data.notes).map((item) => (
                    <div key={item.id} className="bg-slate-900 border border-slate-700 p-4 rounded-2xl flex justify-between items-center group hover:border-indigo-500/50 transition-all">
                      <div className="min-w-0 pr-4">
                        <h4 className="font-bold text-white text-sm truncate">{item.title}</h4>
                        <div className="flex gap-2 mt-1">
                          <span className="text-[8px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full font-bold uppercase">{activeTab}</span>
                          <span className="text-[8px] bg-slate-800 text-indigo-400/70 px-2 py-0.5 rounded-full font-mono">{item.id.slice(-6)}</span>
                        </div>
                      </div>
                      <button onClick={() => handleDelete(item.id, activeTab)} className="text-slate-600 hover:text-red-400 p-3 bg-slate-950 rounded-xl transition-all"><Trash2 size={18} /></button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// -- Main Application Entry Point --

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [courseFilter, setCourseFilter] = useState<string>('all');
  const [data, setData] = useState<DataState>({ courses: [], projects: [], notes: [] });
  const [previewNote, setPreviewNote] = useState<Note | null>(null);

  useEffect(() => {
    const initialData = loadData();
    setData(initialData);

    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      
      if (hash.startsWith('course/')) {
        const part = hash.split('/')[1];
        if (['beginner', 'intermediate', 'advanced', 'all'].includes(part)) {
          setCourseFilter(part);
          setCurrentPage('courses');
          setSelectedCourseId(null);
        } else {
          setSelectedCourseId(part);
          setCurrentPage('course-detail');
        }
      } else if (hash.startsWith('courses')) {
        setCourseFilter('all');
        setCurrentPage('courses');
        setSelectedCourseId(null);
      } else if (hash) {
        setCurrentPage(hash);
        setSelectedCourseId(null);
      } else {
        setCurrentPage('home');
        setSelectedCourseId(null);
      }
      
      window.scrollTo({ top: 0, behavior: 'smooth' });
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
      
      <main className="flex-1">
        {currentPage === 'home' && <Home />}
        
        {currentPage === 'courses' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-12 border-l-8 border-indigo-600 pl-6 capitalize">
              {courseFilter === 'all' ? 'IT Training' : `${courseFilter} Training`}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayedCourses.map(c => <CourseCard key={c.id} course={c} onClick={handleCourseClick} />)}
            </div>
          </div>
        )}

        {currentPage === 'course-detail' && selectedCourse && (
          <CourseDetail course={selectedCourse} notes={data.notes} onPreview={setPreviewNote} />
        )}

        {currentPage === 'projects' && (
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
             <h2 className="text-3xl md:text-5xl font-bold text-white mb-12 border-l-8 border-indigo-600 pl-6">Portfolio</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {data.projects.map(p => <ProjectCard key={p.id} project={p} />)}
             </div>
           </div>
        )}

        {currentPage === 'notes' && (
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
             <h2 className="text-3xl md:text-5xl font-bold text-white mb-12 border-l-8 border-indigo-600 pl-6">Study Materials</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {data.notes.map(n => <NoteCard key={n.id} note={n} onPreview={setPreviewNote} />)}
             </div>
           </div>
        )}

        {currentPage === 'contact' && <Contact />}
        
        {currentPage === 'admin' && <Admin data={data} onUpdate={handleUpdateData} />}
      </main>

      {/* Note Preview Overlay */}
      {previewNote && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-2 backdrop-blur-md animate-in zoom-in-95 duration-200" onClick={() => setPreviewNote(null)}>
          <div className="bg-slate-900 w-full max-w-6xl h-[90vh] rounded-3xl flex flex-col border border-slate-700 shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center p-5 border-b border-slate-700 bg-slate-950/50">
              <h3 className="text-base font-bold text-white truncate">{previewNote.title}</h3>
              <div className="flex items-center gap-3">
                   <a href={previewNote.url} target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 rounded-xl text-white text-xs font-bold transition-all"><Download size={16} className="inline mr-2" /> Download</a>
                   <button onClick={() => setPreviewNote(null)} className="p-3 bg-slate-800 hover:bg-red-500 hover:text-white rounded-xl text-slate-400 transition-all"><X size={20} /></button>
              </div>
            </div>
            <div className="flex-1 bg-white relative">
               <iframe src={previewNote.url} className="w-full h-full" title="File Preview" sandbox="allow-same-origin allow-scripts" />
            </div>
          </div>
        </div>
      )}

      <footer className="bg-slate-950 border-t border-slate-800 py-16 mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-8">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-500/20">{`{A}`}</div>
            <span className="font-bold text-2xl text-white ml-4 tracking-tight">Anusha</span>
          </div>
          <p className="text-slate-700 text-[10px]">&copy; {new Date().getFullYear()} Anusha. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
