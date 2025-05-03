import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    // Redirect to the community dashboard
    navigate('/community');
  };

  const handleLoginClick = () => {
    // Redirect to the login page
    navigate('/login');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>Welcome to the Crime Reporting App</h1>
      <p>
        Join us in making your community safer by reporting incidents and staying informed.
      </p>
      
      <div>
        <button 
          onClick={handleGetStartedClick} 
          style={{ padding: '10px 20px', fontSize: '16px', margin: '10px', cursor: 'pointer' }}
        >
          Get Started
        </button>
        <button 
          onClick={handleLoginClick} 
          style={{ padding: '10px 20px', fontSize: '16px', margin: '10px', cursor: 'pointer' }}
        >
          Login
        </button>
      </div>
    </div>
  );
}
