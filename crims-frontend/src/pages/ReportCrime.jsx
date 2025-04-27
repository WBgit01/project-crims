import { useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';

export default function ReportCrime() {
  const [categories, setCategories] = useState('');
  const [types, setTypes] = useState('');
  const [location, setLocation] = useState('');
  const [mapLocation, setMapLocation] = useState({ lat: 13.44306326314794, lng: 121.85726165771486 });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function LocationMarker() {
    const map = useMapEvents({
      click(event) {
        const { lat, lng } = event.latlng;
        setMapLocation({ lat, lng });
      },
    });

    return (
      <Marker position={mapLocation}>
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
        location, // The user-entered location string
        map_location: {
          type: 'Point',
          coordinates: [mapLocation.lng, mapLocation.lat], // MongoDB expects [longitude, latitude]
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

  return (
    <form onSubmit={handleSubmit}>
      <h2>Report a Crime</h2>

      <input
        type="text"
        placeholder="Category (e.g. Theft, Assault)"
        value={categories}
        onChange={(e) => setCategories(e.target.value)}
        required
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
      <div style={{ height: '400px', width: '100%', marginBottom: '1rem' }}>
        <MapContainer center={[mapLocation.lat, mapLocation.lng]} zoom={13} style={{ width: '100%', height: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <LocationMarker />
        </MapContainer>
      </div>

      <button type="submit" disabled={loading}>
        {loading ? 'Submitting...' : 'Submit Report'}
      </button>

      {/* Home Button */}
      <div style={{ marginTop: '1rem' }}>
        <button onClick={() => navigate('/dashboard')}>
          Go to Dashboard
        </button>
      </div>
    </form>
  );
}
