import { motion } from 'framer-motion';
import { Star, Quote, Award, ArrowLeft, ArrowRight, ShieldCheck, Wand2, Clock, Users, CertificateIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

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
        duration: 0.4
      }
    }
  };

  const successStories = [
    {
      id: 1,
      name: "Priya Sharma",
      role: "Life Coach & Educator",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      achievement: "5x Growth in 6 Months",
      story: "From struggling with digital tools to building an AI-powered coaching framework, Priya transformed her career and now trains hundreds of educators.",
      testimonial: "The community and hands-on AI mentorship changed my career completely. I went from feeling overwhelmed to building a thriving digital presence.",
      rating: 5
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      role: "Digital Consultant",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      achievement: "AI Agency Launched",
      story: "Starting with zero prompting knowledge, Rajesh now automates content for international clients across multiple industries.",
      testimonial: "The structured learning path and practical implementation helped me launch a profitable consultancy from scratch.",
      rating: 5
    },
    {
      id: 3,
      name: "Anita Patel",
      role: "Trainer & Entrepreneur",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      achievement: "1,000+ Students Mentored",
      story: "Anita leveraged personal branding strategies to scale her online workshops, reaching learners across India.",
      testimonial: "The community support and personal branding frameworks taught me how to turn my expertise into an impactful brand.",
      rating: 5
    },
    {
      id: 4,
      name: "Dr. Srinidhi Veldanda",
      role: "Life Coach & Yoga Instructor",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
      achievement: "Thought Leader",
      story: "Dr. Srinidhi adopted AI productivity tools to streamline session planning, creating authentic content and expanding her global reach.",
      testimonial: "Poornimma's sessions are well thought out and guided me hand-in-hand to become a confident, tech-empowered practitioner.",
      rating: 5
    }
  ];

  const highlights = [
    {
      icon: <ShieldCheck className="w-5 h-5 text-purple-600" />,
      title: "500+ Achievers",
      subtitle: "Verified community transformations"
    },
    {
      icon: <Wand2 className="w-5 h-5 text-purple-600" />,
      title: "Proven Frameworks",
      subtitle: "Tested AI strategies"
    },
    {
      icon: <Clock className="w-5 h-5 text-purple-600" />,
      title: "Real Outcomes",
      subtitle: "Measurable career progress"
    },
    {
      icon: <Users className="w-5 h-5 text-purple-600" />,
      title: "Active Network",
      subtitle: "Peer mentorship & support"
    },
    {
      icon: <Award className="w-5 h-5 text-purple-600" />,
      title: "Recognition",
      subtitle: "Showcase member achievements"
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
                ✦ IMPACT & TRANSFORMATION
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0f0726] leading-tight tracking-tight mb-4">
                Real Stories from <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#6d28d9] to-[#db2777]">Real Achievers</span>
              </h1>
              <p className="text-gray-600 text-base sm:text-lg font-medium leading-relaxed max-w-2xl">
                Discover how educators, students, and professionals transformed their lives and careers through our practical AI & personal branding programs.
              </p>
            </div>

            {/* Right Recommendation Card */}
            <div className="lg:col-span-4 bg-white/90 backdrop-blur-md rounded-2xl p-6 border border-purple-100 shadow-sm flex flex-col justify-between">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#6d28d9] text-white flex items-center justify-center shrink-0">
                  <Award size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-[#0f0726] mb-1">Write Your Story</h3>
                  <p className="text-xs text-gray-500 font-medium leading-relaxed">
                    Join our upcoming cohort and start your transformation today.
                  </p>
                </div>
              </div>
              <a
                href="/#contact"
                className="w-full py-2.5 px-4 border border-[#6d28d9] text-[#6d28d9] text-xs font-bold rounded-lg hover:bg-purple-50 transition-colors flex items-center justify-center gap-1.5"
              >
                Join Next Cohort <ArrowRight size={14} />
              </a>
            </div>

          </div>
        </div>

        {/* Stories Grid */}
        <div className="mb-16">
          <div className="flex items-center justify-center gap-4 mb-10">
            <div className="h-[1px] bg-purple-100 flex-1 max-w-[150px] hidden sm:block"></div>
            <span className="text-xs font-extrabold tracking-widest text-[#6d28d9] uppercase bg-purple-50 px-4 py-1.5 rounded-full border border-purple-100">
              ✦ TRANSFORMATION STORIES
            </span>
            <div className="h-[1px] bg-purple-100 flex-1 max-w-[150px] hidden sm:block"></div>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
          >
            {successStories.map((story) => (
              <motion.div
                key={story.id}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={story.image}
                        alt={story.name}
                        className="w-12 h-12 rounded-full object-cover ring-2 ring-purple-100"
                      />
                      <div>
                        <h3 className="text-base font-extrabold text-[#0f0726]">{story.name}</h3>
                        <p className="text-xs text-primary-600 font-semibold">{story.role}</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-full text-xs font-bold shrink-0">
                      ★ {story.achievement}
                    </span>
                  </div>

                  <div className="flex mb-3 gap-1">
                    {[...Array(story.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>

                  <p className="text-xs text-gray-600 font-medium leading-relaxed mb-4">{story.story}</p>

                  <div className="bg-[#faf9fe] rounded-xl p-4 border border-purple-50">
                    <Quote className="w-4 h-4 text-primary-600 mb-1" />
                    <p className="text-xs text-gray-700 italic font-medium">"{story.testimonial}"</p>
                  </div>
                </div>
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

export default SuccessStories;
