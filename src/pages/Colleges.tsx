import { useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, ArrowLeft, ArrowRight, BookOpen, Award, Users, ShieldCheck, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import ksit from './images/ksit.png';
import mvit from './images/mvit.png';

function Colleges() {
  const [imageErrors, setImageErrors] = useState<{ [key: string]: boolean }>({});

  const handleImageError = (url: string) => {
    setImageErrors(prev => ({ ...prev, [url]: true }));
  };

  const collegeLogos = [
    {
      url: "https://www.sahyadri.edu.in/images/logo.svg",
      name: "Sahyadri College"
    },
    {
      url: "https://jssateb.ac.in/assets/images/logo/jssate.png",
      name: "JSS College"
    },
    {
      url: "https://cityengineeringcollege.ac.in/wp-content/uploads/2024/06/logo-140x45-1.png",
      name: "City Engineering College"
    },
    {
      url: ksit,
      name: "KSIT"
    },
    {
      url: "https://www.theoxfordengg.org/images/logo.jpg",
      name: "Oxford Engineering"
    },
    {
      url: "https://admission.theaims.ac.in/common/images/logoo.png",
      name: "AIMS"
    },
    {
      url: "https://www.mamce.org/public/images/mamce-logo.png",
      name: "MAMCE"
    },
    {
      url: "https://www.tjohncollege.com/assets/tlogo.jpg",
      name: "T John College"
    },
    {
      url: "https://mits.ac.in/images/logo-1.jpg",
      name: "MITS"
    },
    {
      url: mvit,
      name: "MVIT"
    },
    {
      url: "https://static.npfs.co/accounts/207/documents/2025/1/20/AU%20LOGO%20WITH%20NAAC%2002.jpg?1737348496",
      name: "AU"
    },
    {
      url: "https://dsu.edu.in/btech/img/lg.png",
      name: "DSU"
    },
    {
      url: "https://atme.edu.in/wp-content/uploads/2022/04/Logo-200-X-78-01.png",
      name: "ATME"
    },
    {
      url: "https://www.cmrit.ac.in/wp-content/uploads/2021/06/logo.png",
      name: "CMRIT"
    }
  ];

  const highlights = [
    {
      icon: <GraduationCap className="w-5 h-5 text-primary-600" />,
      title: "Faculty Training",
      subtitle: "AI upskilling for professors"
    },
    {
      icon: <BookOpen className="w-5 h-5 text-primary-600" />,
      title: "Campus Bootcamps",
      subtitle: "Student AI masterclasses"
    },
    {
      icon: <Sparkles className="w-5 h-5 text-primary-600" />,
      title: "Keynote Sessions",
      subtitle: "Industry guest lectures"
    },
    {
      icon: <Users className="w-5 h-5 text-primary-600" />,
      title: "Hackathons",
      subtitle: "Practical student challenges"
    },
    {
      icon: <Award className="w-5 h-5 text-primary-600" />,
      title: "Placement Boost",
      subtitle: "LinkedIn & resume training"
    }
  ];

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
        duration: 0.4
      }
    }
  };

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
                ✦ ACADEMIC PARTNERS
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0f0726] leading-tight tracking-tight mb-4">
                Empowering Campuses & <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#6d28d9] to-[#db2777]">Educators Nationwide</span>
              </h1>
              <p className="text-gray-600 text-base sm:text-lg font-medium leading-relaxed max-w-2xl">
                We work closely with prestigious universities and colleges to train faculty, conduct hands-on AI workshops for students, and bridge the campus-to-corporate gap.
              </p>
            </div>

            {/* Right Recommendation Card */}
            <div className="lg:col-span-4 bg-white/90 backdrop-blur-md rounded-2xl p-6 border border-purple-100 shadow-sm flex flex-col justify-between">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#6d28d9] text-white flex items-center justify-center shrink-0">
                  <GraduationCap size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-[#0f0726] mb-1">Host a Campus Workshop</h3>
                  <p className="text-xs text-gray-500 font-medium leading-relaxed">
                    Invite Poornimma for keynotes, faculty development, or student bootcamps.
                  </p>
                </div>
              </div>
              <a
                href="/#contact"
                className="w-full py-2.5 px-4 border border-[#6d28d9] text-[#6d28d9] text-xs font-bold rounded-lg hover:bg-purple-50 transition-colors flex items-center justify-center gap-1.5"
              >
                Book Campus Session <ArrowRight size={14} />
              </a>
            </div>

          </div>
        </div>

        {/* College Logos Grid */}
        <div className="mb-16">
          <div className="flex items-center justify-center gap-4 mb-10">
            <div className="h-[1px] bg-purple-100 flex-1 max-w-[150px] hidden sm:block"></div>
            <span className="text-xs font-extrabold tracking-widest text-[#6d28d9] uppercase bg-purple-50 px-4 py-1.5 rounded-full border border-purple-100">
              ✦ PARTNER INSTITUTIONS
            </span>
            <div className="h-[1px] bg-purple-100 flex-1 max-w-[150px] hidden sm:block"></div>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-5 max-w-7xl mx-auto"
          >
            {collegeLogos.map((logoItem, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center justify-center group"
              >
                <div className="relative w-full h-20 flex items-center justify-center">
                  {imageErrors[logoItem.url] ? (
                    <div className="text-gray-500 text-center">
                      <p className="font-extrabold text-xs text-[#0f0726]">{logoItem.name}</p>
                    </div>
                  ) : (
                    <img
                      src={logoItem.url}
                      alt={logoItem.name}
                      className="max-h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                      onError={() => handleImageError(logoItem.url)}
                      loading="lazy"
                    />
                  )}
                </div>
                <span className="text-[11px] font-extrabold text-[#0f0726] mt-2 text-center">{logoItem.name}</span>
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

export default Colleges;