import React, { useState } from 'react';
import { useDashboardStore } from '../store/dashboardStore';
import { v4 as uuidv4 } from 'uuid';

function TodoWidget({ widgetId, data }) {
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('');
  const [error, setError] = useState('');
  const updateWidgetData = useDashboardStore((state) => state.updateWidgetData);
  const tasks = data.tasks || [];

  const addTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) {
      setError('Task cannot be empty');
      return;
    }
    const task = { id: uuidv4(), text: newTask.trim(), completed: false };
    updateWidgetData(widgetId, { tasks: [...tasks, task] });
    setNewTask('');
    setError('');
  };

  const toggleTask = (taskId) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    updateWidgetData(widgetId, { tasks: updatedTasks });
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    updateWidgetData(widgetId, { tasks: updatedTasks });
  };

  const filteredTasks = tasks.filter(task =>
    task.text.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full">
      <form onSubmit={addTask} className="mb-4">
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task"
            className="flex-1 px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            aria-label="New task"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            aria-label="Add task"
          >
            Add
          </button>
        </div>
        {error && <p className="text-red-500 text-sm" role="alert">{error}</p>}
      </form>

      <input
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Filter tasks..."
        className="mb-4 px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        aria-label="Filter tasks"
      />

      <div className="flex-1 overflow-auto" role="list">
        {filteredTasks.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center py-4">
            {filter ? 'No matching tasks' : 'No tasks yet. Add one above!'}
          </p>
        ) : (
          filteredTasks.map(task => (
            <div
              key={task.id}
              className="flex items-center gap-2 p-2 mb-2 bg-gray-100 dark:bg-gray-700 rounded-lg"
              role="listitem"
            >
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
                className="w-5 h-5"
                aria-label={`Mark ${task.text} as ${task.completed ? 'incomplete' : 'complete'}`}
              />
              <span className={`flex-1 ${task.completed ? 'line-through text-gray-500' : 'text-gray-900 dark:text-white'}`}>
                {task.text}
              </span>
              <button
                onClick={() => deleteTask(task.id)}
                className="text-red-500 hover:text-red-700"
                aria-label={`Delete ${task.text}`}
              >
                🗑️
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default TodoWidget;
