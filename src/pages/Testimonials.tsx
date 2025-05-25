import { motion } from 'framer-motion';
import { useState } from 'react';

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Entrepreneur",
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
    quote: "The mentorship program completely transformed my approach to personal branding. I've gained the confidence and skills to establish my digital presence, which has opened up numerous opportunities for my small business.",
    rating: 5
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Student",
    image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
    quote: "The training sessions were incredibly valuable. I learned practical skills that I could immediately apply to my business. The personalized attention and guidance made all the difference.",
    rating: 5
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Digital Marketer",
    image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg",
    quote: "Joining this program was one of the best decisions I've made for my career. The community support and expert guidance helped me take my digital marketing skills to the next level.",
    rating: 5
  },
  {
    id: 4,
    name: "David Kim",
    role: "Tech Entrepreneur",
    image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg",
    quote: "The AI and technology workshops were eye-opening. I've been able to implement cutting-edge solutions in my business, thanks to the practical knowledge gained from these sessions.",
    rating: 5
  }
];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Testimonials() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredTestimonials = activeFilter === 'all' 
    ? testimonials 
    : testimonials.filter(t => t.role.toLowerCase() === activeFilter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-primary-800 mb-6">
              Success Stories
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Hear from our community members about their journey and transformation through our programs.
            </p>
          </motion.div>

          {/* Filter Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {['all', 'entrepreneur', 'student', 'digital marketer', 'tech entrepreneur'].map((filter) => (
              <motion.button
                key={filter}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2 rounded-full font-medium transition-colors duration-300 ${
                  activeFilter === filter
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-primary-50'
                }`}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </motion.button>
            ))}
          </motion.div>

          {/* Testimonials Grid */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {filteredTestimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-xl p-8 shadow-lg"
              >
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-primary-700">{testimonial.name}</h3>
                    <p className="text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 italic">"{testimonial.quote}"</p>
              </motion.div>
            ))}
          </motion.div>
        
        </motion.div>
      </div>
    </div>
  );
} 