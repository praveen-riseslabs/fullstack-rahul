import React, { useState } from 'react';
import './Login.css'; // Import your CSS file
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });
     
      if (response.ok) {
        // Handle successful login (e.g., redirect to dashboard)
        console.log('Login successful!');
        // navigate("/")
      } else {
        // Handle login failure
        console.error('Login failed.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="wrapper">
        <div className="logo_wrapper">
          <div className="logo"></div>
        </div>
        <h4>Login</h4>
        <div className="form">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={loginData.email}
            onChange={handleInputChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={loginData.password}
            onChange={handleInputChange}
            required
          />
          <button type="submit" onSubmit={handleSubmit}>Login</button>
        </div>
        <p>
          Don't have an account? <a href="/register">Register</a>
        </p>
        <p>
          Forgot password? <a href="/forgot">Reset</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
