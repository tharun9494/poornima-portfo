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
  Heart,
  Crown,
  Sparkles,
  Flower
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

function QueenflluenceHub() {
  const programs = [
    {
      id: 1,
      title: "Women Leadership Program",
      icon: <Crown className="w-8 h-8 text-pink-600" />,
      description: "Empower yourself with leadership skills and confidence to break barriers and achieve your dreams.",
      features: ["Leadership Skills", "Confidence Building", "Public Speaking", "Decision Making"]
    },
    {
      id: 2,
      title: "Business & Entrepreneurship",
      icon: <Sparkles className="w-8 h-8 text-pink-600" />,
      description: "Start and grow your own business with our comprehensive entrepreneurship training.",
      features: ["Business Planning", "Marketing Strategies", "Financial Management", "Networking"]
    },
    {
      id: 3,
      title: "Personal Branding for Women",
      icon: <Flower className="w-8 h-8 text-pink-600" />,
      description: "Build a powerful personal brand that reflects your authentic self and professional goals.",
      features: ["Brand Strategy", "Social Media Presence", "Content Creation", "Professional Image"]
    }
  ];

  const benefits = [
    {
      id: 1,
      title: "Supportive Community",
      icon: <Heart className="w-6 h-6 text-pink-500" />,
      description: "Connect with like-minded women who support and inspire each other."
    },
    {
      id: 2,
      title: "Mentorship Programs",
      icon: <Users className="w-6 h-6 text-pink-500" />,
      description: "Get guidance from successful women leaders and entrepreneurs."
    },
    {
      id: 3,
      title: "Skill Development",
      icon: <Target className="w-6 h-6 text-pink-500" />,
      description: "Develop essential skills for personal and professional growth."
    },
    {
      id: 4,
      title: "Networking Opportunities",
      icon: <Award className="w-6 h-6 text-pink-500" />,
      description: "Build valuable connections with women in various industries."
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
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-pink-600 mb-6">
            Queenflluence Hub
          </h1>
          <p className="text-base text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Empowering women to become leaders, entrepreneurs, and influencers. Join our community 
            of strong, ambitious women who are creating their own success stories.
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
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Why Join Queenflluence Hub?</h2>
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
                className="bg-gradient-to-br from-pink-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-pink-100"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-pink-100 rounded-full">
                    {program.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">{program.title}</h3>
                </div>
                <p className="text-gray-600 mb-6 text-base">{program.description}</p>
                <ul className="space-y-2">
                  {program.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="text-pink-600">•</span>
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
          <div className="bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Empower Your Future?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join our community of powerful women and start your journey to success.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://chat.whatsapp.com/Lc4Mdj4yuYMAiKQeD3cZPE"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-white text-pink-600 rounded-full font-semibold hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl"
              >
                Join Women's Community
              </a>
              <button className="px-8 py-4 border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-pink-600 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default QueenflluenceHub; 