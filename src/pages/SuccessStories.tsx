import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, TrendingUp, Users, Award, Target, ArrowRight, Play } from 'lucide-react';

function SuccessStories() {
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

  const successStories = [
    {
      id: 1,
      name: "Priya Sharma",
      role: "Life Coach & Wellness Expert",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      achievement: "₹15 Lakh Annual Income",
      story: "From struggling with self-confidence to becoming a sought-after life coach, Priya transformed her life and now helps hundreds of women achieve their dreams.",
      before: "Struggling with confidence and direction",
      after: "Successful life coach with 500+ clients",
      testimonial: "The community and mentorship here changed my life completely. I went from doubting myself to building a thriving coaching business.",
      rating: 5,
      videoUrl: "#"
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      role: "Digital Marketing Consultant",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      achievement: "₹25 Lakh Annual Income",
      story: "Starting with zero knowledge in digital marketing, Rajesh now runs a successful agency serving international clients across multiple industries.",
      before: "IT professional with no marketing experience",
      after: "Digital marketing agency owner with global clients",
      testimonial: "The structured learning path and practical implementation helped me build a profitable business from scratch.",
      rating: 5,
      videoUrl: "#"
    },
    {
      id: 3,
      name: "Anita Patel",
      role: "Fitness & Nutrition Coach",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      achievement: "₹12 Lakh Annual Income",
      story: "A former corporate employee turned fitness entrepreneur, Anita now runs online fitness programs and has helped over 1000 people transform their health.",
      before: "Corporate job with health struggles",
      after: "Successful online fitness coach with 1000+ transformations",
      testimonial: "The community support and business strategies taught me how to turn my passion into a profitable venture.",
      rating: 5,
      videoUrl: "#"
    },
    {
      id: 4,
      name: "Vikram Singh",
      role: "Business Strategy Consultant",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      achievement: "₹35 Lakh Annual Income",
      story: "From a struggling startup founder to a successful business consultant, Vikram now helps other entrepreneurs scale their businesses effectively.",
      before: "Failed startup with mounting debts",
      after: "Successful business consultant with premium clients",
      testimonial: "The mentorship and network I gained here was instrumental in turning my failures into valuable lessons for others.",
      rating: 5,
      videoUrl: "#"
    },
    {
      id: 5,
      name: "Sunita Gupta",
      role: "Success and Happiness Coach",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
      achievement: "₹18 Lakh Annual Income",
      story: "A teacher turned coach, Sunita now helps professionals find work-life balance and achieve personal fulfillment in their careers.",
      before: "Overworked teacher with no work-life balance",
      after: "Successful coach helping professionals achieve balance",
      testimonial: "I wish my digital guru a year as golden as the whole universe. She guided and hand-held me to transform from being tech-scared to a confident entrepreneur.",
      rating: 5,
      videoUrl: "#"
    },
    {
      id: 6,
      name: "Ketan Raiyani",
      role: "Business Coach",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
      achievement: "₹22 Lakh Annual Income",
      story: "Starting as a corporate trainer, Ketan now runs his own coaching business and helps entrepreneurs build sustainable growth strategies.",
      before: "Corporate trainer with limited reach",
      after: "Independent business coach with scalable programs",
      testimonial: "You come up as a sincere mentor with huge commitment for our success. Your sessions are well thought out and conducted very well!",
      rating: 5,
      videoUrl: "#"
    }
  ];

  const stats = [
    {
      number: "500+",
      label: "Success Stories",
      icon: <Award className="w-8 h-8 text-yellow-600" />
    },
    {
      number: "₹2.5Cr+",
      label: "Total Income Generated",
      icon: <TrendingUp className="w-8 h-8 text-green-600" />
    },
    {
      number: "95%",
      label: "Success Rate",
      icon: <Target className="w-8 h-8 text-blue-600" />
    },
    {
      number: "50+",
      label: "Countries Represented",
      icon: <Users className="w-8 h-8 text-purple-600" />
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
            <Star className="w-12 h-12 text-yellow-600" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800">Success Stories</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover how our community members have transformed their lives and achieved extraordinary success in their entrepreneurial journeys.
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="text-center bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="flex justify-center mb-4">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-2">{stat.number}</div>
              <div className="text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Success Stories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
        >
          {successStories.map((story) => (
            <motion.div
              key={story.id}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
            >
              {/* Video Thumbnail */}
              <div className="relative mb-6">
                <div className="w-full h-48 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-white/20 backdrop-blur-sm rounded-full p-4 text-white hover:bg-white/30 transition-all duration-300"
                  >
                    <Play className="w-8 h-8" />
                  </motion.button>
                </div>
                <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {story.achievement}
                </div>
              </div>

              {/* Profile */}
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={story.image}
                  alt={story.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-bold text-gray-800">{story.name}</h3>
                  <p className="text-sm text-gray-600">{story.role}</p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(story.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Story */}
              <p className="text-gray-700 mb-4 text-sm leading-relaxed">
                {story.story}
              </p>

              {/* Before/After */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-sm text-gray-600 font-medium">Before:</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{story.before}</p>
                
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600 font-medium">After:</span>
                </div>
                <p className="text-sm text-gray-600">{story.after}</p>
              </div>

              {/* Testimonial */}
              <div className="bg-gray-50 rounded-xl p-4 mb-4">
                <Quote className="w-5 h-5 text-gray-400 mb-2" />
                <p className="text-sm text-gray-700 italic">
                  "{story.testimonial}"
                </p>
              </div>

              {/* View Story Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-4 rounded-xl font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-300 flex items-center justify-center gap-2"
              >
                View Full Story
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </motion.div>
          ))}
        </motion.div>

        {/* Featured Success Story */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 md:p-12 text-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Featured Success Story
                </h2>
                <h3 className="text-xl font-semibold mb-2">Dr. Srinidhi Veldanda</h3>
                <p className="text-lg opacity-90 mb-4">Life Coach & Yoga Instructor</p>
                <p className="text-lg opacity-90 mb-6">
                  "A business strategy is a valuable tool for showcasing the effectiveness and success of a particular approach. It provides an authentic and credible account of how a strategy has positively impacted a business."
                </p>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 mb-6">
                  <div className="text-2xl font-bold mb-1">₹20 Lakh+</div>
                  <div className="text-sm opacity-90">Annual Income Achievement</div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-purple-600 px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition-all duration-300"
                >
                  Watch Success Story
                </motion.button>
              </div>
              <div className="relative">
                <div className="w-full h-80 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-white/30 backdrop-blur-sm rounded-full p-6 text-white hover:bg-white/40 transition-all duration-300"
                  >
                    <Play className="w-12 h-12" />
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-12 text-white"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Write Your Success Story?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Join our community of achievers and start your transformation journey today.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-green-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 mx-auto"
          >
            Start Your Journey
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}

export default SuccessStories;
