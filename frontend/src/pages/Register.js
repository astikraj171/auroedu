// src/pages/Register.js
import React, { useState } from 'react';
import API from '../api'; // or import axios directly

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post('/users/register', formData);
      setMessage('User registered successfully!');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error registering user');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label>Name: </label>
        <input
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
        /><br/>
        <label>Email: </label>
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
        /><br/>
        <label>Password: </label>
        <input
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
        /><br/>
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Register;
