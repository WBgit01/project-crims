import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { jwtDecode } from 'jwt-decode';
import logo from '../assets/crims_logo.png';
import styles from '../styles/Dashboard.module.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
});

export default function CrimeMap() {
  const [crimes, setCrimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      setRole(decoded.role);
    }
  }, []);

  useEffect(() => {
    const fetchCrimes = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/crime', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCrimes(res.data);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || 'Failed to fetch crimes');
      } finally {
        setLoading(false);
      }
    };

    fetchCrimes();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const centerPosition = [13.44306326314794, 121.85726165771486];

  return (
    <div className={styles.wrapper}>
      {/* Top Navigation Bar */}
      <header className={styles.topNav}>
        <div className={styles.logo}>
          <img src={logo} className={styles.logoImage} alt="CRIMS logo" />
          <span>CRIMS</span>
        </div>
      </header>

      <div className={styles.contentWrapper}>
        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <button className={styles.sideButton} onClick={() => navigate('/dashboard')}>📊 Dashboard</button>
          <button className={`${styles.sideButton} ${styles.active}`} onClick={() => navigate('/crime-map')}>🗺️ Crime Map</button>
          {role !== 'admin' && (
            <button className={styles.sideButton} onClick={() => navigate('/report-crime')}>📄 Report Crime</button>
          )}
          <button className={styles.sideButton} onClick={() => navigate('/statistics')}>📈 Statistics</button>
          <button className={styles.logoutButton} onClick={handleLogout}>⭕ Logout</button>
        </aside>

        {/* Main Panel */}
        <main className={styles.mainContent}>
          <div className={styles.titleBar}>🗺️ CRIME MAP</div>

          {loading && <p>Loading crimes...</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}

          <div style={{ height: '600px', width: '100%' }}>
            <MapContainer center={centerPosition} zoom={15} style={{ height: '100%', width: '100%' }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; OpenStreetMap contributors'
              />
              {crimes
                .filter(c => c.map_location && c.map_location.coordinates?.length === 2)
                .map((crime, idx) => (
                  <Marker
                    key={idx}
                    position={[
                      crime.map_location.coordinates[1],
                      crime.map_location.coordinates[0]
                    ]}
                  >
                    <Popup>
                      <strong>{crime.categories}</strong><br />
                      {crime.types}<br />
                      {crime.location}<br />
                      <em>Status:</em> {crime.status}<br />
                      <em>Reported:</em> {new Date(crime.reportedAt).toLocaleString()}
                    </Popup>
                  </Marker>
                ))}
            </MapContainer>
          </div>
        </main>
      </div>
    </div>
  );
}
