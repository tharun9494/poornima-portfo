import { Outlet, NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { LogOut, Home, FileText, Image, MessageSquare, Users } from 'lucide-react';

export default function AdminLayout() {
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      // Redirect is handled by ProtectedRoute
    } catch (error) {
      console.error('Failed to sign out', error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-primary-600">Admin Panel</h1>
        </div>
        <nav className="mt-6">
          <NavLink 
            to="/dashboard" 
            end
            className={({ isActive }) => 
              `flex items-center px-6 py-3 hover:bg-primary-50 ${isActive ? 'bg-primary-50 text-primary-600 border-r-4 border-primary-600' : 'text-gray-500'}`
            }
          >
            <Home size={20} className="mr-3" />
            <span>Dashboard</span>
          </NavLink>
          <NavLink 
            to="/dashboard/webinars" 
            className={({ isActive }) => 
              `flex items-center px-6 py-3 hover:bg-primary-50 ${isActive ? 'bg-primary-50 text-primary-600 border-r-4 border-primary-600' : 'text-gray-500'}`
            }
          >
            <FileText size={20} className="mr-3" />
            <span>Webinars</span>
          </NavLink>
          <NavLink 
            to="/dashboard/gallery" 
            className={({ isActive }) => 
              `flex items-center px-6 py-3 hover:bg-primary-50 ${isActive ? 'bg-primary-50 text-primary-600 border-r-4 border-primary-600' : 'text-gray-500'}`
            }
          >
            <Image size={20} className="mr-3" />
            <span>Gallery</span>
          </NavLink>
          <NavLink 
            to="/dashboard/testimonials" 
            className={({ isActive }) => 
              `flex items-center px-6 py-3 hover:bg-primary-50 ${isActive ? 'bg-primary-50 text-primary-600 border-r-4 border-primary-600' : 'text-gray-500'}`
            }
          >
            <MessageSquare size={20} className="mr-3" />
            <span>Testimonials</span>
          </NavLink>
          <NavLink 
            to="/dashboard/community" 
            className={({ isActive }) => 
              `flex items-center px-6 py-3 hover:bg-primary-50 ${isActive ? 'bg-primary-50 text-primary-600 border-r-4 border-primary-600' : 'text-gray-500'}`
            }
          >
            <Users size={20} className="mr-3" />
            <span>Community Links</span>
          </NavLink>
          <button
            onClick={handleSignOut}
            className="flex items-center px-6 py-3 text-gray-500 hover:bg-red-50 hover:text-red-600 w-full text-left mt-auto"
          >
            <LogOut size={20} className="mr-3" />
            <span>Sign Out</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        <Outlet />
      </main>
    </div>
  );
}