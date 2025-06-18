import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, ArrowLeft } from 'lucide-react';
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
      name: "Sahyadri College",
      bgColor: "bg-white"
    },
    {
      url: "https://jssateb.ac.in/assets/images/logo/jssate.png",
      name: "JSS College",
      bgColor: "bg-white"
    },
    {
      url: "https://cityengineeringcollege.ac.in/wp-content/uploads/2024/06/logo-140x45-1.png",
      name: "City Engineering College",
      bgColor: "bg-white"
    },
    {
      url: ksit,
      name: "KSIT",
      bgColor: "bg-white"
    },
    {
      url: "https://www.theoxfordengg.org/images/logo.jpg",
      name: "Oxford Engineering",
      bgColor: "bg-white"
    },
    {
      url: "https://admission.theaims.ac.in/common/images/logoo.png",
      name: "AIMS",
      bgColor: "bg-white"
    },
    {
      url: "https://www.mamce.org/public/images/mamce-logo.png",
      name: "MAMCE",
      bgColor: "bg-white"
    },
    {
      url: "https://www.tjohncollege.com/assets/tlogo.jpg",
      name: "T John College",
      bgColor: "bg-white"
    },
    {
      url: "https://mits.ac.in/images/logo-1.jpg",
      name: "MITS",
      bgColor: "bg-white"
    },
    {
      url: mvit,
      name: "MVIT",
      bgColor: "bg-white"
    },
    {
      url: "https://static.npfs.co/accounts/207/documents/2025/1/20/AU%20LOGO%20WITH%20NAAC%2002.jpg?1737348496",
      name: "AU",
      bgColor: "bg-white"
    },
    {
      url: "https://dsu.edu.in/btech/img/lg.png",
      name: "DSU",
      bgColor: "bg-white"
    },
    {
      url: "https://atme.edu.in/wp-content/uploads/2022/04/Logo-200-X-78-01.png",
      name: "ATME",
      bgColor: "bg-white"
    },
    {
      url: "https://d2e9h3gjmozu47.cloudfront.net/brand.png",
      name: "Brand College",
      bgColor: "bg-white"
    },
    {
      url: "https://www.cmrit.ac.in/wp-content/uploads/2021/06/logo.png",
      name: "CMRIT",
      bgColor: "bg-white"
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
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Our Educational Partners</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            We work closely with prestigious educational institutions to empower students and create opportunities for growth.
          </p>
        </motion.div>

        {/* College Logos Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="flex items-center justify-center gap-3 mb-10">
            <GraduationCap className="w-8 h-8 text-blue-600" />
            <h2 className="text-3xl font-semibold text-gray-800">Partner Institutions</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {collegeLogos.map((logo, index) => (
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
                    <div className={`w-full h-full flex items-center justify-center ${logo.bgColor} rounded-lg`}>
                      <img
                        src={logo.url}
                        alt={logo.name}
                        className="max-h-24 w-auto object-contain transition-transform duration-300 group-hover:scale-110"
                        onError={() => handleImageError(logo.url)}
                        loading="lazy"
                      />
                    </div>
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

export default Colleges; 