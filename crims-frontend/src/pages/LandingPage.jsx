import { useNavigate } from 'react-router-dom';
import backgroundVideo from '../assets/landing_bg.mp4';
import styles from'../styles/LandingPage.css';
import logo from '../assets/crims_logo.png';

export default function LandingPage() {
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    navigate('/community');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <>
      <video autoPlay loop muted id="background-video">
         <source src={backgroundVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>


      <div className="overlay"></div>

      <div id="landing-container">
        <div className="logo-container">
         <img src={logo} alt="App Logo" className="landing-logo" />
        </div>

        <h1>CRIME REPORTING INFORMATION MANAGMENT SYSTEM</h1>
        <p>Stay aware. Stay informed. Help create a safer community for everyone.</p>
        <div className="btn-group">
          <button onClick={handleGetStartedClick}>Get Started</button>
          <button onClick={handleLoginClick}>Login</button>
        </div>
      </div>
    </>
  );
}
