import React from 'react';
import { motion } from 'framer-motion';
import { 
  Linkedin, 
  GraduationCap, 
  Briefcase, 
  BookOpen, 
  Calendar, 
  Gift,
  Users,
  BookOpenCheck,
  Sparkles
} from 'lucide-react';

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
      title: "LinkedIn Optimisation",
      icon: <Linkedin className="w-8 h-8 sm:w-12 sm:h-12 text-primary-600" />,
      description: "Transform your LinkedIn presence with a complete profile makeover. I'll help you craft compelling headlines and summaries that capture attention, while providing strategic content ideas to keep you visible and engaged in your professional network."
    },
    {
      id: 2,
      title: "For Students",
      icon: <GraduationCap className="w-8 h-8 sm:w-12 sm:h-12 text-primary-600" />,
      description: "Start your professional journey on the right foot with comprehensive career guidance and support. From securing internships to building your first professional profile, I'll help you establish a strong foundation for your future career success."
    },
    {
      id: 3,
      title: "For Professionals",
      icon: <Briefcase className="w-8 h-8 sm:w-12 sm:h-12 text-primary-600" />,
      description: "Elevate your professional brand and navigate career transitions with confidence. Whether you're looking to switch jobs or enhance your current position, I'll help you create a compelling narrative that showcases your expertise and achievements."
    },
    {
      id: 4,
      title: "For Faculties",
      icon: <BookOpen className="w-8 h-8 sm:w-12 sm:h-12 text-primary-600" />,
      description: "Build your academic presence and share your research with the world. I'll help you establish yourself as a thought leader, secure speaking opportunities, and effectively communicate your expertise to a broader audience through strategic online presence."
    },
    {
      id: 5,
      title: "SheLeads: Business Kickstart",
      icon: <Users className="w-8 h-8 sm:w-12 sm:h-12 text-primary-600" />,
      description: "Guiding women to start their journey as trainers, coaches, or founders through step-by-step strategies, content creation, and personal branding mastery."
    },
    {
      id: 6,
      title: "Campus-to-Corporate Program",
      icon: <BookOpenCheck className="w-8 h-8 sm:w-12 sm:h-12 text-primary-600" />,
      description: "For college faculty who want to bridge the gap between academic theory and industry needs, support student careers, and build their own presence as thought leaders."
    },
    {
      id: 7,
      title: "Personal Branding for All",
      icon: <Sparkles className="w-8 h-8 sm:w-12 sm:h-12 text-primary-600" />,
      description: "Whether you're a student, educator, or aspiring entrepreneur — I help you build a powerful personal brand through storytelling, LinkedIn strategy, and authentic visibility."
    }
  ];

  const workshops = {
    title: "Workshops & Sessions",
    icon: <Calendar className="w-8 h-8 sm:w-12 sm:h-12 text-primary-600" />,
    description: "Join our engaging workshops and sessions designed to help you master the art of personal branding and career development. From AI-powered career building strategies to LinkedIn masterclasses, our sessions provide practical insights and actionable steps for your professional growth. Perfect for both college and corporate environments.",
    note: "✨ Invite me for college or corporate sessions"
  };

  const freebies = {
    title: "Freebies",
    icon: <Gift className="w-8 h-8 sm:w-12 sm:h-12 text-primary-600" />,
    description: "Access our collection of free resources designed to kickstart your professional journey. From comprehensive LinkedIn checklists to professional resume templates and vision board guides, these tools will help you take the first step towards building your personal brand and achieving your career goals."
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            What I Do
          </h1>
          <div className="w-16 sm:w-20 md:w-24 h-1 bg-primary-600 mx-auto rounded-full"></div>
        </motion.div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-12 sm:mb-16 md:mb-20"
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
              className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 hover:shadow-2xl transition-all duration-300 border border-gray-100"
            >
              <div className="flex flex-col items-center text-center">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="mb-3 sm:mb-4 p-2 sm:p-3 bg-primary-50 rounded-full"
                >
                  {service.icon}
                </motion.div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">{service.title}</h2>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Workshops and Freebies Section - Side by Side */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8"
        >
          {/* Workshops Section */}
          <motion.div variants={itemVariants}>
            <div className="bg-gradient-to-br from-primary-50 to-white rounded-2xl shadow-lg p-6 sm:p-8 hover:shadow-2xl transition-all duration-300 h-full border border-primary-100">
              <div className="flex items-center gap-2 sm:gap-4 mb-3 sm:mb-6">
                <div className="p-1.5 sm:p-2 bg-primary-100 rounded-full">
                  {workshops.icon}
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-primary-800">{workshops.title}</h2>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
                {workshops.description}
              </p>
              <p className="text-primary-600 font-semibold flex items-center gap-2 text-sm sm:text-base">
                <span className="text-xl sm:text-2xl">✨</span> {workshops.note}
              </p>
            </div>
          </motion.div>

          {/* Freebies Section */}
          <motion.div variants={itemVariants}>
            <div className="bg-gradient-to-br from-primary-50 to-white rounded-2xl shadow-lg p-6 sm:p-8 hover:shadow-2xl transition-all duration-300 h-full border border-primary-100">
              <div className="flex items-center gap-2 sm:gap-4 mb-3 sm:mb-6">
                <div className="p-1.5 sm:p-2 bg-primary-100 rounded-full">
                  {freebies.icon}
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-primary-800">{freebies.title}</h2>
              </div>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                {freebies.description}
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default WhatIDo;