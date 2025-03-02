const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware.js');

// User registration and authentication routes
router.post('/register', userController.registerUser);
router.post('/login', userController.authUser);
router.get('/profile', protect, userController.getUserProfile);

module.exports = router;
