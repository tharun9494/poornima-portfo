import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, query, limit } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { FileText, Image, MessageSquare, Users, Calendar } from 'lucide-react';

export default function Dashboard() {
  const [stats, setStats] = useState({
    webinars: 0,
    gallery: 0,
    testimonials: 0,
  });
  const [recentWebinar, setRecentWebinar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        // Fetch counts
        const webinarsSnapshot = await getDocs(collection(db, 'webinars'));
        const gallerySnapshot = await getDocs(collection(db, 'gallery'));
        const testimonialsSnapshot = await getDocs(collection(db, 'testimonials'));
        
        // Fetch most recent webinar
        const recentWebinarQuery = query(
          collection(db, 'webinars'),
          limit(1)
        );
        const recentWebinarSnapshot = await getDocs(recentWebinarQuery);
        
        if (!recentWebinarSnapshot.empty) {
          const webinarData = recentWebinarSnapshot.docs[0].data();
          setRecentWebinar({
            id: recentWebinarSnapshot.docs[0].id,
            ...webinarData,
            date: webinarData.date?.toDate ? webinarData.date.toDate() : new Date(),
          });
        }
        
        setStats({
          webinars: webinarsSnapshot.size,
          gallery: gallerySnapshot.size,
          testimonials: testimonialsSnapshot.size,
        });
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    }
    
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-start">
            <div className="p-3 rounded-full bg-primary-100 text-primary-600 mr-4">
              <FileText size={24} />
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium">Total Webinars</p>
              <p className="text-3xl font-bold">{stats.webinars}</p>
            </div>
          </div>
          <div className="mt-4">
            <Link to="/dashboard/webinars" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
              Manage Webinars &rarr;
            </Link>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-start">
            <div className="p-3 rounded-full bg-secondary-100 text-secondary-600 mr-4">
              <Image size={24} />
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium">Gallery Images</p>
              <p className="text-3xl font-bold">{stats.gallery}</p>
            </div>
          </div>
          <div className="mt-4">
            <Link to="/dashboard/gallery" className="text-sm text-secondary-600 hover:text-secondary-700 font-medium">
              Manage Gallery &rarr;
            </Link>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-start">
            <div className="p-3 rounded-full bg-accent-100 text-accent-600 mr-4">
              <MessageSquare size={24} />
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium">Testimonials</p>
              <p className="text-3xl font-bold">{stats.testimonials}</p>
            </div>
          </div>
          <div className="mt-4">
            <Link to="/dashboard/testimonials" className="text-sm text-accent-600 hover:text-accent-700 font-medium">
              Manage Testimonials &rarr;
            </Link>
          </div>
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6 mb-10">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Link to="/dashboard/webinars" className="p-4 bg-primary-50 rounded-lg hover:bg-primary-100 transition duration-200 flex flex-col items-center justify-center text-center">
            <FileText size={24} className="text-primary-600 mb-2" />
            <span className="font-medium">Add Webinar</span>
          </Link>
          
          <Link to="/dashboard/gallery" className="p-4 bg-secondary-50 rounded-lg hover:bg-secondary-100 transition duration-200 flex flex-col items-center justify-center text-center">
            <Image size={24} className="text-secondary-600 mb-2" />
            <span className="font-medium">Upload Image</span>
          </Link>
          
          <Link to="/dashboard/testimonials" className="p-4 bg-accent-50 rounded-lg hover:bg-accent-100 transition duration-200 flex flex-col items-center justify-center text-center">
            <MessageSquare size={24} className="text-accent-600 mb-2" />
            <span className="font-medium">Add Testimonial</span>
          </Link>
          
          <Link to="/dashboard/community" className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition duration-200 flex flex-col items-center justify-center text-center">
            <Users size={24} className="text-gray-600 mb-2" />
            <span className="font-medium">Update Links</span>
          </Link>
        </div>
      </div>
      
      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        
        {recentWebinar ? (
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-start">
              <div className="p-3 rounded-full bg-primary-100 text-primary-600 mr-4">
                <Calendar size={20} />
              </div>
              <div>
                <p className="font-medium">{recentWebinar.title}</p>
                <p className="text-sm text-gray-500">
                  {recentWebinar.date instanceof Date ? 
                    recentWebinar.date.toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    }) : 'Date unavailable'}
                </p>
                <p className="text-sm mt-1">{recentWebinar.description?.substring(0, 100)}...</p>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-gray-500">No recent activities found.</p>
        )}
      </div>
    </div>
  );
}