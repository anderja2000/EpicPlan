// src/components/Resources.jsx
import React from 'react';

const Resources = ({ currentProfile }) => {
  const role = currentProfile?.role || 'software-engineer';
  
  const resources = {
    'software-engineer': [
      { title: 'LeetCode', description: 'Coding practice problems', type: 'Practice' },
      { title: 'NeetCode', description: 'Curated algorithm problems', type: 'Practice' },
      { title: 'Epic Careers Page', description: 'Company culture & values', type: 'Research' },
      { title: 'Healthcare IT Primer', description: 'Industry knowledge', type: 'Study' },
      { title: 'System Design Interview', description: 'Architecture fundamentals', type: 'Study' }
    ],
    'project-manager': [
      { title: 'Agile Alliance', description: 'Agile methodology resources', type: 'Study' },
      { title: 'Scrum Guide', description: 'Official Scrum framework', type: 'Study' },
      { title: 'STAR Method Guide', description: 'Behavioral interview technique', type: 'Practice' },
      { title: 'Healthcare Industry Reports', description: 'Market trends & insights', type: 'Research' },
      { title: 'PM Case Studies', description: 'Real-world project examples', type: 'Practice' }
    ]
  };

  const roleResources = resources[role] || resources['software-engineer'];

  return (
    <div className="container">
      <div className="card">
        <h2>Study Resources</h2>
        <p>
          Curated materials for <strong>{role.replace('-', ' ')}</strong> preparation
        </p>
        
        <div className="resource-list">
          {roleResources.map((resource, index) => (
            <div key={index} className="resource-item">
              <div className="resource-content">
                <h3>{resource.title}</h3>
                <p>{resource.description}</p>
              </div>
              <div className="resource-meta">
                <span className={`status status--${resource.type.toLowerCase()}`}>
                  {resource.type}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="resource-categories">
          <div className="category">
            <span className="status status--practice">Practice</span>
            <span>Hands-on coding & case studies</span>
          </div>
          <div className="category">
            <span className="status status--study">Study</span>
            <span>Theoretical knowledge & concepts</span>
          </div>
          <div className="category">
            <span className="status status--research">Research</span>
            <span>Company & industry information</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;