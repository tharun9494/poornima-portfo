import React from 'react';
import { motion } from 'framer-motion';
import { Building2, GraduationCap } from 'lucide-react';
import TeamSection from '../components/TeamSection';

function Circle() {
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Our Circle</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Discover our network of partners and collaborators who help us empower students and women.
          </p>
        </motion.div>

        {/* Navigation Cards Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-20"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Companies Card */}
            <motion.div
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="flex items-center justify-center gap-3 mb-6">
                <Building2 className="w-8 h-8 text-blue-600" />
                <h2 className="text-2xl font-semibold text-gray-800">Our Partner Companies</h2>
              </div>
              <p className="text-gray-600 mb-6 text-center">
                We collaborate with leading companies to provide opportunities and resources for students and women empowerment.
              </p>
              <div className="text-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.location.href = '/companies'}
                  className="px-6 py-3 bg-blue-600 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  View Companies
                </motion.button>
              </div>
            </motion.div>

            {/* Colleges Card */}
            <motion.div
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="flex items-center justify-center gap-3 mb-6">
                <GraduationCap className="w-8 h-8 text-blue-600" />
                <h2 className="text-2xl font-semibold text-gray-800">Educational Partners</h2>
              </div>
              <p className="text-gray-600 mb-6 text-center">
                We work closely with prestigious educational institutions to empower students and create opportunities for growth.
              </p>
              <div className="text-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.location.href = '/colleges'}
                  className="px-6 py-3 bg-green-600 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  View Colleges
                </motion.button>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Team Section */}
        <TeamSection />

      </div>
    </div>
  );
}

export default Circle;