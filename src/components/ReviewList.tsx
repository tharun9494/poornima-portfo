import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '../firebase/config';
import { Star } from 'lucide-react';

interface Review {
  id: string;
  name: string;
  rating: number;
  title: string;
  content: string;
  programType: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: any;
}

interface ReviewListProps {
  programType: 'webinar' | 'event';
}

const ReviewList: React.FC<ReviewListProps> = ({ programType }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        // First get all approved reviews for the program type
        const q = query(
          collection(db, 'reviews'),
          where('programType', '==', programType),
          where('status', '==', 'approved')
        );
        const snapshot = await getDocs(q);
        const reviewList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Review));
        
        // Sort the reviews by createdAt date in memory
        const sortedReviews = reviewList.sort((a, b) => {
          const dateA = a.createdAt?.toDate() || new Date(0);
          const dateB = b.createdAt?.toDate() || new Date(0);
          return dateB.getTime() - dateA.getTime();
        });
        
        setReviews(sortedReviews);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [programType]);

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No reviews yet. Be the first to share your experience!
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <div key={review.id} className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">{review.title}</h3>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
          <p className="text-gray-700 mb-4">{review.content}</p>
          <div className="flex justify-between items-center text-sm text-gray-500">
            <span>{review.name}</span>
            <span>
              {review.createdAt?.toDate().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewList; 