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
      <div className="py-20 flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-primary-50 border border-primary-200 text-primary-600 text-xs font-bold tracking-wider rounded-full uppercase mb-4">
            ★ Moments & Highlights
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0f0726]">
            Photo <span className="text-primary-600">Gallery</span>
          </h1>
          <p className="text-gray-600 text-base max-w-2xl mx-auto mt-4 font-medium">
            Highlights from workshops, campus sessions, corporate trainings, and community meetups.
          </p>
        </div>

        {/* Section Filter */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10">
          {sections.map((section) => (
            <motion.button
              key={section}
              onClick={() => setSelectedSection(section)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`px-4 py-2 rounded-full capitalize transition-colors duration-200 text-xs font-bold ${
                selectedSection === section
                  ? 'bg-primary-600 text-white shadow-md'
                  : 'bg-primary-50 text-gray-700 hover:bg-primary-100'
              }`}
            >
              {section}
            </motion.button>
          ))}
        </div>

        {filteredImages.length === 0 ? (
          <p className="text-center text-gray-500 font-medium text-base py-12">No images found in this category.</p>
        ) : (
          <div className="relative">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredImages.map((image) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div 
                    className="relative group cursor-pointer overflow-hidden rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 bg-gray-50"
                    onClick={() => setSelectedImage(image)}
                  >
                    <img
                      src={image.url}
                      alt={image.eventName}
                      className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f0726]/80 via-[#0f0726]/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end p-4">
                      <div className="text-white">
                        <h3 className="text-sm font-bold mb-1">{image.eventName}</h3>
                        <p className="text-xs text-gray-200 line-clamp-2">
                          {image.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Image Modal */}
        {selectedImage && (
          <div 
            className="fixed inset-0 bg-[#0f0726]/90 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative max-w-4xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <img
                src={selectedImage.url}
                alt={selectedImage.eventName}
                className="w-full h-auto max-h-[75vh] object-contain bg-black"
              />
              <div className="p-6">
                <h3 className="text-xl font-extrabold text-[#0f0726] mb-2">{selectedImage.eventName}</h3>
                <p className="text-sm text-gray-600 font-medium mb-3">{selectedImage.description}</p>
                <div className="flex justify-between items-center text-xs font-bold text-gray-500">
                  <span className="px-3 py-1 bg-primary-50 text-primary-600 rounded-full capitalize">
                    {selectedImage.section}
                  </span>
                  <span>
                    {selectedImage.uploadedAt?.toDate ? new Date(selectedImage.uploadedAt.toDate()).toLocaleDateString() : ''}
                  </span>
                </div>
              </div>
              <button
                className="absolute top-4 right-4 text-white bg-black/60 rounded-full w-8 h-8 flex items-center justify-center hover:bg-black/80 transition-colors"
                onClick={() => setSelectedImage(null)}
              >
                ✕
              </button>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;