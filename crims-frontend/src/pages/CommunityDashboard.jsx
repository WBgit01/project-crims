import { useState } from 'react';
import PublicCrimeMap from './PublicCrimeMap';
import PublicStatistics from './PublicStatistics';
import PublicHotlines from './PublicHotlines';
import logo from '../assets/crims_logo.png';
import '../styles/CommunityDashboard.css';

export default function CommunityDashboard() {
  const [view, setView] = useState('home');

  return (
    <div className="dashboard-container">
      <nav className="navbar">
        <div className="navbar-left">
          <div className="logo">
            <img src={logo} alt="Logo" />
            <h3>CRIMS</h3>
          </div>
          <ul className="nav-links">
            <li><button onClick={() => setView('home')}>Home</button></li>
            <li><button onClick={() => setView('hotlines')}>ReportCrime</button></li>
            <li><button onClick={() => setView('map')}>CrimeMap</button></li>
            <li><button onClick={() => setView('statistics')}>Statistics</button></li>
          </ul>
        </div>
      </nav>

      <div className="hero-flex">
        <div className="hero-text">
          <h1 className="hero-heading">
            Crime Reporting <br />
            Information <br />
            Management System
          </h1>
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