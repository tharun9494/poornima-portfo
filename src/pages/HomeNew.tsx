import { motion, useScroll, useTransform } from 'framer-motion';
import poornima from './images/poornima.png';
import image from './images/image.png';
import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase/config';
import AnimatedBackground from '../components/AnimatedBackground';
import AnimatedCounter from '../components/AnimatedCounter';
import FloatingImage from '../components/FloatingImage';
import { ArrowRight, Star, Users, TrendingUp, Award, Zap, Target, CheckCircle, Play, BookOpen, Lightbulb } from 'lucide-react';

interface Webinar {
  id: string;
  title: string;
  date: string;
  time: string;
  duration: string;
  learningOutcomes: string;
  formLink: string;
  imageUrl: string;
  description: string;
}

export default function HomeNew() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  const [nextWebinar, setNextWebinar] = useState<Webinar | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNextWebinar = async () => {
      try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const q = query(
          collection(db, 'webinars'),
          orderBy('date', 'asc'),
          limit(1)
        );
        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
          const webinar = { id: snapshot.docs[0].id, ...snapshot.docs[0].data() } as Webinar;
          const webinarDate = new Date(webinar.date);
          webinarDate.setHours(0, 0, 0, 0);

          if (webinarDate >= today) {
            setNextWebinar(webinar);
          }
        }
      } catch (error) {
        console.error('Error fetching webinar:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNextWebinar();
  }, []);

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

  const stats = [
    { number: 500, suffix: '+', label: 'Community Members', icon: <Users className="w-8 h-8" /> },
    { number: 50, suffix: '+', label: 'Success Stories', icon: <Award className="w-8 h-8" /> },
    { number: 1000, suffix: '+', label: 'Lives Impacted', icon: <TrendingUp className="w-8 h-8" /> },
    { number: 95, suffix: '%', label: 'Success Rate', icon: <Target className="w-8 h-8" /> }
  ];

  const benefits = [
    {
      icon: <Zap className="w-12 h-12 text-yellow-500" />,
      title: "Impactful Education",
      description: "Get the most relevant information to build your brand and business with power-packed sessions and curriculums.",
      features: ["25+ Courses", "4+ Touchpoints in a week", "Self Paced Learning", "Focused Implementation"]
    },
    {
      icon: <Target className="w-12 h-12 text-green-500" />,
      title: "Well Planned Execution",
      description: "Our structured programs will upskill you with digital knowledge and make you confident in implementation.",
      features: ["Quarterly Hackathon", "Content Creation Techniques", "Video Editing for Entrepreneurs", "Webinar Success Formulae"]
    },
    {
      icon: <Users className="w-12 h-12 text-blue-500" />,
      title: "Contributing Experts",
      description: "Network with fellow coaches, creators and consultants in our premium social network.",
      features: ["Inner Circle Calls", "Community Group Sessions", "Expert Talks", "Accountability Groups"]
    },
    {
      icon: <CheckCircle className="w-12 h-12 text-purple-500" />,
      title: "Hotseat Audits",
      description: "Get a chance to audit your business processes and get inputs to refine your strategies.",
      features: ["Social Media Audit", "Landing Page Audit", "Webinar Audit", "Systems Audit"]
    }
  ];

  const learningTopics = [
    "Business Strategy", "Brand Strategy", "Video Communication", "Story Telling",
    "Video Editing", "Visual Branding", "Content Strategy", "Social Media",
    "Digital Product", "Platform Selling", "Budget Tracking", "Email Automation",
    "LMS Setup", "Copy Writing", "Website Building", "Community Results"
  ];

  const achievementLevels = [
    { title: "BRAND STAR", income: "₹1 Lakh Income", color: "from-yellow-400 to-orange-500" },
    { title: "DIGITAL CHANGEMAKER", income: "₹10 Lakh Income", color: "from-blue-400 to-purple-500" },
    { title: "1 CR CHANGEMAKER", income: "₹1 Crore Income", color: "from-green-400 to-teal-500" }
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      <AnimatedBackground />
      
      {/* Hero Section */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Main Hero Content */}
        <div className="flex-1 flex flex-col lg:flex-row items-center justify-between px-4 lg:px-8 py-20">
          {/* Left Side - Text Content */}
          <motion.div 
            className="flex-1 text-center lg:text-left mb-12 lg:mb-0"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1 
              className="text-5xl lg:text-7xl font-bold mb-8 leading-tight"
              variants={itemVariants}
            >
              Join The #1 Rising Community For{' '}
              <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent">
                Digital Changemakers
              </span>
            </motion.h1>
            
            <motion.h2 
              className="text-2xl lg:text-3xl font-semibold mb-6 text-gray-700"
              variants={itemVariants}
            >
              Build Your Business Through A Super Admired Identity That Makes Your Customers Chase You
            </motion.h2>
            
            <motion.p 
              className="text-lg lg:text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl"
              variants={itemVariants}
            >
              Join the community that has already created more than{' '}
              <span className="font-bold text-purple-600">200+</span> Challengers, 
              Produced more than <span className="font-bold text-blue-600">2000+</span> Videos, 
              contributed <span className="font-bold text-green-600">22000+</span> Hours of business skill building.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12"
              variants={itemVariants}
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-10 py-4 rounded-full font-bold text-lg shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 flex items-center gap-2"
              >
                Become a Changemaker
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </motion.div>

            {/* Rating */}
            <motion.div 
              className="flex items-center gap-4 justify-center lg:justify-start"
              variants={itemVariants}
            >
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <div className="text-2xl font-bold text-gray-800">4.6</div>
              <div className="text-gray-600">20+ Reviews | Excellent</div>
            </motion.div>
          </motion.div>

          {/* Right Side - Floating Image */}
          <motion.div 
            className="flex-1 flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <FloatingImage
              src={poornima}
              alt="Poornima Bharadwaj"
              className="w-full max-w-lg lg:max-w-xl"
              delay={0.5}
              duration={4}
              floatDistance={30}
            />
          </motion.div>
        </div>

        {/* Animated Stats Section */}
        <motion.div 
          className="bg-white/10 backdrop-blur-sm py-16 px-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="container mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className="flex justify-center mb-4">
                    <div className="p-4 bg-white/20 rounded-full">
                      {stat.icon}
                    </div>
                  </div>
                  <div className="text-4xl lg:text-5xl font-bold text-white mb-2">
                    <AnimatedCounter 
                      end={stat.number} 
                      suffix={stat.suffix}
                      className="text-white"
                    />
                  </div>
                  <div className="text-white/90 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* What You'll Learn Section */}
      <motion.section 
        className="py-20 bg-white"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-gray-800 mb-6"
              variants={itemVariants}
            >
              What You'll Learn in Our Academy?
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <motion.div 
              className="text-center"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-8 rounded-2xl text-white mb-6">
                <BookOpen className="w-16 h-16 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-4">Learn</h3>
                <p className="text-lg">Learn to make impactful videos, picture content, carousels, and articles to build the visibility of your business on social media.</p>
              </div>
            </motion.div>

            <motion.div 
              className="text-center"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              <div className="bg-gradient-to-br from-green-500 to-teal-600 p-8 rounded-2xl text-white mb-6">
                <Target className="w-16 h-16 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-4">Launch</h3>
                <p className="text-lg">Learn how to build a great Digital Ecosystem to help you become a Brand in your niche.</p>
              </div>
            </motion.div>

            <motion.div 
              className="text-center"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-8 rounded-2xl text-white mb-6">
                <TrendingUp className="w-16 h-16 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-4">Level Up</h3>
                <p className="text-lg">Implement forward thinking strategies that converts your brand into a successful Business.</p>
              </div>
            </motion.div>
          </div>

          {/* Learning Topics */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {learningTopics.map((topic, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-xl text-center hover:from-purple-50 hover:to-blue-50 transition-all duration-300 cursor-pointer"
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -2 }}
              >
                <span className="text-sm font-medium text-gray-700">{topic}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Exclusive Benefits Section */}
      <motion.section 
        className="py-20 bg-gradient-to-br from-gray-50 to-white"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-gray-800 mb-6"
              variants={itemVariants}
            >
              Exclusive Benefits of Joining Our Community
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="flex justify-center mb-6">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 mb-6 text-center">
                  {benefit.description}
                </p>
                <ul className="space-y-2">
                  {benefit.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Achievement Levels */}
      <motion.section 
        className="py-20 bg-gradient-to-r from-purple-600 to-blue-600"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-white mb-6"
              variants={itemVariants}
            >
              Achievement Levels
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {achievementLevels.map((level, index) => (
              <motion.div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-white/20 transition-all duration-300"
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className={`bg-gradient-to-r ${level.color} w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center`}>
                  <Award className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {level.title}
                </h3>
                <p className="text-white/90 text-lg">
                  {level.income}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        className="py-20 bg-gradient-to-r from-green-600 to-blue-600"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4 text-center">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-white mb-6"
            variants={itemVariants}
          >
            Ready to Start Your Journey?
          </motion.h2>
          <motion.p 
            className="text-xl text-white/90 mb-8 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Join thousands of entrepreneurs who are already making a difference in their communities.
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-green-600 px-10 py-4 rounded-full font-bold text-lg shadow-2xl hover:shadow-white/25 transition-all duration-300"
            variants={itemVariants}
          >
            Start Your Journey Today
          </motion.button>
        </div>
      </motion.section>
    </div>
  );
}
