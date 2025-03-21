import React, { useState } from 'react';
import API from '../api';

function CreateCourse() {
  // Removed instructor from initial state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    schedule: ''
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
      // Send only title, description, and schedule
      const { data } = await API.post('/courses', formData);
      setMessage(`Course created: ${data.title}`);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error creating course');
    }
  };

  return (
    <div>
      <h2>Create a New Course</h2>
      <form onSubmit={handleSubmit}>
        <label>Title: </label>
        <input
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
        /><br/>
        <label>Description: </label>
        <input
          name="description"
          type="text"
          value={formData.description}
          onChange={handleChange}
        /><br/>
        <label>Schedule: </label>
        <input
          name="schedule"
          type="datetime-local"
          value={formData.schedule}
          onChange={handleChange}
        /><br/>
        {/* Removed Instructor Field */}
        <button type="submit">Create</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default CreateCourse;
