import React from 'react';
import WeatherModule from '../Weather/WeatherModule';
import './WelcomeModule.scss';

const WelcomeModule = ({ taskCount, theme }) => {
  const currentDate = new Date();
  const dayName = currentDate.toLocaleDateString('en-US', { weekday: 'long' });
  const monthName = currentDate.toLocaleDateString('en-US', { month: 'long' });
  const dayNumber = currentDate.getDate();
  const year = currentDate.getFullYear();

  const handleViewNowClick = () => {
    const taskListElement = document.getElementById('task-list');
    if (taskListElement) {
      taskListElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="welcome-module">
      <div className="welcome-module__left">
        <h1>Hello!</h1>
        <p className="welcome-module__subtitle">
          Today is {dayName},<br /> {monthName} {dayNumber}, {year}
        </p>
        <div className="welcome-module__notice">
          <p>
            You have <span className="big-count">{taskCount}</span> tasks on your to-do list.
          </p>
          <button onClick={handleViewNowClick} className="welcome-module__button">
            View now
          </button>
        </div>
      </div>
      <div className="welcome-module__right">
        <WeatherModule theme={theme} />
      </div>
    </div>
  );
};

export default WelcomeModule;