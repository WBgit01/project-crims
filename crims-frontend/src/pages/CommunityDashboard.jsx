import { useState } from 'react';
import PublicCrimeMap from './PublicCrimeMap';
import PublicStatistics from './PublicStatistics';
import logo from '../assets/crims_logo.png';

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
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      {/* Navbar */}
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        borderBottom: '1px solid #ddd',
        backgroundColor: '#fff'
      }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={logo} alt="Logo" style={{ height: '40px', marginRight: '10px' }} />
          <h3 style={{ margin: 0 }}>CRIMS</h3>
        </div>
        <ul style={{ display: 'flex', listStyle: 'none', gap: '15px', margin: 0 }}>
          <li><button onClick={() => setView('home')} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>Home</button></li>
          <li><button onClick={() => setView('hotlines')} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>ReportCrime</button></li>
          <li><button onClick={() => setView('map')} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>CrimeMap</button></li>
          <li><button style={{ background: 'none', border: 'none', cursor: 'pointer' }}>News</button></li>
          <li><button style={{ background: 'none', border: 'none', cursor: 'pointer' }}>Programs</button></li>
          <li><button style={{ background: 'none', border: 'none', cursor: 'pointer' }}>FAQ</button></li>
        </ul>
        <button style={{
          padding: '6px 16px',
          border: '1px solid black',
          borderRadius: '20px',
          background: 'white',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}>Login</button>
      </nav>

      {/* Main Section */}
      <div style={{ padding: '40px 20px', textAlign: 'center' }}>
        {view === 'home' && (
          <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ maxWidth: '500px', textAlign: 'left' }}>
              <h1 style={{ fontSize: '3rem' }}>Crime Reporting <br />and Investigation<br />Monitoring System</h1>
              <button onClick={() => setView('map')} style={{
                marginTop: '20px',
                padding: '10px 20px',
                backgroundColor: '#0056d2',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}>
                Get Started
              </button>
            </div>
            <img src={logo} alt="Crime Shield" style={{ height: '400px', maxWidth: '100%', marginTop: '20px' }} />
          </div>
        )}

      {view === 'map' && <PublicCrimeMap />}
      {view === 'hotlines' && renderHotlines()}
      {view === 'statistics' && <PublicStatistics />}

        </div>
    </div>
  );
}
