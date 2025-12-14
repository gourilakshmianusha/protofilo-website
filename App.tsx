import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import { DataState, ContentType, Course, Note } from './types';
import { loadData, saveData } from './services/storageService';
import { generateDescription } from './services/geminiService';
import { Plus, Trash2, Wand2, MapPin, Phone, Mail, FileText, Settings, ArrowLeft, Clock, Award, Target, BookOpen, Linkedin, Github, Twitter, Download, Eye, X } from 'lucide-react';
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
        <button onClick={() => window.location.hash = 'courses/all'} className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-all">
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

const CourseDetail: React.FC<{ course: Course; notes: Note[]; onPreview: (note: Note) => void }> = ({ course, notes, onPreview }) => {
  const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(course.title + " programming code abstract technology high quality")}?width=1200&height=400&nologo=true`;

  // Find related notes based on simple tag/title matching
  const relatedNotes = notes.filter(note => {
     const titleMatch = course.title.toLowerCase().includes(note.category.toLowerCase());
     const tagMatch = course.tags.some(t => t.toLowerCase() === note.category.toLowerCase());
     return titleMatch || tagMatch;
  });

  return (
    <div className="animate-in fade-in duration-500">
      <div className="relative h-64 md:h-80 w-full overflow-hidden">
        <img src={imageUrl} alt={course.title} className="w-full h-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8 max-w-7xl mx-auto">
          <button 
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-indigo-400 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft size={20} /> Back to Courses
          </button>
          <div className="flex gap-2 mb-2">
             {course.tags.map(tag => (
                <span key={tag} className="px-2 py-1 bg-indigo-600/80 text-white text-xs font-bold rounded uppercase tracking-wider">{tag}</span>
             ))}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{course.title}</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700">
              <h2 className="text-2xl font-bold text-white mb-4">About this Course</h2>
              <p className="text-lg text-slate-300 leading-relaxed">{course.description}</p>
              
              <div className="mt-8 grid sm:grid-cols-2 gap-4">
                 <div className="p-4 bg-slate-900 rounded-lg border border-slate-700 flex items-center gap-3">
                    <Target className="text-indigo-400" />
                    <div>
                      <p className="text-xs text-slate-500 uppercase font-semibold">Skill Level</p>
                      <p className="text-white font-medium">{course.level}</p>
                    </div>
                 </div>
                 <div className="p-4 bg-slate-900 rounded-lg border border-slate-700 flex items-center gap-3">
                    <Clock className="text-indigo-400" />
                    <div>
                      <p className="text-xs text-slate-500 uppercase font-semibold">Duration</p>
                      <p className="text-white font-medium">{course.duration}</p>
                    </div>
                 </div>
              </div>
            </div>

            <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700">
               <h2 className="text-2xl font-bold text-white mb-6">What You Will Learn</h2>
               <ul className="space-y-3">
                 {[1,2,3,4].map((i) => (
                   <li key={i} className="flex gap-3 text-slate-300">
                     <Award className="text-emerald-500 shrink-0" size={20} />
                     <span>Comprehensive understanding of {course.title} core concepts and advanced techniques.</span>
                   </li>
                 ))}
                 <li className="flex gap-3 text-slate-300">
                    <Award className="text-emerald-500 shrink-0" size={20} />
                    <span>Real-world application development and problem-solving skills.</span>
                 </li>
               </ul>
            </div>

            {/* Related Notes Section */}
            {relatedNotes.length > 0 && (
                <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                        <FileText className="text-indigo-500" /> Course Notes & Materials
                    </h2>
                    <div className="grid gap-4">
                        {relatedNotes.map(note => (
                             <div key={note.id} className="flex items-center justify-between p-4 bg-slate-900 rounded-lg border border-slate-700 hover:border-indigo-500 transition-colors">
                                 <div className="flex items-center gap-3">
                                     <div className="p-2 bg-indigo-900/30 rounded text-indigo-400">
                                       <FileText size={20} />
                                     </div>
                                     <div>
                                        <h4 className="font-semibold text-white">{note.title}</h4>
                                        <span className="text-xs text-slate-500">Resource Category: {note.category}</span>
                                     </div>
                                 </div>
                                 <div className="flex gap-2">
                                     <button 
                                        onClick={() => onPreview(note)}
                                        className="p-2 text-slate-400 hover:text-indigo-400 hover:bg-slate-700 rounded-full transition-all"
                                        title="Preview"
                                     >
                                        <Eye size={20} />
                                     </button>
                                     <a 
                                        href={note.url} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-full transition-all"
                                        title="Download"
                                     >
                                        <Download size={20} />
                                     </a>
                                 </div>
                             </div>
                        ))}
                    </div>
                </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-indigo-900/20 p-6 rounded-2xl border border-indigo-500/30 sticky top-24">
              <h3 className="text-xl font-bold text-white mb-4">Ready to Start?</h3>
              <p className="text-slate-400 mb-6 text-sm">Enroll now to get access to full course materials, assignments, and mentorship.</p>
              
              <button 
                onClick={() => window.location.hash = 'contact'}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-indigo-500/25 mb-3"
              >
                Contact to Enroll
              </button>
              <button 
                onClick={() => window.location.hash = 'notes'}
                className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-semibold transition-all border border-slate-600 flex items-center justify-center gap-2"
              >
                <BookOpen size={18} /> Browse All Notes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

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
  const [level, setLevel] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Beginner'); // Course Level

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
        level: level, 
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
              {activeTab === 'course' && (
                <span className="text-xs text-indigo-400 bg-indigo-900/30 px-1.5 py-0.5 rounded">{item.level}</span>
              )}
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

              {activeTab === 'course' && (
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Level</label>
                  <select 
                    value={level} 
                    onChange={e => setLevel(e.target.value as any)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              )}

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
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [courseFilter, setCourseFilter] = useState<string>('all');
  const [data, setData] = useState<DataState>({ courses: [], projects: [], notes: [] });
  const [previewNote, setPreviewNote] = useState<Note | null>(null);

  useEffect(() => {
    setData(loadData());
    
    // Hash router handler
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      
      if (hash.startsWith('course/')) {
        // Check if it's a detail view or a filter view
        const part = hash.split('/')[1];
        if (part === 'beginner' || part === 'intermediate' || part === 'advanced' || part === 'all') {
             setCourseFilter(part);
             setCurrentPage('courses');
             setSelectedCourseId(null);
        } else {
             // It's an ID
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

  const handleCourseClick = (id: string) => {
    window.location.hash = `course/${id}`;
  };

  // Resolve selected course object
  const selectedCourse = selectedCourseId ? data.courses.find(c => c.id === selectedCourseId) : null;
  
  // Filter courses for display
  const displayedCourses = data.courses.filter(course => {
      if (courseFilter === 'all') return true;
      return course.level.toLowerCase() === courseFilter.toLowerCase();
  });

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      <Navbar currentPage={currentPage} onNavigate={navigate} />

      <main className="flex-1">
        {currentPage === 'home' && <Home />}
        
        {currentPage === 'courses' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-3xl font-bold text-white mb-8 border-l-4 border-indigo-500 pl-4 capitalize">
                {courseFilter === 'all' ? 'All IT Courses' : `${courseFilter} Courses`}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayedCourses.map(course => (
                <CourseCard key={course.id} course={course} onClick={handleCourseClick} />
              ))}
            </div>
            {displayedCourses.length === 0 && (
                <div className="text-center py-20 bg-slate-800 rounded-xl border border-slate-700">
                    <p className="text-slate-400">No courses found for this level.</p>
                </div>
            )}
          </div>
        )}

        {currentPage === 'course-detail' && selectedCourse && (
          <CourseDetail course={selectedCourse} notes={data.notes} onPreview={setPreviewNote} />
        )}

        {currentPage === 'course-detail' && !selectedCourse && (
           <div className="p-12 text-center text-slate-400">Course not found.</div>
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
                 <NoteCard key={note.id} note={note} onPreview={setPreviewNote} />
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

      {/* Note Preview Modal */}
      {previewNote && (
        <div className="fixed inset-0 z-[60] bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setPreviewNote(null)}>
          <div className="bg-slate-900 w-full max-w-4xl h-[85vh] rounded-xl flex flex-col border border-slate-700 shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center p-4 border-b border-slate-700 bg-slate-900">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <FileText className="text-indigo-500" size={20} />
                {previewNote.title}
              </h3>
              <div className="flex items-center gap-3">
                   <a 
                      href={previewNote.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white text-sm font-semibold transition-colors"
                   >
                     <Download size={16} /> Download
                   </a>
                   <button 
                      onClick={() => setPreviewNote(null)}
                      className="p-2 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors"
                   >
                     <X size={24} />
                   </button>
              </div>
            </div>
            <div className="flex-1 bg-slate-800 relative">
               <iframe 
                  src={previewNote.url} 
                  className="w-full h-full bg-white" 
                  title="Note Preview"
                  sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
               />
               <div className="absolute inset-0 -z-10 flex items-center justify-center text-slate-500">
                  Loading preview...
               </div>
            </div>
          </div>
        </div>
      )}

      <footer className="bg-slate-950 border-t border-slate-800 pt-16 pb-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white font-bold font-mono text-xl shadow-lg shadow-indigo-500/20 ring-1 ring-white/10 mr-3">
                  {`{A}`}
                </div>
                <span className="font-bold text-2xl tracking-tight text-white">Anusha</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Empowering students with practical IT skills and building the next generation of software solutions.
              </p>
              <div className="flex gap-4 mt-6">
                 <a href="https://linkedin.com" className="p-2 bg-slate-900 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"><Linkedin size={20} /></a>
                 <a href="https://github.com/anusha-dev" className="p-2 bg-slate-900 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"><Github size={20} /></a>
                 <a href="https://twitter.com" className="p-2 bg-slate-900 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"><Twitter size={20} /></a>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold text-white mb-6">Quick Links</h4>
              <ul className="space-y-3">
                <li><button onClick={() => navigate('courses/all')} className="text-slate-400 hover:text-indigo-400 transition-colors">All Courses</button></li>
                <li><button onClick={() => navigate('projects')} className="text-slate-400 hover:text-indigo-400 transition-colors">Portfolio Projects</button></li>
                <li><button onClick={() => navigate('notes')} className="text-slate-400 hover:text-indigo-400 transition-colors">Student Notes</button></li>
                <li><button onClick={() => navigate('contact')} className="text-slate-400 hover:text-indigo-400 transition-colors">Contact Support</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold text-white mb-6">Contact Info</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-slate-400">
                  <MapPin className="shrink-0 text-indigo-500" size={20} />
                  <span>#204 Flat, Swastik Plaza, Opp. Police Station, Hublli - 580032</span>
                </li>
                <li className="flex items-center gap-3 text-slate-400">
                  <Phone className="shrink-0 text-indigo-500" size={20} />
                  <span>9035066863</span>
                </li>
                <li className="flex items-center gap-3 text-slate-400">
                  <Mail className="shrink-0 text-indigo-500" size={20} />
                  <span>atomceatomce@gmail.com</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-900 text-center text-slate-500 text-sm">
            <p>&copy; {new Date().getFullYear()} Anusha. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}