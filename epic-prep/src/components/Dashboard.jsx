// src/components/Dashboard.jsx
import React from 'react';

const Dashboard = ({
  currentProfile,
  allProfiles,
  partnerMode,
  milestones,
  phaseProgress,
  showSection
}) => {
  const getWelcomeTitle = () => {
    if (partnerMode) return 'Partner Preparation Dashboard';
    if (currentProfile?.role === 'software-engineer') return `Welcome, ${currentProfile.name}!`;
    if (currentProfile?.role === 'project-manager') return `Welcome, ${currentProfile.name}!`;
    return 'Welcome to Epic Interview Prep!';
  };

  const getSubtitle = () => {
    if (partnerMode) return 'Tracking progress for both preparation tracks';
    if (currentProfile?.role === 'software-engineer') return 'Your Software Engineer interview preparation journey';
    if (currentProfile?.role === 'project-manager') return 'Your Project Manager interview preparation journey';
    return 'Your structured 16-week preparation journey to Epic Systems';
  };

  // Use current profile data or default to first available profile
  const displayProfile = currentProfile || allProfiles[0];

  return (
    <div className="container">
      <div className="dashboard">
        <div className="dashboard__header">
          <h1 className="dashboard__title">{getWelcomeTitle()}</h1>
          <p className="dashboard__subtitle">
            {getSubtitle()}
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

          {displayProfile && (
            <div className="milestone-card">
              <div className="milestone-number">{Math.round(displayProfile.studyHours)}</div>
              <div className="milestone-label">Study Hours Completed</div>
              <div className="milestone-date">Phase 1: 64 hours total</div>
            </div>
          )}
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

        {/* Partner Mode Stats */}
        {partnerMode && allProfiles.length > 1 && (
          <div className="partner-stats">
            <h2>Both Tracks Progress</h2>
            <div className="partner-grid">
              {allProfiles.map(profile => (
                <div key={profile.id} className="partner-card">
                  <h3>{profile.name}</h3>
                  <div className="partner-progress">
                    <div className="stat">
                      <span className="value">{Math.round(profile.studyHours)}</span>
                      <span className="label">Hours</span>
                    </div>
                    <div className="stat">
                      <span className="value">{profile.completedTasks}</span>
                      <span className="label">Tasks</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

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

          <div className="action-card" onClick={() => showSection('practice')} role="button"
            tabIndex={0}>
            <div className="action-card__icon">💪</div>
            <h3>Practice</h3>
            <p>Coding problems, mock interviews, case studies</p>
          </div>

          <div className="action-card" onClick={() => showSection('resources')} role="button"
            tabIndex={0}>
            <div className="action-card__icon">📚</div>
            <h3>Resources</h3>
            <p>Study materials and preparation guides</p>
          </div>

          <div className="action-card" onClick={() => showSection('progress')} role="button"
            tabIndex={0}>
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