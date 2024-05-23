const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const categorySchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4 },
  name: { type: String, enum: ['Informacion', 'Entretenimiento', 'Motivacional'], unique: true },
  description: { type: String },
  coverImage: { type: String },  // URL to the cover image
  allowedContentTypes: { type: [String], enum: ['image', 'video', 'text'] },
  createdAt: {type: String, default: Date.now()}
});

module.exports = mongoose.model('Category', categorySchema);
