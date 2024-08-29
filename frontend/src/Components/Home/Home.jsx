import React from "react";
import "./home.css";
import VideoUpload from "../VideoUpload/VideoUpload";
import Footer from "../Footer/Footer";

const Home = () => {
  return (
    <>
      <div className="home-container">
        <img
          src="https://www.amagi.com/hubfs/11.%20Video%20Streaming%20App%20Development%20Know%20Whats%20Important.jpeg"
          alt="background-image"
          className="background-image"
        />
        <div className="side-content">
          <h1 className="display-1">W E L C O M E</h1>
          <p>To the world's first streaming services</p>
        </div>
        <div className="side-content" style={{ top: "48%", bottom: "20px" }}>
          <h3>Try 7 Days Free</h3>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Email Address"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
            />
            <span
              className="input-group-text btn btn-primary"
              id="basic-addon2"
            >
              GET STARTED
            </span>
          </div>
        </div>
      </div>
      <VideoUpload className="upload-video" />
      <Footer />
    </>
  );
};

export default Home;
