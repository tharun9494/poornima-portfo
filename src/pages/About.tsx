import { motion } from 'framer-motion';

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

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
     
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-primary-800 mb-6">My Journey</h2>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>
                  Hi, I'm Poornimma S — an AI Instructor, Career Coach, and Personal Branding Mentor. I help
                  students, women entrepreneurs, and teachers gain confidence and find their path.
                </p>
                <p>
                  I have 6+ years of experience in IT and 3+ years in personal branding. I've seen how telling your
                  story and building your online presence can change your life. Even now, I'm still learning every day.
                </p>
                <p>
                  I've helped over 3,000+ people — from students and women starting their careers again to teachers
                  wanting to grow. Through workshops, coaching, and communities, I guide you to create a strong
                  personal brand, improve your LinkedIn profile, and open new opportunities.
                </p>
                <p>
                  I also lead two communities — Ainxtgen for students and Queenflluence Hub for women — where
                  people support each other and grow together.
                </p>
                <p>
                  If you want to build your confidence, share your story, and take your career or business forward,
                  I'm here to help you every step of the way.
                </p>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {[
                { number: '6+', label: 'Years in IT' },
                { number: '3+', label: 'Years in Personal Branding' },
                { number: '3000+', label: 'People Helped' }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="bg-primary-50 rounded-xl p-6 text-center"
                >
                  <h3 className="text-4xl font-bold text-primary-600 mb-2">{stat.number}</h3>
                  <p className="text-gray-600">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>


      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Career?</h2>
            <p className="text-lg text-blue-100 mb-8">
              Join our community and start your journey towards building a powerful personal brand and achieving your goals.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-primary-600 px-8 py-3 rounded-full font-medium hover:bg-blue-50 transition-colors duration-300"
            >
              Get Started Today
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}