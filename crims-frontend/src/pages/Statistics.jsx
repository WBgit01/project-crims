import { useEffect, useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { jwtDecode } from 'jwt-decode'; // FIXED import
import logo from '../assets/crims_logo.png';
import styles from '../styles/Dashboard.module.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function Statistics() {
  const [crimes, setCrimes] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filteredCrimes, setFilteredCrimes] = useState([]);
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

    const fetchCrimes = async () => {
      try {
        const res = await axios.get('/crime', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCrimes(res.data);
        setFilteredCrimes(res.data);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || 'Failed to fetch crimes');
      } finally {
        setLoading(false);
      }
    };

    fetchCrimes();
  }, []);

  const handleDateChange = () => {
    let results = [...crimes];

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      start.setHours(0, 0, 0, 0);
      end.setHours(23, 59, 59, 999);

      results = results.filter(crime => {
        const reportedDate = new Date(crime.reportedAt);
        reportedDate.setHours(0, 0, 0, 0);
        return reportedDate >= start && reportedDate <= end;
      });
    }

    setFilteredCrimes(results);
  };

  const groupByDate = (crimes) => {
    const grouped = {};
    crimes.forEach(crime => {
      const date = new Date(crime.reportedAt).toLocaleDateString();
      if (!grouped[date]) {
        grouped[date] = 0;
      }
      grouped[date]++;
    });
    return grouped;
  };

  const generateGraphData = () => {
    const groupedCrimes = groupByDate(filteredCrimes);
    const labels = Object.keys(groupedCrimes);
    const data = Object.values(groupedCrimes);

    return {
      labels,
      datasets: [
        {
          label: 'Reported Crimes',
          data,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
        },
      ],
    };
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className={styles.wrapper}>
      <header className={styles.topNav}>
        <div className={styles.logo}>
          <img src={logo} className={styles.logoImage} />
          <span>CRIMS</span>
        </div>
      </header>

      <div className={styles.contentWrapper}>
        <aside className={styles.sidebar}>
          <button className={styles.sideButton} onClick={() => navigate('/dashboard')}>📊 Dashboard</button>
          <button className={styles.sideButton} onClick={() => navigate('/crime-map')}>🗺️ Crime Map</button>
          {role !== 'admin' && (
            <button className={styles.sideButton} onClick={() => navigate('/report-crime')}>📄 Report Crime</button>
          )}
          <button className={`${styles.sideButton} ${styles.active}`} onClick={() => navigate('/statistics')}>📈 Statistics</button>
          <button className={styles.logoutButton} onClick={handleLogout}>⭕ Logout</button>
        </aside>

        <main className={styles.mainContent}>
          <div className={styles.titleBar}>📈 STATISTICS</div>

          <div style={{ marginBottom: '1rem' }}>
            <label>From: </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              style={{ marginRight: '10px' }}
            />
            <label>Till: </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              style={{ marginRight: '10px' }}
            />
            <button className={styles.submitBtn} onClick={handleDateChange}>Apply Date Filter</button>
          </div>

          {loading && <p>Loading statistics...</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}

          <div className={styles.subTitleBar}>Crime Trends (Filtered by Date Range)</div>

          <div style={{ width: '80%', margin: '30px auto' }}>
            {filteredCrimes.length > 0 ? (
              <Line data={generateGraphData()} />
            ) : (
              <p>No crimes found in the selected date range.</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
