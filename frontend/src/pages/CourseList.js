// src/pages/CourseList.js
import React, { useEffect, useState } from 'react';
import API from '../api';

function CourseList() {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await API.get('/courses');
        setCourses(data);
      } catch (err) {
        setError('Failed to load courses');
      }
    };
    fetchCourses();
  }, []);

  return (
    <div>
      <h2>All Courses</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {courses.map((course) => (
          <li key={course._id}>
            <strong>{course.title}</strong> - {course.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CourseList;
