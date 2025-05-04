import { useState, useEffect } from 'react';
import axios from '../api/axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import 'chart.js/auto';
import '../styles/PublicStatistics.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function PublicStatistics() {
  const [crimes, setCrimes] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filteredCrimes, setFilteredCrimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCrimes = async () => {
      try {
        const res = await axios.get('/crime');
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

  // Group crimes by date and count them
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

  // Create data for the graph
  const generateGraphData = () => {
    const groupedCrimes = groupByDate(filteredCrimes);
    const labels = Object.keys(groupedCrimes);
    const data = Object.values(groupedCrimes);

    return {
      labels: labels,
      datasets: [
        {
          label: 'Reported Crimes',
          data: data,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
        },
      ],
    };
  };

  return (
    <div className="statistics-container">
      <h2 className="statistics-header">Public Crime Statistics</h2>

      <div className="date-filter">
        <label>From:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <label>Till:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <button className="statBtn" onClick={handleDateChange}>Apply Date Filter</button>
      </div>

      {loading && <p className="loading-message">Loading statistics...</p>}
      {error && <p className="error-message">{error}</p>}

      <h3 className="statistics-header">Crime Trends (Filtered by Date Range)</h3>

      <div className="chart-wrapper">
        {filteredCrimes.length > 0 ? (
          <Line data={generateGraphData()} />
        ) : (
          <p className='no-data-msg'>No crimes found in the selected date range.</p>
        )}
      </div>
    </div>
  );
}