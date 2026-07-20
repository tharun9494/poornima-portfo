import { useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, ArrowLeft, ArrowRight, ShieldCheck, Briefcase, Award, Users, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import forefightera from './images/forefightera.png';

function Companies() {
  const [imageErrors, setImageErrors] = useState<{ [key: string]: boolean }>({});

  const handleImageError = (url: string) => {
    setImageErrors(prev => ({ ...prev, [url]: true }));
  };

  const companyLogos = [
    {
      url: forefightera,
      name: "ForeFight Era"
    },
    {
      url: "https://media.licdn.com/dms/image/v2/D560BAQHVJ8Ct7p7BIA/img-crop_100/B56ZZHoohBGUAQ-/0/1744958558149?e=1753920000&v=beta&t=jk5MabKS-eDr4Wi0KjbUGF84JanCUjS-r9Ag_e8qE2E",
      name: "Industry Partner"
    },
    {
      url: "https://media.licdn.com/dms/image/v2/D560BAQHvpmLxXoZguw/company-logo_200_200/company-logo_200_200/0/1704727195316?e=1753920000&v=beta&t=wqA3xz4FVmSJeaRitXLMIzK4Y3EDljf0-gL0QNXEGhY",
      name: "Enterprise Partner"
    },
    {
      url: "https://media.licdn.com/dms/image/v2/D5603AQHKy5fLYNG47g/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1708168071573?e=1753920000&v=beta&t=uaYMIRFpACZaMReecHAIIUX5N4gjReyzme4ia-Y0PlE",
      name: "Tech Solutions"
    },
    {
      url: "https://media.licdn.com/dms/image/v2/C4D0BAQEsHtdCtiZ_Sw/company-logo_200_200/company-logo_200_200/0/1654665614322/techshiksha_logo?e=1753920000&v=beta&t=jvar5_Y92-tCqMGUjkHzwM1MoNnsJs3wsHAm8_xIf0o",
      name: "TechShiksha"
    },
    {
      url: "https://media.licdn.com/dms/image/v2/D4E0BAQFgSB01EswgoQ/company-logo_200_200/company-logo_200_200/0/1722804523899/novuspark_logo?e=1754524800&v=beta&t=z66hRsnQCe-BPGy0LrNvI3mikaYh6JtNrrCIXdIX8hg",
      name: "Novuspark"
    }
  ];

  const highlights = [
    {
      icon: <Building2 className="w-5 h-5 text-primary-600" />,
      title: "Corporate Upskilling",
      subtitle: "Custom AI training for teams"
    },
    {
      icon: <Briefcase className="w-5 h-5 text-primary-600" />,
      title: "Hiring Pipeline",
      subtitle: "Direct access to AI-trained talent"
    },
    {
      icon: <Award className="w-5 h-5 text-primary-600" />,
      title: "Executive Coaching",
      subtitle: "AI leadership strategies"
    },
    {
      icon: <Users className="w-5 h-5 text-primary-600" />,
      title: "CSR Initiatives",
      subtitle: "Women empowerment programs"
    },
    {
      icon: <Globe className="w-5 h-5 text-primary-600" />,
      title: "Global Network",
      subtitle: "Connect across industries"
    }
  ];

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
                ✦ PARTNER COMPANIES
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0f0726] leading-tight tracking-tight mb-4">
                Empowering Growth with <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#6d28d9] to-[#db2777]">Leading Organizations</span>
              </h1>
              <p className="text-gray-600 text-base sm:text-lg font-medium leading-relaxed max-w-2xl">
                We collaborate with innovative companies and corporate leaders to provide workforce training, internship placements, and strategic AI adoption.
              </p>
            </div>

            {/* Right Recommendation Card */}
            <div className="lg:col-span-4 bg-white/90 backdrop-blur-md rounded-2xl p-6 border border-purple-100 shadow-sm flex flex-col justify-between">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#6d28d9] text-white flex items-center justify-center shrink-0">
                  <Building2 size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-[#0f0726] mb-1">Partner With Us</h3>
                  <p className="text-xs text-gray-500 font-medium leading-relaxed">
                    Custom corporate AI workshops and talent sourcing for your company.
                  </p>
                </div>
              </div>
              <a
                href="/#contact"
                className="w-full py-2.5 px-4 border border-[#6d28d9] text-[#6d28d9] text-xs font-bold rounded-lg hover:bg-purple-50 transition-colors flex items-center justify-center gap-1.5"
              >
                Inquire Corporate Training <ArrowRight size={14} />
              </a>
            </div>

          </div>
        </div>

        {/* Company Logos Grid */}
        <div className="mb-16">
          <div className="flex items-center justify-center gap-4 mb-10">
            <div className="h-[1px] bg-purple-100 flex-1 max-w-[150px] hidden sm:block"></div>
            <span className="text-xs font-extrabold tracking-widest text-[#6d28d9] uppercase bg-purple-50 px-4 py-1.5 rounded-full border border-purple-100">
              ✦ TRUSTED ORGANIZATIONS
            </span>
            <div className="h-[1px] bg-purple-100 flex-1 max-w-[150px] hidden sm:block"></div>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-6xl mx-auto"
          >
            {companyLogos.map((logoItem, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center justify-center group"
              >
                <div className="relative w-full h-24 flex items-center justify-center">
                  {imageErrors[logoItem.url] ? (
                    <div className="text-gray-500 text-center">
                      <p className="font-extrabold text-xs text-[#0f0726]">{logoItem.name}</p>
                    </div>
                  ) : (
                    <img
                      src={logoItem.url}
                      alt={logoItem.name}
                      className="max-h-20 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                      onError={() => handleImageError(logoItem.url)}
                      loading="lazy"
                    />
                  )}
                </div>
                <span className="text-xs font-extrabold text-[#0f0726] mt-2">{logoItem.name}</span>
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

export default Companies;