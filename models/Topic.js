const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const topicSchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4 },
  name: { type: String, required: true, unique: true },
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
});

module.exports = mongoose.model('Topic', topicSchema);
