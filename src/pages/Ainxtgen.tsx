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
  Cpu,
  Zap,
  Brain
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

function Ainxtgen() {
  const programs = [
    {
      id: 1,
      title: "AI Tools Mastery",
      icon: <Brain className="w-8 h-8 text-blue-600" />,
      description: "Master cutting-edge AI tools and technologies that are transforming industries worldwide.",
      features: ["ChatGPT & GPT Models", "AI Image Generation", "Automation Tools", "Data Analysis"]
    },
    {
      id: 2,
      title: "Future Technology Workshops",
      icon: <Zap className="w-8 h-8 text-blue-600" />,
      description: "Stay ahead with workshops on emerging technologies and their practical applications.",
      features: ["Machine Learning", "Blockchain", "IoT", "Cloud Computing"]
    },
    {
      id: 3,
      title: "Tech Career Development",
      icon: <Cpu className="w-8 h-8 text-blue-600" />,
      description: "Build a successful career in technology with our comprehensive training programs.",
      features: ["Coding Skills", "Project Management", "Industry Networking", "Career Guidance"]
    }
  ];

  const benefits = [
    {
      id: 1,
      title: "AI-Powered Learning",
      icon: <Brain className="w-6 h-6 text-blue-500" />,
      description: "Learn with the latest AI tools and technologies."
    },
    {
      id: 2,
      title: "Industry Connections",
      icon: <Users className="w-6 h-6 text-blue-500" />,
      description: "Connect with tech professionals and companies."
    },
    {
      id: 3,
      title: "Hands-on Projects",
      icon: <Target className="w-6 h-6 text-blue-500" />,
      description: "Work on real-world projects and build your portfolio."
    },
    {
      id: 4,
      title: "Career Opportunities",
      icon: <Award className="w-6 h-6 text-blue-500" />,
      description: "Access to tech internships and job opportunities."
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
            Ainxtgen
          </h1>
          <p className="text-base text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Your gateway to the future of technology. Join our AI and technology community to master 
            cutting-edge tools, build innovative solutions, and shape the digital world.
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
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Why Join Ainxtgen?</h2>
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
                className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-blue-100"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-blue-100 rounded-full">
                    {program.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">{program.title}</h3>
                </div>
                <p className="text-gray-600 mb-6 text-base">{program.description}</p>
                <ul className="space-y-2">
                  {program.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="text-blue-600">•</span>
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
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Shape the Future?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join our technology community and become part of the AI revolution.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://chat.whatsapp.com/KYmvxWMWmRx4cacdzCpDyz"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-white text-blue-600 rounded-full font-semibold hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl"
              >
                Join Tech Community
              </a>
              <button className="px-8 py-4 border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Ainxtgen; 