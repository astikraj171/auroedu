// src/pages/CourseList.js
import React, { useEffect, useState } from 'react';
import API from '../api';

function CourseList() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCoursesAndEngagements = async () => {
      try {
        // Fetch all courses
        const { data: coursesData } = await API.get('/courses');

        // For each course, fetch engagements (likes and comments)
        const updatedCourses = await Promise.all(
          coursesData.map(async (course) => {
            try {
              const { data: engagements } = await API.get(`/engagements/course/${course._id}`);
              const likeCount = engagements.filter(e => e.engagementType === 'like').length;
              const comments = engagements.filter(e => e.engagementType === 'comment');
              return { ...course, likeCount, comments };
            } catch (error) {
              console.error(`Error fetching engagements for course ${course._id}:`, error);
              return { ...course, likeCount: 0, comments: [] };
            }
          })
        );

        setCourses(updatedCourses);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCoursesAndEngagements();
  }, []);

  // Handler for liking a course
  const handleLike = async (courseId) => {
    try {
      await API.post('/engagements', { course: courseId, engagementType: 'like' });
      setCourses(prevCourses =>
        prevCourses.map(course =>
          course._id === courseId ? { ...course, likeCount: course.likeCount + 1 } : course
        )
      );
    } catch (error) {
      console.error('Error liking course:', error);
    }
  };

  // Handler for adding a comment
  const handleComment = async (courseId) => {
    const commentText = prompt('Enter your comment:');
    if (!commentText) return;
    try {
      const { data: newComment } = await API.post('/engagements', {
        course: courseId,
        engagementType: 'comment',
        content: commentText
      });
      setCourses(prevCourses =>
        prevCourses.map(course =>
          course._id === courseId
            ? { ...course, comments: [...course.comments, newComment] }
            : course
        )
      );
    } catch (error) {
      console.error('Error commenting on course:', error);
    }
  };

  return (
    <div>
      <h2>Courses</h2>
      {courses.length === 0 ? (
        <p>No courses available.</p>
      ) : (
        courses.map(course => (
          <div key={course._id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            <p>Schedule: {new Date(course.schedule).toLocaleString()}</p>
            <div>
              <button onClick={() => handleLike(course._id)}>Like</button>
              <span style={{ marginLeft: '8px' }}>{course.likeCount} likes</span>
            </div>
            <div style={{ marginTop: '4px' }}>
              <button onClick={() => handleComment(course._id)}>Comment</button>
              <span style={{ marginLeft: '8px' }}>{course.comments.length} comments</span>
            </div>
            {course.comments.length > 0 && (
              <div style={{ marginTop: '10px' }}>
                <h4>Comments:</h4>
                <ul style={{ listStyle: 'none', paddingLeft: '10px' }}>
                  {course.comments.map((comment, index) => (
                    <li key={index} style={{ borderBottom: '1px solid #eee', padding: '4px 0' }}>
                      {comment.content}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default CourseList;
