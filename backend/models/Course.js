const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  schedule: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Course', CourseSchema);
