const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const contentSchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4 },
  title: { type: String, required: true },
  type: { type: String, enum: ['image', 'video', 'text'], required: true },
  url: { type: String },  // URL for videos or images
  text: { type: String },  // Text content
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  topic: { type: mongoose.Schema.Types.ObjectId, ref: 'Topic', required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model('Content', contentSchema);
