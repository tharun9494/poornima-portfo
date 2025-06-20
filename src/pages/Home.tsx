// src/pages/Home.tsx
import { motion, useScroll, useTransform } from 'framer-motion';
import poornima from './images/poornima.png'; // Corrected import path for poornima.png
import image from './images/image.png'; // Added import for background image
import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase/config'; // Assuming your Firebase config is here
import AnimatedBackground from '../components/AnimatedBackground'; // Path to your AnimatedBackground component

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
  // These transforms are for scroll-based effects, currently not explicitly applied to elements here
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  // FIX: Corrected useState initialization for 'loading'
  const [nextWebinar, setNextWebinar] = useState<Webinar | null>(null);
  const [loading, setLoading] = useState(true); // Corrected this line

  // Effect to fetch the next upcoming webinar from Firestore
  useEffect(() => {
    const fetchNextWebinar = async () => {
      try {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Reset time for accurate date comparison

        // Query Firestore for the next webinar, ordered by date and limiting to 1
        const q = query(
          collection(db, 'webinars'),
          orderBy('date', 'asc'), // Assumes 'date' field is a string inYYYY-MM-DD format or similar sortable string
          limit(1)
        );
        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
          const webinar = { id: snapshot.docs[0].id, ...snapshot.docs[0].data() } as Webinar;
          const webinarDate = new Date(webinar.date);
          webinarDate.setHours(0, 0, 0, 0); // Reset time for comparison

          // Only set the webinar if its date is today or in the future
          if (webinarDate >= today) {
            setNextWebinar(webinar);
          }
        }
      } catch (error) {
        console.error('Error fetching next webinar:', error);
      } finally {
        setLoading(false); // Set loading to false regardless of success or error
      }
    };

    fetchNextWebinar();
  }, []); // Empty dependency array ensures this runs once on mount

  // Function to smoothly scroll to a section by its ID
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // The image source now correctly points to the locally imported image
  const poornimaImageSrc = poornima;

  return (
    <>
      {/* Hero Section - The main welcoming section of the page */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden
                   pt-8 sm:pt-10 md:pt-12 lg:pt-16" // Adjusted top padding to reduce space below navigation
      >
        {/* Background Image */}
        <div 
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            opacity: 0.1 // Very subtle background
          }}
        />

        {/* Animated Background Component - Provides the subtle white gradient and floating bubbles */}
        {/* Placed first (at the bottom of the section) to ensure content sits on top of it */}
        <AnimatedBackground />

        {/* Main Content of the Hero Section */}
        {/* z-20 ensures this content is above the AnimatedBackground */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 z-20 relative">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-10 lg:gap-12">
            {/* Left side: Text content and action buttons */}
            <motion.div
              className="w-full lg:w-[40%] text-center lg:text-left lg:mr-8" // MODIFIED: Adjusted width to 40% and added right margin
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <motion.h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-gray-800"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                Transform Your <span className="text-yellow-600 font-extrabold">Digital Success</span>
              </motion.h1>
              <motion.p
                className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-gray-600 font-medium"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                Expert mentorship and training for students and women entrepreneurs. Learn to build your personal brand, gain online visibility, and achieve your professional goals.
              </motion.p>
              <motion.div
                className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3 sm:gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection('what-i-do')}
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-blue-600 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Explore Services
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection('contact')}
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-gray-200 text-gray-800 rounded-full font-medium border border-gray-300 hover:bg-gray-300 transition-all duration-300"
                >
                  Get in Touch
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Right side: Hero image with a subtle animated gradient behind it */}
            <motion.div
              className="w-full lg:w-[60%] mt-8 lg:mt-0 lg:ml-8" // MODIFIED: Adjusted width to 60% and added left margin
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <div className="relative max-w-md mx-auto lg:max-w-none">
                {/* Subtle gradient behind the image, fading to transparent */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-transparent rounded-2xl blur-2xl"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <motion.img
                  src={poornimaImageSrc} // Using the imported image source
                  alt="Hero"
                  className="relative rounded-2xl shadow-2xl w-[900px] h-[700px] object-cover" // MODIFIED: Changed h-[450px] to h-[500px] for more height
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator at the bottom of the hero section */}
        {/* z-20 ensures visibility above the animated background */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-gray-600"
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

      {/* Services Overview Section */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Your Path to Success</h2>
            <p className="text-gray-700 max-w-3xl mx-auto font-medium">Comprehensive training and mentorship programs designed to accelerate your career and business growth.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* For Students Card */}
            <motion.div
              className="bg-blue-50 rounded-lg p-8 shadow-lg"
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-2xl font-bold mb-4 text-blue-800">Student Success Program</h3>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2">•</span>
                  <p className="text-gray-700 font-medium">Master AI tools and technologies for career advancement</p>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2">•</span>
                  <p className="text-gray-700 font-medium">One-on-one mentorship for personalized skill development</p>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2">•</span>
                  <p className="text-gray-700 font-medium">Hands-on technical workshops and industry-focused webinars</p>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2">•</span>
                  <p className="text-gray-700 font-medium">Access to exclusive student networking events</p>
                </li>
              </ul>
              <button onClick={() => scrollToSection('what-i-do')} className="px-6 sm:px-8 py-3 bg-blue-600 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300">Learn More</button>
            </motion.div>

            {/* For Women Entrepreneurs Card */}
            <motion.div
              className="bg-green-50 rounded-lg p-8 shadow-lg"
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-2xl font-bold mb-4 text-green-800">Women Entrepreneurs Program</h3>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <p className="text-gray-700 font-medium">Build a powerful personal brand that attracts clients</p>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <p className="text-gray-700 font-medium">Strategic visibility coaching to grow your business</p>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <p className="text-gray-700 font-medium">Practical tools and strategies for business growth</p>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <p className="text-gray-700 font-medium">Join a supportive community of women entrepreneurs</p>
                </li>
              </ul>
              <button onClick={() => scrollToSection('circle')} className="px-6 sm:px-8 py-3 bg-green-600 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300">Join the Circle</button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Testimonial Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            

            {/* Main Content */}
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
              {/* Testimonial Content */}
              <div className="w-full lg:w-3/5">
                <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl relative border border-gray-100">
                  {/* Quote Icon */}
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                    </svg>
                  </div>

                  <div className="relative z-10">
                    <p className="text-lg md:text-xl text-gray-700 mb-8 italic leading-relaxed">
                      "The mentorship program completely transformed my approach to personal branding.
                      I've gained the confidence and skills to establish my digital presence,
                      which has opened up numerous opportunities for my small business."
                    </p>

                    <div className="flex items-center">
                      <div className="w-16 h-16 rounded-full overflow-hidden mr-4 border-4 border-blue-100">
                        <img
                          src="https://media.licdn.com/dms/image/v2/D5622AQFaO2OK7ELiLg/feedshare-shrink_1280/feedshare-shrink_1280/0/1723695862368?e=1750896000&v=beta&t=4hzEPUUMZHwJC3o576LE7qGNa9rJhEydECdrqSySBHA"
                          alt="Poornimma S"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800 text-lg">Poornimma S</h4>
                        <p className="text-blue-600 font-medium">Queenflluence Hub</p>
                        <div className="flex items-center mt-1">
                         
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                
              </div>

              {/* Image Section */}
              <div className="w-full lg:w-2/5">
                <motion.div
                  className="relative flex justify-center"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <div className="relative">
                    {/* Decorative elements */}
                    <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400 rounded-full opacity-20 blur-xl"></div>
                    <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-blue-400 rounded-full opacity-20 blur-xl"></div>
                    
                    {/* Main image container */}
                    <div className="relative bg-gradient-to-br from-blue-600/10 to-purple-600/10 rounded-3xl p-4">
                      <motion.img
                        src={image}
                        alt="Success Story"
                        className="relative rounded-2xl shadow-2xl w-full h-80 object-cover"
                        whileHover={{ scale: 1.05, rotate: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Webinar Preview Section */}
      {!loading && !nextWebinar ? null : (
        <section className="py-10 bg-gradient-to-r from-blue-700 to-green-700 text-white">
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
                    className="px-6 sm:px-8 py-3 bg-white text-blue-600 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300"
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
                  className="px-6 sm:px-8 py-3 bg-white text-blue-600 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  View Past Webinars
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Call to Action Section */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">Start Your Success Story Today</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8 font-medium">
            Join hundreds of successful students and entrepreneurs who have transformed their careers and businesses through our proven programs.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => scrollToSection('contact')} className="px-6 sm:px-8 py-3 bg-blue-600 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300">
              Get in Touch
            </button>
            <button onClick={() => scrollToSection('community')} className="px-6 sm:px-8 py-3 bg-gray-200 text-gray-800 rounded-full font-medium border border-gray-300 hover:bg-gray-300 transition-all duration-300">
              Explore Communities
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
