import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase/config';
import { ExternalLink } from 'lucide-react';

interface CommunityLink {
  id: string;
  platform: string;
  url: string;
  createdAt: any;
}

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

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-12">Join Our Community</h1>
      
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Connect With Us</h2>
          
          {communityLinks.length === 0 ? (
            <p className="text-gray-600 text-center">No community links available at the moment.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {communityLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300"
                >
                  <div>
                    <h3 className="text-lg font-medium text-gray-800">{link.platform}</h3>
                    <p className="text-sm text-gray-500 truncate">{link.url}</p>
                  </div>
                  <ExternalLink className="w-5 h-5 text-primary-500" />
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Community; 