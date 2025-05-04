import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from '../api/axios';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import '../styles/PublicCrimeMap.css';


delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
});

export default function PublicCrimeMap() {
  const [crimes, setCrimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCrimes = async () => {
      try {
        const res = await axios.get('/crime');
        console.log('Data:', res.data);
        setCrimes(res.data);
      } catch (err) {
        console.error('Error fetching crimes:', err.response?.status, err.message);
        setError(err.response?.data?.message || 'Failed to fetch crimes');
      } finally {
        setLoading(false);
      }
    };

    fetchCrimes();
  }, []);

  const centerPosition = [13.44306326314794, 121.85726165771486];
  return (
    <div className="crime-map-container">
      <h2 className="map-title">Community Crime Map</h2>

      {loading && <div className="loader">Loading crimes...</div>}
      {error && <p className="error-message">{error}</p>}

      <div className="map-wrapper">
        <MapContainer center={centerPosition} zoom={15} className="crime-map">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; OpenStreetMap contributors'
          />

          {crimes
            .filter(c => c.map_location?.coordinates?.length === 2)
            .map((crime, idx) => (
              <Marker
                key={idx}
                position={[
                  crime.map_location.coordinates[1], // Lat
                  crime.map_location.coordinates[0], // Lng
                ]}
              >
                <Popup className="popup-style">
                  <div>
                    <strong>{crime.types}</strong><br />
                    <span>{new Date(crime.reportedAt).toLocaleDateString()}</span><br />
                    <em>{crime.location}</em>
                  </div>
                </Popup>
              </Marker>
            ))}
        </MapContainer>
      </div>
    </div>
  );
}