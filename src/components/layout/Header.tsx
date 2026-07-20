import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import LoginModal from '../auth/LoginModal';
import { useNavigate, useLocation } from 'react-router-dom';
import { Linkedin, Instagram, Youtube, Menu, X, Lock, LogOut, Settings } from 'lucide-react';
import logo from '../../pages/images/logo.png';

interface NavItem {
  id: string;
  label: string;
  onClick: () => void;
}

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { currentUser, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Detect active section on scroll
      const sections = ['home', 'about', 'what-i-do', 'events', 'webinars', 'community', 'student-community', 'contact'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  const handleLoginClick = () => {
    setIsLoginModalOpen(true);
    setIsMobileMenuOpen(false);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Failed to sign out', error);
    }
  };

  const navItems: NavItem[] = [
    { id: 'home', label: 'Home', onClick: () => scrollToSection('home') },
    { id: 'about', label: 'About', onClick: () => scrollToSection('about') },
    { id: 'what-i-do', label: 'Programs', onClick: () => scrollToSection('what-i-do') },
    { id: 'events', label: 'Workshops', onClick: () => scrollToSection('events') },
    { id: 'webinars', label: 'Resources', onClick: () => scrollToSection('webinars') },
    { id: 'community', label: 'Community', onClick: () => scrollToSection('community') },
    { id: 'student-community', label: 'Blog', onClick: () => scrollToSection('student-community') },
    { id: 'contact', label: 'Contact', onClick: () => scrollToSection('contact') }
  ];

  return (
    <>
      <header className="fixed w-full top-0 left-0 z-50 flex flex-col bg-white">
        {/* Announcement Bar */}
        <div className="bg-[#09031c] text-white text-xs py-2 px-4 sm:px-8 flex flex-col sm:flex-row justify-between items-center gap-2 z-50">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-400 animate-pulse shrink-0"></span>
            <span className="font-medium tracking-wide">Empowering Educators, Trainers, and Everyone to Master AI & Build Their Future.</span>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <a href="https://www.linkedin.com/in/poornimmas/" target="_blank" rel="noopener noreferrer" className="hover:text-primary-400 transition-colors">
              <Linkedin size={14} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary-400 transition-colors">
              <Instagram size={14} />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary-400 transition-colors">
              <Youtube size={14} />
            </a>
            
            {/* Tiny Admin / Login indicator */}
            <span className="text-gray-500">|</span>
            {currentUser ? (
              <div className="flex items-center gap-3">
                <button onClick={() => navigate('/admin')} className="hover:text-primary-400 transition-colors flex items-center gap-1">
                  <Settings size={12} />
                  <span>Admin</span>
                </button>
                <button onClick={handleSignOut} className="hover:text-red-400 transition-colors flex items-center gap-1">
                  <LogOut size={12} />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <button onClick={handleLoginClick} className="hover:text-primary-400 transition-colors flex items-center gap-1">
                <Lock size={12} />
                <span>Admin Login</span>
              </button>
            )}
          </div>
        </div>

        {/* Main Navbar */}
        <nav className={`w-full bg-white transition-all duration-300 border-b border-gray-100 ${
          isScrolled ? 'py-2 shadow-md' : 'py-3 shadow-sm'
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            {/* Logo Section */}
            <div
              className="flex items-center cursor-pointer select-none"
              onClick={() => scrollToSection('home')}
            >
              <img 
                src={logo} 
                alt="Logo" 
                className="h-14 sm:h-16 w-auto object-contain"
              />
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={item.onClick}
                    className={`relative px-3 py-2 text-sm font-semibold transition-colors duration-200 ${
                      isActive ? 'text-primary-600' : 'text-gray-600 hover:text-primary-600'
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute bottom-0 left-3 right-3 h-[2px] bg-primary-600"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}

              {/* Main Community CTA Button */}
              <button
                onClick={() => scrollToSection('community')}
                className="ml-4 px-5 py-2.5 bg-primary-600 text-white text-sm font-semibold rounded-lg hover:bg-primary-700 transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                Join Our Community
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-md text-gray-600 hover:text-primary-600 hover:bg-primary-50 transition-colors focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation Dropdown */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
              >
                <div className="px-4 pt-2 pb-4 space-y-1">
                  {navItems.map((item) => {
                    const isActive = activeSection === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={item.onClick}
                        className={`w-full text-left px-4 py-2.5 text-sm font-semibold rounded-lg transition-colors ${
                          isActive
                            ? 'text-primary-600 bg-primary-50'
                            : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
                        }`}
                      >
                        {item.label}
                      </button>
                    );
                  })}
                  
                  <div className="pt-2 px-4">
                    <button
                      onClick={() => scrollToSection('community')}
                      className="w-full text-center py-2.5 bg-primary-600 text-white text-sm font-semibold rounded-lg hover:bg-primary-700 transition-colors duration-200 shadow-md"
                    >
                      Join Our Community
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </>
  );
};

export default Header;