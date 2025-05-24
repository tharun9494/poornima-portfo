import { motion, useScroll, useTransform } from 'framer-motion';
import AnimatedSpheres from '../components/3d/AnimatedSpheres';
import poornima from './images/poornima.png'
import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase/config';

interface Webinar {
  id: string;
  title: string;
  date: string;
  time: string;
  duration: string;
  learningOutcomes: string;
  formLink: string;
  imageUrl: string;
  description: string;
}

export default function Home() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
  const [nextWebinar, setNextWebinar] = useState<Webinar | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNextWebinar = async () => {
      try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const q = query(
          collection(db, 'webinars'),
          orderBy('date', 'asc'),
          limit(1)
        );
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          const webinar = { id: snapshot.docs[0].id, ...snapshot.docs[0].data() } as Webinar;
          const webinarDate = new Date(webinar.date);
          webinarDate.setHours(0, 0, 0, 0);
          
          // Only set the webinar if it's in the future
          if (webinarDate >= today) {
            setNextWebinar(webinar);
          }
        }
      } catch (error) {
        console.error('Error fetching next webinar:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNextWebinar();
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } 
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28">
        {/* Animated Background */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-primary-800 via-primary-900 to-secondary-900"
          style={{ opacity, scale }}
        >
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary-600/20 to-secondary-600/20 animate-gradient-x"></div>
          </motion.div>
        </motion.div>

        {/* 3D Spheres */}
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ opacity, scale }}
        >
          <AnimatedSpheres />
        </motion.div>

        {/* Content */}
        <div className="container mx-auto px-4 z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <motion.div 
              className="lg:w-1/2" 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                Transform Your <span className="text-yellow-400 font-extrabold">Digital Success</span>
              </motion.h1>
              <motion.p 
                className="text-lg md:text-xl mb-8 text-blue-100 font-medium"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                Expert mentorship and training for students and women entrepreneurs. Learn to build your personal brand, gain online visibility, and achieve your professional goals.
              </motion.p>
              <motion.div
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection('what-i-do')}
                  className="px-8 py-3 bg-primary-600 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Explore Services
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection('contact')}
                  className="px-8 py-3 bg-white/10 backdrop-blur-sm text-white rounded-full font-medium border border-white/20 hover:bg-white/20 transition-all duration-300"
                >
                  Get in Touch
                </motion.button>
              </motion.div>
            </motion.div>

            <motion.div
              className="lg:w-1/2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <div className="relative">
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-primary-600/20 to-secondary-600/20 rounded-2xl blur-2xl"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 0.8, 0.5]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <motion.img
                  src={poornima}
                  alt="Hero"
                  className="relative rounded-2xl shadow-2xl"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-white/60"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </motion.div>
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
                  src="https://media.licdn.com/dms/image/v2/D5622AQFaO2OK7ELiLg/feedshare-shrink_1280/feedshare-shrink_1280/0/1723695862368?e=1750896000&v=beta&t=4hzEPUUMZHwJC3o576LE7qGNa9rJhEydECdrqSySBHA" 
                  alt="Poornima S" 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold">Poornima S</h4>
                  <p className="text-sm text-gray-500">QueenfluenceHub</p>
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
      {!loading && !nextWebinar ? null : (
        <section className="py-20 bg-gradient-to-r from-secondary-600 to-primary-600 text-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Expert-Led Webinars</h2>
              <p className="max-w-3xl mx-auto text-blue-100 font-medium">
                Join our interactive sessions led by industry experts to master essential skills and connect with like-minded professionals.
              </p>
            </div>
            
            {loading ? (
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
              </div>
            ) : nextWebinar ? (
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-8 max-w-2xl mx-auto">
                <div className="mb-4 text-yellow-300 font-bold">NEXT WEBINAR</div>
                <h3 className="text-2xl font-bold mb-2 text-white">{nextWebinar.title}</h3>
                <p className="mb-4 text-blue-100">
                  Date: {new Date(nextWebinar.date).toLocaleDateString()} • {nextWebinar.time} • Duration: {nextWebinar.duration}
                </p>
                <p className="mb-6 text-blue-100">
                  {nextWebinar.learningOutcomes}
                </p>
                {nextWebinar.formLink && (
                  <a
                    href={nextWebinar.formLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn bg-white text-primary-600 hover:bg-gray-100"
                  >
                    Register Now
                  </a>
                )}
              </div>
            ) : (
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-8 max-w-2xl mx-auto text-center">
                <div className="mb-6">
                  <svg 
                    className="w-16 h-16 mx-auto text-yellow-300 mb-4" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <h3 className="text-xl font-semibold text-white mb-2">Stay Tuned!</h3>
                  <p className="text-blue-100">
                    We're currently planning our next exciting webinar. Check back soon for updates!
                  </p>
                </div>
                <button 
                  onClick={() => scrollToSection('webinars')} 
                  className="btn bg-white text-primary-600 hover:bg-gray-100"
                >
                  View Past Webinars
                </button>
              </div>
            )}
          </div>
        </section>
      )}
      
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