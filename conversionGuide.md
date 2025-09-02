# Epic Interview Prep Tracker - React App

## Why React is Perfect for This Project

### **State Management**
- Multiple interconnected states (role, section, timer, progress)
- React's `useState` and `useEffect` handle this elegantly
- No manual DOM manipulation - React handles updates automatically

### **Component Reusability**
- Practice cards, progress bars, achievement badges
- Role-specific content that changes dynamically
- Timer components that can be reused

### **Modern Development**
- Better debugging with React DevTools
- Hot reloading for instant development feedback
- Component-based architecture scales better

## Project Structure

```
epic-prep-tracker/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Modal.jsx
│   │   │   ├── ProgressBar.jsx
│   │   │   └── Timer.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Timeline.jsx
│   │   ├── Daily.jsx
│   │   ├── Practice.jsx
│   │   ├── Resources.jsx
│   │   └── Progress.jsx
│   ├── hooks/
│   │   ├── useTimer.js
│   │   └── useProgress.js
│   ├── data/
│   │   └── constants.js
│   ├── styles/
│   │   └── globals.css
│   ├── App.jsx
│   └── index.js
├── package.json
└── README.md
```

## Setup Instructions

### 1. Create React App
```bash
npx create-react-app epic-prep-tracker
cd epic-prep-tracker
npm install chart.js react-chartjs-2
```

### 2. Main App Component

```jsx
// src/App.jsx
import React, { useState, useEffect } from 'react';
import './styles/globals.css';

// Components
import Modal from './components/common/Modal';
import Dashboard from './components/Dashboard';
import Timeline from './components/Timeline';
import Daily from './components/Daily';
import Practice from './components/Practice';
import Resources from './components/Resources';
import Progress from './components/Progress';

// Data
import { INITIAL_PROGRESS_DATA, INITIAL_ACHIEVEMENTS, ROLE_NAMES } from './data/constants';

function App() {
  // Main state
  const [currentRole, setCurrentRole] = useState(null);
  const [currentSection, setCurrentSection] = useState('dashboard');
  const [showRoleModal, setShowRoleModal] = useState(true);
  const [progressData, setProgressData] = useState(INITIAL_PROGRESS_DATA);
  const [achievements, setAchievements] = useState(INITIAL_ACHIEVEMENTS);

  // Navigation
  const showSection = (section) => {
    setCurrentSection(section);
  };

  // Role selection
  const selectRole = (role) => {
    setCurrentRole(role);
    setShowRoleModal(false);
  };

  const setPartnerMode = () => {
    setCurrentRole('partner');
    setShowRoleModal(false);
  };

  // Calculate milestone dates
  const getMilestoneDays = () => {
    const currentDate = new Date('2025-09-01');
    const castRemovalDate = new Date('2025-09-29');
    const applicationDate = new Date('2025-12-22');
    
    return {
      daysUntilCast: Math.ceil((castRemovalDate - currentDate) / (1000 * 60 * 60 * 24)),
      daysUntilApplication: Math.ceil((applicationDate - currentDate) / (1000 * 60 * 60 * 24))
    };
  };

  const getCurrentPhaseProgress = () => {
    const currentDate = new Date('2025-09-01');
    const phase1Start = new Date('2025-09-15');
    const phase1End = new Date('2025-11-10');
    
    if (currentDate < phase1Start) return 0;
    if (currentDate <= phase1End) {
      const totalDays = (phase1End - phase1Start) / (1000 * 60 * 60 * 24);
      const elapsedDays = (currentDate - phase1Start) / (1000 * 60 * 60 * 24);
      return Math.max(0, Math.min(100, Math.round((elapsedDays / totalDays) * 100)));
    }
    return 100;
  };

  // Render current section
  const renderCurrentSection = () => {
    const commonProps = {
      currentRole,
      progressData,
      achievements,
      showSection,
      milestones: getMilestoneDays(),
      phaseProgress: getCurrentPhaseProgress()
    };

    switch (currentSection) {
      case 'dashboard':
        return <Dashboard {...commonProps} />;
      case 'timeline':
        return <Timeline {...commonProps} />;
      case 'daily':
        return <Daily {...commonProps} />;
      case 'practice':
        return <Practice {...commonProps} />;
      case 'resources':
        return <Resources {...commonProps} />;
      case 'progress':
        return <Progress {...commonProps} />;
      default:
        return <Dashboard {...commonProps} />;
    }
  };

  return (
    <div className="app">
      {/* Navigation */}
      <nav className="nav">
        <div className="container">
          <div className="nav__brand">
            <h1>Epic Interview Prep</h1>
          </div>
          <div className="nav__menu">
            <button 
              className="btn btn--outline nav__toggle" 
              onClick={() => setShowRoleModal(true)}
            >
              Switch Role
            </button>
          </div>
        </div>
      </nav>

      {/* Role Selection Modal */}
      {showRoleModal && (
        <Modal onClose={() => setShowRoleModal(false)}>
          <div className="modal__header">
            <h2>Select Your Role</h2>
          </div>
          <div className="modal__body">
            <div className="role-cards">
              <div 
                className="card role-card" 
                onClick={() => selectRole('software-engineer')}
              >
                <div className="card__body">
                  <h3>Software Engineer</h3>
                  <p>Coding assessments, system design, and technical interviews</p>
                  <div className="role-highlights">
                    <span className="status status--info">LeetCode Practice</span>
                    <span className="status status--info">System Design</span>
                    <span className="status status--info">Coding Assessments</span>
                  </div>
                </div>
              </div>

              <div 
                className="card role-card" 
                onClick={() => selectRole('project-manager')}
              >
                <div className="card__body">
                  <h3>Project Manager</h3>
                  <p>Case studies, behavioral interviews, and presentations</p>
                  <div className="role-highlights">
                    <span className="status status--success">Case Studies</span>
                    <span className="status status--success">STAR Method</span>
                    <span className="status status--success">Presentations</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-24">
              <button 
                className="btn btn--secondary btn--full-width" 
                onClick={setPartnerMode}
              >
                View Both Tracks (Partner Mode)
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Main Content */}
      <main className="main">
        {renderCurrentSection()}
      </main>
    </div>
  );
}

export default App;
```

### 3. Dashboard Component

```jsx
// src/components/Dashboard.jsx
import React from 'react';

const Dashboard = ({ 
  currentRole, 
  progressData, 
  milestones, 
  phaseProgress, 
  showSection 
}) => {
  const getWelcomeTitle = () => {
    if (currentRole === 'partner') return 'Partner Preparation Dashboard';
    if (currentRole === 'software-engineer') return 'Welcome, Future Epic Software Engineer!';
    if (currentRole === 'project-manager') return 'Welcome, Future Epic Project Manager!';
    return 'Welcome to Epic Interview Prep!';
  };

  const roleProgress = progressData[currentRole] || progressData['software-engineer'];

  return (
    <div className="container">
      <div className="dashboard">
        <div className="dashboard__header">
          <h1 className="dashboard__title">{getWelcomeTitle()}</h1>
          <p className="dashboard__subtitle">
            Your structured 16-week preparation journey to Epic Systems
          </p>
        </div>

        {/* Milestone Cards */}
        <div className="milestone-grid">
          <div className="milestone-card">
            <div className="milestone-number">{milestones.daysUntilCast}</div>
            <div className="milestone-label">Days Until Cast Removal</div>
            <div className="milestone-date">September 29, 2025</div>
          </div>

          <div className="milestone-card">
            <div className="milestone-number">{milestones.daysUntilApplication}</div>
            <div className="milestone-label">Days Until Application</div>
            <div className="milestone-date">December 22, 2025</div>
          </div>

          <div className="milestone-card">
            <div className="milestone-number">{roleProgress.studyHours}</div>
            <div className="milestone-label">Study Hours Completed</div>
            <div className="milestone-date">Phase 1: 64 hours total</div>
          </div>
        </div>

        {/* Current Phase Progress */}
        <div className="phase-progress">
          <h2>Current Phase: Foundation Building</h2>
          <div className="progress-bar">
            <div 
              className="progress-bar__fill" 
              style={{ width: `${phaseProgress}%` }}
            ></div>
          </div>
          <p className="progress-text">{phaseProgress}% Complete</p>
        </div>

        {/* Action Cards */}
        <div className="action-grid">
          <div className="action-card" onClick={() => showSection('timeline')}>
            <div className="action-card__icon">📅</div>
            <h3>View Timeline</h3>
            <p>See your 16-week preparation roadmap</p>
          </div>

          <div className="action-card" onClick={() => showSection('daily')}>
            <div className="action-card__icon">📋</div>
            <h3>Today's Tasks</h3>
            <p>Track daily study goals and progress</p>
          </div>

          <div className="action-card" onClick={() => showSection('practice')}>
            <div className="action-card__icon">💪</div>
            <h3>Practice</h3>
            <p>Coding problems, mock interviews, case studies</p>
          </div>

          <div className="action-card" onClick={() => showSection('resources')}>
            <div className="action-card__icon">📚</div>
            <h3>Resources</h3>
            <p>Study materials and preparation guides</p>
          </div>

          <div className="action-card" onClick={() => showSection('progress')}>
            <div className="action-card__icon">📊</div>
            <h3>Progress</h3>
            <p>Detailed analytics and achievements</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
```

### 4. Custom Timer Hook

```jsx
// src/hooks/useTimer.js
import { useState, useEffect, useRef } from 'react';

export const useTimer = () => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  const start = () => {
    if (!isRunning) {
      setIsRunning(true);
    }
  };

  const pause = () => {
    setIsRunning(false);
  };

  const reset = () => {
    setIsRunning(false);
    setMinutes(0);
    setSeconds(0);
  };

  const setPreset = (mins) => {
    reset();
    setMinutes(mins);
  };

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds(prevSeconds => {
          if (prevSeconds === 59) {
            setMinutes(prevMinutes => prevMinutes + 1);
            return 0;
          }
          return prevSeconds + 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  return {
    minutes,
    seconds,
    isRunning,
    start,
    pause,
    reset,
    setPreset,
    formattedTime: `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  };
};
```

### 5. Constants File

```jsx
// src/data/constants.js
export const ROLE_NAMES = {
  'software-engineer': 'Software Engineer',
  'project-manager': 'Project Manager'
};

export const INITIAL_PROGRESS_DATA = {
  'software-engineer': {
    phase1: 15,
    phase2: 0,
    studyHours: 24,
    completedTasks: 8,
    totalTasks: 25
  },
  'project-manager': {
    phase1: 20,
    phase2: 0,
    studyHours: 18,
    completedTasks: 6,
    totalTasks: 22
  }
};

export const INITIAL_ACHIEVEMENTS = [
  { id: 'first-study', title: 'First Study Session', description: 'Complete your first study session', unlocked: true },
  { id: 'week-complete', title: 'Week Warrior', description: 'Complete a full week of studying', unlocked: false },
  { id: 'cast-freedom', title: 'Cast Freedom', description: 'Cast removal milestone reached', unlocked: false },
  { id: 'phase-master', title: 'Phase Master', description: 'Complete Phase 1', unlocked: false }
];

export const TIMELINE_PHASES = [
  {
    name: 'Foundation Building',
    startDate: '2025-09-15',
    endDate: '2025-11-10',
    duration: '8 weeks',
    studyHoursPerWeek: 8,
    totalHours: 64,
    description: 'Skill building while hand heals, low-pressure learning',
    softwareEngineerFocus: [
      'Software Engineering Fundamentals',
      'Data structures and algorithms theory',
      'Epic company research',
      'Healthcare IT basics',
      'Light coding practice when comfortable'
    ],
    projectManagerFocus: [
      'Project Management Concepts',
      'Agile and Scrum methodology',
      'Stakeholder management',
      'Healthcare industry knowledge',
      'Behavioral interview prep'
    ]
  },
  {
    name: 'Intensive Preparation',
    startDate: '2025-11-10',
    endDate: '2025-12-22',
    duration: '6 weeks',
    studyHoursPerWeek: 12,
    totalHours: 72,
    description: 'Mock interviews, assessment practice, full preparation',
    softwareEngineerFocus: [
      'LeetCode Practice (Easy/Medium problems)',
      'Epic-specific coding (4 problems similar to medium difficulty)',
      'System design basics',
      'Mock assessments (3-4 hour timed sessions)',
      'Healthcare application architecture'
    ],
    projectManagerFocus: [
      'Case study practice',
      'Healthcare project scenarios',
      'Behavioral interviews',
      'Presentation skills',
      'Epic PM-specific questions'
    ]
  }
];
```

## Why React is Better

### **State Management**
- Automatic re-rendering when state changes
- No manual DOM manipulation
- Clear data flow with props and state

### **Component Reusability**
- Timer component used in multiple places
- Practice cards that adapt to role
- Progress bars that work anywhere

### **Development Experience**
- Hot reloading for instant feedback
- React DevTools for debugging
- Better error handling and stack traces

### **Scalability**
- Easy to add new features
- Component-based architecture
- Better code organization

### **Modern Ecosystem**
- Vast library ecosystem
- Better testing tools
- Industry standard for interactive UIs

Would you like me to create the complete React app with all components?