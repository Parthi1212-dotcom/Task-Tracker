import React, { useState } from 'react';

function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const bgColorClass = task.done
    ? 'bg-green-100'
    : task.priority === 'High'
    ? 'bg-red-100'
    : task.priority === 'Medium'
    ? 'bg-yellow-100'
    : 'bg-blue-100';

  const formattedDate = task.dueDate
    ? new Date(task.dueDate).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
    : 'No due date';

  const saveEdit = () => {
    if (editText.trim()) {
      onEdit(task.id, editText.trim());
      setIsEditing(false);
    }
  };

  const cancelEdit = () => {
    setEditText(task.text);
    setIsEditing(false);
  };

  return (
    <li className={`flex justify-between items-center p-2 border rounded ${bgColorClass} transition-colors duration-300 ease-in-out`}>
      <div className="flex-1">
        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="p-1 border border-gray-300 rounded w-full"
          />
        ) : (
          <div
            className={`${task.done ? 'line-through text-gray-400' : ''} font-semibold cursor-pointer`}
            onClick={() => onToggle(task.id)}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => {
              if (e.key === 'Enter' || e.key === ' ') onToggle(task.id);
            }}
            aria-label={`Toggle task ${task.text}`}
            title="Toggle task status"
          >
            {task.text}
          </div>
        )}

        <div className="text-sm text-gray-600">
          Due: {formattedDate} | Priority: {task.priority} | Category: {task.category}
        </div>
      </div>

      <div className="ml-2 flex items-center gap-1">
        {isEditing ? (
          <>
            <button onClick={saveEdit} className="btn bg-green-500 hover:bg-green-600">Save</button>
            <button onClick={cancelEdit} className="btn bg-gray-400 hover:bg-gray-500">Cancel</button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="btn bg-yellow-400 hover:bg-yellow-500"
              aria-label={`Edit task ${task.text}`}
              title="Edit task"
            >
              ✏️
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="ml-1 text-red-500 hover:text-red-700"
              aria-label={`Delete task ${task.text}`}
              title="Delete task"
            >
              ❌
            </button>
          </>
        )}
      </div>
    </li>
  );
}

export default TaskItem;
