// src/components/Practice.jsx
import React from 'react';

const Practice = ({ currentProfile }) => {
  const role = currentProfile?.role || 'software-engineer';
  
  const practiceItems = {
    'software-engineer': [
      { title: 'LeetCode Easy Problems', description: 'Start with basic algorithms' },
      { title: 'Data Structures Review', description: 'Arrays, LinkedLists, Stacks, Queues' },
      { title: 'Epic Assessment Practice', description: 'Mock coding problems' },
      { title: 'System Design Basics', description: 'Scalability fundamentals' }
    ],
    'project-manager': [
      { title: 'Case Study Practice', description: 'Healthcare project scenarios' },
      { title: 'STAR Method Examples', description: 'Behavioral interview prep' },
      { title: 'Presentation Skills', description: 'Mock presentation practice' },
      { title: 'Agile & Scrum Review', description: 'PM methodology deep-dive' }
    ]
  };

  const items = practiceItems[role] || practiceItems['software-engineer'];

  return (
    <div className="container">
      <div className="card">
        <h2>Practice Sessions</h2>
        <p>
          Role-specific practice for <strong>{role.replace('-', ' ')}</strong> preparation
        </p>
        
        <div className="practice-grid">
          {items.map((item, index) => (
            <div key={index} className="practice-card">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <button className="btn btn--primary btn--sm">Start Practice</button>
            </div>
          ))}
        </div>

        <div className="practice-stats">
          <div className="stat">
            <span className="value">{currentProfile?.completedTasks || 0}</span>
            <span className="label">Practice Sessions</span>
          </div>
          <div className="stat">
            <span className="value">{Math.round(currentProfile?.studyHours || 0)}</span>
            <span className="label">Study Hours</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Practice;