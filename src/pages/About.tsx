import { motion } from 'framer-motion';

export default function About() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              About Me
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Empowering the next generation of digital leaders through mentorship,
              training, and community building.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="rounded-lg overflow-hidden shadow-xl">
                <img
                  src="https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg"
                  alt="Professional headshot"
                  className="w-full h-[500px] object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg">
                <p className="text-lg font-semibold text-primary-600">10+ Years</p>
                <p className="text-sm text-gray-600">of Experience</p>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                My Journey
              </h2>
              <p className="text-gray-600">
                With over a decade of experience in digital transformation and
                personal branding, I've dedicated my career to empowering students
                and women entrepreneurs to thrive in the digital age.
              </p>
              <p className="text-gray-600">
                My approach combines technical expertise with personalized
                mentorship, helping individuals build confidence, develop skills,
                and create impactful online presences.
              </p>
              <div className="grid grid-cols-2 gap-6 mt-8">
                <div className="bg-primary-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-primary-600 mb-2">
                    500+
                  </h3>
                  <p className="text-gray-600">Students Mentored</p>
                </div>
                <div className="bg-secondary-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-secondary-600 mb-2">
                    100+
                  </h3>
                  <p className="text-gray-600">Workshops Conducted</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl font-bold text-center mb-12"
          >
            Areas of Expertise
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* AI & Technology */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white p-6 rounded-lg shadow-lg"
            >
              <div className="h-16 w-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl text-primary-600">🤖</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">AI & Technology</h3>
              <p className="text-gray-600">
                Expertise in AI applications, digital tools, and emerging
                technologies for business growth.
              </p>
            </motion.div>

            {/* Personal Branding */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white p-6 rounded-lg shadow-lg"
            >
              <div className="h-16 w-16 bg-secondary-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl text-secondary-600">💫</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Personal Branding</h3>
              <p className="text-gray-600">
                Strategic personal brand development and digital presence
                optimization.
              </p>
            </motion.div>

            {/* Community Building */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="bg-white p-6 rounded-lg shadow-lg"
            >
              <div className="h-16 w-16 bg-accent-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl text-accent-600">👥</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Community Building</h3>
              <p className="text-gray-600">
                Creating and nurturing engaged communities for learning and growth.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Certifications & Recognition */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl font-bold text-center mb-12"
          >
            Certifications & Recognition
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white p-6 rounded-lg shadow border border-gray-100"
            >
              <h3 className="text-xl font-semibold mb-3 text-primary-600">
                Microsoft Certified Trainer
              </h3>
              <p className="text-gray-600">
                Certified to deliver official Microsoft technology training and
                prepare students for certification exams.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white p-6 rounded-lg shadow border border-gray-100"
            >
              <h3 className="text-xl font-semibold mb-3 text-secondary-600">
                Digital Marketing Expert
              </h3>
              <p className="text-gray-600">
                Advanced certification in digital marketing strategies and personal
                brand development.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="bg-white p-6 rounded-lg shadow border border-gray-100"
            >
              <h3 className="text-xl font-semibold mb-3 text-accent-600">
                Community Leadership Award
              </h3>
              <p className="text-gray-600">
                Recognized for outstanding contributions to women's empowerment and
                community building.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="bg-white p-6 rounded-lg shadow border border-gray-100"
            >
              <h3 className="text-xl font-semibold mb-3 text-primary-600">
                AI Innovation Leader
              </h3>
              <p className="text-gray-600">
                Awarded for pioneering AI education and implementation in business
                transformation.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}