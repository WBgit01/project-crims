import { useEffect, useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Dashboard.module.css';

export default function AdminDashboard() {
  const [crimes, setCrimes] = useState([]);
  const [filteredCrimes, setFilteredCrimes] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('latest');
  const [categories, setCategories] = useState([]);
  const [searchVisible, setSearchVisible] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const navigate = useNavigate();

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
        setFilteredCrimes(res.data);

        const uniqueCategories = ['All', ...new Set(res.data.map(c => c.categories))];
        setCategories(uniqueCategories);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || 'Failed to fetch crimes');
      } finally {
        setLoading(false);
      }
    };

    fetchCrimes();
  }, []);

  const handleSearchAndFilter = () => {
    let results = [...crimes];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(crime =>
        crime.categories.toLowerCase().includes(query) ||
        crime.location.toLowerCase().includes(query) ||
        crime.crime_id.toLowerCase().includes(query) ||
        crime.types.toLowerCase().includes(query)
      );
    }

    if (selectedCategory !== 'All') {
      results = results.filter(crime => crime.categories === selectedCategory);
    }

    if (sortOrder === 'latest') {
      results = results.sort((a, b) => new Date(b.reportedAt) - new Date(a.reportedAt));
    } else {
      results = results.sort((a, b) => new Date(a.reportedAt) - new Date(b.reportedAt));
    }

    setFilteredCrimes(results);
  };

  const toggleSearchVisibility = () => {
    setSearchVisible(!searchVisible);
  };

  const handleSendNotification = async () => {
    const message = prompt('Enter message to send to all users:');
    if (!message) return;

    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('/admin/notify', { message }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Notification sent successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to send notification.');
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Admin Dashboard</h2>

      <div className={styles.buttonGroup}>
        <button onClick={() => navigate('/statistics')} className={styles.button}>
          View Statistics
        </button>
        <button onClick={toggleSearchVisibility} className={styles.button}>
          Search Report
        </button>
        <button onClick={() => navigate('/crime-map')} className={styles.button}>
          Crime Map
        </button>
        <button onClick={() => navigate('/admin/manage-users')} className={styles.button}>
          Manage Users
        </button>
        <button onClick={handleSendNotification} className={styles.button}>
          Notify Users
        </button>
      </div>

      {searchVisible && (
        <div className={styles.filterContainer}>
          <input
            type="text"
            placeholder="Search crimes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.input}
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className={styles.input}
          >
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>{cat}</option>
            ))}
          </select>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className={styles.input}
          >
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
          </select>
          <button onClick={handleSearchAndFilter} className={styles.button}>
            Apply Filters
          </button>
        </div>
      )}

      {loading && <p>Loading crimes...</p>}
      {error && <p className={styles.error}>{error}</p>}

      <h3>Latest Crime Reports</h3>
      <div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>Crime ID</th>
              <th className={styles.th}>Category</th>
              <th className={styles.th}>Type</th>
              <th className={styles.th}>Location</th>
              <th className={styles.th}>Status</th>
              <th className={styles.th}>Reported At</th>
            </tr>
          </thead>
          <tbody>
            {filteredCrimes.length === 0 ? (
              <tr><td className={styles.td} colSpan="6">No crimes found.</td></tr>
            ) : (
              filteredCrimes.map((crime, index) => (
                <tr key={index}>
                  <td className={styles.td}>{crime.crime_id}</td>
                  <td className={styles.td}>{crime.categories}</td>
                  <td className={styles.td}>{crime.types}</td>
                  <td className={styles.td}>{crime.location}</td>
                  <td className={styles.td}>{crime.status}</td>
                  <td className={styles.td}>{new Date(crime.reportedAt).toLocaleString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
