import React from 'react';
import SportsModule from '../Sports/SportsModule';
import NewsModule from '../News/NewsModule';
import TriviaModule from '../Trivia/TriviaModule';
import RedditModule from '../Reddit/RedditModule';
import PotdModule from '../Potd/PotdModule';
import FotdModule from '../Fotd/FotdModule';
import QotdModule from '../Qotd/QotdModule';
import TaskListModule from '../Task/TaskListModule';
import WelcomeModule from '../Welcome/WelcomeModule';
import { useTasks } from '../../context/TasksContext';
import './Dashboard.scss';

const Dashboard = ({ theme }) => {
  const { tasks, addTask, toggleTaskComplete, removeTask } = useTasks();

  const incompleteTasks = tasks.filter((task) => !task.completed);

  return (
    <div className="dashboard">
      <div className="dashboard__modules1">
        <WelcomeModule taskCount={incompleteTasks.length} theme={theme} />
      </div>
      <div className="dashboard__modules2">
        <RedditModule theme={theme} />
        <SportsModule />
      </div>
      <div className="dashboard__modules3">
        <PotdModule />
        <TriviaModule theme={theme} />
      </div>
      <div className="dashboard__modules4">
        <NewsModule theme={theme} />
      </div>
      <div className="dashboard__modules5" id="task-list">
        <TaskListModule
          tasks={tasks}
          addTask={addTask}
          toggleTaskComplete={toggleTaskComplete}
          removeTask={removeTask}
        />
      </div>
      <div className="dashboard__modules6">
        <QotdModule theme={theme} />
        <FotdModule theme={theme} />
      </div>
    </div>
  );
};

export default Dashboard;