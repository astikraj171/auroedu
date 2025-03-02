const Engagement = require('../models/Engagement');

// Get all engagements for a specific course
exports.getEngagementsByCourse = async (req, res, next) => {
  try {
    const engagements = await Engagement.find({ course: req.params.courseId });
    res.json(engagements);
  } catch (error) {
    next(error);
  }
};

// Create a new engagement
exports.createEngagement = async (req, res, next) => {
  try {
    const engagement = new Engagement({
      course: req.body.course,
      user: req.body.user,
      content: req.body.content,
      engagementType: req.body.engagementType
    });
    const newEngagement = await engagement.save();
    res.status(201).json(newEngagement);
  } catch (error) {
    next(error);
  }
};

// Get a single engagement by ID
exports.getEngagementById = async (req, res, next) => {
  try {
    const engagement = await Engagement.findById(req.params.id);
    if (!engagement) {
      return res.status(404).json({ message: 'Engagement not found' });
    }
    res.json(engagement);
  } catch (error) {
    next(error);
  }
};

// Update an engagement by ID
exports.updateEngagement = async (req, res, next) => {
  try {
    const updatedEngagement = await Engagement.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedEngagement) {
      return res.status(404).json({ message: 'Engagement not found' });
    }
    res.json(updatedEngagement);
  } catch (error) {
    next(error);
  }
};

// Delete an engagement by ID
exports.deleteEngagement = async (req, res, next) => {
  try {
    const deletedEngagement = await Engagement.findByIdAndDelete(req.params.id);
    if (!deletedEngagement) {
      return res.status(404).json({ message: 'Engagement not found' });
    }
    res.json({ message: 'Engagement deleted successfully' });
  } catch (error) {
    next(error);
  }
};
