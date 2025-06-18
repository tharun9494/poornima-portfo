import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, ArrowLeft } from 'lucide-react';
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
      name: "Company 1"
    },
    {
      url: "https://media.licdn.com/dms/image/v2/D560BAQHvpmLxXoZguw/company-logo_200_200/company-logo_200_200/0/1704727195316?e=1753920000&v=beta&t=wqA3xz4FVmSJeaRitXLMIzK4Y3EDljf0-gL0QNXEGhY",
      name: "Company 2"
    },
    {
      url: "https://media.licdn.com/dms/image/v2/D5603AQHKy5fLYNG47g/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1708168071573?e=1753920000&v=beta&t=uaYMIRFpACZaMReecHAIIUX5N4gjReyzme4ia-Y0PlE",
      name: "Company 3"
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-16">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex flex-wrap gap-4 items-center">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Home
            </Link>
            
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Our Partner Companies</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            We collaborate with leading companies to provide opportunities and resources for students and women empowerment.
          </p>
        </motion.div>

        {/* Company Logos Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="flex items-center justify-center gap-3 mb-10">
            <Building2 className="w-8 h-8 text-blue-600" />
            <h2 className="text-3xl font-semibold text-gray-800">Trusted Partners</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {companyLogos.map((logo, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center group border border-gray-100"
              >
                <div className="relative w-full h-32 flex items-center justify-center">
                  {imageErrors[logo.url] ? (
                    <div className="text-gray-500 text-center">
                      <p className="font-medium">{logo.name}</p>
                      <p className="text-sm">Logo unavailable</p>
                    </div>
                  ) : (
                    <img
                      src={logo.url}
                      alt={logo.name}
                      className="max-h-24 w-auto object-contain transition-transform duration-300 group-hover:scale-110"
                      onError={() => handleImageError(logo.url)}
                      loading="lazy"
                    />
                  )}
                  <div className="absolute inset-0 bg-blue-50 bg-opacity-0 group-hover:bg-opacity-20 rounded-lg transition-all duration-300" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Companies; 