import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import LoginModal from '../auth/LoginModal';
import { useNavigate, useLocation } from 'react-router-dom';

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
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
      setActiveDropdown(null);
    }
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
    navigate('/admin');
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    {
      id: 'what-i-do',
      label: 'What I Do',
      subItems: [
        { id: 'circle', label: 'Circle' },
        { id: 'webinars', label: 'Webinars' },
        { id: 'community', label: 'Community' },
        { id: 'gallery', label: 'Gallery' },
        { id: 'testimonials', label: 'Testimonials' }
      ]
    },
    { id: 'contact', label: 'Contact' },
    ...(currentUser ? [
      { 
        id: 'admin', 
        label: 'Admin Dashboard', 
        isButton: true,
        onClick: handleAdminClick,
        className: 'bg-green-600 hover:bg-green-700 flex items-center gap-2',
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        )
      }
    ] : []),
    { 
      id: 'auth', 
      label: currentUser ? 'Sign Out' : 'Login', 
      isButton: true,
      onClick: currentUser ? handleSignOut : handleLoginClick,
      className: currentUser ? 'bg-red-600 hover:bg-red-700' : 'bg-primary-600 hover:bg-primary-700'
    }
  ];

  return (
    <>
      <header className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-md py-2' 
          : 'bg-transparent py-4'
      }`}>
        <nav className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent"
            >
              Your Logo
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
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
                        className={`text-sm font-medium transition-colors ${
                          isScrolled ? 'text-gray-800 hover:text-primary-600' : 'text-white hover:text-primary-200'
                        }`}
                      >
                        {item.label}
                      </motion.button>
                      
                      <AnimatePresence>
                        {activeDropdown === item.id && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2"
                          >
                            {item.subItems.map((subItem) => (
                              <motion.button
                                key={subItem.id}
                                whileHover={{ x: 5 }}
                                onClick={() => scrollToSection(subItem.id)}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600"
                              >
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
                      className={`text-sm font-medium transition-colors ${
                        item.isButton 
                          ? `${item.className || 'bg-primary-600'} text-white px-4 py-2 rounded-full flex items-center`
                          : isScrolled 
                            ? 'text-gray-800 hover:text-primary-600' 
                            : 'text-white hover:text-primary-200'
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
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-gray-600 hover:text-gray-900"
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
            </button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden mt-4 bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div className="px-4 py-2 space-y-2">
                  {navItems.map((item) => (
                    <div key={item.id}>
                      {item.subItems ? (
                        <div>
                          <button
                            onClick={() => setActiveDropdown(activeDropdown === item.id ? null : item.id)}
                            className="w-full text-left px-4 py-2 text-sm font-medium text-gray-700 hover:bg-primary-50 hover:text-primary-600"
                          >
                            {item.label}
                          </button>
                          {activeDropdown === item.id && (
                            <div className="pl-4 space-y-1">
                              {item.subItems.map((subItem) => (
                                <button
                                  key={subItem.id}
                                  onClick={() => scrollToSection(subItem.id)}
                                  className="block w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-primary-50 hover:text-primary-600"
                                >
                                  {subItem.label}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : (
                        <button
                          onClick={item.onClick || (() => scrollToSection(item.id))}
                          className={`w-full text-left px-4 py-2 text-sm font-medium ${
                            item.isButton
                              ? `${item.className || 'bg-primary-600'} text-white rounded-full flex items-center gap-2`
                              : 'text-gray-700 hover:bg-primary-50 hover:text-primary-600'
                          }`}
                        >
                          {item.icon}
                          {item.label}
                        </button>
                      )}
                    </div>
                  ))}
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