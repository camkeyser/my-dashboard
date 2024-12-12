import React, { useState } from 'react';
import './Navbar.scss';
import { DashboardIcon, NewsIcon } from '../Sidebar/Icons';

const Navbar = ({ onToggleSidebar }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleToggle = () => {
    setIsSidebarOpen((prev) => !prev);
    onToggleSidebar();
  };

  return (
    <header className="navbar">
      <div className="navbar__left">
        <a href="/" className="home-link">
          <div className="navbar__logo">
            <span role="img" aria-label="logo">
              <DashboardIcon className="svg-icon-adjusted" />
            </span>
            <h2>My Feed</h2>
          </div>
        </a>
      </div>
      <div className="navbar__right">
        <button className="navbar__button">
          <NewsIcon />
        </button>
        <div className="navbar__avatar">👤</div>

        <div
          className={`hamburger-icon ${isSidebarOpen ? 'active' : ''}`}
          aria-label="Toggle Navigation"
          role="button"
          tabIndex="0"
          onClick={handleToggle}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;