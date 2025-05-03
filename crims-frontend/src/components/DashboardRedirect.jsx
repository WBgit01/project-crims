import { Navigate } from 'react-router-dom';

const DashboardRedirect = () => {
  const role = localStorage.getItem('role');
  
  console.log('User role:', role);

  if (role === 'admin') {
    return <Navigate to="/admin-dashboard" />;
  } else if (role === 'police') {
    return <Navigate to="/dashboard" />;
  } else {
    return <Navigate to="/user-dashboard" />;
  }
};

export default DashboardRedirect;
