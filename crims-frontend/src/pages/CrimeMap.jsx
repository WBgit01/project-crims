import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons not showing in some setups
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
  const navigate = useNavigate();

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

  const centerPosition = [13.44306326314794, 121.85726165771486];

  return (
    <div>
      <h2>Crime Map</h2>

      <button onClick={() => navigate('/dashboard')} style={{ marginBottom: '1rem' }}>
        Back to Dashboard
      </button>

      {loading && <p>Loading crimes...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div style={{ height: '600px', width: '100%' }}>
        <MapContainer center={centerPosition} zoom={11} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; OpenStreetMap contributors'
          />

          {/* Plot all crimes */}
          {crimes
            .filter(c => c.map_location && c.map_location.coordinates?.length === 2)
            .map((crime, idx) => (
              <Marker
                key={idx}
                position={[
                  crime.map_location.coordinates[1], // lat
                  crime.map_location.coordinates[0]  // lng
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
            ))
          }
        </MapContainer>
      </div>
    </div>
  );
}
