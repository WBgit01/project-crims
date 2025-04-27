import { useEffect, useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

export default function BrowseCrimes() {
  const [crimes, setCrimes] = useState([]);
  const [filteredCrimes, setFilteredCrimes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    setSelectedCategories((prevSelectedCategories) =>
      checked
        ? [...prevSelectedCategories, value]
        : prevSelectedCategories.filter((category) => category !== value)
    );
  };

  const handleSearchAndFilter = () => {
    let results = [...crimes];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(crime =>
        crime.title.toLowerCase().includes(query) ||
        crime.location.toLowerCase().includes(query)
      );
    }

    if (selectedCategories.length > 0 && !selectedCategories.includes('All')) {
      results = results.filter(crime =>
        selectedCategories.some((category) => crime.categories.includes(category))
      );
    }

    setFilteredCrimes(results);
  };

  return (
    <div>
      <h2>Browse Crimes</h2>

      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Search crimes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ marginRight: '10px' }}
        />

        <div>
          <label>Select Categories: </label>
          {categories.map((cat, idx) => (
            <label key={idx} style={{ marginRight: '10px' }}>
              <input
                type="checkbox"
                value={cat}
                checked={selectedCategories.includes(cat)}
                onChange={handleCategoryChange}
              />
              {cat}
            </label>
          ))}
        </div>

        <button onClick={handleSearchAndFilter}>
          Apply Filters
        </button>
      </div>

      {loading && <p>Loading crimes...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div>
        {filteredCrimes.length === 0 ? (
          <p>No crimes found.</p>
        ) : (
          <table border="1" cellPadding="8" cellSpacing="0" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th>Crime ID</th>
                <th>Title</th>
                <th>Category</th>
                <th>Type</th>
                <th>Location</th>
                <th>Status</th>
                <th>Reported At</th>
              </tr>
            </thead>
            <tbody>
              {filteredCrimes.map((crime, index) => (
                <tr key={index}>
                  <td>{crime.crime_id}</td>
                  <td>{crime.title}</td>
                  <td>{crime.categories}</td>
                  <td>{crime.types}</td>
                  <td>{crime.location}</td>
                  <td>{crime.status}</td>
                  <td>{new Date(crime.reportedAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div style={{ marginTop: '2rem' }}>
        <button onClick={() => navigate('/dashboard')}>
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}
