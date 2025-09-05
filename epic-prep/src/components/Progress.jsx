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