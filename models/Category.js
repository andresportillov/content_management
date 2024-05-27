const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const categorySchema = new mongoose.Schema(
  {
    _id: { type: String, default: uuidv4 },
    name: { type: String, enum: ["image", "video", "text"], unique: true },
    description: { type: String },
    coverImage: { type: String }, // URL to the cover image
    createdAt: { type: Date, default: Date.now() },
    isRemove: { type: Boolean, default: false },
  },
  {
    versionKey: null,
  }
);

module.exports = mongoose.model("Category", categorySchema);
