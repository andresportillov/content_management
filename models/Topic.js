const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const topicSchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4 },
  name: { type: String, required: true, unique: true },
  category: { type: String, enum: ['Informacion', 'Entretenimiento', 'Motivacional']},
  createdAt: {type: String, default: Date.now()}
});

module.exports = mongoose.model('Topic', topicSchema);
