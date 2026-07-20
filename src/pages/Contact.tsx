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

  const [showReview, setShowReview] = useState(false);
  const [reviewForm, setReviewForm] = useState({ name: '', role: '', rating: 0, review: '' });
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState('');
  const [communityLinks, setCommunityLinks] = useState<CommunityLink[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const user = auth.currentUser;
      
      await addDoc(collection(db, 'contactMessages'), {
        ...formData,
        status: 'new',
        createdAt: new Date(),
        userId: user?.uid || 'anonymous'
      });
      
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setSubmitSuccess(true);
      
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
      await addDoc(collection(db, 'reviews'), {
        ...reviewForm,
        createdAt: new Date(),
        status: 'new'
      });
      setReviewSuccess(true);
      setReviewForm({ name: '', role: '', rating: 0, review: '' });
    } catch (err) {
      alert('Failed to submit review.');
    }
    setReviewSubmitting(false);
  };

  useEffect(() => {
    const fetchCommunityLinks = async () => {
      try {
        const linksQuery = query(collection(db, 'communityLinks'), orderBy('createdAt', 'desc'));
        const linksSnapshot = await getDocs(linksQuery);
        const linksData: CommunityLink[] = linksSnapshot.docs.map(doc => ({
          id: doc.id,
          platform: doc.data().platform,
          url: doc.data().url
        }));
        setCommunityLinks(linksData);
      } catch (err) {
        console.error('Error fetching community links:', err);
      }
    };

    fetchCommunityLinks();
  }, []);

  return (
    <div className="bg-[#faf9fe] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto w-full"
        >
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-primary-50 border border-primary-200 text-primary-600 text-xs font-bold tracking-wider rounded-full uppercase mb-4">
              ★ Let's Connect
            </span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0f0726] mb-4"
            >
              Get in <span className="text-primary-600">Touch</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto font-medium"
            >
              Have questions about our programs, workshops, or want to collaborate? We'd love to hear from you.
            </motion.p>
          </div>

          {/* Review Toggle Button */}
          <div className="text-center mb-8">
            <button
              className="bg-primary-50 border border-primary-200 text-primary-600 px-6 py-2.5 rounded-full font-bold hover:bg-primary-100 transition-colors duration-300 text-sm shadow-sm"
              onClick={() => setShowReview((v) => !v)}
            >
              {showReview ? 'Close Review Form' : '★ Leave a Review'}
            </button>
          </div>

          {/* Review Form */}
          {showReview && (
            <form onSubmit={handleReviewSubmit} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8 space-y-5 mb-12 max-w-lg mx-auto w-full">
              <h3 className="text-xl font-extrabold text-[#0f0726] text-center">Share Your Feedback</h3>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={reviewForm.name}
                  onChange={handleReviewChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-primary-600 text-sm font-medium"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Role</label>
                <select
                  name="role"
                  value={reviewForm.role}
                  onChange={handleReviewChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-primary-600 text-sm font-medium"
                  required
                >
                  <option value="">Select your role</option>
                  <option value="Educator / Teacher">Educator / Teacher</option>
                  <option value="Entrepreneur">Entrepreneur</option>
                  <option value="Student">Student</option>
                  <option value="Corporate Professional">Corporate Professional</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Rating</label>
                <div className="flex space-x-2 justify-center sm:justify-start">
                  {[1,2,3,4,5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => handleReviewRating(star)}
                      className={`text-2xl transition-colors duration-200 ${
                        star <= reviewForm.rating ? 'text-amber-400' : 'text-gray-200'
                      }`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Review</label>
                <textarea
                  name="review"
                  value={reviewForm.review}
                  onChange={handleReviewChange}
                  rows={4}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-primary-600 text-sm font-medium"
                  required
                />
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={reviewSubmitting}
                  className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors duration-300 disabled:opacity-50 text-sm shadow-md"
                >
                  {reviewSubmitting ? 'Submitting...' : 'Submit Review'}
                </button>
              </div>
            </form>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
                <h3 className="text-xl font-extrabold text-[#0f0726] mb-6">Contact Details</h3>
                <div className="space-y-5">
                  <div className="flex items-center space-x-4">
                    <div className="bg-primary-50 p-3.5 rounded-xl text-primary-600 shrink-0">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Email</p>
                      <a href="mailto:connect@aiinfluencerhub.in" className="text-gray-900 font-semibold hover:text-primary-600 transition-colors text-sm">connect@aiinfluencerhub.in</a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="bg-primary-50 p-3.5 rounded-xl text-primary-600 shrink-0">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Phone / WhatsApp</p>
                      <a href="https://wa.me/919206326416" target="_blank" rel="noopener noreferrer" className="text-gray-900 font-semibold hover:text-primary-600 transition-colors text-sm">+91 92063 26416</a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="bg-primary-50 p-3.5 rounded-xl text-primary-600 shrink-0">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Location</p>
                      <p className="text-gray-900 font-semibold text-sm">Bangalore, Karnataka, India</p>
                    </div>
                  </div>
                </div>
              </div>

              {communityLinks.length > 0 && (
                <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
                  <h3 className="text-lg font-bold text-[#0f0726] mb-4">Connect on Social</h3>
                  <div className="flex flex-wrap gap-3">
                    {communityLinks.map((link) => {
                      const platform = PLATFORM_OPTIONS.find(p => p.value === link.platform);
                      if (!platform) return null;

                      return (
                        <motion.a
                          key={link.id}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`${platform.bgColor} p-3 rounded-xl hover:shadow-sm transition-all duration-300 flex items-center gap-2 text-xs font-bold`}
                        >
                          {React.createElement(platform.icon, { 
                            size: 20,
                            className: platform.color
                          })}
                          <span>{platform.label}</span>
                        </motion.a>
                      );
                    })}
                  </div>
                </div>
              )}
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 w-full">
                <h3 className="text-xl font-extrabold text-[#0f0726] mb-6">Send a Message</h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-primary-600 text-sm font-medium"
                      required
                      disabled={submitting}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-primary-600 text-sm font-medium"
                      required
                      disabled={submitting}
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-primary-600 text-sm font-medium"
                      required
                      disabled={submitting}
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-primary-600 text-sm font-medium"
                      required
                      disabled={submitting}
                    />
                  </div>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: submitting ? 1 : 1.01 }}
                    whileTap={{ scale: submitting ? 1 : 0.98 }}
                    className={`w-full bg-primary-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-300 text-sm shadow-md ${
                      submitting ? 'opacity-75 cursor-not-allowed' : 'hover:bg-primary-700'
                    }`}
                    disabled={submitting}
                  >
                    {submitting ? 'Sending...' : 'Send Message'}
                  </motion.button>
                  {submitSuccess && (
                    <div className="text-emerald-600 text-center font-bold text-sm mt-2">
                      Thank you for your message! We'll get back to you soon.
                    </div>
                  )}
                  {error && (
                    <div className="text-rose-600 text-center font-bold text-sm mt-2">{error}</div>
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