const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const topicSchema = new mongoose.Schema(
  {
    _id: { type: String, default: uuidv4 },
    name: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now() },
    isRemove: { type: Boolean, default: false },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("Topic", topicSchema);
