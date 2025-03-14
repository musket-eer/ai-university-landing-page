import React from "react";
import { Link } from "react-router-dom"; // For navigation
import "./NavBar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <h2>Most Learned</h2>
      <div className="nav-buttons">
        <Link to="/dashboard">
          <button>Dashboard</button>
        </Link>
        <Link to="/profile">
          <button>Profile</button>
        </Link>
        <Link to="/settings">
          <button>Settings</button>
        </Link>
        <Link to="/logout">
          <button>Logout</button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;

