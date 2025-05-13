import { Navigate } from 'react-router';
import { adminAuth } from '../../firebase-admin';

const AdminRoute = ({ children }) => {
  const user = adminAuth.currentUser;
  
  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default AdminRoute;