import React from 'react';
import { motion } from 'framer-motion';
import { Crown, Users, Star, CheckCircle, ArrowRight, Award, Target, Zap } from 'lucide-react';

function Memberships() {
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

  const membershipPlans = [
    {
      id: 'basic',
      name: 'Basic Member',
      price: 'Free',
      description: 'Perfect for getting started',
      features: [
        'Access to community forum',
        'Basic workshops access',
        'Newsletter subscription',
        'Event notifications'
      ],
      buttonText: 'Join Free',
      buttonColor: 'bg-blue-600 hover:bg-blue-700',
      popular: false
    },
    {
      id: 'premium',
      name: 'Premium Member',
      price: '₹2,999',
      period: '/month',
      description: 'Most popular choice',
      features: [
        'All Basic features',
        'Live mentorship sessions',
        'Premium workshops',
        '1-on-1 coaching calls',
        'Exclusive resources',
        'Priority support'
      ],
      buttonText: 'Start Premium',
      buttonColor: 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800',
      popular: true
    },
    {
      id: 'elite',
      name: 'Elite Member',
      price: '₹9,999',
      period: '/month',
      description: 'For serious entrepreneurs',
      features: [
        'All Premium features',
        'Mastermind group access',
        'Advanced business strategies',
        'Personal brand development',
        'Revenue optimization',
        'Lifetime access to resources'
      ],
      buttonText: 'Go Elite',
      buttonColor: 'bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700',
      popular: false
    }
  ];

  const benefits = [
    {
      icon: <Users className="w-8 h-8 text-blue-600" />,
      title: "Exclusive Community",
      description: "Connect with like-minded entrepreneurs and industry experts in our private community."
    },
    {
      icon: <Star className="w-8 h-8 text-yellow-600" />,
      title: "Expert Mentorship",
      description: "Get guidance from successful entrepreneurs and industry leaders."
    },
    {
      icon: <Target className="w-8 h-8 text-green-600" />,
      title: "Goal Achievement",
      description: "Structured programs to help you achieve your business and personal goals."
    },
    {
      icon: <Award className="w-8 h-8 text-purple-600" />,
      title: "Recognition & Awards",
      description: "Get recognized for your achievements and milestones in the community."
    },
    {
      icon: <Zap className="w-8 h-8 text-red-600" />,
      title: "Fast-Track Growth",
      description: "Accelerate your business growth with proven strategies and frameworks."
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-indigo-600" />,
      title: "Accountability Support",
      description: "Stay on track with regular check-ins and accountability partnerships."
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
            <Crown className="w-12 h-12 text-purple-600" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800">Memberships</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Join our exclusive community of changemakers and unlock your potential. Choose the membership that fits your journey.
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
        >
          <motion.div variants={itemVariants} className="text-center">
            <div className="text-4xl font-bold text-purple-600 mb-2">500+</div>
            <div className="text-gray-600">Active Members</div>
          </motion.div>
          <motion.div variants={itemVariants} className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">4.8/5</div>
            <div className="text-gray-600">Member Satisfaction</div>
          </motion.div>
          <motion.div variants={itemVariants} className="text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">95%</div>
            <div className="text-gray-600">Goal Achievement Rate</div>
          </motion.div>
        </motion.div>

        {/* Membership Plans */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
        >
          {membershipPlans.map((plan) => (
            <motion.div
              key={plan.id}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className={`relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 ${
                plan.popular ? 'border-purple-500' : 'border-gray-100'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-2 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                </div>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{plan.name}</h3>
                <div className="text-4xl font-bold text-gray-800 mb-1">
                  {plan.price}
                  {plan.period && <span className="text-lg text-gray-500">{plan.period}</span>}
                </div>
                <p className="text-gray-600">{plan.description}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-full ${plan.buttonColor} text-white py-3 px-6 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2`}
              >
                {plan.buttonText}
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </motion.div>
          ))}
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Why Join Our Community?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience the power of community-driven growth and unlock your full potential.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="flex items-center gap-4 mb-4">
                  {benefit.icon}
                  <h3 className="text-xl font-semibold text-gray-800">{benefit.title}</h3>
                </div>
                <p className="text-gray-600">{benefit.description}</p>
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
          className="text-center bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-12 text-white"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Journey?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Join thousands of entrepreneurs who are already making a difference in their communities.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Start Your Journey Today
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}

export default Memberships;
