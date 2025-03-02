const mongoose = require('mongoose');

const EngagementSchema = new mongoose.Schema({
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  engagementType: { type: String, enum: ['comment', 'like', 'share'], default: 'comment' }
}, { timestamps: true });

module.exports = mongoose.model('Engagement', EngagementSchema);
