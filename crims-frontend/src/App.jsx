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

// Public versions for community users
import PublicCrimeMap from './pages/PublicCrimeMap';
import PublicHotlines from './pages/PublicHotlines';
import PublicStatistics from './pages/PublicStatistics';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/community" element={<CommunityDashboard />} />
        <Route path="/community/crime-map" element={<PublicCrimeMap />} />
        <Route path="/community/hotlines" element={<PublicHotlines />} />
        <Route path="/community/statistics" element={<PublicStatistics />} />

        {/* Protected Routes */}
        <Route path="/dashboard" element={
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
