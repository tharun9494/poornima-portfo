import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

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
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">Empower</h3>
            <p className="text-gray-300 mb-4">
              Empowering students and women to build their personal brand and gain digital visibility.
            </p>
            <div className="flex space-x-4">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-primary-500 transition duration-300">
                <Linkedin size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-primary-500 transition duration-300">
                <Instagram size={20} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-primary-500 transition duration-300">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-primary-500 transition duration-300">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><button onClick={() => scrollToSection('home')} className="text-gray-300 hover:text-primary-500 transition duration-300">Home</button></li>
              <li><button onClick={() => scrollToSection('about')} className="text-gray-300 hover:text-primary-500 transition duration-300">About Me</button></li>
              <li><button onClick={() => scrollToSection('what-i-do')} className="text-gray-300 hover:text-primary-500 transition duration-300">What I Do</button></li>
              <li><button onClick={() => scrollToSection('circle')} className="text-gray-300 hover:text-primary-500 transition duration-300">Women's Circle</button></li>
              <li><button onClick={() => scrollToSection('events')} className="text-gray-300 hover:text-primary-500 transition duration-300">Events</button></li>
              <li><button onClick={() => scrollToSection('webinars')} className="text-gray-300 hover:text-primary-500 transition duration-300">Webinars</button></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Get In Touch</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-primary-500 mr-2">Email:</span> 
                <a href="mailto:contact@example.com" className="text-gray-300 hover:text-primary-500 transition duration-300">contact@example.com</a>
              </li>
              <li className="flex items-start">
                <span className="text-primary-500 mr-2">WhatsApp:</span>
                <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-primary-500 transition duration-300">+1 (234) 567-890</a>
              </li>
              <li>
                <button onClick={() => scrollToSection('contact')} className="inline-block mt-4 px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 transition duration-300">
                  Contact Me
                </button>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-400">
          <p>&copy; {currentYear} Empower. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}