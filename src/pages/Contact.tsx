import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { collection, addDoc, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase/config';
import { auth } from '../firebase/config';
import { Linkedin, Youtube, Instagram, Twitter, Facebook, MessageSquare } from 'lucide-react';

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
  { value: 'whatsapp', label: 'WhatsApp', icon: MessageSquare, color: 'text-green-600', bgColor: 'bg-green-50' }
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  // Review form state
  const [showReview, setShowReview] = useState(false);
  const [reviewForm, setReviewForm] = useState({ name: '', role: '', rating: 0, review: '' });
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState(false);
  // Add new state for form submission
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState('');
  const [communityLinks, setCommunityLinks] = useState<CommunityLink[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      // Check if user is authenticated
      const user = auth.currentUser;
      
      // Add the form data to Firestore
      await addDoc(collection(db, 'contactMessages'), {
        ...formData,
        status: 'new',
        createdAt: new Date(),
        userId: user?.uid || 'anonymous' // Add user ID if available
      });
      
      // Reset form and show success message
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setSubmitSuccess(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
    } catch (error: any) {
      console.error('Error submitting form:', error);
      setError(error.message || 'Failed to send message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Review form handlers
  const handleReviewChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setReviewForm({ ...reviewForm, [e.target.name]: e.target.value });
  };
  const handleReviewRating = (rating: number) => {
    setReviewForm({ ...reviewForm, rating });
  };
  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setReviewSubmitting(true);
    try {
      await addDoc(collection(db, 'reviews'), reviewForm);
      setReviewSuccess(true);
      setReviewForm({ name: '', role: '', rating: 0, review: '' });
    } catch (err) {
      alert('Failed to submit review.');
    }
    setReviewSubmitting(false);
  };

  useEffect(() => {
    const fetchCommunityLinks = async () => {
      const linksQuery = query(collection(db, 'communityLinks'), orderBy('createdAt', 'desc'));
      const linksSnapshot = await getDocs(linksQuery);
      const linksData: CommunityLink[] = linksSnapshot.docs.map(doc => ({
        id: doc.id,
        platform: doc.data().platform,
        url: doc.data().url
      }));
      setCommunityLinks(linksData);
    };

    fetchCommunityLinks();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 py-6 sm:py-10 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto w-full"
        >
          <div className="text-center mb-8 sm:mb-12">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary-800 mb-3 sm:mb-4"
            >
              Get in Touch
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4"
            >
              Have questions about our programs or want to learn more? We'd love to hear from you.
            </motion.p>
          </div>

          {/* Review Button */}
          <div className="text-center mb-6 sm:mb-8">
            <button
              className="bg-primary-600 text-white px-4 sm:px-6 py-2 rounded-full font-medium hover:bg-primary-700 transition-colors duration-300 text-sm sm:text-base"
              onClick={() => setShowReview((v) => !v)}
            >
              {showReview ? 'Close Review Form' : 'Leave a Review'}
            </button>
          </div>
          {/* Review Form */}
          {showReview && (
            <form onSubmit={handleReviewSubmit} className="bg-white rounded-xl shadow-lg p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6 mb-8 sm:mb-12 max-w-lg mx-auto w-full">
              <h3 className="text-xl sm:text-2xl font-bold text-primary-800 mb-4 text-center">Leave a Review</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={reviewForm.name}
                  onChange={handleReviewChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm md:text-base"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select
                  name="role"
                  value={reviewForm.role}
                  onChange={handleReviewChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm md:text-base"
                  required
                >
                  <option value="">Select a role</option>
                  <option value="Entrepreneur">Entrepreneur</option>
                  <option value="Student">Student</option>
                  <option value="Digital Marketer">Digital Marketer</option>
                  <option value="Tech Entrepreneur">Tech Entrepreneur</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                <div className="flex space-x-1 justify-center sm:justify-start">
                  {[1,2,3,4,5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => handleReviewRating(star)}
                      className={`text-2xl sm:text-3xl transition-colors duration-200 ${
                        star <= reviewForm.rating ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Review</label>
                <textarea
                  name="review"
                  value={reviewForm.review}
                  onChange={handleReviewChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm md:text-base"
                  required
                />
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={reviewSubmitting}
                  className="w-full sm:w-auto px-6 py-2 bg-primary-600 text-white rounded-full font-medium hover:bg-primary-700 transition-colors duration-300 disabled:opacity-50"
                >
                  {reviewSubmitting ? 'Submitting...' : 'Submit Review'}
                </button>
              </div>
            </form>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="space-y-8"
            >
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-xl font-semibold text-primary-700 mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="bg-primary-100 p-3 rounded-full">
                      <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="text-gray-700 font-medium">poornima.sandeep@tech-shiksha.com 
</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="bg-primary-100 p-3 rounded-full">
                      <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="text-gray-700 font-medium">+91 92063 26416</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="bg-primary-100 p-3 rounded-full">
                      <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="text-gray-700 font-medium">Bangalore, Karnataka, India</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-xl font-semibold text-primary-700 mb-4">Follow Us</h3>
                <div className="flex flex-wrap gap-4">
                  {communityLinks.map((link) => {
                    const platform = PLATFORM_OPTIONS.find(p => p.value === link.platform);
                    if (!platform) return null;

                    return (
                      <motion.a
                        key={link.id}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className={`${platform.bgColor} p-3 rounded-full hover:opacity-90 transition-all duration-300`}
                      >
                        {React.createElement(platform.icon, { 
                          size: 24,
                          className: platform.color
                        })}
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <form onSubmit={handleSubmit} className="bg-white rounded-xl p-4 sm:p-6 md:p-8 shadow-lg w-full">
                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm md:text-base"
                      required
                      disabled={submitting}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm md:text-base"
                      required
                      disabled={submitting}
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm md:text-base"
                      required
                      disabled={submitting}
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm md:text-base"
                      required
                      disabled={submitting}
                    />
                  </div>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: submitting ? 1 : 1.02 }}
                    whileTap={{ scale: submitting ? 1 : 0.98 }}
                    className={`w-full bg-primary-600 text-white py-2 md:py-3 px-4 md:px-6 rounded-lg font-medium transition-colors duration-300 text-sm md:text-base ${
                      submitting ? 'opacity-75 cursor-not-allowed' : 'hover:bg-primary-700'
                    }`}
                    disabled={submitting}
                  >
                    {submitting ? 'Sending...' : 'Send Message'}
                  </motion.button>
                  {submitSuccess && (
                    <div className="text-green-600 text-center font-medium mt-2">
                      Thank you for your message! We'll get back to you soon.
                    </div>
                  )}
                  {error && (
                    <div className="text-red-600 text-center font-medium mt-2">{error}</div>
                  )}
                </div>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 