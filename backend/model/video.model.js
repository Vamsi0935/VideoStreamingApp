const mongoose = require("mongoose");

// Define the schema for a video
const videoSchema = new mongoose.Schema({
  filePath: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
});

// Create a model based on the schema
const Video = mongoose.model("Video", videoSchema);

module.exports = Video;
