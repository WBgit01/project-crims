import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import logo from '../assets/crims_logo.png';
import illustration from '../assets/login_illustration.gif';
import '../styles/Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/users/login', { email, password });

      // Store token and role
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.role);

      // Clear input fields after successful login
      setEmail('');
      setPassword('');

      alert('Login successful!');

      // Redirect based on role
      if (res.data.role === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <img src={logo} className="login-logo" />
          <h2>Login</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>

        <div className="login-illustration">
          <div className="illustration-header">
            <button
              className="back-text-button" type="button" onClick={() => navigate(-1)}>⋖Back
            </button>
          </div>
            <img src={illustration} />
        </div>
      </div>
    </div>
  );
}
