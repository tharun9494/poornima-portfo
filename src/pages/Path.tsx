import { motion } from 'framer-motion';
import { Target, CheckCircle, ArrowRight, ArrowLeft, Clock, Users, Award, Zap, BookOpen, Lightbulb, TrendingUp, ShieldCheck, Wand2 } from 'lucide-react';
import { Link } from 'react-router-dom';

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
        duration: 0.4
      }
    }
  };

  const journeySteps = [
    {
      step: 1,
      title: "Foundation Building",
      duration: "Weeks 1-4",
      description: "Establish core AI literacy, prompting principles, and personal brand mindset.",
      icon: <BookOpen className="w-5 h-5 text-primary-600" />,
      features: [
        "Mindset & Goal Alignment",
        "Prompting Fundamentals",
        "Personal Branding Strategy",
        "Community Orientation"
      ]
    },
    {
      step: 2,
      title: "Skill Development",
      duration: "Weeks 5-12",
      description: "Master essential AI tools for content creation, productivity, and automation.",
      icon: <Lightbulb className="w-5 h-5 text-primary-600" />,
      features: [
        "AI Content Creation",
        "Social Media Growth Strategy",
        "Workflow Automations",
        "Digital Portfolio Building"
      ]
    },
    {
      step: 3,
      title: "Practical Implementation",
      duration: "Weeks 13-20",
      description: "Apply your knowledge in live projects, client work, and workshops.",
      icon: <Zap className="w-5 h-5 text-accent-600" />,
      features: [
        "Real-World Projects",
        "Live Mentorship Feedback",
        "Peer Collaboration",
        "Monetization Launch"
      ]
    },
    {
      step: 4,
      title: "Growth & Scaling",
      duration: "Weeks 21-28",
      description: "Scale your reach, expand revenue streams, and gain recognition.",
      icon: <TrendingUp className="w-5 h-5 text-accent-600" />,
      features: [
        "Brand Scaling",
        "Leadership & Speaking",
        "Network Expansion",
        "Certification & Badges"
      ]
    }
  ];

  const milestones = [
    {
      title: "Brand Star",
      description: "Launch & Build First 1,000 Followers",
      icon: <Award className="w-5 h-5 text-primary-600" />
    },
    {
      title: "Digital Changemaker",
      description: "Monetize AI Skills & Services",
      icon: <Target className="w-5 h-5 text-accent-600" />
    },
    {
      title: "AI Thought Leader",
      description: "Keynote & Corporate Speaker Status",
      icon: <Award className="w-5 h-5 text-primary-600" />
    }
  ];

  const highlights = [
    {
      icon: <ShieldCheck className="w-5 h-5 text-purple-600" />,
      title: "Structured Steps",
      subtitle: "Clear 28-week progression"
    },
    {
      icon: <Wand2 className="w-5 h-5 text-purple-600" />,
      title: "Hands-on Tasks",
      subtitle: "Actionable weekly assignments"
    },
    {
      icon: <Clock className="w-5 h-5 text-purple-600" />,
      title: "Paced Study",
      subtitle: "Fits alongside your work"
    },
    {
      icon: <Users className="w-5 h-5 text-purple-600" />,
      title: "Peer Reviews",
      subtitle: "Collaborate with cohort"
    },
    {
      icon: <Award className="w-5 h-5 text-purple-600" />,
      title: "Milestone Badges",
      subtitle: "Recognized achievements"
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
                ✦ LEARNING ROADMAP
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0f0726] leading-tight tracking-tight mb-4">
                Your Step-by-Step Roadmap to <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#6d28d9] to-[#db2777]">AI Mastery</span>
              </h1>
              <p className="text-gray-600 text-base sm:text-lg font-medium leading-relaxed max-w-2xl">
                Follow a proven 28-week structured roadmap engineered to transform beginners into confident AI practitioners and digital leaders.
              </p>
            </div>

            {/* Right Recommendation Card */}
            <div className="lg:col-span-4 bg-white/90 backdrop-blur-md rounded-2xl p-6 border border-purple-100 shadow-sm flex flex-col justify-between">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#6d28d9] text-white flex items-center justify-center shrink-0">
                  <Target size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-[#0f0726] mb-1">Start Your Path</h3>
                  <p className="text-xs text-gray-500 font-medium leading-relaxed">
                    Get custom guidance on where to start based on your current background.
                  </p>
                </div>
              </div>
              <a
                href="/#contact"
                className="w-full py-2.5 px-4 border border-[#6d28d9] text-[#6d28d9] text-xs font-bold rounded-lg hover:bg-purple-50 transition-colors flex items-center justify-center gap-1.5"
              >
                Book Roadmap Consultation <ArrowRight size={14} />
              </a>
            </div>

          </div>
        </div>

        {/* 4 Steps Roadmap Grid */}
        <div className="mb-16">
          <div className="flex items-center justify-center gap-4 mb-10">
            <div className="h-[1px] bg-purple-100 flex-1 max-w-[150px] hidden sm:block"></div>
            <span className="text-xs font-extrabold tracking-widest text-[#6d28d9] uppercase bg-purple-50 px-4 py-1.5 rounded-full border border-purple-100">
              ✦ 4-STAGE TRANSFORMATION JOURNEY
            </span>
            <div className="h-[1px] bg-purple-100 flex-1 max-w-[150px] hidden sm:block"></div>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto"
          >
            {journeySteps.map((step) => (
              <motion.div
                key={step.step}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
                      {step.icon}
                    </div>
                    <span className="px-3 py-1 bg-primary-600 text-white rounded-full text-xs font-black">
                      Stage {step.step}
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-[#0f0726] mb-1">{step.title}</h3>
                  <span className="text-xs font-bold text-primary-600 mb-3 block">{step.duration}</span>
                  <p className="text-xs text-gray-500 font-medium leading-relaxed mb-4">{step.description}</p>
                </div>

                <ul className="space-y-2 border-t border-gray-100 pt-4">
                  {step.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs font-semibold text-gray-700">
                      <CheckCircle className="w-3.5 h-3.5 text-primary-600 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Milestones Section */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-xl font-extrabold text-[#0f0726]">Achievement Milestones</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {milestones.map((milestone, idx) => (
              <div key={idx} className="bg-[#faf9fe] rounded-2xl p-6 border border-gray-100 text-center flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-white shadow-sm border border-purple-100 flex items-center justify-center mb-3">
                  {milestone.icon}
                </div>
                <h4 className="text-sm font-extrabold text-[#0f0726] mb-1">{milestone.title}</h4>
                <p className="text-xs text-gray-500 font-medium">{milestone.description}</p>
              </div>
            ))}
          </div>
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

export default Path;
