import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  GraduationCap, 
  BookOpen, 
  Calendar, 
  Globe,
  Star,
  Award,
  Target,
  Heart
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

function StudentCommunity() {
  const programs = [
    {
      id: 1,
      title: "Campus-to-Corporate Program",
      icon: <GraduationCap className="w-8 h-8 text-primary-600" />,
      description: "Bridging the gap between academic learning and industry requirements with practical skills and mentorship.",
      features: ["Industry Workshops", "Skill Development", "Career Guidance", "Networking Events"]
    },
    {
      id: 2,
      title: "Personal Branding Masterclass",
      icon: <Star className="w-8 h-8 text-primary-600" />,
      description: "Learn to build a compelling personal brand that stands out in today's competitive job market.",
      features: ["LinkedIn Optimization", "Content Strategy", "Professional Networking", "Online Presence"]
    },
    {
      id: 3,
      title: "AI & Technology Workshops",
      icon: <Target className="w-8 h-8 text-primary-600" />,
      description: "Stay ahead with cutting-edge AI tools and technologies that are shaping the future of work.",
      features: ["AI Tools Training", "Digital Skills", "Future-Ready Skills", "Industry Trends"]
    }
  ];

  const benefits = [
    {
      id: 1,
      title: "One-on-One Mentorship",
      icon: <Heart className="w-6 h-6 text-red-500" />,
      description: "Personalized guidance from experienced professionals in your field of interest."
    },
    {
      id: 2,
      title: "Industry Connections",
      icon: <Users className="w-6 h-6 text-blue-500" />,
      description: "Access to our network of industry professionals and potential employers."
    },
    {
      id: 3,
      title: "Skill Development",
      icon: <Award className="w-6 h-6 text-yellow-500" />,
      description: "Comprehensive training programs designed to enhance your professional skills."
    },
    {
      id: 4,
      title: "Career Opportunities",
      icon: <Target className="w-6 h-6 text-green-500" />,
      description: "Direct access to internship and job opportunities through our partner companies."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-16"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-600 mb-6">
            Student Community
          </h1>
          <p className="text-base text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Join our vibrant community of students, mentors, and industry professionals. 
            Together, we're building the next generation of successful professionals.
          </p>
        </motion.div>

        {/* Benefits Section */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16 md:mb-20"
        >
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Why Join Our Community?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit) => (
              <motion.div
                key={benefit.id}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="flex items-center gap-3 mb-4">
                  {benefit.icon}
                  <h3 className="text-lg font-semibold text-gray-800">{benefit.title}</h3>
                </div>
                <p className="text-gray-600 text-base">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Programs Section */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16 md:mb-20"
        >
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Our Programs</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {programs.map((program) => (
              <motion.div
                key={program.id}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="bg-gradient-to-br from-primary-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-primary-100"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-primary-100 rounded-full">
                    {program.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">{program.title}</h3>
                </div>
                <p className="text-gray-600 mb-6 text-base">{program.description}</p>
                <ul className="space-y-2">
                  {program.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="text-primary-600">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-primary-600 to-blue-600 rounded-2xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Join Our Community?</h2>
            <p className="text-xl mb-8 opacity-90">
              Start your journey towards professional success with our supportive community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://chat.whatsapp.com/CJCgOIqBZebGSIDSChhOpc"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-white text-primary-600 rounded-full font-semibold hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl"
              >
                Join Now
              </a>
              <button className="px-8 py-4 border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-primary-600 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default StudentCommunity; 