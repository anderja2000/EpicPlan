// src/components/Daily.jsx
import React from 'react';

const Daily = ({ currentProfile, partnerMode }) => {
  const tasks = currentProfile?.tasks?.slice(0, 5) || [
    { id: 1, text: 'Review data structures', completed: false },
    { id: 2, text: 'Solve 2 LeetCode problems', completed: false },
    { id: 3, text: 'Read Epic company info', completed: false },
    { id: 4, text: 'Study healthcare IT', completed: false },
    { id: 5, text: 'Practice coding exercises', completed: false }
  ];

  return (
    <div className="container">
      <div className="card">
        <h2>Today's Tasks</h2>
        <p>Complete these key tasks to stay on track with your preparation</p>
        
        <div className="task-list">
          {tasks.map(task => (
            <div key={task.id} className="task-item">
              <input 
                type="checkbox" 
                checked={task.completed} 
                onChange={() => {}} // Add your task toggle logic here
              />
              <span className={task.completed ? 'task-completed' : ''}>
                {task.text}
              </span>
            </div>
          ))}
        </div>

        <div className="daily-stats">
          <div className="stat">
            <span className="value">{tasks.filter(t => t.completed).length}</span>
            <span className="label">Completed Today</span>
          </div>
          <div className="stat">
            <span className="value">{currentProfile?.studyHours || 0}h</span>
            <span className="label">Total Study Hours</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Daily;