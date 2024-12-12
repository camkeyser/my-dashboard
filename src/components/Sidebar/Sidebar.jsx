import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import {
  DashboardIcon,
  TaskListIcon,
  NewsIcon,
  SportsIcon,
  WeatherIcon,
  TriviaIcon,
  RedditIcon,
  PicOfTheDayIcon,
  FactOfTheDayIcon,
  SettingsIcon,
  CollapseIcon,
  ExpandIcon,
} from './Icons';
import './Sidebar.scss';

const Sidebar = ({ setActiveComponent, onToggle, currentTheme, onThemeChange }) => {
  const [collapsed, setCollapsed] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const sidebarRef = useRef();
  const isFirstRender = useRef(true);

  // Check screen size
  const checkScreenSize = () => {
    setIsSmallScreen(window.innerWidth < 1200);
  };

  useEffect(() => {
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
    if (onToggle) onToggle(!collapsed);
  };

  useEffect(() => {
    if (isFirstRender.current) {
      sidebarRef.current.style.width = collapsed ? '80px' : '250px';
      isFirstRender.current = false;
    } else {
      gsap.to(sidebarRef.current, {
        width: collapsed ? '80px' : '250px',
        duration: 0.3,
        ease: 'power1.out',
      });
    }
  }, [collapsed]);

  const handleThemeChange = (e) => {
    const selectedTheme = e.target.value;
    onThemeChange(selectedTheme);
  };

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <>
      <aside
        className={`sidebar ${collapsed && !isSmallScreen ? 'sidebar--collapsed' : ''}`}
        ref={sidebarRef}
      >
        <button onClick={toggleSidebar} className="sidebar__toggle" aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}>
          {collapsed ? <ExpandIcon /> : <CollapseIcon />}
        </button>
        <nav className="sidebar__nav">
          <button
            className="sidebar__link"
            onClick={() => {
              setActiveComponent('Dashboard');
              if (isSmallScreen) {
                document.querySelector('.hamburger-icon')?.click();
              }
            }}
          >
            <DashboardIcon />
            {(!collapsed || isSmallScreen) && <span>Dashboard</span>}
          </button>
          <button
            className="sidebar__link"
            onClick={() => {
              setActiveComponent('Task List');
              if (isSmallScreen) {
                document.querySelector('.hamburger-icon')?.click();
              }
            }}
          >
            <TaskListIcon />
            {(!collapsed || isSmallScreen) && <span>Task List</span>}
          </button>
          <button
            className="sidebar__link"
            onClick={() => {
              setActiveComponent('News');
              if (isSmallScreen) {
                document.querySelector('.hamburger-icon')?.click();
              }
            }}
          >
            <NewsIcon />
            {(!collapsed || isSmallScreen) && <span>News</span>}
          </button>
          <button
            className="sidebar__link"
            onClick={() => {
              setActiveComponent('Sports');
              if (isSmallScreen) {
                document.querySelector('.hamburger-icon')?.click();
              }
            }}
          >
            <SportsIcon />
            {(!collapsed || isSmallScreen) && <span>Sports</span>}
          </button>
          <button
            className="sidebar__link"
            onClick={() => {
              setActiveComponent('Weather');
              if (isSmallScreen) {
                document.querySelector('.hamburger-icon')?.click();
              }
            }}
          >
            <WeatherIcon />
            {(!collapsed || isSmallScreen) && <span>Weather</span>}
          </button>
          <button
            className="sidebar__link"
            onClick={() => {
              setActiveComponent('Trivia');
              if (isSmallScreen) {
                document.querySelector('.hamburger-icon')?.click();
              }
            }}
          >
            <TriviaIcon />
            {(!collapsed || isSmallScreen) && <span>Trivia</span>}
          </button>
          <button
            className="sidebar__link"
            onClick={() => {
              setActiveComponent('Reddit');
              if (isSmallScreen) {
                document.querySelector('.hamburger-icon')?.click();
              }
            }}
          >
            <RedditIcon />
            {(!collapsed || isSmallScreen) && <span>Reddit</span>}
          </button>
          <button
            className="sidebar__link"
            onClick={() => {
              setActiveComponent('Pic of the Day');
              if (isSmallScreen) {
                document.querySelector('.hamburger-icon')?.click();
              }
            }}
          >
            <PicOfTheDayIcon />
            {(!collapsed || isSmallScreen) && <span>Pic of the Day</span>}
          </button>
          <button
            className="sidebar__link"
            onClick={() => {
              setActiveComponent('Fact of the Day');
              if (isSmallScreen) {
                document.querySelector('.hamburger-icon')?.click();
              }
            }}
          >
            <FactOfTheDayIcon />
            {(!collapsed || isSmallScreen) && <span>Info of the Day</span>}
          </button>
        </nav>
        <button onClick={openModal} className="sidebar__help">
          <SettingsIcon />
          {(!collapsed || isSmallScreen) && <span>Settings</span>}
        </button>
      </aside>
  
      {modalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>My Feed Settings</h2>
            <div className="settings-flex">
              <div className="settings-module">
                <h3 className="module-title">Theme Style</h3>
                <label>
                  <input
                    type="radio"
                    name="theme"
                    value="midnight"
                    checked={currentTheme === 'midnight'}
                    onChange={handleThemeChange}
                  />
                  Midnight
                </label>
                <label>
                  <input
                    type="radio"
                    name="theme"
                    value="sunrise"
                    checked={currentTheme === 'sunrise'}
                    onChange={handleThemeChange}
                  />
                  Sunrise
                </label>
                <label>
                  <input
                    type="radio"
                    name="theme"
                    value="charcoal"
                    checked={currentTheme === 'charcoal'}
                    onChange={handleThemeChange}
                  />
                  Charcoal (Default)
                </label>
                <label>
                  <input
                    type="radio"
                    name="theme"
                    value="gemini"
                    checked={currentTheme === 'gemini'}
                    onChange={handleThemeChange}
                  />
                  Gemini
                </label>
                <label>
                  <input
                    type="radio"
                    name="theme"
                    value="deepsea"
                    checked={currentTheme === 'deepsea'}
                    onChange={handleThemeChange}
                  />
                  Deep Sea
                </label>
                <label>
                  <input
                    type="radio"
                    name="theme"
                    value="atlas"
                    checked={currentTheme === 'atlas'}
                    onChange={handleThemeChange}
                  />
                  Atlas
                </label>
              </div>
            </div>
            <button onClick={closeModal} className="modal-close-button">
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;