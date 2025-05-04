import { useEffect, useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Dashboard.module.css';
import logo from '../assets/crims_logo.png';


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
          <button className={`${styles.sideButton} ${styles.active}`} onClick={() => navigate('/dashboard')}>📊 Dashboard</button>
          <button className={styles.sideButton}  onClick={toggleSearchVisibility}>🔍 Search Crime Report</button>
          <button className={styles.sideButton} onClick={() => navigate('/crime-map')}>🗺️ Crime Map</button>
          <button className={styles.sideButton} onClick={() => navigate('/statistics')}>📈 Statistics</button>
          <button className={styles.sideButton} onClick={() => navigate('/admin/manage-users')}>⚙️ Manage Users</button>
          <button className={styles.sideButton} onClick={handleSendNotification}>📢 Brodcast Message</button>
          <button className={styles.logoutButton} onClick={handleLogout}>⭕ Logout</button>
        </aside>

        {/* Main Panel */}
        <main className={styles.mainContent}>
          <div className={styles.titleBar}>📊 ADMIN DASHBOARD</div>
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
              <button onClick={handleSearchAndFilter} className={styles.submitBtn}>
                Apply Filters
              </button>
            </div>
          )}
          <div className={styles.subTitleBar}>Latest Crime Report</div>

          <table className={styles.table}>
            <thead>
              <tr>
                <th>Crime ID</th>
                <th>Category</th>
                <th>Type</th>
                <th>Location</th>
                <th>Status</th>
                <th>Reported At</th>
              </tr>
            </thead>
            <tbody>
              {filteredCrimes.length === 0 ? (
                <tr>
                  <td colSpan="6">No crimes found.</td>
                </tr>
              ) : (
                filteredCrimes.map((crime, index) => (
                  <tr key={index}>
                    <td>{crime.crime_id}</td>
                    <td>{crime.categories}</td>
                    <td>{crime.types}</td>
                    <td>{crime.location}</td>
                    <td>{crime.status}</td>
                    <td>{new Date(crime.reportedAt).toLocaleString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </main>
      </div>
    </div>
  );
}