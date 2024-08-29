import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import { FiVideo } from "react-icons/fi";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light p-2">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <FiVideo className="mx-3"/>
          Streaming App
        </Link>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto px-5">
            <li className="nav-item">
              <Link className="nav-link px-3" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link px-3" to="/login">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link px-3" to="/register">
                Register
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
