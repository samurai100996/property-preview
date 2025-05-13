import { Outlet } from 'react-router';
import AdminSidebar from '../../components/admin/AdminSidebar';
const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 overflow-auto p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;