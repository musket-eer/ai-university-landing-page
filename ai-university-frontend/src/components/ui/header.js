// src/components/ui/Header.js
import React from 'react';
import './header.css';
import logo from '../..//assets/mostlearned.png'; // Ensure you have the logo in the assets folder

const Header = () => {
  return (
    <header className="header-container">
      <div className="logo-title">
        <img src={logo} alt="Most Learned Logo" className="logo" />
        <h1 className="title">Most Learned</h1>
      </div>
    </header>
  );
};

export default Header;
