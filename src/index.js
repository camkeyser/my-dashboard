import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.scss';
import App from './App';
import { TasksProvider } from './context/TasksContext';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

// Add only the solid icon pack to the library
library.add(fas);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <TasksProvider>
      <App />
    </TasksProvider>
  </React.StrictMode>
);