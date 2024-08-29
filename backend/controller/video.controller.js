const Video = require("../model/video.model.js");
const { createReadStream, statSync } = require("fs");
const path = require("path");

const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find();
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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

module.exports = { getAllVideos, getVideo };
