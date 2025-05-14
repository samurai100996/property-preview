import { BrowserRouter as Router, Routes, Route } from 'react-router'; // Fixed import
import Header from './components/Header';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Properties from './pages/Properties';
import PropertyDetails from './pages/PropertyDetails';

// Admin imports
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from './pages/admin/AdminLayout';
import AdminRoute from './components/admin/AdminRoute';
import Dashboard from './pages/admin/Dashboard'; // Fixed path
import Settings from './pages/admin/Settings';
import Enquiries from './pages/admin/Enquiries';
import ManageProperties from './pages/admin/ManageProperties'; // Fixed path
import { adminAuth } from './firebase-admin'; // Fixed path
import AdminProperties from './pages/admin/AdminProperties';
import AddPropertyForm from './pages/admin/AddPropertyForm';


import './App.css';
function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* Regular header (won't show on admin routes) */}
        <Header />
        {/* Main content area */}
        <main className="flex-grow">
          <Routes>
            {/* Public user routes */}
            <Route path="/" element={<Home />} />
            <Route path="/properties/:id" element={<PropertyDetails />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />

            {/* Admin routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route 
              path="/admin" 
              element={
                <AdminRoute>
                  <AdminLayout />
                </AdminRoute>
              
              }
            >
              
             <Route path="/admin/manage-properties/add" element={<AddPropertyForm />} />
              <Route path="manage-properties" element={<ManageProperties />} />
              <Route path="enquiries" element={<Enquiries />} />
              {/* Nested routes under AdminLayout */}
              <Route path="adminproperties" element={<AdminProperties />} />
              <Route path="dashboard" element={<Dashboard />} /> 
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;