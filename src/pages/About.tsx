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
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-800 mb-6"
            >
              About Me
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-lg md:text-xl text-gray-600 mb-12"
            >
              Empowering students and women entrepreneurs through mentorship, training, and community support.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
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
              <h2 className="text-3xl md:text-4xl font-bold text-primary-800 mb-6">My Story</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                With over a decade of experience in digital marketing and entrepreneurship, I've dedicated my career to helping others achieve their professional goals. My journey began when I recognized the transformative power of personal branding and digital presence in today's competitive landscape.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {[
                { number: '10+', label: 'Years Experience' },
                { number: '500+', label: 'Students Mentored' },
                { number: '100+', label: 'Success Stories' }
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

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="container mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold text-primary-800 mb-12 text-center"
            >
              Core Values
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: 'Empowerment',
                  description: 'Believing in the potential of every individual and providing them with the tools to succeed.',
                  icon: '🌟'
                },
                {
                  title: 'Innovation',
                  description: 'Staying ahead of industry trends and embracing new technologies to deliver cutting-edge solutions.',
                  icon: '💡'
                },
                {
                  title: 'Community',
                  description: 'Building a supportive network where members can learn, grow, and succeed together.',
                  icon: '🤝'
                },
                {
                  title: 'Excellence',
                  description: 'Committed to delivering the highest quality mentorship and training programs.',
                  icon: '⭐'
                }
              ].map((value, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-xl p-6 shadow-lg"
                >
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h3 className="text-xl font-semibold text-primary-700 mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Preview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold text-primary-800 mb-12 text-center"
            >
              What People Say
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  quote: "The mentorship program transformed my approach to personal branding. I've gained the confidence and skills to establish my digital presence.",
                  author: "Sarah Johnson",
                  role: "Entrepreneur"
                },
                {
                  quote: "The training sessions were incredibly valuable. I learned practical skills that I could immediately apply to my business.",
                  author: "Michael Chen",
                  role: "Student"
                }
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.02 }}
                  className="bg-primary-50 rounded-xl p-6"
                >
                  <p className="text-gray-600 italic mb-4">"{testimonial.quote}"</p>
                  <div>
                    <p className="font-semibold text-primary-700">{testimonial.author}</p>
                    <p className="text-gray-500 text-sm">{testimonial.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Journey?</h2>
            <p className="text-lg text-blue-100 mb-8">
              Join our community of learners and entrepreneurs who are transforming their careers and businesses.
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