// routes/engagementRoutes.js
const express = require('express');
const router = express.Router();
const engagementController = require('../controllers/engagementController');
// Uncomment the line below if you want to protect routes with authentication middleware
// const { protect } = require('../middleware/authMiddleware');

// GET all engagements for a specific course
router.get('/course/:courseId', engagementController.getEngagementsByCourse);

// POST a new engagement (like or comment)
// If you have authentication, add the protect middleware: router.post('/', protect, engagementController.createEngagement);
router.post('/', engagementController.createEngagement);

module.exports = router;
