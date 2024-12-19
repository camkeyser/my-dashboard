import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import Navbar from './components/Navbar/Navbar';
import Dashboard from './components/Dashboard/Dashboard';
import News from './components/News/NewsModule';
import Sports from './components/Sports/SportsModule';
import Weather from './components/Weather/WeatherModule';
import Trivia from './components/Trivia/TriviaModule';
import Reddit from './components/Reddit/RedditModule';
import PotdModule from './components/Potd/PotdModule';
import FotdModule from './components/Fotd/FotdModule';
import QotdModule from './components/Qotd/QotdModule';
import TaskListModule from './components/Task/TaskListModule';
import './App.scss';

function App() {
  const [activeComponent, setActiveComponent] = useState('Dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme : 'charcoal';
  });

  const toggleSidebar = () => {
    setIsSidebarCollapsed((prev) => !prev);
  };

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  // Disable scrolling when the sidebar is expanded
  useEffect(() => {
    const rootElement = document.getElementById('root');
    if (!isSidebarCollapsed) {
      rootElement.style.overflow = 'hidden';
    } else {
      rootElement.style.overflow = '';
    }

    // Reset overflow on unmount
    return () => {
      rootElement.style.overflow = '';
    };
  }, [isSidebarCollapsed]);

  const renderContent = () => {
    switch (activeComponent) {
      case 'Dashboard':
        return <Dashboard theme={theme} />;
      case 'News':
        return <News theme={theme} />;
      case 'Sports':
        return <Sports theme={theme} />;
      case 'Weather':
        return <Weather theme={theme} />;
      case 'Trivia':
        return <Trivia theme={theme} />;
      case 'Reddit':
        return <Reddit theme={theme} />;
      case 'Pic of the Day':
        return <PotdModule theme={theme} />;
      case 'Fact of the Day':
        return (
          <div className="fact-and-quote">
            <FotdModule theme={theme} />
            <QotdModule theme={theme} />
          </div>
        );
      case 'Quote of the Day':
        return <QotdModule theme={theme} />;
      case 'Task List':
        return <TaskListModule theme={theme} />;
      default:
        return <Dashboard theme={theme} />;
    }
  };

  return (
    <div
      className={`app ${isSidebarCollapsed ? 'app--collapsed' : 'app--expanded'} ${
        activeComponent !== 'Dashboard' ? 'module-highlight' : ''
      }`}
    >
      <Sidebar
        setActiveComponent={setActiveComponent}
        onToggle={setIsSidebarCollapsed}
        currentTheme={theme}
        onThemeChange={handleThemeChange}
      />
      <div className="app__main">
        <Navbar onToggleSidebar={toggleSidebar} />
        {renderContent()}
      </div>
    </div>
  );
}

export default App;