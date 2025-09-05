# Missing Components for Epic Interview Prep Tracker

You're getting the compilation errors because these 4 components are missing from your `/src/components/` directory. Here are the **starter implementations** that will fix your build errors:

## src/components/Timeline.jsx

```jsx
// src/components/Timeline.jsx
import React from 'react';

const Timeline = ({ currentProfile, partnerMode, milestones, phaseProgress }) => {
  return (
    <div className="container">
      <div className="card">
        <h2>16-Week Preparation Timeline</h2>
        <p>Your structured journey to Epic Systems interview success</p>
        
        <div className="timeline-phase">
          <h3>Phase 1: Foundation Building (Sep 15 - Nov 10)</h3>
          <div className="progress-bar">
            <div 
              className="progress-bar__fill" 
              style={{ width: `${phaseProgress}%` }}
            ></div>
          </div>
          <p>{phaseProgress}% Complete</p>
          
          <ul>
            <li>Software Engineering Fundamentals</li>
            <li>Data structures and algorithms theory</li>
            <li>Epic company research</li>
            <li>Healthcare IT basics</li>
          </ul>
        </div>

        <div className="timeline-phase">
          <h3>Phase 2: Intensive Preparation (Nov 10 - Dec 22)</h3>
          <div className="progress-bar">
            <div 
              className="progress-bar__fill" 
              style={{ width: "0%" }}
            ></div>
          </div>
          <p>0% Complete</p>
          
          <ul>
            <li>LeetCode Practice (Easy/Medium problems)</li>
            <li>Mock assessments</li>
            <li>System design basics</li>
            <li>Final interview preparation</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
```

## src/components/Daily.jsx

```jsx
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
```

## src/components/Practice.jsx

```jsx
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
```

## src/components/Resources.jsx

```jsx
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
```

## src/components/Progress.jsx

```jsx
// src/components/Progress.jsx
import React from 'react';

const Progress = ({ currentProfile, partnerMode, allProfiles = [] }) => {
  const profile = currentProfile || {};
  const achievements = profile.achievements || [];

  return (
    <div className="container">
      <div className="card">
        <h2>Progress & Achievements</h2>
        <p>Track your interview preparation journey</p>
        
        {/* Progress Stats */}
        <div className="progress-stats">
          <div className="stat-card">
            <span className="stat-value">{profile.completedTasks || 0}</span>
            <span className="stat-label">Tasks Completed</span>
            <div className="stat-detail">of {profile.totalTasks || 25} total</div>
          </div>
          
          <div className="stat-card">
            <span className="stat-value">{Math.round(profile.studyHours || 0)}</span>
            <span className="stat-label">Study Hours</span>
            <div className="stat-detail">64 hours goal for Phase 1</div>
          </div>
          
          <div className="stat-card">
            <span className="stat-value">{profile.studyStreak || 0}</span>
            <span className="stat-label">Day Streak</span>
            <div className="stat-detail">consecutive study days</div>
          </div>
          
          <div className="stat-card">
            <span className="stat-value">{achievements.filter(a => a.unlocked).length}</span>
            <span className="stat-label">Achievements</span>
            <div className="stat-detail">unlocked badges</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="overall-progress">
          <h3>Overall Progress</h3>
          <div className="progress-bar">
            <div 
              className="progress-bar__fill" 
              style={{ 
                width: `${Math.round(((profile.completedTasks || 0) / (profile.totalTasks || 25)) * 100)}%` 
              }}
            ></div>
          </div>
          <p className="progress-text">
            {Math.round(((profile.completedTasks || 0) / (profile.totalTasks || 25)) * 100)}% Complete
          </p>
        </div>

        {/* Achievements */}
        <div className="achievements">
          <h3>Achievements</h3>
          <div className="achievement-grid">
            {achievements.map(achievement => (
              <div 
                key={achievement.id} 
                className={`achievement-card ${achievement.unlocked ? 'unlocked' : 'locked'}`}
              >
                <div className="achievement-icon">
                  {achievement.unlocked ? '🏆' : '🔒'}
                </div>
                <div className="achievement-content">
                  <h4>{achievement.title}</h4>
                  <p>{achievement.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Partner Mode Comparison */}
        {partnerMode && allProfiles.length > 1 && (
          <div className="partner-comparison">
            <h3>Partner Progress Comparison</h3>
            <div className="comparison-grid">
              {allProfiles.map(p => (
                <div key={p.id} className="comparison-card">
                  <h4>{p.name}</h4>
                  <div className="comparison-stats">
                    <div>Hours: {Math.round(p.studyHours || 0)}</div>
                    <div>Tasks: {p.completedTasks || 0}/{p.totalTasks || 25}</div>
                    <div>Achievements: {(p.achievements || []).filter(a => a.unlocked).length}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Progress;
```

---

## Quick Setup Instructions:

1. **Create the files**: Save each component above in your `/src/components/` folder with the correct filename
2. **Save all files**: Make sure each file is saved properly
3. **Restart your dev server**: Run `npm start` again

Your app should now compile successfully! These are starter implementations that you can enhance later with more features like:

- Task completion functionality
- Timer integration
- Progress tracking
- Interactive elements
- Data persistence

The key is getting your app running first, then you can iteratively improve each component.