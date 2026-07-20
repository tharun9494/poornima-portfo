import { motion } from 'framer-motion';
import { useState } from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Entrepreneur",
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
    quote: "The mentorship program completely transformed my approach to personal branding. I've gained the confidence and skills to establish my digital presence, which has opened up numerous opportunities for my business.",
    rating: 5
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Student",
    image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
    quote: "The training sessions were incredibly valuable. I learned practical skills that I could immediately apply. The personalized attention and guidance made all the difference.",
    rating: 5
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Digital Marketer",
    image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg",
    quote: "Joining this program was one of the best decisions I've made for my career. The community support and expert guidance helped me take my digital presence to the next level.",
    rating: 5
  },
  {
    id: 4,
    name: "David Kim",
    role: "Tech Entrepreneur",
    image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg",
    quote: "The AI and technology workshops were eye-opening. I've been able to implement cutting-edge solutions in my workflow, thanks to the practical knowledge gained from these sessions.",
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
    <div className="bg-[#faf9fe] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-primary-50 border border-primary-200 text-primary-600 text-xs font-bold tracking-wider rounded-full uppercase mb-4">
              ★ Community Feedback
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0f0726]">
              Success <span className="text-primary-600">Stories</span>
            </h1>
            <p className="text-gray-600 text-base max-w-2xl mx-auto mt-4 font-medium">
              Hear from educators, students, and entrepreneurs about their transformation through our programs.
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12">
            {['all', 'entrepreneur', 'student', 'digital marketer', 'tech entrepreneur'].map((filter) => (
              <motion.button
                key={filter}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full capitalize transition-colors duration-200 text-xs font-bold ${
                  activeFilter === filter
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'bg-white border border-gray-200 text-gray-700 hover:bg-primary-50'
                }`}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </motion.button>
            ))}
          </div>

          {/* Testimonials Grid */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {filteredTestimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                variants={fadeInUp}
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-primary-100"
                    />
                    <div>
                      <h3 className="text-base font-extrabold text-[#0f0726]">{testimonial.name}</h3>
                      <p className="text-xs text-primary-600 font-semibold">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="flex mb-3 gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed font-medium italic">
                    "{testimonial.quote}"
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        
        </motion.div>
      </div>
    </div>
  );
}