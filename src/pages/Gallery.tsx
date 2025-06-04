import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase/config';
import { motion } from 'framer-motion';

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
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

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
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12">Gallery</h1>

      {/* Section Filter */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-6 sm:mb-8">
        {sections.map((section) => (
          <motion.button
            key={section}
            onClick={() => setSelectedSection(section)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full capitalize transition-colors duration-300 text-sm sm:text-base ${
              selectedSection === section
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {section}
          </motion.button>
        ))}
      </div>

      {filteredImages.length === 0 ? (
        <p className="text-center text-gray-600 text-sm sm:text-base">No images found in this section.</p>
      ) : (
        <div className="relative">
          <div className="overflow-x-auto pb-6 hide-scrollbar">
            <div className="flex gap-4 px-4 min-w-max">
              {filteredImages.map((image) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex-shrink-0 w-72"
                >
                  <div 
                    className="relative group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                    onClick={() => setSelectedImage(image)}
                  >
                    <img
                      src={image.url}
                      alt={image.eventName}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-end">
                      <div className="p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className="text-lg font-semibold mb-1">{image.eventName}</h3>
                        <p className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {image.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Gradient overlays for scroll indication */}
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
        </div>
      )}

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-2 sm:p-4"
          onClick={() => setSelectedImage(null)}
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative max-w-4xl w-full bg-white rounded-lg overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <img
              src={selectedImage.url}
              alt={selectedImage.eventName}
              className="w-full h-auto max-h-[70vh] sm:max-h-[80vh] object-contain"
            />
            <div className="p-4 sm:p-6">
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">{selectedImage.eventName}</h3>
              <p className="text-sm sm:text-base text-gray-600">{selectedImage.description}</p>
              <div className="mt-3 sm:mt-4 flex justify-between items-center">
                <span className="text-xs sm:text-sm font-medium text-primary-500 capitalize">
                  {selectedImage.section}
                </span>
                <span className="text-xs sm:text-sm text-gray-500">
                  {new Date(selectedImage.uploadedAt.toDate()).toLocaleDateString()}
                </span>
              </div>
            </div>
            <button
              className="absolute top-2 sm:top-4 right-2 sm:right-4 text-white bg-black bg-opacity-50 rounded-full p-1.5 sm:p-2 hover:bg-opacity-75 transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <span className="text-lg sm:text-xl">✕</span>
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Gallery; 