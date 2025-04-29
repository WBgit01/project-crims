import { useEffect, useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [crimes, setCrimes] = useState([]);
  const [filteredCrimes, setFilteredCrimes] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('latest');
  const [categories, setCategories] = useState([]);
  const [searchVisible, setSearchVisible] = useState(false);

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

  return (
    <div>
      <h2>Dashboard</h2>

      <div style={{ marginBottom: '1rem' }}>
        <button onClick={() => navigate('/report-crime')} style={{ marginRight: '10px' }}>
          Report a Crime
        </button>
        <button onClick={() => navigate('/statistics')} style={{ marginRight: '10px' }}>
          View Statistics
        </button>
        <button onClick={toggleSearchVisibility} style={{ marginRight: '10px' }}>
          Search Report
        </button>
        <button onClick={() => navigate('/crime-map')}>
          Crime Map
        </button>
      </div>

      {searchVisible && (
        <div style={{ marginBottom: '1rem' }}>
          <input
            type="text"
            placeholder="Search crimes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ marginRight: '10px' }}
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{ marginRight: '10px' }}
          >
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>{cat}</option>
            ))}
          </select>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            style={{ marginRight: '10px' }}
          >
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
          </select>
          <button onClick={handleSearchAndFilter}>
            Apply Filters
          </button>
        </div>
      )}

      {loading && <p>Loading crimes...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <h3>Latest Crime Reports</h3>
      <div>
        <table border="1" cellPadding="8" cellSpacing="0" style={{ width: '100%', borderCollapse: 'collapse' }}>
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
              <tr><td colSpan="7">No crimes found.</td></tr>
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
      </div>
    </div>
  );
}
