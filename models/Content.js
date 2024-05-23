const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const contentSchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4 },
  title: { type: String, required: true },
  type: { type: String, enum: ['image', 'video', 'text'], required: true },
  url: { type: String },  // URL for videos or images
  text: { type: String },  // Text content
  category: { type: String, enum: ['Informacion', 'Entretenimiento', 'Motivacional'], required: true },
  topic: { type: String, enum: ['ciencia', 'matematicas', 'deporte'], ref: 'Topic', required: true },
  createdBy: { type: String, required: true },
  createdAt: {type: String, default: Date.now()}
}, {
  versionKey: null,
});

module.exports = mongoose.model('Content', contentSchema);
