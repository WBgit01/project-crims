import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import ReportCrime from './pages/ReportCrime';
import BrowseCrimes from './pages/BrowseCrime';
import Statistics from './pages/Statistics';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={
          <PrivateRoute><Dashboard /></PrivateRoute>
        } />
        <Route path="/report-crime" element={
          <PrivateRoute><ReportCrime /></PrivateRoute>
        } />
        <Route path="/browse-crimes" element={<BrowseCrimes />} />
        <Route path="/statistics" element={<PrivateRoute><Statistics /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
