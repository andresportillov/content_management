const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const contentSchema = new mongoose.Schema(
  {
    _id: { type: String, default: uuidv4 },
    title: { type: String, required: true },
    type: { type: String, enum: ["image", "video", "text"], required: true },
    url: { type: String }, // URL for videos or images
    text: { type: String }, // Text content
    category: {
      type: String,
      ref: "categories",
      enum: ["image", "video", "text"],
      required: true,
    },
    topic: {
      type: String,
      enum: ["ciencias", "matematicas", "deportes"],
      ref: "topics",
      required: true,
    },
    createdBy: { type: String, required: true },
    createdAt: { type: Date, default: Date.now() },
    isRemove: { type: Boolean, default: false },
  },
  {
    versionKey: null,
  }
);

module.exports = mongoose.model("Content", contentSchema);
