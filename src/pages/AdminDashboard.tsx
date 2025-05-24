import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc, query, orderBy, Timestamp, writeBatch } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '../firebase/config';
import { FileText, Image, MessageSquare, Users, X, Plus, Edit2, Trash2, Save, XCircle, Calendar, Check, Star } from 'lucide-react';

interface DashboardStats {
  webinars: number;
  events: number;
  notifications: number;
  eventImages: number;
}

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

// Add new interface for Event
interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  imageUrl: string;
  registrationLink: string;
  createdAt: any;
  updatedAt: any;
}

interface Testimonial {
  id: string;
  name: string;
  role: string;
  imageUrl: string;
  content: string;
  rating: number;
  createdAt: any;
  updatedAt: any;
}

interface CommunityLink {
  id: string;
  platform: string;
  url: string;
}

// Add new interface for Gallery Image
interface GalleryImage {
  id: string;
  url: string;
  section: string;
  eventName: string;
  description: string;
  uploadedAt: any;
}

// Add new interface for bulk upload
interface BulkUploadImage {
  url: string;
  section: string;
  eventName: string;
  description: string;
}

// Add new interface for Contact Message
interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: any;
  status: 'new' | 'read' | 'replied';
}

interface Review {
  id: string;
  name: string;
  email: string;
  rating: number;
  title: string;
  content: string;
  programType: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: any;
}

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    webinars: 0,
    events: 0,
    notifications: 0,
    eventImages: 0,
  });

  // State for forms
  const [webinars, setWebinars] = useState<Webinar[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [communityLinks, setCommunityLinks] = useState<CommunityLink[]>([]);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [activeSection, setActiveSection] = useState<string>('dashboard');

  // Form states
  const [newWebinar, setNewWebinar] = useState({
    title: '',
    date: '',
    time: '',
    duration: '',
    learningOutcomes: '',
    formLink: '',
    imageUrl: '',
    description: ''
  });
  const [newTestimonial, setNewTestimonial] = useState({
    name: '',
    role: '',
    imageUrl: '',
    content: '',
    rating: 5
  });
  const [newCommunityLink, setNewCommunityLink] = useState({ platform: '', url: '' });

  // Add new states for editing
  const [editingWebinar, setEditingWebinar] = useState<string | null>(null);
  const [editingTestimonial, setEditingTestimonial] = useState<string | null>(null);
  const [editingCommunityLink, setEditingCommunityLink] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Add new state for gallery
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [newGalleryImage, setNewGalleryImage] = useState({
    url: '',
    section: '',
    eventName: '',
    description: ''
  });
  const [editingGalleryImage, setEditingGalleryImage] = useState<string | null>(null);

  // Add new state for bulk upload
  const [bulkUploadImages, setBulkUploadImages] = useState<BulkUploadImage[]>([]);
  const [bulkUploadSection, setBulkUploadSection] = useState('');
  const [bulkUploadEventName, setBulkUploadEventName] = useState('');
  const [bulkUploadDescription, setBulkUploadDescription] = useState('');
  const [bulkUploadUrls, setBulkUploadUrls] = useState('');

  // Add new state for upload type
  const [uploadType, setUploadType] = useState<'single' | 'bulk'>('single');

  // Add new state for messages
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  // Add new state for events form
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    description: '',
    imageUrl: '',
    registrationLink: ''
  });
  const [editingEvent, setEditingEvent] = useState<string | null>(null);

  // Add new state for reviews
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    fetchStats();
    fetchWebinars();
    fetchEvents();
    fetchTestimonials();
    fetchCommunityLinks();
    fetchGalleryImages();
    fetchMessages();
    fetchReviews();
  }, []);

  const fetchStats = async () => {
    try {
      const webinarsSnapshot = await getDocs(collection(db, 'webinars'));
      const eventsSnapshot = await getDocs(collection(db, 'events'));
      const notificationsSnapshot = await getDocs(collection(db, 'notifications'));
      const imagesSnapshot = await getDocs(collection(db, 'eventImages'));

      setStats({
        webinars: webinarsSnapshot.size,
        events: eventsSnapshot.size,
        notifications: notificationsSnapshot.size,
        eventImages: imagesSnapshot.size,
      });
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    }
  };

  const fetchWebinars = async () => {
    try {
      setLoading(true);
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

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const q = query(collection(db, 'events'), orderBy('date', 'desc'));
      const snapshot = await getDocs(q);
      const eventList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Event));
      setEvents(eventList);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const q = query(collection(db, 'testimonials'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const testimonialList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Testimonial));
      setTestimonials(testimonialList);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCommunityLinks = async () => {
    try {
      setLoading(true);
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

  const fetchGalleryImages = async () => {
    try {
      setLoading(true);
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

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const q = query(collection(db, 'contactMessages'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const messageList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ContactMessage));
      setMessages(messageList);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const q = query(collection(db, 'reviews'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const reviewList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Review));
      setReviews(reviewList);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddWebinar = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await addDoc(collection(db, 'webinars'), {
        ...newWebinar,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      });
      setNewWebinar({
        title: '',
        date: '',
        time: '',
        duration: '',
        learningOutcomes: '',
        formLink: '',
        imageUrl: '',
        description: ''
      });
      await fetchWebinars();
      await fetchStats();
    } catch (error) {
      console.error('Error adding webinar:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateWebinar = async (id: string, updatedData: Partial<Webinar>) => {
    try {
      setLoading(true);
      await updateDoc(doc(db, 'webinars', id), {
        ...updatedData,
        updatedAt: Timestamp.now()
      });
      setEditingWebinar(null);
      await fetchWebinars();
    } catch (error) {
      console.error('Error updating webinar:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteWebinar = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this webinar?')) {
      try {
        setLoading(true);
        await deleteDoc(doc(db, 'webinars', id));
        await fetchWebinars();
        await fetchStats();
      } catch (error) {
        console.error('Error deleting webinar:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleAddTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await addDoc(collection(db, 'testimonials'), {
        ...newTestimonial,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      });
      setNewTestimonial({
        name: '',
        role: '',
        imageUrl: '',
        content: '',
        rating: 5
      });
      await fetchTestimonials();
      await fetchStats();
    } catch (error) {
      console.error('Error adding testimonial:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateTestimonial = async (id: string, updatedData: Partial<Testimonial>) => {
    try {
      setLoading(true);
      await updateDoc(doc(db, 'testimonials', id), {
        ...updatedData,
        updatedAt: Timestamp.now()
      });
      setEditingTestimonial(null);
      await fetchTestimonials();
    } catch (error) {
      console.error('Error updating testimonial:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTestimonial = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      try {
        setLoading(true);
        await deleteDoc(doc(db, 'testimonials', id));
        await fetchTestimonials();
        await fetchStats();
      } catch (error) {
        console.error('Error deleting testimonial:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleAddCommunityLink = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'communityLinks'), {
        ...newCommunityLink,
        createdAt: Timestamp.now()
      });
      setNewCommunityLink({ platform: '', url: '' });
      fetchCommunityLinks();
    } catch (error) {
      console.error('Error adding community link:', error);
    }
  };

  const handleUpdateCommunityLink = async (id: string, updatedData: Partial<CommunityLink>) => {
    try {
      setLoading(true);
      await updateDoc(doc(db, 'communityLinks', id), {
        ...updatedData,
        updatedAt: Timestamp.now()
      });
      setEditingCommunityLink(null);
      await fetchCommunityLinks();
    } catch (error) {
      console.error('Error updating community link:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCommunityLink = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this community link?')) {
      try {
        setLoading(true);
        await deleteDoc(doc(db, 'communityLinks', id));
        await fetchCommunityLinks();
      } catch (error) {
        console.error('Error deleting community link:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleImageUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedImage) return;

    try {
      const storageRef = ref(storage, `eventImages/${selectedImage.name}`);
      await uploadBytes(storageRef, selectedImage);
      const downloadURL = await getDownloadURL(storageRef);
      
      await addDoc(collection(db, 'eventImages'), {
        url: downloadURL,
        name: selectedImage.name,
        uploadedAt: new Date().toISOString()
      });

      setSelectedImage(null);
      setImagePreview('');
      fetchStats();
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddGalleryImage = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await addDoc(collection(db, 'galleryImages'), {
        ...newGalleryImage,
        uploadedAt: Timestamp.now()
      });
      setNewGalleryImage({
        url: '',
        section: '',
        eventName: '',
        description: ''
      });
      await fetchGalleryImages();
      await fetchStats();
    } catch (error) {
      console.error('Error adding gallery image:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateGalleryImage = async (id: string, updatedData: Partial<GalleryImage>) => {
    try {
      setLoading(true);
      await updateDoc(doc(db, 'galleryImages', id), {
        ...updatedData,
        updatedAt: Timestamp.now()
      });
      setEditingGalleryImage(null);
      await fetchGalleryImages();
    } catch (error) {
      console.error('Error updating gallery image:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteGalleryImage = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      try {
        setLoading(true);
        await deleteDoc(doc(db, 'galleryImages', id));
        await fetchGalleryImages();
        await fetchStats();
      } catch (error) {
        console.error('Error deleting gallery image:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  // Add handler for bulk upload
  const handleBulkUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const urls = bulkUploadUrls.split('\n').filter(url => url.trim());
      const images = urls.map(url => ({
        url: url.trim(),
        section: bulkUploadSection,
        eventName: bulkUploadEventName,
        description: bulkUploadDescription,
        uploadedAt: Timestamp.now()
      }));

      // Add all images to Firestore
      const batch = writeBatch(db);
      images.forEach(image => {
        const docRef = doc(collection(db, 'galleryImages'));
        batch.set(docRef, image);
      });
      await batch.commit();

      // Reset form
      setBulkUploadUrls('');
      setBulkUploadSection('');
      setBulkUploadEventName('');
      setBulkUploadDescription('');
      
      await fetchGalleryImages();
      await fetchStats();
    } catch (error) {
      console.error('Error in bulk upload:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateMessageStatus = async (messageId: string, status: 'new' | 'read' | 'replied') => {
    try {
      setLoading(true);
      await updateDoc(doc(db, 'contactMessages', messageId), {
        status,
        updatedAt: Timestamp.now()
      });
      await fetchMessages();
    } catch (error) {
      console.error('Error updating message status:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        setLoading(true);
        await deleteDoc(doc(db, 'contactMessages', id));
        await fetchMessages();
        await fetchStats();
      } catch (error) {
        console.error('Error deleting message:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await addDoc(collection(db, 'events'), {
        ...newEvent,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      });
      setNewEvent({
        title: '',
        date: '',
        time: '',
        location: '',
        description: '',
        imageUrl: '',
        registrationLink: ''
      });
      await fetchEvents();
      await fetchStats();
    } catch (error) {
      console.error('Error adding event:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateEvent = async (id: string, updatedData: Partial<Event>) => {
    try {
      setLoading(true);
      await updateDoc(doc(db, 'events', id), {
        ...updatedData,
        updatedAt: Timestamp.now()
      });
      setEditingEvent(null);
      await fetchEvents();
    } catch (error) {
      console.error('Error updating event:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEvent = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        setLoading(true);
        await deleteDoc(doc(db, 'events', id));
        await fetchEvents();
        await fetchStats();
      } catch (error) {
        console.error('Error deleting event:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleReviewStatus = async (reviewId: string, status: 'approved' | 'rejected') => {
    try {
      setLoading(true);
      await updateDoc(doc(db, 'reviews', reviewId), {
        status,
        updatedAt: Timestamp.now()
      });
      await fetchReviews();
    } catch (error) {
      console.error('Error updating review status:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderWebinars = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Manage Webinars</h2>
        <button onClick={() => setActiveSection('dashboard')} className="text-gray-600 hover:text-gray-800">
          <X size={24} />
        </button>
      </div>
      <form onSubmit={handleAddWebinar} className="space-y-6">
        {/* Title and Image URL */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              value={newWebinar.title}
              onChange={(e) => setNewWebinar({ ...newWebinar, title: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter webinar title"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Image URL</label>
            <input
              type="url"
              value={newWebinar.imageUrl}
              onChange={(e) => setNewWebinar({ ...newWebinar, imageUrl: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="https://example.com/image.jpg"
              required
            />
          </div>
        </div>

        {/* Date, Time, and Duration */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              value={newWebinar.date}
              onChange={(e) => setNewWebinar({ ...newWebinar, date: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Time</label>
            <input
              type="time"
              value={newWebinar.time}
              onChange={(e) => setNewWebinar({ ...newWebinar, time: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Duration</label>
            <input
              type="text"
              value={newWebinar.duration}
              onChange={(e) => setNewWebinar({ ...newWebinar, duration: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="e.g., 2 hours"
              required
            />
          </div>
        </div>

        {/* Learning Outcomes */}
        <div>
          <label className="block text-sm font-medium text-gray-700">What We'll Learn</label>
          <textarea
            value={newWebinar.learningOutcomes}
            onChange={(e) => setNewWebinar({ ...newWebinar, learningOutcomes: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            rows={3}
            placeholder="Enter key learning outcomes"
            required
          />
        </div>

        {/* Google Form Link */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Google Form Link</label>
          <input
            type="url"
            value={newWebinar.formLink}
            onChange={(e) => setNewWebinar({ ...newWebinar, formLink: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="https://forms.google.com/..."
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={newWebinar.description}
            onChange={(e) => setNewWebinar({ ...newWebinar, description: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            rows={4}
            placeholder="Enter detailed description"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Adding...' : 'Add Webinar'}
        </button>
      </form>

      {/* Webinar List */}
      <div className="border-t pt-6 mt-6">
        <h3 className="font-medium text-gray-700 mb-4">Recent Webinars</h3>
        {loading ? (
          <div className="text-center py-4">Loading...</div>
        ) : webinars.length > 0 ? (
          <div className="space-y-4">
            {webinars.map((webinar) => (
              <div key={webinar.id} className="bg-gray-50 rounded-lg p-4">
                {editingWebinar === webinar.id ? (
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    handleUpdateWebinar(webinar.id, webinar);
                  }} className="space-y-4">
                    {/* Similar form fields as above, but with webinar data */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        value={webinar.title}
                        onChange={(e) => {
                          const updatedWebinars = webinars.map(w =>
                            w.id === webinar.id ? { ...w, title: e.target.value } : w
                          );
                          setWebinars(updatedWebinars);
                        }}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Title"
                      />
                      <input
                        type="url"
                        value={webinar.imageUrl}
                        onChange={(e) => {
                          const updatedWebinars = webinars.map(w =>
                            w.id === webinar.id ? { ...w, imageUrl: e.target.value } : w
                          );
                          setWebinars(updatedWebinars);
                        }}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Image URL"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <input
                        type="date"
                        value={webinar.date}
                        onChange={(e) => {
                          const updatedWebinars = webinars.map(w =>
                            w.id === webinar.id ? { ...w, date: e.target.value } : w
                          );
                          setWebinars(updatedWebinars);
                        }}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                      <input
                        type="time"
                        value={webinar.time}
                        onChange={(e) => {
                          const updatedWebinars = webinars.map(w =>
                            w.id === webinar.id ? { ...w, time: e.target.value } : w
                          );
                          setWebinars(updatedWebinars);
                        }}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                      <input
                        type="text"
                        value={webinar.duration}
                        onChange={(e) => {
                          const updatedWebinars = webinars.map(w =>
                            w.id === webinar.id ? { ...w, duration: e.target.value } : w
                          );
                          setWebinars(updatedWebinars);
                        }}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Duration"
                      />
                    </div>
                    <textarea
                      value={webinar.learningOutcomes}
                      onChange={(e) => {
                        const updatedWebinars = webinars.map(w =>
                          w.id === webinar.id ? { ...w, learningOutcomes: e.target.value } : w
                        );
                        setWebinars(updatedWebinars);
                      }}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      rows={3}
                      placeholder="Learning Outcomes"
                    />
                    <input
                      type="url"
                      value={webinar.formLink}
                      onChange={(e) => {
                        const updatedWebinars = webinars.map(w =>
                          w.id === webinar.id ? { ...w, formLink: e.target.value } : w
                        );
                        setWebinars(updatedWebinars);
                      }}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Google Form Link"
                    />
                    <textarea
                      value={webinar.description}
                      onChange={(e) => {
                        const updatedWebinars = webinars.map(w =>
                          w.id === webinar.id ? { ...w, description: e.target.value } : w
                        );
                        setWebinars(updatedWebinars);
                      }}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      rows={4}
                      placeholder="Description"
                    />
                    <div className="flex justify-end space-x-2">
                      <button
                        type="button"
                        onClick={() => setEditingWebinar(null)}
                        className="px-3 py-1 text-gray-600 hover:text-gray-800"
                      >
                        <XCircle size={20} />
                      </button>
                      <button
                        type="submit"
                        className="px-3 py-1 text-blue-600 hover:text-blue-800"
                      >
                        <Save size={20} />
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        {webinar.imageUrl && (
                          <img
                            src={webinar.imageUrl}
                            alt={webinar.title}
                            className="w-16 h-16 object-cover rounded"
                          />
                        )}
                        <div>
                          <h4 className="font-medium text-gray-900">{webinar.title}</h4>
                          <p className="text-sm text-gray-500">
                            {new Date(webinar.date).toLocaleDateString()} at {webinar.time}
                          </p>
                          <p className="text-sm text-gray-500">Duration: {webinar.duration}</p>
                        </div>
                      </div>
                      <div className="text-sm text-gray-600">
                        <p className="font-medium">What We'll Learn:</p>
                        <p>{webinar.learningOutcomes}</p>
                      </div>
                      <div className="text-sm">
                        <a
                          href={webinar.formLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800"
                        >
                          Google Form Link
                        </a>
                      </div>
                      <p className="text-gray-600">{webinar.description}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setEditingWebinar(webinar.id)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Edit2 size={20} />
                      </button>
                      <button
                        onClick={() => handleDeleteWebinar(webinar.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-4">No webinars found</p>
        )}
      </div>
    </div>
  );

  // Add renderGallery function
  const renderGallery = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Manage Gallery</h2>
        <button onClick={() => setActiveSection('dashboard')} className="text-gray-600 hover:text-gray-800">
          <X size={24} />
        </button>
      </div>

      {/* Tabs for different upload methods */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setUploadType('single')}
              className={`${
                uploadType === 'single'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Single Image Upload
            </button>
            <button
              onClick={() => setUploadType('bulk')}
              className={`${
                uploadType === 'bulk'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Bulk Image Upload
            </button>
          </nav>
        </div>
      </div>

      {/* Single Image Upload Form */}
      {uploadType === 'single' && (
        <form onSubmit={handleAddGalleryImage} className="space-y-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Image URL</label>
              <input
                type="url"
                value={newGalleryImage.url}
                onChange={(e) => setNewGalleryImage({ ...newGalleryImage, url: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                placeholder="https://example.com/image.jpg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Section</label>
              <select
                value={newGalleryImage.section}
                onChange={(e) => setNewGalleryImage({ ...newGalleryImage, section: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                required
              >
                <option value="">Select a section</option>
                <option value="occasions">Occasions</option>
                <option value="events">Events</option>
                <option value="workshops">Workshops</option>
                <option value="seminars">Seminars</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Event Name</label>
            <input
              type="text"
              value={newGalleryImage.eventName}
              onChange={(e) => setNewGalleryImage({ ...newGalleryImage, eventName: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              placeholder="Enter event name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={newGalleryImage.description}
              onChange={(e) => setNewGalleryImage({ ...newGalleryImage, description: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              rows={3}
              placeholder="Enter image description"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Adding...' : 'Add Image'}
          </button>
        </form>
      )}

      {/* Bulk Upload Form */}
      {uploadType === 'bulk' && (
        <form onSubmit={handleBulkUpload} className="space-y-6 mb-8">
          <h3 className="text-lg font-medium text-gray-900">Bulk Image Upload</h3>
          <p className="text-sm text-gray-500">
            Enter multiple image URLs (one per line) to upload them all at once with the same section, event name, and description.
          </p>

          <div>
            <label className="block text-sm font-medium text-gray-700">Image URLs (one per line)</label>
            <textarea
              value={bulkUploadUrls}
              onChange={(e) => setBulkUploadUrls(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              rows={5}
              placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg&#10;https://example.com/image3.jpg"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Section</label>
              <select
                value={bulkUploadSection}
                onChange={(e) => setBulkUploadSection(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                required
              >
                <option value="">Select a section</option>
                <option value="occasions">Occasions</option>
                <option value="events">Events</option>
                <option value="workshops">Workshops</option>
                <option value="seminars">Seminars</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Event Name</label>
              <input
                type="text"
                value={bulkUploadEventName}
                onChange={(e) => setBulkUploadEventName(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                placeholder="Enter event name"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={bulkUploadDescription}
              onChange={(e) => setBulkUploadDescription(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              rows={3}
              placeholder="Enter description for all images"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Uploading...' : 'Upload All Images'}
          </button>
        </form>
      )}

      {/* Gallery Images List */}
      <div className="border-t pt-6">
        <h3 className="font-medium text-gray-700 mb-4">Gallery Images</h3>
        {loading ? (
          <div className="text-center py-4">Loading...</div>
        ) : galleryImages.length > 0 ? (
          <div className="space-y-6">
            {/* Group images by section */}
            {Array.from(new Set(galleryImages.map(img => img.section))).map(section => (
              <div key={section} className="space-y-4">
                <h4 className="text-lg font-medium text-gray-800 capitalize">{section}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {galleryImages
                    .filter(img => img.section === section)
                    .map((image) => (
                      <div key={image.id} className="bg-gray-50 rounded-lg p-4">
                        {editingGalleryImage === image.id ? (
                          <form onSubmit={(e) => {
                            e.preventDefault();
                            handleUpdateGalleryImage(image.id, image);
                          }} className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700">Image URL</label>
                              <input
                                type="url"
                                value={image.url}
                                onChange={(e) => {
                                  const updatedImages = galleryImages.map(img =>
                                    img.id === image.id ? { ...img, url: e.target.value } : img
                                  );
                                  setGalleryImages(updatedImages);
                                }}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700">Section</label>
                              <select
                                value={image.section}
                                onChange={(e) => {
                                  const updatedImages = galleryImages.map(img =>
                                    img.id === image.id ? { ...img, section: e.target.value } : img
                                  );
                                  setGalleryImages(updatedImages);
                                }}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                                required
                              >
                                <option value="occasions">Occasions</option>
                                <option value="events">Events</option>
                                <option value="workshops">Workshops</option>
                                <option value="seminars">Seminars</option>
                                <option value="other">Other</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700">Event Name</label>
                              <input
                                type="text"
                                value={image.eventName}
                                onChange={(e) => {
                                  const updatedImages = galleryImages.map(img =>
                                    img.id === image.id ? { ...img, eventName: e.target.value } : img
                                  );
                                  setGalleryImages(updatedImages);
                                }}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700">Description</label>
                              <textarea
                                value={image.description}
                                onChange={(e) => {
                                  const updatedImages = galleryImages.map(img =>
                                    img.id === image.id ? { ...img, description: e.target.value } : img
                                  );
                                  setGalleryImages(updatedImages);
                                }}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                                rows={3}
                                required
                              />
                            </div>
                            <div className="flex justify-end space-x-2">
                              <button
                                type="button"
                                onClick={() => setEditingGalleryImage(null)}
                                className="px-3 py-1 text-gray-600 hover:text-gray-800"
                              >
                                <XCircle size={20} />
                              </button>
                              <button
                                type="submit"
                                className="px-3 py-1 text-green-600 hover:text-green-800"
                              >
                                <Save size={20} />
                              </button>
                            </div>
                          </form>
                        ) : (
                          <div className="space-y-3">
                            <img
                              src={image.url}
                              alt={image.eventName}
                              className="w-full h-48 object-cover rounded-lg"
                            />
                            <div>
                              <h5 className="font-medium text-gray-900">{image.eventName}</h5>
                              <p className="text-sm text-gray-500 capitalize">{image.section}</p>
                              <p className="text-sm text-gray-600 mt-1">{image.description}</p>
                            </div>
                            <div className="flex justify-end space-x-2">
                              <button
                                onClick={() => setEditingGalleryImage(image.id)}
                                className="text-green-600 hover:text-green-800"
                              >
                                <Edit2 size={20} />
                              </button>
                              <button
                                onClick={() => handleDeleteGalleryImage(image.id)}
                                className="text-red-600 hover:text-red-800"
                              >
                                <Trash2 size={20} />
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-4">No images found</p>
        )}
      </div>
    </div>
  );

  // Update the testimonials section in the return statement
  const renderTestimonials = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Manage Testimonials</h2>
        <button onClick={() => setActiveSection('dashboard')} className="text-gray-600 hover:text-gray-800">
          <X size={24} />
        </button>
      </div>

      {/* Add Testimonial Form */}
      <form onSubmit={handleAddTestimonial} className="space-y-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={newTestimonial.name}
              onChange={(e) => setNewTestimonial({ ...newTestimonial, name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
              placeholder="Enter name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <input
              type="text"
              value={newTestimonial.role}
              onChange={(e) => setNewTestimonial({ ...newTestimonial, role: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
              placeholder="Enter role/position"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Image URL</label>
          <input
            type="url"
            value={newTestimonial.imageUrl}
            onChange={(e) => setNewTestimonial({ ...newTestimonial, imageUrl: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
            placeholder="https://example.com/image.jpg"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Content</label>
          <textarea
            value={newTestimonial.content}
            onChange={(e) => setNewTestimonial({ ...newTestimonial, content: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
            rows={3}
            placeholder="Enter testimonial content"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Rating</label>
          <div className="flex items-center space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setNewTestimonial({ ...newTestimonial, rating: star })}
                className={`text-2xl ${
                  star <= newTestimonial.rating ? 'text-yellow-400' : 'text-gray-300'
                }`}
              >
                ★
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Adding...' : 'Add Testimonial'}
        </button>
      </form>

      {/* Testimonials List */}
      <div className="border-t pt-6">
        <h3 className="font-medium text-gray-700 mb-4">Recent Testimonials</h3>
        {loading ? (
          <div className="text-center py-4">Loading...</div>
        ) : testimonials.length > 0 ? (
          <div className="space-y-4">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-gray-50 rounded-lg p-4">
                {editingTestimonial === testimonial.id ? (
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    handleUpdateTestimonial(testimonial.id, testimonial);
                  }} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                          type="text"
                          value={testimonial.name}
                          onChange={(e) => {
                            const updatedTestimonials = testimonials.map(t =>
                              t.id === testimonial.id ? { ...t, name: e.target.value } : t
                            );
                            setTestimonials(updatedTestimonials);
                          }}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Role</label>
                        <input
                          type="text"
                          value={testimonial.role}
                          onChange={(e) => {
                            const updatedTestimonials = testimonials.map(t =>
                              t.id === testimonial.id ? { ...t, role: e.target.value } : t
                            );
                            setTestimonials(updatedTestimonials);
                          }}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Image URL</label>
                      <input
                        type="url"
                        value={testimonial.imageUrl}
                        onChange={(e) => {
                          const updatedTestimonials = testimonials.map(t =>
                            t.id === testimonial.id ? { ...t, imageUrl: e.target.value } : t
                          );
                          setTestimonials(updatedTestimonials);
                        }}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Content</label>
                      <textarea
                        value={testimonial.content}
                        onChange={(e) => {
                          const updatedTestimonials = testimonials.map(t =>
                            t.id === testimonial.id ? { ...t, content: e.target.value } : t
                          );
                          setTestimonials(updatedTestimonials);
                        }}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                        rows={3}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Rating</label>
                      <div className="flex items-center space-x-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => {
                              const updatedTestimonials = testimonials.map(t =>
                                t.id === testimonial.id ? { ...t, rating: star } : t
                              );
                              setTestimonials(updatedTestimonials);
                            }}
                            className={`text-2xl ${
                              star <= testimonial.rating ? 'text-yellow-400' : 'text-gray-300'
                            }`}
                          >
                            ★
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <button
                        type="button"
                        onClick={() => setEditingTestimonial(null)}
                        className="px-3 py-1 text-gray-600 hover:text-gray-800"
                      >
                        <XCircle size={20} />
                      </button>
                      <button
                        type="submit"
                        className="px-3 py-1 text-yellow-600 hover:text-yellow-800"
                      >
                        <Save size={20} />
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="flex space-x-4">
                    <div className="flex-shrink-0">
                      <img
                        src={testimonial.imageUrl}
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-gray-900">{testimonial.name}</h4>
                          <p className="text-sm text-gray-500">{testimonial.role}</p>
                          <div className="flex items-center mt-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <span
                                key={star}
                                className={`text-lg ${
                                  star <= testimonial.rating ? 'text-yellow-400' : 'text-gray-300'
                                }`}
                              >
                                ★
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setEditingTestimonial(testimonial.id)}
                            className="text-yellow-600 hover:text-yellow-800"
                          >
                            <Edit2 size={20} />
                          </button>
                          <button
                            onClick={() => handleDeleteTestimonial(testimonial.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </div>
                      <p className="text-gray-600 mt-2">{testimonial.content}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-4">No testimonials found</p>
        )}
      </div>
    </div>
  );

  // Update the community section in the return statement
  const renderCommunity = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Manage Community</h2>
        <button onClick={() => setActiveSection('dashboard')} className="text-gray-600 hover:text-gray-800">
          <X size={24} />
        </button>
      </div>
      <form onSubmit={handleAddCommunityLink} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Platform</label>
          <input
            type="text"
            value={newCommunityLink.platform}
            onChange={(e) => setNewCommunityLink({ ...newCommunityLink, platform: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            placeholder="e.g., Facebook, Instagram, LinkedIn"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">URL</label>
          <input
            type="url"
            value={newCommunityLink.url}
            onChange={(e) => setNewCommunityLink({ ...newCommunityLink, url: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            placeholder="https://..."
            required
          />
        </div>
        <button type="submit" className="w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
          Add Community Link
        </button>
      </form>
      <div className="border-t pt-4 mt-4">
        <h3 className="font-medium text-gray-700 mb-2">Current Links</h3>
        {communityLinks.length > 0 ? (
          <div className="space-y-2">
            {communityLinks.map((link) => (
              <div key={link.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                {editingCommunityLink === link.id ? (
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    handleUpdateCommunityLink(link.id, link);
                  }} className="flex-grow space-y-2">
                    <input
                      type="text"
                      value={link.platform}
                      onChange={(e) => {
                        const updatedLinks = communityLinks.map(l =>
                          l.id === link.id ? { ...l, platform: e.target.value } : l
                        );
                        setCommunityLinks(updatedLinks);
                      }}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                      placeholder="Platform"
                      required
                    />
                    <input
                      type="url"
                      value={link.url}
                      onChange={(e) => {
                        const updatedLinks = communityLinks.map(l =>
                          l.id === link.id ? { ...l, url: e.target.value } : l
                        );
                        setCommunityLinks(updatedLinks);
                      }}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                      placeholder="URL"
                      required
                    />
                    <div className="flex justify-end space-x-2">
                      <button
                        type="button"
                        onClick={() => setEditingCommunityLink(null)}
                        className="px-3 py-1 text-gray-600 hover:text-gray-800"
                      >
                        <XCircle size={20} />
                      </button>
                      <button
                        type="submit"
                        className="px-3 py-1 text-green-600 hover:text-green-800"
                      >
                        <Save size={20} />
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    <div>
                      <p className="font-medium">{link.platform}</p>
                      <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-500 hover:underline">
                        {link.url}
                      </a>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setEditingCommunityLink(link.id)}
                        className="text-green-600 hover:text-green-800"
                      >
                        <Edit2 size={20} />
                      </button>
                      <button
                        onClick={() => handleDeleteCommunityLink(link.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No links found</p>
        )}
      </div>
    </div>
  );

  // Update the messages section in the return statement
  const renderMessages = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Manage Messages</h2>
        <button onClick={() => setActiveSection('dashboard')} className="text-gray-600 hover:text-gray-800">
          <X size={24} />
        </button>
      </div>

      {/* Messages List */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-4">Loading...</div>
        ) : messages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`bg-gray-50 rounded-lg p-4 cursor-pointer transition-all duration-200 hover:shadow-md ${
                  message.status === 'new' ? 'border-l-4 border-blue-500' : ''
                }`}
                onClick={() => {
                  setSelectedMessage(message);
                  if (message.status === 'new') {
                    updateMessageStatus(message.id, 'read');
                  }
                }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-gray-900">{message.name}</h4>
                    <p className="text-sm text-gray-500">{message.email}</p>
                    <p className="text-sm font-medium text-gray-700 mt-1">{message.subject}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      message.status === 'new' ? 'bg-blue-100 text-blue-800' :
                      message.status === 'read' ? 'bg-gray-100 text-gray-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {message.status.charAt(0).toUpperCase() + message.status.slice(1)}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteMessage(message.id);
                      }}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
                <p className="text-gray-600 mt-2 line-clamp-2">{message.message}</p>
                <p className="text-xs text-gray-400 mt-2">
                  {message.createdAt?.toDate().toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-4">No messages found</p>
        )}
      </div>

      {/* Message Detail Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-medium text-gray-900">Message Details</h3>
              <button
                onClick={() => setSelectedMessage(null)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X size={24} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">From</label>
                <p className="mt-1 text-gray-900">{selectedMessage.name}</p>
                <p className="text-sm text-gray-500">{selectedMessage.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Subject</label>
                <p className="mt-1 text-gray-900">{selectedMessage.subject}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Message</label>
                <p className="mt-1 text-gray-900 whitespace-pre-wrap">{selectedMessage.message}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Received</label>
                <p className="mt-1 text-gray-500">
                  {selectedMessage.createdAt?.toDate().toLocaleString()}
                </p>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => {
                    updateMessageStatus(selectedMessage.id, 'replied');
                    setSelectedMessage(null);
                  }}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  Mark as Replied
                </button>
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // Add renderEvents function
  const renderEvents = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Manage Events</h2>
        <button onClick={() => setActiveSection('dashboard')} className="text-gray-600 hover:text-gray-800">
          <X size={24} />
        </button>
      </div>

      {/* Add Event Form */}
      <form onSubmit={handleAddEvent} className="space-y-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              value={newEvent.title}
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Enter event title"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Image URL</label>
            <input
              type="url"
              value={newEvent.imageUrl}
              onChange={(e) => setNewEvent({ ...newEvent, imageUrl: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="https://example.com/image.jpg"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              value={newEvent.date}
              onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Time</label>
            <input
              type="time"
              value={newEvent.time}
              onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <input
              type="text"
              value={newEvent.location}
              onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Enter event location"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={newEvent.description}
            onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            rows={4}
            placeholder="Enter event description"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Registration Link</label>
          <input
            type="url"
            value={newEvent.registrationLink}
            onChange={(e) => setNewEvent({ ...newEvent, registrationLink: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="https://..."
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Adding...' : 'Add Event'}
        </button>
      </form>

      {/* Events List */}
      <div className="border-t pt-6">
        <h3 className="font-medium text-gray-700 mb-4">Recent Events</h3>
        {loading ? (
          <div className="text-center py-4">Loading...</div>
        ) : events.length > 0 ? (
          <div className="space-y-4">
            {events.map((event) => (
              <div key={event.id} className="bg-gray-50 rounded-lg p-4">
                {editingEvent === event.id ? (
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    handleUpdateEvent(event.id, event);
                  }} className="space-y-4">
                    {/* Similar form fields as above, but with event data */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        value={event.title}
                        onChange={(e) => {
                          const updatedEvents = events.map(ev =>
                            ev.id === event.id ? { ...ev, title: e.target.value } : ev
                          );
                          setEvents(updatedEvents);
                        }}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        placeholder="Title"
                      />
                      <input
                        type="url"
                        value={event.imageUrl}
                        onChange={(e) => {
                          const updatedEvents = events.map(ev =>
                            ev.id === event.id ? { ...ev, imageUrl: e.target.value } : ev
                          );
                          setEvents(updatedEvents);
                        }}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        placeholder="Image URL"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <input
                        type="date"
                        value={event.date}
                        onChange={(e) => {
                          const updatedEvents = events.map(ev =>
                            ev.id === event.id ? { ...ev, date: e.target.value } : ev
                          );
                          setEvents(updatedEvents);
                        }}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                      <input
                        type="time"
                        value={event.time}
                        onChange={(e) => {
                          const updatedEvents = events.map(ev =>
                            ev.id === event.id ? { ...ev, time: e.target.value } : ev
                          );
                          setEvents(updatedEvents);
                        }}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                      <input
                        type="text"
                        value={event.location}
                        onChange={(e) => {
                          const updatedEvents = events.map(ev =>
                            ev.id === event.id ? { ...ev, location: e.target.value } : ev
                          );
                          setEvents(updatedEvents);
                        }}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        placeholder="Location"
                      />
                    </div>
                    <textarea
                      value={event.description}
                      onChange={(e) => {
                        const updatedEvents = events.map(ev =>
                          ev.id === event.id ? { ...ev, description: e.target.value } : ev
                        );
                        setEvents(updatedEvents);
                      }}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      rows={4}
                      placeholder="Description"
                    />
                    <input
                      type="url"
                      value={event.registrationLink}
                      onChange={(e) => {
                        const updatedEvents = events.map(ev =>
                          ev.id === event.id ? { ...ev, registrationLink: e.target.value } : ev
                        );
                        setEvents(updatedEvents);
                      }}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      placeholder="Registration Link"
                    />
                    <div className="flex justify-end space-x-2">
                      <button
                        type="button"
                        onClick={() => setEditingEvent(null)}
                        className="px-3 py-1 text-gray-600 hover:text-gray-800"
                      >
                        <XCircle size={20} />
                      </button>
                      <button
                        type="submit"
                        className="px-3 py-1 text-indigo-600 hover:text-indigo-800"
                      >
                        <Save size={20} />
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        {event.imageUrl && (
                          <img
                            src={event.imageUrl}
                            alt={event.title}
                            className="w-16 h-16 object-cover rounded"
                          />
                        )}
                        <div>
                          <h4 className="font-medium text-gray-900">{event.title}</h4>
                          <p className="text-sm text-gray-500">
                            {new Date(event.date).toLocaleDateString()} at {event.time}
                          </p>
                          <p className="text-sm text-gray-500">Location: {event.location}</p>
                        </div>
                      </div>
                      <p className="text-gray-600">{event.description}</p>
                      <div className="text-sm">
                        <a
                          href={event.registrationLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-600 hover:text-indigo-800"
                        >
                          Registration Link
                        </a>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setEditingEvent(event.id)}
                        className="text-indigo-600 hover:text-indigo-800"
                      >
                        <Edit2 size={20} />
                      </button>
                      <button
                        onClick={() => handleDeleteEvent(event.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-4">No events found</p>
        )}
      </div>
    </div>
  );

  const renderReviews = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Manage Reviews</h2>
        <button onClick={() => setActiveSection('dashboard')} className="text-gray-600 hover:text-gray-800">
          <X size={24} />
        </button>
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-4">Loading...</div>
        ) : reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-gray-900">{review.title}</h3>
                  <p className="text-sm text-gray-500">
                    By {review.name} ({review.email})
                  </p>
                  <p className="text-sm text-gray-500">
                    Program: {review.programType.charAt(0).toUpperCase() + review.programType.slice(1)}
                  </p>
                  <div className="flex items-center mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded text-sm ${
                    review.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : review.status === 'approved'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {review.status.charAt(0).toUpperCase() + review.status.slice(1)}
                  </span>
                </div>
              </div>

              <p className="text-gray-700">{review.content}</p>

              {review.status === 'pending' && (
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => handleReviewStatus(review.id, 'approved')}
                    className="px-3 py-1 text-green-600 hover:text-green-800"
                  >
                    <Check size={20} />
                  </button>
                  <button
                    onClick={() => handleReviewStatus(review.id, 'rejected')}
                    className="px-3 py-1 text-red-600 hover:text-red-800"
                  >
                    <X size={20} />
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center py-4">No reviews found</p>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
        
        {/* Dashboard Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
          {/* Events Card */}
          <div 
            className={`bg-white rounded-lg shadow-md p-4 cursor-pointer transition-all duration-300 hover:shadow-lg ${
              activeSection === 'events' ? 'ring-2 ring-indigo-500' : ''
            }`}
            onClick={() => setActiveSection(activeSection === 'events' ? 'dashboard' : 'events')}
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">Events</h2>
                <p className="text-2xl font-bold text-indigo-600 mt-1">{stats.events}</p>
              </div>
              <div className="bg-indigo-100 p-2 rounded-full">
                <Calendar className="w-5 h-5 text-indigo-600" />
              </div>
            </div>
          </div>

          {/* Webinars Card */}
          <div 
            className={`bg-white rounded-lg shadow-md p-4 cursor-pointer transition-all duration-300 hover:shadow-lg ${
              activeSection === 'webinars' ? 'ring-2 ring-blue-500' : ''
            }`}
            onClick={() => setActiveSection(activeSection === 'webinars' ? 'dashboard' : 'webinars')}
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">Webinars</h2>
                <p className="text-2xl font-bold text-blue-600 mt-1">{stats.webinars}</p>
              </div>
              <div className="bg-blue-100 p-2 rounded-full">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Gallery Card */}
          <div 
            className={`bg-white rounded-lg shadow-md p-4 cursor-pointer transition-all duration-300 hover:shadow-lg ${
              activeSection === 'gallery' ? 'ring-2 ring-green-500' : ''
            }`}
            onClick={() => setActiveSection(activeSection === 'gallery' ? 'dashboard' : 'gallery')}
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">Gallery</h2>
                <p className="text-2xl font-bold text-green-600 mt-1">{galleryImages.length}</p>
              </div>
              <div className="bg-green-100 p-2 rounded-full">
                <Image className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </div>

          {/* Testimonials Card */}
          <div 
            className={`bg-white rounded-lg shadow-md p-4 cursor-pointer transition-all duration-300 hover:shadow-lg ${
              activeSection === 'testimonials' ? 'ring-2 ring-yellow-500' : ''
            }`}
            onClick={() => setActiveSection(activeSection === 'testimonials' ? 'dashboard' : 'testimonials')}
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">Testimonials</h2>
                <p className="text-2xl font-bold text-yellow-600 mt-1">{testimonials.length}</p>
              </div>
              <div className="bg-yellow-100 p-2 rounded-full">
                <MessageSquare className="w-5 h-5 text-yellow-600" />
              </div>
            </div>
          </div>

          {/* Community Card */}
          <div 
            className={`bg-white rounded-lg shadow-md p-4 cursor-pointer transition-all duration-300 hover:shadow-lg ${
              activeSection === 'community' ? 'ring-2 ring-purple-500' : ''
            }`}
            onClick={() => setActiveSection(activeSection === 'community' ? 'dashboard' : 'community')}
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">Community</h2>
                <p className="text-2xl font-bold text-purple-600 mt-1">{communityLinks.length}</p>
              </div>
              <div className="bg-purple-100 p-2 rounded-full">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </div>

          {/* Messages Card */}
          <div 
            className={`bg-white rounded-lg shadow-md p-4 cursor-pointer transition-all duration-300 hover:shadow-lg ${
              activeSection === 'messages' ? 'ring-2 ring-red-500' : ''
            }`}
            onClick={() => setActiveSection(activeSection === 'messages' ? 'dashboard' : 'messages')}
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">Messages</h2>
                <p className="text-2xl font-bold text-red-600 mt-1">{messages.length}</p>
              </div>
              <div className="bg-red-100 p-2 rounded-full">
                <MessageSquare className="w-5 h-5 text-red-600" />
              </div>
            </div>
          </div>

          {/* Reviews Card */}
          <div 
            className={`bg-white rounded-lg shadow-md p-4 cursor-pointer transition-all duration-300 hover:shadow-lg ${
              activeSection === 'reviews' ? 'ring-2 ring-purple-500' : ''
            }`}
            onClick={() => setActiveSection(activeSection === 'reviews' ? 'dashboard' : 'reviews')}
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">Reviews</h2>
                <p className="text-2xl font-bold text-purple-600 mt-1">{reviews.length}</p>
              </div>
              <div className="bg-purple-100 p-2 rounded-full">
                <Star className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Management Sections */}
        <div className="space-y-6">
          {/* Events Management */}
          {activeSection === 'events' && renderEvents()}

          {/* Webinars Management */}
          {activeSection === 'webinars' && renderWebinars()}

          {/* Gallery Management */}
          {activeSection === 'gallery' && renderGallery()}

          {/* Testimonials Management */}
          {activeSection === 'testimonials' && renderTestimonials()}

          {/* Community Management */}
          {activeSection === 'community' && renderCommunity()}

          {/* Messages Management */}
          {activeSection === 'messages' && renderMessages()}

          {/* Reviews Management */}
          {activeSection === 'reviews' && renderReviews()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 