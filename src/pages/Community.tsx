import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase/config';
import { Linkedin, Youtube, Instagram, Twitter, Facebook, MessageSquare, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

interface CommunityLink {
  id: string;
  platform: string;
  url: string;
}

const PLATFORM_OPTIONS = [
  { value: 'linkedin', label: 'LinkedIn', icon: Linkedin, color: 'text-blue-600', bgColor: 'bg-blue-50' },
  { value: 'youtube', label: 'YouTube', icon: Youtube, color: 'text-red-600', bgColor: 'bg-red-50' },
  { value: 'instagram', label: 'Instagram', icon: Instagram, color: 'text-pink-600', bgColor: 'bg-pink-50' },
  { value: 'twitter', label: 'Twitter', icon: Twitter, color: 'text-blue-400', bgColor: 'bg-blue-50' },
  { value: 'facebook', label: 'Facebook', icon: Facebook, color: 'text-blue-700', bgColor: 'bg-blue-50' },
  { value: 'whatsapp', label: 'WhatsApp', icon: MessageSquare, color: 'text-green-600', bgColor: 'bg-green-50' },
  { value: 'other', label: 'Other', icon: Globe, color: 'text-gray-600', bgColor: 'bg-gray-50' }
];

const Community: React.FC = () => {
  const [communityLinks, setCommunityLinks] = useState<CommunityLink[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCommunityLinks = async () => {
      try {
        const q = query(collection(db, 'communityLinks'), orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        const linkList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as CommunityLink));
        setCommunityLinks(linkList);
      } catch (error) {
        console.error('Error fetching community links:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCommunityLinks();
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-blue-600"
        >
          Join Our Community
        </motion.h1>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-4xl mx-auto"
        >
          {communityLinks.map((link) => {
            const platform = PLATFORM_OPTIONS.find(p => p.value === link.platform);
            if (!platform) return null;

            return (
              <motion.a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex flex-col items-center justify-center p-6 rounded-xl ${platform.bgColor} shadow-lg hover:shadow-xl transition-all duration-300`}
              >
                <div className={`p-4 rounded-full bg-white shadow-md mb-4 ${platform.color}`}>
                  {React.createElement(platform.icon, { size: 32 })}
                </div>
                <span className="text-lg font-semibold text-gray-800">{platform.label}</span>
              </motion.a>
            );
          })}
        </motion.div>

        {communityLinks.length === 0 && (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-600 text-lg mt-8"
          >
            No community links available at the moment.
          </motion.p>
        )}
      </div>
    </div>
  );
};

export default Community; 