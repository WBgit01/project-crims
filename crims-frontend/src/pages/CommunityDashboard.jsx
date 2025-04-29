import { useState } from 'react';
import PublicCrimeMap from './PublicCrimeMap';
import PublicStatistics from './PublicStatistics';

export default function CommunityDashboard() {
  const [view, setView] = useState('home');

  const renderHotlines = () => (
    <div>
      <h3>Police Hotlines</h3>
      <ul>
        <li><strong>Marinduque Provincial Police Office:</strong> 042-754-1234</li>
        <li><strong>Boac Municipal Police Station:</strong> 042-754-5678</li>
        <li><strong>Mogpog Police Station:</strong> 042-754-9101</li>
        <li><strong>Santa Cruz Police Station:</strong> 042-754-1122</li>
        <li><strong>Torrijos Police Station:</strong> 042-754-3344</li>
        <li><strong>Gasan Police Station:</strong> 042-754-5566</li>
        <li><strong>Buenavista Police Station:</strong> 042-754-7788</li>
        <li><strong>PNP Emergency Hotline:</strong> 117</li>
        <li><strong>PNP Text Hotline:</strong> 0917-847-5757</li>
      </ul>
    </div>
  );

  return (
    <div style={{ padding: '20px' }}>
      <h2>Community Crime Dashboard</h2>
      <p style={{ marginBottom: '1rem' }}>
        Welcome! This dashboard lets you view public crime data, contact police, and explore local crime statistics—no login required.
      </p>

      <div style={{ marginBottom: '1rem' }}>
        <button onClick={() => setView('map')} style={{ marginRight: '10px' }}>
          View Crime Map
        </button>
        <button onClick={() => setView('hotlines')} style={{ marginRight: '10px' }}>
          Report Crime (Hotlines)
        </button>
        <button onClick={() => setView('statistics')}>
          View Crime Statistics
        </button>
      </div>

      {view === 'map' && <PublicCrimeMap />}
      {view === 'hotlines' && renderHotlines()}
      {view === 'statistics' && <PublicStatistics />}

      {view === 'home' && (
        <div>
          <p>Select a section to begin exploring community crime information.</p>
        </div>
      )}
    </div>
  );
}
