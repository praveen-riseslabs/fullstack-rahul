import React, { useState } from 'react';
import "./ResetPass.css"; // Import your CSS file
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [resetData, setResetData] = useState({
    email: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setResetData({
      ...resetData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/users/forgot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(resetData),
      });

      if (response.ok && response.status===200) {
        // Handle successful reset request (e.g., display success message)
        console.log('Password reset email sent!');
      } else {
        // Handle reset request failure
        console.error('Password reset request failed.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="wrapper">
       
        <h4>Reset Password</h4>
        <div className="form">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={resetData.email}
            onChange={handleInputChange}
            required
          />
          <button type="submit" onSubmit={handleSubmit}>Reset Password</button>
        </div>
        <p>
          Remembered your password? <a href="/login">Login</a>
        </p>
        <p>
          Don't have an account? <a href="/register">Register</a>
        </p>
      </form>
    </div>
  );
};

export default ResetPassword;
