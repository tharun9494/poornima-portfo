import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import { motion } from 'framer-motion';

interface Webinar {
  id: string;
  title: string;
  date: Date;
  description: string;
  registrationLink: string;
}

export default function Webinars() {
  const [webinars, setWebinars] = useState<Webinar[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWebinars() {
      try {
        const webinarsRef = collection(db, 'webinars');
        const snapshot = await getDocs(webinarsRef);
        const webinarData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          date: doc.data().date?.toDate() || new Date(),
        })) as Webinar[];

        // Sort webinars by date
        webinarData.sort((a, b) => b.date.getTime() - a.date.getTime());
        setWebinars(webinarData);
      } catch (error) {
        console.error('Error fetching webinars:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchWebinars();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-center mb-4">Upcoming Webinars</h1>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            Join our interactive sessions designed to enhance your skills and expand your network.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
          </div>
        ) : webinars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {webinars.map((webinar) => (
              <motion.div
                key={webinar.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="p-6">
                  <div className="text-sm text-primary-600 font-semibold mb-2">
                    {webinar.date.toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{webinar.title}</h3>
                  <p className="text-gray-600 mb-4">{webinar.description}</p>
                  <a
                    href={webinar.registrationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary w-full text-center"
                  >
                    Register Now
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600">No upcoming webinars at the moment.</p>
            <p className="text-gray-500 mt-2">Please check back later for new sessions.</p>
          </div>
        )}
      </div>
    </div>
  );
}