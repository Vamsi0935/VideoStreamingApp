import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "./uploadVideo.css";

const VideoUpload = () => {
  const [file, setFile] = useState(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [videoList, setVideoList] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const fileInputRef = useRef(null);

  const fetchVideoList = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/videos");
      setVideoList(response.data.videos || []);
    } catch (error) {
      console.error("Error fetching video list", error);
      Swal.fire({
        title: "Error!",
        text: "There was an error fetching the video list.",
        icon: "error",
        confirmButtonText: "OK",
      });
      setVideoList([]);
    }
  };

  const onFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile && title && description) {
      const formData = new FormData();
      formData.append("video", selectedFile);
      formData.append("title", title);
      formData.append("description", description);

      try {
        const response = await axios.post(
          "http://localhost:5000/api/videos/video",
          formData
        );
        console.log("Video uploaded successfully", response.data);
        setVideoUrl(response.data.filePath);
        Swal.fire({
          title: "Success!",
          text: "Video uploaded successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });
        fetchVideoList();
        setTitle("");
        setDescription("");
        setFile(null);
      } catch (error) {
        console.error("Error uploading video", error);
        Swal.fire({
          title: "Error!",
          text: "There was an error uploading the video.",
          icon: "error",
          confirmButtonText: "Try Again",
        });
      }
    } else {
      Swal.fire({
        title: "Error!",
        text: "Please provide a title and description.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    fetchVideoList();
  }, []);

  return (
    <div className="upload-container">
      <h1 className="display-5">Upload Video</h1>
      <div className="input-group">
        <label htmlFor="">Title: </label>
        <input
          type="text"
          placeholder="Enter video title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="">Description: </label>
        <textarea
          placeholder="Enter video description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="button-group">
        <button className="btn btn-outline-primary" onClick={handleButtonClick}>
          Choose Video
        </button>
        <input
          type="file"
          accept="video/*"
          onChange={onFileChange}
          ref={fileInputRef}
          style={{ display: "none" }}
        />
      </div>
      {videoUrl && (
        <div className="video-container">
          <video controls width="600">
            <source src={`http://localhost:5000${videoUrl}`} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
      <div className="video-list">
        <h2 className="display-6 mt-5">Previously Uploaded Videos</h2>
        {videoList.length > 0 ? (
          <div className="card-container">
            {videoList.map((video, index) => (
              <div className="video-card" key={index}>
                <video controls width="300" className="card-video">
                  <source
                    src={`http://localhost:5000${video.filePath}`}
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
                <div className="video-details">
                  <h3>{video.title}</h3>
                  <p>{video.description}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No videos uploaded yet.</p>
        )}
      </div>
    </div>
  );
};

export default VideoUpload;
