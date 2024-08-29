const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const userRoutes = require("./routes/user.route");
const videoRoutes = require("./routes/video.route");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({ origin: "https://video-streaming-app-frontend-blond.vercel.app", credentials: true }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

mongoose
  .connect(
    "mongodb+srv://dvkrishna142000:P61mbqIrhifGbMdA@cluster0.ky3cx.mongodb.net/StreamingApp?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Use routes
app.use("/api", userRoutes);
app.use("/api/videos", videoRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("Hello....");
});

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({ success: false, statusCode, message });
});

// Start the server
app.listen(5000, () => {
  console.log(`Server running.....`);
});
