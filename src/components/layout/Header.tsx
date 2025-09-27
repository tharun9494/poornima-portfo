import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import LoginModal from '../auth/LoginModal';
import { useNavigate, useLocation } from 'react-router-dom';
import { FileText, Image, MessageSquare, Users, Settings, Building2, GraduationCap } from 'lucide-react';
import logo from '../../pages/images/logo.png'

interface SubItem {
  id: string;
  label: string;
  onClick?: () => void;
  icon?: React.ReactNode;
}

interface NavItem {
  id: string;
  label: string;
  subItems?: SubItem[];
  isButton?: boolean;
  onClick?: () => void;
  className?: string;
  icon?: React.ReactNode;
}

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { currentUser, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    // If we're on a separate page (not the main page), navigate to the main page first
    if (location.pathname !== '/') {
      navigate('/');
      // Wait a bit for navigation to complete, then scroll to section
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // We're on the main page, just scroll to section
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
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

  const handleAdminClick = () => {
    setActiveDropdown(activeDropdown === 'admin' ? null : 'admin');
  };

  const navItems: NavItem[] = [
    {
      id: 'what-i-do',
      label: 'Services',
      subItems: [
        { id: 'events', label: 'Events' },
        { id: 'webinars', label: 'Webinars' },
        { id: 'community', label: 'Community' },
        { id: 'student-community', label: 'Student Community' },
        { id: 'gallery', label: 'Gallery' },
        { id: 'testimonials', label: 'Testimonials' }
      ]
    },
    { 
      id: 'memberships', 
      label: 'Memberships', 
      onClick: () => navigate('/memberships')
    },
    { 
      id: 'path', 
      label: 'Path', 
      onClick: () => navigate('/path')
    },
    { 
      id: 'success-stories', 
      label: 'Success Stories', 
      onClick: () => navigate('/success-stories')
    },
    ...(currentUser ? [
      { 
        id: 'admin', 
        label: 'Admin Dashboard', 
        isButton: true,
        onClick: () => navigate('/admin'),
        className: 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 flex items-center gap-2',
        icon: <Settings size={20} />
      }
    ] : []),
    { 
      id: 'auth', 
      label: currentUser ? 'Sign Out' : 'Login', 
      isButton: true,
      onClick: currentUser ? handleSignOut : handleLoginClick,
      className: currentUser 
        ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700' 
        : 'bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700'
    }
  ];

  return (
    <>
      <motion.header 
        className="fixed w-full z-50 bg-white shadow-lg border-b border-gray-200/50 transition-all duration-300"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <nav className="container mx-auto px-6">
          <div className="flex justify-between items-center py-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.02 }}
              className="flex items-center cursor-pointer"
              onClick={() => {
                if (location.pathname !== '/') {
                  navigate('/');
                } else {
                  scrollToSection('home');
                }
              }}
            >
              <img 
                src={logo} 
                alt="Logo" 
                className="h-20 w-auto object-contain"
              />
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center">
              {navItems.map((item) => (
                <div key={item.id} className="relative">
                  {item.subItems ? (
                    <div
                      onMouseEnter={() => setActiveDropdown(item.id)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200 flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100"
                      >
                        {item.icon}
                        {item.label}
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </motion.button>
                      
                      <AnimatePresence>
                        {activeDropdown === item.id && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="absolute left-0 mt-2 w-64 bg-white rounded-xl shadow-xl py-3 border border-gray-100"
                          >
                            {item.subItems.map((subItem) => (
                              <motion.button
                                key={subItem.id}
                                whileHover={{ x: 5 }}
                                onClick={subItem.onClick || (() => scrollToSection(subItem.id))}
                                className="flex items-center gap-3 w-full text-left px-4 py-3 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors duration-200 rounded-lg mx-2"
                              >
                                {subItem.icon}
                                {subItem.label}
                              </motion.button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={item.onClick || (() => scrollToSection(item.id))}
                      className={`text-sm font-medium transition-colors duration-200 ${
                        item.isButton 
                          ? `${item.className} text-white px-6 py-2 rounded-full flex items-center gap-2 shadow-lg hover:shadow-xl ml-4`
                          : `text-gray-700 hover:text-blue-600 px-4 py-2 rounded-lg hover:bg-gray-100`
                      }`}
                    >
                      {item.icon}
                      {item.label}
                    </motion.button>
                  )}
                </div>
              ))}
            </div>

                {/* Mobile Menu Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="lg:hidden p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors duration-200 focus:outline-none"
                  aria-label="Toggle menu"
                >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </motion.button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="lg:hidden mt-2 bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100"
              >
                <div className="px-3 py-2 space-y-1">
                  {navItems.map((item) => (
                    <div key={item.id}>
                      {item.subItems ? (
                        <div>
                          <motion.button
                            whileHover={{ x: 5 }}
                            onClick={() => setActiveDropdown(activeDropdown === item.id ? null : item.id)}
                            className="w-full text-left px-4 py-3 text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors flex items-center gap-2"
                          >
                            {item.icon}
                            {item.label}
                          </motion.button>
                          <AnimatePresence>
                            {activeDropdown === item.id && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="pl-4 space-y-1"
                              >
                                {item.subItems.map((subItem) => (
                                  <motion.button
                                    key={subItem.id}
                                    whileHover={{ x: 5 }}
                                    onClick={subItem.onClick || (() => scrollToSection(subItem.id))}
                                    className="flex items-center gap-3 w-full text-left px-4 py-3 text-sm text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors border-b border-gray-50 last:border-b-0"
                                  >
                                    {subItem.icon}
                                    {subItem.label}
                                  </motion.button>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <motion.button
                          whileHover={{ x: 5 }}
                          onClick={item.onClick || (() => scrollToSection(item.id))}
                          className={`w-full text-left px-4 py-3 text-sm font-medium rounded-lg transition-all flex items-center gap-2 ${
                            item.isButton
                              ? `${item.className} text-white shadow-lg hover:shadow-xl`
                              : 'text-gray-700 hover:text-primary-600 hover:bg-primary-50'
                          }`}
                        >
                          {item.icon}
                          {item.label}
                        </motion.button>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </motion.header>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </>
  );
};

export default Header;