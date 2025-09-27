import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Target, CheckCircle, ArrowRight, Clock, Users, Award, Zap, BookOpen, Lightbulb, TrendingUp } from 'lucide-react';

function Path() {
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

  const journeySteps = [
    {
      step: 1,
      title: "Foundation Building",
      duration: "Weeks 1-4",
      description: "Establish your core knowledge and mindset",
      icon: <BookOpen className="w-8 h-8" />,
      color: "bg-blue-500",
      features: [
        "Mindset transformation",
        "Goal setting workshop",
        "Personal branding basics",
        "Community introduction"
      ]
    },
    {
      step: 2,
      title: "Skill Development",
      duration: "Weeks 5-12",
      description: "Master essential skills for your journey",
      icon: <Lightbulb className="w-8 h-8" />,
      color: "bg-green-500",
      features: [
        "Content creation mastery",
        "Social media strategy",
        "Communication skills",
        "Technical proficiency"
      ]
    },
    {
      step: 3,
      title: "Implementation",
      duration: "Weeks 13-20",
      description: "Apply your knowledge in real-world scenarios",
      icon: <Zap className="w-8 h-8" />,
      color: "bg-yellow-500",
      features: [
        "Project execution",
        "Mentorship sessions",
        "Peer collaboration",
        "Feedback integration"
      ]
    },
    {
      step: 4,
      title: "Growth & Scaling",
      duration: "Weeks 21-28",
      description: "Scale your impact and achieve milestones",
      icon: <TrendingUp className="w-8 h-8" />,
      color: "bg-purple-500",
      features: [
        "Business scaling",
        "Leadership development",
        "Network expansion",
        "Recognition & awards"
      ]
    }
  ];

  const milestones = [
    {
      title: "Brand Star",
      description: "Achieve ₹1 Lakh Income",
      icon: <Award className="w-6 h-6" />,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50"
    },
    {
      title: "Digital Changemaker",
      description: "Reach ₹10 Lakh Income",
      icon: <Target className="w-6 h-6" />,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "1Cr Changemaker",
      description: "Achieve ₹1 Crore Income",
      icon: <Award className="w-6 h-6" />,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    }
  ];

  const supportFeatures = [
    {
      icon: <Users className="w-8 h-8 text-blue-600" />,
      title: "Mentorship Support",
      description: "Get guidance from industry experts and successful entrepreneurs"
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-green-600" />,
      title: "Progress Tracking",
      description: "Monitor your journey with detailed progress reports and analytics"
    },
    {
      icon: <Clock className="w-8 h-8 text-purple-600" />,
      title: "Flexible Schedule",
      description: "Learn at your own pace with self-paced modules and live sessions"
    },
    {
      icon: <Zap className="w-8 h-8 text-yellow-600" />,
      title: "Quick Wins",
      description: "Achieve immediate results with actionable strategies and quick implementations"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-16">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <MapPin className="w-12 h-12 text-blue-600" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800">Your Path</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Follow a structured journey designed to transform you into a successful digital changemaker. Every step is carefully crafted for your success.
          </p>
        </motion.div>

        {/* Journey Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Your 28-Week Transformation Journey
            </h2>
            <p className="text-lg text-gray-600">
              A proven roadmap to success with clear milestones and support at every step
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 via-green-500 via-yellow-500 to-purple-500 rounded-full"></div>
            
            <div className="space-y-16">
              {journeySteps.map((step, index) => (
                <motion.div
                  key={step.step}
                  variants={itemVariants}
                  className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div className="w-1/2 px-8">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className={`${step.color} text-white p-3 rounded-full`}>
                          {step.icon}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-800">{step.title}</h3>
                          <p className="text-gray-600">{step.duration}</p>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-4">{step.description}</p>
                      <ul className="space-y-2">
                        {step.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className="text-sm text-gray-600">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  </div>
                  
                  {/* Timeline Dot */}
                  <div className="relative z-10">
                    <div className={`${step.color} w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
                      {step.step}
                    </div>
                  </div>
                  
                  <div className="w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Achievement Milestones */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Achievement Milestones
            </h2>
            <p className="text-lg text-gray-600">
              Celebrate your progress with our recognition system
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className={`${milestone.bgColor} p-4 rounded-full w-fit mx-auto mb-4`}>
                  <div className={milestone.color}>
                    {milestone.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-800 text-center mb-2">
                  {milestone.title}
                </h3>
                <p className="text-gray-600 text-center">
                  {milestone.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Support Features */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Support Along Your Journey
            </h2>
            <p className="text-lg text-gray-600">
              You're never alone - we provide comprehensive support at every step
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {supportFeatures.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 text-center"
              >
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Join thousands who have transformed their lives through our proven path to success.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 mx-auto"
          >
            Begin Your Transformation
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}

export default Path;
