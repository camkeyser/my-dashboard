import React, { useState } from 'react';
import { TaskListIcon, RemoveIcon, UndoIcon } from '../Sidebar/Icons';
import { useTasks } from '../../context/TasksContext';
import './TaskListModule.scss';

const TaskListModule = () => {
  const { tasks, addTask, toggleTaskComplete, removeTask } = useTasks();
  const [newTask, setNewTask] = useState('');
  const [newDetails, setNewDetails] = useState('');

  const handleAddTask = () => {
    if (!newTask.trim()) return;

    addTask({
      id: Date.now(),
      task: newTask,
      details: newDetails || '',
      completed: false,
    });

    setNewTask('');
    setNewDetails('');
  };

  return (
    <div className="task-list-module">
      <h2>Task List</h2>

      <form
        className="task-list-module__form"
        onSubmit={(e) => {
          e.preventDefault();
          handleAddTask();
        }}
      >
        <input
          type="text"
          placeholder="Task Name"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <input
          type="text"
          placeholder="Details (optional)"
          value={newDetails}
          onChange={(e) => setNewDetails(e.target.value)}
        />
        <button type="submit">Add Task</button>
      </form>

      <div className="task-list-module__grid">
        {tasks.length === 0 ? (
          <p>No tasks added yet. Start by adding one!</p>
        ) : (
          tasks.map((item) => (
            <div
              key={item.id}
              className={`task-list-module__item ${item.completed ? 'completed' : ''}`}
            >
              <div className="task-list-module__content">
                <h3>{item.task}</h3>
                <p>{item.details}</p>
              </div>
              <div className="task-list-module__actions">
                <button onClick={() => toggleTaskComplete(item.id)}>
                  {item.completed ? (
                    <UndoIcon className="task-list-module__icon" />
                  ) : (
                    <TaskListIcon className="task-list-module__icon" />
                  )}
                </button>
                <button onClick={() => removeTask(item.id)}>
                  <RemoveIcon className="task-list-module__icon" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TaskListModule;