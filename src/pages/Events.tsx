import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase/config';
import { Calendar, Clock, MapPin, ExternalLink, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  imageUrl: string;
  registrationLink: string;
  createdAt: any;
  updatedAt: any;
}

const Events: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const q = query(collection(db, 'events'), orderBy('date', 'desc'));
        const snapshot = await getDocs(q);
        const eventList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Event));
        setEvents(eventList);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="py-20 flex items-center justify-center bg-white">
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

  const toggleExpand = (eventId: string) => {
    setExpandedEvent(expandedEvent === eventId ? null : eventId);
  };

  return (
    <div className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-primary-50 border border-primary-200 text-primary-600 text-xs font-bold tracking-wider rounded-full uppercase mb-4">
            ★ Live Workshops & Sessions
          </span>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0f0726]"
          >
            Upcoming <span className="text-primary-600">Events</span>
          </motion.h1>
          <p className="text-gray-600 text-base max-w-2xl mx-auto mt-4 font-medium">
            Join our expert-led sessions to level up your AI skills and build your personal brand.
          </p>
        </div>
        
        {events.length === 0 ? (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-500 font-medium text-base py-12"
          >
            No upcoming events at the moment. Check back soon!
          </motion.p>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {events.map((event) => (
              <motion.div
                key={event.id}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="bg-[#faf9fe] rounded-2xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md flex flex-col justify-between"
              >
                <div>
                  {event.imageUrl && (
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={event.imageUrl}
                        alt={event.title}
                        className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h2 className="text-xl font-extrabold text-[#0f0726] mb-3">{event.title}</h2>
                    <div className="space-y-2 text-sm text-gray-600 font-medium">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-primary-600 shrink-0" />
                        <span>{new Date(event.date).toLocaleDateString('en-US', { 
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2 text-primary-600 shrink-0" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2 text-primary-600 shrink-0" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                    <p className={`mt-4 text-sm text-gray-600 leading-relaxed font-medium ${expandedEvent === event.id ? '' : 'line-clamp-3'}`}>
                      {event.description}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 flex justify-between items-center gap-2">
                  {event.registrationLink ? (
                    <motion.a
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      href={event.registrationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-600 text-white text-xs font-bold rounded-lg hover:bg-primary-700 transition-colors shadow-sm"
                    >
                      Register Now
                      <ExternalLink className="w-3.5 h-3.5" />
                    </motion.a>
                  ) : <div />}

                  <button
                    onClick={() => toggleExpand(event.id)}
                    className="flex items-center text-xs font-bold text-primary-600 hover:text-primary-700 transition-colors"
                  >
                    {expandedEvent === event.id ? 'Less' : 'More'}
                    <ChevronDown 
                      className={`w-4 h-4 ml-0.5 transition-transform duration-300 ${
                        expandedEvent === event.id ? 'transform rotate-180' : ''
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

export default Events;