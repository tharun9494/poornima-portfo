import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
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

function QueenflluenceHub() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const programs = [
    {
      id: 1,
      title: "Women Leadership Program",
      icon: <Crown className="w-6 h-6 text-accent-600" />,
      description: "Empower yourself with leadership skills and confidence to break barriers and achieve your goals.",
      features: ["Leadership Skills", "Confidence Building", "Public Speaking", "Decision Making"]
    },
    {
      id: 2,
      title: "Business & Entrepreneurship",
      icon: <Sparkles className="w-6 h-6 text-accent-600" />,
      description: "Start and grow your own business with our comprehensive training and personal branding strategy.",
      features: ["Business Planning", "Marketing Strategies", "Financial Management", "Networking"]
    },
    {
      id: 3,
      title: "Personal Branding for Women",
      icon: <Flower className="w-6 h-6 text-accent-600" />,
      description: "Build a powerful personal brand that reflects your authentic self and professional ambitions.",
      features: ["Brand Strategy", "Social Media Presence", "Content Creation", "Professional Image"]
    }
  ];

  const benefits = [
    {
      id: 1,
      title: "Supportive Community",
      icon: <Heart className="w-5 h-5 text-accent-600" />,
      description: "Connect with like-minded women who support and inspire each other."
    },
    {
      id: 2,
      title: "Mentorship Programs",
      icon: <Users className="w-5 h-5 text-primary-600" />,
      description: "Get guidance from successful women leaders and entrepreneurs."
    },
    {
      id: 3,
      title: "Skill Development",
      icon: <Target className="w-5 h-5 text-primary-600" />,
      description: "Develop essential skills for personal and professional growth."
    },
    {
      id: 4,
      title: "Networking Opportunities",
      icon: <Award className="w-5 h-5 text-accent-600" />,
      description: "Build valuable connections with women in various industries."
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
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-accent-50 border border-accent-100 text-accent-600 text-xs font-bold tracking-wider rounded-full uppercase mb-4">
            ★ Women Empowerment & Leadership
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0f0726] mb-4">
            Queenflluence <span className="text-accent-600">Hub</span>
          </h1>
          <p className="text-gray-600 text-base max-w-2xl mx-auto font-medium">
            Empowering women to become leaders, entrepreneurs, and influencers. Join our supportive network creating real success stories.
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
          <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-[#0f0726] mb-12">Why Join Queenflluence Hub?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit) => (
              <motion.div
                key={benefit.id}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md"
              >
                <div className="w-10 h-10 rounded-xl bg-accent-50 flex items-center justify-center mb-4">
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
          <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-[#0f0726] mb-12">Our Specialized Programs</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {programs.map((program) => (
              <motion.div
                key={program.id}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-accent-50 flex items-center justify-center mb-6">
                    {program.icon}
                  </div>
                  <h3 className="text-xl font-bold text-[#0f0726] mb-3">{program.title}</h3>
                  <p className="text-gray-600 text-sm font-medium leading-relaxed mb-6">{program.description}</p>
                </div>
                <ul className="space-y-2 border-t border-gray-100 pt-4">
                  {program.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-xs font-semibold text-gray-700">
                      <span className="text-accent-600">•</span>
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
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-4">Ready to Empower Your Future?</h2>
            <p className="text-gray-300 text-base mb-8 max-w-xl mx-auto font-medium">
              Join our community of powerful women and start your journey to success today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://chat.whatsapp.com/Lc4Mdj4yuYMAiKQeD3cZPE"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 bg-accent-600 text-white rounded-lg font-semibold hover:bg-accent-700 transition-colors shadow-md text-sm"
              >
                Join Women's Community on WhatsApp
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

export default QueenflluenceHub;