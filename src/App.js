import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './index.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('All');

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = ({ text, dueDate, priority, category }) => {
    const newTask = {
      id: Date.now(),
      text,
      done: false,
      dueDate,
      priority,
      category,
    };
    setTasks([newTask, ...tasks]);
  };

  const toggleDone = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, done: !task.done } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const editTask = (id, newText) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, text: newText } : task
    ));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'done' && !task.done) return false;
    if (filter === 'pending' && task.done) return false;
    if (categoryFilter !== 'All' && task.category !== categoryFilter) return false;
    return true;
  });

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-xl">
      <h1 className="text-2xl font-bold mb-4 text-center">Task Tracker</h1>
      
      <div className="flex justify-center gap-2 mb-4">
        <button className="btn" onClick={() => setFilter('all')}>All</button>
        <button className="btn" onClick={() => setFilter('done')}>Done</button>
        <button className="btn" onClick={() => setFilter('pending')}>Pending</button>
      </div>

      <div className="flex justify-center gap-2 mb-4">
        <button className="btn" onClick={() => setCategoryFilter('All')}>All Categories</button>
        <button className="btn" onClick={() => setCategoryFilter('Work')}>Work</button>
        <button className="btn" onClick={() => setCategoryFilter('Personal')}>Personal</button>
        <button className="btn" onClick={() => setCategoryFilter('Shopping')}>Shopping</button>
        <button className="btn" onClick={() => setCategoryFilter('General')}>General</button>
      </div>

      <TaskForm onAdd={addTask} />
      <TaskList tasks={filteredTasks} onToggle={toggleDone} onDelete={deleteTask} onEdit={editTask} />
    </div>
  );
}

export default App;
