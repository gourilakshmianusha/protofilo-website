import React, { useState } from 'react';
import { Menu, X, Terminal, BookOpen, Briefcase, Settings, FileText, Phone } from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: <Terminal size={18} /> },
    { id: 'courses', label: 'Courses', icon: <BookOpen size={18} /> },
    { id: 'projects', label: 'Projects', icon: <Briefcase size={18} /> },
    { id: 'notes', label: 'Notes', icon: <FileText size={18} /> },
    { id: 'contact', label: 'Contact', icon: <Phone size={18} /> },
    { id: 'admin', label: 'Admin', icon: <Settings size={18} /> },
  ];

  const handleNav = (id: string) => {
    onNavigate(id);
    setIsOpen(false);
  };

  return (
    <nav className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50 backdrop-blur-md bg-opacity-90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center cursor-pointer group" onClick={() => handleNav('home')}>
             {/* Unique Logo {A} */}
            <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white font-bold font-mono text-lg shadow-lg shadow-indigo-500/20 ring-1 ring-white/10 mr-3 group-hover:scale-105 transition-transform">
              {`{A}`}
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-100 group-hover:text-white transition-colors">Anusha</span>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentPage === item.id
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
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
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`flex items-center gap-3 w-full text-left px-3 py-3 rounded-md text-base font-medium ${
                  currentPage === item.id
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;