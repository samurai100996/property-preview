import { Link, useLocation } from 'react-router';
import { FiHome, FiSettings } from 'react-icons/fi';

const AdminSidebar = () => {
  const location = useLocation();

  return (
    <div className="w-64 bg-blue-800 text-white p-4">
      <h1 className="text-xl font-bold mb-8">Admin Panel</h1>
      <nav className="space-y-2">
        <Link
          to="/admin/dashboard"
          className={`flex items-center p-2 rounded ${location.pathname === '/admin/dashboard' ? 'bg-blue-700' : 'hover:bg-blue-700'}`}
        >
          <FiHome className="mr-2" /> Dashboard
        </Link>
        <Link
          to="/admin/settings"
          className={`flex items-center p-2 rounded ${location.pathname === '/admin/settings' ? 'bg-blue-700' : 'hover:bg-blue-700'}`}
        >
          <FiSettings className="mr-2" /> Settings
        </Link>
      </nav>
    </div>
  );
};

export default AdminSidebar;