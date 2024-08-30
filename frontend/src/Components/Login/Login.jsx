import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import axios from "axios";
import { IoEye, IoEyeOff } from "react-icons/io5";
import Swal from "sweetalert2";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://video-streaming-app-api.vercel.app/api/login",
        { email, password },
        { withCredentials: true }
      );

      if (response.data.success) {
        //setIsLoggedIn(true);
        Swal.fire({
          title: "Login Successful!",
          text: "You are now logged in.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/home", { state: { user: response.data.user } });
        });
      } else {
        Swal.fire({
          title: "Login Failed",
          text: response.data.message || "An error occurred.",
          icon: "error",
          confirmButtonText: "Try Again",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.response ? error.response.data.message : error.message,
        icon: "error",
        confirmButtonText: "Close",
      });
    }
  }; 

  return (
    <div className="login-container">
      <div className="login-form">
        <h1 className="display-5 text-center">Login</h1>
        <form onSubmit={handleLogin}>
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
          <div className="mt-4">
            <span>
              Don't have an account?{" "}
              <Link to="/register">Create an account</Link>
            </span>
          </div>
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-outline-primary w-50">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
