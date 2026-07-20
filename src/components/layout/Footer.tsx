import { Facebook, Instagram, Linkedin, Twitter, Youtube, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import logo from '../../pages/images/logo.png';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#0f0726] text-white border-t border-purple-950/50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-6">
              <div className="bg-white/95 backdrop-blur px-3 py-1.5 rounded-xl border border-purple-200/50 shadow-sm inline-block">
                <img src={logo} alt="Logo" className="h-16 sm:h-20 w-auto object-contain" />
              </div>
            </div>
            <p className="text-gray-300 text-sm mb-6 max-w-md leading-relaxed font-medium">
              Empowering students, women, and aspiring trainers to build their personal brand and digital visibility.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.linkedin.com/in/poornimmas/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/5 hover:bg-primary-600 text-gray-300 hover:text-white transition duration-300">
                <Linkedin size={18} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/5 hover:bg-accent-600 text-gray-300 hover:text-white transition duration-300">
                <Instagram size={18} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/5 hover:bg-red-600 text-gray-300 hover:text-white transition duration-300">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-4 text-accent-400">Quick Links</h4>
            <ul className="space-y-2.5">
              <li><button onClick={() => scrollToSection('home')} className="text-gray-300 hover:text-primary-400 transition duration-300 text-sm font-medium">Home</button></li>
              <li><button onClick={() => scrollToSection('about')} className="text-gray-300 hover:text-primary-400 transition duration-300 text-sm font-medium">About Me</button></li>
              <li><button onClick={() => scrollToSection('what-i-do')} className="text-gray-300 hover:text-primary-400 transition duration-300 text-sm font-medium">Programs & Services</button></li>
              <li><button onClick={() => scrollToSection('circle')} className="text-gray-300 hover:text-primary-400 transition duration-300 text-sm font-medium">Women's Circle</button></li>
              <li><button onClick={() => scrollToSection('events')} className="text-gray-300 hover:text-primary-400 transition duration-300 text-sm font-medium">Events & Workshops</button></li>
              <li><button onClick={() => scrollToSection('webinars')} className="text-gray-300 hover:text-primary-400 transition duration-300 text-sm font-medium">Webinars & Resources</button></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-4 text-accent-400">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center text-sm font-medium">
                <span className="text-primary-400 font-semibold mr-2">Email:</span>
                <a href="mailto:connect@aiinfluencerhub.in" className="text-gray-300 hover:text-primary-400 transition duration-300">connect@aiinfluencerhub.in</a>
              </li>
              <li className="flex items-center text-sm font-medium">
                <span className="text-primary-400 font-semibold mr-2">WhatsApp:</span>
                <a href="https://wa.me/919206326416" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-primary-400 transition duration-300">+91 92063 26416</a>
              </li>
              <li>
                <motion.button
                  onClick={() => scrollToSection('contact')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-2 px-5 py-2 bg-primary-600 text-white text-sm font-semibold rounded-lg hover:bg-primary-700 shadow-md transition duration-300"
                >
                  Contact Me
                </motion.button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-purple-900/40 mt-10 pt-6 text-center text-gray-400 text-xs">
          <p>&copy; {currentYear} Momentum X AI & AIINFLUENCERS HUB. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}