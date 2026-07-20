import { motion } from 'framer-motion';
import { Crown, Users, Star, CheckCircle, ArrowRight, ArrowLeft, ShieldCheck, Clock, Award as CertificateIcon, Wand2 } from 'lucide-react';
import { Link } from 'react-router-dom';

function Memberships() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const membershipPlans = [
    {
      id: 'basic',
      name: 'Community Access',
      price: 'Free',
      description: 'Perfect for getting started',
      features: [
        'Access to community forum',
        'Basic workshops access',
        'Newsletter subscription',
        'Event notifications'
      ],
      buttonText: 'Join Free Community',
      buttonColor: 'bg-primary-600 hover:bg-primary-700',
      popular: false
    },
    {
      id: 'premium',
      name: 'Pro AI Member',
      price: '₹2,999',
      period: '/month',
      description: 'Most popular choice',
      features: [
        'All Free features included',
        'Live weekly mentorship sessions',
        'Premium masterclasses',
        '1-on-1 monthly guidance calls',
        'Exclusive AI prompt library',
        'Priority community support'
      ],
      buttonText: 'Start Pro Membership',
      buttonColor: 'bg-[#6d28d9] hover:bg-[#5b21b6]',
      popular: true
    },
    {
      id: 'elite',
      name: 'VIP Creator Circle',
      price: '₹9,999',
      period: '/quarter',
      description: 'For serious personal brands',
      features: [
        'All Pro AI features included',
        'Executive mastermind access',
        'Personal brand optimization',
        'Direct 1-on-1 strategy calls',
        'Monetization frameworks',
        'Lifetime resource portal access'
      ],
      buttonText: 'Join VIP Circle',
      buttonColor: 'bg-[#0f0726] hover:bg-[#1a0c3d]',
      popular: false
    }
  ];

  const highlights = [
    {
      icon: <ShieldCheck className="w-5 h-5 text-purple-600" />,
      title: "Verified Mentorship",
      subtitle: "Guidance from AI pioneers"
    },
    {
      icon: <Wand2 className="w-5 h-5 text-purple-600" />,
      title: "Prompt Library",
      subtitle: "Pre-tested AI prompts"
    },
    {
      icon: <Clock className="w-5 h-5 text-purple-600" />,
      title: "Flexible Learning",
      subtitle: "Self-paced study modules"
    },
    {
      icon: <Users className="w-5 h-5 text-purple-600" />,
      title: "Live Q&A",
      subtitle: "Interactive weekly calls"
    },
    {
      icon: <CertificateIcon className="w-5 h-5 text-purple-600" />,
      title: "Member Badges",
      subtitle: "Official completion certificates"
    }
  ];

  return (
    <div className="bg-white py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <div className="mb-6">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-xs font-bold text-primary-600 hover:text-primary-700 transition-colors uppercase tracking-wider"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>

        {/* Top Hero Banner */}
        <div className="bg-gradient-to-r from-[#f5f0ff] via-[#faf7ff] to-[#f3ebfc] rounded-3xl p-6 sm:p-10 lg:p-12 border border-purple-100 mb-16 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-8 flex flex-col items-start">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white border border-purple-200 text-[#6d28d9] text-xs font-extrabold tracking-wider rounded-full uppercase mb-4 shadow-sm">
                ✦ MEMBERSHIP TIERS
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0f0726] leading-tight tracking-tight mb-4">
                Unlock Exclusive Mentorship & <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#6d28d9] to-[#db2777]">AI Resources</span>
              </h1>
              <p className="text-gray-600 text-base sm:text-lg font-medium leading-relaxed max-w-2xl">
                Join our supportive community of creators, educators, and professionals to accelerate your growth with hands-on AI mentorship.
              </p>
            </div>

            {/* Right Recommendation Card */}
            <div className="lg:col-span-4 bg-white/90 backdrop-blur-md rounded-2xl p-6 border border-purple-100 shadow-sm flex flex-col justify-between">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#6d28d9] text-white flex items-center justify-center shrink-0">
                  <Crown size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-[#0f0726] mb-1">Need a Custom Plan?</h3>
                  <p className="text-xs text-gray-500 font-medium leading-relaxed">
                    Custom group memberships for colleges and corporate teams.
                  </p>
                </div>
              </div>
              <a
                href="/#contact"
                className="w-full py-2.5 px-4 border border-[#6d28d9] text-[#6d28d9] text-xs font-bold rounded-lg hover:bg-purple-50 transition-colors flex items-center justify-center gap-1.5"
              >
                Inquire Team Membership <ArrowRight size={14} />
              </a>
            </div>

          </div>
        </div>

        {/* Membership Plans Section */}
        <div className="mb-16">
          <div className="flex items-center justify-center gap-4 mb-10">
            <div className="h-[1px] bg-purple-100 flex-1 max-w-[150px] hidden sm:block"></div>
            <span className="text-xs font-extrabold tracking-widest text-[#6d28d9] uppercase bg-purple-50 px-4 py-1.5 rounded-full border border-purple-100">
              ✦ CHOOSE YOUR PLAN
            </span>
            <div className="h-[1px] bg-purple-100 flex-1 max-w-[150px] hidden sm:block"></div>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          >
            {membershipPlans.map((plan) => (
              <motion.div
                key={plan.id}
                variants={itemVariants}
                whileHover={{ y: -6 }}
                className={`relative bg-white rounded-3xl p-8 border ${
                  plan.popular ? 'border-[#6d28d9] shadow-xl' : 'border-gray-100 shadow-sm'
                } transition-all duration-300 flex flex-col justify-between`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 transform -translate-x-1/2">
                    <span className="bg-[#6d28d9] text-white px-4 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider shadow-md">
                      ★ Most Popular
                    </span>
                  </div>
                )}
                
                <div>
                  <div className="text-center mb-6 pt-2">
                    <h3 className="text-xl font-black text-[#0f0726] mb-2">{plan.name}</h3>
                    <div className="text-3xl sm:text-4xl font-black text-[#0f0726] mb-1">
                      {plan.price}
                      {plan.period && <span className="text-sm text-gray-400 font-medium">{plan.period}</span>}
                    </div>
                    <p className="text-xs text-gray-500 font-medium">{plan.description}</p>
                  </div>

                  <ul className="space-y-3 mb-8 border-t border-gray-100 pt-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <CheckCircle className="w-4 h-4 text-[#6d28d9] shrink-0" />
                        <span className="text-xs text-gray-700 font-semibold">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href="/#contact"
                  className={`w-full ${plan.buttonColor} text-white py-3 px-6 rounded-xl text-xs font-extrabold transition-all duration-300 flex items-center justify-center gap-2 shadow-md text-center`}
                >
                  {plan.buttonText}
                  <ArrowRight className="w-4 h-4" />
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bottom Highlights Bar */}
        <div className="bg-[#f5f0ff]/80 border border-purple-100 rounded-2xl p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
          {highlights.map((item, idx) => (
            <div key={idx} className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-white shadow-sm border border-purple-100 flex items-center justify-center shrink-0">
                {item.icon}
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-extrabold text-[#0f0726]">{item.title}</span>
                <span className="text-[11px] text-gray-500 font-medium leading-tight">{item.subtitle}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Memberships;
