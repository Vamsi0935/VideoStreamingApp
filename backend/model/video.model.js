const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  filePath: { type: String, required: true },
  title: { type: String },
  description: { type: String },
});

const Video = mongoose.model("Video", videoSchema);

module.exports = Video;
