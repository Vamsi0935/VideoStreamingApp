import React, { useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "./register.css";

const Register = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhonenumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://video-streaming-app-api.vercel.app/api/register", {
        fullname,
        email,
        phoneNumber,
        password,
      });

      if (response.status === 201) {
        Swal.fire({
          title: "Registration Successful!",
          text: "You can now log in with your credentials.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/login");
        });
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        Swal.fire({
          title: "Error",
          text: "Email already exists. Please use a different email.",
          icon: "error",
          confirmButtonText: "Try Again",
        });
      } else {
        Swal.fire({
          title: "Error",
          text: err.message || "An unexpected error occurred.",
          icon: "error",
          confirmButtonText: "Close",
        });
      }
    }
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h1 className="display-5 text-center">Registration</h1>
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label htmlFor="fullname" className="form-label">
              Full Name:
            </label>
            <input
              value={fullname}
              type="text"
              className="form-control"
              id="fullname"
              placeholder="vamsikrishnadudyala...."
              onChange={(e) => setFullname(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              value={email}
              type="email"
              className="form-control"
              id="email"
              placeholder="vamsi@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phoneNumber" className="form-label">
              Phone Number:
            </label>
            <input
              value={phoneNumber}
              type="text"
              className="form-control"
              id="phoneNumber"
              placeholder="+91 93911*****"
              onChange={(e) => setPhonenumber(e.target.value)}
              required
            />
          </div>
          <div className="mb-3 position-relative">
            <label htmlFor="password" className="form-label">
              Password:
            </label>
            <input
              value={password}
              type={showPassword ? "text" : "password"}
              className="form-control"
              id="password"
              placeholder="*********"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span className="password-toggle" onClick={handleTogglePassword}>
              {showPassword ? <IoEyeOff /> : <IoEye />}
            </span>
          </div>
          <div className="mt-5 text-center" style={{fontSize:"18px"}}>
            <span>
              Existing User? <Link to="/login">Login</Link>
            </span>
          </div>
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-outline-primary w-50">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
