// controllers/engagementController.js
const Engagement = require('../models/Engagement');

exports.getEngagementsByCourse = async (req, res, next) => {
  try {
    const courseId = req.params.courseId;
    const engagements = await Engagement.find({ course: courseId });
    res.json(engagements);
  } catch (error) {
    next(error);
  }
};

exports.createEngagement = async (req, res, next) => {
  try {
    const { course, engagementType, content } = req.body;
    
    // Create a new engagement document.
    // Optionally, you could set "user" if you have authentication in place:
    // const user = req.user._id;  // if using a protected route
    const engagement = new Engagement({
      course,
      engagementType,
      content // For likes, content may be undefined or ignored
    });
    
    const savedEngagement = await engagement.save();
    res.status(201).json(savedEngagement);
  } catch (error) {
    next(error);
  }
};
