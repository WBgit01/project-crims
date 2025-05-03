import React from 'react';
import '../styles/PublicHotlines.css'; // Import the external CSS file

export default function PublicHotlines() {
  return (
    <div className="container">
      <h2 className="header">Police Hotlines</h2>
      <p className="description">
        If you witness a crime or need urgent assistance, contact the nearest police station:
      </p>

      <ul className="list">
        <li className="list-item">
          <strong>Marinduque Provincial Police Office:</strong> (042) 332-1234
        </li>
        <li className="list-item">
          <strong>Boac Police Station:</strong> (042) 332-5678
        </li>
        <li className="list-item">
          <strong>Mogpog Police Station:</strong> (042) 332-8765
        </li>
        <li className="list-item">
          <strong>Gasan Police Station:</strong> (042) 332-2345
        </li>
        <li className="list-item">
          <strong>Santa Cruz Police Station:</strong> (042) 332-3456
        </li>
        <li className="list-item">
          <strong>Torrijos Police Station:</strong> (042) 332-4567
        </li>
      </ul>

      <p className="emergency">
        For emergencies, dial <strong className="emergency-number">911</strong>.
      </p>
    </div>
  );
}