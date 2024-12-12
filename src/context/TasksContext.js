import React, { createContext, useContext, useState, useEffect } from 'react';

const TasksContext = createContext();

export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (newTask) => setTasks((prev) => [...prev, newTask]);

  const toggleTaskComplete = (taskId) =>
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );

  const removeTask = (taskId) =>
    setTasks((prev) => prev.filter((task) => task.id !== taskId));

  return (
    <TasksContext.Provider
      value={{ tasks, addTask, toggleTaskComplete, removeTask }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = () => useContext(TasksContext);