import React, { useState, useRef, useEffect } from 'react';
import { Menu, X, Terminal, BookOpen, Briefcase, Settings, FileText, Phone, ChevronDown } from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showCourseMenu, setShowCourseMenu] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowCourseMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home', icon: <Terminal size={18} /> },
    { id: 'courses', label: 'Courses', icon: <BookOpen size={18} />, hasDropdown: true },
    { id: 'projects', label: 'Projects', icon: <Briefcase size={18} /> },
    { id: 'notes', label: 'Notes', icon: <FileText size={18} /> },
    { id: 'contact', label: 'Contact', icon: <Phone size={18} /> },
    { id: 'admin', label: 'Admin', icon: <Settings size={18} /> },
  ];

  const handleNav = (id: string) => {
    if (id === 'courses') {
      setShowCourseMenu(!showCourseMenu);
    } else {
      onNavigate(id);
      setIsOpen(false);
      setShowCourseMenu(false);
    }
  };

  const handleCourseFilter = (level: string) => {
    onNavigate(`courses/${level.toLowerCase()}`);
    setIsOpen(false);
    setShowCourseMenu(false);
  };

  return (
    <nav className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50 backdrop-blur-md bg-opacity-90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center cursor-pointer group" onClick={() => onNavigate('home')}>
             {/* Unique Logo {A} */}
            <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white font-bold font-mono text-lg shadow-lg shadow-indigo-500/20 ring-1 ring-white/10 mr-3 group-hover:scale-105 transition-transform">
              {`{A}`}
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-100 group-hover:text-white transition-colors">Anusha</span>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <div key={item.id} className="relative inline-block text-left" ref={item.id === 'courses' ? dropdownRef : null}>
                  <button
                    onClick={() => handleNav(item.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      currentPage.startsWith(item.id)
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    {item.icon}
                    {item.label}
                    {item.hasDropdown && <ChevronDown size={14} className={`transition-transform ${showCourseMenu ? 'rotate-180' : ''}`} />}
                  </button>

                  {/* Desktop Dropdown */}
                  {item.hasDropdown && showCourseMenu && (
                    <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-slate-800 ring-1 ring-black ring-opacity-5 focus:outline-none z-50 border border-slate-700 animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="py-1">
                        <button onClick={() => handleCourseFilter('Beginner')} className="block w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-white">Beginner Courses</button>
                        <button onClick={() => handleCourseFilter('Intermediate')} className="block w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-white">Intermediate Courses</button>
                        <button onClick={() => handleCourseFilter('Advanced')} className="block w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-white">Advanced Courses</button>
                        <div className="border-t border-slate-700 my-1"></div>
                        <button onClick={() => handleCourseFilter('All')} className="block w-full text-left px-4 py-2 text-sm text-indigo-400 hover:bg-slate-700 hover:text-indigo-300">All Courses</button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="bg-slate-800 inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-700 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-slate-800 border-b border-slate-700">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <div key={item.id}>
                <button
                  onClick={() => handleNav(item.id)}
                  className={`flex items-center gap-3 w-full text-left px-3 py-3 rounded-md text-base font-medium ${
                    currentPage.startsWith(item.id)
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  {item.icon}
                  {item.label}
                  {item.hasDropdown && <ChevronDown size={16} className={`ml-auto transition-transform ${showCourseMenu ? 'rotate-180' : ''}`} />}
                </button>
                {/* Mobile Dropdown */}
                {item.hasDropdown && showCourseMenu && (
                   <div className="pl-10 space-y-1 bg-slate-900/50 py-2 rounded-md mt-1 mb-2">
                      <button onClick={() => handleCourseFilter('Beginner')} className="block w-full text-left px-3 py-2 text-sm text-slate-400 hover:text-white">Beginner</button>
                      <button onClick={() => handleCourseFilter('Intermediate')} className="block w-full text-left px-3 py-2 text-sm text-slate-400 hover:text-white">Intermediate</button>
                      <button onClick={() => handleCourseFilter('Advanced')} className="block w-full text-left px-3 py-2 text-sm text-slate-400 hover:text-white">Advanced</button>
                      <button onClick={() => handleCourseFilter('All')} className="block w-full text-left px-3 py-2 text-sm text-indigo-400 font-medium">All Courses</button>
                   </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;