import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase/config';
import { Calendar, Clock, FileText, ExternalLink, ThumbsUp } from 'lucide-react';
import ReviewForm from '../components/ReviewForm';
import ReviewList from '../components/ReviewList';

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
  createdAt: any;
  updatedAt: any;
}

const Webinars: React.FC = () => {
  const [webinars, setWebinars] = useState<Webinar[]>([]);
  const [loading, setLoading] = useState(true);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [liked, setLiked] = useState(false);

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

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-12">Upcoming Webinars</h1>
      
      {webinars.length === 0 ? (
        <p className="text-center text-gray-600">No upcoming webinars at the moment.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {webinars.map((webinar) => (
            <div key={webinar.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              {webinar.imageUrl && (
                <img
                  src={webinar.imageUrl}
                  alt={webinar.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{webinar.title}</h2>
                <div className="space-y-2 text-gray-600">
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    <span>{new Date(webinar.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 mr-2" />
                    <span>{webinar.time} ({webinar.duration})</span>
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="font-medium text-gray-800 mb-2">What You'll Learn:</h3>
                  <p className="text-gray-600">{webinar.learningOutcomes}</p>
                </div>
                <p className="mt-4 text-gray-600">{webinar.description}</p>
                {webinar.formLink && (
                  <a
                    href={webinar.formLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center text-primary-500 hover:text-primary-600"
                  >
                    Register Now
                    <ExternalLink className="w-4 h-4 ml-1" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Reviews Section */}
      <div className="mt-20">
        <h2 className="text-3xl font-bold text-center mb-12">Webinar Reviews</h2>
        <div className="max-w-4xl mx-auto">
          <ReviewList programType="webinar" />
        </div>
      </div>

      {/* Like and Review Form Section */}
      <div className="mt-20">
        <h2 className="text-3xl font-bold text-center mb-12">Share Your Experience</h2>
        <div className="max-w-4xl mx-auto">
          {!showReviewForm ? (
            <div className="text-center">
              <button
                onClick={() => {
                  setLiked(true);
                  setShowReviewForm(true);
                }}
                className={`inline-flex items-center px-6 py-3 rounded-lg transition-all duration-300 ${
                  liked 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <ThumbsUp className={`w-5 h-5 mr-2 ${liked ? 'fill-current' : ''}`} />
                {liked ? 'Liked!' : 'Like this Webinar'}
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="text-center text-green-600 mb-6">
                <ThumbsUp className="w-8 h-8 mx-auto mb-2 fill-current" />
                <p className="text-lg">Thank you for liking this webinar!</p>
              </div>
              <ReviewForm />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Webinars;