const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs")
const Video = require("../model/video.model");

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadDir = path.join(__dirname, "../uploads/courses");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  }),
  limits: { fileSize: 100 * 1024 * 1024 }, // 100 MB
});

// Route to get the list of videos
router.get("/", async (req, res) => {
  try {
    const videos = await Video.find();
    res.json({ videos });
  } catch (err) {
    console.error("Error fetching video list:", err);
    res
      .status(500)
      .json({ error: "Error fetching video list", details: err.message });
  }
});

// Route to upload a video
router.post("/video", upload.single("video"), async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  const newVideo = new Video({
    filePath: `/uploads/courses/${req.file.originalname}`,
  });

  try {
    const savedVideo = await newVideo.save();
    res.status(201).json({ filePath: savedVideo.filePath });
  } catch (err) {
    console.error("Error saving video:", err);
    res.status(500).json({ error: "Error saving video", details: err.message });
  }
});

// Optional: Route to get a specific video
router.get("/video/:filename", (req, res) => {
  const { filename } = req.params;
  const videoPath = path.join(__dirname, "../uploads/courses", filename);
  res.sendFile(videoPath);
});

module.exports = router;
