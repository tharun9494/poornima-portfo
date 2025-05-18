import { motion } from 'framer-motion';
import AnimatedSpheres from '../components/3d/AnimatedSpheres';

export default function Home() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-800 to-secondary-800 text-white">
        <div className="container mx-auto px-4 z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <motion.div 
              className="lg:w-1/2" 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
                Transform Your <span className="text-yellow-400 font-extrabold">Digital Success</span>
              </h1>
              <p className="text-lg md:text-xl mb-8 text-blue-100 font-medium">
                Expert mentorship and training for students and women entrepreneurs. Learn to build your personal brand, gain online visibility, and achieve your professional goals.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <button onClick={() => scrollToSection('circle')} className="btn bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold px-6 py-3 rounded-lg shadow-lg transition-all duration-300">
                  Join Women's Circle
                </button>
                <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="btn bg-white hover:bg-blue-50 text-primary-600 font-bold px-6 py-3 rounded-lg shadow-lg border-2 border-white transition-all duration-300">
                  Join WhatsApp Community
                </a>
                <button onClick={() => scrollToSection('webinars')} className="btn bg-blue-400 hover:bg-blue-300 text-white font-bold px-6 py-3 rounded-lg shadow-lg transition-all duration-300">
                  Register for Webinars
                </button>
              </div>
            </motion.div>
            
            <motion.div 
              className="lg:w-1/2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <div className="relative w-full h-96 rounded-xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                  alt="Empowerment Workshop" 
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <div className="w-8 h-12 border-2 border-white rounded-full flex justify-center items-start p-1">
            <div className="w-1 h-3 bg-white rounded-full animate-bounce"></div>
          </div>
        </motion.div>
      </section>
      
      {/* Services Overview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary-800">Your Path to Success</h2>
            <p className="text-gray-700 max-w-3xl mx-auto font-medium">Comprehensive training and mentorship programs designed to accelerate your career and business growth.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* For Students */}
            <motion.div 
              className="bg-primary-50 rounded-lg p-8 shadow-lg"
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-2xl font-bold mb-4 text-primary-800">Student Success Program</h3>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <span className="text-yellow-500 mr-2">•</span>
                  <p className="text-gray-700 font-medium">Master AI tools and technologies for career advancement</p>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-500 mr-2">•</span>
                  <p className="text-gray-700 font-medium">One-on-one mentorship for personalized skill development</p>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-500 mr-2">•</span>
                  <p className="text-gray-700 font-medium">Hands-on technical workshops and industry-focused webinars</p>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-500 mr-2">•</span>
                  <p className="text-gray-700 font-medium">Access to exclusive student networking events</p>
                </li>
              </ul>
              <button onClick={() => scrollToSection('what-i-do')} className="btn btn-primary">Learn More</button>
            </motion.div>
            
            {/* For Women */}
            <motion.div 
              className="bg-secondary-50 rounded-lg p-8 shadow-lg"
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-2xl font-bold mb-4 text-secondary-800">Women Entrepreneurs Program</h3>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <p className="text-gray-700 font-medium">Build a powerful personal brand that attracts clients</p>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <p className="text-gray-700 font-medium">Strategic visibility coaching to grow your business</p>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <p className="text-gray-700 font-medium">Practical tools and strategies for business growth</p>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <p className="text-gray-700 font-medium">Join a supportive community of women entrepreneurs</p>
                </li>
              </ul>
              <button onClick={() => scrollToSection('circle')} className="btn btn-secondary">Join the Circle</button>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Featured Testimonial */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-lg shadow-lg relative">
            <div className="text-6xl text-primary-200 absolute top-4 left-4">"</div>
            <div className="relative z-10">
              <p className="text-lg md:text-xl text-gray-700 mb-6 italic">
                The mentorship program completely transformed my approach to personal branding. 
                I've gained the confidence and skills to establish my digital presence, 
                which has opened up numerous opportunities for my small business.
              </p>
              
              <div className="flex items-center">
                <img 
                  src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                  alt="Sarah Johnson" 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold">Sarah Johnson</h4>
                  <p className="text-sm text-gray-500">Entrepreneur & Program Participant</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-10">
            <button onClick={() => scrollToSection('testimonials')} className="btn btn-outline border-primary-500">
              Read More Testimonials
            </button>
          </div>
        </div>
      </section>
      
      {/* Upcoming Webinar Preview */}
      <section className="py-20 bg-gradient-to-r from-secondary-600 to-primary-600 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Expert-Led Webinars</h2>
            <p className="max-w-3xl mx-auto text-blue-100 font-medium">
              Join our interactive sessions led by industry experts to master essential skills and connect with like-minded professionals.
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-8 max-w-2xl mx-auto">
            <div className="mb-4 text-yellow-300 font-bold">NEXT WEBINAR</div>
            <h3 className="text-2xl font-bold mb-2 text-white">Master Your Personal Brand: A Step-by-Step Guide</h3>
            <p className="mb-4 text-blue-100">Date: June 15, 2025 • 2:00 PM EST • Duration: 90 minutes</p>
            <p className="mb-6">
              In this hands-on webinar, you'll learn:
              • How to create a compelling personal brand story
              • Strategies to increase your online visibility
              • Tools to attract your ideal clients or employers
              • Action plan for immediate implementation
            </p>
            <button onClick={() => scrollToSection('webinars')} className="btn bg-white text-primary-600 hover:bg-gray-100">
              Register Now
            </button>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary-800">Start Your Success Story Today</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8 font-medium">
            Join hundreds of successful students and entrepreneurs who have transformed their careers and businesses through our proven programs.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => scrollToSection('contact')} className="btn btn-primary">
              Get in Touch
            </button>
            <button onClick={() => scrollToSection('community')} className="btn btn-secondary">
              Explore Communities
            </button>
          </div>
        </div>
      </section>
    </>
  );
}