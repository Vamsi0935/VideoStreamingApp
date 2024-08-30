const Video = require("../model/video.model");
const { createReadStream, statSync } = require("fs");
const path = require("path");

// Get all videos
const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find();
    res.json({ videos });
  } catch (error) {
    console.error("Error fetching video list:", error);
    res
      .status(500)
      .json({ error: "Error fetching video list", details: error.message });
  }
};

// Get a specific video
const getVideo = (req, res) => {
  const videoFileName = req.params.fileName;
  const filePath = path.join(__dirname, "../uploads/courses", videoFileName);

  let stat;
  try {
    stat = statSync(filePath);
  } catch (err) {
    console.error("File stat error:", err);
    return res.status(404).send("File not found");
  }

  const fileSize = stat.size;
  const range = req.headers.range;

  if (!range) {
    return res.status(416).send("Range header is required.");
  }

  const [startStr] = range.replace(/bytes=/, "").split("-");
  const start = Number(startStr);
  if (isNaN(start) || start < 0 || start >= fileSize) {
    return res.status(416).send("Requested range not satisfiable");
  }

  const end = Math.min(start + 10 ** 6 - 1, fileSize - 1);
  const contentLength = end - start + 1;

  const fileStream = createReadStream(filePath, { start, end });

  res.writeHead(206, {
    "Content-Range": `bytes ${start}-${end}/${fileSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4",
  });

  fileStream.pipe(res);

  fileStream.on("error", (err) => {
    console.error("File stream error:", err);
    res.status(500).send("Internal Server Error");
  });

  res.on("finish", () => {
    console.log("Streaming completed.");
  });
};

// Add a new video
const uploadVideo = async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  const newVideo = new Video({
    filePath: `/uploads/courses/${req.file.originalname}`,
    title: req.body.title || "",
    description: req.body.description || "",
  });

  try {
    const savedVideo = await newVideo.save();
    res.status(201).json({ filePath: savedVideo.filePath });
  } catch (err) {
    console.error("Error saving video:", err);
    res.status(500).json({ error: "Error saving video", details: err.message });
  }
};

module.exports = { getAllVideos, getVideo, uploadVideo };
