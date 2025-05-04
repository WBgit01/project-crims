import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import logo from '../assets/crims_logo.png';
import styles from '../styles/Dashboard.module.css';

export default function ReportCrime() {
  const [categories, setCategories] = useState('');
  const [types, setTypes] = useState('');
  const [location, setLocation] = useState('');
  const [mapLocation, setMapLocation] = useState({ lat: 13.44306326314794, lng: 121.85726165771486 });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Custom location pin icon
  const customIcon = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  function LocationMarker() {
    useMapEvents({
      click(event) {
        const { lat, lng } = event.latlng;
        setMapLocation({ lat, lng });
      },
    });

    return (
      <Marker position={mapLocation} icon={customIcon}>
        <Popup>Crime Location</Popup>
      </Marker>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');

      await axios.post('/crime/create', {
        categories,
        types,
        location,
        map_location: {
          type: 'Point',
          coordinates: [mapLocation.lng, mapLocation.lat],
        },
        status: 'Pending'
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert('Crime reported successfully!');
      navigate('/dashboard');
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert('Failed to report crime');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className={styles.wrapper}>
      {/* Top Navigation Bar */}
      <header className={styles.topNav}>
        <div className={styles.logo}>
          <img src={logo} className={styles.logoImage} />
          <span>CRIMS</span>
        </div>
      </header>

      <div className={styles.contentWrapper}>
        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <button className={styles.sideButton} onClick={() => navigate('/dashboard')}>📊 Dashboard</button>
          <button className={styles.sideButton} onClick={() => navigate('/crime-map')}>🗺️ Crime Map</button>
          <button className={`${styles.sideButton} ${styles.active}`} onClick={() => navigate('/report-crime')}>📄 Report Crime</button>
          <button className={styles.sideButton} onClick={() => navigate('/statistics')}>📈 Statistics</button>
          <button className={styles.logoutButton} onClick={handleLogout}>⭕ Logout</button>
        </aside>

        {/* Main Panel */}
        <main className={styles.mainContent}>
          <div className={styles.titleBar}>📄 REPORT CRIME</div>

          <form onSubmit={handleSubmit} className={styles.table}>
            <input
              type="text"
              placeholder="Category (e.g. Theft, Assault)"
              value={categories}
              onChange={(e) => setCategories(e.target.value)}
              required
              className="report-input"
            />

            <input
              type="text"
              placeholder="Specific Type (e.g. Snatching, Armed Robbery)"
              value={types}
              onChange={(e) => setTypes(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="Location (e.g. Brgy. Malbog, Boac)"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />

            {/* Crime Map */}
            <div className={styles.subTitleBar}>Crime Map (Plot the Crime Location)</div>

            <div style={{ height: '600px', width: '100%', marginBottom: '1rem' }}>
              <MapContainer center={[mapLocation.lat, mapLocation.lng]} zoom={13} style={{ width: '100%', height: '100%' }}>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <LocationMarker />
              </MapContainer>
            </div>

            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Report'}
            </button>
          </form>
        </main>
      </div>
    </div>
  );
}
