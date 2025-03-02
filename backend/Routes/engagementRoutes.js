const express = require('express');
const router = express.Router();
const engagementController = require('../controllers/engagementController');
const { protect } = require('../middleware/authMiddleware.js');

// Engagement API routes
router.get('/course/:courseId', engagementController.getEngagementsByCourse);
router.post('/', protect, engagementController.createEngagement);
router.get('/:id', engagementController.getEngagementById);
router.put('/:id', protect, engagementController.updateEngagement);
router.delete('/:id', protect, engagementController.deleteEngagement);

module.exports = router;
