import { useEffect, useState } from 'react';
import axios from '../api/axios';

export default function Dashboard() {
  const [crimes, setCrimes] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCrimes = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/crime', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCrimes(res.data);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || 'Failed to fetch crime data');
      } finally {
        setLoading(false);
      }
    };

    fetchCrimes();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <button onClick={handleLogout}>Logout</button>

      {loading && <p>Loading crimes...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul>
        {crimes.map((crime, index) => (
          <li key={index}>{crime.title}</li>
        ))}
      </ul>
    </div>
  );
}
