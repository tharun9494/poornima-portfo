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
  const [selectedWebinar, setSelectedWebinar] = useState<Webinar | null>(null);
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-blue-600"
        >
          Upcoming Webinars
        </motion.h1>
        
        {webinars.length === 0 ? (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-600 text-lg"
          >
            No upcoming webinars at the moment.
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
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl"
              >
                {webinar.imageUrl && (
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={webinar.imageUrl}
                      alt={webinar.title}
                      className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-4 right-4 bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      <Video className="w-4 h-4 inline-block mr-1" />
                      Webinar
                    </div>
                  </div>
                )}
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-3">{webinar.title}</h2>
                  <div className="space-y-3 text-gray-600">
                    <div className="flex items-center">
                      <Calendar className="w-5 h-5 mr-2 text-primary-500" />
                      <span>{new Date(webinar.date).toLocaleDateString('en-US', { 
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-5 h-5 mr-2 text-primary-500" />
                      <span>{webinar.time} • {webinar.duration}</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex items-start">
                      <BookOpen className="w-5 h-5 mr-2 text-primary-500 mt-1" />
                      <div>
                        <h3 className="text-sm font-normal text-gray-800 mb-1">Learning Outcomes:</h3>
                        <p className={`text-gray-600 ${expandedWebinar === webinar.id ? '' : 'line-clamp-3'}`}>
                          {webinar.learningOutcomes}
                        </p>
                      </div>
                    </div>
                  </div>
                  <p className={`mt-4 text-gray-600 ${expandedWebinar === webinar.id ? '' : 'line-clamp-3'}`}>
                    {webinar.description}
                  </p>
                  <div className="mt-4 flex justify-between items-center">
                    {webinar.formLink && (
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href={webinar.formLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors duration-300"
                      >
                        Register Now
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </motion.a>
                    )}
                    <button
                      onClick={() => toggleExpand(webinar.id)}
                      className="flex items-center text-primary-500 hover:text-primary-600 transition-colors duration-300"
                    >
                      {expandedWebinar === webinar.id ? 'Show Less' : 'Show More'}
                      <ChevronDown 
                        className={`w-5 h-5 ml-1 transition-transform duration-300 ${
                          expandedWebinar === webinar.id ? 'transform rotate-180' : ''
                        }`}
                      />
                    </button>
                  </div>
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