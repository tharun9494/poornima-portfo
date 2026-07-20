import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase/config';
import { Calendar, Clock, BookOpen, ExternalLink, Video, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

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

const Webinars: React.FC = () => {
  const [webinars, setWebinars] = useState<Webinar[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedWebinar, setExpandedWebinar] = useState<string | null>(null);

  useEffect(() => {
    const fetchWebinars = async () => {
      try {
        const q = query(collection(db, 'webinars'), orderBy('date', 'desc'));
        const snapshot = await getDocs(q);
        const webinarList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Webinar));
        setWebinars(webinarList);
      } catch (error) {
        console.error('Error fetching webinars:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWebinars();
  }, []);

  if (loading) {
    return (
      <div className="py-20 flex items-center justify-center bg-[#faf9fe]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

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

  const toggleExpand = (webinarId: string) => {
    setExpandedWebinar(expandedWebinar === webinarId ? null : webinarId);
  };

  return (
    <div className="bg-[#faf9fe] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-primary-50 border border-primary-200 text-primary-600 text-xs font-bold tracking-wider rounded-full uppercase mb-4">
            ★ Live Sessions & Masterclasses
          </span>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0f0726]"
          >
            Masterclasses & <span className="text-primary-600">Webinars</span>
          </motion.h1>
          <p className="text-gray-600 text-base max-w-2xl mx-auto mt-4 font-medium">
            Interactive virtual sessions designed to teach you practical AI skills and personal branding.
          </p>
        </div>
        
        {webinars.length === 0 ? (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-500 font-medium text-base py-12"
          >
            No upcoming webinars at the moment. Stay tuned!
          </motion.p>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {webinars.map((webinar) => (
              <motion.div
                key={webinar.id}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md flex flex-col justify-between"
              >
                <div>
                  {webinar.imageUrl && (
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={webinar.imageUrl}
                        alt={webinar.title}
                        className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-105"
                      />
                      <div className="absolute top-4 right-4 bg-primary-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                        <Video className="w-3.5 h-3.5 inline-block mr-1" />
                        Webinar
                      </div>
                    </div>
                  )}
                  <div className="p-6">
                    <h2 className="text-xl font-extrabold text-[#0f0726] mb-3">{webinar.title}</h2>
                    <div className="space-y-2 text-sm text-gray-600 font-medium mb-4">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-primary-600 shrink-0" />
                        <span>{new Date(webinar.date).toLocaleDateString('en-US', { 
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2 text-primary-600 shrink-0" />
                        <span>{webinar.time} • {webinar.duration}</span>
                      </div>
                    </div>

                    {webinar.learningOutcomes && (
                      <div className="mb-4 bg-primary-50/50 p-3 rounded-xl border border-primary-100">
                        <div className="flex items-start gap-2">
                          <BookOpen className="w-4 h-4 text-primary-600 shrink-0 mt-0.5" />
                          <div>
                            <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-1">Outcomes:</h3>
                            <p className={`text-xs text-gray-600 font-medium leading-relaxed ${expandedWebinar === webinar.id ? '' : 'line-clamp-2'}`}>
                              {webinar.learningOutcomes}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    <p className={`text-sm text-gray-600 leading-relaxed font-medium ${expandedWebinar === webinar.id ? '' : 'line-clamp-3'}`}>
                      {webinar.description}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 flex justify-between items-center gap-2">
                  {webinar.formLink ? (
                    <motion.a
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      href={webinar.formLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-600 text-white text-xs font-bold rounded-lg hover:bg-primary-700 transition-colors shadow-sm"
                    >
                      Register Now
                      <ExternalLink className="w-3.5 h-3.5" />
                    </motion.a>
                  ) : <div />}

                  <button
                    onClick={() => toggleExpand(webinar.id)}
                    className="flex items-center text-xs font-bold text-primary-600 hover:text-primary-700 transition-colors"
                  >
                    {expandedWebinar === webinar.id ? 'Less' : 'More'}
                    <ChevronDown 
                      className={`w-4 h-4 ml-0.5 transition-transform duration-300 ${
                        expandedWebinar === webinar.id ? 'transform rotate-180' : ''
                      }`}
                    />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Webinars;