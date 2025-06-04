import { Facebook, Instagram, Linkedin, Twitter, Youtube, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import logo1 from '../../pages/images/logo1.png';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-6">
              <img src={logo1} alt="Logo" className="h-24 w-auto" />
            </div>
            <p className="text-gray-300 text-sm mb-4">
            Empowering students, women, and aspiring trainers to build their personal brand and digital visibility footer
            </p>
            <div className="flex space-x-3">
              <a href="https://www.linkedin.com/in/poornimmas/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-primary-500 transition duration-300">
                <Linkedin size={18} />
              </a>
              
             
              
              
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold mb-3 text-primary-400">Quick Links</h4>
            <ul className="space-y-1.5">
              <li><button onClick={() => scrollToSection('home')} className="text-gray-300 hover:text-primary-500 transition duration-300 text-sm">Home</button></li>
              <li><button onClick={() => scrollToSection('about')} className="text-gray-300 hover:text-primary-500 transition duration-300 text-sm">About Me</button></li>
              <li><button onClick={() => scrollToSection('what-i-do')} className="text-gray-300 hover:text-primary-500 transition duration-300 text-sm">What I Do</button></li>
              <li><button onClick={() => scrollToSection('circle')} className="text-gray-300 hover:text-primary-500 transition duration-300 text-sm">Women's Circle</button></li>
              <li><button onClick={() => scrollToSection('events')} className="text-gray-300 hover:text-primary-500 transition duration-300 text-sm">Events</button></li>
              <li><button onClick={() => scrollToSection('webinars')} className="text-gray-300 hover:text-primary-500 transition duration-300 text-sm">Webinars</button></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-semibold mb-3 text-primary-400">Contact</h4>
            <ul className="space-y-2">
              <li className="flex items-center text-sm">
                <span className="text-primary-500 mr-2">Email:</span> 
                <a href="mailto:contact@example.com" className="text-gray-300 hover:text-primary-500 transition duration-300"> poornima.sandeep@tech-shiksha.com</a>
              </li>
              <li className="flex items-center text-sm">
                <span className="text-primary-500 mr-2">WhatsApp:</span>
                <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-primary-500 transition duration-300">+91 92063 26416</a>
              </li>
              <li>
                <motion.button 
                  onClick={() => scrollToSection('contact')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block mt-2 px-3 py-1.5 bg-primary-600 text-white text-sm rounded hover:bg-primary-700 transition duration-300"
                >
                  Contact Me
                </motion.button>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-6 pt-4 text-center text-gray-400 text-sm">
          <p>&copy; {currentYear} Queen Flluence HUB. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}