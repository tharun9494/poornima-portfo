import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase/config';

interface GalleryImage {
  id: string;
  url: string;
  section: string;
  eventName: string;
  description: string;
  uploadedAt: any;
}

const Gallery: React.FC = () => {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSection, setSelectedSection] = useState<string>('all');

  useEffect(() => {
    const fetchGalleryImages = async () => {
      try {
        const q = query(collection(db, 'galleryImages'), orderBy('uploadedAt', 'desc'));
        const snapshot = await getDocs(q);
        const imageList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as GalleryImage));
        setGalleryImages(imageList);
      } catch (error) {
        console.error('Error fetching gallery images:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryImages();
  }, []);

  const sections = ['all', ...new Set(galleryImages.map(img => img.section))];

  const filteredImages = selectedSection === 'all'
    ? galleryImages
    : galleryImages.filter(img => img.section === selectedSection);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-12">Gallery</h1>

      {/* Section Filter */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {sections.map((section) => (
          <button
            key={section}
            onClick={() => setSelectedSection(section)}
            className={`px-4 py-2 rounded-full capitalize ${
              selectedSection === section
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {section}
          </button>
        ))}
      </div>

      {filteredImages.length === 0 ? (
        <p className="text-center text-gray-600">No images found in this section.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredImages.map((image) => (
            <div key={image.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src={image.url}
                alt={image.eventName}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-primary-500 capitalize">
                    {image.section}
                  </span>
                  <span className="text-sm text-gray-500">
                    {new Date(image.uploadedAt.toDate()).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{image.eventName}</h3>
                <p className="text-gray-600">{image.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Gallery; 