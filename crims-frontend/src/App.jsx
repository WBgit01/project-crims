import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import ReportCrime from './pages/ReportCrime';
import BrowseCrimes from './pages/BrowseCrime';
import Statistics from './pages/Statistics';
import CrimeMap from './pages/CrimeMap';
import CommunityDashboard from './pages/CommunityDashboard';
import AdminDashboard from './pages/AdminDashboard';
import ManageUsers from './pages/ManageUsers';

// Public versions for community users
import PublicCrimeMap from './pages/PublicCrimeMap';
import PublicHotlines from './pages/PublicHotlines';
import PublicStatistics from './pages/PublicStatistics';

// Role-based redirector
import DashboardRedirect from './components/DashboardRedirect';

// Landing Page
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/community" element={<CommunityDashboard />} />
        <Route path="/community/crime-map" element={<PublicCrimeMap />} />
        <Route path="/community/hotlines" element={<PublicHotlines />} />
        <Route path="/community/statistics" element={<PublicStatistics />} />

        {/* Role-Based Redirect */}
        <Route path="/dashboard" element={<DashboardRedirect />} />

        {/* User Routes */}
        <Route path="/user-dashboard" element={
          <PrivateRoute><Dashboard /></PrivateRoute>
        } />
        <Route path="/report-crime" element={
          <PrivateRoute><ReportCrime /></PrivateRoute>
        } />
        <Route path="/browse-crimes" element={
          <PrivateRoute><BrowseCrimes /></PrivateRoute>
        } />
        <Route path="/statistics" element={
          <PrivateRoute><Statistics /></PrivateRoute>
        } />
        <Route path="/crime-map" element={
          <PrivateRoute><CrimeMap /></PrivateRoute>
        } />

        {/* Admin Routes */}
        <Route path="/admin-dashboard" element={
          <PrivateRoute><AdminDashboard /></PrivateRoute>
        } />
        <Route path="/admin/manage-users" element={
          <PrivateRoute><ManageUsers /></PrivateRoute>
        } />

        <Route path="*" element={<h2>404 - Page Not Found</h2>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
