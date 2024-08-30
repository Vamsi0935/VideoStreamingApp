const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const {
  getAllVideos,
  getVideo,
  uploadVideo,
} = require("../controller/video.controller");

// Set up multer for file uploads
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
router.get("/", getAllVideos);

// Route to get a specific video
router.get("/video/:fileName", getVideo);

// Route to upload a video
router.post("/video", upload.single("video"), uploadVideo);

module.exports = router;
