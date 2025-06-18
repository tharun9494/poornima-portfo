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
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    {
      id: 'what-i-do',
      label: 'What I Do',
      subItems: [
        { id: 'circle', label: 'Circle' },
        { id: 'events', label: 'Events' },
        { id: 'webinars', label: 'Webinars' },
        { id: 'gallery', label: 'Gallery' },
        { id: 'testimonials', label: 'Testimonials' },
        { id: 'community', label: 'Community' },
        { id: 'student-community', label: 'Student Community' },
        { id: 'ainxtgen', label: 'Ainxtgen' },
        { id: 'queenflluence-hub', label: 'Queenflluence Hub' },
        { 
          id: 'companies', 
          label: 'Our Companies', 
          onClick: () => navigate('/companies'),
          
        },
        { 
          id: 'colleges', 
          label: 'Our Colleges', 
          onClick: () => navigate('/colleges'),
        
        }
      ]
    },
    { id: 'contact', label: 'Contact' },
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
        className={`fixed w-full z-50 transition-all duration-300 py-2 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-lg' 
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <nav className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 cursor-pointer"
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
                className="h-16 w-auto object-contain"
                style={{ maxHeight: '64px' }}
              />
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <div key={item.id} className="relative group">
                  {item.subItems ? (
                    <div
                      onMouseEnter={() => setActiveDropdown(item.id)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`text-sm font-medium transition-colors flex items-center gap-2 ${
                          isScrolled 
                            ? 'text-gray-800 hover:text-primary-600' 
                            : 'text-gray-800 hover:text-primary-600'
                        }`}
                      >
                        {item.icon}
                        {item.label}
                      </motion.button>
                      
                      <AnimatePresence>
                        {activeDropdown === item.id && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="absolute left-0 mt-2 w-64 bg-white/95 backdrop-blur-md rounded-lg shadow-xl py-3 border border-gray-100"
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
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={item.onClick || (() => scrollToSection(item.id))}
                      className={`text-sm font-medium transition-all duration-300 ${
                        item.isButton 
                          ? `${item.className} text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg hover:shadow-xl`
                          : isScrolled 
                            ? 'text-gray-800 hover:text-primary-600' 
                            : 'text-gray-800 hover:text-primary-600'
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
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-gray-600 hover:text-gray-900 focus:outline-none"
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
                className="md:hidden mt-2 bg-white/95 backdrop-blur-md rounded-xl shadow-xl overflow-hidden border border-gray-100"
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