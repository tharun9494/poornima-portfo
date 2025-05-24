import React from 'react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

function WhatIDo() {
  const services = [
    {
      id: 1,
      title: "Career Building Blueprint for Students",
      description: "Empowering students to build a standout LinkedIn profile, discover their niche, and confidently step into the job market with a strong personal brand.",
      icon: (
        <svg className="w-12 h-12 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      id: 2,
      title: "SheLeads: Business Kickstart for Women Entrepreneurs",
      description: "Guiding women to start their journey as trainers, coaches, or founders through step-by-step strategies, content creation, and personal branding mastery.",
      icon: (
        <svg className="w-12 h-12 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    },
    {
      id: 3,
      title: "Campus-to-Corporate: Faculty Excellence Program",
      description: "For college faculty who want to bridge the gap between academic theory and industry needs, support student careers, and build their own presence as thought leaders.",
      icon: (
        <svg className="w-12 h-12 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    },
    {
      id: 4,
      title: "Career Ladder for Educators: From Chalk to Change",
      description: "Helping school and college teachers grow beyond the classroom — by mastering communication, digital tools, and building a meaningful online presence.",
      icon: (
        <svg className="w-12 h-12 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    {
      id: 5,
      title: "Personal Branding for All",
      description: "Whether you're a student, educator, or aspiring entrepreneur — I help you build a powerful personal brand through storytelling, LinkedIn strategy, and authentic visibility.",
      icon: (
        <svg className="w-12 h-12 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        </svg>
      )
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-gray-900 mb-8 text-center"
      >
        What I Do
      </motion.h1>
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {services.map((service) => (
          <motion.div
            key={service.id}
            variants={itemVariants}
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.2 }
            }}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex flex-col items-center text-center">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="mb-4"
              >
                {service.icon}
              </motion.div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">{service.title}</h2>
              <p className="text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Additional Content Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
        className="mt-16"
      >
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">How I Can Help You</h2>
        <motion.div 
          whileHover={{ scale: 1.01 }}
          className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8 shadow-lg"
        >
          <p className="text-gray-700 leading-relaxed mb-6">
            With a focus on personal branding and professional development, I help individuals and organizations
            build their digital presence and achieve their career goals. My approach combines strategic thinking,
            practical tools, and personalized guidance to create lasting impact.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Whether you're starting your career journey, transitioning to a new role, or building your business,
            I provide the tools, strategies, and support you need to succeed in today's digital world.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default WhatIDo;