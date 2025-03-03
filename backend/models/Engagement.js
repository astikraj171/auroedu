// models/Engagement.js
const mongoose = require('mongoose');

const EngagementSchema = new mongoose.Schema({
  course: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Course', 
    required: true 
  },
  // Optional: Track which user engaged (if you wish)
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  },
  engagementType: { 
    type: String, 
    enum: ['like', 'comment'], 
    required: true 
  },
  content: { 
    type: String // Only required if engagementType is 'comment'
  }
}, { timestamps: true });

module.exports = mongoose.model('Engagement', EngagementSchema);
