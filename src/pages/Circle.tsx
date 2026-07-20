import { motion } from 'framer-motion';
import { Building2, GraduationCap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Circle() {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-primary-50 border border-primary-200 text-primary-600 text-xs font-bold tracking-wider rounded-full uppercase mb-4">
            ★ Ecosystem & Partnerships
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0f0726]">
            Our <span className="text-primary-600">Circle</span>
          </h1>
          <p className="text-gray-600 text-base max-w-2xl mx-auto mt-4 font-medium">
            Discover our network of industry partners and educational institutions working with us to empower students and creators.
          </p>
        </motion.div>

        {/* Navigation Cards Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Companies Card */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="bg-[#faf9fe] rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center mb-6">
                  <Building2 className="w-6 h-6 text-primary-600" />
                </div>
                <h2 className="text-2xl font-bold text-[#0f0726] mb-3">Partner Companies</h2>
                <p className="text-gray-600 text-sm font-medium leading-relaxed mb-6">
                  Collaborations with leading corporations and startups to provide career paths, internships, and resources.
                </p>
              </div>
              <button
                onClick={() => navigate('/companies')}
                className="w-full py-3 bg-primary-600 text-white text-sm font-semibold rounded-lg hover:bg-primary-700 transition-colors shadow-md text-center"
              >
                Explore Partner Companies
              </button>
            </motion.div>

            {/* Colleges Card */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="bg-[#faf9fe] rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-accent-50 flex items-center justify-center mb-6">
                  <GraduationCap className="w-6 h-6 text-accent-600" />
                </div>
                <h2 className="text-2xl font-bold text-[#0f0726] mb-3">Educational Partners</h2>
                <p className="text-gray-600 text-sm font-medium leading-relaxed mb-6">
                  Collaborations with colleges and academic institutions to train faculty, conduct workshops, and mentor students.
                </p>
              </div>
              <button
                onClick={() => navigate('/colleges')}
                className="w-full py-3 bg-accent-600 text-white text-sm font-semibold rounded-lg hover:bg-accent-700 transition-colors shadow-md text-center"
              >
                Explore Academic Partners
              </button>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}

export default Circle;