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

  return (
    <div className="bg-[#faf9fe] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-primary-50 border border-primary-200 text-primary-600 text-xs font-bold tracking-wider rounded-full uppercase mb-4">
            ★ Network & Grow
          </span>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0f0726]"
          >
            Join Our <span className="text-primary-600">Community</span>
          </motion.h1>
          <p className="text-gray-600 text-base max-w-2xl mx-auto mt-4 font-medium">
            Connect across platforms to collaborate, share knowledge, and grow together.
          </p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
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
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.98 }}
                className={`flex flex-col items-center justify-center p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300`}
              >
                <div className={`p-4 rounded-2xl ${platform.bgColor} mb-4 ${platform.color}`}>
                  {React.createElement(platform.icon, { size: 32 })}
                </div>
                <span className="text-base font-extrabold text-[#0f0726]">{platform.label}</span>
              </motion.a>
            );
          })}
        </motion.div>

        {communityLinks.length === 0 && (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-500 font-medium text-base mt-8"
          >
            No community links available at the moment.
          </motion.p>
        )}
      </div>
    </div>
  );
};

export default Community;