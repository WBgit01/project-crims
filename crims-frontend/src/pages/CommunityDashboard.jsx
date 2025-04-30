import { useState } from 'react';
import PublicCrimeMap from './PublicCrimeMap';
import PublicStatistics from './PublicStatistics';
import PublicHotlines from './PublicHotlines';
import logo from '../assets/crims_logo.png';
import '../styles/CommunityDashboard.css';

export default function CommunityDashboard() {
  const [view, setView] = useState('home');

    // <div>
    //   <h3>Police Hotlines</h3>
    //   <ul>
    //     <li><strong>Marinduque Provincial Police Office:</strong> 042-754-1234</li>
    //     <li><strong>Boac Municipal Police Station:</strong> 042-754-5678</li>
    //     <li><strong>Mogpog Police Station:</strong> 042-754-9101</li>
    //     <li><strong>Santa Cruz Police Station:</strong> 042-754-1122</li>
    //     <li><strong>Torrijos Police Station:</strong> 042-754-3344</li>
    //     <li><strong>Gasan Police Station:</strong> 042-754-5566</li>
    //     <li><strong>Buenavista Police Station:</strong> 042-754-7788</li>
    //     <li><strong>PNP Emergency Hotline:</strong> 117</li>
    //     <li><strong>PNP Text Hotline:</strong> 0917-847-5757</li>
    //   </ul>
    // </div>

  return (
    <div className="dashboard-container">
      <nav className="navbar">
        <div className="navbar-left">
          <div className="logo">
            <img src={logo} alt="Logo" />
            <h3>CRIMS API</h3>
          </div>
          <ul className="nav-links">
            <li><button onClick={() => setView('home')}>Home</button></li>
            <li><button onClick={() => setView('hotlines')}>ReportCrime</button></li>
            <li><button onClick={() => setView('map')}>CrimeMap</button></li>
            <li><button onClick={() => setView('statistics')}>Statistics</button></li>
          </ul>
        </div>
        {/* <button className="login-button">Login</button> */}
      </nav>

      <div className="hero-flex">
        <div className="hero-text">
          <h1 className="hero-heading">
            Crime Reporting <br />
            Information <br />
            Management System
          </h1>
          <button className="get-started-btn">
            Get Started
          </button>
        </div>
        <img src={logo} alt="Crime Shield" className="hero-image" />
      </div>

      {view === 'map' && <PublicCrimeMap />}
      {view === 'hotlines' && <PublicHotlines />}
      {view === 'statistics' && <PublicStatistics />}
      {view === 'home' && (
        <div>
        </div>
      )}
    </div>
  );
}
