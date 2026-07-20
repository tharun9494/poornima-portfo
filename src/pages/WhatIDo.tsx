import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  Briefcase, 
  BookOpen, 
  Home as HomeIcon,
  Video,
  Sparkles,
  Award,
  Bot,
  Building2,
  Rocket,
  Users,
  Presentation,
  ArrowRight,
  ShieldCheck,
  Wand2,
  Clock,
  Award as CertificateIcon
} from 'lucide-react';

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

function WhatIDo() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const categoryPrograms = [
    {
      id: "educators",
      title: "AI for Educators",
      description: "Teach smarter, create better lessons, and engage students with AI.",
      icon: <GraduationCap className="w-5 h-5" />,
      colorClass: "bg-purple-100 text-purple-600"
    },
    {
      id: "trainers",
      title: "AI for Trainers & Coaches",
      description: "Design powerful trainings, workshops and coaching programs with AI.",
      icon: <Presentation className="w-5 h-5" />,
      colorClass: "bg-pink-100 text-pink-600"
    },
    {
      id: "professionals",
      title: "AI for Professionals",
      description: "Boost productivity, save time and work smarter with AI tools.",
      icon: <Briefcase className="w-5 h-5" />,
      colorClass: "bg-blue-100 text-blue-600"
    },
    {
      id: "homemakers",
      title: "AI for Homemakers",
      description: "Start earning, create content and build online income using AI.",
      icon: <HomeIcon className="w-5 h-5" />,
      colorClass: "bg-amber-100 text-amber-600"
    },
    {
      id: "creators",
      title: "AI for Creators",
      description: "Create stunning content, grow your brand and engage your audience.",
      icon: <Video className="w-5 h-5" />,
      colorClass: "bg-emerald-100 text-emerald-600"
    },
    {
      id: "students",
      title: "AI for Students",
      description: "Study better, do research faster and prepare for your dream career.",
      icon: <BookOpen className="w-5 h-5" />,
      colorClass: "bg-purple-100 text-purple-600"
    }
  ];

  const specializedPrograms = [
    {
      id: "prompt-engineering",
      title: "Prompt Engineering Masterclass",
      description: "From beginner to advanced prompting techniques & frameworks.",
      icon: <Sparkles className="w-5 h-5" />,
      colorClass: "bg-purple-100 text-purple-600"
    },
    {
      id: "personal-branding",
      title: "Personal Branding with AI",
      description: "Build your personal brand, create content and become a thought leader.",
      icon: <Award className="w-5 h-5" />,
      colorClass: "bg-pink-100 text-pink-600"
    },
    {
      id: "ai-tools",
      title: "AI Tools Mastery",
      description: "Master top AI tools and integrate them into your daily workflow.",
      icon: <Bot className="w-5 h-5" />,
      colorClass: "bg-blue-100 text-blue-600"
    },
    {
      id: "corporate-ai",
      title: "Corporate AI Training",
      description: "Customized training programs for teams and organizations to adopt AI.",
      icon: <Building2 className="w-5 h-5" />,
      colorClass: "bg-amber-100 text-amber-600"
    },
    {
      id: "bootcamps",
      title: "Workshops & Bootcamps",
      description: "Short term, high impact workshops and bootcamps for quick learning.",
      icon: <Rocket className="w-5 h-5" />,
      colorClass: "bg-emerald-100 text-emerald-600"
    },
    {
      id: "hub-community",
      title: "AIINFLUENCERS HUB Community",
      description: "Join our community, attend live sessions, challenges and network.",
      icon: <Users className="w-5 h-5" />,
      colorClass: "bg-purple-100 text-purple-600"
    }
  ];

  const highlights = [
    {
      icon: <ShieldCheck className="w-5 h-5 text-purple-600" />,
      title: "Beginner Friendly",
      subtitle: "No technical skills required"
    },
    {
      icon: <Wand2 className="w-5 h-5 text-purple-600" />,
      title: "Hands-on Learning",
      subtitle: "Practical projects & real use cases"
    },
    {
      icon: <Clock className="w-5 h-5 text-purple-600" />,
      title: "Lifetime Access",
      subtitle: "Learn at your own pace"
    },
    {
      icon: <Users className="w-5 h-5 text-purple-600" />,
      title: "Community Support",
      subtitle: "Learn, share & grow together"
    },
    {
      icon: <CertificateIcon className="w-5 h-5 text-purple-600" />,
      title: "Certificates",
      subtitle: "Showcase your AI skills"
    }
  ];

  return (
    <div className="bg-white py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Hero Banner */}
        <div className="bg-gradient-to-r from-[#f5f0ff] via-[#faf7ff] to-[#f3ebfc] rounded-3xl p-6 sm:p-10 lg:p-12 border border-purple-100 mb-16 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-8 flex flex-col items-start">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white border border-purple-200 text-[#6d28d9] text-xs font-extrabold tracking-wider rounded-full uppercase mb-4 shadow-sm">
                ✦ EXPLORE PROGRAMS
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0f0726] leading-tight tracking-tight mb-4">
                Find the Right <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#6d28d9] to-[#db2777]">AI Program</span> for You
              </h1>
              <p className="text-gray-600 text-base sm:text-lg font-medium leading-relaxed max-w-2xl">
                Practical, beginner-friendly and outcome-driven programs for educators, professionals, creators, students and everyone.
              </p>
            </div>

            {/* Right Recommendation Card */}
            <div className="lg:col-span-4 bg-white/90 backdrop-blur-md rounded-2xl p-6 border border-purple-100 shadow-sm flex flex-col justify-between">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#6d28d9] text-white flex items-center justify-center shrink-0">
                  <Users size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-[#0f0726] mb-1">Not sure where to start?</h3>
                  <p className="text-xs text-gray-500 font-medium leading-relaxed">
                    Take our quick quiz and we'll recommend the best program for you!
                  </p>
                </div>
              </div>
              <button
                onClick={() => scrollToSection('contact')}
                className="w-full py-2.5 px-4 border border-[#6d28d9] text-[#6d28d9] text-xs font-bold rounded-lg hover:bg-purple-50 transition-colors flex items-center justify-center gap-1.5"
              >
                Find My Program <ArrowRight size={14} />
              </button>
            </div>

          </div>
        </div>

        {/* Section 1: Browse Programs by Category */}
        <div className="mb-16">
          <div className="flex items-center justify-center gap-4 mb-10">
            <div className="h-[1px] bg-purple-100 flex-1 max-w-[150px] hidden sm:block"></div>
            <span className="text-xs font-extrabold tracking-widest text-[#6d28d9] uppercase bg-purple-50 px-4 py-1.5 rounded-full border border-purple-100">
              ✦ BROWSE PROGRAMS BY CATEGORY
            </span>
            <div className="h-[1px] bg-purple-100 flex-1 max-w-[150px] hidden sm:block"></div>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5"
          >
            {categoryPrograms.map((program) => (
              <motion.div
                key={program.id}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between items-center text-center group"
              >
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full ${program.colorClass} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    {program.icon}
                  </div>
                  <h3 className="text-sm font-extrabold text-[#0f0726] mb-2 leading-snug">{program.title}</h3>
                  <p className="text-xs text-gray-500 font-medium leading-relaxed mb-4">{program.description}</p>
                </div>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="text-xs font-bold text-[#6d28d9] hover:text-[#5b21b6] inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                >
                  Explore <ArrowRight size={12} />
                </button>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Section 2: Specialized Programs */}
        <div className="mb-16">
          <div className="flex items-center justify-center gap-4 mb-10">
            <div className="h-[1px] bg-purple-100 flex-1 max-w-[150px] hidden sm:block"></div>
            <span className="text-xs font-extrabold tracking-widest text-[#6d28d9] uppercase bg-purple-50 px-4 py-1.5 rounded-full border border-purple-100">
              ✦ SPECIALIZED PROGRAMS
            </span>
            <div className="h-[1px] bg-purple-100 flex-1 max-w-[150px] hidden sm:block"></div>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5"
          >
            {specializedPrograms.map((program) => (
              <motion.div
                key={program.id}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between items-center text-center group"
              >
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full ${program.colorClass} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    {program.icon}
                  </div>
                  <h3 className="text-sm font-extrabold text-[#0f0726] mb-2 leading-snug">{program.title}</h3>
                  <p className="text-xs text-gray-500 font-medium leading-relaxed mb-4">{program.description}</p>
                </div>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="text-xs font-bold text-[#6d28d9] hover:text-[#5b21b6] inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                >
                  Explore <ArrowRight size={12} />
                </button>
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

export default WhatIDo;