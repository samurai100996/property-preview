import { Link, NavLink } from "react-router";
import { FiHome, FiMail, FiLayers } from "react-icons/fi";

const Header = () => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo linking to Home */}
        <Link to="/" className="flex items-center">
          <FiHome className="text-blue-600 text-2xl mr-2" />
          <span className="text-xl font-bold text-blue-600">EstateView</span>
        </Link>

        {/* Navigation - Home, Properties, About, and Contact */}
        <nav className="flex space-x-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `hover:text-blue-600 ${isActive ? 'active-link' : 'text-gray-700'}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/properties"
            className={({ isActive }) =>
              `hover:text-blue-600 ${isActive ? 'active-link' : 'text-gray-700'}`
            }
          >
            <div className="flex items-center">
              <FiLayers className="mr-1" /> Properties
            </div>
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `hover:text-blue-600 ${isActive ? 'active-link' : 'text-gray-700'}`
            }
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `hover:text-blue-600 ${isActive ? 'active-link' : 'text-gray-700'}`
            }
          >
            <div className="flex items-center">
              <FiMail className="mr-1" /> Contact
            </div>
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;