import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  GraduationCap, 
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
      staggerChildren: 0.15
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
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const programs = [
    {
      id: 1,
      title: "Campus-to-Corporate Program",
      icon: <GraduationCap className="w-6 h-6 text-primary-600" />,
      description: "Bridging the gap between academic learning and industry requirements with practical skills and mentorship.",
      features: ["Industry Workshops", "Skill Development", "Career Guidance", "Networking Events"]
    },
    {
      id: 2,
      title: "Personal Branding Masterclass",
      icon: <Star className="w-6 h-6 text-primary-600" />,
      description: "Learn to build a compelling personal brand that stands out in today's competitive job market.",
      features: ["LinkedIn Optimization", "Content Strategy", "Professional Networking", "Online Presence"]
    },
    {
      id: 3,
      title: "AI & Technology Workshops",
      icon: <Target className="w-6 h-6 text-primary-600" />,
      description: "Stay ahead with cutting-edge AI tools and technologies shaping the future of work.",
      features: ["AI Tools Training", "Digital Skills", "Future-Ready Skills", "Industry Trends"]
    }
  ];

  const benefits = [
    {
      id: 1,
      title: "One-on-One Mentorship",
      icon: <Heart className="w-5 h-5 text-accent-600" />,
      description: "Personalized guidance from experienced professionals in your field of interest."
    },
    {
      id: 2,
      title: "Industry Connections",
      icon: <Users className="w-5 h-5 text-primary-600" />,
      description: "Access to our network of industry professionals and potential employers."
    },
    {
      id: 3,
      title: "Skill Development",
      icon: <Award className="w-5 h-5 text-accent-600" />,
      description: "Comprehensive training programs designed to enhance your professional skills."
    },
    {
      id: 4,
      title: "Career Opportunities",
      icon: <Target className="w-5 h-5 text-primary-600" />,
      description: "Direct access to internship and job opportunities through our network."
    }
  ];

  return (
    <div className="bg-[#faf9fe] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-primary-50 border border-primary-200 text-primary-600 text-xs font-bold tracking-wider rounded-full uppercase mb-4">
            ★ Next Generation Leaders
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0f0726] mb-4">
            Student <span className="text-primary-600">Community</span>
          </h1>
          <p className="text-gray-600 text-base max-w-2xl mx-auto font-medium">
            Join our vibrant community of students, mentors, and industry professionals building future-ready careers together.
          </p>
        </motion.div>

        {/* Benefits Section */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-[#0f0726] mb-12">Why Join Our Community?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit) => (
              <motion.div
                key={benefit.id}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md"
              >
                <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-base font-extrabold text-[#0f0726] mb-2">{benefit.title}</h3>
                <p className="text-xs text-gray-500 font-medium leading-relaxed">{benefit.description}</p>
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
          className="mb-20"
        >
          <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-[#0f0726] mb-12">Our Flagship Programs</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {programs.map((program) => (
              <motion.div
                key={program.id}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center mb-6">
                    {program.icon}
                  </div>
                  <h3 className="text-xl font-bold text-[#0f0726] mb-3">{program.title}</h3>
                  <p className="text-gray-600 text-sm font-medium leading-relaxed mb-6">{program.description}</p>
                </div>
                <ul className="space-y-2 border-t border-gray-100 pt-4">
                  {program.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-xs font-semibold text-gray-700">
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
          <div className="bg-[#0f0726] rounded-3xl p-10 md:p-14 text-white shadow-xl">
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-4">Ready to Join Our Student Community?</h2>
            <p className="text-gray-300 text-base mb-8 max-w-xl mx-auto font-medium">
              Start your journey towards professional success with a supportive network.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://chat.whatsapp.com/CJCgOIqBZebGSIDSChhOpc"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors shadow-md text-sm"
              >
                Join Now on WhatsApp
              </a>
              <button 
                onClick={() => scrollToSection('contact')}
                className="px-8 py-3.5 border border-white/20 text-white rounded-lg font-semibold hover:bg-white/10 transition-colors text-sm"
              >
                Contact Us
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default StudentCommunity;