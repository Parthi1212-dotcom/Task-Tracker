import React, { useState } from 'react';

function TaskForm({ onAdd }) {
  const [text, setText] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [category, setCategory] = useState('General');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd({ text, dueDate, priority, category });
    setText('');
    setDueDate('');
    setPriority('Medium');
    setCategory('General');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 mb-4">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter task"
        className="p-2 border border-gray-300 rounded"
      />
      <div className="flex gap-2">
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="p-2 border border-gray-300 rounded flex-1"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        >
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        >
          <option>General</option>
          <option>Work</option>
          <option>Personal</option>
          <option>Shopping</option>
        </select>
      </div>
      <button type="submit" className="btn mt-2">Add</button>
    </form>
  );
}

export default TaskForm;
